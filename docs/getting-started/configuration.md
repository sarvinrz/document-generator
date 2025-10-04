# پیکربندی سیستم

پس از نصب، باید سیستم را مطابق نیازهای خود پیکربندی کنید.

## تنظیمات اصلی

### 1. تنظیمات عمومی

در فایل `config/app.js`:

```javascript
module.exports = {
  app: {
    name: 'سیستم پشتیبانی',
    version: '1.0.0',
    timezone: 'Asia/Tehran',
    language: 'fa',
    direction: 'rtl'
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  }
};
```

### 2. تنظیمات دیتابیس

```javascript
module.exports = {
  database: {
    type: 'postgresql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'support_db',
    synchronize: false,
    logging: process.env.NODE_ENV === 'development'
  }
};
```

### 3. تنظیمات احراز هویت

```javascript
module.exports = {
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '24h'
    },
    bcrypt: {
      saltRounds: 12
    }
  }
};
```

## تنظیمات ایمیل

### SMTP Configuration

```javascript
module.exports = {
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    templates: {
      welcome: 'templates/welcome.html',
      reset: 'templates/reset-password.html',
      notification: 'templates/notification.html'
    }
  }
};
```

### قالب‌های ایمیل

ایمیل‌های خودکار را می‌توانید در پوشه `templates/` سفارشی کنید:

```html
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>خوش آمدید</title>
</head>
<body>
    <h1>سلام {{name}}!</h1>
    <p>به سیستم پشتیبانی خوش آمدید.</p>
</body>
</html>
```

## تنظیمات امنیتی

### CORS Configuration

```javascript
module.exports = {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};
```

### Rate Limiting

```javascript
module.exports = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'تعداد درخواست‌های شما بیش از حد مجاز است'
  }
};
```

## تنظیمات لاگ

```javascript
module.exports = {
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'combined',
    file: {
      enabled: true,
      path: 'logs/app.log',
      maxSize: '10m',
      maxFiles: 5
    }
  }
};
```

## تنظیمات کش

```javascript
module.exports = {
  cache: {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD
    },
    ttl: 3600 // 1 hour
  }
};
```

## تنظیمات فایل

```javascript
module.exports = {
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    path: 'uploads/',
    url: '/uploads/'
  }
};
```

## متغیرهای محیطی

فایل `.env` خود را با متغیرهای زیر تکمیل کنید:

```env
# محیط اجرا
NODE_ENV=production

# دیتابیس
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=support_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# ایمیل
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# امنیت
JWT_SECRET=your-super-secret-key
API_KEY=your-api-key

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# لاگ
LOG_LEVEL=info
```

## تست پیکربندی

پس از پیکربندی، سیستم را تست کنید:

```bash
npm run test:config
```

## مرحله بعدی

پس از پیکربندی، [اولین قدم‌ها](/docs/getting-started/first-steps) را مطالعه کنید.
