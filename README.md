# راهنمای سیستم پشتیبانی

مستندات کامل سیستم پشتیبانی با پشتیبانی کامل از زبان فارسی و راست‌به‌چپ.

## ویژگی‌ها

- ✅ **پشتیبانی کامل فارسی**: RTL و فونت‌های فارسی
- ✅ **جستجوی پیشرفته**: با Algolia
- ✅ **ساختار درختی**: Sidebar های متعدد و منظم
- ✅ **بارگذاری داینامیک**: فایل‌های MD جدید به صورت خودکار
- ✅ **UI مدرن**: طراحی زیبا و کاربرپسند
- ✅ **پاسخگو**: سازگار با موبایل و تبلت
- ✅ **حالت تاریک**: پشتیبانی از تم تاریک
- ✅ **چندزبانه**: فارسی و انگلیسی

## نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18+
- npm یا yarn

### نصب

```bash
# کلون کردن پروژه
git clone <repository-url>
cd my-docs

# نصب وابستگی‌ها
npm install

# راه‌اندازی سرور توسعه
npm start
```

### دستورات موجود

```bash
# سرور توسعه
npm start

# ساخت برای تولید
npm run build

# سرو کردن نسخه تولید
npm run serve

# پاک کردن کش
npm run clear

# بررسی نوع‌ها
npm run typecheck
```

## ساختار پروژه

```
my-docs/
├── docs/                    # مستندات اصلی
│   ├── getting-started/     # راهنمای شروع
│   ├── user-guide/         # راهنمای کاربری
│   ├── advanced/           # راهنمای پیشرفته
│   ├── api/                # مستندات API
│   └── troubleshooting/    # عیب‌یابی
├── blog/                   # بلاگ
├── src/                    # کد منبع
│   ├── components/         # کامپوننت‌ها
│   ├── css/               # استایل‌ها
│   └── pages/             # صفحات
├── static/                # فایل‌های استاتیک
└── docusaurus.config.ts   # پیکربندی اصلی
```

## پیکربندی

### تنظیمات اصلی

فایل `docusaurus.config.ts` شامل تنظیمات اصلی است:

- **عنوان و توضیحات**: فارسی
- **چندزبانه**: فارسی (پیش‌فرض) و انگلیسی
- **RTL**: پشتیبانی کامل راست‌به‌چپ
- **جستجو**: Algolia
- **تم**: سفارشی

### Sidebar ها

فایل `sidebars.ts` شامل سه sidebar اصلی:

1. **supportSidebar**: مستندات پشتیبانی
2. **apiSidebar**: مستندات API
3. **troubleshootingSidebar**: عیب‌یابی

## افزودن محتوای جدید

### 1. افزودن مستند جدید

```bash
# ایجاد فایل جدید
touch docs/new-document.md
```

### 2. ویرایش Sidebar

```typescript
// sidebars.ts
const sidebars: SidebarsConfig = {
  supportSidebar: [
    'intro',
    'new-document', // اضافه کردن
    // ...
  ],
};
```

### 3. بارگذاری داینامیک

فایل‌های جدید در پوشه `docs/` به صورت خودکار در sidebar نمایش داده می‌شوند.

## سفارشی‌سازی

### استایل‌ها

فایل `src/css/custom.css` شامل:

- پشتیبانی RTL
- فونت‌های فارسی
- استایل‌های سفارشی
- تم تاریک

### کامپوننت‌ها

کامپوننت‌های سفارشی در `src/components/`:

- HomepageFeatures
- کامپوننت‌های دیگر

## جستجو

### Algolia

برای فعال‌سازی جستجوی Algolia:

1. حساب Algolia ایجاد کنید
2. تنظیمات را در `docusaurus.config.ts` اضافه کنید:

```typescript
algolia: {
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'support-docs',
  contextualSearch: true,
}
```

### جستجوی محلی

برای استفاده از جستجوی محلی:

```bash
npm install @docusaurus/theme-search-algolia
```

## استقرار

### GitHub Pages

```bash
npm run deploy
```

### Netlify

```bash
npm run build
# آپلود پوشه build/
```

### Vercel

```bash
npm run build
# اتصال به Vercel
```

## مشارکت

1. Fork کنید
2. Branch جدید ایجاد کنید
3. تغییرات را commit کنید
4. Pull Request ارسال کنید

## مجوز

MIT License

## پشتیبانی

- 📧 ایمیل: support@example.com
- 💬 چت: [شروع چت](https://chat.example.com)
- 📞 تلفن: 021-12345678

---

*ساخته شده با ❤️ و Docusaurus*