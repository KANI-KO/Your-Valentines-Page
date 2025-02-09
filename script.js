document.addEventListener("DOMContentLoaded", function () {
    // --- Splash Screen Functionality ---
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const openMessageBtn = document.getElementById("open-message-btn");
    openMessageBtn.addEventListener("click", () => {
        splashScreen.style.display = "none";
        mainContent.style.display = "block";
        // Start the typewriter intro after the splash is dismissed
        setTimeout(typeNextChar, 2000);
    });
    
    // Increase number of rain drops for a more evident rain effect
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
    createRainDrops(100);
    
    // --- Friend's default sizing constants ---
    const defaultWidth = "80px";
    const defaultHeight = "60px";
    const defaultFontSize = "25px";

    // --- Set initial button sizes ---
    let yesButton = document.getElementById("yes-btn");
    let noButton = document.getElementById("no-btn");

    yesButton.style.width = defaultWidth;
    noButton.style.width = defaultWidth;
    yesButton.style.height = defaultHeight;
    noButton.style.height = defaultHeight;
    yesButton.style.fontSize = defaultFontSize;
    noButton.style.fontSize = defaultFontSize;

    // --- Global constants for dynamic resizing ---
    const initialFontSize = parseFloat(defaultFontSize); // 25
    const initialPadding = "10px 20px";

    // --- Typewriter Intro Code ---
    let introScreen = document.getElementById("intro-screen");
    let introText = document.getElementById("intro-text");

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
            setTimeout(typeNextChar, 60); // Typing speed
        } else {
            setTimeout(deleteLine, 1500); // Pause before deleting
        }
    }

    function deleteLine() {
        if (charIndex > 0 && lineIndex < introLines.length - 1) {
            // Delete one character at a time
            introText.innerHTML = introLines[lineIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteLine, 30);
        } else if (lineIndex < introLines.length - 1) {
            // Move to the next sentence
            lineIndex++;
            charIndex = 0;
            introText.innerHTML = "";
            setTimeout(typeNextChar, 500);
        } else {
            // After the last sentence, fade out the intro screen
            setTimeout(() => {
                introText.classList.add("fade-out-text"); 
                setTimeout(() => {
                    introScreen.classList.add("hidden"); 
                    setTimeout(() => { introScreen.style.display = "none"; }, 1000);
                }, 1000);
            }, 2000);
        }
    }

    // --- Main Functionality Variables ---
    let responseText = document.getElementById("response");
    let questionText = document.getElementById("question");
    let gifContainer = document.getElementById("gif-container");
    let heartsInterval;

    // --- Create Reset Button ---
    let resetButton = document.createElement("button");
    resetButton.innerText = "Return to Main Title";
    resetButton.id = "reset-btn";
    resetButton.style.display = "none";
    document.body.appendChild(resetButton);

    // --- Background Music ---
    let bgMusic = new Audio("music.mp3");

    // --- Variables for Yes Button dynamic resizing ---
    let yesSize = initialFontSize;
    let growthFactor = 1.4;
    let noClicks = 0;

    const messages = [
        "Really no?",
        "Are you positive?",
        "Are you super duper positive?",
        "Last chance to say yes...",
        "Last last chance to say yes...",
        "I will be VERY sad if you say no..."
    ];

    // --- Yes Button Click Functionality ---
    function handleYesClick() {
        questionText.innerText = "Happy Valentine's!";
        questionText.classList.add("big-text");

        responseText.innerHTML = "Yay! I love you!";
        responseText.classList.add("medium-text");

        // Hide yes/no buttons (and alternative if present)
        yesButton.style.display = "none";
        noButton.style.display = "none";
        let altYesButton = document.getElementById("alternative-yes-btn");
        if (altYesButton) {
            altYesButton.style.display = "none";
        }
        resetButton.style.display = "block";

        // Replace the GIF container content with the direct GIF for the yes page
        gifContainer.innerHTML = `<img src="https://c.tenor.com/G2tnkBFGsZkAAAAd/tenor.gif" alt="Happy Valentine's Gif" style="width:100%;">`;

        bgMusic.play();
        startFallingHearts();
    }

    yesButton.addEventListener("click", handleYesClick);

    // --- No Button Click Functionality ---
    noButton.addEventListener("click", () => {
        if (noClicks === 5) {  // On the 6th click (0-based count)
            questionText.innerText = "Seems like you're a bit hesitant... How about clicking 'Yes, please!' instead?";
            noButton.style.display = "none"; // Hide original No button

            // Create alternative Yes button
            let alternativeYesButton = document.createElement("button");
            alternativeYesButton.id = "alternative-yes-btn";
            alternativeYesButton.innerText = "Yes, please!";
            alternativeYesButton.style.fontSize = initialFontSize + "px";
            alternativeYesButton.style.padding = initialPadding;
            document.querySelector(".buttons").appendChild(alternativeYesButton);

            alternativeYesButton.addEventListener("click", handleYesClick);
        } else {
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
        }
    });

    // --- Reset Button Functionality ---
    resetButton.addEventListener("click", () => {
        questionText.innerText = "Will you be my Valentine?";
        questionText.classList.remove("big-text");

        yesSize = initialFontSize;
        yesButton.style.width = defaultWidth;
        yesButton.style.height = defaultHeight;
        yesButton.style.fontSize = defaultFontSize;
        yesButton.style.padding = initialPadding;
        noButton.style.fontSize = defaultFontSize;
        noButton.style.padding = initialPadding;

        noClicks = 0;
        responseText.innerHTML = "";
        responseText.classList.remove("medium-text");

        yesButton.style.display = "inline-block";
        noButton.style.display = "inline-block";
        resetButton.style.display = "none";

        let altYesButton = document.getElementById("alternative-yes-btn");
        if (altYesButton) {
            altYesButton.remove();
        }

        bgMusic.pause();
        bgMusic.currentTime = 0;

        clearInterval(heartsInterval);
        document.querySelectorAll(".heart").forEach((heart) => heart.remove());

        // Replace the GIF container content with the direct GIF for the options page
        gifContainer.innerHTML = `<img src="https://gifdb.com/images/high/peach-and-goma-kissing-love-you-93bv2g2zpuup4979.webp" alt="Peach and Goma" style="width:110px;">`;
        
        // Reset the yesButton's inline transform, if any
        yesButton.style.transform = "none";
    });

    // --- Falling Hearts Animation ---
    function startFallingHearts() {
        if (heartsInterval) {
            clearInterval(heartsInterval);
        }
        heartsInterval = setInterval(() => {
            let heart = document.createElement("div");
            heart.innerText = ["🥰", "😘", "🥳", "👩‍❤️‍💋‍👨", "🌹", "🌷", "💐", "🪻", "🪷", "🌺", "🌸", "🌼", "🩷", "❤️", 
                               "🧡", "💛", "💚", "🩵", "💙", "💜", "💕", "💞", "💓", "💗", "💖", "💘", "💝"][Math.floor(Math.random() * 27)];
            heart.classList.add("heart");
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 2 + 3 + "s";
            document.body.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 250);
    }
});
