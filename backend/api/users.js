const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware للتحقق من التوكن
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'لا يوجد توكن، الوصول مرفوض' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'توكن غير صالح' });
  }
};

// تحديث بيانات المستخدم
router.put('/update', authenticateToken, async (req, res) => {
  const { username } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { username }, { new: true });
    res.json({ message: 'تم تحديث البيانات بنجاح', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء التحديث', error });
  }
});

// حذف حساب المستخدم
router.delete('/delete', authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'تم حذف الحساب بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء الحذف', error });
  }
});

module.exports = router;
