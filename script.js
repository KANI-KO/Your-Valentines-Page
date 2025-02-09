document.addEventListener("DOMContentLoaded", function () {
  const splashBtn = document.getElementById("open-message-btn");
  splashBtn.addEventListener("click", function() {
    document.getElementById("splash-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    setTimeout(typeNextChar, 2000);
  });

  function createRainDrops(num) {
    const weatherContainer = document.querySelector('.weather-effects');
    for (let i = 0; i < num; i++) {
      let rainDrop = document.createElement('div');
      rainDrop.classList.add('rain');
      rainDrop.style.left = Math.random() * 100 + "vw";
      rainDrop.style.animationDuration = (0.5 + Math.random()) + "s";
      rainDrop.style.animationDelay = Math.random() * 2 + "s";
      weatherContainer.appendChild(rainDrop);
    }
  }
  createRainDrops(50);

  const defaultWidth = "80px";
  const defaultHeight = "60px";
  const defaultFontSize = "25px";
  const initialPadding = "10px 20px";
  const initialFontSize = parseFloat(defaultFontSize);

  let yesButton = document.getElementById("yes-btn");
  let noButton = document.getElementById("no-btn");
  let introScreen = document.getElementById("intro-screen");
  let introText = document.getElementById("intro-text");
  let responseText = document.getElementById("response");
  let questionText = document.getElementById("question");
  let gifContainer = document.getElementById("gif-container");

  yesButton.style.width = defaultWidth;
  noButton.style.width = defaultWidth;
  yesButton.style.height = defaultHeight;
  noButton.style.height = defaultHeight;
  yesButton.style.fontSize = defaultFontSize;
  noButton.style.fontSize = defaultFontSize;
  yesButton.style.padding = initialPadding;
  noButton.style.padding = initialPadding;

  const introLines = [
    "Hey, we've been through a lot together...",
    "And now, our first Valentine's Day is almost here.",
    "So... I made something special for you."
  ];
  let lineIndex = 0;
  let charIndex = 0;

  function typeNextChar() {
    if (charIndex < introLines[lineIndex].length) {
      introText.innerHTML += introLines[lineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeNextChar, 60);
    } else {
      setTimeout(deleteLine, 1500);
    }
  }

  function deleteLine() {
    if (charIndex > 0 && lineIndex < introLines.length - 1) {
      introText.innerHTML = introLines[lineIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(deleteLine, 30);
    } else if (lineIndex < introLines.length - 1) {
      lineIndex++;
      introText.innerHTML = "";
      charIndex = 0;
      setTimeout(typeNextChar, 500);
    } else {
      setTimeout(() => {
        introText.classList.add("fade-out-text");
        setTimeout(() => {
          introScreen.classList.add("hidden");
          setTimeout(() => { introScreen.style.display = "none"; }, 1000);
        }, 1000);
      }, 2000);
    }
  }

  let heartsInterval;
  let bgMusic = new Audio("music.mp3");
  let yesSize = initialFontSize;
  let growthFactor = 1.8;
  let noClicks = 0;
  const messages = [
    "Really no?",
    "Are you positive?",
    "Are you super duper positive?",
    "Last chance to say yes...",
    "Last last chance to say yes...",
    "I will be VERY sad if you say no..."
  ];

  noButton.addEventListener("click", () => {
    if (noClicks < messages.length) {
      questionText.innerText = messages[noClicks];
    } else {
      questionText.innerText = messages[messages.length - 1];
    }
    let computedStyle = window.getComputedStyle(yesButton);
    let currentWidth = parseFloat(computedStyle.width);
    let currentHeight = parseFloat(computedStyle.height);
    let currentFontSize = parseFloat(computedStyle.fontSize);
    let newWidth = currentWidth * growthFactor;
    let newHeight = currentHeight * growthFactor;
    let newFontSize = currentFontSize * growthFactor;
    const maxWidth = 1500;
    const maxHeight = 1000;
    const maxFontSize = 500;
    if (newWidth > maxWidth) newWidth = maxWidth;
    if (newHeight > maxHeight) newHeight = maxHeight;
    if (newFontSize > maxFontSize) newFontSize = maxFontSize;
    yesButton.style.width = newWidth + "px";
    yesButton.style.height = newHeight + "px";
    yesButton.style.fontSize = newFontSize + "px";
    noClicks++;
  });

  yesButton.addEventListener("click", () => {
    questionText.innerText = "Happy Valentine's!";
    questionText.classList.add("big-text");
    responseText.innerHTML = "Yay! I love you!";
    responseText.classList.add("medium-text");
    yesButton.style.display = "none";
    noButton.style.display = "none";
    resetButton.style.display = "block";
    gifContainer.innerHTML = `
      <div class="tenor-gif-embed" data-postid="1975786729994891673"
           data-share-method="host" data-aspect-ratio="1.04762" data-width="100%">
      </div>
    `;
    let tenorScript = document.createElement("script");
    tenorScript.type = "text/javascript";
    tenorScript.async = true;
    tenorScript.src = "https://tenor.com/embed.js";
    document.body.appendChild(tenorScript);
    bgMusic.play();
    startFallingHearts();
  });

  let resetButton = document.createElement("button");
  resetButton.innerText = "Return to Main Title";
  resetButton.id = "reset-btn";
  resetButton.style.display = "none";
  document.body.appendChild(resetButton);

  resetButton.addEventListener("click", () => {
    questionText.innerText = "Will you be my Valentine?";
    questionText.classList.remove("big-text");
    yesButton.style.width = defaultWidth;
    yesButton.style.height = defaultHeight;
    yesButton.style.fontSize = defaultFontSize;
    yesButton.style.padding = initialPadding;
    noButton.style.width = defaultWidth;
    noButton.style.height = defaultHeight;
    noButton.style.fontSize = defaultFontSize;
    noButton.style.padding = initialPadding;
    noClicks = 0;
    yesSize = initialFontSize;
    responseText.innerHTML = "";
    responseText.classList.remove("medium-text");
    yesButton.style.display = "inline-block";
    noButton.style.display = "inline-block";
    resetButton.style.display = "none";
    bgMusic.pause();
    bgMusic.currentTime = 0;
    clearInterval(heartsInterval);
    document.querySelectorAll(".heart").forEach((heart) => heart.remove());
    gifContainer.innerHTML = `
      <div class="tenor-gif-embed" data-postid="18045411243514992895"
           data-share-method="host" data-aspect-ratio="1" data-width="110">
      </div>
    `;
    let tenorScriptReset = document.createElement("script");
    tenorScriptReset.type = "text/javascript";
    tenorScriptReset.async = true;
    tenorScriptReset.src = "https://tenor.com/embed.js";
    document.body.appendChild(tenorScriptReset);
  });

  function startFallingHearts() {
    if (heartsInterval) clearInterval(heartsInterval);
    heartsInterval = setInterval(() => {
      let heart = document.createElement("div");
      heart.innerText = ["❤️", "🥰", "❤️", "💗", "💗"][Math.floor(Math.random() * 5)];
      heart.classList.add("heart");
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 2 + 3 + "s";
      document.body.appendChild(heart);
      setTimeout(() => { heart.remove(); }, 5000);
    }, 250);
  }
});
