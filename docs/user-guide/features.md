# ویژگی‌های سیستم

سیستم پشتیبانی دارای ویژگی‌های متنوع و قدرتمندی است که مدیریت تیکت‌ها و ارتباط با کاربران را آسان می‌کند.

## مدیریت تیکت‌ها

### ایجاد تیکت

#### از طریق رابط کاربری

1. روی دکمه "تیکت جدید" کلیک کنید
2. فرم ایجاد تیکت را پر کنید:
   - **موضوع**: عنوان تیکت
   - **دسته‌بندی**: انتخاب دسته مناسب
   - **اولویت**: کم، متوسط، بالا، فوری
   - **توضیحات**: شرح کامل مشکل
   - **ضمیمه**: فایل‌های مرتبط
3. تیکت را ارسال کنید

#### از طریق API

```javascript
const response = await fetch('/api/tickets', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    title: 'مشکل لاگین',
    description: 'نمی‌توانم وارد سیستم شوم',
    priority: 'high',
    category: 'technical'
  })
});
```

### وضعیت‌های تیکت

- **باز**: تیکت جدید ایجاد شده
- **در حال بررسی**: در دست بررسی اپراتور
- **منتظر پاسخ**: منتظر پاسخ کاربر
- **بسته**: حل شده و بسته شده
- **لغو شده**: لغو شده توسط کاربر

### اولویت‌بندی

- **فوری**: نیاز به اقدام فوری (زمان پاسخ: 1 ساعت)
- **بالا**: مهم و نیاز به توجه سریع (زمان پاسخ: 4 ساعت)
- **متوسط**: معمولی (زمان پاسخ: 24 ساعت)
- **کم**: کم‌اهمیت (زمان پاسخ: 72 ساعت)

## سیستم پیام‌رسانی

### ارسال پیام

#### پیام متنی

```markdown
سلام،

مشکل شما بررسی شد و راه‌حل آن در ادامه آمده است:

1. مرورگر خود را به‌روزرسانی کنید
2. کش مرورگر را پاک کنید
3. دوباره وارد سیستم شوید

اگر مشکل ادامه داشت، لطفاً اطلاع دهید.

با تشکر
تیم پشتیبانی
```

#### پیام با فرمت‌بندی

- **متن پررنگ**: `**متن مهم**`
- *متن کج*: `*متن کج*`
- `کد`: `` `کد` ``
- [لینک](https://example.com): `[لینک](https://example.com)`

### ضمیمه فایل

#### انواع فایل مجاز

- **تصاویر**: JPG, PNG, GIF, SVG
- **مستندات**: PDF, DOC, DOCX, TXT
- **فایل‌های فشرده**: ZIP, RAR, 7Z
- **فایل‌های کد**: JS, CSS, HTML, PHP

#### محدودیت‌ها

- **حجم**: حداکثر 10 مگابایت
- **تعداد**: حداکثر 5 فایل در هر پیام
- **امنیت**: اسکن ویروس خودکار

## سیستم کاربران

### نقش‌های کاربری

#### مدیر (Admin)

- دسترسی کامل به تمام بخش‌ها
- مدیریت کاربران و نقش‌ها
- تنظیمات سیستم
- گزارش‌گیری

#### اپراتور (Operator)

- مدیریت تیکت‌ها
- پاسخ به کاربران
- تغییر وضعیت تیکت‌ها
- مشاهده گزارش‌ها

#### کاربر (User)

- ایجاد تیکت
- مشاهده تیکت‌های خود
- ارسال پیام
- ارزیابی خدمات

### احراز هویت

#### ورود به سیستم

```javascript
// ورود با نام کاربری و رمز عبور
const loginData = {
  username: 'user@example.com',
  password: 'password123'
};

const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(loginData)
});
```

#### احراز هویت دو مرحله‌ای

1. وارد کردن نام کاربری و رمز عبور
2. دریافت کد تأیید از طریق:
   - پیامک
   - ایمیل
   - اپلیکیشن احراز هویت
3. وارد کردن کد تأیید

## سیستم گزارش‌گیری

### گزارش‌های از پیش تعریف شده

#### گزارش عملکرد

```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_tickets,
  AVG(response_time) as avg_response_time,
  COUNT(CASE WHEN status = 'closed' THEN 1 END) as closed_tickets
FROM tickets 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

#### گزارش رضایت کاربران

```sql
SELECT 
  rating,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM ticket_feedback 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY rating
ORDER BY rating DESC;
```

### گزارش‌های سفارشی

#### ایجاد گزارش جدید

1. به بخش "گزارش‌ها" بروید
2. "گزارش جدید" را کلیک کنید
3. پارامترهای مورد نظر را انتخاب کنید
4. گزارش را ذخیره کنید

#### فرمت‌های خروجی

- **PDF**: برای چاپ و ارسال
- **Excel**: برای تحلیل داده‌ها
- **CSV**: برای وارد کردن به سیستم‌های دیگر
- **JSON**: برای API و یکپارچه‌سازی

## سیستم اعلان‌ها

### انواع اعلان

#### اعلان‌های سیستم

- **تیکت جدید**: هنگام ایجاد تیکت جدید
- **پاسخ جدید**: هنگام دریافت پاسخ
- **تغییر وضعیت**: هنگام تغییر وضعیت تیکت
- **یادآوری**: یادآوری تیکت‌های بدون پاسخ

#### اعلان‌های امنیتی

- **ورود ناموفق**: تلاش برای ورود با رمز اشتباه
- **تغییر رمز عبور**: تغییر رمز عبور کاربر
- **دسترسی غیرمجاز**: تلاش برای دسترسی به بخش‌های محدود

### تنظیمات اعلان

```javascript
const notificationSettings = {
  email: {
    enabled: true,
    newTicket: true,
    newResponse: true,
    statusChange: false
  },
  sms: {
    enabled: false,
    urgentOnly: true
  },
  browser: {
    enabled: true,
    sound: true
  }
};
```

## سیستم کش

### کش صفحات

```javascript
// کش صفحات برای بهبود عملکرد
const cacheConfig = {
  pages: {
    ttl: 300, // 5 دقیقه
    maxSize: 100
  },
  api: {
    ttl: 60, // 1 دقیقه
    maxSize: 1000
  }
};
```

### کش داده‌ها

```javascript
// کش داده‌های دیتابیس
const dataCache = {
  users: {
    ttl: 600, // 10 دقیقه
    key: 'users_list'
  },
  categories: {
    ttl: 3600, // 1 ساعت
    key: 'categories_list'
  }
};
```

## سیستم امنیتی

### رمزگذاری

#### رمزگذاری داده‌ها

```javascript
const crypto = require('crypto');

function encrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedText, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

#### رمزگذاری فایل‌ها

```javascript
// رمزگذاری فایل‌های آپلود شده
const fileEncryption = {
  algorithm: 'aes-256-gcm',
  keyLength: 32,
  ivLength: 16
};
```

### محدودیت‌های امنیتی

#### Rate Limiting

```javascript
const rateLimit = {
  login: {
    windowMs: 15 * 60 * 1000, // 15 دقیقه
    max: 5 // حداکثر 5 تلاش
  },
  api: {
    windowMs: 15 * 60 * 1000, // 15 دقیقه
    max: 100 // حداکثر 100 درخواست
  }
};
```

#### فیلتر کردن ورودی

```javascript
// فیلتر کردن ورودی‌های کاربر
const inputFilter = {
  html: true, // حذف تگ‌های HTML
  sql: true,  // جلوگیری از SQL Injection
  xss: true   // جلوگیری از XSS
};
```

## مرحله بعدی

- [تنظیمات کاربری](/docs/user-guide/settings)
- [راهنمای پیشرفته](/docs/advanced/customization)
- [یکپارچه‌سازی](/docs/advanced/integrations)

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
