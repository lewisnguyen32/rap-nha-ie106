# Lịch sử chỉnh sửa Rạp Nhà

## Từ wireframe đến bản frontend tương tác

Từ 15 màn hình phác thảo, nhóm dựng luồng trang chủ → tìm hoặc lọc phim → đọc chi tiết → chọn xem. Trang chủ giữ bố cục banner trên, danh sách phim dưới, phương án được 75,7% người trả lời khảo sát chọn ở mục 1.1.1. Các luồng tài khoản, theo dõi, lịch sử xem và cài đặt được mô phỏng để có thể thao tác trong buổi trình diễn.

## Cập nhật hình ảnh và dữ liệu phim thật

Nhóm thay ảnh minh họa bằng poster và ảnh nền của phim thật, rồi đồng bộ tên phim, thông tin phát hành, tóm tắt, trailer, dữ liệu từng tập và liên kết xem. Bản đầu trên Git có 19 phim và series (`081a1df`). Trang chi tiết **Tết ở Làng Địa Ngục** là ví dụ để minh họa cách dùng ảnh, tên và thời lượng từng tập trong báo cáo.

## Trình diễn luồng xem và triển khai bản tĩnh

Để trình diễn được thao tác xem ngay trên website, nhóm dùng phim mở **Tears of Steel** cho trình phát tích hợp. Người dùng có thể tua trên thanh tiến độ, đổi chất lượng, bật phụ đề tiếng Anh và xem tiếp từ vị trí đã lưu. Với phim có liên kết phát hành, trang xem dẫn sang nền tảng tương ứng. Sau khi có bản frontend, nhóm thiết lập GitHub Actions xuất bản thư mục `dist/` lên GitHub Pages (`98f3cf7`).

## Mở rộng lựa chọn trên trang chủ

Trang chủ ban đầu có ba hàng phim, nên người dùng chưa có nhiều điểm bắt đầu khi chưa chọn sẵn phim. Nhóm mở rộng lên sáu hàng bằng cách thêm **Phim chiếu rạp**, **Phim Việt Nam**, **Phim Hàn Quốc** và đổi hàng phát hành gần đây thành **Top 10 phim gần đây**. Bốn phim Hàn được bổ sung cùng đợt, nâng danh mục từ 19 lên 23 tựa (`1d5b4e0`).

Top 10 đánh số theo độ mới của phim và giữ thứ hạng khi bấm **Xem tất cả**. Hai hàng theo quốc gia mở danh mục đã lọc sẵn. Khi viết Chương 3, có thể đặt ảnh trang chủ hiện tại cạnh wireframe và minh họa tiếp bằng màn hình danh mục Top 10.

## Điều chỉnh thao tác cuộn hàng phim

Nhóm cho các hàng phim cuộn vòng theo hai hướng để người dùng tiếp tục duyệt khi tới cuối danh sách. Mỗi lần bấm mũi tên đi hai thẻ, tăng tốc khi bắt đầu và chậm dần trước khi dừng. Người dùng vẫn có thể vuốt trên màn hình cảm ứng (`e08c32a`). Thao tác qua điểm nối đã được kiểm tra trên hàng **Top 10 phim gần đây** và **Phim Hàn Quốc**. Nhịp hai thẻ vẫn cần đánh giá thêm trên màn hình hẹp.

## Mô phỏng trình phát cho toàn bộ danh mục

Mỗi phim và tập hiện có ảnh tĩnh và thanh tiến độ riêng. Trang xem xử lý phát, tạm dừng, tua, âm lượng mô phỏng, toàn màn hình, chuyển tập và lưu vị trí xem. Các nút xem ở nền tảng ngoài được thay bằng trang xem Rạp Nhà. Trailer tiếp tục mở riêng trong hộp thoại YouTube.

| Phim bộ | Phần và số tập | Nguồn đối chiếu |
| --- | --- | --- |
| Tết ở Làng Địa Ngục | Một phần, 12 tập | [K+](https://www.youtube.com/watch?v=Vmr1KahUXRk) |
| Tiệm Ăn Của Quỷ | Một phần, 6 tập | [Netflix](https://www.netflix.com/vn/title/81751769) |
| Khi Cuộc Đời Cho Bạn Quả Quýt | 16 tập, bốn đợt phát hành, bốn tập mỗi đợt | [Netflix Tudum](https://www.netflix.com/tudum/articles/when-life-gives-you-tangerines-release-date-news) |
| Gambit Hậu | Một phần, 7 tập | [Netflix](https://www.netflix.com/title/80234304?source=35) |

## Nâng ảnh trong trình phát lên Full HD

Mỗi phim lẻ và mỗi tập phim bộ có một ảnh WebP 1920 × 1080 dành riêng cho màn hình xem. Ảnh gốc khung điện ảnh được giữ tỷ lệ và đặt trong khung Full HD. Các thẻ danh sách tiếp tục dùng ảnh thu nhỏ để tải nhanh.

Xem các luồng trình diễn trong [README](README.md) và các điểm còn mở trong [giới hạn bản demo](DEMO_LIMITATIONS.md).
