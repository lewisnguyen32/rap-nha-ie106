# Bàn giao frontend Rạp Nhà

## Trạng thái hiện tại

- Trang chủ có sáu hàng phim, gồm **Top 10 phim gần đây**, **Phim chiếu rạp**, **Phim Việt Nam**, **Phim Hàn Quốc**, **Rạp Nhà tuyển chọn** và **Điểm cao từ nhà phát hành**. Top 10 xếp theo thời điểm phát hành, lấy năm khi thiếu ngày. Nút **Xem tất cả** giữ thứ hạng khi mở danh mục.
- `bindShelf` trong `dist/app.js` điều khiển các hàng phim. Hàng cuộn vòng hai chiều, mỗi lần bấm mũi tên đi hai ô, vẫn hỗ trợ vuốt và tôn trọng tùy chọn giảm chuyển động. Banner lớn dùng điều khiển riêng và chuyển từng phim.
- **Tears of Steel** là mẫu để kiểm tra trình phát tích hợp, đổi chất lượng, phụ đề và lưu tiến độ. Các tựa có liên kết phát hành dùng nút **Xem tại nguồn**. Với phim bộ, giao diện demo hiển thị tên tập, ảnh và thời lượng.
- Dùng **Hai Phượng** để thử tìm kiếm bằng `hai phuong` hoặc `Furie`, **Tết ở Làng Địa Ngục** để thử danh sách tập, và **Dùng tài khoản mẫu** để thử theo dõi và lịch sử.

## Ghi chú còn mở

- README ghi nhận giãn cách của banner thay đổi giữa các phim và banner đang chuyển thủ công.
- Các ý tưởng đang ghi nhận trong README gồm thêm hiệu ứng cho mục Câu hỏi thường gặp, làm rõ nhãn **Language** trong menu avatar và cân nhắc nút tua 10 giây.
- Nếu chỉnh hàng phim, kiểm tra cả hai chiều qua điểm nối cuối–đầu, kiểm tra hai ô mỗi lượt bấm và thao tác vuốt trên màn hình hẹp.
