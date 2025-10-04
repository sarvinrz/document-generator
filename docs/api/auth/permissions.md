# مجوزها و دسترسی‌ها

راهنمای سیستم مجوزها و کنترل دسترسی در سیستم پشتیبانی.

## نقش‌های کاربری

### تعریف نقش‌ها

```javascript
const roles = {
  admin: {
    name: 'مدیر',
    permissions: ['*'], // دسترسی کامل
    description: 'دسترسی کامل به تمام بخش‌های سیستم'
  },
  operator: {
    name: 'اپراتور',
    permissions: [
      'tickets.read',
      'tickets.write',
      'tickets.update',
      'users.read'
    ],
    description: 'مدیریت تیکت‌ها و مشاهده کاربران'
  },
  user: {
    name: 'کاربر',
    permissions: [
      'tickets.read.own',
      'tickets.write.own',
      'profile.read',
      'profile.update'
    ],
    description: 'مدیریت تیکت‌های شخصی'
  }
};
```

### بررسی مجوز

```javascript
const hasPermission = (user, permission) => {
  // مدیر دسترسی کامل دارد
  if (user.role === 'admin') {
    return true;
  }
  
  const userPermissions = roles[user.role]?.permissions || [];
  
  // بررسی مجوز مستقیم
  if (userPermissions.includes(permission)) {
    return true;
  }
  
  // بررسی مجوزهای عمومی
  if (userPermissions.includes('*')) {
    return true;
  }
  
  return false;
};
```

## کنترل دسترسی

### Middleware مجوزها

```javascript
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'احراز هویت مورد نیاز است' });
    }
    
    if (!hasPermission(req.user, permission)) {
      return res.status(403).json({ error: 'دسترسی غیرمجاز' });
    }
    
    next();
  };
};
```

### استفاده در Route ها

```javascript
// فقط اپراتورها و مدیران
app.get('/api/tickets', 
  authenticateToken,
  requirePermission('tickets.read'),
  getTickets
);

// فقط مدیران
app.delete('/api/users/:id',
  authenticateToken,
  requirePermission('users.delete'),
  deleteUser
);

// کاربران فقط تیکت‌های خودشان
app.get('/api/tickets/own',
  authenticateToken,
  requirePermission('tickets.read.own'),
  getOwnTickets
);
```

## مجوزهای پیشرفته

### مجوزهای شرطی

```javascript
const checkConditionalPermission = (user, permission, resource) => {
  switch (permission) {
    case 'tickets.read.own':
      return resource.userId === user.id;
    
    case 'tickets.update.own':
      return resource.userId === user.id && resource.status !== 'closed';
    
    case 'users.update.role':
      return user.role === 'admin';
    
    default:
      return hasPermission(user, permission);
  }
};
```

### مجوزهای سلسله‌مراتبی

```javascript
const permissionHierarchy = {
  'tickets.read': ['tickets.read.own'],
  'tickets.write': ['tickets.write.own'],
  'tickets.update': ['tickets.update.own'],
  'users.manage': ['users.read', 'users.update', 'users.delete']
};

const hasHierarchicalPermission = (user, permission) => {
  if (hasPermission(user, permission)) {
    return true;
  }
  
  const parentPermissions = permissionHierarchy[permission] || [];
  
  return parentPermissions.some(parentPermission => 
    hasPermission(user, parentPermission)
  );
};
```

## مدیریت مجوزها

### افزودن مجوز جدید

```javascript
const addPermission = (role, permission) => {
  if (!roles[role]) {
    throw new Error('نقش یافت نشد');
  }
  
  if (!roles[role].permissions.includes(permission)) {
    roles[role].permissions.push(permission);
  }
  
  return roles[role];
};
```

### حذف مجوز

```javascript
const removePermission = (role, permission) => {
  if (!roles[role]) {
    throw new Error('نقش یافت نشد');
  }
  
  roles[role].permissions = roles[role].permissions.filter(
    p => p !== permission
  );
  
  return roles[role];
};
```

## مجوزهای API

### مجوزهای خواندن

```javascript
const readPermissions = {
  'tickets.read': 'مشاهده تمام تیکت‌ها',
  'tickets.read.own': 'مشاهده تیکت‌های شخصی',
  'users.read': 'مشاهده کاربران',
  'reports.read': 'مشاهده گزارش‌ها',
  'settings.read': 'مشاهده تنظیمات'
};
```

### مجوزهای نوشتن

```javascript
const writePermissions = {
  'tickets.write': 'ایجاد تیکت جدید',
  'tickets.write.own': 'ایجاد تیکت شخصی',
  'users.write': 'ایجاد کاربر جدید',
  'reports.write': 'ایجاد گزارش جدید'
};
```

### مجوزهای به‌روزرسانی

```javascript
const updatePermissions = {
  'tickets.update': 'به‌روزرسانی تیکت‌ها',
  'tickets.update.own': 'به‌روزرسانی تیکت‌های شخصی',
  'users.update': 'به‌روزرسانی کاربران',
  'users.update.role': 'تغییر نقش کاربران',
  'settings.update': 'به‌روزرسانی تنظیمات'
};
```

### مجوزهای حذف

```javascript
const deletePermissions = {
  'tickets.delete': 'حذف تیکت‌ها',
  'users.delete': 'حذف کاربران',
  'reports.delete': 'حذف گزارش‌ها'
};
```

## بررسی مجوز در Frontend

### Hook مجوزها

```javascript
// hooks/usePermissions.js
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const usePermissions = () => {
  const { user } = useContext(AuthContext);
  
  const hasPermission = (permission) => {
    if (!user) return false;
    
    if (user.role === 'admin') return true;
    
    const userPermissions = roles[user.role]?.permissions || [];
    return userPermissions.includes(permission) || userPermissions.includes('*');
  };
  
  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => hasPermission(permission));
  };
  
  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => hasPermission(permission));
  };
  
  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  };
};
```

### کامپوننت محافظت شده

```javascript
// components/ProtectedComponent.jsx
import { usePermissions } from '../hooks/usePermissions';

const ProtectedComponent = ({ permission, children, fallback = null }) => {
  const { hasPermission } = usePermissions();
  
  if (!hasPermission(permission)) {
    return fallback;
  }
  
  return children;
};

// استفاده
<ProtectedComponent permission="tickets.write">
  <CreateTicketButton />
</ProtectedComponent>
```

## مرحله بعدی

- [نمونه کدها](/docs/api/examples/javascript)
- [Endpoints](/docs/api/endpoints/users)
- [عیب‌یابی](/docs/troubleshooting/intro)

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
