# یکپارچه‌سازی

این بخش شامل راهنمای یکپارچه‌سازی سیستم پشتیبانی با سیستم‌های دیگر است.

## یکپارچه‌سازی با سیستم‌های CRM

### Salesforce

#### تنظیمات اولیه

```javascript
// integrations/salesforce.js
const jsforce = require('jsforce');

class SalesforceIntegration {
  constructor(config) {
    this.conn = new jsforce.Connection({
      loginUrl: config.loginUrl || 'https://login.salesforce.com',
      version: config.version || '58.0'
    });
  }

  async authenticate(username, password, securityToken) {
    try {
      await this.conn.login(username, password + securityToken);
      return {
        success: true,
        accessToken: this.conn.accessToken,
        instanceUrl: this.conn.instanceUrl
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createCase(ticketData) {
    try {
      const caseData = {
        Subject: ticketData.title,
        Description: ticketData.description,
        Priority: this.mapPriority(ticketData.priority),
        Status: 'New',
        Origin: 'Web'
      };

      const result = await this.conn.sobject('Case').create(caseData);
      return {
        success: true,
        caseId: result.id
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  mapPriority(priority) {
    const priorityMap = {
      'low': 'Low',
      'medium': 'Medium',
      'high': 'High',
      'urgent': 'Critical'
    };
    return priorityMap[priority] || 'Medium';
  }
}

module.exports = SalesforceIntegration;
```

#### استفاده

```javascript
// استفاده از Salesforce Integration
const SalesforceIntegration = require('./integrations/salesforce');

const salesforce = new SalesforceIntegration({
  loginUrl: 'https://login.salesforce.com',
  version: '58.0'
});

// احراز هویت
const authResult = await salesforce.authenticate(
  'your-username',
  'your-password',
  'your-security-token'
);

if (authResult.success) {
  // ایجاد Case جدید
  const caseResult = await salesforce.createCase({
    title: 'مشکل لاگین',
    description: 'نمی‌توانم وارد سیستم شوم',
    priority: 'high'
  });
}
```

### HubSpot

#### تنظیمات اولیه

```javascript
// integrations/hubspot.js
const hubspot = require('@hubspot/api-client');

class HubSpotIntegration {
  constructor(apiKey) {
    this.client = new hubspot.Client({ apiKey });
  }

  async createTicket(ticketData) {
    try {
      const ticket = {
        properties: {
          subject: ticketData.title,
          content: ticketData.description,
          hs_ticket_priority: this.mapPriority(ticketData.priority),
          hs_ticket_category: ticketData.category,
          hs_pipeline: '0',
          hs_pipeline_stage: '1'
        }
      };

      const result = await this.client.crm.tickets.basicApi.create(ticket);
      return {
        success: true,
        ticketId: result.id
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updateTicket(ticketId, updateData) {
    try {
      const ticket = {
        properties: {
          hs_ticket_priority: this.mapPriority(updateData.priority),
          hs_pipeline_stage: this.mapStatus(updateData.status)
        }
      };

      await this.client.crm.tickets.basicApi.update(ticketId, ticket);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  mapPriority(priority) {
    const priorityMap = {
      'low': 'LOW',
      'medium': 'MEDIUM',
      'high': 'HIGH',
      'urgent': 'URGENT'
    };
    return priorityMap[priority] || 'MEDIUM';
  }

  mapStatus(status) {
    const statusMap = {
      'open': '1',
      'in-progress': '2',
      'waiting': '3',
      'closed': '4'
    };
    return statusMap[status] || '1';
  }
}

module.exports = HubSpotIntegration;
```

## یکپارچه‌سازی با سیستم‌های پیام‌رسانی

### Slack

#### تنظیمات اولیه

```javascript
// integrations/slack.js
const { WebClient } = require('@slack/web-api');

class SlackIntegration {
  constructor(token) {
    this.client = new WebClient(token);
  }

  async sendNotification(channel, message, attachments = []) {
    try {
      const result = await this.client.chat.postMessage({
        channel,
        text: message,
        attachments: attachments.map(attachment => ({
          color: attachment.color || 'good',
          title: attachment.title,
          text: attachment.text,
          fields: attachment.fields || []
        }))
      });

      return {
        success: true,
        messageId: result.ts
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createTicketNotification(ticket) {
    const message = `تیکت جدید: ${ticket.title}`;
    const attachments = [{
      color: this.getPriorityColor(ticket.priority),
      title: 'جزئیات تیکت',
      text: ticket.description,
      fields: [
        { title: 'اولویت', value: ticket.priority, short: true },
        { title: 'دسته‌بندی', value: ticket.category, short: true },
        { title: 'کاربر', value: ticket.user.name, short: true },
        { title: 'تاریخ', value: new Date(ticket.createdAt).toLocaleDateString('fa-IR'), short: true }
      ]
    }];

    return await this.sendNotification('#support', message, attachments);
  }

  getPriorityColor(priority) {
    const colors = {
      'low': 'good',
      'medium': 'warning',
      'high': 'danger',
      'urgent': '#ff0000'
    };
    return colors[priority] || 'good';
  }
}

module.exports = SlackIntegration;
```

### Discord

#### تنظیمات اولیه

```javascript
// integrations/discord.js
const { Client, GatewayIntentBits } = require('discord.js');

class DiscordIntegration {
  constructor(token) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
    });
  }

  async sendEmbed(channelId, embed) {
    try {
      const channel = await this.client.channels.fetch(channelId);
      await channel.send({ embeds: [embed] });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  createTicketEmbed(ticket) {
    return {
      title: `تیکت جدید: ${ticket.title}`,
      description: ticket.description,
      color: this.getPriorityColor(ticket.priority),
      fields: [
        { name: 'اولویت', value: ticket.priority, inline: true },
        { name: 'دسته‌بندی', value: ticket.category, inline: true },
        { name: 'کاربر', value: ticket.user.name, inline: true },
        { name: 'تاریخ', value: new Date(ticket.createdAt).toLocaleDateString('fa-IR'), inline: true }
      ],
      timestamp: new Date(),
      footer: {
        text: 'سیستم پشتیبانی'
      }
    };
  }

  getPriorityColor(priority) {
    const colors = {
      'low': 0x00ff00,
      'medium': 0xffff00,
      'high': 0xff8800,
      'urgent': 0xff0000
    };
    return colors[priority] || 0x00ff00;
  }
}

module.exports = DiscordIntegration;
```

## یکپارچه‌سازی با سیستم‌های ایمیل

### SendGrid

#### تنظیمات اولیه

```javascript
// integrations/sendgrid.js
const sgMail = require('@sendgrid/mail');

class SendGridIntegration {
  constructor(apiKey) {
    sgMail.setApiKey(apiKey);
  }

  async sendEmail(emailData) {
    try {
      const msg = {
        to: emailData.to,
        from: emailData.from || process.env.FROM_EMAIL,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
        templateId: emailData.templateId,
        dynamicTemplateData: emailData.dynamicTemplateData
      };

      await sgMail.send(msg);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async sendTicketNotification(ticket, user) {
    const emailData = {
      to: user.email,
      subject: `تیکت جدید: ${ticket.title}`,
      templateId: 'd-1234567890abcdef',
      dynamicTemplateData: {
        ticketTitle: ticket.title,
        ticketDescription: ticket.description,
        ticketPriority: ticket.priority,
        ticketCategory: ticket.category,
        userName: user.name,
        ticketUrl: `${process.env.APP_URL}/tickets/${ticket.id}`
      }
    };

    return await this.sendEmail(emailData);
  }
}

module.exports = SendGridIntegration;
```

### Mailgun

#### تنظیمات اولیه

```javascript
// integrations/mailgun.js
const mailgun = require('mailgun-js');

class MailgunIntegration {
  constructor(apiKey, domain) {
    this.mailgun = mailgun({ apiKey, domain });
  }

  async sendEmail(emailData) {
    try {
      const data = {
        from: emailData.from || process.env.FROM_EMAIL,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
        template: emailData.template,
        'h:X-Mailgun-Variables': JSON.stringify(emailData.variables || {})
      };

      const result = await this.mailgun.messages().send(data);
      return {
        success: true,
        messageId: result.id
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async sendTicketNotification(ticket, user) {
    const emailData = {
      to: user.email,
      subject: `تیکت جدید: ${ticket.title}`,
      template: 'ticket-notification',
      variables: {
        ticketTitle: ticket.title,
        ticketDescription: ticket.description,
        ticketPriority: ticket.priority,
        ticketCategory: ticket.category,
        userName: user.name,
        ticketUrl: `${process.env.APP_URL}/tickets/${ticket.id}`
      }
    };

    return await this.sendEmail(emailData);
  }
}

module.exports = MailgunIntegration;
```

## یکپارچه‌سازی با سیستم‌های ذخیره‌سازی

### AWS S3

#### تنظیمات اولیه

```javascript
// integrations/aws-s3.js
const AWS = require('aws-sdk');

class AWSS3Integration {
  constructor(config) {
    this.s3 = new AWS.S3({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region
    });
    this.bucket = config.bucket;
  }

  async uploadFile(file, key) {
    try {
      const params = {
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'private'
      };

      const result = await this.s3.upload(params).promise();
      return {
        success: true,
        url: result.Location,
        key: result.Key
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteFile(key) {
    try {
      await this.s3.deleteObject({
        Bucket: this.bucket,
        Key: key
      }).promise();

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getSignedUrl(key, expires = 3600) {
    try {
      const url = await this.s3.getSignedUrlPromise('getObject', {
        Bucket: this.bucket,
        Key: key,
        Expires: expires
      });

      return {
        success: true,
        url
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = AWSS3Integration;
```

### Google Cloud Storage

#### تنظیمات اولیه

```javascript
// integrations/gcs.js
const { Storage } = require('@google-cloud/storage');

class GCSIntegration {
  constructor(config) {
    this.storage = new Storage({
      projectId: config.projectId,
      keyFilename: config.keyFilename
    });
    this.bucket = this.storage.bucket(config.bucketName);
  }

  async uploadFile(file, fileName) {
    try {
      const fileUpload = this.bucket.file(fileName);
      
      await fileUpload.save(file.buffer, {
        metadata: {
          contentType: file.mimetype
        }
      });

      return {
        success: true,
        url: `https://storage.googleapis.com/${this.bucket.name}/${fileName}`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteFile(fileName) {
    try {
      await this.bucket.file(fileName).delete();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getSignedUrl(fileName, expires = 3600) {
    try {
      const file = this.bucket.file(fileName);
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + expires * 1000
      });

      return {
        success: true,
        url
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = GCSIntegration;
```

## یکپارچه‌سازی با سیستم‌های مانیتورینگ

### New Relic

#### تنظیمات اولیه

```javascript
// integrations/newrelic.js
const newrelic = require('newrelic');

class NewRelicIntegration {
  constructor() {
    this.newrelic = newrelic;
  }

  recordCustomEvent(eventType, attributes) {
    try {
      this.newrelic.recordCustomEvent(eventType, attributes);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  recordTicketEvent(ticket, action) {
    const attributes = {
      ticketId: ticket.id,
      ticketTitle: ticket.title,
      ticketPriority: ticket.priority,
      ticketCategory: ticket.category,
      action: action,
      userId: ticket.user.id,
      timestamp: new Date().toISOString()
    };

    return this.recordCustomEvent('TicketEvent', attributes);
  }

  recordPerformanceMetric(metricName, value, attributes = {}) {
    try {
      this.newrelic.recordMetric(metricName, value, attributes);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = NewRelicIntegration;
```

### DataDog

#### تنظیمات اولیه

```javascript
// integrations/datadog.js
const StatsD = require('node-statsd');

class DataDogIntegration {
  constructor(config) {
    this.client = new StatsD({
      host: config.host || 'localhost',
      port: config.port || 8125,
      prefix: config.prefix || 'support_system.'
    });
  }

  increment(metric, value = 1, tags = []) {
    try {
      this.client.increment(metric, value, tags);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  gauge(metric, value, tags = []) {
    try {
      this.client.gauge(metric, value, tags);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  recordTicketMetric(ticket, action) {
    const tags = [
      `priority:${ticket.priority}`,
      `category:${ticket.category}`,
      `action:${action}`
    ];

    return this.increment('ticket.event', 1, tags);
  }

  recordResponseTime(responseTime, priority) {
    const tags = [`priority:${priority}`];
    return this.gauge('ticket.response_time', responseTime, tags);
  }
}

module.exports = DataDogIntegration;
```

## مرحله بعدی

- [اتوماسیون](/docs/advanced/automation)
- [عیب‌یابی](/docs/troubleshooting/intro)
- [مستندات API](/docs/api/intro)

---

*آخرین به‌روزرسانی: ${new Date().toLocaleDateString('fa-IR')}*
