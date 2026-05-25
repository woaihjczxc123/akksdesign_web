const works = [
  {
    titleZh: "Mamba Out",
    titleEn: "Mamba Out",
    categoryZh: "纪念视觉",
    categoryEn: "Tribute Visual",
    year: "2026",
    thumbnail: "https://assets.akksdesign.top/posters/Mamba-out.webp",
    video: "https://assets.akksdesign.top/videos/Mamba%20out.mp4",
    mobileVideo: "https://assets.akksdesign.top/videos-mobile/Mamba%20out.mp4",
    featured: true,
    descriptionZh: "以强烈光影和运动节奏构建的三维纪念影像。",
    descriptionEn: "A cinematic 3D tribute driven by dramatic lighting and motion.",
  },
  {
    titleZh: "UE5 BMW",
    titleEn: "BMW Unreal Drive",
    categoryZh: "汽车场景",
    categoryEn: "Automotive Scene",
    year: "2026",
    thumbnail: "https://assets.akksdesign.top/posters/UE5-BMW.webp",
    video: "https://assets.akksdesign.top/videos/UE5_BMW.mp4",
    mobileVideo: "https://assets.akksdesign.top/videos-mobile/UE5_BMW.mp4",
    featured: false,
    descriptionZh: "基于 UE5 场景氛围、车漆材质和镜头调度的汽车视觉。",
    descriptionEn: "An automotive visual focused on UE5 mood, paint, and camera movement.",
  },
  {
    titleZh: "Perfume",
    titleEn: "Fragrance in Motion",
    categoryZh: "产品广告",
    categoryEn: "Product Film",
    year: "2025",
    thumbnail: "https://assets.akksdesign.top/posters/perfume.webp",
    video: "https://assets.akksdesign.top/videos/perfume.mp4",
    mobileVideo: "https://assets.akksdesign.top/videos-mobile/perfume.mp4",
    featured: false,
    descriptionZh: "围绕玻璃、液体和微距镜头语言的香水产品影像。",
    descriptionEn: "A perfume film built around glass, liquid, and macro detail.",
  },
  {
    titleZh: "Sneaker",
    titleEn: "Airborne Sneaker",
    categoryZh: "潮流视觉",
    categoryEn: "Campaign Visual",
    year: "2025",
    thumbnail: "https://assets.akksdesign.top/posters/sneaker.webp",
    video: "https://assets.akksdesign.top/videos/sneaker.mp4",
    mobileVideo: "https://assets.akksdesign.top/videos-mobile/sneaker.mp4",
    featured: false,
    descriptionZh: "为鞋款发布和社媒传播设计的三维动态视觉。",
    descriptionEn: "A 3D motion visual designed for sneaker launch and social media.",
  },
  {
    titleZh: "Logo Motion",
    titleEn: "Signal Logo Film",
    categoryZh: "品牌动态",
    categoryEn: "Brand Motion",
    year: "2025",
    thumbnail: "https://assets.akksdesign.top/posters/logo.webp",
    video: "https://assets.akksdesign.top/videos/logo.mp4",
    mobileVideo: "https://assets.akksdesign.top/videos-mobile/logo.mp4",
    featured: false,
    descriptionZh: "品牌标识的三维材质、光线和动态演绎。",
    descriptionEn: "A logo animation exploring material, light, and motion.",
  },
  {
    titleZh: "Ball",
    titleEn: "Kinetic Sphere",
    categoryZh: "材质实验",
    categoryEn: "Material Study",
    year: "2024",
    thumbnail: "https://assets.akksdesign.top/posters/ball.webp",
    video: "https://assets.akksdesign.top/videos/ball.mp4",
    mobileVideo: "https://assets.akksdesign.top/videos-mobile/ball.mp4",
    featured: false,
    descriptionZh: "以球体为主体的材质、光影和运动测试。",
    descriptionEn: "A material and lighting study built around a moving sphere.",
  },
];

const worksGrid = document.querySelector("[data-works-grid]");
const featuredVideo = document.querySelector("[data-video]");
const featuredPoster = document.querySelector("[data-featured-poster]");
const videoTrigger = document.querySelector("[data-video-trigger]");
const mediaFrame = document.querySelector(".media-frame");
const featuredTitle = document.querySelector(".featured-copy h3");
const featuredMeta = document.querySelector(".featured-copy .work-meta");
const featuredDescription = document.querySelector(".featured-copy p:not(.work-meta)");
const featuredAction = document.querySelector(".featured-copy .text-link");
const modal = document.querySelector("[data-video-modal]");
const modalVideo = document.querySelector("[data-modal-video]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalMeta = document.querySelector("[data-modal-meta]");
const closeButtons = document.querySelectorAll("[data-modal-close]");
const root = document.documentElement;
const mobilePlaybackQuery = window.matchMedia("(max-width: 768px), (hover: none) and (pointer: coarse)");

function getVideoSource(work) {
  return mobilePlaybackQuery.matches && work.mobileVideo ? work.mobileVideo : work.video;
}

function applyFeaturedWork() {
  const featured = works.find((work) => work.featured) || works[0];
  if (!featured) return;

  if (featuredVideo) {
    featuredVideo.removeAttribute("src");
    featuredVideo.poster = featured.thumbnail;
  }

  if (featuredPoster) {
    featuredPoster.src = featured.thumbnail;
    featuredPoster.alt = `${featured.titleZh} / ${featured.titleEn}`;
  }

  mediaFrame?.classList.add("has-media");
  mediaFrame?.setAttribute("data-work-index", String(works.indexOf(featured)));

  if (featuredTitle) featuredTitle.textContent = featured.titleEn;
  if (featuredMeta) {
    featuredMeta.textContent = `${featured.categoryEn} / ${featured.categoryZh} · ${featured.year}`;
  }
  if (featuredDescription) {
    featuredDescription.textContent = `${featured.descriptionZh} ${featured.descriptionEn}`;
  }
  if (featuredAction) {
    featuredAction.textContent = "播放视频 / Play Video";
    featuredAction.removeAttribute("href");
    featuredAction.removeAttribute("target");
    featuredAction.removeAttribute("rel");
    featuredAction.setAttribute("role", "button");
    featuredAction.setAttribute("tabindex", "0");
    featuredAction.setAttribute("data-work-index", String(works.indexOf(featured)));
  }
}

function renderWorks() {
  if (!worksGrid) return;

  worksGrid.innerHTML = works
    .map((work, index) => `
      <article class="work-card" data-work-index="${index}">
        <button class="work-thumb" type="button" data-video-open="${index}" aria-label="Play ${work.titleEn}">
          <img src="${work.thumbnail}" alt="${work.titleZh} / ${work.titleEn}" loading="lazy" />
          <span class="play-button" aria-hidden="true"></span>
        </button>
        <div class="work-body">
          <p class="work-meta">${work.categoryEn} / ${work.categoryZh} · ${work.year}</p>
          <h3>${work.titleEn}</h3>
          <p>${work.descriptionZh} ${work.descriptionEn}</p>
          <button class="text-link" type="button" data-video-open="${index}">
            播放视频 / Play Video
          </button>
        </div>
      </article>
    `)
    .join("");
}

function openVideoModal(index) {
  const work = works[index];
  if (!work || !modal || !modalVideo || !modalTitle || !modalMeta) return;

  modal.classList.remove("is-landscape", "is-portrait");
  modalTitle.textContent = work.titleEn;
  modalMeta.textContent = `${work.categoryEn} / ${work.categoryZh} · ${work.year}`;
  modalVideo.poster = work.thumbnail;
  modalVideo.preload = "auto";
  modalVideo.src = getVideoSource(work);
  modalVideo.load();
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalVideo.focus();
  modalVideo.play().catch(() => {});
}

function closeVideoModal() {
  if (!modal || !modalVideo) return;

  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  modal.hidden = true;
  modal.classList.remove("is-landscape", "is-portrait");
  document.body.classList.remove("modal-open");
}

function setupVideoModal() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-video-open], [data-video-trigger]");
    if (!trigger) return;

    event.preventDefault();
    const rawIndex = trigger.getAttribute("data-video-open") || trigger.getAttribute("data-work-index");
    const index = Number(rawIndex || 0);
    openVideoModal(index);
  });

  featuredAction?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openVideoModal(Number(featuredAction.getAttribute("data-work-index") || 0));
    }
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeVideoModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeVideoModal();
    }
  });
}

function setupVideoOrientation() {
  if (!modal || !modalVideo) return;

  modalVideo.addEventListener("loadedmetadata", () => {
    const isLandscape = modalVideo.videoWidth >= modalVideo.videoHeight;
    modal.classList.toggle("is-landscape", isLandscape);
    modal.classList.toggle("is-portrait", !isLandscape);
  });
}

function setupBackgroundDepth() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;

  function updateDepth() {
    const progress = Math.min(window.scrollY / 1600, 1);
    const scale = 1 + progress * 0.075;
    const y = progress * -28;

    root.style.setProperty("--bg-depth-scale", scale.toFixed(4));
    root.style.setProperty("--bg-depth-y", `${y.toFixed(2)}px`);
    document.body.classList.toggle("is-past-hero", window.scrollY > window.innerHeight * 0.65);
    ticking = false;
  }

  function requestDepthUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateDepth);
  }

  updateDepth();
  window.addEventListener("scroll", requestDepthUpdate, { passive: true });
  window.addEventListener("resize", requestDepthUpdate);
}

applyFeaturedWork();
renderWorks();
setupVideoModal();
setupVideoOrientation();
setupBackgroundDepth();
