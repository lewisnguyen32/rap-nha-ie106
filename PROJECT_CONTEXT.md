# Bối cảnh đồ án Rạp Nhà

Rạp Nhà là đồ án học phần **IE106 – Thiết kế giao diện người dùng**. Mục tiêu là giúp người dùng tìm một phim cụ thể hoặc khám phá phim nổi bật, đọc thông tin, rồi chọn xem phim hoặc tập. Bản web hiện thực hóa các luồng trong wireframe bằng frontend tĩnh. Tài khoản, OTP và dữ liệu cá nhân được mô phỏng trên trình duyệt. Phim và tập dùng trình phát ảnh tĩnh với các nút điều khiển mô phỏng. Trailer dùng YouTube.

## Khảo sát và quyết định thiết kế

Mục **1.1.1** của báo cáo là nguồn số liệu chuẩn. Khảo sát thu được **74 phản hồi** từ 26/09/2026 đến 18/10/2026. Nhóm 18–22 tuổi chiếm 75,7%, nên diễn giải kết quả trong phạm vi mẫu này. Câu 11 và 12 có 73 câu trả lời. Câu 6 cho phép chọn nhiều phương án.

| Kết quả trong mẫu | Cách áp dụng vào Rạp Nhà |
| --- | --- |
| 47,3% vào website để tìm phim cụ thể. 40,5% muốn xem phim nổi bật hoặc thịnh hành. | Đặt ô tìm kiếm ở đầu trang và cho phép duyệt phim ngay trên trang chủ. |
| 63,5% chọn nhóm điều hướng Trang chủ, Phim, Thể loại và Tìm kiếm. | Đặt Phim lẻ và Phim bộ trong mục Phim, giữ ô tìm kiếm dễ tiếp cận. |
| 49,3% chọn ô tìm kiếm luôn hiển thị trên thanh điều hướng, nhiều nhất ở Câu 11. 24,7% chọn tìm kiếm kết hợp bộ lọc. | Giữ ô tìm kiếm trên thanh đầu trang và đặt bộ lọc ở trang kết quả. Gợi ý tự động là đề xuất bổ sung của nhóm. |
| 75,7% chọn banner trên, danh sách phim dưới. 68,9% muốn cân bằng kích thước poster và số lượng phim. 71,6% chọn nền tối kết hợp đỏ. | Dùng banner phim nổi bật, các hàng thẻ cuộn ngang và nền tối có điểm nhấn đỏ. |
| 74,3% chọn tên phim và 67,6% chọn điểm đánh giá làm thông tin cần có trên thẻ. | Hiển thị tên rõ ràng và giữ điểm đánh giá khi có nguồn. |
| 79,7% muốn poster và tên phim nổi bật nhất ở trang chi tiết. 52,7% chọn nội dung hoặc tóm tắt là yếu tố quyết định xem. | Ưu tiên poster và tên trong bố cục, đặt tóm tắt ngay trong khối thông tin phim. |
| 72,6% muốn vào trang chi tiết rồi mới chọn Xem phim. | Mở chi tiết khi chọn một thẻ phim, sau đó cho chọn phát phim hoặc mở tập. |
| 60,8% xem phim 3–5 lần mỗi tuần hoặc gần như mỗi ngày. | Nhóm đề xuất lịch sử xem và danh sách theo dõi để hỗ trợ lần truy cập sau. |

## Đối chiếu giao diện tham khảo

- **Netflix** được 42/74 người chọn về cách trình bày giao diện trong bốn nền tảng khảo sát (56,8%). Báo cáo tham khảo cách dùng banner, hàng phim ngang, nền tối và luồng duyệt trước khi đăng nhập.
- **FPT Play** được tham khảo về banner và cách phân nhóm nội dung. Báo cáo ghi nhận sơ bộ về quảng cáo gần trình phát và giới hạn bộ lọc. Các nhận xét này cần được kiểm chứng trên màn hình tương ứng nếu dùng làm kết luận.

## Kết quả báo cáo và bản mẫu

- **Chương 1** tổng hợp khảo sát, phân tích yêu cầu, đánh giá ưu và nhược điểm của Netflix và FPT Play, rồi rút ra các bài học thiết kế.
- **Chương 2** mô tả 15 khung wireframe và hai thành phần dùng chung là đầu trang và chân trang. Các khung bao phủ luồng tìm, chọn và xem phim, xác thực mô phỏng, quản lý tài khoản, lịch sử, theo dõi và hỗ trợ. Sơ đồ, nhãn và trạng thái trong chương này mô tả bản phác thảo.
- **Chương 3** mới có tiêu đề trong bản BCTH2 đã đối chiếu. Khi soạn phần giao diện hoàn chỉnh, lấy ảnh và mô tả từ frontend thực tế. Ví dụ, wireframe trang chủ minh họa ba hàng phim, còn frontend bổ sung các hàng theo nhóm và bảng xếp hạng Top 10.
- Xem [memory.md](memory.md) để biết tính năng hiện có và các điểm còn mở. Xem [README.md](README.md) để chạy kịch bản trình diễn và tra nguồn tư liệu phim.

## Tài liệu gốc trong workspace IE106

- `Du-lieu-khao-sat-IE106.md` lưu 13 câu hỏi, mẫu số và cách tính tỷ lệ.
- `bao_cao/DoAn (BCTH2) .docx` là bản BCTH2 đã đối chiếu. `bao_cao/Chương 2 - Phác thảo giao diện Rạp Nhà.md` có mô tả từng màn hình.
- `Wireframe Rạp Nhà - IE106 - Bản hình khối.html` có các khung được dùng để diễn giải Chương 2. Các tài liệu gốc nằm ở thư mục IE106 cấp trên khi làm việc trong workspace đồ án.
