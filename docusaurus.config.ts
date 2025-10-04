import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'راهنمای سیستم پشتیبانی',
  tagline: 'مستندات کامل سیستم پشتیبانی و راهنمای کاربری',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Algolia site verification meta tag
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: 'BA2B14EB617819F0',
      },
    },
  ],

  // Set the production url of your site here
  url: 'https://support-docs.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'your-org', // Usually your GitHub org/user name.
  projectName: 'support-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
  defaultLocale: 'fa',
  locales: ['fa', 'en'],
  localeConfigs: {
    fa: {
      label: 'فارسی',
      direction: 'rtl',
      htmlLang: 'fa-IR',
      path: 'fa',
    },
    en: {
      label: 'English',
      direction: 'ltr',
      htmlLang: 'en-US',
      path: 'en',
    },
  },
},


  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // plugins: [
  //   [
  //     '@easyops-cn/docusaurus-search-local',
  //     {
  //       // Whether to index docs pages
  //       indexDocs: true,
  //       // Whether to index blog pages
  //       indexBlog: true,
  //       // Whether to index static pages
  //       indexPages: false,
  //       // language of your documentation
  //       language: 'en',
  //     },
  //   ],
  // ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
      defaultMode: 'light',
      disableSwitch: false,
    },
    navbar: {
      title: 'راهنمای سیستم پشتیبانی',
      logo: {
        alt: 'لوگوی سیستم پشتیبانی',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'supportSidebar',
          position: 'left',
          label: 'مستندات',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
        },
        {
          type: 'docSidebar',
          sidebarId: 'troubleshootingSidebar',
          position: 'left',
          label: 'عیب‌یابی',
        },
        {to: '/blog', label: 'بلاگ', position: 'left'},
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
        {
          type: 'search',
          position: 'right',
        },
        // {
        //   href: 'https://github.com/your-org/support-docs',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'مستندات',
          items: [
            {
              label: 'راهنمای شروع',
              to: '/docs/intro',
            },
            {
              label: 'راهنمای API',
              to: '/docs/api/intro',
            },
            {
              label: 'عیب‌یابی',
              to: '/docs/troubleshooting/intro',
            },
          ],
        },
        {
          title: 'پشتیبانی',
          items: [
            {
              label: 'تیکت پشتیبانی',
              href: 'https://support.example.com',
            },
            {
              label: 'چت آنلاین',
              href: 'https://chat.example.com',
            },
            {
              label: 'تماس تلفنی',
              href: 'tel:+982112345678',
            },
          ],
        },
        {
          title: 'بیشتر',
          items: [
            {
              label: 'بلاگ',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/your-org/support-docs',
            },
            {
              label: 'وضعیت سیستم',
              href: 'https://status.example.com',
            },
          ],
        },
      ],
      // copyright: `کپی‌رایت © ${new Date().getFullYear()} شرکت شما. ساخته شده با Docusaurus.`,
    },
    // Algolia search configuration
    algolia: {
      // The application ID provided by Algolia
      appId: 'VX155825PB',
      
      // Public API key: it is safe to commit it
      apiKey: 'eb4854ef0a8c97e18db98d7dd2c2070a',
      
      indexName: 'support-docs',
      
      // Optional: see https://docusaurus.io/docs/search#using-the-search-page
      contextualSearch: false,
      
      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',
      
      // Optional: Algolia search parameters
      searchParameters: {},
      
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',
      
      // Persian placeholder for search
      placeholder: 'جستجو در مستندات...',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
