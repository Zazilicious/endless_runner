const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;

// Make the player jump
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isJumping) {
        isJumping = true;
        player.classList.add("jump");
        setTimeout(() => {
            player.classList.remove("jump");
            isJumping = false;
        }, 500);
    }
});

// Check for collisions and update score
const gameLoop = setInterval(() => {
    const playerBottom = parseInt(window.getComputedStyle(player).bottom);
    const obstacleLeft = obstacle.getBoundingClientRect().left;

    // Collision detection
    if (obstacleLeft < 80 && obstacleLeft > 50 && playerBottom <= 30) {
        alert("Game Over! Your score: " + score);
        clearInterval(gameLoop);
        location.reload();
    }

    // Increment score
    score++;
    scoreDisplay.innerText = "Score: " + score;
}, 100);

// Add jump animation
const jumpStyle = document.createElement("style");
jumpStyle.innerHTML = `
    #player.jump {
        animation: jump 0.5s ease forwards;
    }

    @keyframes jump {
        0% { bottom: 0; }
        50% { bottom: 80px; }
        100% { bottom: 0; }
    }
`;
document.head.appendChild(jumpStyle);

