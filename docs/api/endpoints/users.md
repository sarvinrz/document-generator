# API Endpoints - کاربران

راهنمای کامل API endpoints مربوط به مدیریت کاربران.

## دریافت لیست کاربران

### GET /api/users

```http
GET /api/users?page=1&limit=10&search=علی&role=operator
Authorization: Bearer <token>
```

**پارامترهای Query:**
- `page`: شماره صفحه (پیش‌فرض: 1)
- `limit`: تعداد آیتم در هر صفحه (پیش‌فرض: 20)
- `search`: جستجو در نام و ایمیل
- `role`: فیلتر بر اساس نقش
- `status`: فیلتر بر اساس وضعیت

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "firstName": "علی",
        "lastName": "احمدی",
        "email": "ali@example.com",
        "role": "operator",
        "status": "active",
        "createdAt": "2024-01-15T10:30:00Z",
        "lastLogin": "2024-01-20T14:25:00Z"
      }
    ],
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

## دریافت کاربر خاص

### GET /api/users/:id

```http
GET /api/users/123
Authorization: Bearer <token>
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "firstName": "علی",
    "lastName": "احمدی",
    "email": "ali@example.com",
    "phone": "09123456789",
    "role": "operator",
    "status": "active",
    "permissions": [
      "tickets.read",
      "tickets.write",
      "users.read"
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:25:00Z",
    "lastLogin": "2024-01-20T14:25:00Z"
  }
}
```

## ایجاد کاربر جدید

### POST /api/users

```http
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "مریم",
  "lastName": "رضایی",
  "email": "maryam@example.com",
  "phone": "09123456789",
  "role": "operator",
  "password": "securepassword123"
}
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "id": 124,
    "firstName": "مریم",
    "lastName": "رضایی",
    "email": "maryam@example.com",
    "role": "operator",
    "status": "active",
    "createdAt": "2024-01-21T09:15:00Z"
  },
  "message": "کاربر با موفقیت ایجاد شد"
}
```

## به‌روزرسانی کاربر

### PUT /api/users/:id

```http
PUT /api/users/123
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "علی",
  "lastName": "احمدی",
  "phone": "09123456789",
  "role": "admin"
}
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "firstName": "علی",
    "lastName": "احمدی",
    "email": "ali@example.com",
    "phone": "09123456789",
    "role": "admin",
    "updatedAt": "2024-01-21T10:30:00Z"
  },
  "message": "کاربر با موفقیت به‌روزرسانی شد"
}
```

## حذف کاربر

### DELETE /api/users/:id

```http
DELETE /api/users/123
Authorization: Bearer <token>
```

**پاسخ موفق:**
```json
{
  "success": true,
  "message": "کاربر با موفقیت حذف شد"
}
```

## تغییر رمز عبور

### PUT /api/users/:id/password

```http
PUT /api/users/123/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

**پاسخ موفق:**
```json
{
  "success": true,
  "message": "رمز عبور با موفقیت تغییر کرد"
}
```

## فعال/غیرفعال کردن کاربر

### PUT /api/users/:id/status

```http
PUT /api/users/123/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "inactive"
}
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "status": "inactive",
    "updatedAt": "2024-01-21T11:00:00Z"
  },
  "message": "وضعیت کاربر تغییر کرد"
}
```

## دریافت آمار کاربران

### GET /api/users/stats

```http
GET /api/users/stats
Authorization: Bearer <token>
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "active": 120,
    "inactive": 30,
    "byRole": {
      "admin": 5,
      "operator": 45,
      "user": 100
    },
    "recentRegistrations": 12,
    "onlineUsers": 25
  }
}
```

## نمونه کدها

### JavaScript/Node.js

```javascript
// دریافت لیست کاربران
const getUsers = async (page = 1, limit = 20) => {
  const response = await fetch(`/api/users?page=${page}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
};

// ایجاد کاربر جدید
const createUser = async (userData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });
  
  return response.json();
};

// به‌روزرسانی کاربر
const updateUser = async (userId, userData) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });
  
  return response.json();
};
```

### Python

```python
import requests

# دریافت لیست کاربران
def get_users(page=1, limit=20):
    response = requests.get(
        f'/api/users?page={page}&limit={limit}',
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()

# ایجاد کاربر جدید
def create_user(user_data):
    response = requests.post(
        '/api/users',
        json=user_data,
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()

# به‌روزرسانی کاربر
def update_user(user_id, user_data):
    response = requests.put(
        f'/api/users/{user_id}',
        json=user_data,
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()
```

### cURL

```bash
# دریافت لیست کاربران
curl -X GET "http://localhost:3000/api/users?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"

# ایجاد کاربر جدید
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "firstName": "علی",
    "lastName": "احمدی",
    "email": "ali@example.com",
    "role": "operator",
    "password": "password123"
  }'

# به‌روزرسانی کاربر
curl -X PUT "http://localhost:3000/api/users/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "firstName": "علی",
    "lastName": "احمدی",
    "phone": "09123456789"
  }'
```

## کدهای خطا

| کد | معنی | توضیح |
|----|------|-------|
| 400 | Bad Request | داده‌های ورودی نامعتبر |
| 401 | Unauthorized | عدم احراز هویت |
| 403 | Forbidden | عدم دسترسی |
| 404 | Not Found | کاربر یافت نشد |
| 409 | Conflict | ایمیل تکراری |
| 422 | Unprocessable Entity | خطای اعتبارسنجی |
| 500 | Internal Server Error | خطای سرور |

## مرحله بعدی

- [تیکت‌ها](/docs/api/endpoints/tickets)
- [گزارش‌ها](/docs/api/endpoints/reports)
- [نمونه کدها](/docs/api/examples/javascript)

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
