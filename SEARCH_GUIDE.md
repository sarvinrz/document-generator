# راهنمای جستجو

## جستجوی محلی (Development)

برای development، از جستجوی محلی استفاده می‌کنیم که نیازی به اینترنت ندارد.

### ویژگی‌ها:
- ✅ جستجو در تمام صفحات docs و blog
- ✅ پشتیبانی از زبان فارسی
- ✅ جستجو در عنوان‌ها و محتوا
- ✅ اولویت دادن به عنوان‌ها
- ✅ صفحه جستجوی اختصاصی در `/search`

### تنظیمات:
```typescript
// در docusaurus.config.ts
plugins: [
  [
    '@easyops-cn/docusaurus-search-local',
    {
      indexDocs: true,
      indexBlog: true,
      language: 'fa',
      addSearchPage: true,
      searchPageTitle: 'جستجو',
    },
  ],
],
```

## جستجوی Algolia (Production)

برای production، می‌توانید از Algolia استفاده کنید.

### مراحل راه‌اندازی:

1. **درخواست DocSearch رایگان:**
   - به آدرس https://docsearch.algolia.com/apply/ بروید
   - اطلاعات سایت خود را وارد کنید
   - منتظر تایید باشید

2. **یا تنظیم Algolia خودتان:**
   ```typescript
   // در docusaurus.config.ts
   algolia: {
     appId: 'YOUR_APP_ID',
     apiKey: 'YOUR_SEARCH_API_KEY',
     indexName: 'support-docs',
     contextualSearch: true,
   },
   ```

### تغییر از جستجوی محلی به Algolia:

1. تنظیمات Algolia را uncomment کنید
2. plugin جستجوی محلی را comment کنید
3. سایت را rebuild کنید

## استفاده:

- **جستجو در navbar:** از آیکون جستجو در بالای صفحه استفاده کنید
- **صفحه جستجو:** به `/search` بروید
- **کلیدهای میانبر:** `Ctrl+K` یا `Cmd+K`

## نکات:

- جستجوی محلی فقط در development کار می‌کند
- برای production، Algolia توصیه می‌شود
- جستجوی محلی نیازی به اینترنت ندارد
- Algolia نیاز به سایت آنلاین دارد


