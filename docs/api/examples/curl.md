# نمونه کدها - cURL

نمونه‌های عملی استفاده از API سیستم پشتیبانی با cURL.

## احراز هویت

### ورود به سیستم

```bash
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### استفاده از Token

```bash
# ذخیره token در متغیر
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# استفاده از token در درخواست‌ها
curl -X GET "http://localhost:3000/api/tickets" \
  -H "Authorization: Bearer $TOKEN"
```

## مدیریت تیکت‌ها

### دریافت لیست تیکت‌ها

```bash
curl -X GET "http://localhost:3000/api/tickets?status=open&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

### ایجاد تیکت جدید

```bash
curl -X POST "http://localhost:3000/api/tickets" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "مشکل لاگین",
    "description": "نمی‌توانم وارد سیستم شوم",
    "priority": "high",
    "category": "technical"
  }'
```

### ارسال پاسخ

```bash
curl -X POST "http://localhost:3000/api/tickets/123/responses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "message": "مشکل بررسی شد"
  }'
```

## مدیریت کاربران

### دریافت لیست کاربران

```bash
curl -X GET "http://localhost:3000/api/users?role=operator" \
  -H "Authorization: Bearer $TOKEN"
```

### ایجاد کاربر جدید

```bash
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "firstName": "علی",
    "lastName": "احمدی",
    "email": "ali@example.com",
    "role": "operator",
    "password": "password123"
  }'
```

## گزارش‌گیری

### دریافت گزارش عملکرد

```bash
curl -X GET "http://localhost:3000/api/reports/performance?period=30d" \
  -H "Authorization: Bearer $TOKEN"
```

### تولید گزارش سفارشی

```bash
curl -X POST "http://localhost:3000/api/reports/custom" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "گزارش سفارشی",
    "filters": {
      "category": "technical",
      "period": "30d"
    },
    "format": "json"
  }'
```

## نکات مهم

- همیشه از HTTPS در محیط تولید استفاده کنید
- Token را در متغیرهای محیطی ذخیره کنید
- از rate limiting آگاه باشید
- خطاها را بررسی کنید

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
