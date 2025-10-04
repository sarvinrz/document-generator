# راهنمای نهایی پروژه

## ✅ وضعیت فعلی

### ویژگی‌های فعال:
- ✅ **زبان فارسی:** تمام متن‌ها فارسی هستند
- ✅ **RTL Support:** متن‌ها راست‌چین هستند
- ✅ **فونت IRANYekanX:** فونت فارسی اعمال شده
- ✅ **تم آبی:** رنگ‌های آبی جایگزین سبز شده
- ✅ **سایدبار فارسی:** تمام منوها فارسی هستند
- ✅ **سایدبار فعال:** رنگ آبی برای لینک‌های فعال

### ویژگی‌های غیرفعال:
- ❌ **جستجو:** فعلاً غیرفعال (مشکلات فنی)

## 🎨 طراحی

### رنگ‌ها:
- **رنگ اصلی:** آبی (`#2563eb`)
- **رنگ hover:** آبی روشن
- **رنگ فعال:** آبی تیره
- **رنگ متن:** مشکی/سفید (بسته به تم)

### فونت:
- **فونت اصلی:** IRANYekanX
- **فونت پشتیبان:** Vazirmatn, Tahoma, Arial

## 📁 ساختار فایل‌ها

```
my-docs/
├── docs/                    # مستندات
│   ├── intro.md            # صفحه اصلی
│   ├── getting-started/    # راهنمای شروع
│   ├── user-guide/         # راهنمای کاربری
│   ├── advanced/           # راهنمای پیشرفته
│   ├── api/                # مستندات API
│   └── troubleshooting/   # عیب‌یابی
├── blog/                   # بلاگ
├── src/
│   ├── css/
│   │   ├── custom.css      # استایل‌های سفارشی
│   │   └── fonts/          # فونت‌ها
│   └── pages/
│       └── index.tsx       # صفحه اصلی
├── sidebars.ts             # تنظیمات سایدبار
├── docusaurus.config.ts    # تنظیمات اصلی
└── package.json            # وابستگی‌ها
```

## 🚀 راه‌اندازی

### Development:
```bash
yarn start
```

### Build:
```bash
yarn build
```

### Serve:
```bash
yarn serve
```

## 🔍 جستجو (آینده)

### گزینه 1: Algolia (توصیه شده)
```typescript
// در docusaurus.config.ts
algolia: {
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'support-docs',
  contextualSearch: true,
},
```

### گزینه 2: جستجوی محلی
```typescript
// در docusaurus.config.ts
plugins: [
  [
    '@easyops-cn/docusaurus-search-local',
    {
      indexDocs: true,
      indexBlog: true,
      language: 'en', // یا حذف این خط
    },
  ],
],
```

## 📝 نکات مهم

1. **برای production:** تنظیمات Algolia را uncomment کنید
2. **برای جستجو:** یکی از گزینه‌های بالا را انتخاب کنید
3. **برای تغییر رنگ:** متغیرهای CSS در `custom.css` را تغییر دهید
4. **برای تغییر فونت:** فایل فونت جدید در `src/css/fonts/` قرار دهید

## 🎯 مراحل بعدی

1. **Deploy:** سایت را روی GitHub Pages یا Netlify deploy کنید
2. **Algolia:** درخواست DocSearch رایگان دهید
3. **محتوا:** محتوای فارسی اضافه کنید
4. **بهینه‌سازی:** تصاویر و فایل‌ها را بهینه کنید

## 📞 پشتیبانی

اگر مشکلی دارید:
- فایل‌های log را بررسی کنید
- تنظیمات را دوباره بررسی کنید
- cache را پاک کنید: `yarn docusaurus clear`


