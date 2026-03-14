import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Anshin Technology Solutions — Developer Docs',
  tagline: 'SuperPAI+, Anna-Voice, Orchestrate & the full Anshin AI ecosystem',
  favicon: 'img/favicon.ico',
  future: {v4: true},
  url: 'https://docs.anshintech.dev',
  baseUrl: '/',
  organizationName: 'Anshin-Health-Solutions',
  projectName: 'superpai-docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  i18n: {defaultLocale: 'en', locales: ['en']},
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'superpai',
        path: 'docs/superpai',
        routeBasePath: 'superpai',
        sidebarPath: './sidebars-superpai.ts',
        editUrl:
          'https://github.com/Anshin-Health-Solutions/superpai-docs/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'anna-voice',
        path: 'docs/anna-voice',
        routeBasePath: 'anna-voice',
        sidebarPath: './sidebars-anna-voice.ts',
        editUrl:
          'https://github.com/Anshin-Health-Solutions/superpai-docs/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'orchestrate',
        path: 'docs/orchestrate',
        routeBasePath: 'orchestrate',
        sidebarPath: './sidebars-orchestrate.ts',
        editUrl:
          'https://github.com/Anshin-Health-Solutions/superpai-docs/edit/main/',
      },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/anshin-social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Anshin Technology Solutions',
      logo: {alt: 'Anshin Logo', src: 'img/logo.svg'},
      items: [
        {
          type: 'dropdown',
          label: 'SuperPAI+',
          position: 'left',
          items: [
            {label: "What's New in v3.7.0", to: '/superpai/whats-new'},
            {label: 'User Guide', to: '/superpai/user-guide/intro'},
            {label: 'Architecture', to: '/superpai/architecture/overview'},
            {label: 'IDE Integration', to: '/superpai/ide-integration/overview'},
            {label: 'Implementation', to: '/superpai/implementation/installation'},
            {label: 'Marketing Overview', to: '/superpai/marketing'},
          ],
        },
        {
          type: 'dropdown',
          label: 'Anna-Voice',
          position: 'left',
          items: [
            {label: 'Overview', to: '/anna-voice/intro'},
            {label: "What's New in v3.9.0", to: '/anna-voice/release-notes'},
            {label: 'Installation', to: '/anna-voice/installation/requirements'},
            {label: 'Settings Reference', to: '/anna-voice/settings/general'},
            {label: 'Using Anna Voice', to: '/anna-voice/using-anna/dictation'},
            {label: 'Integrations', to: '/anna-voice/integrations/orchestrate'},
            {label: 'Troubleshooting', to: '/anna-voice/troubleshooting'},
          ],
        },
        {
          type: 'dropdown',
          label: 'Orchestrate',
          position: 'left',
          items: [
            {label: 'Platform Overview', to: '/orchestrate/intro'},
            {label: 'Getting Started', to: '/orchestrate/getting-started'},
            {label: 'Architecture', to: '/orchestrate/architecture'},
            {label: 'Administrator Guide', to: '/orchestrate/admin-guide'},
            {label: 'Dashboard', to: '/orchestrate/dashboard'},
            {label: 'Communications', to: '/orchestrate/communications'},
            {label: 'Booking Pipeline', to: '/orchestrate/booking-pipeline'},
            {label: 'Operations', to: '/orchestrate/operations'},
            {label: 'Master Data', to: '/orchestrate/master-data'},
            {label: 'Anna AI', to: '/orchestrate/anna-ai'},
            {label: 'Channels & OTAs', to: '/orchestrate/channels'},
            {label: 'Workflows', to: '/orchestrate/workflows'},
            {label: 'Public Storefronts', to: '/orchestrate/storefronts'},
            {label: 'Admin Portal', to: '/orchestrate/admin-portal'},
            {label: 'Glossary', to: '/orchestrate/glossary'},
          ],
        },
        {
          href: 'https://github.com/Anshin-Health-Solutions',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'SuperPAI+',
          items: [
            {label: 'User Guide', to: '/superpai/user-guide/intro'},
            {label: 'Architecture', to: '/superpai/architecture/overview'},
            {label: 'IDE Integration', to: '/superpai/ide-integration/overview'},
            {
              label: 'Implementation Guide',
              to: '/superpai/implementation/installation',
            },
          ],
        },
        {
          title: 'Platform',
          items: [
            {label: 'Anna-Voice', to: '/anna-voice/intro'},
            {label: 'Orchestrate', to: '/orchestrate/intro'},
          ],
        },
        {
          title: 'Company',
          items: [
            {label: 'anshintech.net', href: 'https://anshintech.net'},
            {label: 'anshinhealth.net', href: 'https://anshinhealth.net'},
          ],
        },
      ],
      copyright: `Copyright \u00A9 ${new Date().getFullYear()} Anshin Technology Solutions (DBA of Anshin Healthcare Solutions, Inc.). All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'typescript', 'python'],
    },
    mermaid: {theme: {light: 'default', dark: 'dark'}},
  } satisfies Preset.ThemeConfig,
};

export default config;
