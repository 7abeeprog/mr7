// api/referrals.js

/**
 * مسارات الإحالة (Referral Routes)
 * الهدف: إدارة كود الإحالة وتسجيل الإحالات الجديدة.
 */

const express = require('express');
const Referral = require('../models/Referral');
const User = require('../models/User');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); // Middleware للتحقق من التوكن

// إنشاء كود إحالة جديد للمستخدم
router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const referralCode = `REF-${req.user.id}`;
    const newReferral = await Referral.create({
      userId: req.user.id,
      referralCode,
      referredUsers: [],
    });
    res.status(201).json({ message: 'تم إنشاء كود الإحالة بنجاح', referralCode: newReferral.referralCode });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء كود الإحالة', error });
  }
});

// تسجيل إحالة جديدة
router.post('/refer', async (req, res) => {
  const { referralCode } = req.body;
  try {
    const referral = await Referral.findOne({ referralCode });
    if (!referral) return res.status(404).json({ message: 'كود الإحالة غير موجود' });

    referral.referredUsers.push(req.user.id);
    await referral.save();

    res.status(200).json({ message: 'تم تسجيل الإحالة بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الإحالة', error });
  }
});

module.exports = router;
const authenticateToken = require('../middleware/authenticateToken');
