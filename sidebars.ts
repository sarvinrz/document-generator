import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Support Documentation Sidebar
  supportSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'خوش آمدید',
    },
    {
      type: 'category',
      label: 'راهنمای شروع',
      items: [
        {
          type: 'doc',
          id: 'getting-started/installation',
          label: 'نصب سیستم',
        },
        {
          type: 'doc',
          id: 'getting-started/configuration',
          label: 'پیکربندی',
        },
        {
          type: 'doc',
          id: 'getting-started/first-steps',
          label: 'اولین قدم‌ها',
        },
      ],
    },
    {
      type: 'category',
      label: 'راهنمای کاربری',
      items: [
        {
          type: 'doc',
          id: 'user-guide/dashboard',
          label: 'داشبورد',
        },
        {
          type: 'doc',
          id: 'user-guide/features',
          label: 'ویژگی‌ها',
        },
        {
          type: 'doc',
          id: 'user-guide/settings',
          label: 'تنظیمات',
        },
      ],
    },
    {
      type: 'category',
      label: 'راهنمای پیشرفته',
      items: [
        {
          type: 'doc',
          id: 'advanced/customization',
          label: 'سفارشی‌سازی',
        },
        {
          type: 'doc',
          id: 'advanced/integrations',
          label: 'یکپارچه‌سازی',
        },
        {
          type: 'doc',
          id: 'advanced/automation',
          label: 'خودکارسازی',
        },
      ],
    },
  ],

  // API Documentation Sidebar
  apiSidebar: [
    {
      type: 'doc',
      id: 'api/intro',
      label: 'معرفی API',
    },
    {
      type: 'category',
      label: 'احراز هویت',
      items: [
        {
          type: 'doc',
          id: 'api/auth/overview',
          label: 'نمای کلی',
        },
        {
          type: 'doc',
          id: 'api/auth/tokens',
          label: 'توکن‌ها',
        },
        {
          type: 'doc',
          id: 'api/auth/permissions',
          label: 'مجوزها',
        },
      ],
    },
    {
      type: 'category',
      label: 'نقاط پایانی API',
      items: [
        {
          type: 'doc',
          id: 'api/endpoints/users',
          label: 'کاربران',
        },
        {
          type: 'doc',
          id: 'api/endpoints/tickets',
          label: 'تیکت‌ها',
        },
        {
          type: 'doc',
          id: 'api/endpoints/reports',
          label: 'گزارش‌ها',
        },
      ],
    },
    {
      type: 'category',
      label: 'نمونه کدها',
      items: [
        {
          type: 'doc',
          id: 'api/examples/javascript',
          label: 'جاوااسکریپت',
        },
        {
          type: 'doc',
          id: 'api/examples/python',
          label: 'پایتون',
        },
        {
          type: 'doc',
          id: 'api/examples/curl',
          label: 'cURL',
        },
      ],
    },
  ],

  // Troubleshooting Sidebar
  troubleshootingSidebar: [
    {
      type: 'doc',
      id: 'troubleshooting/intro',
      label: 'معرفی عیب‌یابی',
    },
    {
      type: 'category',
      label: 'مشکلات رایج',
      items: [
        {
          type: 'doc',
          id: 'troubleshooting/common/login-issues',
          label: 'مشکلات ورود',
        },
        {
          type: 'doc',
          id: 'troubleshooting/common/performance',
          label: 'مشکلات عملکرد',
        },
        {
          type: 'doc',
          id: 'troubleshooting/common/errors',
          label: 'خطاها',
        },
      ],
    },
    {
      type: 'category',
      label: 'راه‌حل‌های پیشرفته',
      items: [
        {
          type: 'doc',
          id: 'troubleshooting/advanced/debugging',
          label: 'دیباگ',
        },
        {
          type: 'doc',
          id: 'troubleshooting/advanced/logs',
          label: 'لاگ‌ها',
        },
        {
          type: 'doc',
          id: 'troubleshooting/advanced/recovery',
          label: 'بازیابی',
        },
      ],
    },
  ],

  // Tutorial Sidebar
  tutorialSidebar: [
    {
      type: 'category',
      label: 'آموزش - مبانی',
      items: [
        {
          type: 'doc',
          id: 'tutorial-basics/create-a-document',
          label: 'ایجاد سند',
        },
        {
          type: 'doc',
          id: 'tutorial-basics/create-a-blog-post',
          label: 'ایجاد پست بلاگ',
        },
        {
          type: 'doc',
          id: 'tutorial-basics/create-a-page',
          label: 'ایجاد صفحه',
        },
        {
          type: 'doc',
          id: 'tutorial-basics/markdown-features',
          label: 'ویژگی‌های Markdown',
        },
        {
          type: 'doc',
          id: 'tutorial-basics/deploy-your-site',
          label: 'استقرار سایت',
        },
        {
          type: 'doc',
          id: 'tutorial-basics/congratulations',
          label: 'تبریک!',
        },
      ],
    },
    {
      type: 'category',
      label: 'آموزش - پیشرفته',
      items: [
        {
          type: 'doc',
          id: 'tutorial-extras/manage-docs-versions',
          label: 'مدیریت نسخه‌های مستندات',
        },
        {
          type: 'doc',
          id: 'tutorial-extras/translate-your-site',
          label: 'ترجمه سایت',
        },
      ],
    },
  ],
};

export default sidebars;