const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const image = (id, width = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

const price = (value) => new Intl.NumberFormat("ru-RU").format(value) + " ₽";

const FREE_SHIPPING = 15000;

const categoryNames = {
  women: "Женщинам",
  men: "Мужчинам",
  accessories: "Аксессуары"
};

const palette = {
  black: { name: "Чёрный", hex: "#151515" },
  cream: { name: "Молочный", hex: "#ece4d4" },
  camel: { name: "Кэмел", hex: "#b88a57" },
  grey: { name: "Графит", hex: "#5d5d60" },
  wine: { name: "Бордо", hex: "#6e1f24" },
  olive: { name: "Олива", hex: "#6b6a43" }
};

const products = [
  {
    id: 1,
    name: "Пальто «Небо» из шерсти",
    category: "women",
    price: 38900,
    label: "Новинка",
    sizes: ["XS", "S", "M", "L"],
    colors: ["camel", "black"],
    images: ["1515886657613-9f3515b0c78f", "1539109136881-3be0616acf4b"],
    description: "Двубортное пальто свободного кроя из итальянской шерсти с кашемиром. Подклад из купры."
  },
  {
    id: 2,
    name: "Платье-комбинация «Шёлк»",
    category: "women",
    price: 18400,
    sizes: ["XS", "S", "M"],
    colors: ["cream", "wine"],
    images: ["1496747611176-843222e1e57c", "1509631179647-0177331693ae"],
    description: "Платье на тонких бретелях из матового шёлка. Длина миди, косой крой."
  },
  {
    id: 3,
    name: "Жакет «Мастерская»",
    category: "women",
    price: 24600,
    oldPrice: 32800,
    label: "−25%",
    sizes: ["S", "M", "L", "XL"],
    colors: ["grey", "cream"],
    images: ["1529139574466-a303027c1d8b", "1483985988355-763728e1935b"],
    description: "Укороченный жакет с подплечниками и скрытой застёжкой. Хорошо сочетается с брюками «Ось»."
  },
  {
    id: 4,
    name: "Свитер «Туман» оверсайз",
    category: "women",
    price: 14200,
    sizes: ["XS", "S", "M", "L"],
    colors: ["cream", "olive", "grey"],
    images: ["1434389677669-e08b4cac3105", "1490481651871-ab68de25d43d"],
    description: "Объёмный свитер из альпаки и мериноса. Мягкий, тёплый и почти невесомый."
  },
  {
    id: 5,
    name: "Костюм «Графит»",
    category: "men",
    price: 54000,
    label: "Новинка",
    sizes: ["M", "L", "XL"],
    colors: ["grey", "black"],
    images: ["1594633312681-425c7b97ccd1", "1507679799987-c73779587ccf"],
    description: "Однобортный костюм из шерсти super 120's. Пиджак без подкладки, брюки со стрелками."
  },
  {
    id: 6,
    name: "Куртка «Север» из кожи",
    category: "men",
    price: 46500,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    images: ["1551028719-00167b16eac5", "1591047139829-d91aecb6caea"],
    description: "Куртка из мягкой кожи растительного дубления. Со временем приобретает благородную патину."
  },
  {
    id: 7,
    name: "Футболка «База»",
    category: "men",
    price: 4900,
    sizes: ["S", "M", "L", "XL"],
    colors: ["cream", "black", "olive"],
    images: ["1521572163474-6864f9cf17ab", "1503342217505-b0a15ec3261c"],
    description: "Плотный хлопок 240 г/м², усиленный ворот. Та самая футболка, которая не теряет форму."
  },
  {
    id: 8,
    name: "Рубашка «Лён»",
    category: "men",
    price: 9800,
    oldPrice: 12900,
    label: "−24%",
    sizes: ["M", "L", "XL"],
    colors: ["cream", "olive"],
    images: ["1617137968427-85924c800a22", "1507679799987-c73779587ccf"],
    description: "Рубашка из стираного льна с перламутровыми пуговицами."
  },
  {
    id: 9,
    name: "Сумка «Тоут»",
    category: "accessories",
    price: 27800,
    label: "Хит",
    sizes: ["One size"],
    colors: ["camel", "black"],
    images: ["1548036328-c9fa89d128fa", "1584917865442-de89df76afd3"],
    description: "Вместительная сумка из цельной кожи с внутренним карманом на молнии."
  },
  {
    id: 10,
    name: "Туфли «Линия»",
    category: "accessories",
    price: 21500,
    sizes: ["One size"],
    colors: ["black", "wine"],
    images: ["1543163521-1bf539c55dd2", "1548036328-c9fa89d128fa"],
    description: "Лодочки на устойчивом каблуке 6 см. Кожаная стелька с памятью формы."
  },
  {
    id: 11,
    name: "Часы «Минута»",
    category: "accessories",
    price: 32000,
    sizes: ["One size"],
    colors: ["black", "camel"],
    images: ["1523170335258-f5ed11844a49", "1584917865442-de89df76afd3"],
    description: "Минималистичные часы с японским механизмом и сапфировым стеклом."
  },
  {
    id: 12,
    name: "Очки «Полдень»",
    category: "accessories",
    price: 11900,
    sizes: ["One size"],
    colors: ["black", "camel"],
    images: ["1511499767150-a48a237f0083", "1523170335258-f5ed11844a49"],
    description: "Солнцезащитные очки в оправе из ацетата ручной работы. Линзы с защитой UV400."
  }
];

const storage = {
  read: (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  write: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};

const state = {
  category: "all",
  sizes: new Set(),
  maxPrice: 60000,
  sort: "new",
  cart: storage.read("verona-cart", []),
  wishlist: new Set(storage.read("verona-wishlist", []))
};

const heartIcon = `<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>`;

const findProduct = (id) => products.find((product) => product.id === Number(id));

function filteredProducts() {
  const list = products.filter(
    (product) =>
      (state.category === "all" || product.category === state.category) &&
      product.price <= state.maxPrice &&
      (!state.sizes.size || product.sizes.some((size) => state.sizes.has(size)))
  );

  if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
  return list;
}

function productTemplate(product, index) {
  const isWished = state.wishlist.has(product.id);
  const label = product.label
    ? `<span class="product__label ${product.oldPrice ? "product__label--sale" : ""}">${product.label}</span>`
    : "";
  const quickSizes = product.sizes
    .map((size) => `<button data-quick-add="${product.id}" data-size="${size}">${size === "One size" ? "+" : size}</button>`)
    .join("");

  return `
    <article class="product" style="--i:${index}">
      <div class="product__media" data-open="${product.id}">
        ${label}
        <button class="icon-btn product__wish ${isWished ? "is-active" : ""}" data-wish="${product.id}" aria-label="В избранное">${heartIcon}</button>
        <img src="${image(product.images[0])}" alt="${product.name}" loading="lazy">
        <img src="${image(product.images[1])}" alt="" loading="lazy">
        <div class="product__quick"><span>Быстро в корзину</span>${quickSizes}</div>
      </div>
      <div class="product__info">
        <div>
          <h3 class="product__name">${product.name}</h3>
          <div class="product__colors">${product.colors.map((color) => `<i style="background:${palette[color].hex}"></i>`).join("")}</div>
        </div>
        <p class="product__price">${product.oldPrice ? `<s>${price(product.oldPrice)}</s>` : ""}${price(product.price)}</p>
      </div>
    </article>`;
}

function renderProducts() {
  const list = filteredProducts();
  $("#products").innerHTML = list.length
    ? list.map(productTemplate).join("")
    : `<p class="products__empty">Ничего не найдено — попробуйте смягчить фильтры</p>`;
  $("#productCount").textContent = `${list.length} из ${products.length}`;
}

function setCategory(category) {
  state.category = category;
  $$("#categoryFilter button").forEach((button) => button.classList.toggle("is-active", button.dataset.category === category));
  renderProducts();
}

function initFilters() {
  const range = $("#priceRange");
  const updatePriceLabel = () => ($("#priceOut").textContent = price(Number(range.value)));

  $("#categoryFilter").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) setCategory(button.dataset.category);
  });

  $("#sizeFilter").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const size = button.dataset.size;
    state.sizes.has(size) ? state.sizes.delete(size) : state.sizes.add(size);
    button.classList.toggle("is-active");
    renderProducts();
  });

  range.addEventListener("input", () => {
    state.maxPrice = Number(range.value);
    updatePriceLabel();
    renderProducts();
  });

  $("#sortSelect").addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderProducts();
  });

  $("#filtersReset").addEventListener("click", () => {
    state.sizes.clear();
    state.maxPrice = 60000;
    range.value = 60000;
    $$("#sizeFilter button").forEach((button) => button.classList.remove("is-active"));
    updatePriceLabel();
    setCategory("all");
  });

  $("#filterToggle").addEventListener("click", () => $("#filters").classList.toggle("is-open"));

  $$("[data-filter-link]").forEach((link) =>
    link.addEventListener("click", () => {
      setCategory(link.dataset.filterLink);
      $("#headerLinks").classList.remove("is-open");
    })
  );

  updatePriceLabel();
}

function saveCart() {
  storage.write("verona-cart", state.cart);
  renderCart();
}

function addToCart(productId, size, color) {
  const product = findProduct(productId);
  const colorKey = color || product.colors[0];
  const key = `${product.id}-${size}-${colorKey}`;
  const existing = state.cart.find((item) => item.key === key);

  if (existing) existing.qty += 1;
  else state.cart.push({ key, id: product.id, size, color: colorKey, qty: 1 });

  saveCart();
  bump($("#cartCount"));
  showToast(product, `${product.name} · ${size} — в корзине`);
}

function renderCart() {
  const total = state.cart.reduce((sum, item) => sum + findProduct(item.id).price * item.qty, 0);
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);

  $("#cartCount").textContent = count;
  $("#cartCount").classList.toggle("is-visible", count > 0);
  $("#cartHeadCount").textContent = count;
  $("#cartTotal").textContent = price(total);
  $("#checkoutBtn").disabled = count === 0;

  const left = FREE_SHIPPING - total;
  $("#shippingText").innerHTML =
    left > 0 ? `До бесплатной доставки — <b>${price(left)}</b>` : "Доставка бесплатная ✓";
  $("#shippingBar").style.width = `${Math.min((total / FREE_SHIPPING) * 100, 100)}%`;

  $("#cartList").innerHTML = state.cart.length
    ? state.cart
        .map((item) => {
          const product = findProduct(item.id);
          return `
          <li class="cart-item">
            <div class="cart-item__img"><img src="${image(product.images[0], 300)}" alt=""></div>
            <div class="cart-item__info">
              <b>${product.name}</b>
              <small>${palette[item.color].name} · ${item.size}</small>
              <div class="qty">
                <button data-qty="${item.key}" data-delta="-1" aria-label="Меньше">−</button>
                <span>${item.qty}</span>
                <button data-qty="${item.key}" data-delta="1" aria-label="Больше">+</button>
              </div>
            </div>
            <div class="cart-item__side">
              <span>${price(product.price * item.qty)}</span>
              <button class="cart-item__remove" data-remove="${item.key}">Удалить</button>
            </div>
          </li>`;
        })
        .join("")
    : `<li class="cart-list__empty">Корзина пока пуста</li>`;
}

function initCart() {
  $("#cartList").addEventListener("click", (event) => {
    const qtyButton = event.target.closest("[data-qty]");
    const removeButton = event.target.closest("[data-remove]");

    if (qtyButton) {
      const item = state.cart.find((entry) => entry.key === qtyButton.dataset.qty);
      item.qty += Number(qtyButton.dataset.delta);
      if (item.qty < 1) state.cart = state.cart.filter((entry) => entry !== item);
      saveCart();
    }

    if (removeButton) {
      state.cart = state.cart.filter((entry) => entry.key !== removeButton.dataset.remove);
      saveCart();
    }
  });

  $("#checkoutBtn").addEventListener("click", () => {
    if (!Auth.isLoggedIn()) {
      document.dispatchEvent(new CustomEvent("auth:required", { detail: { reason: "Войдите или зарегистрируйтесь, чтобы оформить заказ" } }));
      return;
    }

    const orderNumber = `V-${Math.floor(100000 + Math.random() * 900000)}`;
    document.dispatchEvent(
      new CustomEvent("order:placed", {
        detail: {
          number: orderNumber,
          at: Date.now(),
          items: state.cart.map((item) => ({ ...item, name: findProduct(item.id).name, price: findProduct(item.id).price })),
          total: state.cart.reduce((sum, item) => sum + findProduct(item.id).price * item.qty, 0)
        }
      })
    );
    state.cart = [];
    saveCart();
    $("#cartList").innerHTML = `
      <li class="cart-list__empty">
        <p style="font-family: var(--serif); font-size: 28px; color: var(--ink)">Спасибо!</p>
        <p>Демо-заказ ${orderNumber} оформлен.<br>Реальная оплата не производится.</p>
      </li>`;
  });

  renderCart();
}

function renderWishlist() {
  const count = state.wishlist.size;
  $("#wishCount").textContent = count;
  $("#wishCount").classList.toggle("is-visible", count > 0);

  $("#wishList").innerHTML = count
    ? [...state.wishlist]
        .map(findProduct)
        .map(
          (product) => `
          <li class="cart-item">
            <div class="cart-item__img"><img src="${image(product.images[0], 300)}" alt=""></div>
            <div class="cart-item__info">
              <b>${product.name}</b>
              <small>${price(product.price)}</small>
            </div>
            <div class="cart-item__side">
              <button class="cart-item__remove" data-wish-open="${product.id}">Выбрать размер</button>
              <button class="cart-item__remove" data-wish-remove="${product.id}">Удалить</button>
            </div>
          </li>`
        )
        .join("")
    : `<li class="cart-list__empty">Сохраняйте понравившиеся вещи — они появятся здесь</li>`;
}

function toggleWish(id) {
  state.wishlist.has(id) ? state.wishlist.delete(id) : state.wishlist.add(id);
  storage.write("verona-wishlist", [...state.wishlist]);
  renderWishlist();
  bump($("#wishCount"));
}

function initWishlist() {
  $("#wishList").addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-wish-open]");
    const removeButton = event.target.closest("[data-wish-remove]");
    if (openButton) {
      closeAll();
      openQuickView(Number(openButton.dataset.wishOpen));
    }
    if (removeButton) {
      toggleWish(Number(removeButton.dataset.wishRemove));
      renderProducts();
    }
  });
  renderWishlist();
}

function initProductGrid() {
  $("#products").addEventListener("click", (event) => {
    const wishButton = event.target.closest("[data-wish]");
    const quickAdd = event.target.closest("[data-quick-add]");
    const media = event.target.closest("[data-open]");

    if (wishButton) {
      toggleWish(Number(wishButton.dataset.wish));
      wishButton.classList.toggle("is-active");
      return;
    }
    if (quickAdd) {
      addToCart(quickAdd.dataset.quickAdd, quickAdd.dataset.size);
      return;
    }
    if (media) openQuickView(Number(media.dataset.open));
  });
}

let quickState = { product: null, size: null, color: null };

function openQuickView(id) {
  const product = findProduct(id);
  quickState = { product, size: product.sizes.length === 1 ? product.sizes[0] : null, color: product.colors[0] };

  $("#qvMedia").innerHTML = product.images.map((img) => `<img src="${image(img, 1000)}" alt="${product.name}">`).join("");
  $("#qvCategory").textContent = categoryNames[product.category];
  $("#qvTitle").textContent = product.name;
  $("#qvPrice").innerHTML = product.oldPrice
    ? `<s style="color: var(--muted)">${price(product.oldPrice)}</s> ${price(product.price)}`
    : price(product.price);
  $("#qvDesc").textContent = product.description;
  $("#qvError").textContent = "";

  $("#qvColors").innerHTML = product.colors
    .map(
      (color, index) =>
        `<button class="${index === 0 ? "is-active" : ""}" data-color="${color}" style="background:${palette[color].hex}" aria-label="${palette[color].name}"></button>`
    )
    .join("");
  $("#qvColorName").textContent = palette[product.colors[0]].name;

  $("#qvSizes").innerHTML = ["XS", "S", "M", "L", "XL"]
    .map((size) => `<button data-size="${size}" ${product.sizes.includes(size) ? "" : "disabled"}>${size}</button>`)
    .join("");
  if (product.sizes[0] === "One size") $("#qvSizes").innerHTML = `<button class="is-active" data-size="One size">One size</button>`;

  openLayer($("#quickview"));
}

function initQuickView() {
  $("#qvColors").addEventListener("click", (event) => {
    const button = event.target.closest("[data-color]");
    if (!button) return;
    quickState.color = button.dataset.color;
    $$("#qvColors button").forEach((item) => item.classList.toggle("is-active", item === button));
    $("#qvColorName").textContent = palette[button.dataset.color].name;
  });

  $("#qvSizes").addEventListener("click", (event) => {
    const button = event.target.closest("[data-size]");
    if (!button || button.disabled) return;
    quickState.size = button.dataset.size;
    $$("#qvSizes button").forEach((item) => item.classList.toggle("is-active", item === button));
    $("#qvError").textContent = "";
  });

  $("#qvAdd").addEventListener("click", () => {
    if (!quickState.size) {
      $("#qvError").textContent = "Выберите размер";
      return;
    }
    addToCart(quickState.product.id, quickState.size, quickState.color);
    closeAll();
  });

  $("#quickview").addEventListener("click", (event) => {
    if (event.target.id === "quickview") closeAll();
  });
}

function initSearch() {
  const input = $("#searchInput");
  const results = $("#searchResults");

  const highlight = (text, query) =>
    query ? text.replace(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"), "<mark>$1</mark>") : text;

  const render = () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      results.innerHTML = `<p>Популярное: пальто, кожа, шёлк, сумка</p>`;
      return;
    }
    const hits = products.filter((product) =>
      `${product.name} ${product.description} ${categoryNames[product.category]}`.toLowerCase().includes(query)
    );
    results.innerHTML = hits.length
      ? hits
          .map(
            (product, index) => `
            <button class="search-hit" data-search-open="${product.id}" style="animation-delay:${index * 50}ms">
              <img src="${image(product.images[0], 400)}" alt="">
              ${highlight(product.name, input.value.trim())}<br><span style="color: var(--muted)">${price(product.price)}</span>
            </button>`
          )
          .join("")
      : `<p>По запросу «${input.value}» ничего не нашлось</p>`;
  };

  input.addEventListener("input", render);
  results.addEventListener("click", (event) => {
    const hit = event.target.closest("[data-search-open]");
    if (!hit) return;
    closeAll();
    openQuickView(Number(hit.dataset.searchOpen));
  });

  $("#searchOpen").addEventListener("click", () => {
    openLayer($("#searchPanel"));
    render();
    setTimeout(() => input.focus(), 300);
  });
}

function openLayer(layer) {
  closeAll();
  layer.classList.add("is-open");
  $("#overlay").classList.add("is-visible");
  document.body.classList.add("is-locked");
}

function closeAll() {
  $$(".drawer, .search-panel, .quickview").forEach((layer) => layer.classList.remove("is-open"));
  $("#overlay").classList.remove("is-visible");
  document.body.classList.remove("is-locked");
}

function initLayers() {
  $("#cartOpen").addEventListener("click", () => {
    renderCart();
    openLayer($("#cartDrawer"));
  });
  $("#wishlistOpen").addEventListener("click", () => openLayer($("#wishDrawer")));
  $("#overlay").addEventListener("click", closeAll);
  $$("[data-close]").forEach((button) => button.addEventListener("click", closeAll));
  document.addEventListener("keydown", (event) => event.key === "Escape" && closeAll());
}

function bump(element) {
  element.classList.remove("is-bump");
  void element.offsetWidth;
  element.classList.add("is-bump");
}

function showToast(product, text) {
  const toast = $("#toast");
  toast.innerHTML = `<img src="${image(product.images[0], 120)}" alt="">${text}`;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function initHeader() {
  const header = $("#header");
  let lastY = scrollY;

  addEventListener(
    "scroll",
    () => {
      const y = scrollY;
      header.classList.toggle("is-scrolled", y > 40);
      header.classList.toggle("is-hidden", y > lastY && y > 400 && !$("#headerLinks").classList.contains("is-open"));
      lastY = y;
    },
    { passive: true }
  );

  $("#menuToggle").addEventListener("click", () => $("#headerLinks").classList.toggle("is-open"));
}

function initHeroParallax() {
  const columns = $$(".hero__col");
  addEventListener(
    "scroll",
    () => {
      if (scrollY > innerHeight) return;
      columns.forEach((column) => {
        column.querySelector("img").style.translate = `0 ${scrollY * Number(column.dataset.speed)}px`;
      });
    },
    { passive: true }
  );
}

function initManifesto() {
  const text = $("#manifesto");
  text.innerHTML = text.textContent
    .split(" ")
    .map((word) => `<span>${word}</span>`)
    .join(" ");
  const words = $$("span", text);

  const update = () => {
    const rect = text.getBoundingClientRect();
    const progress = (innerHeight * 0.85 - rect.top) / (rect.height + innerHeight * 0.35);
    const litCount = Math.round(Math.min(Math.max(progress, 0), 1) * words.length);
    words.forEach((word, index) => word.classList.toggle("is-lit", index < litCount));
  };

  addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
  update();
}

function initLookbook() {
  const rail = $("#lookbookRail");
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let velocity = 0;
  let lastX = 0;
  let glideFrame = 0;

  rail.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    cancelAnimationFrame(glideFrame);
    velocity = 0;
    isDown = true;
    startX = lastX = event.clientX;
    startScroll = rail.scrollLeft;
    rail.classList.add("is-dragging");
  });

  addEventListener("pointermove", (event) => {
    if (!isDown) return;
    velocity = event.clientX - lastX;
    lastX = event.clientX;
    rail.scrollLeft = startScroll - (event.clientX - startX);
  });

  addEventListener("pointerup", () => {
    if (!isDown) return;
    isDown = false;
    rail.classList.remove("is-dragging");
    const glide = () => {
      velocity *= 0.92;
      rail.scrollLeft -= velocity;
      if (Math.abs(velocity) > 0.5) glideFrame = requestAnimationFrame(glide);
    };
    glide();
  });

  addEventListener("pointercancel", () => {
    isDown = false;
    velocity = 0;
    rail.classList.remove("is-dragging");
    cancelAnimationFrame(glideFrame);
  });
}

function initNewsletter() {
  const form = $("#newsletterForm");
  const message = $("#newsletterMsg");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.elements.email;
    const isValid = email.checkValidity() && email.value.includes(".");
    message.classList.toggle("is-error", !isValid);
    message.textContent = isValid
      ? "Готово! Первое письмо придёт в начале месяца (демо)."
      : "Похоже, в адресе ошибка";
    if (isValid) form.reset();
  });
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }),
    { threshold: 0.15 }
  );
  $$(".reveal").forEach((element) => observer.observe(element));
}

renderProducts();
initFilters();
initProductGrid();
initCart();
initWishlist();
initQuickView();
initSearch();
initLayers();
initHeader();
initHeroParallax();
initManifesto();
initLookbook();
initNewsletter();
initReveal();
