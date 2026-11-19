# Hướng dẫn làm việc với Rạp Nhà

Rạp Nhà là đồ án Thiết kế giao diện người dùng IE106, dựng từ wireframe 15 màn hình. Phạm vi là giao diện và tương tác bằng HTML, CSS và JavaScript thuần. Tài khoản, theo dõi, lịch sử và cài đặt là dữ liệu demo lưu trong trình duyệt.

Đọc [memory.md](memory.md) để nắm trạng thái bàn giao khi bắt đầu phiên mới. [README.md](README.md) có kịch bản trình diễn, lịch sử chỉnh sửa và nguồn tư liệu.

## Cấu trúc

- `dist/index.html` là điểm vào. Các trang dùng định tuyến theo hash và đường dẫn tài nguyên tương đối để chạy được trên GitHub Pages.
- `dist/app.js` chứa giao diện, xử lý tương tác và `localStorage`. `dist/styles.css` chứa bố cục và định dạng responsive.
- `dist/catalog.js` chứa dữ liệu phim, thứ hạng và cấu hình các hàng trang chủ. `dist/film-episodes.js` chứa dữ liệu tập. Ảnh và video demo nằm trong `dist/assets/`.
- Sửa trực tiếp trong `dist/`. GitHub Actions xuất bản chính thư mục này khi có push lên `main`.

## Làm việc và kiểm tra

- Chạy `npm run dev` từ gốc repo và mở `http://127.0.0.1:4173/`. `preview.mjs` chỉ phục vụ tệp tĩnh để xem trước.
- Chạy `npm run check` sau khi sửa JavaScript. Với thay đổi giao diện, kiểm tra luồng liên quan trên trình duyệt ở chiều rộng desktop và mobile.
- Khi sửa nhãn trên giao diện có hỗ trợ hai ngôn ngữ, cập nhật cả tiếng Việt và tiếng Anh theo mẫu `bi(vi, en)` hiện có.
- Khi thêm hoặc thay nội dung phim, dùng ảnh và thông tin phim thật, ưu tiên nguồn chính thức và ghi nguồn trong README.
- Cập nhật `memory.md` khi trạng thái bàn giao thay đổi. Dùng README cho nội dung trình diễn và lịch sử công khai của đồ án.
