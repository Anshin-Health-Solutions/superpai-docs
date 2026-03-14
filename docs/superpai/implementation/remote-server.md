---
title: "Remote Server Deployment"
sidebar_label: "Remote Server"
---

# Remote Server Deployment

Deploy the superpai-server to a shared machine for team-wide access. This guide covers Ubuntu deployment, systemd service configuration, Nginx reverse proxy with HTTPS, and Kubernetes manifests.

---

## Ubuntu Quick Start

```bash
# 1. Install prerequisites
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# 2. Clone and install
git clone https://gitlab.anshinhealth.net/engineering/superpai.git /opt/superpai
cd /opt/docs/superpai-server
bun install
bun run db:migrate

# 3. Create service user
sudo useradd -r -s /bin/false -d /opt/superpai superpai
sudo chown -R superpai:superpai /opt/superpai

# 4. Start the server
bun run start
```

---

## .env Configuration

Create `/opt/docs/superpai-server/.env`:

```bash
# Server
PORT=3271
HOST=0.0.0.0
NODE_ENV=production

# Database
DB_PATH=/opt/docs/superpai-server/data/superpai.db

# MCP
MCP_TRANSPORT=http
MCP_AUTH_ENABLED=true

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/docs/server.log

# Voice (optional)
VOICE_URL=http://localhost:8888

# CORS
CORS_ORIGINS=https://docs.anshintech.net,https://superpai.anshintech.net
```

---

## systemd Service File

Create `/etc/systemd/system/superpai-server.service`:

```ini
[Unit]
Description=SuperPAI+ Server
After=network.target
Documentation=https://docs.anshintech.net/superpai

[Service]
Type=simple
User=superpai
Group=superpai
WorkingDirectory=/opt/docs/superpai-server
ExecStart=/home/docs/.bun/bin/bun run start
Restart=always
RestartSec=5
Environment=NODE_ENV=production
EnvironmentFile=/opt/docs/superpai-server/.env

# Logging
StandardOutput=append:/var/log/docs/server.log
StandardError=append:/var/log/docs/error.log

# Security hardening
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/docs/superpai-server/data
ReadWritePaths=/var/log/superpai

[Install]
WantedBy=multi-user.target
```

```bash
# Create log directory
sudo mkdir -p /var/log/superpai
sudo chown superpai:superpai /var/log/superpai

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable superpai-server
sudo systemctl start superpai-server
sudo systemctl status superpai-server
```

---

## Nginx Configuration

Create `/etc/nginx/sites-available/superpai`:

```nginx
server {
    listen 80;
    server_name superpai.anshintech.net;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name superpai.anshintech.net;

    # SSL (managed by certbot)
    ssl_certificate /etc/letsencrypt/live/superpai.anshintech.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/superpai.anshintech.net/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

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
        proxy_read_timeout 300s;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/superpai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Get SSL certificate
sudo certbot --nginx -d superpai.anshintech.net
```

---

## Kubernetes Manifests

### Deployment

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
        - name: server
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
            claimName: superpai-data
```

### Service and Ingress

```yaml
apiVersion: v1
kind: Service
metadata:
  name: superpai-server-svc
  namespace: superpai
spec:
  selector:
    app: superpai-server
  ports:
    - port: 3271
      targetPort: 3271
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: superpai-server-ingress
  namespace: superpai
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts:
        - superpai.anshintech.net
      secretName: superpai-tls
  rules:
    - host: superpai.anshintech.net
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: superpai-server-svc
                port:
                  number: 3271
```

---

## Register Users

```bash
# Generate API key for a team member
cd /opt/docs/superpai-server
bun run keys:create --email user@anshintech.net --name "Developer Name"

# List all keys
bun run keys:list

# Revoke access
bun run keys:revoke --email user@anshintech.net
```

Team members configure their IDE with the provided API key. See the [IDE Integration](/docs/ide-integration/overview) guides for per-IDE configuration.
