# Rạp Nhà · Audit giao diện desktop

**20/11/2026 · IE106 · Bản làm việc trên máy**

## 1. Bản thử và căn cứ

| Điều kiện | Ghi nhận |
|---|---|
| Phiên bản | Nhánh `main`, HEAD `e032a1a80e2b16fa3f01a21321e180cd245b3a7b`. Bản chạy có thay đổi cục bộ ở `dist/app.js`, `dist/catalog.js`, `dist/styles.css`, `README.md`, `CHANGELOG.md`, `DEMO_LIMITATIONS.md` và `memory.md`. Khi đối soát cuối, HEAD đã chuyển sang `33131378583bc51869dd1ca14761133cf0ca821d`, cây làm việc sạch. Commit mới chứa đúng bảy đường dẫn trên. SHA-256 của ba tệp giao diện khớp giữa lúc lập báo cáo và lần đối soát cuối. Có thể dùng `3313137` làm mốc tái hiện. Agent chỉ đọc trạng thái Git. |
| Trình duyệt | Google Chrome headless 157.0.8103.79 trên Windows, vùng nội dung **1366 × 768** và **1920 × 1080** CSS px, DPR 1. Chiều cao là hai giá trị agent chọn cho hai độ rộng được yêu cầu. Phông Be Vietnam Pro đã tải. |
| Cách chạy | Phục vụ thư mục `dist` qua `preview.mjs` của repo trên loopback. Các lượt đo dùng cổng cục bộ riêng. Thao tác và ảnh lấy từ Chrome đang hiển thị web. |
| Dữ liệu | Mỗi lượt mở ngữ cảnh trình duyệt mới. Dùng **Dùng tài khoản mẫu** (Minh Quân), hoặc đăng ký người thử bằng địa chỉ miền `.invalid`. Thao tác bỏ theo dõi và đặt lại mật khẩu chỉ tác động vào dữ liệu của phiên thử. |
| Phạm vi kết luận | Quan sát của một người đánh giá qua chuột và bàn phím. “Thu hút đầu tiên” là nhận xét từ bố cục và ảnh, chưa được đo bằng theo dõi mắt. Chỉ đánh giá hai desktop trên, không chấm animation, chuyển cảnh hoặc tốc độ cuộn. |

**Khảo sát** có 74 phản hồi, 56/74 người từ 18–22 tuổi. Câu 6 cho chọn nhiều phương án. Câu 11 và 12 có 73 người trả lời. Các số dưới đây là sở thích tự báo cáo, không phải số người gặp từng lỗi trong audit. Nguồn chuẩn là mục 1.1.1, trang 7–14 của báo cáo Chương I. Tệp nguồn trong hồ sơ IE106 là `Du-lieu-khao-sat-IE106.md`.

**Tài liệu thiết kế.** Đối chiếu 15 khung đánh số, đầu trang, chân trang và minh họa menu avatar của wireframe với mục lục Markdown hiện hành. Lịch sử chỉnh sửa được dùng để xác định mốc trước và sau. Kết luận về giao diện hiện tại dựa trên các lần mở bản web. Hai tệp đối chiếu trong hồ sơ IE106 là `Wireframe Rạp Nhà - IE106 - Bản hình khối.html` và `bao_cao/Mục lục Chương 3 - Rạp Nhà.md`. [Lịch sử chỉnh sửa](../../CHANGELOG.md) · [Giới hạn demo](../../DEMO_LIMITATIONS.md)

## 2. Kết quả đi thử và thứ bậc thị giác

Các luồng chính dưới đây đã chạy ở cả hai kích thước. Cột giữa ghi dấu hiệu giúp người dùng biết mình đang ở đâu, thao tác tiếp theo và phản hồi sau thao tác. Các mã F dẫn đến tám phát hiện ở mục 4.

| Luồng | Quan sát khi thực hiện | Điểm thu hút đầu tiên và đánh giá của agent |
|---|---|---|
| Trang chủ → khám phá | Ba slide đổi bằng chấm chọn. Trên cả ba, mép trên nút **Chi tiết** giữ ở y≈474 tại 1366 và y≈489 tại 1920. Tiêu đề **Top 10 phim gần đây** cũng giữ ở y≈610 và 625. Hai mũi tên của hàng đưa hạng đầu đang thấy từ 1 sang 3 và về 1. **Xem tất cả** mở danh mục đủ hạng 1–10. | Tên phim trắng lớn và nhân vật trên ảnh dẫn mắt về **Chi tiết** màu đỏ. **Xem trailer** có viền và biểu tượng riêng. Sáu hàng bên dưới dành cho lượt duyệt tiếp. Số hạng cạnh tên chừa nguyên diện tích poster. Nên giữ cả chú thích “Xếp theo thời điểm phát hành trong danh mục” để giải thích ý nghĩa Top 10. [Trang chủ 1366](anh/01-trang-chu.png) |
| Top 10 → ô xem nhanh → giới thiệu | Đứng chuột trên thẻ **Án Mạng Karaoke** mở ô cạnh poster. Chuyển chuột sang ô vẫn đọc được, rời ô thì đóng. Tab từ nút cuộn phải đến thẻ mở ô, Escape đóng, Enter mở đúng trang giới thiệu. Bấm chính thẻ bằng chuột cũng mở trang này. | Trước khi rê chuột, poster và tên là dấu hiệu dễ thấy nhất. Trên thẻ chưa có chỉ dẫn về ô xem nhanh. Trong ô, tên, điểm vàng, tóm tắt và thể loại có thứ tự rõ. Phần tóm tắt của phim này hiển thị 65 px trên tổng 108 px nội dung. Mất ô khi cuộn nhẹ làm việc đọc khó hơn (F8). [Thẻ và ô đang mở](anh/02-xem-nhanh.png) |
| Đầu trang → tìm → kết quả | Gõ `Furie` gợi ý **Hai Phượng** và **Thanh Sói**. ↓ rồi Enter mở **Hai Phượng**. Gõ `hai phuong` rồi Enter mở **Kết quả cho “hai phuong”**, có 1 phim. Gõ `zzzxxyy` thấy **Chưa tìm thấy phim phù hợp.**. Enter đến **Chưa tìm thấy phim**, có hướng dẫn đổi tên/giảm bộ lọc. **Khám phá tất cả phim** đưa về danh mục. | Ô tìm luôn ở đầu trang. Trong gợi ý, poster nhỏ và tên phân biệt các phim, nhưng dòng sắp được Enter mở rất khó nhận ra (F2, F5). Ở trang kết quả, tiêu đề chứa từ khóa và số kết quả giúp định vị. Sáu ô lọc đứng trước poster, nên việc đổi điều kiện phải bảo toàn kết quả và focus (F1, F3). |
| Chi tiết → chọn phần → chọn tập | Trang **Tết ở Làng Địa Ngục** có 12 thẻ tập. Với **Khi Cuộc Đời Cho Bạn Quả Quýt**, chọn **Phần 4** thấy **Tập 13** đến **Tập 16**. Bấm **Tập 13** mở đúng tập *Such an Uneven Love*, 62 phút. Danh sách trong trang xem ghi **Tập đang chọn 13/16**. | Poster và tên phim đứng trước tóm tắt. Nút **Xem tập 1** hoặc **Xem phim** có nền đỏ, **Trailer** và **Theo dõi** có nền tối. Danh sách tập nằm ngay sau thông tin phim bộ. Nhãn số tập trên ảnh chỉ 10 px, trong khi tên tập bên dưới đậm hơn. Nên giữ cả số và tên để người xem đối chiếu. |
| Trang xem phim → lịch sử → xem tiếp | Nút **Phát**, tạm dừng, phím → và nút **Tua tới 10 giây** hoạt động. Sau hai lượt tua thấy **00:20 / 1:02:00**. Mở **Lịch sử xem → Đang xem → Xem tiếp** trở lại đúng tập và đúng 00:20. **Cài đặt trình phát** mở vào **Phụ đề**, Escape quay về nút cài đặt. Trong một lượt thử khác, chọn tiếng Việt và 720p thấy phụ đề mẫu và nhãn 720p. | Ảnh phim và nút phát đỏ ở giữa thu hút trước. Chữ **Mô phỏng bằng ảnh tĩnh** giải thích được bản mẫu. Tại 1366 × 768, số tập và hàng nút điều khiển nằm dưới nếp gấp (F4). Trong lịch sử, tên, số tập, phần trăm và **Xem tiếp** giúp chọn đúng bản ghi. |
| Khách → theo dõi → đăng nhập | Bấm **Theo dõi** ở **Hai Phượng** mở **Đăng nhập**. Nhập sai hiện “Email hoặc mật khẩu chưa đúng. Bạn cũng có thể dùng tài khoản mẫu.” Chọn **Dùng tài khoản mẫu** trả về đúng phim, nút có dấu tích và thông báo **Đã thêm vào danh sách theo dõi.** Menu tài khoản → **Theo dõi** có phim vừa lưu. | Thẻ đăng nhập ở giữa và nút gửi đỏ xác định rõ tác vụ xác thực, nhưng mất tên phim trong bước chuyển (F7). Khi bỏ hết phim của phiên mẫu, **Danh sách theo dõi còn trống** giải thích phải chọn **Theo dõi** tại trang chi tiết, kèm **Khám phá phim** để tiếp tục. |
| Đăng ký, OTP, đặt lại mật khẩu | Thử mật khẩu nhập lại khác mật khẩu ban đầu (F6). Sửa đúng → OTP đăng ký. Mã sai có lỗi ngay trong biểu mẫu. `123456` tạo tài khoản thử và hiện lời chào. Luồng **Quên mật khẩu? → Dùng email mẫu → Lấy mã xác nhận** có hộp thoại **Mã xác nhận chưa đúng** với `000000`. Escape đóng và focus trở lại **Mã xác nhận**. Mã đúng cho đặt lại mật khẩu, hiện **Đặt lại mật khẩu thành công → Về đăng nhập**. Đã đăng nhập lại bằng mật khẩu vừa đặt của phiên riêng. | Trường và nút chính nổi bật trên nền ảnh đã phủ tối. Hộp thoại lỗi có biểu tượng thông tin, tiêu đề, lời giải thích và **Thử lại**. Thành công dùng dấu tích, tiêu đề rõ và hành động kế tiếp. Có thể phân biệt hai kết quả khi bỏ qua đỏ và xanh. |

**Các màn hình còn lại.** Ở **Trang cá nhân**, ảnh bìa và avatar dẫn vào danh tính. Ở **Cài đặt**, hai khối **Trình phát** và **Đổi mật khẩu** chia rõ việc cần làm. **Giới thiệu & liên hệ** nhấn vào ảnh và phần giới thiệu, liên hệ có nút email ghi là địa chỉ minh họa. **Câu hỏi thường gặp** nhấn vào tiêu đề và câu trả lời đang mở. Enter trên câu đầu thu phần trả lời. **Điều khoản** có tiêu đề và khối văn bản đọc theo một cột. **Đang tải** và **Không tìm thấy trang** tập trung thông báo ở giữa, có lần lượt **Quay lại đăng nhập** (tuyến minh họa) và **Về trang chủ**. Trong **Theo dõi**, poster nổi trước ngày thêm và bộ sắp xếp, phù hợp với việc mở lại phim.

**Bàn phím.** Từ đầu trang, Tab đi lần lượt qua **Đến nội dung chính**, logo, **Trang chủ**, **Phim lẻ**, **Phim bộ**, **Thể loại**, **Tìm kiếm phim**, nút ngôn ngữ và **Đăng nhập**. Menu thể loại nhận Enter, Tab tới **Bí ẩn**, Escape trả về **Thể loại**. Menu tài khoản trả focus về **Menu tài khoản**. Nút ngôn ngữ dùng radio có dấu chọn. Hộp thoại **Trailer** mở bằng Enter, Escape đóng và trả focus về **Trailer**. Viền focus 2 px trên thẻ phim và các nút này dễ nhận ra. Riêng dòng gợi ý dùng phím mũi tên và bộ lọc tải lại trang có vấn đề ở F2 và F3.

**Phản hồi khảo sát liên quan.** Câu 3 có 35/74 (47,3%) ưu tiên tìm phim cụ thể và 30/74 (40,5%) muốn khám phá phim nổi bật/thịnh hành. Câu 7 có 56/74 (75,7%) chọn banner trên, danh sách dưới. Câu 9 có 53/74 (71,6%) chọn đen/xám đậm kết hợp đỏ. Câu 10 có 59/74 (79,7%) muốn poster và tên phim nổi nhất ở trang chi tiết, còn Câu 5 có 39/74 (52,7%) chọn nội dung/tóm tắt làm yếu tố quyết định xem. Câu 12 có 53/73 (72,6%) muốn vào chi tiết trước khi chọn xem. Đây là căn cứ để giữ hệ màu và luồng qua trang chi tiết. Nguồn số liệu là `Du-lieu-khao-sat-IE106.md`.

**Chưa xác minh.** Đã thử mở, đóng và trả focus của hộp thoại trailer. Chưa xác minh phát video/âm thanh YouTube, giao nhận email hoặc OTP thật, trình đọc màn hình, độ dễ phát hiện với người dùng thực, toàn bộ 23 tựa hay khả năng đáp ứng toàn bộ WCAG. Trình phát ảnh tĩnh, phụ đề/720p mẫu, OTP hiện trên màn hình và lưu lịch sử trong trình duyệt đều thuộc phạm vi mô phỏng đã công bố. [Phạm vi demo](../../DEMO_LIMITATIONS.md)

## 3. Đo tương phản trên bản chạy

**Cách đo.** Với chữ trên ảnh, lấy hai ảnh PNG cùng vị trí sau khi phông và ảnh đã tải. Ảnh thứ hai tạm ẩn nét chữ hoặc biểu tượng trong phiên đo, giữ nguyên kích thước, gradient, lớp phủ và nền của nút. Trong vùng phần tử, lấy pixel nền ở các vị trí có nét hiển thị thay đổi ít nhất 6 mức trên một kênh RGB. Tính tương phản giữa màu nét do trình duyệt tính và nền tại các vị trí đó, rồi lấy giá trị thấp nhất trong mẫu. Cách này tránh lấy màu pha ở mép chữ làm màu chữ gốc. Với nền phẳng và viền trạng thái, dùng màu đã tính của các bề mặt liền kề. Tọa độ tính từ góc trên trái viewport, đơn vị CSS px. Bảng làm tròn hai chữ số, kết luận dựa trên giá trị trước khi làm tròn.

**Ngưỡng.** WCAG 2.2, 1.4.3 mức AA yêu cầu 4,5:1 cho chữ thường, 3:1 cho chữ lớn (khoảng 24 px thường hoặc 18,67 px đậm trở lên). Theo 1.4.11 mức AA, chi tiết thị giác cần thiết để nhận ra điều khiển hoặc trạng thái phải đạt 3:1 với màu liền kề khi tiêu chí áp dụng. 1.4.1 mức A yêu cầu thêm cách phân biệt khi màu là dấu hiệu duy nhất. Kết quả “đạt” dưới đây chỉ áp dụng cho mẫu ghi trong dòng. [W3C 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [W3C 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) · [W3C 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)

### Banner · Nền ngay sau nét chữ

Mỗi ô ghi **màu nền / tỷ lệ**. Tiêu đề có màu `#FFFFFF`, tóm tắt 14 px có màu `#DED8E2`. Cả sáu mẫu tiêu đề và sáu mẫu tóm tắt đều đạt 1.4.3.

| Slide | Tiêu đề 1366 | Tiêu đề 1920 | Tóm tắt 1366 | Tóm tắt 1920 |
|---|---|---|---|---|
| Tết ở Làng Địa Ngục | #2C272F / 14,60:1 | #353036 / 12,90:1 | #2A262B / 10,65:1 | #322C32 / 9,74:1 |
| Hai Phượng | #1A393E / 12,36:1 | #1D3B40 / 11,99:1 | #1D3333 / 9,55:1 | #1A3539 / 9,32:1 |
| Thám Tử Kiên: Kỳ Án Không Đầu | **#5D7076 / 5,19:1** | #5F6868 / 5,73:1 | **#2F3A3F / 8,36:1** | #222A32 / 10,40:1 |

Mẫu thấp nhất của chữ trên ảnh banner là tiêu đề **Thám Tử Kiên: Kỳ Án Không Đầu** ở 1366, tại **(589, 285)**. Tóm tắt thấp nhất cũng trên slide này, tại **(529, 409)**. Phần ảnh sáng bên phải làm tỷ lệ giảm so với hai phim còn lại. Lớp phủ hiện tại vẫn đủ cho cả hai kiểu chữ. [Ảnh gốc của slide ở 1366 × 768](anh/banner-tham-tu-kien-1366.png)

### Thành phần và trạng thái

Mỗi dòng là tỷ lệ thấp nhất trong các mẫu ghi ở dòng đó. “Nét” cũng có thể là nền đánh dấu hoặc viền của trạng thái đang xét.

| Màn hình, thành phần | Nét / dấu hiệu | Nền liền kề | Tỷ lệ | Đối chiếu |
|---|---|---|---:|---|
| Banner · PHIM NỔI BẬT, 10,5 px, Hai Phượng 1920 | #DED8E2 | #111D23 | 12,28:1 | Đạt 1.4.3 |
| Banner · Chi tiết, 13 px, cả ba phim | #17090D | #ED4B55 | 5,31:1 | Đạt 1.4.3 |
| Banner · Xem trailer, 13 px, Thám Tử Kiên 1920 | #F7F5F8 | #17181D | 16,35:1 | Đạt 1.4.3 |
| Top 10 · tên / năm và loại phim dưới poster | #F7F4F8 / #A19AA9 | #100F13 | 17,50 / 7,01:1 | Đạt 1.4.3, 15 / 13 px |
| Top 10 · số hạng 1, Án Mạng Karaoke | #B0ABB8 | #100F13 | 8,51:1 | Đạt 1.4.3 |
| Danh mục Top 10 · điểm trên poster Án Mạng Karaoke, 1920 | #FACC6B | #2A2628 | 9,89:1 | Đạt 1.4.3, 10 px |
| Ô xem nhanh · tên và tóm tắt / năm, thời lượng | #F7F5F8 / #B0ABB8 | #1E1C24 | 15,54 / 7,51:1 | Đạt 1.4.3 |
| Chi tiết Tết ở Làng Địa Ngục · tên / tóm tắt, 1366 | #F7F5F8 / #E3DCE8 | #2E292C / #2C272B | 13,18 / 10,94:1 | Đạt 1.4.3 |
| Danh sách tập · số tập trên ảnh, lấy thấp nhất của tập 1, 2, 3 của Tết ở Làng Địa Ngục | #F7F5F8 | #1A1720 | 16,32:1 | Đạt 1.4.3, thấp nhất ở Tập 1, 1366 |
| Đăng nhập · nhãn Email / lỗi sai thông tin, 1366 | #F7F5F8 / #FFA3A9 | #1B1720 | 16,28 / 9,30:1 | Đạt 1.4.3, 12 px |
| Đặt lại mật khẩu · dấu tích thành công / lời xác nhận bên dưới | #9AE6B8 / #B0ABB8 | #233B30 / #1C1722 | 8,27 / 7,84:1 | Đạt 1.4.11 cho dấu tích, 1.4.3 cho chữ |
| Trình phát · đồng hồ 11 px trên Quả Quýt Tập 13 / Tết ở Làng Địa Ngục Tập 2 | #F2E8F4 | #15131C / #0E121B | 15,44 / 15,72:1 | Đạt 1.4.3, thấp nhất ở Tập 13 |
| Trình phát · biểu tượng Tua lùi 10 giây / Cài đặt trình phát, cùng hai ảnh và hai độ rộng | #F1EDF2 | #131018 / #0E1018 | 16,27 / 16,40:1 | Đạt 1.4.11. Thấp nhất lần lượt ở Quả Quýt Tập 13 (1920) và Tết Tập 2 (1366) |
| Tìm kiếm · viền ô đang có focus so với nền trong ô | #B25263 | #1B1920 | 3,55:1 | Đạt 1.4.11 cho dấu focus ở cạnh trong |
| Tìm kiếm · nền dòng gợi ý đang chọn so với vùng danh sách | #352B39 | #1D1A23 | **1,27:1** | **Chưa đạt 1.4.11** cho dấu chọn bằng bàn phím |
| Lịch sử xem · viền bộ lọc đang chọn so với nền ngoài / nền trong | #704655 | #100F13 / #402A36 | **2,45 / 1,68:1** | **Chưa đạt 1.4.11** cho dấu chọn. Chữ #FFD5DC trên #402A36 đạt 9,86:1 |

**Khi bỏ qua màu.** **Trang chủ** đang chọn có gạch chân, chấm banner đang chọn dài hơn các chấm còn lại, nút phim đã theo dõi có dấu tích, danh sách tập ghi **Tập đang chọn 13/16**. Lỗi có câu giải thích. Xác nhận thành công có chữ và dấu tích. Trong gợi ý và bộ lọc lịch sử, dòng/nút đang chọn vẫn giữ hình dạng, chữ và biểu tượng như trước. Với lịch sử, độ tương phản giữa hai màu chữ chọn và chưa chọn chỉ 1,69:1, giữa hai nền là 1,36:1. Tại hai vị trí này, màu là dấu hiệu thị giác duy nhất (1.4.1, F2). Không dùng các tỷ lệ giữa hai trạng thái để thay cho phép đo màu liền kề ở 1.4.11.

**Đạt tỷ lệ nhưng vẫn khó đọc nhanh.** Nhãn nổi bật 10,5 px, điểm trên poster và số tập 10 px, đồng hồ 11 px, lỗi biểu mẫu 12 px. Agent phải tìm số tập nhỏ trên ảnh trong khi tên tập bên dưới đậm hơn. Với điểm và số tập, thử cỡ 12–13 px, ưu tiên số tập khi chụp Chương 3. Với đồng hồ, thử 13 px và kiểm tra còn chỗ cho thời lượng hơn một giờ. Mật độ cần được kiểm tra ở cả hai desktop. Câu 6 có 50/74 người chọn điểm đánh giá, 55/74 chọn tên phim, được chọn nhiều phương án. Khảo sát không hỏi cỡ chữ. Tham chiếu Câu 6 và Câu 8 trong `Du-lieu-khao-sat-IE106.md`.


## 4. Tám phát hiện ưu tiên

Mức **cao** dùng khi kết quả đúng bị mất hoặc dấu hiệu để chọn hành động khó phân biệt ngay trên luồng chính. Mức **trung bình** dùng khi vẫn hoàn tất được sau khi cuộn, dò lại vị trí hoặc nhập lại. Thứ tự ưu tiên là đề xuất của agent, chưa có số liệu tần suất lỗi từ người dùng.

### F1 · Cao · “Sắp xếp” làm biến mất phim đang tìm

- **Tái hiện.** Gõ `hai phuong` → Enter → thấy 1 kết quả → **Sắp xếp → Điểm từ nhà phát hành**.
- **Quan sát và tác động.** Vẫn cùng từ khóa nhưng còn 0 kết quả. Thông báo khuyên đổi tên hoặc giảm bộ lọc trong khi tên đã đúng. Ở toàn danh mục, thao tác tương tự làm 23 tựa còn 9. Chọn **Rạp Nhà tuyển chọn** trong cùng ô còn 8. Người dùng có thể kết luận website không có phim. [1 kết quả](anh/08a-tim-thay.png) · [0 kết quả](anh/08b-sap-xep.png)
- **Đề xuất và thử lại.** Khi sắp theo điểm, giữ các tựa chưa có điểm ở cuối. Đưa **Rạp Nhà tuyển chọn** thành điều kiện lọc có thể gỡ hoặc chỉ giữ ở danh mục riêng. Tìm lại phim trên, đổi qua lại giữa các thứ tự, so sánh danh sách tựa trước/sau và thử một bộ lọc thực sự không khớp.
- **Khảo sát liên quan.** Câu 3 có 35/74 người chọn tìm một phim cụ thể. Câu 11 có 18/73 (24,7%) chọn tìm kiếm kết hợp bộ lọc thể loại hoặc năm. Hai số này giải thích vì sao ưu tiên luồng tìm, không đo mức phổ biến của lỗi. Nguồn số liệu là `Du-lieu-khao-sat-IE106.md`.

### F2 · Cao · Dòng gợi ý và bộ lọc lịch sử đang chọn chỉ đổi màu

- **Tái hiện.** Nhập `Furie`, nhấn ↓ và nhìn dòng sắp được Enter mở. Ở **Lịch sử xem**, bấm **Đang xem**, đưa chuột ra ngoài rồi so với **Tất cả**.
- **Quan sát và tác động.** Gợi ý chỉ thay nền (1,27:1). Bộ lọc lịch sử chỉ đổi màu chữ, nền và viền. Viền so với nền ngoài là 2,45:1. Người dùng khó phân biệt Enter sẽ mở **Hai Phượng**, **Thanh Sói** hay **Xem tất cả kết quả**. Ở lịch sử, họ có thể tưởng danh sách đang hiển thị mọi phim. [Gợi ý khi nhấn ↓](anh/03-goi-y.png) · [Bộ lọc Đang xem](anh/06-lich-su.png)
- **Đề xuất và thử lại.** Thêm vạch cạnh dòng gợi ý, thêm dấu tích cạnh nhãn bộ lọc đang chọn. Màu `#FF8B93` của viền focus hiện có cho tỷ lệ dự kiến **6,02:1** trên `#352B39` và **5,85:1** trên `#402A36`. Dùng ↓/↑ đi qua mọi gợi ý và đổi lần lượt ba bộ lọc lịch sử. Kiểm tra cả ảnh thang xám, dấu chọn và vòng focus phải phân biệt được khi cùng xuất hiện.

### F3 · Trung bình · Đổi thứ tự bằng phím có thể đưa focus về đầu nội dung

- **Tái hiện.** Tìm `hai phuong`, Tab đến **Sắp xếp**. Dùng ↓/↑ đổi giữa **Độ liên quan** và **Mới phát hành**, chờ cập nhật rồi nhấn Tab. Lặp lại ba lần mỗi kích thước.
- **Quan sát và tác động.** Trong 2/3 lần ở 1366 và 3/3 lần ở 1920, focus chuyển về vùng nội dung chính, không còn viền tại ô chọn. Tab tiếp theo đến liên kết **Trang chủ** trong đường dẫn phân cấp. Lần còn lại tại 1366 giữ được focus và Tab đến thẻ phim. Người dùng bị đưa qua lại dãy bộ lọc dù chỉ muốn chọn kết quả tiếp theo.
- **Đề xuất và thử lại.** Sau khi danh sách và biểu mẫu cập nhật xong, khôi phục focus về đúng ô vừa đổi một lần. Lặp chuỗi trên, kiểm tra tên phần tử giữ focus và đích của Tab/Shift+Tab sau mỗi lần đổi. Thử thêm khi kết quả trống.

### F4 · Trung bình · Trang xem phim ở 1366 × 768 che phần xác nhận tập và hàng nút dưới nếp gấp

- **Tái hiện.** Mở **Khi Cuộc Đời Cho Bạn Quả Quýt → Phần 4 → Tập 13**, xem màn hình vừa mở trước khi cuộn.
- **Quan sát và tác động.** Ở 1366, thấy ảnh, nút phát giữa và tên phim ở đường dẫn. Hàng nút dưới bắt đầu ở **y=774**, nhãn **Tập 13** ở **y=839**, đều thấp hơn đáy 768. Phải cuộn để kiểm tra vừa mở đúng tập hoặc để tua bằng nút. Ở 1920 × 1080 các vị trí tương ứng là y=765 và 830, đều nhìn thấy. [1366 × 768](anh/05-arrivee-tap-13.png) · [1920 × 1080](anh/05b-tap-13-1920.png)
- **Đề xuất và thử lại.** Hiện số tập và tên tập ngay trước hoặc trong khung hình, giới hạn chiều cao khung theo chiều cao viewport để hàng nút còn trong màn hình. Vào trực tiếp Tập 13 và mở lại từ **Xem tiếp** ở mốc 00:20. Trước khi cuộn phải đọc được số tập và dùng được nút phát/tạm dừng, tua, cài đặt, không che nội dung ở tâm ảnh.

### F5 · Trung bình · Escape đóng gợi ý đồng thời xóa từ khóa

- **Tái hiện.** Gõ `tet` vào ô đầu trang, nhấn ↓ để chọn gợi ý rồi Escape.
- **Quan sát và tác động.** Ở cả hai độ rộng, danh sách đóng, focus vẫn ở **Tìm kiếm phim** nhưng giá trị ô trở thành chuỗi rỗng. Muốn chỉnh một chữ hoặc chuyển sang kết quả đầy đủ thì phải nhập lại. Ô này vốn đã có hành động riêng **Xóa từ khóa**.
- **Đề xuất và thử lại.** Khi gợi ý đang mở, dùng Escape để đóng danh sách và giữ nguyên chuỗi. Kiểm tra chuỗi `tet` còn nguyên, gõ tiếp được và Enter tìm theo chuỗi hiện tại. Sau đó dùng **Xóa từ khóa** và xác nhận ô rỗng.

### F6 · Trung bình · Đăng ký báo đúng lỗi nhưng Tab đưa người dùng ra khỏi biểu mẫu

- **Tái hiện.** Điền đủ **Đăng ký**, dùng hai mật khẩu hợp lệ về độ dài nhưng khác nhau. Tab đến **Tiếp tục**, Enter, sau đó nhấn Tab.
- **Quan sát và tác động.** Có dòng **Mật khẩu nhập lại chưa khớp.**, focus vẫn ở **Tiếp tục**. Tab kế tiếp đến liên kết **Đăng nhập**. Trường **Nhập lại mật khẩu** chưa được đánh dấu `aria-invalid` trong lần thử. Người dùng bàn phím phải đi lùi mới sửa được. Trong luồng OTP đăng ký, cùng kiểu nhập sai đã đưa focus về ô cần sửa. [Ảnh sau lần Tab tiếp theo](anh/07-dang-ky-loi.png)
- **Đề xuất và thử lại.** Gắn câu lỗi với trường xác nhận, đánh dấu trạng thái sai và đưa focus về trường đó. Gửi lại bộ dữ liệu trên, xác nhận có viền focus, đọc được lý do, sửa ngay được rồi tiếp tục tới **Xác nhận OTP**.

### F7 · Trung bình · Khách bấm “Theo dõi” mất ngữ cảnh phim khi vào “Đăng nhập”

- **Tái hiện.** Từ phiên khách, mở **Hai Phượng → Theo dõi**. Đọc tiêu đề và lời dẫn trước khi chọn **Dùng tài khoản mẫu**.
- **Quan sát và tác động.** Trang chỉ ghi **Đăng nhập** và “Tiếp tục hành trình xem phim của bạn.” Không có tên **Hai Phượng** hoặc giải thích bước đăng nhập sẽ lưu phim. Sau khi đăng nhập, hệ thống thực sự trở về phim, đổi dấu trang thành dấu tích, hiện thông báo và lưu phim vào **Theo dõi**. Người dùng phải quyết định đăng nhập trước khi biết yêu cầu ban đầu có được giữ hay không. [Màn hình sau khi bấm Theo dõi](anh/04-theo-doi-khach.png)
- **Đề xuất và thử lại.** Với lượt đến từ **Theo dõi**, dùng lời dẫn cụ thể, chẳng hạn “Đăng nhập để thêm Hai Phượng vào danh sách theo dõi.” Thử luồng khách và luồng bấm **Đăng nhập** trực tiếp. Chỉ luồng có phim chờ lưu mới hiện tên phim. Khi hoàn tất, đối chiếu phim và trạng thái dấu tích.

### F8 · Trung bình · Cuộn nhẹ làm mất ô xem nhanh dù con trỏ vẫn trên cùng thẻ

- **Tái hiện.** Đưa thẻ **Án Mạng Karaoke** ra giữa viewport, rê vào giữa thẻ và chờ ô xem nhanh mở. Cuộn xuống 45 px, giữ chuột trên cùng poster. Sau đó di chuột vài pixel ngay trong thẻ.
- **Quan sát và tác động.** Ô đóng ở cả hai kích thước. Con trỏ vẫn nằm trên thẻ và dịch nhẹ trong thẻ không mở lại. Phải rời hẳn rồi rê lại. Nếu chuyển chuột thẳng vào ô trước khi cuộn thì đọc được. Người dùng đang căn poster cho dễ đọc dễ vô tình làm mất tóm tắt.
- **Đề xuất và thử lại.** Khi cuộn, tính lại vị trí ô nếu con trỏ vẫn trong thẻ hoặc ô. Đóng khi rời cả hai, thẻ khuất hoặc người dùng nhấn Escape. Thử chuột, Tab → Escape → Enter, cả thẻ gần hai mép. Trước khi thay đổi cách gợi ý chức năng, cho người mới thử tìm nội dung phim từ thẻ và ghi họ có tự phát hiện ô hay không. [Ô mở cạnh poster](anh/02-xem-nhanh.png)

## 5. Đối chiếu mục lục Chương 3 và danh sách hình nên chụp

Giữ số mục hiện tại làm mốc biên tập. Các thay đổi dưới đây là đề xuất cho mục lục. Báo cáo gốc chưa được chỉnh. Khi chụp toàn trang ở 1920, nên kèm ảnh cắt đúng vùng tương tác để nhãn 10–13 px còn đọc được.

| Mục hiện tại | Điều chỉnh biên tập đề xuất | Màn hình và trạng thái nên chụp |
|---|---|---|
| **3.1.1–3.1.4** · Logo, bảng màu, kiểu chữ, bộ biểu tượng | Giữ các mục. Trong bảng màu, ghi chức năng của đỏ hành động, hồng cho chữ nhấn/focus, vàng điểm và xanh xác nhận. Đặt mẫu màu trên nền thật, kèm một cặp đo. | Logo ngang trên header/footer, biểu tượng ở **Đang tải**, chữ Be Vietnam Pro trên banner và thẻ. Chụp **Chi tiết**, **Xem trailer**, focus trên poster và dấu tích của hộp thoại thành công. |
| **3.2.1.1–3.2.1.4** · Trang chủ | Giữ bố cục và banner. Đổi **Các hàng phim** thành **Sáu hàng phim và thứ hạng Top 10**. Giữ **Nút cuộn và liên kết Xem tất cả** để minh họa điểm đến. | Wireframe 01 có **Phim mới cập nhật**, **Đang thịnh hành**, **Top đánh giá cao**. Web có **Top 10 phim gần đây**, **Phim chiếu rạp**, **Phim Việt Nam**, **Phim Hàn Quốc**, **Rạp Nhà tuyển chọn**, **Điểm cao từ nhà phát hành**. Chụp toàn cảnh, tên dài Thám Tử Kiên, hạng 1 cạnh tên và trang 10 hạng sau **Xem tất cả**. |
| **3.2.2** · Trang giới thiệu và liên hệ | Dùng tiêu đề hiển thị **Giới thiệu & liên hệ**. Phân biệt trang giới thiệu website với trang giới thiệu từng phim ở 3.2.6. | Hai khối **Về Rạp Nhà** và **Liên hệ**, giữ dòng **Địa chỉ minh họa**. |
| **3.2.3–3.2.5** · Tìm kiếm, kết quả, danh mục | Giữ gợi ý như một trạng thái của đầu trang (wireframe 02). Trình bày khối lọc dùng chung một lần ở 3.2.4. Mục danh mục 3.2.5 tập trung vào điểm vào **Phim lẻ**, **Phim bộ**, Top 10 và tiêu chí xếp. | Gợi ý `Furie` bằng ↓, **Kết quả cho “hai phuong”**, **Chưa tìm thấy phim**, **Phim bộ** với 4 tựa, **Top 10 phim gần đây**. Cặp hình F1 là bằng chứng cho đề xuất sửa, không dùng làm hình kết quả hoàn thiện. |
| **3.2.6** · Trang giới thiệu phim | Tách trong cùng mục hai trường hợp **Phim lẻ** và **Phim bộ, chọn phần và tập**. Ghi nút **Trailer** nằm cạnh nút xem. | **Hai Phượng** có **Xem phim**, lần lượt **Theo dõi** trước/sau khi lưu. **Khi Cuộc Đời Cho Bạn Quả Quýt**, **Phần 4** và bốn thẻ **Tập 13–16**. |
| **3.2.7** · Trang xem phim | Đổi thành **Trang xem phim và trình phát mô phỏng**. Gộp cài đặt trình phát vào đây, phân biệt với trang **Cài đặt** của tài khoản. | **Mô phỏng bằng ảnh tĩnh**, **Tập 13**, đồng hồ trước/sau tua, **Cài đặt trình phát** mở với **Phụ đề**, **Chất lượng mẫu**, **Thuyết minh mẫu**. Chụp danh sách có **Tập đang chọn 13/16**. |
| **3.2.8–3.2.11** · Đăng nhập, quên mật khẩu, đăng ký, OTP | Giữ các mục theo tác vụ. Ở 3.2.11 đối chiếu OTP đăng ký và OTP quên mật khẩu. Lỗi biểu mẫu/hộp thoại diễn giải dùng chung ở 3.2.21.6–7. | **Đăng nhập** và **Dùng tài khoản mẫu**, sai thông tin, **Đăng ký** sai mật khẩu nhập lại, **Quên mật khẩu → Dùng email mẫu**, **Xác nhận OTP** có **Mã OTP dùng thử**, **Đặt lại mật khẩu**. Với kết quả, dùng ảnh lỗi trong biểu mẫu đăng ký và hộp thoại riêng của luồng khôi phục. |
| **3.2.12** · Menu avatar | Đổi thành **Menu tài khoản**, có thể gộp hình vào **3.2.21.1 Đầu trang** và dẫn chiếu ở đầu phần tài khoản. Wireframe 09 cũng vẽ menu nổi trên trang chủ. | Hai trạng thái đầu trang trước và sau đăng nhập. Mở avatar **MQ** để thấy Minh Quân và bốn điểm đến. Mở quả địa cầu riêng để thấy **Ngôn ngữ / Language** và hai radio. |
| **3.2.13–3.2.14** · Trang cá nhân, cài đặt | Giữ **Trang cá nhân** và **Cài đặt**, bổ sung **Tự động phát tập tiếp theo** và **Đổi mật khẩu**. | Hồ sơ Minh Quân. **Cài đặt** của tài khoản mẫu chưa có mật khẩu lần đầu và khối **Đổi mật khẩu** khi đã đặt mật khẩu. |
| **3.2.15–3.2.16** · Lịch sử xem, đang theo dõi | Giữ **Lịch sử xem**. Đổi **Trang đang theo dõi** thành **Trang Theo dõi** theo đúng tiêu đề và menu web. Dẫn tới mục trạng thái trống thay vì lặp ảnh. | **Đang xem**, dòng có **Tập 13**, tiến độ và **Xem tiếp**. **Theo dõi** có phim lưu, bộ sắp xếp và cùng trang ở trạng thái trống. |
| **3.2.17–3.2.20** · FAQ, điều khoản, không tìm thấy, đang tải | Giữ **Câu hỏi thường gặp**, **Điều khoản**. Dùng đúng nhãn **Không tìm thấy trang** và **Đang tải**. Làm rõ trang minh họa tải riêng và trạng thái đang xử lý trong luồng tài khoản. | Một câu hỏi đang mở. Phần giới thiệu bản trình diễn trong **Điều khoản**. Tuyến sai và **Về trang chủ**. Tuyến `#/dang-tai` có **Quay lại đăng nhập**, hoặc trạng thái xử lý thực tế nếu chụp được. |
| **3.2.21.1–3.2.21.7** · Thành phần dùng chung | Giữ đầu/chân trang. Đặt **Thẻ phim** và **Ô xem nhanh phim** cạnh nhau trong cùng một hình hai trạng thái. Để **Trạng thái danh sách trống**, **Thông báo và lỗi biểu mẫu**, **Hộp thoại thành công và thất bại** làm mục minh họa dùng chung. | Header thực có **Phim lẻ** và **Phim bộ** trực tiếp, khác menu **Phim** của wireframe. Chụp footer. Cùng một thẻ nghỉ/đang focus/ô xem nhanh. Tìm kiếm trống và theo dõi trống. Thông báo thêm phim. Lỗi có câu hướng dẫn. Dấu tích thành công và biểu tượng thông tin thất bại trong hộp thoại. |

**Câu có thể dùng cho thay đổi đã kiểm chứng**

> Nhóm đã điều chỉnh trang chủ từ ba hàng trong wireframe thành sáu hàng phim. Ở hàng Top 10 phim gần đây, số hạng nằm cạnh tên phim. Liên kết Xem tất cả mở danh mục đủ mười hạng.

> Nhóm đã điều chỉnh bố cục banner để nút Chi tiết và tiêu đề Top 10 phim gần đây giữ cùng vị trí khi đổi giữa ba phim ở từng kích thước desktop đã thử.

**Câu dành cho đề xuất mới**

> Nhóm nhận thấy khi người dùng tìm “hai phuong”, lựa chọn Điểm từ nhà phát hành trong ô Sắp xếp làm kết quả giảm từ một phim xuống còn không phim, và đề xuất giữ các tựa chưa có điểm ở cuối danh sách.

> Nhóm nhận thấy trạng thái đang chọn trong gợi ý tìm kiếm và bộ lọc Lịch sử xem khó phân biệt bằng mắt, và đề xuất thêm vạch cạnh dòng gợi ý cùng dấu tích cho bộ lọc đang áp dụng.

[Quyết định thiết kế và bối cảnh](../../PROJECT_CONTEXT.md) · [Bàn giao frontend](../../memory.md) · [Kịch bản demo](../../README.md)

Mô tả wireframe Chương 2 nằm trong `bao_cao/Chương 2 - Phác thảo giao diện Rạp Nhà.md` của hồ sơ IE106.
