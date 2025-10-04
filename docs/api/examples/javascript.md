# نمونه کدها - JavaScript

نمونه‌های عملی استفاده از API سیستم پشتیبانی با JavaScript.

## راه‌اندازی اولیه

### نصب وابستگی‌ها

```bash
npm install axios
# یا
yarn add axios
```

### پیکربندی کلاینت

```javascript
// config/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
const API_VERSION = 'v1';

// ایجاد instance axios
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor برای اضافه کردن token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor برای مدیریت خطاها
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // حذف token و redirect به صفحه ورود
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

## احراز هویت

### ورود به سیستم

```javascript
// services/auth.js
import apiClient from '../config/api';

export const authService = {
  // ورود با نام کاربری و رمز عبور
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      
      if (response.success) {
        // ذخیره token
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در ورود');
    }
  },

  // خروج از سیستم
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // بررسی وضعیت احراز هویت
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // دریافت اطلاعات کاربر
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
```

### استفاده در کامپوننت React

```javascript
// components/LoginForm.jsx
import React, { useState } from 'react';
import { authService } from '../services/auth';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(credentials);
      
      if (response.success) {
        // redirect به داشبورد
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>نام کاربری:</label>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials({
            ...credentials,
            username: e.target.value
          })}
          required
        />
      </div>
      
      <div>
        <label>رمز عبور:</label>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({
            ...credentials,
            password: e.target.value
          })}
          required
        />
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'در حال ورود...' : 'ورود'}
      </button>
    </form>
  );
};

export default LoginForm;
```

## مدیریت تیکت‌ها

### سرویس تیکت‌ها

```javascript
// services/tickets.js
import apiClient from '../config/api';

export const ticketService = {
  // دریافت لیست تیکت‌ها
  async getTickets(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await apiClient.get(`/tickets?${params}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در دریافت تیکت‌ها');
    }
  },

  // دریافت تیکت خاص
  async getTicket(id) {
    try {
      const response = await apiClient.get(`/tickets/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در دریافت تیکت');
    }
  },

  // ایجاد تیکت جدید
  async createTicket(ticketData) {
    try {
      const response = await apiClient.post('/tickets', ticketData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در ایجاد تیکت');
    }
  },

  // به‌روزرسانی تیکت
  async updateTicket(id, ticketData) {
    try {
      const response = await apiClient.put(`/tickets/${id}`, ticketData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در به‌روزرسانی تیکت');
    }
  },

  // حذف تیکت
  async deleteTicket(id) {
    try {
      const response = await apiClient.delete(`/tickets/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در حذف تیکت');
    }
  },

  // ارسال پاسخ
  async sendResponse(ticketId, message) {
    try {
      const response = await apiClient.post(`/tickets/${ticketId}/responses`, {
        message
      });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در ارسال پاسخ');
    }
  },

  // تخصیص تیکت
  async assignTicket(ticketId, assigneeId) {
    try {
      const response = await apiClient.put(`/tickets/${ticketId}/assign`, {
        assigneeId
      });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در تخصیص تیکت');
    }
  }
};
```

### کامپوننت لیست تیکت‌ها

```javascript
// components/TicketList.jsx
import React, { useState, useEffect } from 'react';
import { ticketService } from '../services/tickets';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    page: 1,
    limit: 20
  });

  useEffect(() => {
    loadTickets();
  }, [filters]);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const response = await ticketService.getTickets(filters);
      
      if (response.success) {
        setTickets(response.data.tickets);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // reset page when filter changes
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="filters">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="open">باز</option>
          <option value="in-progress">در حال بررسی</option>
          <option value="waiting">منتظر پاسخ</option>
          <option value="closed">بسته</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="">همه اولویت‌ها</option>
          <option value="low">کم</option>
          <option value="medium">متوسط</option>
          <option value="high">بالا</option>
          <option value="urgent">فوری</option>
        </select>
      </div>

      <div className="tickets">
        {tickets.map(ticket => (
          <div key={ticket.id} className="ticket-card">
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <div className="ticket-meta">
              <span className={`priority priority-${ticket.priority}`}>
                {ticket.priority}
              </span>
              <span className={`status status-${ticket.status}`}>
                {ticket.status}
              </span>
              <span>کاربر: {ticket.user.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(filters.page - 1)}
          disabled={filters.page === 1}
        >
          قبلی
        </button>
        <span>صفحه {filters.page}</span>
        <button
          onClick={() => handlePageChange(filters.page + 1)}
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default TicketList;
```

## مدیریت کاربران

### سرویس کاربران

```javascript
// services/users.js
import apiClient from '../config/api';

export const userService = {
  // دریافت لیست کاربران
  async getUsers(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await apiClient.get(`/users?${params}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در دریافت کاربران');
    }
  },

  // دریافت کاربر خاص
  async getUser(id) {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در دریافت کاربر');
    }
  },

  // ایجاد کاربر جدید
  async createUser(userData) {
    try {
      const response = await apiClient.post('/users', userData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در ایجاد کاربر');
    }
  },

  // به‌روزرسانی کاربر
  async updateUser(id, userData) {
    try {
      const response = await apiClient.put(`/users/${id}`, userData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در به‌روزرسانی کاربر');
    }
  },

  // حذف کاربر
  async deleteUser(id) {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در حذف کاربر');
    }
  },

  // تغییر رمز عبور
  async changePassword(id, passwordData) {
    try {
      const response = await apiClient.put(`/users/${id}/password`, passwordData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در تغییر رمز عبور');
    }
  }
};
```

## گزارش‌گیری

### سرویس گزارش‌ها

```javascript
// services/reports.js
import apiClient from '../config/api';

export const reportService = {
  // دریافت گزارش عملکرد
  async getPerformanceReport(period = '30d') {
    try {
      const response = await apiClient.get(`/reports/performance?period=${period}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در دریافت گزارش عملکرد');
    }
  },

  // دریافت گزارش تیکت‌ها
  async getTicketsReport(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await apiClient.get(`/reports/tickets?${params}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در دریافت گزارش تیکت‌ها');
    }
  },

  // تولید گزارش سفارشی
  async generateCustomReport(reportConfig) {
    try {
      const response = await apiClient.post('/reports/custom', reportConfig);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در تولید گزارش سفارشی');
    }
  },

  // بررسی وضعیت گزارش
  async checkReportStatus(reportId) {
    try {
      const response = await apiClient.get(`/reports/${reportId}/status`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'خطا در بررسی وضعیت گزارش');
    }
  }
};
```

## Hook های سفارشی React

### Hook مدیریت تیکت‌ها

```javascript
// hooks/useTickets.js
import { useState, useEffect } from 'react';
import { ticketService } from '../services/tickets';

export const useTickets = (initialFilters = {}) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(initialFilters);

  const loadTickets = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await ticketService.getTickets(filters);
      
      if (response.success) {
        setTickets(response.data.tickets);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [filters]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const refresh = () => {
    loadTickets();
  };

  return {
    tickets,
    loading,
    error,
    filters,
    updateFilters,
    refresh
  };
};
```

### Hook مدیریت کاربران

```javascript
// hooks/useUsers.js
import { useState, useEffect } from 'react';
import { userService } from '../services/users';

export const useUsers = (initialFilters = {}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(initialFilters);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.getUsers(filters);
      
      if (response.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [filters]);

  const createUser = async (userData) => {
    try {
      const response = await userService.createUser(userData);
      if (response.success) {
        loadUsers(); // refresh list
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const response = await userService.updateUser(id, userData);
      if (response.success) {
        loadUsers(); // refresh list
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await userService.deleteUser(id);
      if (response.success) {
        loadUsers(); // refresh list
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    users,
    loading,
    error,
    filters,
    setFilters,
    createUser,
    updateUser,
    deleteUser,
    refresh: loadUsers
  };
};
```

## مرحله بعدی

- [نمونه کدهای Python](/docs/api/examples/python)
- [نمونه کدهای cURL](/docs/api/examples/curl)
- [عیب‌یابی](/docs/troubleshooting/intro)

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
