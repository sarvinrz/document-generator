# API Endpoints - تیکت‌ها

راهنمای کامل API endpoints مربوط به مدیریت تیکت‌ها.

## دریافت لیست تیکت‌ها

### GET /api/tickets

```http
GET /api/tickets?page=1&limit=10&status=open&priority=high&category=technical
Authorization: Bearer <token>
```

**پارامترهای Query:**
- `page`: شماره صفحه (پیش‌فرض: 1)
- `limit`: تعداد آیتم در هر صفحه (پیش‌فرض: 20)
- `status`: فیلتر بر اساس وضعیت (open, in-progress, waiting, closed)
- `priority`: فیلتر بر اساس اولویت (low, medium, high, urgent)
- `category`: فیلتر بر اساس دسته‌بندی
- `assignee`: فیلتر بر اساس مسئول
- `search`: جستجو در عنوان و توضیحات

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": 1,
        "title": "مشکل لاگین",
        "description": "نمی‌توانم وارد سیستم شوم",
        "status": "open",
        "priority": "high",
        "category": "technical",
        "user": {
          "id": 123,
          "name": "علی احمدی",
          "email": "ali@example.com"
        },
        "assignee": {
          "id": 456,
          "name": "مریم رضایی"
        },
        "tags": ["login", "authentication"],
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
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

## دریافت تیکت خاص

### GET /api/tickets/:id

```http
GET /api/tickets/123
Authorization: Bearer <token>
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "مشکل لاگین",
    "description": "نمی‌توانم وارد سیستم شوم",
    "status": "open",
    "priority": "high",
    "category": "technical",
    "user": {
      "id": 123,
      "name": "علی احمدی",
      "email": "ali@example.com"
    },
    "assignee": {
      "id": 456,
      "name": "مریم رضایی"
    },
    "tags": ["login", "authentication"],
    "attachments": [
      {
        "id": 1,
        "filename": "screenshot.png",
        "originalName": "screenshot.png",
        "size": 1024000,
        "url": "/uploads/screenshot.png"
      }
    ],
    "responses": [
      {
        "id": 1,
        "message": "مشکل بررسی شد",
        "sender": {
          "id": 456,
          "name": "مریم رضایی"
        },
        "isAuto": false,
        "createdAt": "2024-01-15T11:00:00Z"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

## ایجاد تیکت جدید

### POST /api/tickets

```http
POST /api/tickets
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "مشکل لاگین",
  "description": "نمی‌توانم وارد سیستم شوم",
  "priority": "high",
  "category": "technical",
  "tags": ["login", "authentication"]
}
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "id": 124,
    "title": "مشکل لاگین",
    "description": "نمی‌توانم وارد سیستم شوم",
    "status": "open",
    "priority": "high",
    "category": "technical",
    "user": {
      "id": 123,
      "name": "علی احمدی"
    },
    "createdAt": "2024-01-21T09:15:00Z"
  },
  "message": "تیکت با موفقیت ایجاد شد"
}
```

## به‌روزرسانی تیکت

### PUT /api/tickets/:id

```http
PUT /api/tickets/123
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "مشکل لاگین - به‌روزرسانی",
  "description": "مشکل حل شد",
  "status": "closed",
  "priority": "medium"
}
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "مشکل لاگین - به‌روزرسانی",
    "description": "مشکل حل شد",
    "status": "closed",
    "priority": "medium",
    "updatedAt": "2024-01-21T10:30:00Z"
  },
  "message": "تیکت با موفقیت به‌روزرسانی شد"
}
```

## حذف تیکت

### DELETE /api/tickets/:id

```http
DELETE /api/tickets/123
Authorization: Bearer <token>
```

**پاسخ موفق:**
```json
{
  "success": true,
  "message": "تیکت با موفقیت حذف شد"
}
```

## تخصیص تیکت

### PUT /api/tickets/:id/assign

```http
PUT /api/tickets/123/assign
Authorization: Bearer <token>
Content-Type: application/json

{
  "assigneeId": 456
}
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "assignee": {
      "id": 456,
      "name": "مریم رضایی"
    },
    "status": "in-progress",
    "updatedAt": "2024-01-21T11:00:00Z"
  },
  "message": "تیکت با موفقیت تخصیص داده شد"
}
```

## ارسال پاسخ

### POST /api/tickets/:id/responses

```http
POST /api/tickets/123/responses
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "مشکل بررسی شد و راه‌حل ارسال می‌شود",
  "isInternal": false
}
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "message": "مشکل بررسی شد و راه‌حل ارسال می‌شود",
    "sender": {
      "id": 456,
      "name": "مریم رضایی"
    },
    "isInternal": false,
    "createdAt": "2024-01-21T12:00:00Z"
  },
  "message": "پاسخ با موفقیت ارسال شد"
}
```

## آپلود فایل ضمیمه

### POST /api/tickets/:id/attachments

```http
POST /api/tickets/123/attachments
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "filename": "document.pdf",
    "originalName": "document.pdf",
    "size": 2048000,
    "mimeType": "application/pdf",
    "url": "/uploads/document.pdf",
    "createdAt": "2024-01-21T12:30:00Z"
  },
  "message": "فایل با موفقیت آپلود شد"
}
```

## دریافت آمار تیکت‌ها

### GET /api/tickets/stats

```http
GET /api/tickets/stats?period=30d
Authorization: Bearer <token>
```

**پارامترهای Query:**
- `period`: بازه زمانی (7d, 30d, 90d, 1y)

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "open": 25,
    "inProgress": 15,
    "waiting": 10,
    "closed": 100,
    "byPriority": {
      "low": 50,
      "medium": 60,
      "high": 30,
      "urgent": 10
    },
    "byCategory": {
      "technical": 80,
      "billing": 30,
      "general": 40
    },
    "avgResponseTime": "2.5 hours",
    "satisfactionRate": 85.5
  }
}
```

## نمونه کدها

### JavaScript/Node.js

```javascript
// دریافت لیست تیکت‌ها
const getTickets = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/tickets?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
};

// ایجاد تیکت جدید
const createTicket = async (ticketData) => {
  const response = await fetch('/api/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(ticketData)
  });
  
  return response.json();
};

// ارسال پاسخ
const sendResponse = async (ticketId, message) => {
  const response = await fetch(`/api/tickets/${ticketId}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message })
  });
  
  return response.json();
};
```

### Python

```python
import requests

# دریافت لیست تیکت‌ها
def get_tickets(filters=None):
    response = requests.get(
        '/api/tickets',
        params=filters or {},
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()

# ایجاد تیکت جدید
def create_ticket(ticket_data):
    response = requests.post(
        '/api/tickets',
        json=ticket_data,
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()

# ارسال پاسخ
def send_response(ticket_id, message):
    response = requests.post(
        f'/api/tickets/{ticket_id}/responses',
        json={'message': message},
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()
```

### cURL

```bash
# دریافت لیست تیکت‌ها
curl -X GET "http://localhost:3000/api/tickets?status=open&priority=high" \
  -H "Authorization: Bearer YOUR_TOKEN"

# ایجاد تیکت جدید
curl -X POST "http://localhost:3000/api/tickets" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "مشکل لاگین",
    "description": "نمی‌توانم وارد سیستم شوم",
    "priority": "high",
    "category": "technical"
  }'

# ارسال پاسخ
curl -X POST "http://localhost:3000/api/tickets/123/responses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "message": "مشکل بررسی شد"
  }'
```

## کدهای خطا

| کد | معنی | توضیح |
|----|------|-------|
| 400 | Bad Request | داده‌های ورودی نامعتبر |
| 401 | Unauthorized | عدم احراز هویت |
| 403 | Forbidden | عدم دسترسی |
| 404 | Not Found | تیکت یافت نشد |
| 422 | Unprocessable Entity | خطای اعتبارسنجی |
| 500 | Internal Server Error | خطای سرور |

## مرحله بعدی

- [گزارش‌ها](/docs/api/endpoints/reports)
- [نمونه کدها](/docs/api/examples/javascript)
- [عیب‌یابی](/docs/troubleshooting/intro)

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
