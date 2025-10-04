# سفارشی‌سازی پیشرفته

این بخش شامل راهنمای سفارشی‌سازی پیشرفته سیستم پشتیبانی است.

## سفارشی‌سازی رابط کاربری

### تم‌های سفارشی

#### ایجاد تم جدید

```css
/* themes/custom-theme.css */
:root {
  --primary-color: #e74c3c;
  --secondary-color: #95a5a6;
  --success-color: #27ae60;
  --warning-color: #f39c12;
  --danger-color: #e74c3c;
  --info-color: #3498db;
  --light-color: #ecf0f1;
  --dark-color: #2c3e50;
}

[data-theme='dark'] {
  --primary-color: #c0392b;
  --secondary-color: #7f8c8d;
  --success-color: #229954;
  --warning-color: #d68910;
  --danger-color: #c0392b;
  --info-color: #2980b9;
  --light-color: #34495e;
  --dark-color: #1a252f;
}
```

#### اعمال تم

```javascript
// اعمال تم سفارشی
const applyCustomTheme = (themeName) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `/themes/${themeName}.css`;
  document.head.appendChild(link);
};
```

### کامپوننت‌های سفارشی

#### کامپوننت تیکت

```jsx
// components/CustomTicket.jsx
import React from 'react';

const CustomTicket = ({ ticket, onStatusChange }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      low: '#28a745',
      medium: '#ffc107',
      high: '#fd7e14',
      urgent: '#dc3545'
    };
    return colors[priority] || '#6c757d';
  };

  return (
    <div className="custom-ticket" style={{ borderLeft: `4px solid ${getPriorityColor(ticket.priority)}` }}>
      <div className="ticket-header">
        <h3>{ticket.title}</h3>
        <span className={`priority-badge priority-${ticket.priority}`}>
          {ticket.priority}
        </span>
      </div>
      <div className="ticket-body">
        <p>{ticket.description}</p>
        <div className="ticket-meta">
          <span>کاربر: {ticket.user.name}</span>
          <span>تاریخ: {new Date(ticket.createdAt).toLocaleDateString('fa-IR')}</span>
        </div>
      </div>
      <div className="ticket-actions">
        <select 
          value={ticket.status} 
          onChange={(e) => onStatusChange(ticket.id, e.target.value)}
        >
          <option value="open">باز</option>
          <option value="in-progress">در حال بررسی</option>
          <option value="waiting">منتظر پاسخ</option>
          <option value="closed">بسته</option>
        </select>
      </div>
    </div>
  );
};

export default CustomTicket;
```

#### کامپوننت داشبورد

```jsx
// components/CustomDashboard.jsx
import React, { useState, useEffect } from 'react';

const CustomDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner">در حال بارگذاری...</div>;
  }

  return (
    <div className="custom-dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.totalTickets}</h3>
            <p>کل تیکت‌ها</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔓</div>
          <div className="stat-content">
            <h3>{stats.openTickets}</h3>
            <p>تیکت‌های باز</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.closedTickets}</h3>
            <p>تیکت‌های بسته</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>{stats.avgResponseTime}</h3>
            <p>زمان پاسخ متوسط</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDashboard;
```

## سفارشی‌سازی API

### Middleware سفارشی

```javascript
// middleware/customAuth.js
const customAuth = (req, res, next) => {
  // بررسی توکن سفارشی
  const token = req.headers['x-custom-token'];
  
  if (!token) {
    return res.status(401).json({ error: 'توکن مورد نیاز است' });
  }

  // اعتبارسنجی توکن
  if (token !== process.env.CUSTOM_API_TOKEN) {
    return res.status(403).json({ error: 'توکن نامعتبر' });
  }

  next();
};

module.exports = customAuth;
```

### Route های سفارشی

```javascript
// routes/custom.js
const express = require('express');
const router = express.Router();
const customAuth = require('../middleware/customAuth');

// Route سفارشی برای دریافت آمار
router.get('/stats', customAuth, async (req, res) => {
  try {
    const stats = await getCustomStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Route سفارشی برای ارسال اعلان
router.post('/notify', customAuth, async (req, res) => {
  try {
    const { message, type, recipients } = req.body;
    
    await sendCustomNotification(message, type, recipients);
    
    res.json({
      success: true,
      message: 'اعلان ارسال شد'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
```

### Model های سفارشی

```javascript
// models/CustomTicket.js
const mongoose = require('mongoose');

const customTicketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'waiting', 'closed'],
    default: 'open'
  },
  category: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: String,
    trim: true
  }],
  attachments: [{
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    url: String
  }],
  customFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index ها
customTicketSchema.index({ title: 'text', description: 'text' });
customTicketSchema.index({ status: 1, priority: 1 });
customTicketSchema.index({ user: 1, createdAt: -1 });

// Virtual ها
customTicketSchema.virtual('isOpen').get(function() {
  return this.status === 'open';
});

customTicketSchema.virtual('isUrgent').get(function() {
  return this.priority === 'urgent';
});

// Method ها
customTicketSchema.methods.close = function() {
  this.status = 'closed';
  this.closedAt = new Date();
  return this.save();
};

customTicketSchema.methods.assign = function(userId) {
  this.assignee = userId;
  this.status = 'in-progress';
  return this.save();
};

// Static methods
customTicketSchema.statics.findByStatus = function(status) {
  return this.find({ status });
};

customTicketSchema.statics.findByPriority = function(priority) {
  return this.find({ priority });
};

module.exports = mongoose.model('CustomTicket', customTicketSchema);
```

## سفارشی‌سازی دیتابیس

### Migration های سفارشی

```javascript
// migrations/add-custom-fields.js
const mongoose = require('mongoose');

const addCustomFields = async () => {
  try {
    // اتصال به دیتابیس
    await mongoose.connect(process.env.DATABASE_URL);
    
    // اضافه کردن فیلدهای سفارشی
    await mongoose.connection.db.collection('tickets').updateMany(
      { customFields: { $exists: false } },
      { $set: { customFields: {} } }
    );
    
    // اضافه کردن فیلد metadata
    await mongoose.connection.db.collection('tickets').updateMany(
      { metadata: { $exists: false } },
      { $set: { metadata: {} } }
    );
    
    console.log('فیلدهای سفارشی اضافه شدند');
  } catch (error) {
    console.error('خطا در migration:', error);
  } finally {
    await mongoose.disconnect();
  }
};

addCustomFields();
```

### Seed Data سفارشی

```javascript
// seeds/custom-data.js
const mongoose = require('mongoose');
const CustomTicket = require('../models/CustomTicket');

const seedCustomData = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    
    // پاک کردن داده‌های موجود
    await CustomTicket.deleteMany({});
    
    // ایجاد داده‌های نمونه
    const sampleTickets = [
      {
        title: 'مشکل لاگین',
        description: 'نمی‌توانم وارد سیستم شوم',
        priority: 'high',
        status: 'open',
        category: 'technical',
        tags: ['login', 'authentication'],
        customFields: {
          department: 'IT',
          impact: 'high'
        }
      },
      {
        title: 'درخواست ویژگی جدید',
        description: 'لطفاً امکان ارسال فایل صوتی را اضافه کنید',
        priority: 'medium',
        status: 'open',
        category: 'feature-request',
        tags: ['feature', 'audio'],
        customFields: {
          department: 'Product',
          impact: 'medium'
        }
      }
    ];
    
    await CustomTicket.insertMany(sampleTickets);
    console.log('داده‌های نمونه ایجاد شدند');
  } catch (error) {
    console.error('خطا در seed:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedCustomData();
```

## سفارشی‌سازی امنیتی

### Policy های سفارشی

```javascript
// policies/customPolicy.js
const customPolicy = {
  // بررسی دسترسی کاربر
  canAccess: (user, resource) => {
    // منطق سفارشی برای بررسی دسترسی
    if (user.role === 'admin') {
      return true;
    }
    
    if (user.role === 'operator' && resource.type === 'ticket') {
      return true;
    }
    
    if (user.role === 'user' && resource.owner === user.id) {
      return true;
    }
    
    return false;
  },
  
  // بررسی مجوزهای خاص
  hasPermission: (user, permission) => {
    const permissions = {
      admin: ['read', 'write', 'delete', 'manage'],
      operator: ['read', 'write'],
      user: ['read']
    };
    
    return permissions[user.role]?.includes(permission) || false;
  }
};

module.exports = customPolicy;
```

### Encryption سفارشی

```javascript
// utils/customEncryption.js
const crypto = require('crypto');

class CustomEncryption {
  constructor(key) {
    this.key = key;
    this.algorithm = 'aes-256-gcm';
  }
  
  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.key);
    cipher.setAAD(Buffer.from('custom-aad'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }
  
  decrypt(encryptedData) {
    const { encrypted, iv, authTag } = encryptedData;
    
    const decipher = crypto.createDecipher(this.algorithm, this.key);
    decipher.setAAD(Buffer.from('custom-aad'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

module.exports = CustomEncryption;
```

## سفارشی‌سازی عملکرد

### Caching سفارشی

```javascript
// utils/customCache.js
const NodeCache = require('node-cache');

class CustomCache {
  constructor(options = {}) {
    this.cache = new NodeCache({
      stdTTL: options.ttl || 3600,
      checkperiod: options.checkPeriod || 600,
      useClones: false
    });
  }
  
  async get(key, fallback) {
    let value = this.cache.get(key);
    
    if (value === undefined && fallback) {
      value = await fallback();
      this.set(key, value);
    }
    
    return value;
  }
  
  set(key, value, ttl) {
    return this.cache.set(key, value, ttl);
  }
  
  del(key) {
    return this.cache.del(key);
  }
  
  clear() {
    return this.cache.flushAll();
  }
  
  keys() {
    return this.cache.keys();
  }
}

module.exports = CustomCache;
```

### Rate Limiting سفارشی

```javascript
// middleware/customRateLimit.js
const rateLimit = require('express-rate-limit');

const createCustomRateLimit = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes
    max: options.max || 100, // limit each IP to 100 requests per windowMs
    message: {
      error: 'تعداد درخواست‌های شما بیش از حد مجاز است',
      retryAfter: Math.ceil(options.windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      // رد کردن rate limit برای IP های خاص
      return req.ip === '127.0.0.1';
    },
    keyGenerator: (req) => {
      // استفاده از user ID به جای IP
      return req.user?.id || req.ip;
    }
  });
};

module.exports = createCustomRateLimit;
```

## مرحله بعدی

- [یکپارچه‌سازی](/docs/advanced/integrations)
- [اتوماسیون](/docs/advanced/automation)
- [عیب‌یابی](/docs/troubleshooting/intro)

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
