import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  annaVoiceSidebar: [
    {type: 'doc', id: 'intro', label: 'Anna Voice Overview'},
    {type: 'doc', id: 'release-notes', label: "What's New in v3.9.0"},
    {
      type: 'category',
      label: 'Installation & Setup',
      collapsed: false,
      items: [
        'installation/requirements',
        'installation/wizard-walkthrough',
        'installation/repair-upgrade-uninstall',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/first-launch',
        'getting-started/system-tray',
        'getting-started/your-first-dictation',
      ],
    },
    {
      type: 'category',
      label: 'Settings Reference',
      collapsed: false,
      items: [
        'settings/general',
        'settings/hotkeys',
        'settings/audio-stt',
        'settings/voice-tts',
        'settings/wake-words',
        'settings/llm',
        'settings/targets',
        'settings/training',
        'settings/knowledge',
        'settings/vocabulary',
      ],
    },
    {
      type: 'category',
      label: 'Using Anna Voice',
      collapsed: false,
      items: [
        'using-anna/dictation',
        'using-anna/voice-commands',
        'using-anna/wake-word',
        'using-anna/tts-feedback',
        'using-anna/knowledge-search',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: true,
      items: [
        'integrations/orchestrate',
        'integrations/superpai',
        'integrations/http-api',
        'integrations/mcp-tools',
        'integrations/claude-code-plugin',
      ],
    },
    {type: 'doc', id: 'troubleshooting', label: 'Troubleshooting'},
  ],
};

export default sidebars;
