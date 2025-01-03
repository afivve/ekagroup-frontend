export const loadinge = (/** @type {any} */ buka) => {
  const target = document.getElementById("loader")?.classList;
  if (buka) {
    setTimeout(() => {
      target?.add("backdrop-blur-lg");
      setTimeout(() => {
        target?.remove("hidden");
      }, 20);
    }, 20);
  } else {
    setTimeout(() => {
      setTimeout(() => {
        target?.remove("backdrop-blur-lg");
        setTimeout(() => {
          target?.add("hidden");
        }, 300);
      }, 300);
    }, 300);
  }
};
