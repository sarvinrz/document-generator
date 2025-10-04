# تنظیمات کاربری

این بخش شامل تنظیمات شخصی و عمومی سیستم است که می‌توانید مطابق نیازهای خود تغییر دهید.

## تنظیمات پروفایل

### اطلاعات شخصی

در بخش "پروفایل" → "اطلاعات شخصی":

- **نام**: نام شما
- **نام خانوادگی**: نام خانوادگی شما
- **ایمیل**: آدرس ایمیل (برای دریافت اعلان‌ها)
- **شماره تلفن**: شماره تماس
- **آواتار**: تصویر پروفایل

### تغییر رمز عبور

1. به بخش "امنیت" → "رمز عبور" بروید
2. رمز عبور فعلی را وارد کنید
3. رمز عبور جدید را وارد کنید
4. رمز عبور جدید را تأیید کنید
5. تغییرات را ذخیره کنید

```javascript
// تغییر رمز عبور از طریق API
const changePassword = async (currentPassword, newPassword) => {
  const response = await fetch('/api/user/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      currentPassword,
      newPassword
    })
  });
  
  return response.json();
};
```

## تنظیمات اعلان‌ها

### اعلان‌های ایمیل

```javascript
const emailNotifications = {
  newTicket: true,        // تیکت جدید
  newResponse: true,      // پاسخ جدید
  statusChange: false,    // تغییر وضعیت
  reminder: true,         // یادآوری
  daily: false,          // گزارش روزانه
  weekly: true           // گزارش هفتگی
};
```

### اعلان‌های پیامک

```javascript
const smsNotifications = {
  enabled: false,         // فعال/غیرفعال
  urgentOnly: true,      // فقط فوری
  newTicket: false,      // تیکت جدید
  newResponse: false     // پاسخ جدید
};
```

### اعلان‌های مرورگر

```javascript
const browserNotifications = {
  enabled: true,          // فعال/غیرفعال
  sound: true,           // صدا
  desktop: true,         // دسکتاپ
  mobile: true           // موبایل
};
```

## تنظیمات رابط کاربری

### تم و رنگ‌بندی

#### تم روشن

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
  --background-color: #ffffff;
  --text-color: #333333;
}
```

#### تم تاریک

```css
[data-theme='dark'] {
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
  --success-color: #198754;
  --warning-color: #fd7e14;
  --danger-color: #dc3545;
  --background-color: #212529;
  --text-color: #ffffff;
}
```

### زبان و منطقه

```javascript
const localeSettings = {
  language: 'fa',         // زبان: fa, en
  direction: 'rtl',       // جهت: rtl, ltr
  timezone: 'Asia/Tehran', // منطقه زمانی
  dateFormat: 'YYYY/MM/DD', // فرمت تاریخ
  timeFormat: 'HH:mm'     // فرمت زمان
};
```

### تنظیمات صفحه‌بندی

```javascript
const paginationSettings = {
  itemsPerPage: 20,      // تعداد آیتم در هر صفحه
  showPageNumbers: true, // نمایش شماره صفحات
  showPageInfo: true,    // نمایش اطلاعات صفحه
  showJumpToPage: true   // نمایش جستجوی صفحه
};
```

## تنظیمات امنیتی

### احراز هویت دو مرحله‌ای

#### فعال‌سازی

1. به بخش "امنیت" → "احراز هویت دو مرحله‌ای" بروید
2. "فعال‌سازی" را کلیک کنید
3. اپلیکیشن احراز هویت خود را اسکن کنید
4. کد تأیید را وارد کنید
5. کدهای بازیابی را ذخیره کنید

#### غیرفعال‌سازی

```javascript
// غیرفعال‌سازی احراز هویت دو مرحله‌ای
const disable2FA = async (password) => {
  const response = await fetch('/api/user/disable-2fa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ password })
  });
  
  return response.json();
};
```

### جلسات فعال

در بخش "امنیت" → "جلسات فعال":

- **دستگاه**: نام دستگاه
- **آدرس IP**: آدرس IP
- **مکان**: موقعیت جغرافیایی
- **آخرین فعالیت**: زمان آخرین فعالیت
- **وضعیت**: فعال/غیرفعال

```javascript
// خاتمه جلسه
const terminateSession = async (sessionId) => {
  const response = await fetch(`/api/user/sessions/${sessionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  
  return response.json();
};
```

### محدودیت IP

```javascript
const ipRestrictions = {
  enabled: false,         // فعال/غیرفعال
  allowedIPs: [           // IP های مجاز
    '192.168.1.0/24',
    '10.0.0.0/8'
  ],
  blockedIPs: [           // IP های مسدود
    '192.168.1.100'
  ]
};
```

## تنظیمات پیشرفته

### تنظیمات API

```javascript
const apiSettings = {
  rateLimit: {
    enabled: true,        // فعال/غیرفعال
    requests: 100,        // تعداد درخواست
    window: 15            // بازه زمانی (دقیقه)
  },
  timeout: 30000,         // زمان انتظار (میلی‌ثانیه)
  retries: 3,            // تعداد تلاش مجدد
  cache: {
    enabled: true,        // فعال/غیرفعال
    ttl: 300             // زمان زندگی (ثانیه)
  }
};
```

### تنظیمات لاگ

```javascript
const loggingSettings = {
  level: 'info',          // سطح: debug, info, warn, error
  file: {
    enabled: true,        // فعال/غیرفعال
    path: 'logs/app.log', // مسیر فایل
    maxSize: '10m',       // حداکثر حجم
    maxFiles: 5           // حداکثر تعداد فایل
  },
  console: {
    enabled: true,        // فعال/غیرفعال
    colorize: true        // رنگی کردن
  }
};
```

### تنظیمات کش

```javascript
const cacheSettings = {
  redis: {
    enabled: true,        // فعال/غیرفعال
    host: 'localhost',    // میزبان
    port: 6379,          // پورت
    password: '',        // رمز عبور
    db: 0               // پایگاه داده
  },
  memory: {
    enabled: true,        // فعال/غیرفعال
    maxSize: '100mb',    // حداکثر حجم
    ttl: 3600           // زمان زندگی (ثانیه)
  }
};
```

## تنظیمات سیستم

### تنظیمات عمومی

```javascript
const systemSettings = {
  name: 'سیستم پشتیبانی',
  version: '1.0.0',
  timezone: 'Asia/Tehran',
  language: 'fa',
  direction: 'rtl',
  maintenance: {
    enabled: false,       // حالت تعمیر
    message: 'سیستم در حال تعمیر است'
  }
};
```

### تنظیمات ایمیل

```javascript
const emailSettings = {
  smtp: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  },
  templates: {
    welcome: 'templates/welcome.html',
    reset: 'templates/reset-password.html',
    notification: 'templates/notification.html'
  }
};
```

### تنظیمات فایل

```javascript
const fileSettings = {
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'text/plain'
    ],
    path: 'uploads/',
    url: '/uploads/'
  },
  storage: {
    type: 'local',        // local, s3, gcs
    path: 'storage/',
    backup: {
      enabled: true,      // فعال/غیرفعال
      frequency: 'daily'  // فرکانس: daily, weekly, monthly
    }
  }
};
```

## پشتیبان‌گیری و بازیابی

### پشتیبان‌گیری خودکار

```javascript
const backupSettings = {
  enabled: true,          // فعال/غیرفعال
  frequency: 'daily',     // فرکانس: daily, weekly, monthly
  time: '02:00',         // زمان اجرا
  retention: 30,         // تعداد نسخه‌های نگهداری
  destination: {
    type: 'local',        // local, s3, gcs
    path: 'backups/'
  }
};
```

### بازیابی

```javascript
// بازیابی از پشتیبان
const restoreBackup = async (backupId) => {
  const response = await fetch(`/api/system/restore/${backupId}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  
  return response.json();
};
```

## مرحله بعدی

- [راهنمای پیشرفته](/docs/advanced/customization)
- [یکپارچه‌سازی](/docs/advanced/integrations)
- [عیب‌یابی](/docs/troubleshooting/intro)

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
