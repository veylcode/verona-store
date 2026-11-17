const account = (() => {
  const drawer = $("#accountDrawer");
  let pendingCheckout = false;

  function notify(text) {
    const toast = $("#toast");
    toast.textContent = text;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
  }

  function orderStatus(order) {
    const hours = (Date.now() - order.at) / 3600000;
    if (hours < 24) return { label: "Собирается", done: false };
    if (hours < 72) return { label: "В пути", done: false };
    return { label: "Доставлен", done: true };
  }

  function renderAccount() {
    const orders = Auth.getData("orders", []);
    $("#accOrders").textContent = orders.length;
    $("#accWish").textContent = state.wishlist.size;

    $("#ordersList").innerHTML = orders.length
      ? orders
          .map((order, index) => {
            const status = orderStatus(order);
            const items = order.items.map((item) => `${item.name} · ${item.size} × ${item.qty}`).join("<br>");
            return `
            <li class="order" style="animation-delay:${index * 60}ms">
              <div class="order__top">
                <b>№ ${order.number}</b>
                <span class="order__status ${status.done ? "order__status--done" : ""}">${status.label}</span>
              </div>
              <p>${new Date(order.at).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</p>
              <p>${items}</p>
              <div class="order__total"><span>Итого</span><b>${price(order.total)}</b></div>
            </li>`;
          })
          .join("")
      : `<li class="orders__empty">Заказов пока нет — самое время выбрать что-то из новой коллекции.</li>`;
  }

  function openAccount(notice = "") {
    renderAccount();
    $("#accountNotice").textContent = notice;
    $("#accountNotice").hidden = !notice;
    openLayer(drawer);
  }

  function init() {
    Auth.init({
      namespace: "verona",
      demo: { name: "Софья Веронова", email: "demo@verona.store", password: "Demo2026" }
    });

    $("#accountOpen").addEventListener("click", () => openAccount());
    $("#accWishBtn").addEventListener("click", () => {
      renderWishlist();
      openLayer($("#wishDrawer"));
    });

    $$("[data-account-section]", drawer).forEach((button) =>
      button.addEventListener("click", () => {
        const target = $(`#${button.dataset.accountSection}Section`);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      })
    );

    document.addEventListener("auth:required", ({ detail }) => {
      pendingCheckout = true;
      Auth.switchView($("[data-auth-root]", drawer), "login");
      openAccount(detail.reason);
    });

    document.addEventListener("order:placed", ({ detail }) => {
      Auth.pushData("orders", detail);
      renderAccount();
    });

    document.addEventListener("auth:success", ({ detail }) => {
      if (["login", "register", "demo"].includes(detail.type)) {
        $("#accountNotice").hidden = true;
        renderAccount();
        notify(`Здравствуйте, ${detail.user.name.split(" ")[0]}`);
        if (pendingCheckout) {
          pendingCheckout = false;
          renderCart();
          setTimeout(() => openLayer($("#cartDrawer")), 500);
        }
      }
      if (detail.type === "logout") notify("Вы вышли из аккаунта");
    });

    document.addEventListener("auth:change", renderAccount);
    renderAccount();
  }

  return { init, openAccount };
})();

account.init();
