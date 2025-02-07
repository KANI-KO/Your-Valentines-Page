document.addEventListener("DOMContentLoaded", function () {
    let yesButton = document.getElementById("yes-btn");
    let noButton = document.getElementById("no-btn");

    // BUTTOMS WILL HVE THE SAME SIZE NOWWWW
    yesButton.style.width = "80px";
    noButton.style.width = "80px";
    yesButton.style.height = "60px";
    noButton.style.height = "60px";
    yesButton.style.fontSize = "25px";
    noButton.style.fontSize = "25px";
});

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
        setTimeout(typeNextChar, 10); // Typing speed
    } else {
        setTimeout(deleteLine, 1500); // Pause before deleting
    }
}

function deleteLine() {
    if (charIndex > 0 && lineIndex < introLines.length - 1) { 
        // Only delete if NOT the last sentence
        introText.innerHTML = introLines[lineIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteLine, 30);
    } else if (lineIndex < introLines.length - 1) { 
        // Move to the next sentence if NOT the last one
        lineIndex++;
        setTimeout(typeNextChar, 500);
    }else {
            // After the last sentence stays for a while, fade out the text first
            setTimeout(() => {
                introText.classList.add("fade-out-text"); 
        
                setTimeout(() => {
                    introScreen.classList.add("hidden"); 
                    setTimeout(() => { introScreen.style.display = "none"; }, 1000);
                }, 1000);
        
            }, 2000);
        }
    }

// Start animation
setTimeout(typeNextChar, 2000);

let noButton = document.getElementById("no-btn");
let yesButton = document.getElementById("yes-btn");
let responseText = document.getElementById("response");
let questionText = document.getElementById("question");
let gifContainer = document.getElementById("gif-container"); // Get GIF container
let heartsInterval;

// Reset Button
let resetButton = document.createElement("button");
resetButton.innerText = "Return to Main Title";
resetButton.id = "reset-btn";
resetButton.style.display = "none"; // Hidden at start
document.body.appendChild(resetButton);

// Background Music
let bgMusic = new Audio("music.mp3"); 

let yesSize = 20; // Initial font size for Yes button
let growthFactor = 1.8; // Exponential growth for Yes button
let noClicks = 0;

const messages = [
    "Really no?",
    "Are you positive?",
    "Are you super duper positive?",
    "Last chance to say yes...",
    "Last last chance to say yes...",
    "I will be VERY sad if you say no..."
];

// No Button Click - Yes button gets bigger & text changes
noButton.addEventListener("click", () => {
    if (noClicks < messages.length) {
        questionText.innerText = messages[noClicks]; // Change text
    } else {
        questionText.innerText = messages[messages.length - 1]; // Final message
    }

    let newSize = yesButton.clientWidth * growthFactor;
    let newHeight = yesButton.clientHeight * growthFactor;
    let newFontSize = parseFloat(window.getComputedStyle(yesButton).fontSize) * growthFactor; 

    yesButton.style.width = newSize + "px";
    yesButton.style.height = newHeight + "px";
    yesButton.style.fontSize = newFontSize + "px"; // NOW THE TEXT GROWS!

    noClicks++;
});



// Yes Button Click - we replace the GIF
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
document.body.appendChild(tenorScript); // Append script to the body to reload the Tenor embed


    bgMusic.play(); 
    startFallingHearts(); 
});

// May the power of PEPE Restore Everything!!
resetButton.addEventListener("click", () => {
    questionText.innerText = "Will you be my Valentine?";
    questionText.classList.remove("big-text");

    // Reset "Yes" and "No" button sizes
    yesSize = 20; 
    let defaultWidth = "100px"; 
    let defaultHeight = "60px"; 
    let defaultFontSize = "25px"; 

    yesButton.style.width = defaultWidth;
    noButton.style.width = defaultWidth;
    yesButton.style.height = defaultHeight;
    noButton.style.height = defaultHeight;
    yesButton.style.fontSize = defaultFontSize;
    noButton.style.fontSize = defaultFontSize;
    yesButton.style.padding = "10px";
    noButton.style.padding = "10px";

    // Reset click count
    noClicks = 0; 

    responseText.innerHTML = "";
    responseText.classList.remove("big-text");

    yesButton.style.display = "inline-block";
    noButton.style.display = "inline-block";
    resetButton.style.display = "none";

    bgMusic.pause();
    bgMusic.currentTime = 0;

    // Stop the falling hearts animation
    clearInterval(heartsInterval); // Stop interval
    document.querySelectorAll(".heart").forEach((heart) => heart.remove()); // Remove all hearts

    // Restore the first GIF inside gif-container
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
    // Stop any existing interval before starting a new one
    if (heartsInterval) {
        clearInterval(heartsInterval);
    }

    heartsInterval = setInterval(() => {
        let heart = document.createElement("div");
        heart.innerText = ["❤️", "🥰", "❤️", "💗", "💗"][Math.floor(Math.random() * 5)];
        heart.classList.add("heart");

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 2 + 3 + "s"; // animation speed

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 250); // Creates new emote every 250ms
}


