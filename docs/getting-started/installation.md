# نصب سیستم

این راهنما شما را در نصب و راه‌اندازی اولیه سیستم پشتیبانی راهنمایی می‌کند.

## پیش‌نیازها

قبل از شروع، مطمئن شوید که موارد زیر را دارید:

- **Node.js** نسخه 18 یا بالاتر
- **npm** یا **yarn** برای مدیریت پکیج‌ها
- **Git** برای کنترل نسخه
- **دسترسی به دیتابیس** (PostgreSQL یا MySQL)

## نصب

### 1. کلون کردن مخزن

```bash
git clone https://github.com/your-org/support-system.git
cd support-system
```

### 2. نصب وابستگی‌ها

```bash
npm install
# یا
yarn install
```

### 3. پیکربندی محیط

فایل `.env.example` را کپی کرده و تنظیمات خود را اضافه کنید:

```bash
cp .env.example .env
```

سپس فایل `.env` را ویرایش کنید:

```env
# دیتابیس
DATABASE_URL=postgresql://username:password@localhost:5432/support_db

# کلیدهای API
JWT_SECRET=your-secret-key
API_KEY=your-api-key

# تنظیمات ایمیل
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

### 4. راه‌اندازی دیتابیس

```bash
npm run db:migrate
npm run db:seed
```

### 5. اجرای سیستم

```bash
npm run dev
```

سیستم در آدرس `http://localhost:3000` در دسترس خواهد بود.

## تأیید نصب

برای اطمینان از نصب صحیح:

1. به آدرس `http://localhost:3000` بروید
2. صفحه ورود را مشاهده کنید
3. با حساب پیش‌فرض وارد شوید:
   - **نام کاربری**: admin
   - **رمز عبور**: admin123

## مشکلات رایج

### خطای اتصال به دیتابیس
- مطمئن شوید دیتابیس در حال اجرا است
- تنظیمات اتصال در فایل `.env` را بررسی کنید

### خطای پورت
اگر پورت 3000 اشغال است:
```bash
PORT=3001 npm run dev
```

### خطای وابستگی‌ها
```bash
rm -rf node_modules package-lock.json
npm install
```

## مرحله بعدی

پس از نصب موفق، [پیکربندی سیستم](/docs/getting-started/configuration) را مطالعه کنید.
