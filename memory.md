# Bàn giao frontend Rạp Nhà

## Trạng thái hiện tại

- Nhận diện Rạp Nhà dùng biểu tượng mái nhà nối với nút phát. Đầu trang và chân trang dùng logo đầy đủ từ `dist/assets/logo.svg`. Favicon và màn hình chờ dùng biểu tượng từ `dist/assets/icon.svg`.
- Trang chủ có sáu hàng phim, gồm **Top 10 phim gần đây**, **Phim chiếu rạp**, **Phim Việt Nam**, **Phim Hàn Quốc**, **Rạp Nhà tuyển chọn** và **Điểm cao từ nhà phát hành**. Top 10 xếp theo thời điểm phát hành, lấy năm khi thiếu ngày. Nút **Xem tất cả** giữ thứ hạng khi mở danh mục.
- `bindShelf` trong `dist/app.js` điều khiển các hàng phim. Hàng cuộn vòng hai chiều, mỗi lần bấm mũi tên đi hai ô, vẫn hỗ trợ vuốt và tôn trọng tùy chọn giảm chuyển động. Banner lớn dùng điều khiển riêng và chuyển từng phim.
- Các slide banner dùng chung chiều cao từng hàng để vị trí nút và mục Top 10 ổn định khi đổi phim. Tiêu đề chỉ giảm cỡ chữ khi vượt hai dòng, tối đa 20%. Mô tả trên banner hiển thị tối đa ba dòng.
- Nhãn phim nổi bật hiển thị bằng chữ, tiêu đề hàng phim dùng chữ thuần. Thẻ Top 10 đặt số hạng cạnh tên phim. Poster ở trang chủ bỏ viền mặc định. Thẻ vẫn có viền focus khi dùng bàn phím và poster sáng nhẹ khi rê chuột.
- Trên desktop, giữ chuột trên thẻ phim hoặc dùng Tab để mở ô xem nhanh cạnh poster. Ô dùng mô tả và thông tin của phim từ danh mục, tự đổi phía theo khoảng trống và đóng bằng Escape.
- Tất cả 23 tựa dùng trình phát mô phỏng bằng ảnh tĩnh với phát, tạm dừng, tua, toàn màn hình, âm lượng mô phỏng và lưu tiến độ. Trailer dùng YouTube. **Khi Cuộc Đời Cho Bạn Quả Quýt** có bốn phần, mỗi phần bốn tập, giữ đường dẫn và số tập liên tục từ 1 đến 16.
- Hai nút tua trên thanh điều khiển và phím **← / →** tua lùi hoặc tới 10 giây khi đang phát hoặc tạm dừng. Trình phát hiện số giây đã tua trên khung hình và lưu vị trí mới.
- Menu cài đặt trình phát có phụ đề mẫu tiếng Việt, tiếng Anh, chất lượng và thuyết minh mô phỏng. Lựa chọn được lưu trong trình duyệt.
- 60 ảnh của trình phát nằm trong `dist/assets/films/player/` và có kích thước 1920 × 1080. Banner Thám Tử Kiên dùng lại ảnh không chữ trong thư mục này. Các thẻ tập dùng ảnh thu nhỏ riêng.
- Trang giới thiệu phim bộ đặt danh sách tập ngay sau thông tin phim. Nút **Trailer** nằm cạnh nút xem.
- Dùng **Hai Phượng** để thử tìm kiếm bằng `hai phuong` hoặc `Furie`, **Tết ở Làng Địa Ngục** để thử danh sách tập, và **Dùng tài khoản mẫu** để thử theo dõi và lịch sử.
- Luồng **Quên mật khẩu?** bắt đầu từ trang Đăng nhập. Có thể dùng email đã đăng ký hoặc nút **Dùng email mẫu**. OTP `123456` mở bước đặt mật khẩu mới. OTP sai mở hộp thoại thất bại. Đường dẫn `#/dang-tai` mở riêng màn hình chờ cho báo cáo.
- Đổi ngôn ngữ bằng biểu tượng quả địa cầu cạnh nút tài khoản ở đầu trang. **Đổi mật khẩu** nằm trong Cài đặt sau khi đăng nhập. Tài khoản mẫu **Minh Quân** dùng email `minhquan@example.com`. Các khóa lưu trữ tài khoản mẫu trước đây được dùng lại để giữ dữ liệu đã lưu.

## Ghi chú còn mở

- Banner đang chuyển thủ công. Tự động chuyển là một phương án cần đánh giá thêm.
- Có thể bổ sung hiệu ứng mở và thu câu trả lời trong mục Câu hỏi thường gặp.
- Nếu chỉnh hàng phim, kiểm tra cả hai chiều qua điểm nối cuối–đầu, kiểm tra hai ô mỗi lượt bấm và thao tác vuốt trên màn hình hẹp.
