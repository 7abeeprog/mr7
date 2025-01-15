require('dotenv').config(); // تحميل متغيرات البيئة

// التحقق من وجود جميع المتغيرات المطلوبة
if (!process.env.PORT || !process.env.MONGO_URI || !process.env.JWT_SECRET) {
  throw new Error('Missing environment variables. Please check the .env file.');
}

module.exports = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};
const config = require('./config');
const PORT = config.port;
const MONGO_URI = config.mongoURI;
