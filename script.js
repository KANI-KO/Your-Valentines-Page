document.addEventListener("DOMContentLoaded", function () {
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
            // Move to the next sentence: reset charIndex and clear text
            lineIndex++;
            charIndex = 0;
            introText.innerHTML = "";
            setTimeout(typeNextChar, 500);
        } else {
            // After the last sentence, fade out the intro screen (if intended)
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
    }

    yesButton.addEventListener("click", handleYesClick);

    // --- No Button Click Functionality ---
    noButton.addEventListener("click", () => {
        if (noClicks === 4) {  // On the 6th click
            questionText.innerText = "Seems like you're a bit hesitant... How about clicking 'Yes, please!' instead?";
            noButton.style.display = "none"; // Hide original No button
    
            // Create alternative Yes button with initial styles
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
            const maxWidth = 300;
            const maxHeight = 150;
            const maxFontSize = 40;  // Change this value as desired
    
            if (newWidth > maxWidth) {
                newWidth = maxWidth;
            }
            if (newHeight > maxHeight) {
                newHeight = maxHeight;
            }
            if (newFontSize > maxFontSize) {
                newFontSize = maxFontSize;
            }
    
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
        yesButton.style.fontSize = initialFontSize + "px";
        yesButton.style.padding = initialPadding;
        noButton.style.fontSize = initialFontSize + "px";
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

    // --- Falling Hearts Animation ---
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
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 250);
    }
});
