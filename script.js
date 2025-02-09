document.addEventListener("DOMContentLoaded", function () {
    // ----- SPLASH SCREEN HANDLING -----
    const splashBtn = document.getElementById("open-message-btn");
    splashBtn.addEventListener("click", function() {
        // Hide the splash screen and reveal main content
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    });

    // (Optional) Create rain drops for weather effects on the splash screen
    function createRainDrops(num) {
        const weatherContainer = document.querySelector('.weather-effects');
        for (let i = 0; i < num; i++) {
            let rainDrop = document.createElement('div');
            rainDrop.classList.add('rain');
            // Position the raindrop at a random horizontal location
            rainDrop.style.left = Math.random() * 100 + "vw";
            // Randomize the falling duration for variety
            rainDrop.style.animationDuration = (0.5 + Math.random()) + "s";
            // Random delay before each drop starts falling
            rainDrop.style.animationDelay = Math.random() * 2 + "s";
            weatherContainer.appendChild(rainDrop);
        }
    }
    createRainDrops(50); // Adjust the number of drops as desired

    // ----- EXISTING CODE BELOW -----
    // Define default sizing constants
    const defaultWidth = "80px";
    const defaultHeight = "60px";
    const defaultFontSize = "25px";
    const initialPadding = "10px 20px";
    const initialFontSize = parseFloat(defaultFontSize); // 25

    // Grab elements from the DOM
    let yesButton = document.getElementById("yes-btn");
    let noButton = document.getElementById("no-btn");
    let introScreen = document.getElementById("intro-screen");
    let introText = document.getElementById("intro-text");
    let responseText = document.getElementById("response");
    let questionText = document.getElementById("question");
    let gifContainer = document.getElementById("gif-container");

    // Set initial button sizes
    yesButton.style.width = defaultWidth;
    noButton.style.width = defaultWidth;
    yesButton.style.height = defaultHeight;
    noButton.style.height = defaultHeight;
    yesButton.style.fontSize = defaultFontSize;
    noButton.style.fontSize = defaultFontSize;
    yesButton.style.padding = initialPadding;
    noButton.style.padding = initialPadding;

    // Intro lines for typewriter effect
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
            lineIndex++;
            introText.innerHTML = "";
            charIndex = 0;
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

    // Start the typewriter animation after 2 seconds
    setTimeout(typeNextChar, 2000);

    // Other global variables and constants
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

    // "No" button: update the question text and increase the Yes button size
    noButton.addEventListener("click", () => {
        if (noClicks < messages.length) {
            questionText.innerText = messages[noClicks];
        } else {
            questionText.innerText = messages[messages.length - 1];
        }

        // Use computed style for accurate sizing:
        let computedStyle = window.getComputedStyle(yesButton);
        let currentWidth = parseFloat(computedStyle.width);
        let currentHeight = parseFloat(computedStyle.height);
        let currentFontSize = parseFloat(computedStyle.fontSize);

        // Calculate new sizes using the growth factor
        let newWidth = currentWidth * growthFactor;
        let newHeight = currentHeight * growthFactor;
        let newFontSize = currentFontSize * growthFactor;

        // Set maximum allowed dimensions and font size
        const maxWidth = 1500;
        const maxHeight = 1000;
        const maxFontSize = 500; // Adjust this value as desired

        if (newWidth > maxWidth) {
            newWidth = maxWidth;
        }
        if (newHeight > maxHeight) {
            newHeight = maxHeight;
        }
        if (newFontSize > maxFontSize) {
            newFontSize = maxFontSize;
        }

        // Apply the new dimensions and font size to the Yes button
        yesButton.style.width = newWidth + "px";
        yesButton.style.height = newHeight + "px";
        yesButton.style.fontSize = newFontSize + "px";

        noClicks++;
    });

    // "Yes" button click: replace content, play music, and start falling hearts
    yesButton.addEventListener("click", () => {
        questionText.innerText = "Happy Valentine's!";
        questionText.classList.add("big-text");

        responseText.innerHTML = "Yay! I love you!";
        responseText.classList.add("medium-text");

        // Hide the Yes/No buttons and show the reset button
        yesButton.style.display = "none";
        noButton.style.display = "none";
        resetButton.style.display = "block";

        // Replace the GIF container content with a new Tenor embed
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

    // "Reset" button: 回到最初的美好
    let resetButton = document.createElement("button");
    resetButton.innerText = "Return to Main Title";
    resetButton.id = "reset-btn";
    resetButton.style.display = "none"; // Hidden at start
    document.body.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
        questionText.innerText = "Will you be my Valentine?";
        questionText.classList.remove("big-text");

        // Reset Yes and No buttons to their original sizes and padding
        yesButton.style.width = defaultWidth;
        yesButton.style.height = defaultHeight;
        yesButton.style.fontSize = defaultFontSize;
        yesButton.style.padding = initialPadding;

        noButton.style.width = defaultWidth;
        noButton.style.height = defaultHeight;
        noButton.style.fontSize = defaultFontSize;
        noButton.style.padding = initialPadding;

        // Reset dynamic variables
        noClicks = 0;
        yesSize = initialFontSize;

        // Clear any response text and related classes
        responseText.innerHTML = "";
        responseText.classList.remove("medium-text");

        // Show the Yes/No buttons and hide the Reset button
        yesButton.style.display = "inline-block";
        noButton.style.display = "inline-block";
        resetButton.style.display = "none";

        // Stop the background music and reset its time
        bgMusic.pause();
        bgMusic.currentTime = 0;

        // Stop the falling hearts animation and remove any existing heart elements
        clearInterval(heartsInterval);
        document.querySelectorAll(".heart").forEach((heart) => heart.remove());

        // Restore the original GIF in the GIF container
        gifContainer.innerHTML = `
            <div class="tenor-gif-embed" data-postid="18045411243514992895"
                 data-share-method="host" data-aspect-ratio="1" data-width="110">
            </div>
        `;
        
        // Reload the Tenor embed script
        let tenorScriptReset = document.createElement("script");
        tenorScriptReset.type = "text/javascript";
        tenorScriptReset.async = true;
        tenorScriptReset.src = "https://tenor.com/embed.js";
        document.body.appendChild(tenorScriptReset);
    });

    // Falling Hearts Animation Function
    function startFallingHearts() {
        if (heartsInterval) {
            clearInterval(heartsInterval);
        }
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
