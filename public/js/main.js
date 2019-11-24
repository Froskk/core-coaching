const timings = {
  0: {
    bkg1: { add: ["visible", "pan1"] },
    bkg3: { remove: ["visible", "fadeIn", "pan3", "fadeOut"] }
  },

  100: {
    bkg1: { add: ["fadeIn"] }
  },
  8000: {
    bkg1: { add: ["fadeOut"] }
  },
  10000: {
    bkg1: { remove: ["visible", "fadeIn", "pan1", "fadeOut"] },
    bkg2: { add: ["visible", "pan2"] }
  },
  10100: {
    bkg2: { add: ["fadeIn"] }
  },
  18000: {
    bkg2: { add: ["fadeOut"] }
  },
  20000: {
    bkg2: { remove: ["visible", "fadeIn", "pan2", "fadeOut"] },
    bkg3: { add: ["visible", "pan3"] }
  },
  20100: {
    bkg3: { add: ["fadeIn"] }
  },
  28000: {
    bkg3: { add: ["fadeOut"] }
  },
  30000: {
    bkg1: { add: ["visible", "pan1"] }
  }
};

const iterateTimings = object => {
  for (const [key, value] of Object.entries(object)) {
    setTimeout(() => alterClass(value), parseInt(key));
  }
};

const alterClass = data => {
  for (const [key, value] of Object.entries(data)) {
    if (document.querySelector(`.${key}`)) {
      const label = document.querySelector(`.${key}`);
      if (value.add) {
        label.classList.add(...value.add);
        // console.log("adding:", ...value.add, "to:", key);
      }
      if (value.remove) {
        label.classList.remove(...value.remove);
        // console.log("removing", ...value.remove, "to:", key);
      }
    }
  }
};

const setViewportSize = () => {
  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--vw", `${vw}px`);
};

window.onload = () => {
  setViewportSize();

  const hash = window.location.hash.replace("#", "");
  const footer = document.querySelector(".footer");

  if (hash.length !== 0 && hash !== "home") {
    if (document.getElementById(hash))
      document.getElementById(hash).classList.add("active");
    footer.querySelector(`.${hash}`).classList.add("slider");
  } else {
    footer.querySelector(".home").classList.add("slider");
    const backgroundPan = setInterval(() => iterateTimings(timings), 30000);
    iterateTimings(timings);
  }

  // TODO: if Phone/Tablet, enable this
  // window.addEventListener("resize", () => setViewportSize());
};
