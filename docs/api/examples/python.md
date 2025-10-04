# نمونه کدها - Python

نمونه‌های عملی استفاده از API سیستم پشتیبانی با Python.

## راه‌اندازی اولیه

### نصب وابستگی‌ها

```bash
pip install requests python-dotenv
```

### پیکربندی کلاینت

```python
# config/api.py
import requests
import os
from dotenv import load_dotenv

load_dotenv()

class APIClient:
    def __init__(self):
        self.base_url = os.getenv('API_BASE_URL', 'http://localhost:3000/api/v1')
        self.token = None
        self.session = requests.Session()
        
        # تنظیم headers پیش‌فرض
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'Python-Client/1.0'
        })
    
    def set_token(self, token):
        """تنظیم token احراز هویت"""
        self.token = token
        self.session.headers.update({
            'Authorization': f'Bearer {token}'
        })
    
    def get(self, endpoint, params=None):
        """درخواست GET"""
        url = f"{self.base_url}{endpoint}"
        response = self.session.get(url, params=params)
        return self._handle_response(response)
    
    def post(self, endpoint, data=None, json=None):
        """درخواست POST"""
        url = f"{self.base_url}{endpoint}"
        response = self.session.post(url, data=data, json=json)
        return self._handle_response(response)
    
    def put(self, endpoint, data=None, json=None):
        """درخواست PUT"""
        url = f"{self.base_url}{endpoint}"
        response = self.session.put(url, data=data, json=json)
        return self._handle_response(response)
    
    def delete(self, endpoint):
        """درخواست DELETE"""
        url = f"{self.base_url}{endpoint}"
        response = self.session.delete(url)
        return self._handle_response(response)
    
    def _handle_response(self, response):
        """مدیریت پاسخ‌ها"""
        try:
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            if response.status_code == 401:
                raise AuthenticationError("توکن نامعتبر یا منقضی شده")
            elif response.status_code == 403:
                raise PermissionError("دسترسی غیرمجاز")
            elif response.status_code == 404:
                raise NotFoundError("منبع یافت نشد")
            else:
                raise APIError(f"خطای HTTP {response.status_code}: {response.text}")
        except requests.exceptions.RequestException as e:
            raise ConnectionError(f"خطا در اتصال: {str(e)}")

# Exception های سفارشی
class APIError(Exception):
    pass

class AuthenticationError(APIError):
    pass

class PermissionError(APIError):
    pass

class NotFoundError(APIError):
    pass

# ایجاد instance سراسری
api_client = APIClient()
```

## احراز هویت

### سرویس احراز هویت

```python
# services/auth.py
from config.api import api_client, AuthenticationError
import json

class AuthService:
    def __init__(self):
        self.client = api_client
    
    def login(self, username, password):
        """ورود به سیستم"""
        try:
            response = self.client.post('/auth/login', json={
                'username': username,
                'password': password
            })
            
            if response.get('success'):
                # ذخیره token
                token = response['data']['token']
                self.client.set_token(token)
                
                # ذخیره در فایل
                self._save_token(token)
                
                return response
            else:
                raise AuthenticationError("ورود ناموفق")
                
        except Exception as e:
            raise AuthenticationError(f"خطا در ورود: {str(e)}")
    
    def logout(self):
        """خروج از سیستم"""
        self.client.token = None
        self.client.session.headers.pop('Authorization', None)
        self._clear_token()
    
    def is_authenticated(self):
        """بررسی وضعیت احراز هویت"""
        return self.client.token is not None
    
    def get_current_user(self):
        """دریافت اطلاعات کاربر فعلی"""
        try:
            response = self.client.get('/auth/me')
            return response.get('data')
        except:
            return None
    
    def _save_token(self, token):
        """ذخیره token در فایل"""
        try:
            with open('.token', 'w') as f:
                f.write(token)
        except:
            pass
    
    def _load_token(self):
        """بارگذاری token از فایل"""
        try:
            with open('.token', 'r') as f:
                token = f.read().strip()
                if token:
                    self.client.set_token(token)
                    return True
        except:
            pass
        return False
    
    def _clear_token(self):
        """حذف token از فایل"""
        try:
            import os
            if os.path.exists('.token'):
                os.remove('.token')
        except:
            pass

# ایجاد instance سراسری
auth_service = AuthService()
```

### استفاده از سرویس احراز هویت

```python
# main.py
from services.auth import auth_service

def main():
    # تلاش برای بارگذاری token موجود
    if not auth_service._load_token():
        # ورود به سیستم
        username = input("نام کاربری: ")
        password = input("رمز عبور: ")
        
        try:
            response = auth_service.login(username, password)
            print("ورود موفق!")
        except Exception as e:
            print(f"خطا در ورود: {e}")
            return
    
    # بررسی وضعیت احراز هویت
    if auth_service.is_authenticated():
        user = auth_service.get_current_user()
        print(f"خوش آمدید {user['name']}!")
    else:
        print("احراز هویت ناموفق")

if __name__ == "__main__":
    main()
```

## مدیریت تیکت‌ها

### سرویس تیکت‌ها

```python
# services/tickets.py
from config.api import api_client, APIError

class TicketService:
    def __init__(self):
        self.client = api_client
    
    def get_tickets(self, filters=None):
        """دریافت لیست تیکت‌ها"""
        try:
            response = self.client.get('/tickets', params=filters)
            return response
        except Exception as e:
            raise APIError(f"خطا در دریافت تیکت‌ها: {str(e)}")
    
    def get_ticket(self, ticket_id):
        """دریافت تیکت خاص"""
        try:
            response = self.client.get(f'/tickets/{ticket_id}')
            return response
        except Exception as e:
            raise APIError(f"خطا در دریافت تیکت: {str(e)}")
    
    def create_ticket(self, ticket_data):
        """ایجاد تیکت جدید"""
        try:
            response = self.client.post('/tickets', json=ticket_data)
            return response
        except Exception as e:
            raise APIError(f"خطا در ایجاد تیکت: {str(e)}")
    
    def update_ticket(self, ticket_id, ticket_data):
        """به‌روزرسانی تیکت"""
        try:
            response = self.client.put(f'/tickets/{ticket_id}', json=ticket_data)
            return response
        except Exception as e:
            raise APIError(f"خطا در به‌روزرسانی تیکت: {str(e)}")
    
    def delete_ticket(self, ticket_id):
        """حذف تیکت"""
        try:
            response = self.client.delete(f'/tickets/{ticket_id}')
            return response
        except Exception as e:
            raise APIError(f"خطا در حذف تیکت: {str(e)}")
    
    def send_response(self, ticket_id, message):
        """ارسال پاسخ"""
        try:
            response = self.client.post(f'/tickets/{ticket_id}/responses', json={
                'message': message
            })
            return response
        except Exception as e:
            raise APIError(f"خطا در ارسال پاسخ: {str(e)}")
    
    def assign_ticket(self, ticket_id, assignee_id):
        """تخصیص تیکت"""
        try:
            response = self.client.put(f'/tickets/{ticket_id}/assign', json={
                'assigneeId': assignee_id
            })
            return response
        except Exception as e:
            raise APIError(f"خطا در تخصیص تیکت: {str(e)}")

# ایجاد instance سراسری
ticket_service = TicketService()
```

### استفاده از سرویس تیکت‌ها

```python
# examples/ticket_example.py
from services.tickets import ticket_service
from services.auth import auth_service

def ticket_example():
    # بررسی احراز هویت
    if not auth_service.is_authenticated():
        print("لطفاً ابتدا وارد سیستم شوید")
        return
    
    try:
        # دریافت لیست تیکت‌ها
        print("دریافت لیست تیکت‌ها...")
        response = ticket_service.get_tickets({
            'status': 'open',
            'limit': 10
        })
        
        if response.get('success'):
            tickets = response['data']['tickets']
            print(f"تعداد تیکت‌های باز: {len(tickets)}")
            
            for ticket in tickets:
                print(f"- {ticket['title']} (اولویت: {ticket['priority']})")
        
        # ایجاد تیکت جدید
        print("\nایجاد تیکت جدید...")
        new_ticket = ticket_service.create_ticket({
            'title': 'مشکل لاگین',
            'description': 'نمی‌توانم وارد سیستم شوم',
            'priority': 'high',
            'category': 'technical'
        })
        
        if new_ticket.get('success'):
            ticket_id = new_ticket['data']['id']
            print(f"تیکت جدید ایجاد شد: {ticket_id}")
            
            # ارسال پاسخ
            print("ارسال پاسخ...")
            response = ticket_service.send_response(ticket_id, "مشکل بررسی شد")
            
            if response.get('success'):
                print("پاسخ ارسال شد")
        
    except Exception as e:
        print(f"خطا: {e}")

if __name__ == "__main__":
    ticket_example()
```

## مدیریت کاربران

### سرویس کاربران

```python
# services/users.py
from config.api import api_client, APIError

class UserService:
    def __init__(self):
        self.client = api_client
    
    def get_users(self, filters=None):
        """دریافت لیست کاربران"""
        try:
            response = self.client.get('/users', params=filters)
            return response
        except Exception as e:
            raise APIError(f"خطا در دریافت کاربران: {str(e)}")
    
    def get_user(self, user_id):
        """دریافت کاربر خاص"""
        try:
            response = self.client.get(f'/users/{user_id}')
            return response
        except Exception as e:
            raise APIError(f"خطا در دریافت کاربر: {str(e)}")
    
    def create_user(self, user_data):
        """ایجاد کاربر جدید"""
        try:
            response = self.client.post('/users', json=user_data)
            return response
        except Exception as e:
            raise APIError(f"خطا در ایجاد کاربر: {str(e)}")
    
    def update_user(self, user_id, user_data):
        """به‌روزرسانی کاربر"""
        try:
            response = self.client.put(f'/users/{user_id}', json=user_data)
            return response
        except Exception as e:
            raise APIError(f"خطا در به‌روزرسانی کاربر: {str(e)}")
    
    def delete_user(self, user_id):
        """حذف کاربر"""
        try:
            response = self.client.delete(f'/users/{user_id}')
            return response
        except Exception as e:
            raise APIError(f"خطا در حذف کاربر: {str(e)}")
    
    def change_password(self, user_id, current_password, new_password):
        """تغییر رمز عبور"""
        try:
            response = self.client.put(f'/users/{user_id}/password', json={
                'currentPassword': current_password,
                'newPassword': new_password
            })
            return response
        except Exception as e:
            raise APIError(f"خطا در تغییر رمز عبور: {str(e)}")

# ایجاد instance سراسری
user_service = UserService()
```

## گزارش‌گیری

### سرویس گزارش‌ها

```python
# services/reports.py
from config.api import api_client, APIError
import time

class ReportService:
    def __init__(self):
        self.client = api_client
    
    def get_performance_report(self, period='30d'):
        """دریافت گزارش عملکرد"""
        try:
            response = self.client.get(f'/reports/performance?period={period}')
            return response
        except Exception as e:
            raise APIError(f"خطا در دریافت گزارش عملکرد: {str(e)}")
    
    def get_tickets_report(self, filters=None):
        """دریافت گزارش تیکت‌ها"""
        try:
            response = self.client.get('/reports/tickets', params=filters)
            return response
        except Exception as e:
            raise APIError(f"خطا در دریافت گزارش تیکت‌ها: {str(e)}")
    
    def generate_custom_report(self, report_config):
        """تولید گزارش سفارشی"""
        try:
            response = self.client.post('/reports/custom', json=report_config)
            return response
        except Exception as e:
            raise APIError(f"خطا در تولید گزارش سفارشی: {str(e)}")
    
    def check_report_status(self, report_id):
        """بررسی وضعیت گزارش"""
        try:
            response = self.client.get(f'/reports/{report_id}/status')
            return response
        except Exception as e:
            raise APIError(f"خطا در بررسی وضعیت گزارش: {str(e)}")
    
    def wait_for_report(self, report_id, timeout=300):
        """انتظار برای تکمیل گزارش"""
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            try:
                status_response = self.check_report_status(report_id)
                
                if status_response.get('success'):
                    status = status_response['data']['status']
                    
                    if status == 'completed':
                        return status_response
                    elif status == 'failed':
                        raise APIError("تولید گزارش ناموفق")
                
                time.sleep(5)  # انتظار 5 ثانیه
                
            except Exception as e:
                raise APIError(f"خطا در انتظار برای گزارش: {str(e)}")
        
        raise APIError("زمان انتظار برای گزارش به پایان رسید")

# ایجاد instance سراسری
report_service = ReportService()
```

### استفاده از سرویس گزارش‌ها

```python
# examples/report_example.py
from services.reports import report_service
from services.auth import auth_service

def report_example():
    # بررسی احراز هویت
    if not auth_service.is_authenticated():
        print("لطفاً ابتدا وارد سیستم شوید")
        return
    
    try:
        # دریافت گزارش عملکرد
        print("دریافت گزارش عملکرد...")
        response = report_service.get_performance_report('30d')
        
        if response.get('success'):
            data = response['data']
            print(f"کل تیکت‌ها: {data['summary']['totalTickets']}")
            print(f"تیکت‌های حل شده: {data['summary']['resolvedTickets']}")
            print(f"زمان پاسخ متوسط: {data['summary']['avgResponseTime']}")
            print(f"نرخ رضایت: {data['summary']['satisfactionRate']}%")
        
        # تولید گزارش سفارشی
        print("\nتولید گزارش سفارشی...")
        custom_report = report_service.generate_custom_report({
            'name': 'گزارش تیم فنی',
            'description': 'گزارش عملکرد تیم فنی',
            'filters': {
                'category': 'technical',
                'period': '30d'
            },
            'metrics': [
                'tickets_count',
                'avg_response_time',
                'satisfaction_rate'
            ],
            'format': 'json'
        })
        
        if custom_report.get('success'):
            report_id = custom_report['data']['reportId']
            print(f"گزارش سفارشی در حال تولید: {report_id}")
            
            # انتظار برای تکمیل گزارش
            print("انتظار برای تکمیل گزارش...")
            final_report = report_service.wait_for_report(report_id)
            
            if final_report.get('success'):
                download_url = final_report['data']['downloadUrl']
                print(f"گزارش آماده است: {download_url}")
        
    except Exception as e:
        print(f"خطا: {e}")

if __name__ == "__main__":
    report_example()
```

## کلاس‌های کمکی

### کلاس مدیریت فایل‌ها

```python
# utils/file_manager.py
import os
import json
from datetime import datetime

class FileManager:
    def __init__(self, base_dir='data'):
        self.base_dir = base_dir
        self._ensure_dir()
    
    def _ensure_dir(self):
        """ایجاد پوشه در صورت عدم وجود"""
        if not os.path.exists(self.base_dir):
            os.makedirs(self.base_dir)
    
    def save_json(self, filename, data):
        """ذخیره داده در فایل JSON"""
        filepath = os.path.join(self.base_dir, f"{filename}.json")
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        return filepath
    
    def load_json(self, filename):
        """بارگذاری داده از فایل JSON"""
        filepath = os.path.join(self.base_dir, f"{filename}.json")
        
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        
        return None
    
    def save_csv(self, filename, data, headers=None):
        """ذخیره داده در فایل CSV"""
        import csv
        
        filepath = os.path.join(self.base_dir, f"{filename}.csv")
        
        with open(filepath, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            
            if headers:
                writer.writerow(headers)
            
            for row in data:
                writer.writerow(row)
        
        return filepath
    
    def get_file_info(self, filename):
        """دریافت اطلاعات فایل"""
        filepath = os.path.join(self.base_dir, filename)
        
        if os.path.exists(filepath):
            stat = os.stat(filepath)
            return {
                'filename': filename,
                'size': stat.st_size,
                'created': datetime.fromtimestamp(stat.st_ctime),
                'modified': datetime.fromtimestamp(stat.st_mtime)
            }
        
        return None

# ایجاد instance سراسری
file_manager = FileManager()
```

### کلاس لاگ‌گیری

```python
# utils/logger.py
import logging
import os
from datetime import datetime

class Logger:
    def __init__(self, name='api_client', level=logging.INFO):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)
        
        # ایجاد handler برای فایل
        if not os.path.exists('logs'):
            os.makedirs('logs')
        
        file_handler = logging.FileHandler(
            f'logs/{name}_{datetime.now().strftime("%Y%m%d")}.log',
            encoding='utf-8'
        )
        file_handler.setLevel(level)
        
        # ایجاد handler برای کنسول
        console_handler = logging.StreamHandler()
        console_handler.setLevel(level)
        
        # فرمت لاگ
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)
        
        # اضافه کردن handler ها
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)
    
    def info(self, message):
        self.logger.info(message)
    
    def warning(self, message):
        self.logger.warning(message)
    
    def error(self, message):
        self.logger.error(message)
    
    def debug(self, message):
        self.logger.debug(message)

# ایجاد instance سراسری
logger = Logger()
```

## مرحله بعدی

- [نمونه کدهای cURL](/docs/api/examples/curl)
- [عیب‌یابی](/docs/troubleshooting/intro)
- [راهنمای کاربری](/docs/user-guide/dashboard)

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
