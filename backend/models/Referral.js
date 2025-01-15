// models/Referral.js

/**
 * نموذج الإحالة (Referral Schema)
 * الهدف: تخزين معلومات الإحالة مثل كود الإحالة والمستخدمين المحالين.
 */

const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
  // معرف المستخدم الذي يملك كود الإحالة
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // كود الإحالة الفريد لكل مستخدم
  referralCode: { type: String, unique: true, required: true },
  // قائمة المستخدمين الذين تم إحالتهم
  referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Referral', ReferralSchema);
const authenticateToken = require('../middleware/authenticateToken');
