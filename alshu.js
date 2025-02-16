const musicButton = document.getElementById('musicButton');
const birthdayMusic = document.getElementById('birthdayMusic');
const clickMeButton = document.getElementById('clickMeButton');
const gifContainer = document.getElementById('gifContainer');
const buttonSection = document.getElementById('buttonSection');

const gifs = ['1.gif', '2.gif', '3.gif', '4.gif', '5.gif'];
let currentGifIndex = 0;

// Play Music
musicButton.addEventListener('click', () => {
    birthdayMusic.loop = true;  // Enable looping
    birthdayMusic.play();
    musicButton.style.display = 'none';
});

// Click event to play GIFs
clickMeButton.addEventListener('click', () => {
    clickMeButton.style.display = 'none';
    gifContainer.style.display = 'block';
    startGifLoop();
});

// Function to cycle through GIFs smoothly
function startGifLoop() {
    gifContainer.innerHTML = '';
    const gifElement = document.createElement('img');
    gifElement.src = gifs[currentGifIndex];
    gifElement.style.animation = "fadeIn 1s ease-in-out";
    gifContainer.appendChild(gifElement);

    currentGifIndex = (currentGifIndex + 1) % gifs.length;
    setTimeout(startGifLoop, 3000);
}

// Function to create floating hearts
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);
const fireworksContainer = document.createElement('canvas');
fireworksContainer.id = 'fireworksCanvas';
document.body.appendChild(fireworksContainer);

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.pointerEvents = 'none';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFirework(x, y) {
    for (let i = 0; i < 120; i++) { // Increased particles for bigger fireworks
        particles.push({
            x: x,
            y: y,
            speedX: Math.random() * 8 - 4, // More spread
            speedY: Math.random() * 8 - 4,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            size: Math.random() * 8 + 4, // Bigger particles
            life: 180 // Lasts ~5 seconds
        });
    }
}

function updateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 1.2; // Slow fading for longer duration

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(updateFireworks);
}

clickMeButton.addEventListener('click', () => {
    // Fireworks from all 4 corners of the screen
    createFirework(50, 50); // Top-left
    createFirework(window.innerWidth - 50, 50); // Top-right
    createFirework(50, window.innerHeight - 50); // Bottom-left
    createFirework(window.innerWidth - 50, window.innerHeight - 50); // Bottom-right
});

// Start animation loop
updateFireworks();
let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 3000); // Change every 3 seconds
}

function changeSlide(n) {
    slideIndex += n - 1; 
    showSlides();
}

// Start the slideshow
showSlides();



document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("quizContainer");
    const quizForm = document.getElementById("loveQuizForm");
    const quizResult = document.getElementById("quizResult");
    const resultMessage = document.getElementById("resultMessage");
    const resultGif = document.getElementById("resultGif");

    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get answers
        const answers = {
            q1: document.getElementById("q1").value.trim().toLowerCase(),
            q2: document.getElementById("q2").value.trim().toLowerCase(),
            q3: document.getElementById("q3").value.trim().toLowerCase(),
            q4: document.getElementById("q4").value.trim().toLowerCase(),
            q5: document.getElementById("q5").value.trim().toLowerCase(),
        };

        // Correct answers (Change these based on your real answers)
        const correctAnswers = {
            q1: "Keychain", // Example, change this!
            q2: "train", // Example, change this!
            q3: "delight", // Example, change this!
            q4: "Perfect by Ed Sheeran", // Example, change this!
            q5: "beach", // Example, change this!
        };

        // Check answers
        let score = 0;
        Object.keys(answers).forEach((key) => {
            if (answers[key] === correctAnswers[key]) {
                score++;
            }
        });

        // Hide quiz and show results
        quizContainer.style.display = "none";
        quizResult.style.display = "block";

        // Show different messages & GIFs based on the score
        if (score === 5) {
            resultMessage.innerText = "WOW! You know everything about us! ❤️🎉";
            resultGif.src = "https://media.giphy.com/media/3ohs7JcR5CCpJq5tGM/giphy.gif"; // Happy GIF
        } else if (score >= 3) {
            resultMessage.innerText = "Good job! You know me well! 😍";
            resultGif.src = "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif"; // Cute GIF
        } else {
            resultMessage.innerText = "Oops! We need more date nights! 😂";
            resultGif.src = "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"; // Funny GIF
        }
    });
});
