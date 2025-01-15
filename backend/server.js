require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const config = require('./config'); // إدارة متغيرات البيئة بشكل مركزي

// الاتصال بقاعدة البيانات
connectDB()
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Database connection error:', err));

// تهيئة تطبيق Express
const app = express();
app.use(express.json());

// مسار الجذر (للتحقق من عمل الخادم)
app.get('/', (req, res) => {
  console.log('GET / was hit');
  res.send('MR7 Backend يعمل بنجاح!');
});

// تعريف مسارات المستخدمين
const userRoutes = require('./api/users');
app.use('/api/users', userRoutes);

// تعريف مسارات الإحالة
const referralRoutes = require('./api/referrals');
app.use('/api/referrals', referralRoutes);

// تشغيل الخادم
const PORT = config.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
