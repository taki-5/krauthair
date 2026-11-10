(() => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const hamburgers = document.querySelectorAll("[data-nav-toggle]");
  const navLinks = document.querySelectorAll(".nav-list a");

  // ファーストビューのフェードインを有効化
  requestAnimationFrame(() => {
    body.classList.add("loaded");
  });

  // ヘッダーの背景切り替え（ヒーロー通過後）
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle("is-scrolled", scrolled);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ハンバーガーメニューの開閉
  const toggleNav = (force) => {
    const next = typeof force === "boolean" ? force : !body.classList.contains("nav-open");
    body.classList.toggle("nav-open", next);
    hamburgers.forEach((btn) => btn.setAttribute("aria-expanded", String(next)));
  };

  hamburgers.forEach((btn) => {
    btn.addEventListener("click", () => toggleNav());
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => toggleNav(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("nav-open")) {
      toggleNav(false);
    }
  });

  // 仮データをDOMに反映
  const cfg = window.KRAUTHAIR_CONFIG;
  const resolveCfgPath = (path) => {
    let val = cfg;
    for (const key of path.split(".")) {
      val = val && val[key];
    }
    return val;
  };

  if (cfg) {
    // data-cfg = 表示テキスト、data-cfg-href = リンク先。同じ要素に両方あっても独立して反映する
    document.querySelectorAll("[data-cfg]").forEach((el) => {
      const val = resolveCfgPath(el.getAttribute("data-cfg"));
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll("[data-cfg-href]").forEach((el) => {
      const val = resolveCfgPath(el.getAttribute("data-cfg-href"));
      if (val) el.setAttribute("href", val);
    });
  }

  // MENUセクションをconfig.jsのデータから生成
  const renderMenuList = (listEl, items) => {
    if (!listEl || !items) return;
    items.forEach((item, i) => {
      const li = document.createElement("li");
      li.className = "menu-item";
      li.setAttribute("data-reveal", "");
      li.style.transitionDelay = `${Math.min(i * 0.07, 0.35)}s`;
      const badge = item.featured ? `<span class="menu-item-badge">おすすめ</span>` : "";
      li.innerHTML = `
        <div class="menu-item-row">
          <span class="menu-item-name">${item.name}${badge}</span>
          <span class="menu-item-price">${item.price}</span>
        </div>
        <div class="menu-item-meta">
          <p class="menu-item-desc">${item.desc}</p>
          <span class="menu-item-time">${item.time}</span>
        </div>
      `;
      listEl.appendChild(li);
    });
  };

  if (cfg && cfg.menu) {
    renderMenuList(document.getElementById("menu-hair-list"), cfg.menu.hair);
    renderMenuList(document.getElementById("menu-spa-list"), cfg.menu.spa);
  }

  // CLAY SPAセクションの料金カードをconfig.jsのデータから生成
  const renderSpaCards = (containerEl, items) => {
    if (!containerEl || !items) return;
    items.forEach((item, i) => {
      const card = document.createElement("div");
      card.className = "spa-price-card";
      card.setAttribute("data-reveal", "");
      card.style.transitionDelay = `${Math.min(i * 0.1, 0.3)}s`;
      card.innerHTML = `
        <span class="spa-price-card-time">${item.time}</span>
        <h4 class="spa-price-card-name">${item.name}</h4>
        <p class="spa-price-card-desc">${item.desc}</p>
        <span class="spa-price-card-price">${item.price}</span>
      `;
      containerEl.appendChild(card);
    });
  };

  if (cfg && cfg.menu) {
    renderSpaCards(document.getElementById("spa-pricing-cards"), cfg.menu.spa);
  }

  // OWNERセクション：config.owner.enabled が true になったら、仮の構成から実際の内容に差し替える
  if (cfg && cfg.owner && cfg.owner.enabled && cfg.owner.name && cfg.owner.message) {
    const note = document.getElementById("owner-draft-note");
    if (note) note.remove();

    const media = document.getElementById("owner-media");
    if (media && cfg.owner.photo) {
      media.classList.remove("owner-media--placeholder");
      media.innerHTML = `<img src="${cfg.owner.photo}" alt="${cfg.owner.name}" loading="lazy">`;
    }

    const nameEl = document.getElementById("owner-name");
    if (nameEl) nameEl.textContent = cfg.owner.name;

    const messagesEl = document.getElementById("owner-messages");
    if (messagesEl) {
      messagesEl.innerHTML = cfg.owner.message
        .split(/\n\s*\n/)
        .map((p) => `<p data-reveal>${p.trim()}</p>`)
        .join("");
    }
  }

  // RESERVATIONセクション：受付状況（config.reservation.status）に応じてボタン／案内文を出し分け
  const resActions = document.getElementById("reservation-actions");
  if (resActions && cfg && cfg.reservation && cfg.contact) {
    if (cfg.reservation.status === "open") {
      resActions.innerHTML = `
        <a class="btn-pill reservation-btn" href="${cfg.contact.instagramDmUrl}" target="_blank" rel="noopener">
          <span class="reservation-btn-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.3"/>
            </svg>
          </span>
          Instagramでメッセージを送る
        </a>
        <a class="btn-pill reservation-btn" href="${cfg.contact.telHref}">
          <span class="reservation-btn-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3h3l1.5 4-2 2a12 12 0 0 0 6 6l2-2 4 1.5v3c0 1-1 2-2 2C11 19.5 4.5 13 4 5c0-1 1-2 2-2Z" stroke="currentColor" stroke-width="1.2"/>
            </svg>
          </span>
          電話をかける（${cfg.contact.tel}）
        </a>
      `;
    } else {
      resActions.innerHTML = `<p class="reservation-paused">${cfg.reservation.pausedMessage}</p>`;
    }
  }

  // ACCESSセクション：住所確定後、config.jsにmapEmbedUrlを設定すると地図に自動で切り替わる
  const mapPlaceholder = document.getElementById("access-map-placeholder");
  if (mapPlaceholder && cfg && cfg.access && cfg.access.mapEmbedUrl) {
    const iframe = document.createElement("iframe");
    iframe.className = "access-map-iframe";
    iframe.src = cfg.access.mapEmbedUrl;
    iframe.loading = "lazy";
    iframe.title = "krauthair の地図";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    mapPlaceholder.replaceWith(iframe);
  }

  // スクロール連動フェードイン（動的に生成した要素も含める）
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-inview"));
  }
})();
