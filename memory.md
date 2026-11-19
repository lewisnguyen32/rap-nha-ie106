# Bàn giao frontend Rạp Nhà

## Trạng thái hiện tại

- Trang chủ có sáu hàng phim, gồm **Top 10 phim gần đây**, **Phim chiếu rạp**, **Phim Việt Nam**, **Phim Hàn Quốc**, **Rạp Nhà tuyển chọn** và **Điểm cao từ nhà phát hành**. Top 10 xếp theo thời điểm phát hành, lấy năm khi thiếu ngày. Nút **Xem tất cả** giữ thứ hạng khi mở danh mục.
- `bindShelf` trong `dist/app.js` điều khiển các hàng phim. Hàng cuộn vòng hai chiều, mỗi lần bấm mũi tên đi hai ô, vẫn hỗ trợ vuốt và tôn trọng tùy chọn giảm chuyển động. Banner lớn dùng điều khiển riêng và chuyển từng phim.
- Các slide banner dùng chung chiều cao từng hàng để vị trí nút và mục Top 10 ổn định khi đổi phim. Tiêu đề chỉ giảm cỡ chữ khi vượt hai dòng, tối đa 20%. Mô tả trên banner hiển thị tối đa ba dòng.
- Tất cả 23 tựa dùng trình phát mô phỏng bằng ảnh tĩnh với phát, tạm dừng, tua, toàn màn hình, âm lượng mô phỏng và lưu tiến độ. Trailer dùng YouTube. **Khi Cuộc Đời Cho Bạn Quả Quýt** có bốn phần, mỗi phần bốn tập, giữ đường dẫn và số tập liên tục từ 1 đến 16.
- 60 ảnh của trình phát nằm trong `dist/assets/films/player/` và có kích thước 1920 × 1080. Banner Thám Tử Kiên dùng lại ảnh không chữ trong thư mục này. Các thẻ tập dùng ảnh thu nhỏ riêng.
- Dùng **Hai Phượng** để thử tìm kiếm bằng `hai phuong` hoặc `Furie`, **Tết ở Làng Địa Ngục** để thử danh sách tập, và **Dùng tài khoản mẫu** để thử theo dõi và lịch sử.
- Luồng **Quên mật khẩu?** bắt đầu từ trang Đăng nhập. Có thể dùng email đã đăng ký hoặc nút **Dùng email mẫu**. OTP `123456` mở bước đặt mật khẩu mới. OTP sai mở hộp thoại thất bại. Đường dẫn `#/dang-tai` mở riêng màn hình chờ cho báo cáo.

## Ghi chú còn mở

- Banner đang chuyển thủ công. Tự động chuyển là một phương án cần đánh giá thêm.
- Các ý tưởng đang ghi nhận trong README gồm thêm hiệu ứng cho mục Câu hỏi thường gặp, làm rõ nhãn **Language** trong menu avatar và cân nhắc nút tua 10 giây.
- Nếu chỉnh hàng phim, kiểm tra cả hai chiều qua điểm nối cuối–đầu, kiểm tra hai ô mỗi lượt bấm và thao tác vuốt trên màn hình hẹp.
