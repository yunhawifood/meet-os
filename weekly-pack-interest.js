(function () {

  "use strict";

  const WEEKLY_PACK_API =
    "https://yunhawi-payment-api.yunhawifood.workers.dev";

  const TOKEN_KEY =
    "yunhawiWeeklyPackInterestToken";

  const REGISTERED_KEY =
    "yunhawiWeeklyPackInterested";

  function createAnonymousToken() {

    if (
      window.crypto &&
      typeof window.crypto.randomUUID === "function"
    ) {
      return window.crypto
        .randomUUID()
        .replaceAll("-", "");
    }

    const bytes = new Uint8Array(24);

    window.crypto.getRandomValues(bytes);

    return Array.from(bytes)
      .map(function (value) {
        return value
          .toString(16)
          .padStart(2, "0");
      })
      .join("");

  }

  function readStoredValue(key) {

    try {
      return localStorage.getItem(key) || "";
    } catch {
      return "";
    }

  }

  function saveStoredValue(key, value) {

    try {
      localStorage.setItem(key, value);
    } catch {
      /*
        브라우저 저장공간이 차단된 환경에서도
        현재 페이지의 관심등록은 정상 처리합니다.
      */
    }

  }

  function getAnonymousToken() {

    const stored = readStoredValue(TOKEN_KEY);

    if (/^[A-Za-z0-9_-]{20,120}$/.test(stored)) {
      return stored;
    }

    const token = createAnonymousToken();

    saveStoredValue(TOKEN_KEY, token);

    return token;

  }

  function showRegistered(button, status) {

    button.disabled = true;
    button.classList.add("is-registered");
    button.textContent = "관심 등록 완료 ✓";

    if (status) {
      status.textContent =
        "감사합니다. 연락처 없이 관심만 안전하게 등록되었습니다.";
      status.classList.add("is-success");
    }

  }

  async function registerInterest(button) {

    const card = button.closest(
      "[data-weekly-pack-card]",
    );

    const status = card
      ? card.querySelector(
          "[data-weekly-pack-status]",
        )
      : null;

    const source =
      String(button.dataset.source || "").trim();

    button.disabled = true;
    button.textContent = "등록하고 있습니다…";

    if (status) {
      status.textContent = "";
      status.classList.remove(
        "is-success",
        "is-error",
      );
    }

    try {

      const response = await fetch(
        WEEKLY_PACK_API +
          "/weekly-pack/interests",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            token: getAnonymousToken(),
            source,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message ||
          "관심등록을 완료하지 못했습니다.",
        );
      }

      saveStoredValue(REGISTERED_KEY, "1");
      showRegistered(button, status);

      document
        .querySelectorAll(
          "[data-weekly-pack-interest]",
        )
        .forEach(function (otherButton) {
          if (otherButton !== button) {
            showRegistered(otherButton, null);
          }
        });

    } catch (error) {

      button.disabled = false;
      button.textContent = "👍 든든팩 관심 있어요";

      if (status) {
        status.textContent =
          error instanceof Error
            ? error.message
            : "잠시 후 다시 시도해주세요.";
        status.classList.add("is-error");
      }

    }

  }

  function initializeWeeklyPackInterest() {

    const alreadyRegistered =
      readStoredValue(REGISTERED_KEY) === "1";

    document
      .querySelectorAll(
        "[data-weekly-pack-interest]",
      )
      .forEach(function (button) {

        const card = button.closest(
          "[data-weekly-pack-card]",
        );

        const status = card
          ? card.querySelector(
              "[data-weekly-pack-status]",
            )
          : null;

        if (alreadyRegistered) {
          showRegistered(button, status);
        }

        button.addEventListener(
          "click",
          function () {
            if (!button.disabled) {
              void registerInterest(button);
            }
          },
        );

      });

  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeWeeklyPackInterest,
      { once: true },
    );
  } else {
    initializeWeeklyPackInterest();
  }

})();
