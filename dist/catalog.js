"use strict";

const posterRoot = "assets/films/";
const netflix = (id, youtube = "") => ({
  publisher: "Netflix",
  source: `https://www.netflix.com/vn/title/${id}`,
  watch: `https://www.netflix.com/vn/title/${id}`,
  youtube,
});

const distributor3388 = (slug, score, youtube, watch = "") => ({
  publisher: "3388 Films",
  source: `https://www.3388films.com/films/${slug}`,
  score, youtube, watch, theatrical: true,
});

const koreanTheatrical = (slug, youtube) => ({
  country: "Hàn Quốc", theatrical: true, publisher: "Well Go USA",
  source: `https://wellgousa.com/films/${slug}`, youtube,
});

const films = [
  {
    id: "tet-o-lang-dia-nguc", title: "Tết ở Làng Địa Ngục", original: "Hellbound Village", year: 2023,
    ...netflix("81731697", "C2V38ghWHlQ"), trailerPublisher: "K+", focus: "68% 40%",
    artSource: ["TheTVDB", "https://thetvdb.com/series/tet-o-lang-dia-nguc"],
    genres: ["Kinh dị", "Bí ẩn", "Cổ trang"], director: "Trần Hữu Tấn",
    cast: "Quang Tuấn, Nguyên Thảo, Lan Phương, Võ Tấn Phát",
    description: "Liên tiếp những cái chết bí ẩn xảy đến ở ngôi làng miền núi, buộc trưởng làng Thập phải đối mặt với quá khứ của dân làng. Phim chuyển thể từ tiểu thuyết cùng tên của Thảo Trang.",
  },
  {
    id: "an-mang-karaoke", title: "Án Mạng Karaoke", original: "Karaoke Murder", year: 2026, minutes: 96,
    releaseDate: "2026-10-30",
    ...distributor3388("an-mang-karaoke-karaoke-murder-movie", 8.8, "P4rs8JabvSg"),
    genres: ["Hình sự", "Bí ẩn"], director: "Hoàng Lê",
    cast: "Đoàn Thiên Ân, Thanh Sơn, Đại Nghĩa, Vân Dung",
    description: "Một cựu nhà báo phải tự điều tra sau khi một đại gia chết trong chuyến hành hương cùng nhóm hàng xóm. Bị mắc kẹt trên núi, cô phát hiện ai trong đoàn cũng có điều muốn giấu.",
  },
  {
    id: "tho-oi", title: "Thỏ Ơi!!", original: "Bunny!!", year: 2026, minutes: 127,
    releaseDate: "2026-02-17",
    ...distributor3388("bunny", 8.3, "81mdAHfFS50"),
    genres: ["Tâm lý", "Gia đình", "Giật gân"], director: "Trấn Thành",
    cast: "Trấn Thành, Pháo, LyLy, Văn Mai Hương, Quốc Anh",
    description: "Cuộc sống của người dẫn một chương trình tư vấn tình cảm đảo lộn khi một vị khách đem đến câu chuyện riêng khó lý giải. Cuộc gặp kéo cả hai vào những lựa chọn họ chưa từng lường trước.",
  },
  {
    id: "tham-tu-kien", title: "Thám Tử Kiên: Kỳ Án Không Đầu", original: "Detective Kien: The Headless Horror", year: 2025, minutes: 132,
    releaseDate: "2025-04-28",
    ...distributor3388("detective-kien", 8.5, "IEbV5VEXN3Y", "https://watch.3388films.com/products/watch-detective-kien-movie-xem-phim-tham-tu-kien"),
    genres: ["Kinh dị", "Bí ẩn", "Cổ trang"], director: "Victor Vũ",
    cast: "Quốc Huy, Đinh Ngọc Diệp, Trần Quốc Anh, Đoàn Minh Anh",
    description: "Một thi thể không đầu xuất hiện tại làng quê thời Nguyễn. Thám tử Kiên lần theo manh mối trong khi dân làng tin bi kịch bắt nguồn từ một thế lực siêu nhiên.",
  },
  {
    id: "mai", title: "Mai", year: 2024, minutes: 131,
    releaseDate: "2024-02-10",
    ...distributor3388("mai", 8.4, "ckf4lDFyL8w"),
    genres: ["Tình cảm", "Tâm lý"], director: "Trấn Thành", cast: "Phương Anh Đào, Tuấn Trần, Hồng Đào, Uyển Ân",
    description: "Mai, một phụ nữ làm nghề massage, gặp Dương ở khu chung cư nơi cô sống. Khi tình cảm dần lớn lên, quá khứ mà Mai muốn bỏ lại bắt đầu ảnh hưởng đến cả hai.",
  },
  {
    id: "hai-phuong", title: "Hai Phượng", original: "Furie", year: 2019, minutes: 98, focus: "67% 42%",
    theatrical: true,
    publisher: "Well Go USA", source: "https://wellgousa.com/films/furie", youtube: "SXiWz0yLLdE",
    watch: "https://tv.apple.com/us/movie/furie/umc.cmc.3dgzjc6gdcmzq0nkg2gfgzxkk",
    genres: ["Hành động", "Giật gân"], director: "Lê Văn Kiệt", cast: "Ngô Thanh Vân, Mai Cát Vi, Phan Thanh Nhiên",
    description: "Khi con gái bị bắt cóc, Hai Phượng phải trở lại thế giới ngầm mà cô từng rời bỏ. Cuộc truy đuổi đưa cô từ miền Tây đến Sài Gòn để giành lại con.",
  },
  {
    id: "tiem-an-cua-quy", title: "Tiệm Ăn Của Quỷ", original: "Devil’s Diner", year: 2025,
    releaseDate: "2025-01-26",
    ...netflix("81751769"), artSource: ["TVmaze", "https://www.tvmaze.com/shows/82342/tiem-an-cua-quy"],
    trailerPublisher: "EAST Films", trailer: "https://vimeo.com/1048818852", trailerEmbed: "https://player.vimeo.com/video/1048818852",
    genres: ["Kinh dị", "Bí ẩn"], director: "Hàm Trần", cast: "Lê Quốc Nam, Lê Huỳnh, Trần Nam Khoa",
    description: "Ở một quán ăn hẻo lánh, vị đầu bếp bí ẩn phục vụ những món có thể biến ham muốn của thực khách thành hiện thực. Mỗi món ăn đều đi kèm một cái giá.",
  },
  {
    id: "khi-cuoc-doi-cho-ban-qua-quyt", title: "Khi Cuộc Đời Cho Bạn Quả Quýt", original: "When Life Gives You Tangerines", year: 2025, country: "Hàn Quốc",
    releaseDate: "2025-03-07",
    ...netflix("81681535", "4ECAaQkNAbc"), artSource: ["TVmaze", "https://www.tvmaze.com/shows/74399/when-life-gives-you-tangerines"],
    genres: ["Tình cảm", "Gia đình"], director: "Kim Won-suk",
    cast: "IU, Park Bo-gum, Moon So-ri, Park Hae-joon",
    description: "Từ tuổi thơ ở đảo Jeju, Ae-sun và Gwan-sik cùng trải qua nhiều thập niên biến động. Bộ phim theo chân họ khi tình yêu tuổi trẻ trở thành điểm tựa của cả một gia đình.",
  },
  {
    id: "thanh-soi", title: "Thanh Sói", original: "Furies", year: 2022, minutes: 109,
    theatrical: true,
    ...netflix("81603171", "nL4LorD2Kik"), artSource: ["CGV", "https://www.cgv.vn/default/thanh-soi.html"],
    genres: ["Hành động", "Hình sự"],
    director: "Ngô Thanh Vân", cast: "Đồng Ánh Quỳnh, Tóc Tiên, Rima Thanh Vy, Thuận Nguyễn",
    description: "Ba cô gái hợp sức chống lại một đường dây tội phạm ở Sài Gòn thập niên 1990. Đây là phần tiền truyện của Hai Phượng.",
  },
  {
    id: "bo-tu-bao-thu", title: "Bộ Tứ Báo Thủ", original: "The 4 Rascals", year: 2025, minutes: 132,
    releaseDate: "2025-01-29",
    ...distributor3388("the-4-rascals", 7.9, "Ww5AnbCM1Pk"),
    genres: ["Hài", "Tình cảm"], director: "Trấn Thành", cast: "Tiểu Vy, Quốc Anh, Kỳ Duyên, Lê Dương Bảo Lâm",
    description: "Khi mối tình của Quỳnh Anh đứng trước nguy cơ tan vỡ, nhóm người thân và bạn bè tìm cách giúp cô giành lại tình cảm. Những kế hoạch thiếu ăn ý của họ lại khiến mọi chuyện rối thêm.",
  },
  {
    id: "lat-mat-7", title: "Lật Mặt 7: Một Điều Ước", original: "Face Off 7: One Wish", year: 2024, minutes: 139,
    releaseDate: "2024-04-26",
    ...distributor3388("face-off-7", 8.3, "rs0q0dG2dC8"),
    genres: ["Gia đình", "Tâm lý"], director: "Lý Hải", cast: "Thanh Hiền, Trương Minh Cường, Đinh Y Nhung, Quách Ngọc Tuyên",
    description: "Sau khi gặp tai nạn, bà Hai lần lượt đến ở cùng năm người con đã trưởng thành. Việc chăm sóc mẹ khiến anh chị em phải nhìn lại những ưu tiên của mình.",
  },
  {
    id: "co-dau-hao-mon", title: "Cô Dâu Hào Môn", original: "The Trophy Bride", year: 2024, minutes: 115,
    releaseDate: "2024-10-18",
    ...distributor3388("trophy-bride", 8.1, "rQfQ1gAV7wI", "https://watch.3388films.com/products/watch-the-trophy-bride-xem-phim-co-dau-hao-mon"),
    genres: ["Tâm lý", "Giật gân"], director: "Vũ Ngọc Đãng", cast: "Uyển Ân, Thu Trang, Kiều Minh Tuấn, Samuel An",
    description: "Một gia đình khó khăn giả làm người giàu để con gái có thể kết hôn với thiếu gia. Càng đến gần đám cưới, họ càng khó che giấu sự thật về mình.",
  },
  {
    id: "nguoi-vo-cuoi-cung", title: "Người Vợ Cuối Cùng", original: "The Last Wife", year: 2023, minutes: 132,
    ...distributor3388("the-last-wife", 8.0, "RhlCD8FAs08"),
    genres: ["Cổ trang", "Tình cảm"], director: "Victor Vũ", cast: "Kaity Nguyễn, Thuận Nguyễn, Quang Thắng, Kim Oanh",
    description: "Linh, người vợ trẻ nhất của một viên quan thời Nguyễn, chịu sức ép phải sinh con nối dõi. Cuộc gặp lại người yêu thuở nhỏ làm thay đổi cuộc sống tưởng như đã định sẵn của cô.",
  },
  {
    id: "nha-ba-nu", title: "Nhà Bà Nữ", original: "The House of No Man", year: 2023, minutes: 102,
    theatrical: true,
    publisher: "CGV", source: "https://www.cgv.vn/en/nha-ba-nu.html", youtube: "Q8WE8CAPtXw",
    genres: ["Gia đình", "Tâm lý", "Hài"], director: "Trấn Thành", cast: "Lê Giang, Uyển Ân, Song Luân, Khả Như",
    description: "Bà Nữ điều hành quán bánh canh cua và can thiệp sâu vào đời sống các con. Những căng thẳng trong nhà bùng lên khi con gái út tự quyết định chuyện tình cảm.",
  },
  {
    id: "bo-gia", title: "Bố Già", original: "Dad, I’m Sorry", year: 2021, minutes: 128,
    ...distributor3388("dad-im-sorry", 8.1, "d-PQcfY30o0", "https://watch.3388films.com/products/bo-gia"),
    genres: ["Gia đình", "Hài"], director: "Trấn Thành, Vũ Ngọc Đãng", cast: "Trấn Thành, Tuấn Trần, Ngân Chi",
    description: "Trong một con hẻm Sài Gòn, ông Ba Sang luôn hay lo chuyện của người thân. Điểm khác biệt giữa ông và con trai Quắn khiến hai cha con yêu thương nhau mà vẫn không ngừng mâu thuẫn.",
  },
  {
    id: "hau-gam", title: "Gambit Hậu", original: "The Queen’s Gambit", year: 2020, country: "Hoa Kỳ",
    ...netflix("80234304", "CDrieqwSdgI"), artSource: ["TVmaze", "https://www.tvmaze.com/shows/41428/the-queens-gambit"],
    genres: ["Tâm lý"], director: "Scott Frank",
    cast: "Anya Taylor-Joy, Bill Camp, Marielle Heller",
    description: "Beth Harmon phát hiện tài năng cờ vua tại cô nhi viện. Khi tiến vào giới thi đấu đỉnh cao, cô phải tìm cách kiểm soát sự lệ thuộc vào thuốc và rượu.",
  },
  {
    id: "chuyen-tau-sinh-tu", title: "Chuyến Tàu Sinh Tử", original: "Train to Busan", year: 2016, minutes: 118, country: "Hàn Quốc",
    theatrical: true,
    publisher: "Well Go USA", source: "https://www.wellgousa.com/films/train-busan", youtube: "fVEURju797Y",
    watch: "https://tv.apple.com/us/movie/train-to-busan/umc.cmc.74kcjars4r3m6bliewisxh4dr",
    genres: ["Kinh dị", "Hành động"], director: "Yeon Sang-ho", cast: "Gong Yoo, Jung Yu-mi, Ma Dong-seok, Kim Su-an",
    description: "Trên chuyến tàu đến Busan, một người cha và cô con gái cùng các hành khách phải tìm đường sống khi dịch xác sống bùng phát khắp Hàn Quốc.",
  },
  {
    id: "578-magnum", title: "578: Phát Đạn Của Kẻ Điên", original: "578 Magnum", year: 2022, minutes: 95,
    theatrical: true,
    publisher: "Film Movement", source: "https://filmmovement.com/press/film/578-magnum", youtube: "-T6Rq__wA9g",
    genres: ["Hành động", "Tâm lý"], director: "Lương Đình Dũng", cast: "Alexandre Nguyễn, H'Hen Niê, Thanh Thảo",
    description: "Hùng, một tài xế container từng phục vụ trong lực lượng đặc biệt, quyết truy tìm những người đã làm hại con gái mình.",
  },
  {
    id: "the-kings-warden", title: "The King’s Warden", original: "왕과 사는 남자", year: 2026, releaseDate: "2026-02-04", minutes: 117,
    ...koreanTheatrical("kings-warden", "PraL-te3Nfg"),
    genres: ["Cổ trang", "Tâm lý"], director: "Jang Hang-jun", cast: "Yoo Hae-jin, Park Ji-hoon, Yoo Ji-tae, Jeon Mi-do",
    description: "Sau khi vua Danjong bị phế truất và lưu đày, một trưởng làng nhận trách nhiệm trông nom ông. Từ cuộc gặp miễn cưỡng, hai người dần tìm được sự cảm thông dành cho nhau.",
  },
  {
    id: "hi-five", title: "Hi-Five", original: "하이파이브", year: 2025, releaseDate: "2025-05-30", minutes: 119,
    ...koreanTheatrical("hi-five", "QLv_ARaBAH4"),
    genres: ["Hành động", "Kỳ ảo"], director: "Kang Hyoung-chul", cast: "Lee Jae-in, Yoo Ah-in, Ahn Jae-hong, Ra Mi-ran, Kim Hee-won",
    description: "Năm người xa lạ có năng lực khác thường sau khi nhận nội tạng từ cùng một người hiến. Họ phải hợp sức khi một người nhận khác tìm cách chiếm lấy sức mạnh của cả nhóm.",
  },
  {
    id: "escape", title: "Escape", original: "탈주", year: 2024, releaseDate: "2024-07-03", minutes: 94,
    ...koreanTheatrical("escape-movie-2024", "9mPzDILlt5g"),
    genres: ["Hành động", "Giật gân"], director: "Lee Jong-pil", cast: "Lee Je-hoon, Koo Kyo-hwan, Hong Xa-bin",
    description: "Một hạ sĩ Triều Tiên sắp hoàn thành nghĩa vụ quân sự lên đường vượt biên sang Hàn Quốc. Một sĩ quan an ninh tìm cách chặn anh trước khi anh đến được biên giới.",
  },
  {
    id: "exhuma", title: "Quật Mộ Trùng Ma", original: "Exhuma", year: 2024, releaseDate: "2024-02-22", minutes: 135,
    ...koreanTheatrical("exhuma", "5iRZLgrUuZM"),
    genres: ["Kinh dị", "Bí ẩn"], director: "Jang Jae-hyun", cast: "Choi Min-sik, Kim Go-eun, Yoo Hae-jin, Lee Do-hyun",
    description: "Hai pháp sư cùng một thầy phong thủy và một người làm nghề tang lễ điều tra căn bệnh lạ trong một gia đình. Khi khai quật ngôi mộ tổ tiên, họ giải thoát một thế lực bị chôn vùi từ lâu.",
  },
  {
    id: "tears-of-steel", title: "Tears of Steel", year: 2012, minutes: 12, country: "Hà Lan",
    publisher: "Blender Foundation", source: "https://mango.blender.org/about/",
    artSource: ["Wikimedia Commons", "https://commons.wikimedia.org/wiki/File:Tos-poster.png"],
    youtube: "WwHux5QZfC8", trailerPublisher: "Mango Open Movie",
    media: {
      source: "assets/films/tears-of-steel-540.mp4",
      alternatives: { "360": "assets/films/tears-of-steel-360.mp4", "540": "assets/films/tears-of-steel-540.mp4" },
      captions: { en: "assets/films/tears-of-steel-en.vtt" },
      watch: "https://www.youtube.com/watch?v=OHOpb2fS-cM",
      credit: "© Blender Foundation · CC BY 3.0",
      license: "https://creativecommons.org/licenses/by/3.0/",
    },
    genres: ["Khoa học viễn tưởng", "Hành động"], director: "Ian Hubert",
    cast: "Derek de Lint, Sergio Hasselbaink, Vanja Rukavina",
    description: "Tại Amsterdam tương lai, một nhóm chiến binh và nhà khoa học tìm cách tái hiện một sự kiện trong quá khứ để ngăn đội quân rô-bốt hủy diệt thành phố.",
  },
].map(film => {
  const episodes = seriesEpisodes[film.id];
  return {
    country: "Việt Nam", ...film, episodes,
    episodeCount: episodes?.length ?? 1,
    poster: `${posterRoot}${film.id}.jpg`,
    backdrop: `${posterRoot}${film.id}-wide.jpg`,
  };
});

const filmById = Object.assign(Object.create(null), Object.fromEntries(films.map(film => [film.id, film])));
const featured = ["tet-o-lang-dia-nguc", "hai-phuong", "tham-tu-kien"].map(id => filmById[id]);
const compareRelease = (a, b) => b.year - a.year ||
  (b.releaseDate ?? "").localeCompare(a.releaseDate ?? "") || a.title.localeCompare(b.title, "vi");
const newest = [...films].sort(compareRelease);
const recentTop = newest.slice(0, 10);
const recentRanks = new Map(recentTop.map((film, index) => [film.id, index + 1]));
const theatricalFilms = newest.filter(film => film.theatrical);
const theatricalShelf = [
  ...theatricalFilms.filter(film => !recentRanks.has(film.id)),
  ...theatricalFilms.filter(film => recentRanks.has(film.id)),
];
const vietnameseShelf = ["tet-o-lang-dia-nguc", "tiem-an-cua-quy", "hai-phuong", "bo-tu-bao-thu", "bo-gia", "an-mang-karaoke", "mai", "tham-tu-kien"];
const selections = ["tet-o-lang-dia-nguc", "hai-phuong", "mai", "khi-cuoc-doi-cho-ban-qua-quyt", "tham-tu-kien", "thanh-soi", "chuyen-tau-sinh-tu", "tears-of-steel"];
const rated = films.filter(film => film.score != null).sort((a, b) => b.score - a.score);
const homeRows = [
  { title: "Top 10 phim gần đây", english: "Top 10 recent releases", icon: "trend", params: { collection: "top10" }, items: recentTop },
  { title: "Phim chiếu rạp", english: "Theatrical films", icon: "movie", params: { collection: "theatrical" }, items: theatricalShelf.slice(0, 8) },
  { title: "Phim Việt Nam", english: "Vietnamese films", icon: "movie", params: { country: "Việt Nam" }, items: vietnameseShelf.map(id => filmById[id]) },
  { title: "Phim Hàn Quốc", english: "Korean films", icon: "movie", params: { country: "Hàn Quốc" }, items: newest.filter(film => film.country === "Hàn Quốc").slice(0, 8) },
  { title: "Rạp Nhà tuyển chọn", english: "Rạp Nhà picks", icon: "movie", params: { sort: "picks" }, items: selections.map(id => filmById[id]) },
  { title: "Điểm cao từ nhà phát hành", english: "Top distributor ratings", icon: "star", params: { sort: "score" }, items: rated.slice(0, 8) },
];

const genres = [...new Set(films.flatMap(film => film.genres))].sort((a, b) => a.localeCompare(b, "vi"));
const countries = [...new Set(films.map(film => film.country))];
const years = [...new Set(films.map(film => film.year))].sort((a, b) => b - a);
const demoUser = { name: "Minh An", email: "minhan@example.com", since: "2026-11-06" };
const demoFollows = [
  { id: "tet-o-lang-dia-nguc", added: "2026-11-13" }, { id: "tears-of-steel", added: "2026-11-12" },
  { id: "mai", added: "2026-11-08" }, { id: "tham-tu-kien", added: "2026-11-06" },
];
const demoHistory = [
  { id: "tears-of-steel", episode: 1, progress: .22, viewed: "2026-11-18T20:12:00+07:00" },
  { id: "tet-o-lang-dia-nguc", episode: 3, progress: null, viewed: "2026-11-17T21:40:00+07:00" },
  { id: "hai-phuong", episode: 1, progress: null, viewed: "2026-11-12T20:00:00+07:00" },
];

