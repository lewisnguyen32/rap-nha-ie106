# Bàn giao frontend Rạp Nhà

## Trạng thái hiện tại

- Nhận diện Rạp Nhà dùng biểu tượng mái nhà nối với nút phát. Đầu trang và chân trang dùng logo đầy đủ từ `dist/assets/logo.svg`. Favicon và màn hình chờ dùng biểu tượng từ `dist/assets/icon.svg`.
- Trang chủ có sáu hàng phim, gồm **Top 10 phim gần đây**, **Phim chiếu rạp**, **Phim Việt Nam**, **Phim Hàn Quốc**, **Rạp Nhà tuyển chọn** và **Điểm cao từ nhà phát hành**. Top 10 xếp theo thời điểm phát hành, lấy năm khi thiếu ngày. Nút **Xem tất cả** giữ thứ hạng khi mở danh mục.
- `bindShelf` trong `dist/app.js` điều khiển các hàng phim. Hai nút mũi tên tròn, viền mảnh nằm ở mép trái và phải, căn giữa theo chiều cao poster. Mỗi lần bấm cuộn vòng hai ô. Hàng phim cũng hỗ trợ vuốt và tôn trọng tùy chọn giảm chuyển động. Banner lớn dùng điều khiển riêng và chuyển từng phim.
- Các slide banner dùng chung chiều cao từng hàng để vị trí nút và mục Top 10 ổn định khi đổi phim. Tiêu đề chỉ giảm cỡ chữ khi vượt hai dòng, tối đa 20%. Mô tả trên banner hiển thị tối đa ba dòng.
- Nhãn phim nổi bật hiển thị bằng chữ, tiêu đề hàng phim dùng chữ thuần. Thẻ Top 10 đặt số hạng cạnh tên phim. Poster ở trang chủ bỏ viền mặc định. Thẻ vẫn có viền focus khi dùng bàn phím và poster sáng nhẹ khi rê chuột.
- Trên desktop, giữ chuột trên thẻ phim hoặc dùng Tab để mở ô xem nhanh cạnh poster. Ô dùng mô tả và thông tin của phim từ danh mục, tự đổi phía theo khoảng trống và đóng bằng Escape.
- Tất cả 23 tựa dùng trình phát mô phỏng bằng ảnh tĩnh với phát, tạm dừng, tua, toàn màn hình, âm lượng mô phỏng và lưu tiến độ. Trailer dùng YouTube. **Khi Cuộc Đời Cho Bạn Quả Quýt** có bốn phần, mỗi phần bốn tập, giữ đường dẫn và số tập liên tục từ 1 đến 16.
- Hai nút tua trên thanh điều khiển và phím **← / →** tua lùi hoặc tới 10 giây khi đang phát hoặc tạm dừng. Trình phát hiện số giây đã tua trên khung hình và lưu vị trí mới.
- Menu cài đặt trình phát có phụ đề tiếng Việt/tiếng Anh, chất lượng và thuyết minh. Lựa chọn được lưu trong trình duyệt.
- 60 ảnh của trình phát nằm trong `dist/assets/films/player/` và có kích thước 1920 × 1080. Banner Thám Tử Kiên dùng lại ảnh không chữ trong thư mục này. Các thẻ tập dùng ảnh thu nhỏ riêng.
- Trang giới thiệu phim bộ đặt danh sách tập ngay sau thông tin phim. Nút **Trailer** nằm cạnh nút xem.
- Đầu trang dùng một nút **VI | EN** nhỏ, bo góc. Bấm bất kỳ vị trí nào trên nút để đổi ngôn ngữ và trượt nền đỏ trầm sang nhãn đang dùng. Lựa chọn đồng bộ với trang Cài đặt. Nút **Lên đầu trang** (Back to Top) xuất hiện ở góc dưới phải khi cuộn quá 300px.
- Menu **Thể loại** mở sau khi giữ chuột trên mục điều hướng 300 ms. Mũi tên nhích xuống khi rê chuột và xoay lên khi menu mở. Bấm nút hoặc dùng bàn phím để mở ngay. Danh sách trượt nhẹ lúc mở, nhanh hơn menu avatar.
- Menu avatar co theo nội dung và mở bằng nút sau khi đăng nhập. Mũi tên đổi đỏ và nhích nhẹ khi rê chuột, xoay lên khi mở và xoay xuống khi đóng. Danh sách trượt nhẹ lúc mở và đóng ngay khi bấm lại, bấm ra ngoài hoặc nhấn Escape. Nút **Đăng xuất** có nền đỏ trầm khi rê chuột hoặc chọn bằng bàn phím.
- Liên kết **Xem tất cả** nằm ở đầu mỗi hàng phim và sáng nhẹ khi rê chuột. Danh mục hỗ trợ đồng bộ 5 thẻ tag điều kiện lọc (`Loại phim`, `Thể loại`, `Năm`, `Quốc gia`, `Điểm đánh giá`) kèm nút **Xóa tất cả bộ lọc**, khóa tự động ô `Quốc gia` ở danh mục cố định (`Phim Việt Nam`, `Phim Hàn Quốc`), và giữ các phim chưa có điểm ở cuối khi sắp xếp theo **Điểm từ nhà phát hành**.
- Trang giới thiệu phim chia lưới 2 cột cân đối trên desktop (cột trái Poster + thông tin chi tiết, cột phải khung phát Trailer YouTube trực tiếp + thông tin nhanh). Phim bộ hiển thị định dạng **`Tập x / y`** ở trang chi tiết, thẻ tập, nhãn trên trình phát và thanh điều khiển. Cả trang chi tiết và trang xem phim đều có khu vực **Đánh giá & Bình luận** (chọn 1–5 sao, lưu `localStorage`) và hàng **Phim cùng thể loại**.
- Cụm xác thực có liên kết **`← Về trang chủ`** ở đầu thẻ, checkbox **Ghi nhớ mật khẩu** cạnh **Quên mật khẩu?** và nút **Dùng tài khoản mẫu** ở Đăng nhập, nút **Dùng email mẫu** ở Quên mật khẩu, checkbox bắt buộc đồng ý **Điều khoản sử dụng** ở Đăng ký, và **6 ô vuông nhập OTP tách biệt** kèm ghi chú **Mã OTP dùng thử: 123456** (tự nhảy ô, Backspace lùi ô, hỗ trợ paste 6 số) tại `#/xac-nhan-otp` (và `#/otp`, `#/quen-mat-khau/xac-nhan`).
- Trang **Cài đặt** gồm 4 khối: **Ngôn ngữ & Giao diện**, **Trình phát** (tự động phát, chất lượng mặc định, phụ đề mặc định), **Thông báo** và **Đổi mật khẩu** (3 trường). Trang **Lịch sử xem** hiển thị tổng số lượng phim đã xem đồng bộ với trang **Theo dõi**.
- Bổ sung trang **Hướng dẫn sử dụng** (`#/huong-dan`) gắn ở chân trang và biểu mẫu **Gửi phản hồi & báo lỗi nhanh** kèm hộp thoại xác nhận cùng nhãn **Địa chỉ liên hệ** tại trang **Liên hệ** (`#/gioi-thieu/lien-he`). Các nhãn "minh họa" và "Chất lượng mẫu / Thuyết minh mẫu" đã được chuẩn hóa tự nhiên cho cả VI và EN.
- Tài khoản mẫu **Minh Quân** dùng email `minhquan@example.com`, mật khẩu mặc định `rapnha123` (đổi được trong Cài đặt hoặc Quên mật khẩu), OTP xác nhận là `123456`. Các khóa lưu trữ tài khoản mẫu trước đây được dùng lại để giữ dữ liệu đã lưu.

## Ghi chú còn mở

- Banner đang chuyển thủ công. Tự động chuyển là một phương án cần đánh giá thêm.
- Có thể bổ sung hiệu ứng mở và thu câu trả lời trong mục Câu hỏi thường gặp.
- Nếu chỉnh hàng phim, kiểm tra cả hai chiều qua điểm nối cuối–đầu, kiểm tra hai ô mỗi lượt bấm và thao tác vuốt trên màn hình hẹp.
