const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

/**
 * @route POST /auth/register
 * @description Register a new user
 * @access Public
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // تحقق من وجود البيانات المطلوبة
  if (!username || !password) {
    return res.status(400).json({ message: 'اسم المستخدم وكلمة المرور مطلوبان' });
  }

  try {
    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const newUser = await User.create({ username, password: hashedPassword });

    // إرجاع النتيجة
    res.status(201).json({ message: 'تم التسجيل بنجاح', user: { id: newUser._id, username: newUser.username } });
  } catch (error) {
    res.status(500).json({ message: 'خطأ أثناء التسجيل', error });
  }
});

/**
 * @route POST /auth/login
 * @description Login a user
 * @access Public
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // التحقق من وجود المستخدم
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });

    // مقارنة كلمات المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });

    // إنشاء توكن JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // إرجاع التوكن والرسالة
    res.json({ message: 'تم تسجيل الدخول بنجاح', token });
  } catch (error) {
    res.status(500).json({ message: 'خطأ أثناء تسجيل الدخول', error });
  }
});

module.exports = router;
