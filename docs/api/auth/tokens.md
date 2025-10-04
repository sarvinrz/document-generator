# مدیریت توکن‌ها

راهنمای کامل مدیریت JWT Token ها در سیستم پشتیبانی.

## تولید توکن

### توکن دسترسی

```javascript
const jwt = require('jsonwebtoken');

// تولید توکن دسترسی
const accessToken = jwt.sign(
  {
    userId: user.id,
    username: user.username,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);
```

### توکن تجدید

```javascript
// تولید توکن تجدید
const refreshToken = jwt.sign(
  { userId: user.id },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: '7d' }
);
```

## اعتبارسنجی توکن

### Middleware اعتبارسنجی

```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'توکن مورد نیاز است' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'توکن نامعتبر' });
    }
    req.user = user;
    next();
  });
};
```

### بررسی انقضا

```javascript
const checkTokenExpiry = (token) => {
  try {
    const decoded = jwt.decode(token);
    const now = Date.now() / 1000;
    
    if (decoded.exp < now) {
      return { valid: false, reason: 'expired' };
    }
    
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, reason: 'invalid' };
  }
};
```

## تجدید توکن

### تجدید خودکار

```javascript
const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      throw new Error('کاربر یافت نشد');
    }
    
    const newAccessToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    
    return { success: true, accessToken: newAccessToken };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### Endpoint تجدید

```javascript
app.post('/api/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  const result = await refreshAccessToken(refreshToken);
  
  if (result.success) {
    res.json({
      success: true,
      accessToken: result.accessToken
    });
  } else {
    res.status(401).json({
      success: false,
      error: result.error
    });
  }
});
```

## مدیریت جلسات

### ذخیره جلسات

```javascript
const sessionStore = new Map();

const createSession = (userId, tokens) => {
  const sessionId = generateSessionId();
  
  sessionStore.set(sessionId, {
    userId,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    createdAt: new Date(),
    lastActivity: new Date()
  });
  
  return sessionId;
};
```

### خاتمه جلسه

```javascript
const terminateSession = (sessionId) => {
  if (sessionStore.has(sessionId)) {
    sessionStore.delete(sessionId);
    return { success: true };
  }
  
  return { success: false, error: 'جلسه یافت نشد' };
};
```

## امنیت توکن‌ها

### رمزگذاری توکن

```javascript
const crypto = require('crypto');

const encryptToken = (token) => {
  const algorithm = 'aes-256-gcm';
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipher(algorithm, key);
  cipher.setAAD(Buffer.from('token-encryption'));
  
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
};
```

### محدودیت استفاده

```javascript
const tokenUsageLimit = new Map();

const checkTokenUsage = (token, maxRequests = 1000) => {
  const usage = tokenUsageLimit.get(token) || { count: 0, resetTime: Date.now() + 3600000 };
  
  if (Date.now() > usage.resetTime) {
    usage.count = 0;
    usage.resetTime = Date.now() + 3600000;
  }
  
  usage.count++;
  tokenUsageLimit.set(token, usage);
  
  return usage.count <= maxRequests;
};
```

## مرحله بعدی

- [مجوزها](/docs/api/auth/permissions)
- [نمونه کدها](/docs/api/examples/javascript)
- [Endpoints](/docs/api/endpoints/users)

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
