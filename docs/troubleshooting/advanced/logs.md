# مدیریت لاگ‌ها

راهنمای کامل مدیریت و تحلیل لاگ‌های سیستم.

## انواع لاگ‌ها

### 1. لاگ‌های برنامه
```bash
# مشاهده لاگ‌های اخیر
tail -f logs/app.log

# جستجو در لاگ‌ها
grep "ERROR" logs/app.log

# فیلتر بر اساس تاریخ
grep "2024-01-21" logs/app.log
```

### 2. لاگ‌های دسترسی
```bash
# مشاهده لاگ‌های دسترسی
tail -f logs/access.log

# آمار درخواست‌ها
awk '{print $1}' logs/access.log | sort | uniq -c
```

### 3. لاگ‌های خطا
```bash
# مشاهده خطاها
tail -f logs/error.log

# خطاهای اخیر
grep "$(date +%Y-%m-%d)" logs/error.log
```

## ابزارهای تحلیل

### 1. AWK
```bash
# شمارش خطاها
awk '/ERROR/ {count++} END {print count}' logs/app.log

# استخراج IP ها
awk '{print $1}' logs/access.log | sort | uniq
```

### 2. SED
```bash
# حذف خطوط خالی
sed '/^$/d' logs/app.log

# جایگزینی متن
sed 's/ERROR/خطا/g' logs/app.log
```

### 3. GREP
```bash
# جستجوی چندگانه
grep -E "ERROR|WARN" logs/app.log

# جستجوی معکوس
grep -v "DEBUG" logs/app.log
```

## تنظیمات لاگ

### سطح لاگ‌ها
```javascript
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};
```

### چرخش لاگ‌ها
```bash
# چرخش دستی
logrotate -f /etc/logrotate.conf

# چرخش خودکار
# در crontab
0 0 * * * /usr/sbin/logrotate /etc/logrotate.conf
```

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
