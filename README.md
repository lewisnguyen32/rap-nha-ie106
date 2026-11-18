# Rạp Nhà · IE106

Rạp Nhà là frontend đồ án Thiết kế giao diện người dùng, dựa trên wireframe gồm 15 màn hình. Website dùng HTML, CSS và JavaScript thuần và có 23 phim và series có thật.

## Chạy trên máy

Chạy `npm run dev` trong thư mục này và mở [http://127.0.0.1:4173/](http://127.0.0.1:4173/). Cần Node.js. Lệnh `npm run check` kiểm tra cú pháp JavaScript.

## Trình diễn

Trên trang chủ, **Top 10 phim gần đây** xếp theo ngày phát hành tại thị trường gốc khi có dữ liệu và dùng năm phát hành khi thiếu ngày. Nút **Xem tất cả** mở đủ 10 tựa với cùng thứ hạng. **Phim chiếu rạp** giới thiệu phim đã phát hành tại rạp. Hai hàng **Phim Việt Nam** và **Phim Hàn Quốc** dẫn tới danh mục lọc theo quốc gia.

1. Nhập `hai phuong` hoặc `Furie` để tìm **Hai Phượng** theo tên tiếng Việt không dấu hoặc tên quốc tế. Thử lọc theo loại phim, thể loại, năm và quốc gia. Các điểm hiển thị lấy từ trang của nhà phát hành, khi có.
2. Mở **Tết ở Làng Địa Ngục** để xem 12 tập với tên, thời lượng và ảnh từng tập. Chọn một tập để mở trang xem và đi đến Netflix. Trailer mở từ kênh chính thức.
3. Mở **Tears of Steel** để sử dụng trình phát tích hợp. Có thể thử tua, đổi chất lượng, bật phụ đề tiếng Anh và xem tiếp từ vị trí đã lưu.
4. Chọn **Đăng nhập → Dùng tài khoản mẫu** để xem theo dõi và lịch sử của Minh An. Có thể đăng ký bằng dữ liệu thử và mã OTP `123456`.

Lịch sử lưu tiến độ của video phát trực tiếp trên Rạp Nhà. Với phim xem ở nền tảng khác, lịch sử chỉ ghi tập hoặc phim đã mở. Tài khoản và cài đặt lưu trên trình duyệt. Email liên hệ là địa chỉ ví dụ.

## Giới hạn bản demo

- Với phim bộ, danh sách tập hiển thị tên, ảnh và thời lượng. Rạp Nhà chưa phát video từng tập do hạn chế về nguồn phát.
- Chọn **Xem tại nguồn** để mở nền tảng phát hành khi có liên kết. **Tears of Steel** phát trực tiếp trên Rạp Nhà theo giấy phép CC BY 3.0.

## Nguồn phim và hình ảnh

- Trang chi tiết của từng phim có liên kết tới nơi công bố thông tin. Poster, ảnh nền và trailer lấy từ [3388 Films](https://www.3388films.com/films/), [Well Go USA](https://wellgousa.com/films/furie), [CGV](https://www.cgv.vn/en/nha-ba-nu.html), [Film Movement](https://filmmovement.com/press/film/578-magnum) và [Netflix](https://www.netflix.com/vn-vi/browse/genre/107571). Một số ảnh nền lấy từ hình đại diện của trailer chính thức.
- Tư liệu của bốn phim Hàn bổ sung lấy từ Well Go USA. [Exhuma](https://wellgousa.com/films/exhuma) · [Escape](https://wellgousa.com/films/escape-movie-2024) · [Hi-Five](https://wellgousa.com/films/hi-five) · [The King’s Warden](https://wellgousa.com/films/kings-warden)
- Poster dọc của **Tết ở Làng Địa Ngục**, **Tiệm Ăn Của Quỷ**, **Khi Cuộc Đời Cho Bạn Quả Quýt** và **Gambit Hậu** được đối chiếu từ TheTVDB và TVmaze. Ảnh và dữ liệu các tập lấy từ Netflix, trích đoạn chính thức của K+ và danh mục TVmaze. [TheTVDB](https://thetvdb.com/series/tet-o-lang-dia-nguc) · [TVmaze](https://www.tvmaze.com/shows/74399/when-life-gives-you-tangerines/episodes) · [K+](https://www.youtube.com/watch?v=CI4fKeVdthQ) · [EAST Films](https://vimeo.com/1048818852)
- **Tears of Steel** © Blender Foundation, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Bản phim phát trên Rạp Nhà được mã hóa lại ở 360p và 540p và giữ đầy đủ phần danh đề. [Thông tin phim và giấy phép](https://mango.blender.org/about/) · [Bản phát hành](https://mango.blender.org/download/) · [Tệp nguồn](https://mirror.nju.edu.cn/blender/blender-demo/movies/ToS/) · [Poster](https://commons.wikimedia.org/wiki/File:Tos-poster.png) · [Ảnh và phụ đề tiếng Anh](https://commons.wikimedia.org/wiki/File:Tears_of_Steel_in_4k_-_Official_Blender_Foundation_release.webm)
- Phông Be Vietnam Pro đi kèm [giấy phép OFL](dist/assets/OFL-Be-Vietnam-Pro.txt).

## Triển khai

Đưa thư mục [dist](dist/) lên hosting tĩnh có HTTPS và hỗ trợ yêu cầu byte range cho MP4. Các tuyến nằm sau dấu `#` và dùng chung `index.html`. Poster và ảnh từng tập đi kèm mã nguồn. Trailer nhúng và liên kết tới nền tảng phát hành cần kết nối Internet.

**GitHub Pages:** Với repo dành riêng cho bản demo, đưa nội dung trong `dist/` vào gốc repo rồi chọn **Settings → Pages → Deploy from a branch → main → / (root)**. Nếu giữ cả mã nguồn trong repo, dùng GitHub Actions để xuất bản thư mục `dist/`. [Hướng dẫn GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

