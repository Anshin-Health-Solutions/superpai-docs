import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SuperPAI+ Documentation',
  tagline: 'The AI-native Claude Code plugin for professional development teams',
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
        routeBasePath: 'docs',
        sidebarPath: './sidebars-superpai.ts',
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
      title: 'SuperPAI+',
      logo: {alt: 'Anshin Logo', src: 'img/logo.svg'},
      items: [
        {label: "What's New", to: '/docs/whats-new', position: 'left'},
        {label: 'User Guide', to: '/docs/user-guide/intro', position: 'left'},
        {label: 'Architecture', to: '/docs/architecture/overview', position: 'left'},
        {label: 'IDE Integration', to: '/docs/ide-integration/overview', position: 'left'},
        {label: 'Installation', to: '/docs/implementation/installation', position: 'left'},
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
            {label: 'User Guide', to: '/docs/user-guide/intro'},
            {label: 'Architecture', to: '/docs/architecture/overview'},
            {label: 'IDE Integration', to: '/docs/ide-integration/overview'},
            {label: 'Installation Guide', to: '/docs/implementation/installation'},
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
      copyright: `Copyright © ${new Date().getFullYear()} Anshin Technology Solutions (DBA of Anshin Healthcare Solutions, Inc.). All rights reserved.`,
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
