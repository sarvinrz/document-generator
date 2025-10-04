# عیب‌یابی پیشرفته

راه‌حل‌های پیشرفته برای عیب‌یابی سیستم.

## ابزارهای عیب‌یابی

### 1. لاگ‌ها
```bash
# مشاهده لاگ‌های زنده
tail -f logs/app.log

# فیلتر کردن خطاها
grep "ERROR" logs/app.log
```

### 2. مانیتورینگ
```bash
# وضعیت سیستم
npm run monitor:status

# آمار استفاده
npm run monitor:stats
```

### 3. تست‌ها
```bash
# اجرای تست‌ها
npm test

# تست‌های واحد
npm run test:unit
```

## عیب‌یابی دیتابیس

### بررسی اتصال
```sql
-- تست اتصال
SELECT 1;

-- بررسی جداول
SHOW TABLES;

-- بررسی وضعیت
SHOW STATUS;
```

### بهینه‌سازی کوئری‌ها
```sql
-- کوئری‌های کند
SHOW PROCESSLIST;

-- تجزیه و تحلیل کوئری
EXPLAIN SELECT * FROM tickets WHERE status = 'open';
```

## عیب‌یابی شبکه

### بررسی اتصال
```bash
# تست ping
ping google.com

# بررسی پورت‌ها
netstat -tulpn

# تست DNS
nslookup example.com
```

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
