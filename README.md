# Hướng dẫn cài đặt & chạy Frontend

## 1. Cài đặt dependencies
```bash
cd client
npm install
```

## 2. Cấu hình kết nối backend
- Mặc định, frontend sẽ gọi API tới `http://localhost:5000`.
- Nếu backend chạy ở địa chỉ khác, hãy sửa các URL trong code hoặc sử dụng proxy trong `vite.config.js`.

## 3. Chạy frontend ở chế độ phát triển
```bash
npm run dev
```
- Ứng dụng sẽ chạy ở `http://localhost:5173` (hoặc cổng do Vite chỉ định).

## 4. Build frontend cho production
```bash
npm run build
```
- Kết quả build nằm trong thư mục `dist/`.

## 5. Các chức năng chính
- Đăng nhập, đăng ký, xác thực người dùng
- Xem danh sách bài học, chi tiết bài học
- Xem danh sách bài tập, chi tiết bài tập, nộp bài
- Bảng xếp hạng
- Tìm kiếm bài học, bài tập
- Hỗ trợ dark/light mode, responsive, UI hiện đại

## 6. Lưu ý
- Đảm bảo backend đã chạy trước khi sử dụng frontend.
- Nếu gặp lỗi CORS, kiểm tra cấu hình backend.
- Có thể chỉnh sửa giao diện bằng Tailwind CSS.

---
Nếu gặp lỗi, kiểm tra log terminal và đảm bảo backend đã hoạt động đúng. 