import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  orchestrateSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Platform Overview',
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'doc',
      id: 'architecture',
      label: 'Architecture',
    },
    {
      type: 'category',
      label: 'Administrator Guide',
      collapsed: false,
      items: [
        'admin-guide',
        'settings',
        'channels',
        'workflows',
      ],
    },
    {
      type: 'category',
      label: 'Daily Operations',
      collapsed: false,
      items: [
        'dashboard',
        'communications',
        'booking-pipeline',
        'operations',
      ],
    },
    {
      type: 'category',
      label: 'Data & Finance',
      collapsed: false,
      items: [
        'master-data',
        'accounting-crm',
      ],
    },
    {
      type: 'doc',
      id: 'anna-ai',
      label: 'Anna AI',
    },
    {
      type: 'doc',
      id: 'storefronts',
      label: 'Public Storefronts',
    },
    {
      type: 'doc',
      id: 'admin-portal',
      label: 'Admin Portal',
    },
    {
      type: 'doc',
      id: 'glossary',
      label: 'Glossary',
    },
  ],
};

export default sidebars;
