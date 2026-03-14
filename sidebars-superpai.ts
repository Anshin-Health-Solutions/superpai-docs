import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  superpaiSidebar: [
    {type: 'doc', id: 'whats-new', label: "What's New in v3.7.0"},
    {type: 'doc', id: 'marketing', label: 'Platform Overview'},
    {
      type: 'category',
      label: 'User Guide',
      collapsed: false,
      items: [
        'user-guide/intro',
        'user-guide/adaptive-depth',
        'user-guide/commands',
        'user-guide/gsd-integration',
        'user-guide/skills',
        'user-guide/agents',
        'user-guide/development-workflow',
        'user-guide/multi-session',
        'user-guide/voice',
        'user-guide/security',
        'user-guide/cost',
        'user-guide/memory',
        'user-guide/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: true,
      items: [
        'architecture/overview',
        'architecture/plugin-core',
        'architecture/hooks',
        'architecture/skills',
        'architecture/agents',
        'architecture/mcp',
        'architecture/server',
        'architecture/memory',
        'architecture/gsd',
      ],
    },
    {
      type: 'category',
      label: 'IDE Integration',
      collapsed: true,
      items: [
        'ide-integration/overview',
        'ide-integration/claude-code',
        'ide-integration/claude-desktop',
        'ide-integration/vscode',
        'ide-integration/cursor',
        'ide-integration/windsurf',
        'ide-integration/warp',
        'ide-integration/remote-server',
      ],
    },
    {
      type: 'category',
      label: 'Implementation',
      collapsed: true,
      items: [
        'implementation/installation',
        'implementation/upgrade',
        'implementation/configuration',
        'implementation/remote-server',
        'implementation/anna-voice',
        'implementation/custom-components',
        'implementation/api-reference',
        'implementation/database',
      ],
    },
  ],
};

export default sidebars;
