# Rạp Nhà · IE106

Rạp Nhà là frontend đồ án Thiết kế giao diện người dùng, dựa trên wireframe gồm 15 màn hình. Website dùng HTML, CSS và JavaScript thuần và có 23 phim và series có thật.

Lịch sử chỉnh sửa

1. Xây dựng giao diện thô từ wireframe, bổ sung tương tác tìm kiếm, lọc phim và lưu lịch sử xem trên trình duyệt. (Phước)
2. Thay ảnh bằng poster và ảnh phim thật, đồng thời cập nhật thông tin phim, danh sách tập và liên kết xem. (Phước)
3. Bổ sung trình phát mẫu và cấu hình triển khai tĩnh trên GitHub Pages. (Phước)
4. Mở rộng trang chủ với các hàng Phim chiếu rạp, Phim Việt Nam, Phim Hàn Quốc và bảng xếp hạng Top 10 phim gần đây. (Trước đó chỉ có 3 hàng, khiến cho trang chủ tương đối ngắn và ít sự lựa chọn cho User) (Phước)
5. Cho các hàng phim cuộn vòng hai chiều. Mỗi lần bấm mũi tên trượt hai ô với chuyển động mượt hơn. (Trải nghiệm mượt mà hơn cho User, một lần chuyển 2 phim 'có vẻ' phù hợp (CHECK LẠI)) (**Chương 4**) (Phước)
6. Bổ sung trình phát mô phỏng cho toàn bộ phim và tập, hỗ trợ phát, tạm dừng, tua và lưu tiến độ xem trên trình duyệt. Trailer mở riêng qua YouTube. (Phước)
7. Bổ sung 60 ảnh Full HD cho trình phát, gồm 19 ảnh phim lẻ và 41 ảnh tập phim bộ. (Phước)
8. Ổn định bố cục banner trang chủ khi chuyển phim để các nút và mục Top 10 phim gần đây giữ nguyên vị trí. Tiêu đề dài tự giảm cỡ chữ khi cần. Đổi ảnh nền Thám Tử Kiên sang bản không chữ và căn lại để khuôn mặt nhân vật hiển thị rõ trên desktop và mobile. (Phước)
9. Thêm luồng quên mật khẩu, màn hình đang tải và hộp thoại kết quả.
10. Tinh gọn banner và tiêu đề hàng phim, chuyển số hạng Top 10 xuống cạnh tên phim và đưa danh sách tập lên ngay sau thông tin phim bộ.
11. Cập nhật logo Rạp Nhà với biểu tượng mái nhà nối với nút phát. Đầu trang và chân trang dùng logo đầy đủ, còn favicon và màn hình chờ dùng biểu tượng riêng.
12. Thêm ô xem nhanh trên desktop. Rê chuột hoặc dùng Tab đến thẻ phim để xem tóm tắt, thể loại, năm phát hành, thời lượng hoặc số tập và điểm đánh giá nếu có.
13. Thêm hai nút tua lùi và tới 10 giây. Có thể dùng nút hoặc phím **← / →** khi đang phát và khi tạm dừng. Menu cài đặt có phụ đề, chất lượng và thuyết minh mẫu.
14. Dùng một biểu tượng quả địa cầu cạnh nút tài khoản để đổi ngôn ngữ, sửa biểu tượng Cài đặt và thêm mục đổi mật khẩu sau khi đăng nhập. Đổi tên tài khoản mẫu thành **Minh Quân**.

Xem lý do, kết quả và gợi ý minh họa cho từng mốc trong [lịch sử chỉnh sửa chi tiết](CHANGELOG.md).
## Giới hạn bản demo
### Lớn:

- ~~Với phim bộ, danh sách tập hiển thị tên, ảnh và thời lượng. Rạp Nhà chưa phát video từng tập do hạn chế về nguồn phát.~~ (Đã thêm tập cho mỗi phim bộ dài tập, có thể chọn phần phim hiện tại, mỗi tập chỉ hiển thị ảnh tĩnh của tập đó tượng trưng - Phước)
- ~~Banner lớn ở trang chủ hiện tại khác spacing ở mỗi phim => Khi đổi phim có thể làm lệch khu vực đó.~~ (Đã xử lý: Tiêu đề vượt hai dòng sẽ tự giảm cỡ chữ tối đa 20%. Nếu vẫn dài, tiêu đề được xuống thêm dòng để hiện đầy đủ tên phim. Mô tả trên banner hiển thị tối đa ba dòng - Phước)

(**chương 4**) - Thiếu animation mang tính trực quan.

### Bé:

(**chương 4**) - Câu hỏi thường gặp: Chưa có hiệu ứng khi chuyển giữa các câu hỏi.
(**chương 4**) - Trang chủ: Banner chưa tự động chuyển phim để quảng bá.

Xem [giới hạn chi tiết và các điểm cần cải tiến](DEMO_LIMITATIONS.md).

## Chạy trên máy

Chạy `npm run dev` trong thư mục này và mở [http://127.0.0.1:4173/](http://127.0.0.1:4173/). Cần Node.js. Lệnh `npm run check` kiểm tra cú pháp JavaScript.

## Trình diễn

Trên trang chủ, **Top 10 phim gần đây** xếp theo ngày phát hành tại thị trường gốc khi có dữ liệu và dùng năm phát hành khi thiếu ngày. Nút **Xem tất cả** mở đủ 10 tựa với cùng thứ hạng. **Phim chiếu rạp** giới thiệu phim đã phát hành tại rạp. Hai hàng **Phim Việt Nam** và **Phim Hàn Quốc** dẫn tới danh mục lọc theo quốc gia.

1. Nhập `hai phuong` hoặc `Furie` để tìm **Hai Phượng** theo tên tiếng Việt không dấu hoặc tên quốc tế. Thử lọc theo loại phim, thể loại, năm và quốc gia. Các điểm hiển thị lấy từ trang của nhà phát hành, khi có.
2. Mở **Tết ở Làng Địa Ngục** và chọn một trong 12 tập. Bấm nút tua trên thanh điều khiển hoặc dùng phím **← / →** để tua lùi hoặc tới 10 giây. Mở **Cài đặt trình phát** để thử phụ đề, chất lượng và thuyết minh.
3. Mở **Khi Cuộc Đời Cho Bạn Quả Quýt**, chọn Phần 4 rồi thử mở Tập 13. Nút **Trailer** mở video YouTube.
4. Chọn **Đăng nhập → Dùng tài khoản mẫu** để xem theo dõi và lịch sử của **Minh Quân**. Có thể đăng ký bằng dữ liệu thử và mã OTP `123456`.
5. Chọn **Đăng nhập → Quên mật khẩu? → Dùng email mẫu → Lấy mã xác nhận**. Dùng OTP `000000` để mở hộp thoại thất bại, rồi nhập `123456` và đặt mật khẩu mới để mở hộp thoại thành công. Mở đường dẫn `#/dang-tai` trên website để xem riêng màn hình Đang tải.
6. Bấm biểu tượng quả địa cầu cạnh nút tài khoản để chuyển giữa **Tiếng Việt** và **English**. Sau khi đăng nhập, vào **Cài đặt → Đổi mật khẩu**. Tài khoản mẫu `minhquan@example.com` có thể tạo mật khẩu lần đầu tại đây.

## Nguồn phim và hình ảnh

- Poster, ảnh nền và trailer lấy từ [3388 Films](https://www.3388films.com/films/), [Well Go USA](https://wellgousa.com/films/furie), [CGV](https://www.cgv.vn/en/nha-ba-nu.html), [Film Movement](https://filmmovement.com/press/film/578-magnum) và [Netflix](https://www.netflix.com/vn-vi/browse/genre/107571). Một số ảnh nền lấy từ hình đại diện của trailer chính thức.
- Tư liệu của bốn phim Hàn bổ sung lấy từ Well Go USA. [Exhuma](https://wellgousa.com/films/exhuma) · [Escape](https://wellgousa.com/films/escape-movie-2024) · [Hi-Five](https://wellgousa.com/films/hi-five) · [The King’s Warden](https://wellgousa.com/films/kings-warden)
- Poster và ảnh tập phim bộ được đối chiếu từ Netflix, K+, TheTVDB và TVmaze. [TheTVDB](https://thetvdb.com/series/tet-o-lang-dia-nguc) · [TVmaze](https://www.tvmaze.com/shows/74399/when-life-gives-you-tangerines/episodes) · [K+](https://www.youtube.com/watch?v=CI4fKeVdthQ) · [Trailer Tiệm Ăn Của Quỷ](https://www.youtube.com/watch?v=-QGmAZY0s7E)
- Ảnh Full HD trong trình phát lấy từ kho ảnh phim và ảnh tập gốc. Tập 6 **Tết ở Làng Địa Ngục** dùng ảnh quảng bá hình nhân của bộ phim. **Lật Mặt 7** dùng ảnh bối cảnh phim. [TMDB](https://www.themoviedb.org/tv/237936/images/backdrops) · [Plex](https://watch.plex.tv/show/hellbound-village/season/1) · [TVmaze](https://www.tvmaze.com/shows/41428/the-queens-gambit/episodes) · [Khen Phim](https://khenphim.com/lat-mat-7/)
- Hình ảnh và tệp video mẫu **Tears of Steel** © Blender Foundation. Repo có bản mã hóa 360p, 540p và phụ đề tiếng Anh từ bản demo trước. [Thông tin phim và giấy phép CC BY 3.0](https://mango.blender.org/about/) · [Bản phát hành](https://mango.blender.org/download/) · [Poster](https://commons.wikimedia.org/wiki/File:Tos-poster.png) · [Ảnh và phụ đề](https://commons.wikimedia.org/wiki/File:Tears_of_Steel_in_4k_-_Official_Blender_Foundation_release.webm)
- Phông Be Vietnam Pro đi kèm [giấy phép OFL](dist/assets/OFL-Be-Vietnam-Pro.txt).

## Triển khai

Đưa thư mục [dist](dist/) lên hosting tĩnh có HTTPS. Các tuyến nằm sau dấu `#` và dùng chung `index.html`. Poster và ảnh từng tập đi kèm mã nguồn. Trailer YouTube cần kết nối Internet.

**GitHub Pages:** Với repo dành riêng cho bản demo, đưa nội dung trong `dist/` vào gốc repo rồi chọn **Settings → Pages → Deploy from a branch → main → / (root)**. Nếu giữ cả mã nguồn trong repo, dùng GitHub Actions để xuất bản thư mục `dist/`. [Hướng dẫn GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

