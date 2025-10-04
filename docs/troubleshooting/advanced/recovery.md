# بازیابی سیستم

راهنمای بازیابی سیستم در صورت بروز مشکل.

## پشتیبان‌گیری

### پشتیبان‌گیری از دیتابیس
```bash
# PostgreSQL
pg_dump -h localhost -U postgres support_db > backup.sql

# MySQL
mysqldump -u root -p support_db > backup.sql
```

### پشتیبان‌گیری از فایل‌ها
```bash
# فشرده‌سازی فایل‌ها
tar -czf backup_files.tar.gz /path/to/files

# کپی فایل‌ها
rsync -av /source/ /backup/
```

## بازیابی

### بازیابی دیتابیس
```bash
# PostgreSQL
psql -h localhost -U postgres support_db < backup.sql

# MySQL
mysql -u root -p support_db < backup.sql
```

### بازیابی فایل‌ها
```bash
# استخراج فایل‌ها
tar -xzf backup_files.tar.gz

# همگام‌سازی
rsync -av /backup/ /source/
```

## بازنشانی

### بازنشانی تنظیمات
```bash
# بازنشانی به تنظیمات پیش‌فرض
npm run reset:config

# بازنشانی کامل
npm run reset:full
```

### بازنشانی دیتابیس
```bash
# حذف و ایجاد مجدد
npm run db:reset

# اجرای migration ها
npm run db:migrate
```

## نکات مهم

- **پشتیبان‌گیری منظم**: هر روز پشتیبان‌گیری کنید
- **تست بازیابی**: پشتیبان‌ها را تست کنید
- **مستندسازی**: مراحل را مستند کنید
- **آموزش تیم**: تیم را آموزش دهید

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
