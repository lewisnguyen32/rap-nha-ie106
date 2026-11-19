"use strict";

const main = document.querySelector("#main");
const header = document.querySelector("#site-header");
const footer = document.querySelector("#site-footer");
const trailer = document.querySelector("#trailer-dialog");
const resultDialog = document.querySelector("#result-dialog");
const toast = document.querySelector("#toast");
const prefix = "rap-nha.v1.";
const defaults = { language: "vi", autoplay: true };
const demoOtp = "123456";

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(prefix + key)) ?? fallback; }
  catch { return fallback; }
}

function write(key, value) {
  try {
    localStorage.setItem(prefix + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

let user = read("session", null);
let settings = { ...defaults, ...read("settings", {}) };
let draft;
let recovery;
let signInEmail = "";
let returnTo = "";
let pendingFollow = "";
let heroIndex = 0;
let historyFilter = "all";
let followSort = "release";
let activeSearch = -1;
let suggestions = [];
let disposePage = () => {};
let trailerTrigger;
let toastTimer;

const bi = (vi, en) => settings.language === "en" ? en : vi;
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]
));
const normalize = value => String(value).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/đ/g, "d").trim();
const scoreText = score => score.toFixed(1).replace(".", bi(",", "."));
const initials = name => name.trim().split(/\s+/).slice(-2).map(word => word[0]).join("").toUpperCase();
const now = () => new Date().toISOString();
const prettyDate = date => new Date(date).toLocaleDateString(settings.language === "en" ? "en-GB" : "vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
const typeOf = film => film.episodeCount > 1 ? bi("Phim bộ", "Series") : bi("Phim lẻ", "Movies");
const episodeLabel = number => bi(`Tập ${number}`, `Episode ${number}`);
const episodeTitle = (film, number) => film.episodes?.[number - 1]?.[0] ?? (film.episodeCount === 1 ? film.title : episodeLabel(number));
const episodeMinutes = (film, number) => film.episodes?.[number - 1]?.[1] ?? film.minutes;
const episodeImageName = (film, number) => `${film.id}-e${String(number).padStart(2, "0")}`;
const episodeArt = (film, number) => film.episodes ? `${posterRoot}${episodeImageName(film, number)}.jpg` : film.backdrop;
const playerArt = (film, number) => `${posterRoot}player/${film.episodes ? episodeImageName(film, number) : film.id}.webp`;
const minutesLabel = minutes => bi(`${minutes} phút`, `${minutes} min`);
const episodeCount = count => bi(`${count} tập`, `${count} episodes`);
const genreInEnglish = {
  "Bí ẩn": "Mystery", "Gia đình": "Family", "Hài": "Comedy", "Hành động": "Action",
  "Hình sự": "Crime", "Tâm lý": "Drama", "Tình cảm": "Romance", "Cổ trang": "Period",
  "Kinh dị": "Horror", "Giật gân": "Thriller", "Khoa học viễn tưởng": "Science fiction", "Kỳ ảo": "Fantasy",
};
const countryInEnglish = { "Việt Nam": "Vietnam", "Hàn Quốc": "South Korea", "Hoa Kỳ": "United States", "Hà Lan": "Netherlands" };
const genreLabel = genre => bi(genre, genreInEnglish[genre] ?? genre);
const countryLabel = country => bi(country, countryInEnglish[country] ?? country);
const routeToFilm = film => `#/phim/${film.id}`;
const routeToPlayer = (film, episode = 1) => `#/xem/${film.id}/${episode}`;
const backdropOf = film => film.backdrop;

const symbols = {
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  user: '<circle cx="12" cy="8" r="3.4"/><path d="M5 20v-1a7 7 0 0 1 14 0v1"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  left: '<path d="m15 6-6 6 6 6"/>',
  right: '<path d="m9 6 6 6-6 6"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  back: '<path d="M20 12H5m6 6-6-6 6-6"/>',
  play: '<path d="m9 5 11 7-11 7z" fill="currentColor" stroke="none"/>',
  trailer: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M9 5v14m6-14v14" stroke-width="3"/>',
  star: '<path d="m12 3 2.7 5.6 6.2.9-4.5 4.4 1.1 6.2-5.5-3-5.5 3 1.1-6.2L3 9.5l6.2-.9z" fill="currentColor" stroke="none"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  bookmark: '<path d="M6 5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15l-6-4-6 4z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m9 3-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3h5l1-3 3-1-1-3 2-2-2-2 1-3-3-1-1-3z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18z"/>',
  logout: '<path d="M11 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6m-1-8h10m-4-4 4 4-4 4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 5v2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2"/>',
  movie: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18M7 5l2 4m5-4 2 4m-6 3 5 3-5 3z"/>',
  sliders: '<path d="M4 7h16M4 12h16M4 17h16M8 5v4m8 1v4m-6 1v4"/>',
  skip: '<path d="m5 6 10 6-10 6z" fill="currentColor" stroke="none"/><path d="M18 6v12"/>',
  volume: '<path d="M4 9v6h4l5 4V5L8 9zM16 8a5 5 0 0 1 0 8m2-11a9 9 0 0 1 0 14"/>',
  mute: '<path d="M4 9v6h4l5 4V5L8 9zM16 10l5 5m0-5-5 5"/>',
  captions: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 10a2.5 2.5 0 1 0 0 4m7-4a2.5 2.5 0 1 0 0 4"/>',
  fullscreen: '<path d="M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 3v7m4-7v7"/>',
};
const icon = (name, size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbols[name] ?? ""}</svg>`;
const iconButton = (name, label, attrs = "") => `<button type="button" class="icon-button" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}" ${attrs}>${icon(name)}</button>`;
const brand = () => `<a class="brand" href="#/" aria-label="Rạp Nhà"><img src="assets/logo.svg" alt="" width="239" height="68"></a>`;
const accountLinks = () => [
  ["tai-khoan", "user", bi("Trang cá nhân", "Profile")],
  ["lich-su", "clock", bi("Lịch sử xem", "Watch history")],
  ["theo-doi", "bookmark", bi("Theo dõi", "Watchlist")],
  ["cai-dat", "settings", bi("Cài đặt", "Settings")],
];
const avatar = (className = "") => `<span class="avatar ${className}" aria-hidden="true">${user ? escapeHtml(initials(user.name)) : icon("user", 17)}</span>`;

function notify(message) {
  window.clearTimeout(toastTimer);
  toast.innerHTML = `${icon("check", 17)}<span>${escapeHtml(message)}</span>`;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3000);
}

function route() {
  const [path, query] = location.hash.slice(1).split("?");
  const [page = "", id = "", episode = "1"] = (path ?? "").split("/").filter(Boolean);
  return { page, id, episode, params: new URLSearchParams(query ?? "") };
}

function go(hash) {
  if (location.hash === hash) {
    hidePopovers();
    return;
  }
  location.hash = hash;
}

function catalogUrl(values = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) if (value) params.set(key, value);
  return `#/kham-pha${params.size ? `?${params}` : ""}`;
}

function shell(state) {
  const type = state.params.get("type");
  const nav = [
    ["#/", bi("Trang chủ", "Home"), !state.page],
    [catalogUrl({ type: "movie" }), bi("Phim lẻ", "Movies"), state.page === "kham-pha" && type === "movie"],
    [catalogUrl({ type: "series" }), bi("Phim bộ", "Series"), state.page === "kham-pha" && type === "series"],
  ];
  header.innerHTML = `<div class="header-inner frame">
    ${brand()}
    <nav class="main-nav" aria-label="${bi("Điều hướng chính", "Main navigation")}">
      ${nav.map(([href, label, active]) => `<a href="${escapeHtml(href)}" ${active ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
      <div class="genre-wrap"><button type="button" class="nav-button" data-action="genres" aria-expanded="false" aria-controls="genre-menu">${bi("Thể loại", "Genres")}${icon("down", 14)}</button>
        <div id="genre-menu" class="popover genre-menu" hidden>${genres.map(genre => `<a href="${escapeHtml(catalogUrl({ genre }))}">${genreLabel(genre)}</a>`).join("")}</div></div>
    </nav>
    <form class="search-form" role="search" id="search-form" autocomplete="off">
      <div class="search-field">${icon("search", 18)}
        <input type="search" id="search-input" name="q" maxlength="100" enterkeyhint="search" placeholder="${bi("Tìm tên phim…", "Find a title…")}" aria-label="${bi("Tìm kiếm phim", "Search films")}" role="combobox" aria-controls="suggestions" aria-autocomplete="list" aria-expanded="false" value="${escapeHtml(state.params.get("q") ?? "")}">
        <button class="search-clear" type="button" data-action="clear-search" aria-label="${bi("Xóa từ khóa", "Clear search")}" hidden>${icon("x", 16)}</button>
        <kbd aria-hidden="true">/</kbd>
      </div>
      <div class="popover suggestions" id="suggestions" role="listbox" aria-label="${bi("Gợi ý phim", "Film suggestions")}" hidden></div>
    </form>
    <div class="account-wrap">${user
      ? `<button type="button" class="avatar-button" data-action="avatar" aria-expanded="false" aria-controls="avatar-menu" aria-label="${bi("Menu tài khoản", "Account menu")}">${avatar()}${icon("down", 14)}</button>
          <div id="avatar-menu" class="popover avatar-menu" hidden>
            <div class="menu-identity">${avatar()}<div><strong>${escapeHtml(user.name)}</strong><small>${escapeHtml(user.email)}</small></div></div>
            ${accountLinks().map(([id, glyph, label]) => `<a href="#/${id}">${icon(glyph, 18)}${label}</a>`).join("")}
            <div class="menu-language">${icon("globe", 18)}<label class="sr-only" for="menu-language">${bi("Ngôn ngữ giao diện", "Interface language")}</label>
              <select id="menu-language" data-pref="language"><option value="vi" ${settings.language === "vi" ? "selected" : ""}>Tiếng Việt</option><option value="en" ${settings.language === "en" ? "selected" : ""}>English</option></select>
            </div>
            <button type="button" class="logout" data-action="logout">${icon("logout", 18)}${bi("Đăng xuất", "Sign out")}</button>
          </div>`
      : `<a class="login-link" href="#/dang-nhap" aria-label="${bi("Đăng nhập", "Sign in")}">${icon("user", 17)}<span>${bi("Đăng nhập", "Sign in")}</span></a>`}</div>
  </div>`;
  footer.innerHTML = `<div class="frame footer-content"><div>${brand()}<p>© 2026 Rạp Nhà · ${bi("Đồ án IE106", "IE106 course project")}</p></div>
    <nav aria-label="${bi("Hỗ trợ", "Support")}"><a href="#/gioi-thieu">${bi("Giới thiệu", "About")}</a><a href="#/gioi-thieu/lien-he">${bi("Liên hệ", "Contact")}</a><a href="#/faq">${bi("Câu hỏi thường gặp", "FAQ")}</a><a href="#/dieu-khoan">${bi("Điều khoản", "Terms")}</a></nav>
  </div>`;
}

function matches(query, film) {
  const terms = normalize(query).split(/\s+/);
  return [film.title, film.original].filter(Boolean).some(title => {
    const normalized = normalize(title);
    return terms.every(term => normalized.includes(term));
  });
}

function hidePopovers(except) {
  for (const [id, action] of [["avatar-menu", "avatar"], ["genre-menu", "genres"], ["suggestions", null]]) {
    const popover = document.getElementById(id);
    if (!popover || id === except) continue;
    popover.hidden = true;
    if (action) header.querySelector(`[data-action="${action}"]`)?.setAttribute("aria-expanded", "false");
    else {
      const input = document.querySelector("#search-input");
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
      activeSearch = -1;
    }
  }
}

function showSuggestions() {
  const input = document.querySelector("#search-input");
  const panel = document.querySelector("#suggestions");
  const query = input.value.trim();
  header.querySelector(".search-clear").hidden = !input.value;
  activeSearch = -1;
  if (!query) {
    hidePopovers();
    return;
  }
  const items = films.filter(film => matches(query, film)).slice(0, 5);
  suggestions = [...items.map(routeToFilm), catalogUrl({ q: query })];
  panel.innerHTML = `<div class="suggestions-heading" role="presentation">${bi("Gợi ý phim", "Film suggestions")}</div>
    ${items.map((film, index) => `<a tabindex="-1" id="suggestion-${index}" role="option" aria-selected="false" href="${routeToFilm(film)}"><img src="${film.poster}" alt=""><span><strong>${film.title}</strong><small>${film.year} · ${typeOf(film)}</small></span>${icon("right", 17)}</a>`).join("")}
    ${items.length ? "" : `<p role="presentation">${bi("Chưa tìm thấy phim phù hợp.", "No matching films.")}</p>`}
    <a class="all-results" tabindex="-1" id="suggestion-${items.length}" role="option" aria-selected="false" href="${escapeHtml(suggestions.at(-1))}">${bi("Xem tất cả kết quả", "See all results")}${icon("arrow", 16)}</a>`;
  hidePopovers("suggestions");
  panel.hidden = false;
  input.setAttribute("aria-expanded", "true");
  input.removeAttribute("aria-activedescendant");
}

function filmCard(film, { badge = "", rank } = {}) {
  return `<a class="film-card" href="${routeToFilm(film)}" data-film="${escapeHtml(film.id)}">
    <div class="poster"><img src="${film.poster}" alt="" width="520" height="780" loading="lazy" decoding="async">
      ${film.score == null ? "" : `<span class="poster-score" title="${film.publisher}" aria-label="${bi("Điểm", "Rating")} ${scoreText(film.score)} · ${film.publisher}">${icon("star", 13)} ${scoreText(film.score)}</span>`}
      ${badge ? `<span class="poster-badge">${badge}</span>` : ""}
    </div>
    <div class="film-card-caption">
      ${rank ? `<span class="film-rank"><span class="sr-only">${bi("Hạng", "Rank")} </span>${rank}</span>` : ""}
      <div class="film-card-copy">
        <h3>${film.title}</h3>
        <p>${film.year}<span>·</span>${typeOf(film)}</p>
      </div>
    </div>
  </a>`;
}

function bindFilmPreview() {
  const preview = document.querySelector("#film-preview");
  const desktop = matchMedia("(min-width: 800px) and (min-height: 360px)");
  const gap = 10;
  const width = 312;
  let activeCard = null;
  let timer;

  function close() {
    clearTimeout(timer);
    if (!activeCard) return;
    activeCard.removeAttribute("aria-describedby");
    activeCard = null;
    preview.hidden = true;
  }

  function position(card) {
    const poster = card.querySelector(".poster").getBoundingClientRect();
    const strip = card.closest(".film-strip")?.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const topLimit = header.getBoundingClientRect().bottom + gap;
    const left = Math.max(0, poster.left, strip?.left ?? 0);
    const right = Math.min(viewportWidth, poster.right, strip?.right ?? viewportWidth);
    if (left >= right || poster.bottom <= topLimit || poster.top >= innerHeight) {
      close();
      return;
    }
    const roomRight = viewportWidth - right - 2 * gap;
    const roomLeft = left - 2 * gap;
    const opensRight = roomRight >= width || roomRight >= roomLeft;
    preview.style.width = `${Math.min(width, opensRight ? roomRight : roomLeft)}px`;
    preview.style.left = `${opensRight ? right + gap : left - preview.offsetWidth - gap}px`;
    const bottomLimit = innerHeight - preview.offsetHeight - gap;
    preview.style.top = `${Math.max(topLimit, Math.min(poster.top + gap, bottomLimit))}px`;
  }

  function open(card, film) {
    if (!card.isConnected) {
      close();
      return;
    }
    preview.innerHTML = `<strong class="film-preview-title">${escapeHtml(film.title)}</strong>
      <p class="film-preview-meta"><span>${film.year}</span>
        <span>${film.episodeCount > 1 ? episodeCount(film.episodeCount) : minutesLabel(film.minutes)}</span>
        ${film.score == null ? "" : `<span class="film-preview-score" title="${escapeHtml(film.publisher)}">${icon("star", 14)} ${scoreText(film.score)} / 10</span>`}
      </p>
      <p class="film-preview-summary">${escapeHtml(film.description)}</p>
      <p class="film-preview-genres">${escapeHtml(film.genres.map(genreLabel).join(", "))}</p>`;
    preview.hidden = false;
    position(card);
    if (!preview.hidden) card.setAttribute("aria-describedby", preview.id);
  }

  function show(card, delay) {
    const film = filmById[card.dataset.film];
    if (!desktop.matches || !film) return;
    if (card === activeCard && !preview.hidden) {
      clearTimeout(timer);
      return;
    }
    close();
    activeCard = card;
    if (delay) timer = setTimeout(() => open(card, film), delay);
    else open(card, film);
  }

  function scheduleClose() {
    clearTimeout(timer);
    if (preview.hidden) close();
    else timer = setTimeout(close, 220);
  }

  main.addEventListener("pointerover", event => {
    const card = event.target.closest(".film-card");
    if (event.pointerType === "mouse" && card && !card.contains(event.relatedTarget)) show(card, 300);
  });
  main.addEventListener("pointerout", event => {
    if (event.pointerType !== "mouse" || !activeCard?.contains(event.target) || activeCard.contains(event.relatedTarget)) return;
    if (!activeCard.matches(":focus-visible")) scheduleClose();
  });
  preview.addEventListener("pointerenter", () => clearTimeout(timer));
  preview.addEventListener("pointerleave", event => {
    if (!activeCard?.contains(event.relatedTarget) && !activeCard?.matches(":focus-visible")) scheduleClose();
  });
  main.addEventListener("focusin", event => {
    if (event.target.matches(".film-card:focus-visible")) show(event.target, 0);
  });
  main.addEventListener("focusout", event => {
    if (event.target === activeCard && !activeCard.matches(":hover") && !preview.matches(":hover")) close();
  });
  window.addEventListener("scroll", () => {
    if (!preview.hidden && activeCard.matches(":focus-visible")) position(activeCard);
    else close();
  }, { capture: true, passive: true });
  window.addEventListener("resize", close);
  return close;
}

function heroArtStyle(film) {
  const art = film.heroBackdrop ?? backdropOf(film);
  const focus = film.heroFocus ?? film.focus ?? "center 40%";
  const mobileCrop = film.heroMobileCrop ? `;--art-mobile-crop:${film.heroMobileCrop}` : "";
  return `--art:url('${art}');--art-focus:${focus}${mobileCrop}`;
}

function hero() {
  return `<div class="hero-art" style="${heroArtStyle(featured[heroIndex])}"></div>
    <div class="frame hero-inner">
      <div class="hero-slides">
        ${featured.map((film, index) => `<div class="hero-copy"${index === heroIndex ? "" : " inert"}>
          <div class="featured-label">${bi("PHIM NỔI BẬT", "FEATURED TITLE")}</div>
          <h1>${film.title}</h1>
          <div class="film-meta">${film.score == null ? "" : `<span class="meta-score" title="${film.publisher}">${icon("star", 16)} ${scoreText(film.score)}</span>`}<span>${film.year}</span><span>${film.genres.map(genreLabel).join(", ")}</span><span>${film.episodeCount > 1 ? episodeCount(film.episodeCount) : minutesLabel(film.minutes)}</span></div>
          <p>${film.description}</p>
          <div class="actions"><a class="button primary" href="${routeToFilm(film)}">${icon("info", 19)}${bi("Chi tiết", "Details")}</a>
            <button class="button translucent" type="button" data-action="trailer" data-film="${film.id}">${icon("trailer", 19)}${bi("Xem trailer", "Watch trailer")}</button></div>
        </div>`).join("")}
      </div>
      <div class="hero-controls">
        <div class="carousel-dots" aria-label="${bi("Chọn phim nổi bật", "Select a featured title")}">${featured.map((item, index) => `<button type="button" data-action="hero-select" data-index="${index}" aria-label="${item.title}" aria-pressed="${index === heroIndex}"><span></span></button>`).join("")}</div>
        <div class="hero-arrows">${iconButton("left", bi("Phim nổi bật trước", "Previous featured title"), 'data-action="hero-prev"')}${iconButton("right", bi("Phim nổi bật tiếp theo", "Next featured title"), 'data-action="hero-next"')}</div>
      </div>
    </div>`;
}

function bindHeroTitles(section, signal) {
  const titles = section.querySelectorAll(".hero-copy h1");

  function fitTitles() {
    for (const title of titles) {
      title.style.fontSize = "";
      const fitsTwoLines = () => title.offsetHeight <= 2 * parseFloat(getComputedStyle(title).lineHeight) + 1;
      if (fitsTwoLines()) continue;

      const defaultSize = parseFloat(getComputedStyle(title).fontSize);
      let min = Math.ceil(defaultSize * 0.8);
      let max = Math.floor(defaultSize);
      while (min < max) {
        const size = Math.ceil((min + max) / 2);
        title.style.fontSize = `${size}px`;
        if (fitsTwoLines()) min = size;
        else max = size - 1;
      }
      title.style.fontSize = `${min}px`;
    }
  }

  fitTitles();
  window.addEventListener("resize", fitTitles, { signal });
  document.fonts.ready.then(() => {
    if (!signal.aborted) fitTitles();
  });
}

const rankingCriterion = () => bi("Xếp theo thời điểm phát hành trong danh mục", "Ranked by release date in the catalogue");

function homePage() {
  return `<section class="hero" id="hero" aria-roledescription="${bi("băng chuyền", "carousel")}">${hero()}</section>
    <div class="frame home-rows">${homeRows.map((row, index) => `<section class="shelf" aria-labelledby="shelf-title-${index}">
      <div class="shelf-head">
        <div><h2 id="shelf-title-${index}">${bi(row.title, row.english)}</h2>
          ${row.params.collection === "top10" ? `<p class="shelf-caption">${rankingCriterion()}</p>` : ""}</div>
        <div class="shelf-tools"><a href="${escapeHtml(catalogUrl(row.params))}" aria-label="${bi("Xem tất cả", "View all")} · ${bi(row.title, row.english)}">${bi("Xem tất cả", "View all")} ${icon("arrow", 15)}</a>
        <div class="shelf-arrows">${iconButton("left", bi("Cuộn sang trái", "Scroll left"), 'data-action="shelf-prev"')}${iconButton("right", bi("Cuộn sang phải", "Scroll right"), 'data-action="shelf-next"')}</div></div>
      </div>
      <div class="film-strip">${row.items.map(film => filmCard(film, {
        badge: film.episodes ? episodeCount(film.episodeCount) : "",
        rank: row.params.collection === "top10" ? recentRanks.get(film.id) : undefined,
      })).join("")}</div>
    </section>`).join("")}</div>`;
}

function selectField(name, label, options, selected, extra = "") {
  return `<label class="select-field"><span>${label}</span><select name="${name}" ${extra}>${options.map(([value, text]) => `<option value="${escapeHtml(value)}" ${String(value) === String(selected) ? "selected" : ""}>${escapeHtml(text)}</option>`).join("")}</select></label>`;
}

function pageTitle(title, subtitle = "") {
  return `<div class="page-title"><h1>${title}</h1>${subtitle ? `<p>${subtitle}</p>` : ""}</div>`;
}

function emptyState(glyph, title, subtitle, href, label) {
  return `<div class="empty-state"><span class="empty-icon">${icon(glyph, 27)}</span><h2>${title}</h2><p>${subtitle}</p>${href ? `<a class="button secondary" href="${escapeHtml(href)}">${label} ${icon("arrow", 16)}</a>` : ""}</div>`;
}

function catalogPage(params) {
  const keys = ["q", "type", "genre", "year", "country", "score", "sort", "collection"];
  const filter = Object.fromEntries(keys.map(key => [key, params.get(key) ?? ""]));
  const { q, type, genre, year, country, score, sort, collection } = filter;
  const ranked = collection === "top10";
  const candidates = ranked ? recentTop : collection === "theatrical" ? theatricalFilms : films;
  const results = candidates.filter(film => (
    (!q || matches(q, film)) &&
    (!type || (film.episodeCount > 1 ? "series" : "movie") === type) &&
    (!genre || film.genres.includes(genre)) &&
    (!year || String(film.year) === year) &&
    (!country || film.country === country) &&
    (!score || (film.score != null && film.score >= Number(score))) &&
    (sort !== "score" || film.score != null) &&
    (sort !== "picks" || selections.includes(film.id))
  ));
  if (sort === "score") results.sort((a, b) => b.score - a.score);
  else if (sort === "new") results.sort(compareRelease);
  else if (sort === "picks") results.sort((a, b) => selections.indexOf(a.id) - selections.indexOf(b.id));
  else if (q) results.sort((a, b) => Number(normalize(b.title).startsWith(normalize(q))) - Number(normalize(a.title).startsWith(normalize(q))));

  const row = homeRows.find(({ params: rowParams }) => collection
    ? rowParams.collection === collection
    : country && rowParams.country === country);
  const categoryTitle = row && bi(row.title, row.english);
  const resultCount = bi(`${results.length} kết quả`, `${results.length} results`);
  const subtitle = ranked ? `${resultCount} · ${rankingCriterion()}` : resultCount;
  const title = q ? bi(`Kết quả cho “${escapeHtml(q)}”`, `Results for “${escapeHtml(q)}”`)
    : categoryTitle ||
    (type === "movie" ? bi("Phim lẻ", "Movies") : type === "series" ? bi("Phim bộ", "Series") : (
      !genre && sort === "picks" ? bi("Rạp Nhà tuyển chọn", "Rạp Nhà picks")
        : !genre && sort === "score" ? bi("Điểm cao từ nhà phát hành", "Top distributor ratings")
          : !genre && sort === "new" ? bi("Phim phát hành gần đây", "Recent releases")
            : bi("Khám phá phim", "Discover films")
    ));
  const all = bi("Tất cả", "All");
  const defaultSort = ranked ? bi("Theo thứ hạng", "Rank order")
    : collection === "theatrical" ? bi("Theo ngày phát hành", "Release date") : bi("Độ liên quan", "Relevance");
  const options = (list, label = item => item) => [["", all], ...list.map(item => [item, label(item)])];
  const active = [["genre", genreLabel(genre)], ["year", year], ["country", countryLabel(country)], ["score", score && `≥ ${score} / 10`]].filter(([, value]) => value);

  return `<div class="frame inner-page">
    <div class="crumb"><a href="#/">${bi("Trang chủ", "Home")}</a>${icon("right", 14)}<span>${q ? bi("Tìm kiếm", "Search") : bi("Khám phá", "Discover")}</span></div>
    ${pageTitle(title, subtitle)}
    <section class="filter-panel" aria-label="${bi("Bộ lọc phim", "Film filters")}">
      <form id="filter-form">
        <input type="hidden" name="q" value="${escapeHtml(q)}">
        <input type="hidden" name="collection" value="${escapeHtml(collection)}">
        ${selectField("type", bi("Loại phim", "Type"), [["", all], ["movie", bi("Phim lẻ", "Movies")], ["series", bi("Phim bộ", "Series")]], type)}
        ${selectField("genre", bi("Thể loại", "Genre"), options(genres, genreLabel), genre)}
        ${selectField("year", bi("Năm phát hành", "Release year"), options(years), year)}
        ${selectField("country", bi("Quốc gia", "Country"), options(countries, countryLabel), country)}
        ${selectField("score", bi("Điểm đánh giá", "Rating"), [["", all], ["7", "7+"], ["8", "8+"], ["8.5", "8.5+"]], score)}
        ${selectField("sort", bi("Sắp xếp", "Sort by"), [["", defaultSort], ["new", bi("Mới phát hành", "Recent releases")], ["score", bi("Điểm từ nhà phát hành", "Distributor ratings")], ["picks", bi("Rạp Nhà tuyển chọn", "Rạp Nhà picks")]], sort)}
      </form>
      ${active.length ? `<div class="filter-tags">${active.map(([key, value]) => `<a class="chip" aria-label="${bi("Bỏ bộ lọc", "Remove filter")} ${escapeHtml(value)}" href="${escapeHtml(catalogUrl({ ...filter, [key]: "" }))}">${escapeHtml(value)} ${icon("x", 14)}</a>`).join("")}
        <a class="filter-reset" href="${escapeHtml(catalogUrl({ q, type, sort, collection }))}">${bi("Xóa bộ lọc", "Clear filters")}</a></div>` : ""}
    </section>
    ${results.length ? `<div class="film-grid">${results.map(film => filmCard(film, { rank: ranked ? recentRanks.get(film.id) : undefined })).join("")}</div>`
      : emptyState("search", bi("Chưa tìm thấy phim", "No films found"), bi("Thử một tên phim khác hoặc giảm số bộ lọc.", "Try another film title or fewer filters."), catalogUrl(), bi("Khám phá tất cả phim", "Browse all films"))}
  </div>`;
}

const accountKey = kind => `${kind}.${user?.email ?? "guest"}`;
function catalogRecords(kind, demoRecords) {
  const fallback = user?.email === demoUser.email ? demoRecords : [];
  const records = read(accountKey(kind), fallback);
  const current = records.filter(item => filmById[item.id]);
  return current.length || !records.length ? current : fallback;
}
const follows = () => catalogRecords("follow", demoFollows);
const watchHistory = () => catalogRecords("history", demoHistory);
const watching = (film, episode) => watchHistory().find(item => item.id === film.id && item.episode === episode);
const isFollowing = film => follows().some(item => item.id === film.id);
const progressText = progress => `${Math.round(progress * 100)}%`;
const external = 'target="_blank" rel="noopener noreferrer"';

function filmCrumb(film, player = false) {
  return `<div class="crumb"><a href="#/">${bi("Trang chủ", "Home")}</a>${icon("right", 14)}<a href="${escapeHtml(catalogUrl({ type: film.episodeCount > 1 ? "series" : "movie" }))}">${typeOf(film)}</a>${icon("right", 14)}
    ${player ? `<a href="${routeToFilm(film)}">${film.title}</a>` : `<span>${film.title}</span>`}</div>`;
}

function filmStats(film) {
  const entries = [
    [bi("Thể loại", "Genre"), film.genres.map(genreLabel).join(", ")],
    [bi("Quốc gia", "Country"), countryLabel(film.country)],
    film.episodes ? [bi("Số tập", "Episodes"), episodeCount(film.episodeCount)] : [bi("Thời lượng", "Runtime"), minutesLabel(film.minutes)],
    ...(film.director ? [[bi("Đạo diễn", "Director"), film.director]] : []),
    ...(film.cast ? [[bi("Diễn viên", "Cast"), film.cast]] : []),
  ];
  return `<dl class="film-stats">${entries.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}</dl>`;
}

function episodeList(film, current = null, selectedPart) {
  const partIndex = selectedPart ?? Math.max(0, film.parts.findIndex(part => current >= part.first && current <= part.last));
  const { first, last } = film.parts[partIndex];
  const partLabel = index => bi(`Phần ${index + 1}`, `Part ${index + 1}`);
  const summary = current
    ? bi(`Tập đang chọn ${current}/${film.episodeCount}`, `Selected episode ${current} of ${film.episodeCount}`)
    : episodeCount(film.episodeCount);
  return `<section class="episode-section" aria-labelledby="episode-title">
    <div class="episode-head"><div><h2 id="episode-title">${bi("Danh sách tập", "Episodes")}</h2><p>${summary}</p></div>
    ${film.parts.length > 1 ? `<select id="episode-part" aria-label="${bi("Chọn phần", "Choose part")}">${videoOptions(film.parts.map((_, index) => [index, partLabel(index)]), partIndex)}</select>` : `<span class="season-label">${partLabel(0)}</span>`}</div>
    <div class="episode-grid">${Array.from({ length: last - first + 1 }, (_, index) => {
      const number = first + index;
      const progress = watching(film, number)?.progress ?? 0;
      return `<a class="episode-card" href="${routeToPlayer(film, number)}" ${current === number ? 'aria-current="page"' : ""}>
        <div class="episode-art"><img src="${episodeArt(film, number)}" alt="" loading="lazy"><span>${episodeLabel(number)}</span>${icon("play", 23)}</div>
        <div class="episode-copy"><strong>${episodeTitle(film, number)}</strong>${episodeMinutes(film, number) ? `<small>${minutesLabel(episodeMinutes(film, number))}</small>` : ""}
          ${progress > 0 ? `<progress value="${progress}" max="1" aria-label="${bi("Tiến độ xem", "Watch progress")}"></progress>` : ""}</div>
      </a>`;
    }).join("")}</div>
  </section>`;
}

function detailPage(film) {
  const saved = isFollowing(film);
  const recent = watchHistory().find(item => item.id === film.id && Number.isFinite(item.progress) && item.progress < .98);
  const playLabel = recent ? bi("Xem tiếp", "Resume")
    : film.episodes ? bi("Xem tập 1", "Watch episode 1") : bi("Xem phim", "Watch film");
  return `<section class="film-detail" style="--art:url('${backdropOf(film)}');--art-focus:${film.focus ?? "center 40%"}">
    <div class="frame">${filmCrumb(film)}
      <div class="detail-layout"><img class="detail-poster" src="${film.poster}" alt="Poster · ${film.title}" width="252" height="339">
        <div class="detail-copy">
          <span class="type-label">${typeOf(film)}</span><h1>${film.title}</h1>
          ${film.original ? `<p class="original-title">${film.original}</p>` : ""}
          <div class="film-meta">${film.score == null ? "" : `<span class="meta-score" title="${film.publisher}">${icon("star", 16)} ${scoreText(film.score)} / 10</span>`}<span>${film.year}</span><span>${film.episodes ? episodeCount(film.episodeCount) : minutesLabel(film.minutes)}</span></div>
          <p class="detail-description">${film.description}</p>
          ${filmStats(film)}
          <div class="actions"><a class="button primary" href="${routeToPlayer(film, recent?.episode)}">${icon("play", 22)}${playLabel}</a>
            <button class="button secondary" type="button" data-action="trailer" data-film="${film.id}">${icon("trailer", 20)} Trailer</button>
            <button class="button secondary follow-button" type="button" data-action="follow" data-film="${film.id}" aria-pressed="${saved}">${icon(saved ? "check" : "bookmark", 18)}${bi("Theo dõi", "Watchlist")}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="frame detail-sections">
    ${film.episodeCount > 1 ? episodeList(film) : `<section class="trailer-section">
      <div><h2>Trailer</h2><p>${film.trailerPublisher ?? film.publisher}</p></div>
      <button type="button" class="trailer-preview" data-action="trailer" data-film="${film.id}" aria-label="${bi("Phát trailer", "Play trailer")} · ${film.title}">
        <img src="${backdropOf(film)}" alt="" loading="lazy"><span>${icon("play", 32)}</span>
      </button>
    </section>`}
  </div>`;
}

const videoOptions = (options, value) => options.map(([id, name]) => `<option value="${id}" ${id === value ? "selected" : ""}>${name}</option>`).join("");

function trailerPanel(film) {
  const publisher = film.trailerPublisher ?? film.publisher;
  return `<div class="official-trailer">
    <iframe src="https://www.youtube-nocookie.com/embed/${film.youtube}" title="Trailer · ${film.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <a class="source-link" href="https://www.youtube.com/watch?v=${film.youtube}" ${external}>${bi("Mở trên YouTube", "Open on YouTube")} · ${publisher} ${icon("arrow", 14)}</a>
  </div>`;
}

function videoPlayer(film, episode) {
  const playLabel = bi("Phát", "Play");
  return `<div class="player" data-player="${episode}" role="group" aria-label="${bi("Trình phát mô phỏng", "Demo player")}">
    <img class="player-still" src="${playerArt(film, episode)}" width="1920" height="1080" alt="" draggable="false">
    <span class="player-demo-label">${bi("Mô phỏng bằng ảnh tĩnh", "Still-image demo")}</span>
    <button class="player-big-play" type="button" data-video="play" aria-label="${playLabel}">${icon("play", 42)}</button>
    <div class="video-controls">
      <label class="seek-control"><span class="sr-only">${bi("Vị trí phát", "Seek position")}</span><input type="range" data-video="seek" min="0" max="1000" value="0"></label>
      <div class="video-buttons">
        <div>
          ${episode > 1 ? `<a class="icon-button prev-video" href="${routeToPlayer(film, episode - 1)}" aria-label="${bi("Tập trước", "Previous episode")}" title="${bi("Tập trước", "Previous episode")}">${icon("skip")}</a>` : ""}
          ${iconButton("play", playLabel, 'data-video="play"')}
          ${episode < film.episodeCount ? `<a class="icon-button" href="${routeToPlayer(film, episode + 1)}" aria-label="${bi("Tập sau", "Next episode")}" title="${bi("Tập sau", "Next episode")}">${icon("skip")}</a>` : ""}
          <span class="video-time" data-time></span>
        </div>
        <div>
          ${iconButton("volume", bi("Tắt tiếng", "Mute"), 'data-video="mute"')}
          <label class="volume-control"><span class="sr-only">${bi("Âm lượng", "Volume")}</span><input type="range" data-video="volume" min="0" max="1" step="0.05" value="1"></label>
          ${iconButton("fullscreen", bi("Toàn màn hình", "Fullscreen"), 'data-video="fullscreen"')}
        </div>
      </div>
    </div>
  </div>`;
}

function playerPage(film, current) {
  return `<div class="frame inner-page watch-page">
    ${filmCrumb(film, true)}
    ${videoPlayer(film, current)}
    <div class="watch-heading">
      <div><div class="type-label">${film.episodes ? episodeLabel(current) : typeOf(film)}</div><h1>${film.title}</h1>
        <p>${film.episodes ? `${episodeTitle(film, current)} · ` : ""}${minutesLabel(episodeMinutes(film, current))}${film.id === "tears-of-steel" ? " · © Blender Foundation · CC BY 3.0" : ""}</p></div>
      <div class="actions">
        <button class="button secondary" type="button" data-action="trailer" data-film="${film.id}">${icon("trailer", 18)} Trailer</button>
        ${current > 1 ? `<a class="button secondary" href="${routeToPlayer(film, current - 1)}">${icon("left", 17)}${bi("Tập trước", "Previous episode")}</a>` : ""}
        ${current < film.episodeCount ? `<a class="button secondary" href="${routeToPlayer(film, current + 1)}">${bi("Tập tiếp theo", "Next episode")}${icon("right", 17)}</a>` : ""}
      </div>
    </div>
    ${film.episodes ? episodeList(film, current) : ""}
  </div>`;
}

const videoTime = seconds => {
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = String(Math.floor(total / 60) % 60).padStart(2, "0");
  const remainder = String(total % 60).padStart(2, "0");
  return hours ? `${hours}:${minutes}:${remainder}` : `${minutes}:${remainder}`;
};

function bindPlayer(container, film, episode) {
  const seek = container.querySelector("[data-video=seek]");
  const time = container.querySelector("[data-time]");
  const controls = container.querySelector(".video-controls");
  const play = controls.querySelector("[data-video=play]");
  const mute = controls.querySelector("[data-video=mute]");
  const volume = controls.querySelector("[data-video=volume]");
  const fullscreen = controls.querySelector("[data-video=fullscreen]");
  const events = new AbortController();
  const options = { signal: events.signal };
  const duration = episodeMinutes(film, episode) * 60;
  const previousProgress = watching(film, episode)?.progress ?? 0;
  const historyKey = accountKey("history");
  const initialHistory = watchHistory();
  let elapsed = previousProgress > 0 && previousProgress < .98 ? duration * previousProgress : 0;
  let lastTick = 0;
  let lastSave = 0;
  let timer;
  let interacted = false;
  let savedVolume = Number(read("volume", 1));
  volume.value = savedVolume;

  function syncTime() {
    const ratio = elapsed / duration;
    seek.value = Math.round(ratio * 1000);
    seek.style.setProperty("--played", `${ratio * 100}%`);
    seek.setAttribute("aria-valuetext", `${videoTime(elapsed)} / ${videoTime(duration)}`);
    time.textContent = seek.getAttribute("aria-valuetext");
  }

  function saveProgress(force = false) {
    if (!interacted || (!force && Date.now() - lastSave < 1000)) return;
    lastSave = Date.now();
    const progress = elapsed / duration;
    const records = read(historyKey, initialHistory).filter(item => filmById[item.id] && (item.id !== film.id || item.episode !== episode));
    write(historyKey, [{ id: film.id, episode, progress, viewed: now() }, ...records].slice(0, 100));
    const currentCard = main.querySelector(".episode-card[aria-current]");
    if (!currentCard) return;
    let bar = currentCard.querySelector("progress");
    if (!bar) {
      bar = document.createElement("progress");
      bar.max = 1;
      bar.setAttribute("aria-label", bi("Tiến độ xem", "Watch progress"));
      currentCard.querySelector(".episode-copy").append(bar);
    }
    bar.value = progress;
  }

  function updateButton(button, symbol, label) {
    button.innerHTML = icon(symbol);
    button.title = label;
    button.setAttribute("aria-label", label);
  }

  function syncPlay() {
    const playing = timer !== undefined;
    container.classList.toggle("is-playing", playing);
    updateButton(play, playing ? "pause" : "play", playing ? bi("Tạm dừng", "Pause") : bi("Phát", "Play"));
  }

  function syncVolume() {
    const muted = Number(volume.value) === 0;
    updateButton(mute, muted ? "mute" : "volume", muted ? bi("Bật tiếng", "Unmute") : bi("Tắt tiếng", "Mute"));
  }

  function pause() {
    clearInterval(timer);
    timer = undefined;
    saveProgress(true);
    syncPlay();
  }

  function tick() {
    const now = performance.now();
    elapsed = Math.min(duration, elapsed + (now - lastTick) / 1000);
    lastTick = now;
    syncTime();
    if (elapsed < duration) {
      saveProgress();
      return;
    }
    pause();
    if (settings.autoplay && episode < film.episodeCount) {
      autoplayRoute = routeToPlayer(film, episode + 1);
      go(autoplayRoute);
    }
  }

  function start() {
    interacted = true;
    if (elapsed >= duration) elapsed = 0;
    lastTick = performance.now();
    timer = setInterval(tick, 200);
    syncTime();
    syncPlay();
  }

  function expanded() {
    return document.fullscreenElement === container || container.classList.contains("is-expanded");
  }

  function syncFullscreen() {
    updateButton(fullscreen, "fullscreen", expanded() ? bi("Thoát toàn màn hình", "Exit fullscreen") : bi("Toàn màn hình", "Fullscreen"));
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement === container) {
      await document.exitFullscreen().catch(() => {});
    } else if (container.classList.contains("is-expanded")) {
      container.classList.remove("is-expanded");
    } else {
      try {
        await container.requestFullscreen();
      } catch {
        if (container.isConnected) container.classList.add("is-expanded");
      }
    }
    syncFullscreen();
  }

  container.addEventListener("click", event => {
    const control = event.target.closest("[data-video]");
    const action = control?.dataset.video ?? (event.target.matches(".player-still") ? "play" : "");
    if (action === "play") {
      if (timer === undefined) {
        start();
        if (control?.classList.contains("player-big-play")) play.focus({ preventScroll: true });
      } else pause();
    } else if (action === "mute") {
      volume.value = Number(volume.value) === 0 ? savedVolume || .6 : 0;
      syncVolume();
    } else if (action === "fullscreen") toggleFullscreen();
  }, options);

  container.addEventListener("input", event => {
    if (event.target === seek) {
      interacted = true;
      elapsed = duration * Number(seek.value) / 1000;
      lastTick = performance.now();
      syncTime();
    } else if (event.target === volume) {
      if (Number(volume.value) > 0) savedVolume = Number(volume.value);
      write("volume", Number(volume.value));
      syncVolume();
    }
  }, options);
  seek.addEventListener("change", () => saveProgress(true), options);
  document.addEventListener("fullscreenchange", syncFullscreen, options);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && container.classList.contains("is-expanded")) toggleFullscreen();
  }, options);
  window.addEventListener("pagehide", pause, options);

  syncTime();
  syncVolume();
  if (autoplayRoute === location.hash) start();
  autoplayRoute = "";
  return () => {
    pause();
    events.abort();
  };
}
let autoplayRoute = "";

function openTrailer(film, trigger) {
  trailerTrigger = trigger;
  trailer.innerHTML = `<div class="dialog-head"><div><h2 id="trailer-title">Trailer · ${film.title}</h2><p>${film.trailerPublisher ?? film.publisher}</p></div>
    <form method="dialog">${iconButton("x", bi("Đóng trailer", "Close trailer")).replace('type="button"', 'type="submit"')}</form></div>${trailerPanel(film)}`;
  trailer.setAttribute("aria-labelledby", "trailer-title");
  trailer.showModal();
}

function showRecoveryResult({ title, message, success = false, input }) {
  const hash = location.hash;
  resultDialog.dataset.outcome = success ? "success" : "failure";
  resultDialog.innerHTML = `<form method="dialog">
    <button class="icon-button result-close" type="submit" aria-label="${bi("Đóng hộp thoại", "Close dialog")}">${icon("x")}</button>
    <span class="result-icon">${icon(success ? "check" : "info", 28)}</span>
    <h2 id="result-title">${escapeHtml(title)}</h2>
    <p id="result-message">${escapeHtml(message)}</p>
    <button class="button primary full" type="submit" autofocus>${success ? bi("Về đăng nhập", "Back to sign in") : bi("Thử lại", "Try again")}</button>
  </form>`;
  resultDialog.addEventListener("close", () => {
    if (location.hash !== hash) return;
    if (success) go("#/dang-nhap");
    else input?.focus();
  }, { once: true });
  resultDialog.showModal();
}

function loadingPage(message = "") {
  return `<section class="loading-stage" aria-labelledby="loading-title">
    <div class="loading-content">
      <span class="loading-mark" aria-hidden="true"><img src="assets/icon.svg" alt="" width="41" height="41"></span>
      <h1 id="loading-title" tabindex="-1">${bi("Đang tải", "Loading")}</h1>
      <p role="status">${escapeHtml(message || bi("Màn hình hiển thị khi Rạp Nhà đang xử lý yêu cầu tài khoản.", "This screen appears while Rạp Nhà processes an account request."))}</p>
      ${message ? "" : `<a class="button secondary" href="#/dang-nhap">${bi("Quay lại đăng nhập", "Back to sign in")}</a>`}
    </div>
  </section>`;
}

function field(name, label, options = {}) {
  const { type = "text", value = "", autocomplete = "", placeholder = "", min = "", max = 100, required = true } = options;
  return `<div class="form-field"><label for="field-${name}">${label}</label><div class="field-wrap">
    <input name="${name}" id="field-${name}" type="${type}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" ${autocomplete ? `autocomplete="${autocomplete}"` : ""} ${min ? `minlength="${min}"` : ""} maxlength="${max}" ${required ? "required" : ""}>
    ${type === "password" ? iconButton("eye", bi("Hiện mật khẩu", "Show password"), `data-action="password" aria-controls="field-${name}" aria-pressed="false"`) : ""}
  </div></div>`;
}

function authPage(kind) {
  const register = kind === "dang-ky";
  const name = register ? bi("Đăng ký", "Create account") : bi("Đăng nhập", "Sign in");
  return `<section class="auth-stage"><div class="auth-card">
    <span class="auth-icon">${icon(register ? "movie" : "user", 25)}</span>
    ${pageTitle(name, register ? bi("Tạo tài khoản để lưu phim và xem tiếp bất cứ lúc nào.", "Create an account to save films and keep watching.") : bi("Tiếp tục hành trình xem phim của bạn.", "Continue watching your favourite films."))}
    <form id="auth-form" data-kind="${kind}">
      ${register ? field("name", bi("Tên hiển thị", "Display name"), { value: draft?.name, autocomplete: "nickname", placeholder: "Minh An", max: 45 }) : ""}
      ${field("email", "Email", { type: "email", value: register ? draft?.email : signInEmail, autocomplete: "email", placeholder: "ban@example.com" })}
      ${field("password", bi("Mật khẩu", "Password"), { type: "password", autocomplete: register ? "new-password" : "current-password", min: register ? 8 : "", placeholder: register ? bi("Tối thiểu 8 ký tự", "At least 8 characters") : bi("Nhập mật khẩu", "Enter your password") })}
      ${register ? field("confirm", bi("Nhập lại mật khẩu", "Confirm password"), { type: "password", autocomplete: "new-password", min: 8, placeholder: bi("Nhập lại mật khẩu", "Re-enter your password") }) : ""}
      ${register ? "" : `<div class="auth-forgot"><a href="#/quen-mat-khau" data-action="forgot">${bi("Quên mật khẩu?", "Forgot password?")}</a></div>`}
      <p class="form-error" role="alert" hidden></p>
      <button class="button primary full" type="submit">${register ? bi("Tiếp tục", "Continue") : name} ${icon("arrow", 17)}</button>
    </form>
    ${register ? "" : `<div class="auth-divider">${bi("hoặc", "or")}</div><button class="button secondary full" type="button" data-action="demo">${icon("user", 17)}${bi("Dùng tài khoản mẫu", "Use demo account")}</button>`}
    <p class="auth-alt">${register ? bi("Đã có tài khoản?", "Already have an account?") : bi("Chưa có tài khoản?", "New to Rạp Nhà?")} <a href="${register ? "#/dang-nhap" : "#/dang-ky"}">${register ? bi("Đăng nhập", "Sign in") : bi("Đăng ký", "Create an account")}</a></p>
  </div></section>`;
}

function forgotPasswordPage() {
  return `<section class="auth-stage"><div class="auth-card">
    <a class="inline-back" href="#/dang-nhap">${icon("back", 17)}${bi("Quay lại đăng nhập", "Back to sign in")}</a>
    <span class="auth-icon">${icon("lock", 25)}</span>
    ${pageTitle(bi("Quên mật khẩu", "Forgot password"), bi("Nhập email tài khoản để lấy mã xác nhận dùng thử.", "Enter your account email to get a demo verification code."))}
    <form id="recovery-form">
      ${field("email", "Email", { type: "email", value: recovery?.email ?? signInEmail, autocomplete: "email", placeholder: "ban@example.com" })}
      <button class="button primary full" type="submit">${bi("Lấy mã xác nhận", "Get verification code")}</button>
      <p class="auth-alt">${bi("Muốn thử nhanh?", "Just trying it out?")} <button class="text-button" type="button" data-action="recovery-demo">${bi("Dùng email mẫu", "Use demo email")}</button></p>
    </form>
  </div></section>`;
}

function resetPasswordPage() {
  if (!recovery?.verified) return `<div class="frame inner-page">${emptyState("lock", bi("Đặt lại mật khẩu", "Reset password"), bi("Hãy xác nhận mã OTP trước khi đặt mật khẩu mới.", "Verify your code before setting a new password."), "#/quen-mat-khau", bi("Quay lại quên mật khẩu", "Back to password recovery"))}</div>`;
  return `<section class="auth-stage"><div class="auth-card">
    <a class="inline-back" href="#/quen-mat-khau/xac-nhan">${icon("back", 17)}${bi("Quay lại xác nhận", "Back to verification")}</a>
    <span class="auth-icon">${icon("lock", 25)}</span>
    ${pageTitle(bi("Đặt lại mật khẩu", "Reset password"), bi("Tạo mật khẩu mới cho", "Create a new password for") + ` <strong>${escapeHtml(recovery.email)}</strong>.`)}
    <form id="reset-password-form">
      ${field("password", bi("Mật khẩu mới", "New password"), { type: "password", autocomplete: "new-password", min: 8, placeholder: bi("Tối thiểu 8 ký tự", "At least 8 characters") })}
      ${field("confirm", bi("Nhập lại mật khẩu", "Confirm password"), { type: "password", autocomplete: "new-password", min: 8, placeholder: bi("Nhập lại mật khẩu mới", "Re-enter your new password") })}
      <p class="form-error" role="alert" hidden></p>
      <button class="button primary full" type="submit">${bi("Đặt lại mật khẩu", "Reset password")}</button>
    </form>
  </div></section>`;
}

function otpPage(challenge, recovering) {
  const title = bi("Xác nhận OTP", "Confirm your code");
  const back = recovering ? "#/quen-mat-khau" : "#/dang-ky";
  const backLabel = recovering ? bi("Đổi email", "Change email") : bi("Quay lại đăng ký", "Back to registration");
  if (!challenge) {
    const message = recovering
      ? bi("Nhập email ở trang Quên mật khẩu để lấy mã xác nhận mẫu.", "Enter your email on the password recovery page to get a demo code.")
      : bi("Hãy điền thông tin đăng ký để nhận mã xác nhận mẫu.", "Complete the registration form to get a demo verification code.");
    return `<div class="frame inner-page">${emptyState("mail", title, message, back, backLabel)}</div>`;
  }
  const message = recovering
    ? bi("Nhập mã 6 chữ số để đặt lại mật khẩu cho", "Enter the 6-digit code to reset the password for")
    : bi("Nhập mã 6 chữ số để xác nhận email", "Enter the 6-digit code to verify");
  return `<section class="auth-stage"><div class="auth-card">
    <a class="inline-back" href="${back}">${icon("back", 17)}${backLabel}</a>
    <span class="auth-icon">${icon("mail", 25)}</span>
    ${pageTitle(title, message + ` <strong>${escapeHtml(challenge.email)}</strong>.`)}
    <form id="otp-form" data-purpose="${recovering ? "recovery" : "registration"}">
      <div class="form-field"><label for="otp">${bi("Mã xác nhận", "Verification code")}</label><input name="otp" id="otp" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" placeholder="000000" required></div>
      <p class="demo-note">${bi("Mã OTP dùng thử", "Demo verification code")} <strong>${demoOtp}</strong></p>
      ${recovering ? "" : '<p class="form-error" role="alert" hidden></p>'}
      <button class="button primary full" type="submit">${bi("Xác nhận", "Confirm")} ${icon("arrow", 17)}</button>
    </form>
    <button class="text-button resend" type="button" data-action="resend">${bi("Gửi lại mã", "Resend code")}</button>
  </div></section>`;
}

function updateResend(challenge) {
  const button = main.querySelector("[data-action=resend]");
  if (!button || !challenge) return;
  const remaining = Math.max(0, Math.ceil((challenge.resendAt - Date.now()) / 1000));
  button.disabled = remaining > 0;
  button.textContent = remaining ? bi(`Gửi lại mã sau 00:${String(remaining).padStart(2, "0")}`, `Resend code in ${remaining}s`) : bi("Gửi lại mã", "Resend code");
}

async function digest(password, salt) {
  const bytes = new TextEncoder().encode(password);
  const key = await crypto.subtle.importKey("raw", bytes, "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: new TextEncoder().encode(salt), iterations: 120000 }, key, 256);
  return Array.from(new Uint8Array(bits), num => num.toString(16).padStart(2, "0")).join("");
}

async function passwordRecord(password) {
  const salt = crypto.randomUUID();
  return { salt, hash: await digest(password, salt) };
}

function formError(form, message) {
  const error = form.querySelector(".form-error");
  error.textContent = message;
  error.hidden = !message;
}

function finishSignIn(account) {
  const guestHistory = user ? [] : watchHistory();
  const previous = returnTo;
  const follow = pendingFollow && filmById[pendingFollow];
  user = { name: account.name, email: account.email, since: account.since };
  write("session", user);
  if (guestHistory.length) {
    const history = watchHistory();
    const existing = new Set(history.map(item => `${item.id}/${item.episode}`));
    write(accountKey("history"), [...history, ...guestHistory.filter(item => !existing.has(`${item.id}/${item.episode}`))]
      .sort((a, b) => b.viewed.localeCompare(a.viewed)).slice(0, 100));
    write("history.guest", []);
  }
  if (follow && !isFollowing(follow)) write(accountKey("follow"), [{ id: follow.id, added: now() }, ...follows()]);
  returnTo = "";
  pendingFollow = "";
  draft = undefined;
  signInEmail = "";
  go(previous || "#/");
  notify(follow ? bi("Đã thêm vào danh sách theo dõi.", "Added to your watchlist.") : bi(`Xin chào, ${user.name}!`, `Hello, ${user.name}!`));
}

async function submitAuth(form) {
  const data = new FormData(form);
  const email = normalizeEmail(data.get("email"));
  const password = String(data.get("password"));
  const submit = form.querySelector("[type=submit]");
  submit.disabled = true;
  formError(form, "");
  try {
    if (form.dataset.kind === "dang-ky") {
      const name = String(data.get("name")).trim();
      if (name.length < 2) return formError(form, bi("Tên hiển thị cần ít nhất 2 ký tự.", "Use at least 2 characters for your display name."));
      if (password !== data.get("confirm")) return formError(form, bi("Mật khẩu nhập lại chưa khớp.", "Passwords do not match."));
      if (email === demoUser.email || read(`account.${email}`, null)) return formError(form, bi("Email này đã được dùng trên trình duyệt này.", "This email is already registered in this browser."));
      const credentials = await passwordRecord(password);
      if (!form.isConnected) return;
      draft = { name, email, ...credentials, resendAt: Date.now() + 30000 };
      go("#/otp");
    } else {
      const account = read(`account.${email}`, null);
      if (!account || await digest(password, account.salt) !== account.hash) return formError(form, bi("Email hoặc mật khẩu chưa đúng. Bạn cũng có thể dùng tài khoản mẫu.", "The email or password is incorrect. You can also use the demo account."));
      if (form.isConnected) finishSignIn(email === demoUser.email ? { ...account, name: read("demo-name", demoUser.name) } : account);
    }
  } catch {
    formError(form, bi("Không thể xử lý biểu mẫu. Hãy thử trong bản xem trước qua localhost hoặc HTTPS.", "This form requires a localhost or HTTPS preview."));
  } finally {
    submit.disabled = false;
  }
}

const normalizeEmail = value => String(value).trim().toLowerCase();

const recoveryAccount = email => read(`account.${email}`, email === demoUser.email ? demoUser : null);

async function submitRecovery(form) {
  const reset = form.id === "reset-password-form";
  const button = form.querySelector("[type=submit]");
  if (button.disabled || (reset && !recovery?.verified)) return;
  const data = new FormData(form);
  const email = reset ? recovery.email : normalizeEmail(data.get("email"));
  const password = data.get("password");
  const input = form.elements.namedItem(reset ? "password" : "email");
  if (reset) {
    if (password !== data.get("confirm")) {
      formError(form, bi("Mật khẩu nhập lại chưa khớp.", "Passwords do not match."));
      form.elements.namedItem("confirm").focus();
      return;
    }
    formError(form, "");
  }

  const stage = form.closest(".auth-stage");
  const hash = location.hash;
  const isCurrent = () => form.isConnected && location.hash === hash;
  const message = reset ? bi("Đang lưu mật khẩu mới…", "Saving your new password…") : bi("Đang kiểm tra email…", "Checking your email…");
  button.disabled = true;
  stage.hidden = true;
  stage.insertAdjacentHTML("afterend", loadingPage(message));
  const loading = stage.nextElementSibling;
  loading.querySelector("h1").focus({ preventScroll: true });

  let credentials;
  let storageError = false;
  try {
    await new Promise(resolve => setTimeout(resolve, 650));
    if (!isCurrent()) return;
    if (reset) credentials = await passwordRecord(password);
  } catch {
    storageError = true;
  } finally {
    loading.remove();
    stage.hidden = false;
    button.disabled = false;
  }
  if (!isCurrent()) return;

  const account = recoveryAccount(email);
  if (!account) {
    showRecoveryResult({
      title: bi("Không tìm thấy tài khoản", "Account not found"),
      message: bi("Email này chưa được đăng ký trên trình duyệt này. Hãy kiểm tra email hoặc dùng email mẫu.", "This email is not registered in this browser. Check your email or use the demo email."),
      input,
    });
  } else if (!reset) {
    recovery = { email, resendAt: Date.now() + 30000, verified: false };
    go("#/quen-mat-khau/xac-nhan");
  } else if (storageError || !write(`account.${email}`, { ...account, ...credentials })) {
    showRecoveryResult({
      title: bi("Chưa lưu được mật khẩu", "Password could not be saved"),
      message: bi("Hãy bật lưu trữ của trình duyệt và thử lại trên localhost hoặc HTTPS.", "Allow browser storage and try again on localhost or HTTPS."),
      input,
    });
  } else {
    signInEmail = email;
    recovery = undefined;
    form.reset();
    showRecoveryResult({
      title: bi("Đặt lại mật khẩu thành công", "Password reset successful"),
      message: bi("Bạn có thể đăng nhập bằng mật khẩu mới.", "You can now sign in with your new password."),
      success: true,
    });
  }
}

function submitOtp(form) {
  const recovering = form.dataset.purpose === "recovery";
  const challenge = recovering ? recovery : draft;
  if (!challenge) return;
  const input = form.elements.namedItem("otp");
  if (input.value !== demoOtp) {
    if (recovering) {
      showRecoveryResult({
        title: bi("Mã xác nhận chưa đúng", "Incorrect verification code"),
        message: bi("Hãy nhập lại mã OTP dùng thử hiển thị trên màn hình.", "Try again using the demo verification code on the screen."),
        input,
      });
    } else {
      formError(form, bi("Mã chưa đúng. Hãy nhập mã OTP dùng thử ở trên.", "Incorrect code. Enter the demo verification code above."));
      input.focus();
    }
    return;
  }
  if (recovering) {
    recovery.verified = true;
    go("#/quen-mat-khau/dat-lai");
    return;
  }
  const { name, email, hash, salt } = challenge;
  const account = { name, email, hash, salt, since: now() };
  write(`account.${email}`, account);
  finishSignIn(account);
}

function accountPage(page) {
  const [, , title] = accountLinks().find(([id]) => id === page);
  const content = {
    "tai-khoan": [bi("Quản lý thông tin tài khoản của bạn.", "Manage your account information."), profilePage],
    "lich-su": [bi("Phim và tập bạn đã mở trong trình phát.", "Films and episodes you opened in the player."), historyPage],
    "theo-doi": [bi("Những phim bạn đã lưu để xem sau.", "Films you saved to watch later."), followPage],
    "cai-dat": [bi("Tùy chỉnh ngôn ngữ và trình phát.", "Customize your language and player."), settingsPage],
  };
  const [subtitle, render] = content[page];
  return `<div class="frame inner-page account-page">
    <div class="crumb"><a href="#/">${bi("Trang chủ", "Home")}</a>${icon("right", 14)}<span>${bi("Tài khoản", "Account")}</span></div>
    ${pageTitle(title, subtitle)}
    <div class="account-layout"><nav class="account-nav panel" aria-label="${bi("Tài khoản", "Account")}">${accountLinks().map(([id, glyph, label]) => `<a href="#/${id}" ${id === page ? 'aria-current="page"' : ""}>${icon(glyph, 19)}<span>${label}</span>${icon("right", 15)}</a>`).join("")}</nav>
    <div class="account-content">${render()}</div></div>
  </div>`;
}

function profilePage(edit = false) {
  return `<section class="panel profile-panel">
    <div class="profile-cover"></div>
    <div class="profile-identity">${avatar("avatar-large")}<div><h2>${escapeHtml(user.name)}</h2><p>${escapeHtml(user.email)}</p></div></div>
    <div class="profile-body"><div class="account-section-heading"><h2>${bi("Thông tin tài khoản", "Account information")}</h2>
      <button class="button secondary small" data-action="edit-profile" type="button">${edit ? bi("Hủy", "Cancel") : bi("Chỉnh sửa", "Edit")}</button></div>
      ${edit ? `<form id="profile-form">${field("name", bi("Tên hiển thị", "Display name"), { value: user.name, autocomplete: "nickname", min: 2, max: 45 })}
        <p class="form-error" role="alert" hidden></p><button type="submit" class="button primary small">${bi("Lưu thay đổi", "Save changes")}</button></form>`
        : `<dl class="profile-info"><div><dt>${bi("Tên hiển thị", "Display name")}</dt><dd>${escapeHtml(user.name)}</dd></div><div><dt>Email</dt><dd>${escapeHtml(user.email)}</dd></div><div><dt>${bi("Ngày tham gia", "Joined")}</dt><dd>${prettyDate(user.since)}</dd></div></dl>`}
    </div></section>`;
}

function settingsPage() {
  function preference(label, description, control) {
    return `<div class="pref-row"><div><label for="pref-${control.id}">${label}</label><p>${description}</p></div>
      ${control.options ? `<select id="pref-${control.id}" data-pref="${control.id}">${videoOptions(control.options, settings[control.id])}</select>`
        : `<input id="pref-${control.id}" type="checkbox" role="switch" class="toggle" data-pref="${control.id}" ${settings[control.id] ? "checked" : ""}>`}</div>`;
  }
  return `<section class="panel pref-panel"><h2>${icon("globe", 20)}${bi("Ngôn ngữ", "Language")}</h2>
    ${preference(bi("Ngôn ngữ giao diện", "Interface language"), bi("Chọn ngôn ngữ hiển thị trên Rạp Nhà.", "Choose your language for Rạp Nhà."), { id: "language", options: [["vi", "Tiếng Việt"], ["en", "English"]] })}</section>
    <section class="panel pref-panel"><h2>${icon("movie", 20)}${bi("Trình phát", "Player")}</h2>
      ${preference(bi("Tự động phát tập tiếp theo", "Autoplay next episode"), bi("Áp dụng cho các tập phát trong trình phát Rạp Nhà.", "Applies to episodes played in the Rạp Nhà player."), { id: "autoplay" })}</section>`;
}

function historyPage() {
  const records = watchHistory().filter(item => filmById[item.id]).sort((a, b) => new Date(b.viewed) - new Date(a.viewed));
  const visible = records.filter(item => historyFilter === "all" || (Number.isFinite(item.progress) &&
    (historyFilter === "complete" ? item.progress >= .98 : item.progress < .98)));
  const labels = [["all", bi("Tất cả", "All")], ["watching", bi("Đang xem", "In progress")], ["complete", bi("Đã xem xong", "Completed")]];
  return `<div class="history-filters" aria-label="${bi("Lọc lịch sử", "Filter history")}">${labels.map(([id, label]) => `<button type="button" data-action="history-filter" data-value="${id}" aria-pressed="${historyFilter === id}">${label}</button>`).join("")}</div>
    ${visible.length ? `<div class="history-list">${visible.map(item => {
      const film = filmById[item.id];
      const tracked = Number.isFinite(item.progress);
      const finished = tracked && item.progress >= .98;
      const action = !tracked ? bi("Mở lại", "Reopen") : finished ? bi("Xem lại", "Rewatch") : bi("Xem tiếp", "Resume");
      return `<article class="panel history-card">
        <a class="history-art" href="${routeToPlayer(film, item.episode)}" aria-label="${film.title}"><img src="${episodeArt(film, item.episode)}" alt="" loading="lazy"></a>
        <div class="history-info"><h2><a href="${routeToFilm(film)}">${film.title}</a></h2>
          <p>${film.episodeCount > 1 ? episodeLabel(item.episode) : typeOf(film)} · ${prettyDate(item.viewed)}</p>
          ${tracked ? `<div class="progress-row"><progress value="${item.progress}" max="1" aria-label="${bi("Tiến độ xem", "Watch progress")}"></progress><span>${progressText(item.progress)}</span></div>` : `<span class="source-status">${bi("Đã mở", "Opened")}</span>`}</div>
        <div class="history-actions"><a class="button secondary small" href="${routeToPlayer(film, item.episode)}">${icon(finished ? "check" : tracked ? "play" : "arrow", 16)}${action}</a>
          ${iconButton("trash", bi("Xóa khỏi lịch sử", "Remove from history"), `data-action="remove-history" data-film="${film.id}" data-episode="${item.episode}"`)}</div>
      </article>`;
    }).join("")}</div>` : emptyState("clock", bi("Chưa có phim ở đây", "No films here yet"), bi("Phát một phim hoặc tập để lưu tiến độ ở đây.", "Play a film or episode to save progress here."), catalogUrl(), bi("Khám phá phim", "Discover films"))}`;
}

function followPage() {
  const records = follows().filter(item => filmById[item.id]);
  const sorted = [...records].sort((a, b) => followSort === "added" ? new Date(b.added) - new Date(a.added) : filmById[b.id].year - filmById[a.id].year);
  return `<div class="follow-toolbar"><span>${bi(`${records.length} phim đang theo dõi`, `${records.length} saved titles`)}</span>
    ${selectField("follow-sort", '<span class="sr-only">' + bi("Sắp xếp theo dõi", "Sort watchlist") + "</span>", [["release", bi("Năm phát hành mới nhất", "Latest releases")], ["added", bi("Mới thêm vào theo dõi", "Recently added")]], followSort, 'id="follow-sort"')}</div>
    ${sorted.length ? `<div class="follow-grid">${sorted.map(item => {
      const film = filmById[item.id];
      return `<article class="panel follow-card">${filmCard(film)}
        <div class="follow-details"><p>${bi("Đã thêm", "Added")} ${prettyDate(item.added)}</p></div>
        ${iconButton("x", bi("Bỏ theo dõi", "Remove from watchlist"), `data-action="follow" data-film="${film.id}"`)}</article>`;
    }).join("")}</div>` : emptyState("bookmark", bi("Danh sách theo dõi còn trống", "Your watchlist is empty"), bi("Chọn Theo dõi ở trang chi tiết để lưu phim.", "Choose Watchlist on a film’s page to save it."), catalogUrl(), bi("Khám phá phim", "Discover films"))}`;
}

function aboutPage() {
  return `<div class="frame inner-page about-page">${pageTitle(bi("Giới thiệu & liên hệ", "About & contact"))}
    <div class="about-grid"><section class="panel about-panel"><div class="about-art"></div><div class="about-copy">
      <h2>${bi("Về Rạp Nhà", "About Rạp Nhà")}</h2>
      <p>${bi("Rạp Nhà là bản mẫu khám phá phim của nhóm đồ án IE106. Bạn có thể tìm phim, xem trailer YouTube và thử trình phát ảnh tĩnh cho từng phim hoặc tập.", "Rạp Nhà is a film discovery prototype for the IE106 course. Browse titles, watch YouTube trailers, and try the still-image player for each film or episode.")}</p>
      <p>${bi("Đồ án học phần Thiết kế giao diện người dùng · Trường Đại học Công nghệ Thông tin.", "User Interface Design course project · University of Information Technology.")}</p></div></section>
    <section class="panel contact-panel" id="lien-he"><span class="auth-icon">${icon("mail", 23)}</span><h2>${bi("Liên hệ", "Contact")}</h2><p>${bi("Góp ý về giao diện hoặc báo lỗi cho nhóm đồ án.", "Share feedback or report an issue to the project team.")}</p>
      <a class="button secondary" href="mailto:rapnha.ie106@example.com">${icon("mail", 17)} rapnha.ie106@example.com</a><small>${bi("Địa chỉ minh họa", "Example address")}</small></section></div></div>`;
}

function faqPage() {
  const questions = [
    [bi("Tôi có thể xem thông tin phim khi chưa đăng nhập không?", "Can I browse films without an account?"), bi("Có. Bạn có thể tìm phim, xem trailer YouTube và dùng trình phát mô phỏng.", "Yes. You can search films, watch YouTube trailers, and use the demo player.")],
    [bi("Tôi đăng ký và xác nhận tài khoản như thế nào?", "How do I register and verify my account?"), bi("Mở Đăng ký, điền thông tin rồi nhập mã OTP mẫu hiển thị trên màn hình xác nhận. Bạn cũng có thể chọn Dùng tài khoản mẫu ở màn hình Đăng nhập.", "Open registration, fill in the form and enter the demo code displayed on the verification screen. You can also use the demo account from the sign-in screen.")],
    [bi("Tôi tìm lại phim đang xem ở đâu?", "Where can I find a film I started?"), bi("Sau khi đăng nhập, mở Lịch sử xem từ menu avatar để mở lại phim hoặc tập và tiếp tục từ vị trí đã lưu.", "Open Watch history from the account menu to reopen a film or episode and resume from your saved position.")],
    [bi("Tôi sắp xếp danh sách theo dõi như thế nào?", "How do I sort my watchlist?"), bi("Mở Theo dõi từ menu avatar và chọn sắp xếp theo năm phát hành hoặc ngày bạn thêm phim.", "Open Watchlist from the account menu and sort by release year or the date you added a film.")],
    [bi("Tôi đổi ngôn ngữ giao diện ở đâu?", "How do I change the interface language?"), bi("Mở Cài đặt hoặc menu avatar để chọn Tiếng Việt hoặc English.", "Open Settings or the account menu to choose Vietnamese or English.")],
  ];
  return `<div class="frame inner-page faq-page">${pageTitle(bi("Câu hỏi thường gặp", "Frequently asked questions"), bi("Tìm câu trả lời về tài khoản, phim và trình phát Rạp Nhà.", "Find answers about your account, films and the Rạp Nhà player."))}
    <div class="faq-list">${questions.map(([question, answer], index) => `<details class="panel" name="faq" ${index ? "" : "open"}><summary>${question} ${icon("down", 20)}</summary><p>${answer}</p></details>`).join("")}</div>
    <div class="faq-contact"><span>${bi("Bạn cần hỗ trợ thêm?", "Need more help?")}</span><a href="#/gioi-thieu/lien-he">${bi("Liên hệ", "Contact")} ${icon("arrow", 15)}</a></div></div>`;
}

function termsPage() {
  return `<div class="frame inner-page faq-page">${pageTitle(bi("Điều khoản", "Terms"))}
    <section class="panel terms-panel"><h2>${bi("Bản trình diễn IE106", "IE106 demonstration")}</h2>
    <p>${bi("Bản demo dùng ảnh tĩnh để mô phỏng phát phim. Trailer được nhúng từ YouTube.", "The demo uses still images to simulate playback. Trailers are embedded from YouTube.")}</p>
    <p>${bi("Thông tin đăng ký, lịch sử, theo dõi và cài đặt lưu trong trình duyệt đang dùng. Bạn có thể xóa chúng trong phần dữ liệu trang web của trình duyệt.", "Registration, history, watchlist and settings are stored in your browser. You can clear them from your browser’s site data settings.")}</p></section></div>`;
}

function bindShelf(shelf, signal) {
  const strip = shelf.querySelector(".film-strip");
  const cards = [...strip.children];
  const previous = shelf.querySelector("[data-action=shelf-prev]");
  const next = shelf.querySelector("[data-action=shelf-next]");
  if (cards.length < 2) {
    previous.disabled = next.disabled = true;
    return;
  }

  const step = 2;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const copyCards = (source = cards) => source.map(card => {
    const copy = card.cloneNode(true);
    copy.tabIndex = -1;
    copy.setAttribute("aria-hidden", "true");
    return copy;
  });
  const leading = copyCards();
  strip.prepend(...leading);
  // Leave room to advance two cards across the seam when the whole row fits.
  strip.append(...copyCards(), ...copyCards(cards.slice(0, step)));

  const wrap = index => ((index % cards.length) + cards.length) % cards.length;
  let cardWidth = 0;
  let visibleWidth = 0;
  let activeIndex = 0;
  let target = null;
  let settleTimer;
  let animation = 0;

  function stopAnimation() {
    cancelAnimationFrame(animation);
    animation = 0;
    strip.classList.remove("is-sliding");
  }

  function measure() {
    const cycleWidth = cards[0].getBoundingClientRect().left - leading[0].getBoundingClientRect().left;
    const width = strip.clientWidth;
    const nextCardWidth = cycleWidth / cards.length;
    if (!width || (width === visibleWidth && Math.abs(nextCardWidth - cardWidth) < .01)) return;
    clearTimeout(settleTimer);
    stopAnimation();
    cardWidth = nextCardWidth;
    visibleWidth = width;
    if (target !== null) activeIndex = wrap(target);
    target = null;
    strip.scrollTo({ left: (cards.length + activeIndex) * cardWidth, behavior: "instant" });
  }

  function settle() {
    clearTimeout(settleTimer);
    if (strip.clientWidth !== visibleWidth) {
      measure();
      return;
    }
    target = null;
    const index = Math.round(strip.scrollLeft / cardWidth);
    activeIndex = wrap(index);
    if (index < cards.length || index >= cards.length * 2) {
      // The middle copy shows the same sequence, including at the seam.
      strip.scrollTo({ left: (cards.length + activeIndex) * cardWidth, behavior: "instant" });
    }
  }

  function move(direction) {
    const offset = direction * step;
    let index = (target ?? Math.round(strip.scrollLeft / cardWidth)) + offset;
    const last = Math.floor((strip.scrollWidth - strip.clientWidth + 1) / cardWidth);
    clearTimeout(settleTimer);
    cancelAnimationFrame(animation);
    if (index < 0 || index > last) {
      settle();
      index = Math.round(strip.scrollLeft / cardWidth) + offset;
    }
    target = index;
    const destination = index * cardWidth;
    if (reducedMotion.matches) {
      stopAnimation();
      strip.scrollTo({ left: destination, behavior: "instant" });
      settle();
      return;
    }

    const start = strip.scrollLeft;
    const startedAt = performance.now();
    strip.classList.add("is-sliding");
    function slide(now) {
      const progress = Math.min(1, (now - startedAt) / 360);
      const eased = progress * progress * (3 - 2 * progress);
      strip.scrollLeft = start + (destination - start) * eased;
      if (progress < 1) animation = requestAnimationFrame(slide);
      else {
        settle();
        stopAnimation();
      }
    }
    animation = requestAnimationFrame(slide);
  }

  measure();
  previous.addEventListener("click", () => move(-1), { signal });
  next.addEventListener("click", () => move(1), { signal });
  strip.addEventListener("scroll", () => {
    if (animation) return;
    clearTimeout(settleTimer);
    const atEdge = strip.scrollLeft <= 1 || strip.scrollLeft + visibleWidth >= strip.scrollWidth - 1;
    if (atEdge) settle();
    else settleTimer = setTimeout(settle, 140);
  }, { passive: true, signal });
  for (const event of ["pointerdown", "wheel", "focusin"]) {
    strip.addEventListener(event, () => {
      target = null;
      stopAnimation();
    }, { passive: true, signal });
  }
  window.addEventListener("resize", measure, { signal });
  signal.addEventListener("abort", () => {
    clearTimeout(settleTimer);
    stopAnimation();
  }, { once: true });
}

function render({ focus = false, scroll = true } = {}) {
  closeFilmPreview();
  const state = route();
  const { page, id, params } = state;
  const film = filmById[id];
  const accountPages = accountLinks().map(([name]) => name);
  if (accountPages.includes(page) && !user) {
    returnTo = location.hash;
    location.replace("#/dang-nhap");
    return;
  }
  if (!user && !["dang-nhap", "dang-ky", "otp", "quen-mat-khau"].includes(page)) {
    returnTo = "";
    pendingFollow = "";
  }
  if (trailer.open) trailer.close();
  if (resultDialog.open) resultDialog.close();
  if (page !== "quen-mat-khau") recovery = undefined;
  else if (recovery && id !== "dat-lai") recovery.verified = false;
  disposePage();
  disposePage = () => {};
  document.documentElement.lang = settings.language;
  document.querySelector(".skip-link").textContent = bi("Đến nội dung chính", "Skip to content");
  shell(state);
  let episode;
  if (!page) {
    main.innerHTML = homePage();
    const events = new AbortController();
    bindHeroTitles(main.querySelector("#hero"), events.signal);
    main.querySelectorAll(".shelf").forEach(shelf => bindShelf(shelf, events.signal));
    disposePage = () => events.abort();
  } else if (page === "kham-pha") main.innerHTML = catalogPage(params);
  else if (page === "phim" && film) main.innerHTML = detailPage(film);
  else if (page === "xem" && film) {
    const number = Number(state.episode);
    episode = Number.isInteger(number) ? Math.min(film.episodeCount, Math.max(1, number)) : 1;
    main.innerHTML = playerPage(film, episode);
    disposePage = bindPlayer(main.querySelector("[data-player]"), film, episode);
  } else if (page === "dang-nhap" || page === "dang-ky") main.innerHTML = authPage(page);
  else if (page === "otp" || (page === "quen-mat-khau" && id === "xac-nhan")) {
    const recovering = page === "quen-mat-khau";
    const challenge = recovering ? recovery : draft;
    main.innerHTML = otpPage(challenge, recovering);
    if (challenge) {
      updateResend(challenge);
      const timer = setInterval(() => updateResend(challenge), 250);
      disposePage = () => clearInterval(timer);
    }
  } else if (page === "quen-mat-khau") main.innerHTML = id === "dat-lai" ? resetPasswordPage() : forgotPasswordPage();
  else if (page === "dang-tai") main.innerHTML = loadingPage();
  else if (accountPages.includes(page)) main.innerHTML = accountPage(page);
  else if (page === "gioi-thieu") main.innerHTML = aboutPage();
  else if (page === "faq") main.innerHTML = faqPage();
  else if (page === "dieu-khoan") main.innerHTML = termsPage();
  else main.innerHTML = `<div class="frame inner-page">${emptyState("movie", bi("Không tìm thấy trang", "Page not found"), bi("Liên kết có thể đã thay đổi.", "This link may have changed."), "#/", bi("Về trang chủ", "Go home"))}</div>`;

  const heading = page ? main.querySelector("h1, .empty-state h2")?.textContent.trim() : bi("Khám phá phim", "Discover films");
  document.title = `${heading || bi("Khám phá phim", "Discover films")} | Rạp Nhà`;
  if (focus) main.focus({ preventScroll: true });
  if (scroll) {
    if (page === "gioi-thieu" && id === "lien-he") document.querySelector("#lien-he").scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  }
}

function replaceAccountContent(markup, selector) {
  closeFilmPreview();
  main.querySelector(".account-content").innerHTML = markup;
  if (selector) main.querySelector(selector)?.focus({ preventScroll: true });
}

function toggleFollow(film, button) {
  if (!user) {
    pendingFollow = film.id;
    returnTo = routeToFilm(film);
    go("#/dang-nhap");
    return;
  }
  const saved = isFollowing(film);
  const current = follows();
  write(accountKey("follow"), saved ? current.filter(item => item.id !== film.id) : [{ id: film.id, added: now() }, ...current]);
  if (route().page === "theo-doi") replaceAccountContent(followPage(), ".follow-card > .icon-button, #follow-sort");
  else {
    button.setAttribute("aria-pressed", String(!saved));
    button.innerHTML = `${icon(saved ? "bookmark" : "check", 18)}${bi("Theo dõi", "Watchlist")}`;
  }
  notify(saved ? bi("Đã bỏ theo dõi phim.", "Removed from your watchlist.") : bi("Đã thêm vào danh sách theo dõi.", "Added to your watchlist."));
}

window.addEventListener("hashchange", () => {
  if (location.hash === "#main") return;
  render({ focus: true });
});

trailer.addEventListener("close", () => {
  trailer.innerHTML = "";
  if (trailerTrigger?.isConnected) trailerTrigger.focus();
  trailerTrigger = undefined;
});

trailer.addEventListener("click", event => {
  if (event.target === trailer) trailer.close();
});

document.addEventListener("submit", event => {
  const form = event.target;
  if (form.id === "search-form") {
    event.preventDefault();
    const query = String(new FormData(form).get("q")).trim();
    const state = route();
    const existing = !query && state.page === "kham-pha" ? Object.fromEntries(state.params) : {};
    go(activeSearch >= 0 ? suggestions[activeSearch] : catalogUrl({ ...existing, q: query }));
  } else if (form.id === "filter-form") {
    event.preventDefault();
    go(catalogUrl(Object.fromEntries(new FormData(form))));
  } else if (form.id === "auth-form") {
    event.preventDefault();
    submitAuth(form);
  } else if (form.id === "recovery-form" || form.id === "reset-password-form") {
    event.preventDefault();
    submitRecovery(form);
  } else if (form.id === "otp-form") {
    event.preventDefault();
    submitOtp(form);
  } else if (form.id === "profile-form") {
    event.preventDefault();
    const name = String(new FormData(form).get("name")).trim();
    if (name.length < 2) {
      formError(form, bi("Tên hiển thị cần ít nhất 2 ký tự.", "Use at least 2 characters for your display name."));
      return;
    }
    user.name = name;
    write("session", user);
    if (user.email === demoUser.email) write("demo-name", name);
    else {
      const key = `account.${user.email}`;
      const account = read(key, null);
      if (account) write(key, { ...account, name });
    }
    shell(route());
    replaceAccountContent(profilePage(), "[data-action=edit-profile]");
    notify(bi("Đã cập nhật thông tin.", "Profile updated."));
  }
});

document.addEventListener("input", event => {
  if (event.target.id === "search-input") showSuggestions();
  else if (event.target.id === "otp") event.target.value = event.target.value.replace(/\D/g, "").slice(0, 6);
});

document.addEventListener("focusin", event => {
  if (event.target.id === "search-input") showSuggestions();
  else if (!header.contains(event.target) && !trailer.contains(event.target)) hidePopovers();
});

document.addEventListener("change", event => {
  const element = event.target;
  if (element.id === "episode-part") {
    const state = route();
    const film = filmById[state.id];
    const part = Number(element.value);
    if (film?.parts[part]) {
      const current = state.page === "xem" ? Number(main.querySelector("[data-player]").dataset.player) : null;
      element.closest(".episode-section").outerHTML = episodeList(film, current, part);
      document.getElementById("episode-part").focus({ preventScroll: true });
    }
    return;
  }
  if (element.form?.id === "filter-form") {
    const id = element.name;
    go(catalogUrl(Object.fromEntries(new FormData(element.form))));
    requestAnimationFrame(() => main.querySelector(`#filter-form [name="${id}"]`)?.focus({ preventScroll: true }));
  }
  if (element.id === "follow-sort") {
    followSort = element.value;
    replaceAccountContent(followPage(), "#follow-sort");
  }
  const preference = element.dataset.pref;
  if (!preference) return;
  settings[preference] = element.type === "checkbox" ? element.checked : element.value;
  write("settings", settings);
  if (preference === "language") {
    render({ scroll: false });
    if (element.id === "menu-language") {
      const toggle = header.querySelector("[data-action=avatar]");
      toggle.click();
      document.querySelector("#menu-language").focus();
    } else document.getElementById(element.id)?.focus();
  }
  notify(bi("Đã lưu cài đặt.", "Settings saved."));
});

document.addEventListener("keydown", event => {
  if (trailer.open || resultDialog.open) return;
  const input = document.querySelector("#search-input");
  const editable = event.target.matches?.("input, textarea, select, [contenteditable=true]");
  if (event.key === "/" && !editable && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault();
    input.focus();
  } else if (event.key === "Escape") {
    const expanded = header.querySelector("button[aria-expanded=true]");
    closeFilmPreview();
    hidePopovers();
    expanded?.focus();
  } else if (event.target === input && ["ArrowDown", "ArrowUp"].includes(event.key) && input.value.trim()) {
    event.preventDefault();
    if (input.getAttribute("aria-expanded") === "false") showSuggestions();
    const shift = event.key === "ArrowDown" ? 1 : -1;
    const start = activeSearch < 0 && shift < 0 ? 0 : activeSearch;
    activeSearch = (start + shift + suggestions.length) % suggestions.length;
    const options = document.querySelectorAll("#suggestions [role=option]");
    options.forEach((option, index) => option.setAttribute("aria-selected", String(index === activeSearch)));
    input.setAttribute("aria-activedescendant", options[activeSearch].id);
  } else if (event.target === input && event.key === "Tab") hidePopovers();
});

document.addEventListener("click", event => {
  const skip = event.target.closest(".skip-link");
  if (skip) {
    event.preventDefault();
    main.focus();
    main.scrollIntoView();
    return;
  }
  const button = event.target.closest("[data-action]");
  const action = button?.dataset.action;
  if (!event.target.closest(".search-form, .account-wrap, .genre-wrap")) hidePopovers();
  if (!action) {
    const anchor = event.target.closest('a[href^="#/"]');
    if (anchor?.hash === (location.hash || "#/") && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      hidePopovers();
      if (anchor.hash === "#/") window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }
  if (action === "avatar" || action === "genres") {
    const panel = document.getElementById(action === "avatar" ? "avatar-menu" : "genre-menu");
    const open = panel.hidden;
    hidePopovers();
    panel.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
  } else if (action === "clear-search") {
    const input = document.querySelector("#search-input");
    input.value = "";
    input.focus();
    showSuggestions();
  } else if (action.startsWith("hero-")) {
    const step = action === "hero-next" ? 1 : -1;
    heroIndex = action === "hero-select" ? Number(button.dataset.index) : (heroIndex + step + featured.length) % featured.length;
    const section = main.querySelector("#hero");
    section.querySelector(".hero-art").style.cssText = heroArtStyle(featured[heroIndex]);
    section.querySelectorAll(".hero-copy").forEach((slide, index) => { slide.inert = index !== heroIndex; });
    section.querySelectorAll('[data-action="hero-select"]').forEach((dot, index) => dot.setAttribute("aria-pressed", String(index === heroIndex)));
    button.focus({ preventScroll: true });
  } else if (action === "trailer") openTrailer(filmById[button.dataset.film], button);
  else if (action === "follow") toggleFollow(filmById[button.dataset.film], button);
  else if (action === "password") {
    const field = document.getElementById(button.getAttribute("aria-controls"));
    field.type = field.type === "password" ? "text" : "password";
    const visible = field.type === "text";
    button.setAttribute("aria-pressed", String(visible));
    button.title = visible ? bi("Ẩn mật khẩu", "Hide password") : bi("Hiện mật khẩu", "Show password");
    button.setAttribute("aria-label", button.title);
  } else if (action === "forgot") signInEmail = main.querySelector("#field-email").value.trim();
  else if (action === "recovery-demo") {
    const email = main.querySelector("#field-email");
    email.value = demoUser.email;
    email.focus();
  } else if (action === "demo") finishSignIn({ ...demoUser, name: read("demo-name", demoUser.name) });
  else if (action === "resend") {
    const challenge = route().page === "quen-mat-khau" ? recovery : draft;
    if (!challenge || button.disabled) return;
    challenge.resendAt = Date.now() + 30000;
    updateResend(challenge);
    notify(bi(`Mã dùng thử của bạn là ${demoOtp}.`, `Your demo code is ${demoOtp}.`));
  } else if (action === "logout") {
    user = null;
    write("session", null);
    historyFilter = "all";
    followSort = "release";
    if (location.hash && location.hash !== "#/") go("#/");
    else render({ focus: true });
    notify(bi("Đã đăng xuất.", "Signed out."));
  } else if (action === "edit-profile") {
    const edit = !main.querySelector("#profile-form");
    replaceAccountContent(profilePage(edit), edit ? "#field-name" : "[data-action=edit-profile]");
  } else if (action === "history-filter") {
    historyFilter = button.dataset.value;
    replaceAccountContent(historyPage(), `[data-action=history-filter][data-value="${historyFilter}"]`);
  } else if (action === "remove-history") {
    write(accountKey("history"), watchHistory().filter(item => item.id !== button.dataset.film || item.episode !== Number(button.dataset.episode)));
    replaceAccountContent(historyPage(), ".history-actions button, [data-action=history-filter][aria-pressed=true]");
    notify(bi("Đã xóa khỏi lịch sử xem.", "Removed from watch history."));
  }
});

const closeFilmPreview = bindFilmPreview();
render();
