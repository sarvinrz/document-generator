# راهنمای API

API سیستم پشتیبانی یک RESTful API است که امکان تعامل برنامه‌نویسی با سیستم را فراهم می‌کند.

## ویژگی‌های کلیدی

- **RESTful Design**: طراحی استاندارد REST
- **احراز هویت JWT**: امنیت بالا با JSON Web Tokens
- **مستندات کامل**: مستندات Swagger/OpenAPI
- **Rate Limiting**: محدودیت درخواست برای امنیت
- **پشتیبانی JSON**: فرمت استاندارد JSON
- **کدهای وضعیت HTTP**: کدهای استاندارد HTTP

## Base URL

```
https://api.support.example.com/v1
```

## احراز هویت

تمام درخواست‌های API نیاز به احراز هویت دارند. از JWT Token استفاده کنید:

```http
Authorization: Bearer <your-jwt-token>
```

### دریافت Token

```http
POST /auth/login
Content-Type: application/json

{
  "username": "your-username",
  "password": "your-password"
}
```

**پاسخ:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

## فرمت پاسخ‌ها

### پاسخ موفق

```json
{
  "success": true,
  "data": {
    // داده‌های درخواست
  },
  "message": "عملیات با موفقیت انجام شد"
}
```

### پاسخ خطا

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "داده‌های ورودی نامعتبر است",
    "details": {
      "field": "email",
      "message": "فرمت ایمیل نامعتبر است"
    }
  }
}
```

## کدهای وضعیت HTTP

| کد | معنی | توضیح |
|----|------|-------|
| 200 | OK | درخواست موفق |
| 201 | Created | ایجاد موفق |
| 400 | Bad Request | درخواست نامعتبر |
| 401 | Unauthorized | عدم احراز هویت |
| 403 | Forbidden | عدم دسترسی |
| 404 | Not Found | یافت نشد |
| 422 | Unprocessable Entity | خطای اعتبارسنجی |
| 429 | Too Many Requests | تعداد درخواست زیاد |
| 500 | Internal Server Error | خطای سرور |

## Rate Limiting

- **محدودیت عمومی**: 100 درخواست در 15 دقیقه
- **محدودیت احراز هویت**: 5 درخواست در 15 دقیقه
- **محدودیت آپلود**: 10 درخواست در ساعت

### هدرهای Rate Limit

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Pagination

برای لیست‌های طولانی از pagination استفاده کنید:

```http
GET /users?page=1&limit=10&sort=created_at&order=desc
```

**پاسخ:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 150,
      "totalPages": 15,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## فیلتر کردن

از query parameters برای فیلتر کردن استفاده کنید:

```http
GET /tickets?status=open&priority=high&assignee=123
```

## مرتب‌سازی

```http
GET /tickets?sort=created_at&order=desc
```

## جستجو

```http
GET /tickets?search=مشکل لاگین
```

## آپلود فایل

```http
POST /upload
Content-Type: multipart/form-data

file: <file>
```

**پاسخ:**
```json
{
  "success": true,
  "data": {
    "filename": "document.pdf",
    "url": "/uploads/document.pdf",
    "size": 1024000,
    "mimeType": "application/pdf"
  }
}
```

## Webhooks

برای دریافت اطلاع‌رسانی‌های لحظه‌ای:

```http
POST /webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["ticket.created", "ticket.updated"]
}
```

## SDK ها

### JavaScript/Node.js

```bash
npm install support-api-client
```

```javascript
const SupportAPI = require('support-api-client');

const api = new SupportAPI({
  baseURL: 'https://api.support.example.com/v1',
  token: 'your-jwt-token'
});

// دریافت لیست تیکت‌ها
const tickets = await api.tickets.list();
```

### Python

```bash
pip install support-api-client
```

```python
from support_api import SupportAPI

api = SupportAPI(
    base_url='https://api.support.example.com/v1',
    token='your-jwt-token'
)

# دریافت لیست تیکت‌ها
tickets = api.tickets.list()
```

## تست API

### Postman Collection

مجموعه Postman در آینده اضافه خواهد شد.

### cURL Examples

```bash
# دریافت لیست تیکت‌ها
curl -X GET \
  'https://api.support.example.com/v1/tickets' \
  -H 'Authorization: Bearer your-jwt-token'

# ایجاد تیکت جدید
curl -X POST \
  'https://api.support.example.com/v1/tickets' \
  -H 'Authorization: Bearer your-jwt-token' \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "مشکل لاگین",
    "description": "نمی‌توانم وارد سیستم شوم",
    "priority": "high"
  }'
```

## مرحله بعدی

- [احراز هویت](/docs/api/auth/overview)
- [Endpoints](/docs/api/endpoints/users)
- [نمونه کدها](/docs/api/examples/javascript)
