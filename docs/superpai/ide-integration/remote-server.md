---
title: "Remote Server Setup for Teams"
sidebar_label: "Remote Server"
---

# Remote Server Setup for Teams

Deploy the SuperPAI+ MCP server on a shared machine to enable team-wide access. Team members connect via HTTP transport from any supported IDE.

---

## Ubuntu Quick Start

### Step 1: Install Prerequisites

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx and Certbot
sudo apt-get install -y nginx certbot python3-certbot-nginx
```

### Step 2: Clone and Install SuperPAI+

```bash
git clone https://gitlab.anshinhealth.net/engineering/superpai.git /opt/superpai
cd /opt/superpai/superpai-server
bun install
bun run db:migrate
```

### Step 3: Configure Environment

Create `/opt/superpai/superpai-server/.env`:

```bash
PORT=3271
HOST=0.0.0.0
DB_PATH=/opt/superpai/superpai-server/data/superpai.db
MCP_TRANSPORT=http
MCP_AUTH_ENABLED=true
LOG_LEVEL=info
```

---

## systemd Service

Create `/etc/systemd/system/superpai-server.service`:

```ini
[Unit]
Description=SuperPAI+ MCP Server
After=network.target

[Service]
Type=simple
User=superpai
Group=superpai
WorkingDirectory=/opt/superpai/superpai-server
ExecStart=/home/superpai/.bun/bin/bun run start
Restart=always
RestartSec=5
Environment=NODE_ENV=production
EnvironmentFile=/opt/superpai/superpai-server/.env

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
# Create service user
sudo useradd -r -s /bin/false superpai
sudo chown -R superpai:superpai /opt/superpai

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable superpai-server
sudo systemctl start superpai-server

# Check status
sudo systemctl status superpai-server
```

---

## Nginx Reverse Proxy with HTTPS

Create `/etc/nginx/sites-available/superpai`:

```nginx
server {
    listen 80;
    server_name superpai.anshintech.net;

    location / {
        proxy_pass http://127.0.0.1:3271;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and configure HTTPS:

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/superpai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Get SSL certificate
sudo certbot --nginx -d superpai.anshintech.net
```

---

## Kubernetes Deployment

For Kubernetes environments, deploy using the following manifests:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: superpai-server
  namespace: superpai
spec:
  replicas: 1
  selector:
    matchLabels:
      app: superpai-server
  template:
    metadata:
      labels:
        app: superpai-server
    spec:
      containers:
        - name: superpai-server
          image: registry.anshinhealth.net/engineering/superpai-server:latest
          ports:
            - containerPort: 3271
          env:
            - name: PORT
              value: "3271"
            - name: MCP_TRANSPORT
              value: "http"
            - name: MCP_AUTH_ENABLED
              value: "true"
          volumeMounts:
            - name: data
              mountPath: /data
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "256Mi"
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: superpai-server-data
```

---

## Register Team Members

### Generate API Keys

```bash
# Via CLI
cd /opt/superpai/superpai-server
bun run keys:create --email user@anshintech.net --name "Team Member Name"

# Via API
curl -X POST https://superpai.anshintech.net/api/keys \
  -H "Authorization: Bearer admin-key" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@anshintech.net", "name": "Team Member", "permissions": ["read", "write"]}'
```

### Distribute API Keys

Share the generated API key with each team member. They configure their IDE with:

```json
{
  "mcpServers": {
    "superpai": {
      "url": "https://superpai.anshintech.net/mcp",
      "headers": {
        "Authorization": "Bearer their-personal-api-key"
      }
    }
  }
}
```

### Key Management

```bash
# List all keys
bun run keys:list

# Revoke a key
bun run keys:revoke --email user@anshintech.net

# Rotate a key
bun run keys:rotate --email user@anshintech.net
```

---

## Security Considerations

1. **Always use HTTPS** --- Never expose the MCP server over plain HTTP
2. **Rotate API keys** --- Set a 90-day rotation policy
3. **Firewall** --- Only allow HTTPS (443) through the firewall; block direct access to port 3271
4. **Audit logs** --- Review `/opt/superpai/superpai-server/logs/` regularly
5. **Database backups** --- Schedule daily backups of the SQLite database
