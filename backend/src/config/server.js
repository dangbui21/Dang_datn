// Cấu hình các biến môi trường và thông số server
const config = {
    // Cấu hình server
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
  
    // Cấu hình CORS
    corsOptions: {
      origin: ['http://localhost:4200'], // Thêm các domain được phép truy cập
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    },
  
    // Cấu hình file upload (nếu cần)
    upload: {
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf']
    },
  
    // Cấu hình bảo mật
    security: {
      bcryptSaltRounds: 10,
      jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
      jwtExpiration: '24h'
    },
  
    // Các cấu hình khác
    api: {
      prefix: '/api',
      version: 'v1'
    }
  };
  
  module.exports = config;