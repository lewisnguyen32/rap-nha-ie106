# Rạp Nhà · IE106

Rạp Nhà là frontend đồ án Thiết kế giao diện người dùng, dựa trên wireframe gồm 15 màn hình. Website dùng HTML, CSS và JavaScript thuần và có 23 phim và series có thật.

## Lịch sử chỉnh sửa

1. Xây dựng giao diện thô từ wireframe, bổ sung tương tác tìm kiếm, lọc phim và lưu lịch sử xem trên trình duyệt. (Phước)
2. Thay ảnh bằng poster và ảnh phim thật, đồng thời cập nhật thông tin phim, danh sách tập và liên kết xem. (Phước)
3. Bổ sung trình phát mẫu và cấu hình triển khai tĩnh trên GitHub Pages. (Phước)
4. Mở rộng trang chủ từ ba lên sáu hàng phim, gồm các hàng mới Phim chiếu rạp, Phim Việt Nam và Phim Hàn Quốc, đồng thời cập nhật bảng xếp hạng Top 10 phim gần đây. (Phước)
5. Cho các hàng phim cuộn vòng hai chiều, mỗi lần bấm mũi tên trượt hai thẻ. Đánh giá nhịp cuộn trên màn hình hẹp ở **Chương 4**. (Phước)
6. Bổ sung trình phát mô phỏng cho toàn bộ phim và tập, hỗ trợ phát, tạm dừng, tua và lưu tiến độ xem trên trình duyệt. Trailer mở riêng qua YouTube. (Phước)
7. Bổ sung 60 ảnh Full HD cho trình phát, gồm 19 ảnh phim lẻ và 41 ảnh tập phim bộ. (Phước)
8. Ổn định bố cục banner trang chủ khi chuyển phim để các nút và mục Top 10 phim gần đây giữ nguyên vị trí. Tiêu đề dài tự giảm cỡ chữ khi cần. Đổi ảnh nền Thám Tử Kiên sang bản không chữ và căn lại để khuôn mặt nhân vật hiển thị rõ trên desktop và mobile. (Phước)

Xem lý do, kết quả và gợi ý minh họa cho từng mốc trong [lịch sử chỉnh sửa chi tiết](CHANGELOG.md).

## Giới hạn bản demo

Bản demo mô phỏng phát phim bằng ảnh tĩnh và thanh tiến độ. Trailer YouTube có video và âm thanh.
Các điểm cần đánh giá ở **Chương 4**, gồm nhịp cuộn hàng phim, chuyển cảnh banner và hiệu ứng câu hỏi thường gặp, được ghi trong [giới hạn và hướng cải tiến](DEMO_LIMITATIONS.md).

## Chạy trên máy

Chạy `npm run dev` trong thư mục này và mở [http://127.0.0.1:4173/](http://127.0.0.1:4173/). Cần Node.js. Lệnh `npm run check` kiểm tra cú pháp JavaScript.

## Trình diễn

Trên trang chủ, **Top 10 phim gần đây** xếp theo ngày phát hành tại thị trường gốc khi có dữ liệu và dùng năm phát hành khi thiếu ngày. Nút **Xem tất cả** mở đủ 10 tựa với cùng thứ hạng. **Phim chiếu rạp** giới thiệu phim đã phát hành tại rạp. Hai hàng **Phim Việt Nam** và **Phim Hàn Quốc** dẫn tới danh mục lọc theo quốc gia.

1. Nhập `hai phuong` hoặc `Furie` để tìm **Hai Phượng** theo tên tiếng Việt không dấu hoặc tên quốc tế. Thử lọc theo loại phim, thể loại, năm và quốc gia. Các điểm hiển thị lấy từ trang của nhà phát hành, khi có.
2. Mở **Tết ở Làng Địa Ngục** và chọn một trong 12 tập để thử phát, tạm dừng, tua, chỉnh mức âm lượng mô phỏng và toàn màn hình.
3. Mở **Khi Cuộc Đời Cho Bạn Quả Quýt**, chọn Phần 4 rồi thử mở Tập 13. Nút **Trailer** mở video YouTube.
4. Chọn **Đăng nhập → Dùng tài khoản mẫu** để xem theo dõi và lịch sử của Minh An. Có thể đăng ký bằng dữ liệu thử và mã OTP `123456`.

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

