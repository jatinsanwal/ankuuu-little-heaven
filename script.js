
/* ============================================
   ANKUUU'S LITTLE HEAVEN 💗
   Magical Interactions & Animations
============================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTS
  const welcomeScreen = document.getElementById("welcomeScreen");
  const mainWebsite = document.getElementById("mainWebsite");
  const enterButton = document.getElementById("enterButton");
  const typingText = document.getElementById("typingText");

  const music = document.getElementById("backgroundMusic");
  const musicToggle = document.getElementById("musicToggle");

  const tapEffects = document.getElementById("tapEffects");
  const starsLayer = document.getElementById("starsLayer");
  const petalLayer = document.getElementById("petalLayer");

  // ==========================================
  // 1. TYPING ANIMATION ⌨️
  // ==========================================

  const typingMessages = [
    "A little surprise is waiting for you...",
    "You deserve all the happiness, Ankuuu! 💗",
    "This little world is made with care. 🌷"
  ];

  let messageIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeEffect() {

    const currentMessage = typingMessages[messageIndex];

    if (!deleting) {

      typingText.textContent =
        currentMessage.substring(0, characterIndex + 1);

      characterIndex++;

      if (characterIndex === currentMessage.length) {
        deleting = true;
        setTimeout(typeEffect, 1800);
        return;
      }

    } else {

      typingText.textContent =
        currentMessage.substring(0, characterIndex - 1);

      characterIndex--;

      if (characterIndex === 0) {
        deleting = false;
        messageIndex =
          (messageIndex + 1) % typingMessages.length;
      }

    }

    setTimeout(typeEffect, deleting ? 35 : 75);
  }

  typeEffect();


  // ==========================================
  // 2. WELCOME ENTRY 💗
  // ==========================================

  enterButton.addEventListener("click", () => {

    welcomeScreen.classList.add("hide");

    setTimeout(() => {
      welcomeScreen.style.display = "none";
      mainWebsite.classList.remove("hidden");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      heartExplosion(
        window.innerWidth / 2,
        window.innerHeight / 2
      );

      createPetalShower(18);

    }, 850);

  });


  // ==========================================
  // 3. PAGE NAVIGATION 🌸
  // ==========================================

  const pageNames = [
    "home",
    "safe",
    "proud",
    "relax",
    "letter"
  ];

  const pages = pageNames.map(name =>
    document.getElementById("page-" + name)
  );

  const navButtons =
    document.querySelectorAll(".nav-button");

  const previousButton =
    document.getElementById("previousPage");

  const nextButton =
    document.getElementById("nextPage");

  const pageCounter =
    document.getElementById("pageCounter");

  let currentPage = 0;

  function showPage(index) {

    if (index < 0 || index >= pages.length) return;

    currentPage = index;

    pages.forEach((page, i) => {

      page.classList.remove("active");

      if (i === index) {
        void page.offsetWidth;
        page.classList.add("active");
      }

    });

    navButtons.forEach((button, i) => {
      button.classList.toggle("active", i === index);
    });

    pageCounter.textContent =
      String(index + 1).padStart(2, "0") +
      " / " +
      String(pages.length).padStart(2, "0");

    previousButton.disabled = index === 0;
    nextButton.disabled = index === pages.length - 1;

    previousButton.style.opacity =
      index === 0 ? ".45" : "1";

    nextButton.style.opacity =
      index === pages.length - 1 ? ".45" : "1";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    if (index !== 0) {
      heartExplosion(
        window.innerWidth / 2,
        150
      );
    }

  }

  navButtons.forEach((button, index) => {

    button.addEventListener("click", () => {
      showPage(index);
    });

  });

  previousButton.addEventListener("click", () => {
    showPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    showPage(currentPage + 1);
  });

  document.getElementById("homeLogo")
    .addEventListener("click", event => {
      event.preventDefault();
      showPage(0);
    });

  document.querySelectorAll("[data-go]").forEach(button => {

    button.addEventListener("click", () => {

      const target = button.dataset.go;
      const index = pageNames.indexOf(target);

      if (index !== -1) showPage(index);

    });

  });


  // ==========================================
  // 4. FLOATING STARS ✨
  // ==========================================

  const starSymbols = [
    "✦", "✧", "⋆", "♡", "✨"
  ];

  for (let i = 0; i < 24; i++) {

    const star = document.createElement("span");

    star.textContent =
      starSymbols[Math.floor(Math.random() * starSymbols.length)];

    star.style.position = "absolute";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.fontSize = (10 + Math.random() * 13) + "px";
    star.style.color =
      Math.random() > .5 ? "#d8a9d5" : "#b8a8e9";

    star.style.opacity = ".55";
    star.style.animation =
      `starTwinkle ${2 + Math.random() * 4}s ease-in-out infinite`;

    starsLayer.appendChild(star);

  }


  // ==========================================
  // 5. ROSE PETAL RAIN 🌹
  // ==========================================

  const petalSymbols = [
    "🌸", "🌷", "🌹", "💮"
  ];

  function createPetalShower(amount = 15) {

    for (let i = 0; i < amount; i++) {

      const petal = document.createElement("span");

      petal.className = "falling-petal";

      petal.textContent =
        petalSymbols[
          Math.floor(Math.random() * petalSymbols.length)
        ];

      petal.style.left = Math.random() * 100 + "vw";

      petal.style.fontSize =
        (14 + Math.random() * 15) + "px";

      petal.style.animationDuration =
        (3 + Math.random() * 3) + "s";

      petal.style.animationDelay =
        (Math.random() * .8) + "s";

      petal.style.setProperty(
        "--drift",
        (Math.random() * 180 - 90) + "px"
      );

      petalLayer.appendChild(petal);

      petal.addEventListener("animationend", () => {
        petal.remove();
      });

    }

  }


  // ==========================================
  // 6. HEART EXPLOSION 💗
  // ==========================================

  const heartSymbols = [
    "💗", "💕", "💖", "💞", "💘", "♡"
  ];

  function heartExplosion(x, y) {

    for (let i = 0; i < 9; i++) {

      const heart = document.createElement("span");

      heart.className = "tap-particle";

      heart.textContent =
        heartSymbols[
          Math.floor(Math.random() * heartSymbols.length)
        ];

      heart.style.left = x + "px";
      heart.style.top = y + "px";

      const angle = (Math.PI * 2 * i) / 9;
      const distance = 65 + Math.random() * 55;

      heart.style.setProperty(
        "--move-x",
        Math.cos(angle) * distance + "px"
      );

      heart.style.setProperty(
        "--move-y",
        Math.sin(angle) * distance + "px"
      );

      tapEffects.appendChild(heart);

      heart.addEventListener("animationend", () => {
        heart.remove();
      });

    }

  }


  // ==========================================
  // 7. TAP MAGIC 🌷
  // ==========================================

  let lastTapTime = 0;

  document.addEventListener("click", event => {

    if (event.target.closest("button, a, input")) {

      const now = Date.now();

      if (now - lastTapTime < 180) return;

      lastTapTime = now;

      heartExplosion(
        event.clientX,
        event.clientY
      );

      // Occasionally add a few extra petals
      if (Math.random() > .55) {
        createPetalShower(4);
      }

    }

  });


  // ==========================================
  // 8. RANDOM COMFORT MESSAGES 🧸
  // ==========================================

  const comfortMessages = [

    "Ankuuu, tumhari smile bahut precious hai. Use kabhi khona mat. 💗",

    "Ek paper tumhari poori capability decide nahi kar sakta. 🌷",

    "Thoda rest karna bhi zaroori hai. Take care of yourself. 🦋",

    "You are trying, and that itself deserves appreciation. ✨",

    "Jab bhi mann heavy ho, kisi trusted person se baat kar lena. You deserve support. 💞",

    "Slow progress is still progress. Apne aap ko time do. 🌸",

    "Tumhari mehnat ka respect hamesha rahega. Keep believing in yourself. 💗",

    "Aaj ka din perfect na bhi ho, tum phir bhi kindness deserve karti ho. 🧸"

  ];

  const comfortMessage =
    document.getElementById("comfortMessage");

  const comfortButton =
    document.getElementById("comfortButton");

  comfortButton.addEventListener("click", () => {

    let newMessage;

    do {
      newMessage =
        comfortMessages[
          Math.floor(Math.random() * comfortMessages.length)
        ];
    } while (
      newMessage === comfortMessage.textContent
    );

    comfortMessage.animate(
      [
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 450,
        easing: "ease-out"
      }
    );

    comfortMessage.textContent = newMessage;

    heartExplosion(
      comfortButton.getBoundingClientRect().left + 70,
      comfortButton.getBoundingClientRect().top
    );

  });


  // ==========================================
  // 9. BREATHING EXERCISE 🫧
  // ==========================================

  const breathingCircle =
    document.getElementById("breathingCircle");

  const breathingText =
    document.getElementById("breathingText");

  const breathingHint =
    document.getElementById("breathingHint");

  const breathingButton =
    document.getElementById("breathingButton");

  let breathingInterval = null;
  let breathingStep = 0;
  let breathingCount = 0;

  const breathingSteps = [
    {
      text: "Breathe In 🌷",
      hint: "Aaram se saans andar lo...",
    },
    {
      text: "Breathe Out 🫧",
      hint: "Dheere se saans bahar chhodo..."
    }
  ];

  function stopBreathing() {

    clearInterval(breathingInterval);
    breathingInterval = null;

    breathingCircle.classList.remove("running");

    breathingText.textContent = "Breathe 💗";

    breathingHint.textContent =
      "Jab mann kare, dobara try kar sakti ho.";

    breathingButton.textContent =
      "Start Relaxing 🌷";

  }

  breathingButton.addEventListener("click", () => {

    if (breathingInterval) {
      stopBreathing();
      return;
    }

    breathingStep = 0;
    breathingCount = 0;

    breathingCircle.classList.add("running");

    breathingButton.textContent = "Stop Exercise";

    function updateBreathing() {

      const step =
        breathingSteps[breathingStep % 2];

      breathingText.textContent = step.text;
      breathingHint.textContent = step.hint;

      breathingStep++;
      breathingCount++;

      if (breathingCount >= 8) {

        stopBreathing();

        breathingHint.textContent =
          "Well done! Ab thoda relax karo. You deserve this break. 💗";

      }

    }

    updateBreathing();

    breathingInterval =
      setInterval(updateBreathing, 4000);

  });


  // ==========================================
  // 10. OPEN PERSONAL LETTER 💌
  // ==========================================

  const letterButton =
    document.getElementById("openLetterButton");

  const letterEnvelope =
    document.getElementById("letterEnvelope");

  const letterContent =
    document.getElementById("letterContent");

  letterButton.addEventListener("click", () => {

    letterEnvelope.classList.add("hidden");

    letterContent.classList.remove("hidden");

    letterContent.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    createPetalShower(22);

    heartExplosion(
      window.innerWidth / 2,
      window.innerHeight / 2
    );

  });


  // ==========================================
  // 11. MUSIC PLAYER 🎵
  // ==========================================

  musicToggle.addEventListener("click", async () => {

    if (music.paused) {

      try {

        await music.play();

        musicToggle.textContent = "Ⅱ";
        musicToggle.setAttribute("aria-label", "Turn music off");

      } catch (error) {

        musicToggle.textContent = "▶";

        alert(
          "Song play nahi ho paaya. Check karo ki assets/song.mp3 upload hai ya nahi. 💗"
        );

      }

    } else {

      music.pause();

      musicToggle.textContent = "▶";
      musicToggle.setAttribute("aria-label", "Turn music on");

    }

  });


  // ==========================================
  // 12. MOBILE SWIPE NAVIGATION 📱
  // ==========================================

  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener("touchstart", event => {

    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;

  }, { passive: true });

  document.addEventListener("touchend", event => {

    const touchEndX = event.changedTouches[0].screenX;
    const touchEndY = event.changedTouches[0].screenY;

    const differenceX = touchEndX - touchStartX;
    const differenceY = touchEndY - touchStartY;

    if (
      Math.abs(differenceX) > 100 &&
      Math.abs(differenceY) < 75 &&
      mainWebsite.classList.contains("hidden") === false
    ) {

      if (differenceX < 0) {
        showPage(Math.min(currentPage + 1, pages.length - 1));
      } else {
        showPage(Math.max(currentPage - 1, 0));
      }

    }

  }, { passive: true });


  // ==========================================
  // 13. FINAL SETUP 💗
  // ==========================================

  showPage(0);

  console.log(
    "💗 Welcome to Ankuuu's Little Heaven! 🦋"
  );

});
