# API Endpoints - گزارش‌ها

راهنمای کامل API endpoints مربوط به گزارش‌گیری و آمار.

## دریافت گزارش عملکرد

### GET /api/reports/performance

```http
GET /api/reports/performance?period=30d&format=json
Authorization: Bearer <token>
```

**پارامترهای Query:**
- `period`: بازه زمانی (7d, 30d, 90d, 1y)
- `format`: فرمت خروجی (json, csv, pdf)
- `groupBy`: گروه‌بندی (day, week, month)

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "period": "30d",
    "summary": {
      "totalTickets": 150,
      "resolvedTickets": 120,
      "avgResponseTime": "2.5 hours",
      "avgResolutionTime": "8.2 hours",
      "satisfactionRate": 85.5
    },
    "dailyStats": [
      {
        "date": "2024-01-01",
        "ticketsCreated": 5,
        "ticketsResolved": 4,
        "avgResponseTime": "2.1 hours"
      }
    ],
    "byCategory": {
      "technical": {
        "count": 80,
        "avgResolutionTime": "6.5 hours",
        "satisfactionRate": 88.2
      },
      "billing": {
        "count": 30,
        "avgResolutionTime": "4.2 hours",
        "satisfactionRate": 92.1
      }
    }
  }
}
```

## دریافت گزارش کاربران

### GET /api/reports/users

```http
GET /api/reports/users?period=30d&includeInactive=true
Authorization: Bearer <token>
```

**پارامترهای Query:**
- `period`: بازه زمانی
- `includeInactive`: شامل کاربران غیرفعال
- `groupBy`: گروه‌بندی (role, status, registration_date)

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "activeUsers": 120,
    "inactiveUsers": 30,
    "newRegistrations": 25,
    "byRole": {
      "admin": 5,
      "operator": 45,
      "user": 100
    },
    "activityStats": [
      {
        "date": "2024-01-01",
        "activeUsers": 85,
        "newRegistrations": 2,
        "ticketsCreated": 12
      }
    ],
    "topUsers": [
      {
        "id": 123,
        "name": "علی احمدی",
        "ticketsCreated": 15,
        "lastActivity": "2024-01-20T14:30:00Z"
      }
    ]
  }
}
```

## دریافت گزارش تیکت‌ها

### GET /api/reports/tickets

```http
GET /api/reports/tickets?period=30d&category=technical&priority=high
Authorization: Bearer <token>
```

**پارامترهای Query:**
- `period`: بازه زمانی
- `category`: فیلتر دسته‌بندی
- `priority`: فیلتر اولویت
- `assignee`: فیلتر مسئول
- `status`: فیلتر وضعیت

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total": 150,
      "open": 25,
      "inProgress": 15,
      "waiting": 10,
      "closed": 100
    },
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
    "resolutionTime": {
      "avg": "8.2 hours",
      "min": "0.5 hours",
      "max": "72 hours",
      "median": "6.5 hours"
    },
    "trends": [
      {
        "date": "2024-01-01",
        "created": 5,
        "resolved": 4,
        "backlog": 1
      }
    ]
  }
}
```

## دریافت گزارش اپراتورها

### GET /api/reports/operators

```http
GET /api/reports/operators?period=30d&includeDetails=true
Authorization: Bearer <token>
```

**پارامترهای Query:**
- `period`: بازه زمانی
- `includeDetails`: شامل جزئیات کامل
- `sortBy`: مرتب‌سازی (tickets_resolved, response_time, satisfaction)

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "operators": [
      {
        "id": 456,
        "name": "مریم رضایی",
        "role": "operator",
        "stats": {
          "ticketsAssigned": 45,
          "ticketsResolved": 42,
          "avgResponseTime": "1.8 hours",
          "avgResolutionTime": "6.2 hours",
          "satisfactionRate": 92.5,
          "workingHours": 160
        },
        "performance": {
          "score": 8.7,
          "rank": 1,
          "improvement": "+0.3"
        }
      }
    ],
    "summary": {
      "totalOperators": 5,
      "avgResponseTime": "2.1 hours",
      "avgResolutionTime": "7.5 hours",
      "avgSatisfactionRate": 87.3
    }
  }
}
```

## دریافت گزارش رضایت

### GET /api/reports/satisfaction

```http
GET /api/reports/satisfaction?period=30d&minRating=4
Authorization: Bearer <token>
```

**پارامترهای Query:**
- `period`: بازه زمانی
- `minRating`: حداقل امتیاز
- `groupBy`: گروه‌بندی (operator, category, priority)

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "overallSatisfaction": 85.5,
    "totalResponses": 120,
    "ratingDistribution": {
      "5": 65,
      "4": 35,
      "3": 15,
      "2": 3,
      "1": 2
    },
    "byOperator": [
      {
        "operatorId": 456,
        "operatorName": "مریم رضایی",
        "avgRating": 4.6,
        "totalResponses": 25,
        "satisfactionRate": 92.0
      }
    ],
    "byCategory": {
      "technical": {
        "avgRating": 4.2,
        "satisfactionRate": 84.0
      },
      "billing": {
        "avgRating": 4.7,
        "satisfactionRate": 94.0
      }
    },
    "trends": [
      {
        "date": "2024-01-01",
        "avgRating": 4.3,
        "responses": 8
      }
    ]
  }
}
```

## دریافت گزارش مالی

### GET /api/reports/financial

```http
GET /api/reports/financial?period=30d&currency=IRR
Authorization: Bearer <token>
```

**پارامترهای Query:**
- `period`: بازه زمانی
- `currency`: واحد پول
- `includeProjections`: شامل پیش‌بینی‌ها

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "revenue": {
      "total": 15000000,
      "currency": "IRR",
      "growth": 12.5
    },
    "costs": {
      "total": 8000000,
      "breakdown": {
        "personnel": 6000000,
        "infrastructure": 1500000,
        "marketing": 500000
      }
    },
    "profit": {
      "total": 7000000,
      "margin": 46.7
    },
    "byMonth": [
      {
        "month": "2024-01",
        "revenue": 5000000,
        "costs": 2666667,
        "profit": 2333333
      }
    ]
  }
}
```

## تولید گزارش سفارشی

### POST /api/reports/custom

```http
POST /api/reports/custom
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "گزارش سفارشی",
  "description": "گزارش عملکرد تیم فنی",
  "filters": {
    "category": "technical",
    "period": "30d",
    "assignee": [456, 789]
  },
  "metrics": [
    "tickets_count",
    "avg_response_time",
    "satisfaction_rate"
  ],
  "groupBy": "assignee",
  "format": "pdf"
}
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "reportId": "custom_123",
    "status": "generating",
    "estimatedTime": "2 minutes",
    "downloadUrl": null
  },
  "message": "گزارش در حال تولید است"
}
```

## دریافت وضعیت گزارش

### GET /api/reports/:id/status

```http
GET /api/reports/custom_123/status
Authorization: Bearer <token>
```

**پاسخ موفق:**
```json
{
  "success": true,
  "data": {
    "reportId": "custom_123",
    "status": "completed",
    "progress": 100,
    "downloadUrl": "/api/reports/custom_123/download",
    "expiresAt": "2024-01-22T12:00:00Z"
  }
}
```

## نمونه کدها

### JavaScript/Node.js

```javascript
// دریافت گزارش عملکرد
const getPerformanceReport = async (period = '30d') => {
  const response = await fetch(`/api/reports/performance?period=${period}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
};

// تولید گزارش سفارشی
const generateCustomReport = async (reportConfig) => {
  const response = await fetch('/api/reports/custom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(reportConfig)
  });
  
  return response.json();
};

// بررسی وضعیت گزارش
const checkReportStatus = async (reportId) => {
  const response = await fetch(`/api/reports/${reportId}/status`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
};
```

### Python

```python
import requests

# دریافت گزارش عملکرد
def get_performance_report(period='30d'):
    response = requests.get(
        f'/api/reports/performance?period={period}',
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()

# تولید گزارش سفارشی
def generate_custom_report(report_config):
    response = requests.post(
        '/api/reports/custom',
        json=report_config,
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()

# بررسی وضعیت گزارش
def check_report_status(report_id):
    response = requests.get(
        f'/api/reports/{report_id}/status',
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()
```

### cURL

```bash
# دریافت گزارش عملکرد
curl -X GET "http://localhost:3000/api/reports/performance?period=30d" \
  -H "Authorization: Bearer YOUR_TOKEN"

# تولید گزارش سفارشی
curl -X POST "http://localhost:3000/api/reports/custom" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "گزارش سفارشی",
    "filters": {
      "category": "technical",
      "period": "30d"
    },
    "metrics": ["tickets_count", "avg_response_time"],
    "format": "pdf"
  }'

# بررسی وضعیت گزارش
curl -X GET "http://localhost:3000/api/reports/custom_123/status" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## کدهای خطا

| کد | معنی | توضیح |
|----|------|-------|
| 400 | Bad Request | پارامترهای نامعتبر |
| 401 | Unauthorized | عدم احراز هویت |
| 403 | Forbidden | عدم دسترسی |
| 404 | Not Found | گزارش یافت نشد |
| 422 | Unprocessable Entity | خطای اعتبارسنجی |
| 500 | Internal Server Error | خطای سرور |

## مرحله بعدی

- [نمونه کدها](/docs/api/examples/javascript)
- [عیب‌یابی](/docs/troubleshooting/intro)
- [راهنمای کاربری](/docs/user-guide/dashboard)

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
