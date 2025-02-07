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
        // Only delete if NOT the last sentence
        introText.innerHTML = introLines[lineIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteLine, 30);
    } else if (lineIndex < introLines.length - 1) { 
        // Move to the next sentence if NOT the last one
        lineIndex++;
        setTimeout(typeNextChar, 500);
    } else {
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

// CHANGE: NEW FUNCTION to encapsulate the yes-button click action.
function handleYesClick() {
    questionText.innerText = "Happy Valentine's!";
    questionText.classList.add("big-text");

    responseText.innerHTML = "Yay! I love you!";
    responseText.classList.add("medium-text");

    // Hide all yes/no buttons if present
    yesButton.style.display = "none";
    noButton.style.display = "none";
    let altYesButton = document.getElementById("alternative-yes-btn");
    if (altYesButton) {
        altYesButton.style.display = "none";
    }
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
}

// CHANGE: Update yesButton event listener to use handleYesClick
yesButton.addEventListener("click", handleYesClick);

// CHANGE: Modified No Button Click event listener
noButton.addEventListener("click", () => {
    // NEW FEATURE: On the 4th click (when noClicks is 3), replace the no button with an alternative yes button.
    if (noClicks === 3) {  // 4th click (0-indexed: 0,1,2 then 3)
        questionText.innerText = "Seems like you're a bit hesitant... How about clicking 'Yes, please!' instead?";
        noButton.style.display = "none"; // Hide the original no button

        // Create alternative yes button
        let alternativeYesButton = document.createElement("button");
        alternativeYesButton.id = "alternative-yes-btn";
        alternativeYesButton.innerText = "Yes, please!";
        alternativeYesButton.style.fontSize = "20px";
        alternativeYesButton.style.padding = "10px 20px";
        // Append the alternative yes button to the container
        document.querySelector(".buttons").appendChild(alternativeYesButton);

        // Link the alternative yes button to the same landing page action as the original yes button
        alternativeYesButton.addEventListener("click", handleYesClick);
    } else {
        if (noClicks < messages.length) {
            questionText.innerText = messages[noClicks]; // Change text
        } else {
            questionText.innerText = messages[messages.length - 1]; // Final message
        }

        // Increase Yes button size exponentially
        yesSize *= growthFactor;
        yesButton.style.fontSize = yesSize + "px";
        yesButton.style.padding = (yesSize / 3) + "px";

        noClicks++;
    }
});

resetButton.addEventListener("click", () => {
    questionText.innerText = "Will you be my Valentine?";
    questionText.classList.remove("big-text");

    yesSize = 20; 
    yesButton.style.fontSize = yesSize + "px";
    yesButton.style.padding = "10px";
    noClicks = 0; 

    responseText.innerHTML = "";
    responseText.classList.remove("big-text");

    yesButton.style.display = "inline-block";
    noButton.style.display = "inline-block";
    resetButton.style.display = "none";

    // CHANGE: Remove alternative yes button if it exists during reset.
    let altYesButton = document.getElementById("alternative-yes-btn");
    if (altYesButton) {
        altYesButton.remove();
    }

    bgMusic.pause();
    bgMusic.currentTime = 0;

    // Stop the emote animation
    clearInterval(heartsInterval); // Stop interval
    document.querySelectorAll(".heart").forEach((heart) => heart.remove()); // Remove all emotes

    // Restore the first GIF
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
