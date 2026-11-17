const Auth = (() => {
  const settings = {
    namespace: "site",
    demo: { name: "Демо Пользователь", email: "demo@example.com", password: "Demo2026" },
    delay: 450
  };

  const messages = {
    name: "Укажите имя — минимум 2 символа",
    email: "Введите корректный e-mail",
    password: "Минимум 8 символов, буквы и цифры",
    confirm: "Пароли не совпадают",
    agree: "Нужно согласие с условиями",
    current: "Введите текущий пароль",
    phone: "Проверьте номер телефона",
    exists: "Аккаунт с таким e-mail уже существует",
    wrong: "Неверный e-mail или пароль",
    wrongCurrent: "Текущий пароль указан неверно",
    same: "Новый пароль совпадает с текущим"
  };

  const strengthLabels = ["Очень слабый", "Слабый", "Средний", "Хороший", "Надёжный"];

  let currentUser = null;

  const keys = () => ({
    users: `${settings.namespace}-users`,
    session: `${settings.namespace}-session`
  });

  const readJson = (storage, key, fallback) => {
    try {
      return JSON.parse(storage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const loadUsers = () => readJson(localStorage, keys().users, {});
  const saveUsers = (users) => localStorage.setItem(keys().users, JSON.stringify(users));

  const normalizeEmail = (email) => String(email || "").trim().toLowerCase();
  const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const isStrongEnough = (password) => password.length >= 8 && /[a-zа-яё]/i.test(password) && /\d/.test(password);
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const randomHex = (bytes = 16) =>
    [...crypto.getRandomValues(new Uint8Array(bytes))].map((byte) => byte.toString(16).padStart(2, "0")).join("");

  async function hashPassword(password, salt) {
    const input = `${salt}:${password}`;
    if (crypto.subtle) {
      const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
      return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
    }
    let hash = 2166136261;
    for (let round = 0; round < 2000; round += 1) {
      for (const char of input + round) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
    }
    return (hash >>> 0).toString(16);
  }

  const publicUser = (user) => {
    if (!user) return null;
    const { hash, salt, ...rest } = user;
    return rest;
  };

  function initials(name = "") {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] || "")
      .join("")
      .toUpperCase();
  }

  function strength(password = "") {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-zа-яё]/.test(password) && /[A-ZА-ЯЁ]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^\wа-яё]/i.test(password)) score += 1;
    if (!isStrongEnough(password)) score = Math.min(score, 1);
    const value = Math.min(score, 4);
    return { score: password ? value : 0, label: password ? strengthLabels[value] : "" };
  }

  function startSession(email, remember) {
    const session = JSON.stringify({ email, at: Date.now() });
    localStorage.removeItem(keys().session);
    sessionStorage.removeItem(keys().session);
    (remember ? localStorage : sessionStorage).setItem(keys().session, session);
  }

  function restoreSession() {
    const session = readJson(localStorage, keys().session, null) || readJson(sessionStorage, keys().session, null);
    const user = session && loadUsers()[session.email];
    currentUser = user ? publicUser(user) : null;
  }

  function emit() {
    document.documentElement.dataset.auth = currentUser ? "in" : "out";
    document.querySelectorAll("[data-auth-name]").forEach((element) => (element.textContent = currentUser?.name || ""));
    document.querySelectorAll("[data-auth-first-name]").forEach((element) => (element.textContent = currentUser?.name.split(" ")[0] || ""));
    document.querySelectorAll("[data-auth-email]").forEach((element) => (element.textContent = currentUser?.email || ""));
    document.querySelectorAll("[data-auth-initials]").forEach((element) => (element.textContent = initials(currentUser?.name)));
    document.querySelectorAll("[data-auth-since]").forEach((element) => {
      element.textContent = currentUser
        ? new Date(currentUser.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
        : "";
    });
    fillProfileForms();
    document.dispatchEvent(new CustomEvent("auth:change", { detail: currentUser }));
  }

  async function register({ name, email, password }) {
    const users = loadUsers();
    const key = normalizeEmail(email);
    if (users[key]) throw new Error(messages.exists);
    const salt = randomHex();
    users[key] = {
      id: randomHex(8),
      name: name.trim(),
      email: key,
      phone: "",
      salt,
      hash: await hashPassword(password, salt),
      createdAt: Date.now(),
      data: {}
    };
    saveUsers(users);
    startSession(key, true);
    currentUser = publicUser(users[key]);
    emit();
    return currentUser;
  }

  async function login(email, password, remember = true) {
    const user = loadUsers()[normalizeEmail(email)];
    if (!user || (await hashPassword(password, user.salt)) !== user.hash) throw new Error(messages.wrong);
    startSession(user.email, remember);
    currentUser = publicUser(user);
    emit();
    return currentUser;
  }

  async function demoLogin() {
    const { name, email, password } = settings.demo;
    if (!loadUsers()[normalizeEmail(email)]) return register({ name, email, password });
    try {
      return await login(email, password, true);
    } catch {
      const users = loadUsers();
      delete users[normalizeEmail(email)];
      saveUsers(users);
      return register({ name, email, password });
    }
  }

  function logout() {
    localStorage.removeItem(keys().session);
    sessionStorage.removeItem(keys().session);
    currentUser = null;
    emit();
  }

  function updateProfile(patch) {
    if (!currentUser) return null;
    const users = loadUsers();
    const user = users[currentUser.email];
    Object.assign(user, patch);
    saveUsers(users);
    currentUser = publicUser(user);
    emit();
    return currentUser;
  }

  async function changePassword(current, next) {
    const users = loadUsers();
    const user = users[currentUser.email];
    if ((await hashPassword(current, user.salt)) !== user.hash) throw new Error(messages.wrongCurrent);
    if (current === next) throw new Error(messages.same);
    user.salt = randomHex();
    user.hash = await hashPassword(next, user.salt);
    saveUsers(users);
  }

  function getData(key, fallback = null) {
    if (!currentUser) return fallback;
    return loadUsers()[currentUser.email]?.data?.[key] ?? fallback;
  }

  function setData(key, value) {
    if (!currentUser) return;
    const users = loadUsers();
    users[currentUser.email].data = { ...users[currentUser.email].data, [key]: value };
    saveUsers(users);
  }

  function pushData(key, item) {
    const list = getData(key, []);
    list.unshift(item);
    setData(key, list);
    return list;
  }

  function fillProfileForms() {
    document.querySelectorAll('[data-auth-form="profile"]').forEach((form) => {
      if (!currentUser) return;
      ["name", "phone", "email"].forEach((field) => {
        if (form.elements[field]) form.elements[field].value = currentUser[field] || "";
      });
    });
  }

  function setFieldError(form, name, message) {
    const input = form.elements[name];
    const field = input?.closest("[data-field]");
    if (!field) return;
    field.classList.toggle("is-invalid", Boolean(message));
    const holder = field.querySelector("[data-field-error]");
    if (holder) holder.textContent = message || "";
  }

  function validate(form, type) {
    const value = (name) => (form.elements[name]?.type === "checkbox" ? form.elements[name].checked : form.elements[name]?.value.trim() ?? "");
    const errors = {};

    if (form.elements.name && value("name").length < 2) errors.name = messages.name;
    if (form.elements.email && !form.elements.email.readOnly && !isEmail(value("email"))) errors.email = messages.email;
    if (form.elements.phone && value("phone") && !/^[\d\s+\-()]{10,}$/.test(value("phone"))) errors.phone = messages.phone;
    if (form.elements.current && !value("current")) errors.current = messages.current;

    if (form.elements.password) {
      const password = form.elements.password.value;
      if (type === "login" ? !password : !isStrongEnough(password)) errors.password = type === "login" ? "Введите пароль" : messages.password;
    }
    if (form.elements.confirm && form.elements.confirm.value !== form.elements.password.value) errors.confirm = messages.confirm;
    if (form.elements.agree && !value("agree")) errors.agree = messages.agree;

    [...form.querySelectorAll("[data-field]")].forEach((field) => {
      const input = field.querySelector("input, select, textarea");
      if (input?.name) setFieldError(form, input.name, errors[input.name]);
    });
    return Object.keys(errors).length === 0;
  }

  function setFormMessage(form, selector, text) {
    const element = form.querySelector(selector);
    if (!element) return;
    element.textContent = text || "";
    element.hidden = !text;
  }

  async function handleSubmit(form, type) {
    setFormMessage(form, "[data-form-error]", "");
    setFormMessage(form, "[data-form-success]", "");
    if (!validate(form, type)) return;

    const button = form.querySelector('[type="submit"]');
    button?.classList.add("is-loading");
    if (button) button.disabled = true;

    try {
      await wait(settings.delay);
      const field = (name) => form.elements[name]?.value.trim() ?? "";

      if (type === "login") await login(field("email"), form.elements.password.value, form.elements.remember?.checked ?? true);
      if (type === "register") await register({ name: field("name"), email: field("email"), password: form.elements.password.value });
      if (type === "profile") {
        updateProfile({ name: field("name"), phone: field("phone") });
        setFormMessage(form, "[data-form-success]", "Изменения сохранены");
      }
      if (type === "password") {
        await changePassword(form.elements.current.value, form.elements.password.value);
        form.reset();
        updateStrength(form);
        setFormMessage(form, "[data-form-success]", "Пароль обновлён");
      }
      if (type === "reset") {
        setFormMessage(form, "[data-form-success]", "Если аккаунт существует, инструкция придёт на почту. В демо-версии письма не отправляются.");
      }

      if (type === "login" || type === "register") form.reset();
      document.dispatchEvent(new CustomEvent("auth:success", { detail: { type, user: currentUser } }));
    } catch (error) {
      setFormMessage(form, "[data-form-error]", error.message);
      form.classList.remove("is-shaking");
      void form.offsetWidth;
      form.classList.add("is-shaking");
    } finally {
      button?.classList.remove("is-loading");
      if (button) button.disabled = false;
    }
  }

  function updateStrength(form) {
    const meter = form.querySelector("[data-strength]");
    if (!meter || !form.elements.password) return;
    const result = strength(form.elements.password.value);
    meter.dataset.score = form.elements.password.value ? result.score : "";
    const label = meter.querySelector("[data-strength-label]");
    if (label) label.textContent = result.label;
  }

  function switchView(root, view) {
    root.dataset.view = view;
    root.querySelectorAll("[data-pane]").forEach((pane) => (pane.hidden = pane.dataset.pane !== view));
    root.querySelectorAll("[data-auth-switch]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.authSwitch === view);
    });
    const firstInput = root.querySelector(`[data-pane="${view}"] input:not([type="hidden"])`);
    if (firstInput && root.offsetParent !== null) setTimeout(() => firstInput.focus({ preventScroll: true }), 120);
  }

  function bind(scope = document) {
    scope.querySelectorAll("[data-auth-form]").forEach((form) => {
      if (form.dataset.authBound) return;
      form.dataset.authBound = "true";
      form.noValidate = true;
      const type = form.dataset.authForm;

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        handleSubmit(form, type);
      });

      form.addEventListener("input", (event) => {
        const field = event.target.closest("[data-field]");
        if (field?.classList.contains("is-invalid")) setFieldError(form, event.target.name, "");
        if (event.target.name === "password") updateStrength(form);
      });
    });

    scope.querySelectorAll("[data-toggle-password]").forEach((button) => {
      if (button.dataset.authBound) return;
      button.dataset.authBound = "true";
      button.type = "button";
      button.addEventListener("click", () => {
        const input = button.closest("[data-field]").querySelector("input");
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        button.classList.toggle("is-visible", isHidden);
        button.setAttribute("aria-label", isHidden ? "Скрыть пароль" : "Показать пароль");
      });
    });

    scope.querySelectorAll("[data-auth-switch]").forEach((button) => {
      if (button.dataset.authBound) return;
      button.dataset.authBound = "true";
      button.type = "button";
      button.addEventListener("click", () => switchView(button.closest("[data-auth-root]"), button.dataset.authSwitch));
    });

    scope.querySelectorAll("[data-auth-demo]").forEach((button) => {
      if (button.dataset.authBound) return;
      button.dataset.authBound = "true";
      button.type = "button";
      button.addEventListener("click", async () => {
        button.classList.add("is-loading");
        await wait(settings.delay);
        await demoLogin();
        button.classList.remove("is-loading");
        document.dispatchEvent(new CustomEvent("auth:success", { detail: { type: "demo", user: currentUser } }));
      });
    });

    scope.querySelectorAll("[data-auth-logout]").forEach((button) => {
      if (button.dataset.authBound) return;
      button.dataset.authBound = "true";
      button.addEventListener("click", () => {
        logout();
        document.dispatchEvent(new CustomEvent("auth:success", { detail: { type: "logout", user: null } }));
      });
    });

    scope.querySelectorAll("[data-auth-root]").forEach((root) => switchView(root, root.dataset.view || "login"));
  }

  function init(options = {}) {
    Object.assign(settings, options);
    const style = document.createElement("style");
    style.textContent =
      'html[data-auth="out"] [data-when="in"], html[data-auth="in"] [data-when="out"] { display: none !important; }' +
      "@keyframes auth-shake { 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }" +
      ".is-shaking { animation: auth-shake 0.4s; }";
    document.head.append(style);
    restoreSession();
    bind();
    emit();
  }

  return {
    init,
    bind,
    switchView,
    register,
    login,
    logout,
    demoLogin,
    updateProfile,
    changePassword,
    strength,
    initials,
    getData,
    setData,
    pushData,
    current: () => currentUser,
    isLoggedIn: () => Boolean(currentUser)
  };
})();
