# Dashboard Configuration Project

## Giới thiệu
Dự án này là một ứng dụng web cho phép người dùng tùy chỉnh và quản lý dashboard của họ. Frontend được xây dựng bằng Angular (dựa trên ngx-admin template) và Backend được xây dựng bằng Node.js với Express.

## Yêu cầu hệ thống
- Node.js (version 14.x hoặc cao hơn, khuyến nghị 14.20) 
- Angular CLI (version 13.x hoặc cao hơn, khuyến nghị 15.2.11)
- MySQL (version 5.7 hoặc cao hơn, khuyến nghị 8.0)

## Cài đặt và Chạy ứng dụng

### 1. Cài đặt Backend
Backend sẽ chạy tại `http://localhost:3000`

bash
Di chuyển vào thư mục backend
cd backend
Cài đặt các dependencies
npm install
Khởi động server trong chế độ development
npm run dev


### 2. Cài đặt Frontend 
Frontend sẽ chạy tại `http://localhost:4200`
bash
Di chuyển vào thư mục frontend
cd frontend
Cài đặt các dependencies
npm install
Khởi động ứng dụng Angular
ng serve


## Cấu hình Database
1. Đảm bảo MySQL đã được cài đặt và đang chạy
2. Tạo database với tên 'datn'
3. Cập nhật thông tin kết nối database trong file `backend/src/config/database.js`

## Tính năng chính
- Đăng nhập/Đăng ký
- Tùy chỉnh dashboard
- Quản lý người dùng (Admin)
- Theo dõi cổ phiếu
- Lưu và khôi phục cấu hình dashboard

## Lưu ý
- Đảm bảo MySQL đang chạy trước khi khởi động backend
- Kiểm tra các cổng 3000 và 4200 không bị sử dụng bởi ứng dụng khác
- Cập nhật các biến môi trường nếu cần thiết

> **Lưu ý**: Các lệnh `npm install` và `ng serve` là chính xác. `npm run dev` cũng đúng vì đã được định nghĩa trong `package.json` của backend để chạy với nodemon.



