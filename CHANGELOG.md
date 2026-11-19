# Lịch sử chỉnh sửa Rạp Nhà

Các mốc trong tài liệu này do Phước thực hiện.

## Từ wireframe đến giao diện tương tác

Bản đầu hiện thực hóa 15 màn hình phác thảo, từ trang chủ và tìm kiếm đến lọc, đọc chi tiết và chọn xem phim. Bố cục banner trên, danh sách phim dưới dựa trên phương án được 75,7% người trả lời khảo sát chọn ở mục 1.1.1. Đăng nhập, theo dõi, lịch sử xem và cài đặt được mô phỏng trên trình duyệt.

## Cập nhật hình ảnh và dữ liệu phim thật

Poster và ảnh nền của phim thật thay cho ảnh minh họa. Danh mục có thêm thông tin phát hành, tóm tắt, trailer, dữ liệu tập và liên kết xem. Bản đầu trên Git có 19 tựa (`081a1df`). Trang chi tiết **Tết ở Làng Địa Ngục** minh họa cách trình bày ảnh, tên và thời lượng từng tập.

## Trình diễn luồng xem và triển khai bản tĩnh

Ở bản trình diễn đầu, **Tears of Steel** phát bằng trình phát tích hợp có thanh tua, lựa chọn chất lượng, phụ đề tiếng Anh và lưu vị trí xem. Các phim có liên kết phát hành dẫn sang nền tảng tương ứng. Nhóm cấu hình GitHub Actions để xuất bản thư mục `dist/` lên GitHub Pages (`98f3cf7`).

## Mở rộng lựa chọn trên trang chủ

Trang chủ mở rộng từ ba lên sáu hàng để người dùng có thêm cách khám phá phim. Bản cập nhật thêm **Phim chiếu rạp**, **Phim Việt Nam**, **Phim Hàn Quốc** và chuyển hàng phát hành gần đây thành **Top 10 phim gần đây**. Danh mục tăng từ 19 lên 23 tựa khi bổ sung bốn phim Hàn (`1d5b4e0`).

Top 10 xếp theo thời điểm phát hành và dùng năm phát hành khi thiếu ngày cụ thể. **Xem tất cả** mở đủ 10 tựa theo cùng thứ hạng. Hai hàng theo quốc gia dẫn tới danh mục đã lọc sẵn. Có thể đối chiếu trang chủ trong Chương 3 với wireframe ba hàng.

## Điều chỉnh thao tác cuộn hàng phim

Các hàng phim cuộn vòng theo hai hướng, mỗi lần bấm mũi tên di chuyển hai thẻ. Chuyển động tăng tốc ở đầu lượt và chậm dần trước khi dừng. Người dùng có thể vuốt ngang trên màn hình cảm ứng. Website tôn trọng tùy chọn giảm chuyển động (`e08c32a`). Đã kiểm tra hai chiều qua điểm nối trên hàng **Top 10 phim gần đây** và **Phim Hàn Quốc**. So sánh nhịp cuộn một và hai thẻ trên màn hình hẹp là nội dung đánh giá ở Chương 4.

## Mô phỏng trình phát cho toàn bộ danh mục

Toàn bộ phim và tập mở trong trình phát ảnh tĩnh của Rạp Nhà. Trình phát mô phỏng thao tác phát, tạm dừng, tua, điều chỉnh âm lượng, mở toàn màn hình và chuyển tập. Vị trí xem được lưu theo từng phim hoặc tập. Trailer mở riêng qua YouTube.

Danh sách của **Khi Cuộc Đời Cho Bạn Quả Quýt** có bộ chọn bốn phần. Số tập và đường dẫn xem chạy liên tục từ tập 1 đến tập 16.

| Phim bộ | Phần và số tập | Nguồn đối chiếu |
| --- | --- | --- |
| Tết ở Làng Địa Ngục | Một phần, 12 tập | [K+](https://www.youtube.com/watch?v=Vmr1KahUXRk) |
| Tiệm Ăn Của Quỷ | Một phần, 6 tập | [Netflix](https://www.netflix.com/vn/title/81751769) |
| Khi Cuộc Đời Cho Bạn Quả Quýt | 16 tập, bốn đợt phát hành, bốn tập mỗi đợt | [Netflix Tudum](https://www.netflix.com/tudum/articles/when-life-gives-you-tangerines-release-date-news) |
| Gambit Hậu | Một phần, 7 tập | [Netflix](https://www.netflix.com/title/80234304?source=35) |

## Nâng ảnh trong trình phát lên Full HD

Trình phát dùng 60 ảnh WebP 1920 × 1080, gồm 19 ảnh phim lẻ và 41 ảnh tập phim bộ. Ảnh nguồn có khung điện ảnh được giữ tỷ lệ khi đặt vào khung Full HD. Các thẻ tập dùng ảnh thu nhỏ riêng để tải nhanh (`40e0696`).

## Ổn định bố cục banner trang chủ

Các slide dùng chung chiều cao cho từng hàng nội dung, giúp nút **Chi tiết**, nút **Xem trailer** và mục **Top 10 phim gần đây** giữ vị trí khi đổi phim. Nếu tiêu đề vượt hai dòng, cỡ chữ giảm tối đa 20%. Tiêu đề có thể xuống thêm dòng để hiện đầy đủ tên phim. Mô tả hiển thị tối đa ba dòng.

Banner **Thám Tử Kiên** dùng ảnh nền phiên bản không chữ với vùng cắt riêng cho máy tính và điện thoại. Đã kiểm tra vị trí nút, mục Top 10 và cách hiển thị khuôn mặt khi chuyển qua cả ba slide (`40e0696`).

## Hoàn thiện luồng quên mật khẩu

Từ trang Đăng nhập, người dùng có thể mở **Quên mật khẩu?**, nhập email đã đăng ký trên trình duyệt hoặc điền email mẫu. Luồng dùng lại màn hình xác nhận OTP trước khi mở biểu mẫu mật khẩu mới. Sau khi lưu, người dùng có thể đăng nhập bằng mật khẩu mới vừa tạo.

Màn hình **Đang tải** phản hồi trong lúc kiểm tra email hoặc lưu mật khẩu. Đường dẫn `#/dang-tai` mở riêng màn hình để minh họa trong báo cáo. Hộp thoại thất bại giải thích vấn đề và đưa tiêu điểm về trường cần sửa. Hộp thoại thành công xác nhận việc đổi mật khẩu và đưa người dùng về trang đăng nhập.

## Tinh gọn banner và tiêu đề hàng phim

Nhãn **Phim nổi bật** chuyển từ ô có viền thành chữ nhỏ trên ảnh nền. Tiêu đề mỗi hàng phim bỏ biểu tượng trang trí và nút **Chi tiết** trên banner bỏ bóng đỏ để ảnh và tên phim dễ nổi bật hơn.

## Làm rõ thứ hạng và thông tin trên thẻ phim

Số hạng Top 10 chuyển từ trên poster xuống cạnh tên phim để tránh che hình. Chữ ghi năm phát hành và loại phim tăng từ 11 px lên 13 px trên máy tính. Các thẻ dẫn đến trang giới thiệu phim dùng hiệu ứng làm sáng nhẹ poster thay cho biểu tượng **Phát** khi rê chuột.

## Đưa danh sách tập lên ngay sau thông tin phim bộ

Trang giới thiệu phim bộ đặt danh sách tập ngay dưới khối thông tin để người dùng chọn tập nhanh hơn. Trailer được mở từ nút **Trailer** cạnh nút xem.

## Cập nhật bộ logo Rạp Nhà

Logo mới kết hợp đường nét mái nhà với nút phát. Đầu trang và chân trang dùng bản có tên **Rạp Nhà**. Tab trình duyệt và màn hình chờ dùng bản rút gọn chỉ có biểu tượng.

## Thêm ô xem nhanh khi duyệt phim

Trên desktop, ô xem nhanh xuất hiện bên cạnh poster sau khoảng 0,3 giây khi rê chuột lên thẻ phim. Ô hiển thị tên, năm phát hành, thời lượng hoặc số tập, điểm đánh giá nếu có, tóm tắt và thể loại. Khi poster ở gần mép màn hình, ô tự mở về phía có đủ chỗ.

Người dùng bàn phím có thể dùng **Tab** để xem nhanh, **Escape** để đóng và **Enter** để mở trang giới thiệu. Đã thử trên Chrome ở trang chủ và trang danh mục.

Xem các luồng trình diễn trong [README](README.md) và các điểm còn mở trong [giới hạn bản demo](DEMO_LIMITATIONS.md).
