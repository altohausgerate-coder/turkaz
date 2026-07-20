(function () {
  const CATEGORY_DESC = {
    STANDART: "Klassik qurğuşun-turşu akkumulyator. Yüngül avtomobillər, yük maşınları və texnika üçün ən geniş yayılmış növ.",
    EFB: "Enhanced Flooded Battery — Start-Stop sistemli avtomobillər üçün. Adi akkumulyatordan 2× daha uzun ömürlü, tez şarj olunur.",
    AGM: "Absorbent Glass Mat — premium texnologiya. Start-Stop, enerji bərpası və yüksək istehlak sistemləri üçün. Sızmaz, titrəyişə davamlı.",
    GEL: "Gel elektroliti ilə tam qapalı konstruksiya. Dərin boşalma dövrlərinə davamlı. Solar, golf arabaları, dəniz texnikası üçün.",
    MARIN: "Dəniz texnikası üçün xüsusi hazırlanmış. Rütubət, duz suyu və titrəyişə yüksək davamlılıq.",
    GOLF: "Golf arabaları üçün dərin dövrə akkumulyatoru. Uzunmüddətli sabit enerji verir.",
    "AĞIR TEXNIKA": "Yük maşınları, traktorlar və ağır sənaye texnikası üçün. Yüksək soyuq start cərəyanı (CCA), uzun xidmət müddəti.",
  };

  const PRODUCT_IMAGES = {
    7: "yigit-60-sag", 12: "yigit-75-sag", 35: "yigit-95-agm", 39: "yigit-105-agm",
  };
  const YIGIT_CAT_IMG = {
    STANDART: "yigit-standart", EFB: "yigit-efb", AGM: "yigit-agm",
    GEL: "yigit-gel", MARIN: "yigit-marin", GOLF: "yigit-golf", "AĞIR TEXNIKA": "yigit-agir",
  };
  function imgSrc(p) {
    const key = PRODUCT_IMAGES[p.id] ||
      (p.brand === "Perge" ? (p.category === "AĞIR TEXNIKA" ? "perge-agir" : "perge-standart") : YIGIT_CAT_IMG[p.category]);
    return "/products/" + key + ".png";
  }

  function buildModal() {
    const style = document.createElement("style");
    style.textContent = `
      #pm-overlay{position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);opacity:0;transition:opacity .2s;display:none}
      #pm-overlay.pm-open{display:block}
      #pm-overlay.pm-visible{opacity:1}
      #pm-box{position:fixed;z-index:9999;bottom:0;left:0;right:0;max-height:92dvh;display:flex;flex-direction:column;background:#fff;border-radius:1rem 1rem 0 0;box-shadow:0 -20px 60px rgba(0,0,0,.25);transform:translateY(100%);transition:transform .35s cubic-bezier(.22,1,.36,1);overflow:hidden}
      #pm-box.pm-open{transform:translateY(0)}
      @media(min-width:640px){#pm-box{top:50%;left:50%;bottom:auto;right:auto;width:100%;max-width:30rem;border-radius:.75rem;transform:translate(-50%,-40%) scale(.96);transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0}#pm-box.pm-open{transform:translate(-50%,-50%) scale(1);opacity:1}}
      #pm-img-wrap{position:relative;height:13rem;background:linear-gradient(180deg,#f5f5f5 0%,#fff 100%);display:flex;align-items:center;justify-content:center;padding:1.5rem;flex-shrink:0}
      #pm-img-wrap img{max-height:100%;max-width:100%;object-fit:contain}
      #pm-close{position:absolute;top:1rem;right:1rem;width:2.25rem;height:2.25rem;border-radius:50%;background:rgba(255,255,255,.85);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:#222;box-shadow:0 2px 8px rgba(0,0,0,.12)}
      #pm-cat-badge{position:absolute;top:1rem;left:1rem;background:#111;color:#fff;font-size:.6rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:.25rem .6rem;border-radius:.25rem}
      #pm-body{overflow-y:auto;flex:1;padding:1.5rem}
      .pm-brand{font-size:.7rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
      .pm-brand.perge{color:#555}
      .pm-brand.yigit{color:#e21c2a}
      #pm-name{font-size:2.25rem;font-weight:800;text-transform:uppercase;line-height:1.1;margin:.25rem 0 1rem;font-family:'Barlow Condensed',sans-serif;letter-spacing:.03em}
      .pm-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.25rem}
      .pm-tag{background:#f5f5f5;border:1px solid #e5e5e5;padding:.3rem .7rem;border-radius:.25rem;font-size:.75rem;font-weight:700}
      .pm-cat-info{display:flex;gap:.75rem;background:#f5f5f5;border:1px solid #e5e5e5;border-radius:.5rem;padding:.9rem 1rem;margin-bottom:1.25rem;font-size:.85rem;color:#555;line-height:1.5}
      .pm-cat-icon{color:#e21c2a;flex-shrink:0;font-size:1.1rem;margin-top:.1rem}
      .pm-price-row{display:flex;align-items:flex-end;justify-content:space-between;border-top:1px solid #e5e5e5;padding-top:1rem;margin-bottom:1.5rem}
      .pm-price{font-family:'Barlow Condensed',sans-serif;font-size:3rem;font-weight:800;color:#e21c2a;line-height:1}
      .pm-currency{font-family:'Barlow Condensed',sans-serif;font-size:1.5rem;font-weight:800;color:#e21c2a}
      .pm-vat{font-size:.7rem;font-weight:600;color:#888;margin-top:.25rem}
      .pm-warranty{display:flex;align-items:center;gap:.35rem;font-size:.8rem;font-weight:700;color:#444}
      .pm-warranty-icon{color:#e21c2a}
      .pm-btns{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
      .pm-btn{display:flex;align-items:center;justify-content:center;gap:.5rem;padding:.9rem;border-radius:.25rem;font-family:'Barlow Condensed',sans-serif;font-size:1.1rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;text-decoration:none;border:none;cursor:pointer;transition:filter .15s}
      .pm-btn:active{filter:brightness(.9)}
      .pm-btn-wa{background:#25D366;color:#fff}
      .pm-btn-call{background:#e21c2a;color:#fff}
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.id = "pm-overlay";
    overlay.addEventListener("click", closeModal);

    const box = document.createElement("div");
    box.id = "pm-box";
    box.innerHTML = `
      <div id="pm-img-wrap">
        <img id="pm-img" src="" alt="">
        <button id="pm-close" aria-label="Bağla">✕</button>
        <span id="pm-cat-badge"></span>
      </div>
      <div id="pm-body">
        <span class="pm-brand" id="pm-brand"></span>
        <h2 id="pm-name"></h2>
        <div class="pm-tags" id="pm-tags"></div>
        <div class="pm-cat-info">
          <span class="pm-cat-icon">⚡</span>
          <span id="pm-cat-desc"></span>
        </div>
        <div class="pm-price-row">
          <div>
            <div><span class="pm-price" id="pm-price"></span><span class="pm-currency"> ₼</span></div>
            <div class="pm-vat">ƏDV daxildir</div>
          </div>
          <div class="pm-warranty">
            <span class="pm-warranty-icon">✓</span>
            1 il rəsmi zəmanət
          </div>
        </div>
        <div class="pm-btns">
          <a class="pm-btn pm-btn-wa" id="pm-wa" href="#" target="_blank" rel="noopener">
            💬 Sifariş et
          </a>
          <a class="pm-btn pm-btn-call" href="tel:+994517290386">
            📞 Zəng et
          </a>
        </div>
      </div>
    `;

    box.querySelector("#pm-close").addEventListener("click", closeModal);
    document.body.appendChild(overlay);
    document.body.appendChild(box);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  function openModal(p) {
    const overlay = document.getElementById("pm-overlay");
    const box = document.getElementById("pm-box");

    document.getElementById("pm-img").src = imgSrc(p);
    document.getElementById("pm-img").alt = p.name;
    document.getElementById("pm-cat-badge").textContent = p.category;

    const brandEl = document.getElementById("pm-brand");
    brandEl.textContent = p.brand;
    brandEl.className = "pm-brand " + (p.brand === "Perge" ? "perge" : "yigit");

    document.getElementById("pm-name").textContent = p.name;

    const tagsEl = document.getElementById("pm-tags");
    const tags = [p.ah + " Ah", p.volt];
    if (p.pole) tags.push("Qütb: " + p.pole);
    if (p.note) tags.push(p.note);
    tagsEl.innerHTML = tags.map(t => `<span class="pm-tag">${t}</span>`).join("");

    document.getElementById("pm-cat-desc").textContent = CATEGORY_DESC[p.category] || "";
    document.getElementById("pm-price").textContent = p.price;

    const orderMsg = encodeURIComponent(`Salam! "${p.name}" akkumulyatoru sifariş etmək istəyirəm (${p.price} ₼).`);
    document.getElementById("pm-wa").href = "https://wa.me/994503791806?text=" + orderMsg;

    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () {
      overlay.classList.add("pm-open", "pm-visible");
      box.classList.add("pm-open");
    });
  }

  function closeModal() {
    const overlay = document.getElementById("pm-overlay");
    const box = document.getElementById("pm-box");
    overlay.classList.remove("pm-visible");
    box.classList.remove("pm-open");
    document.body.style.overflow = "";
    setTimeout(function () { overlay.style.display = "none"; overlay.classList.remove("pm-open"); }, 300);
  }

  window.__showProductModal = openModal;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildModal);
  } else {
    buildModal();
  }
})();
