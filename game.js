// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const homePlayers = [];
const awayPlayers = [];
const ball = { x: 400, y: 250, radius: 10, speedX: 3, speedY: 3 };  // Set initial speeds for testing
let homeScore = 0, awayScore = 0;
const goalWidth = 10, goalHeight = 100;
const playerRadius = 5;
const fieldWidth = 800, fieldHeight = 500;  // Updated canvas size to 800x500
const ballPushDistance = 2; // Distance the ball moves when touched by a player

// Create player objects for both teams with roles
const roles = ['forward', 'midfielder', 'defender', 'goalkeeper'];

function createPlayer(team, role, x, y, speed) {
    return { team, role, x, y, hasBall: false, speed };
}

// Create players with specific roles and different speeds
for (let i = 0; i < 5; i++) {
    homePlayers.push(createPlayer('home', roles[i % 4], 100, 150 + i * 50, Math.random() * 2 + 2)); // Speed 2 to 4
    awayPlayers.push(createPlayer('away', roles[i % 4], 600, 150 + i * 50, Math.random() * 2 + 2)); // Speed 2 to 4
}

// Draw field and goals
function drawField() {
    // Draw background (field)
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, fieldWidth, fieldHeight);

    // Draw goals
    ctx.fillStyle = 'white';
    ctx.fillRect(0, (fieldHeight - goalHeight) / 2, goalWidth, goalHeight); // Home goal
    ctx.fillRect(fieldWidth - goalWidth, (fieldHeight - goalHeight) / 2, goalWidth, goalHeight); // Away goal

    // Draw wider goal pose (a white rectangle at the center of each goal)
    const goalPoseWidth = 40; // Wider than the previous circle
    const goalPoseHeight = 200;
    ctx.fillStyle = 'white';
    ctx.fillRect(goalWidth / 2 - goalPoseWidth / 2, fieldHeight / 2 - goalPoseHeight / 2, goalPoseWidth, goalPoseHeight); // Home goal pose
    ctx.fillRect(fieldWidth - goalWidth / 2 - goalPoseWidth / 2, fieldHeight / 2 - goalPoseHeight / 2, goalPoseWidth, goalPoseHeight); // Away goal pose

    // Draw mid-line
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(fieldWidth / 2, 0);
    ctx.lineTo(fieldWidth / 2, fieldHeight);
    ctx.stroke();

    // Draw walls (boundary of the field)
    ctx.fillStyle = 'black';  // Wall color
    ctx.fillRect(0, 0, fieldWidth, 10);  // Top wall
    ctx.fillRect(0, fieldHeight - 10, fieldWidth, 10);  // Bottom wall
    ctx.fillRect(0, 0, 10, fieldHeight);  // Left wall
    ctx.fillRect(fieldWidth - 10, 0, 10, fieldHeight);  // Right wall
}

// Draw the ball
function drawBall() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

// Draw players
function drawPlayers() {
    homePlayers.forEach(player => {
        ctx.fillStyle = player.team === 'home' ? 'red' : 'blue';
        ctx.beginPath();
        ctx.arc(player.x, player.y, playerRadius, 0, Math.PI * 2);
        ctx.fill();
    });

    awayPlayers.forEach(player => {
        ctx.fillStyle = player.team === 'home' ? 'red' : 'blue';
        ctx.beginPath();
        ctx.arc(player.x, player.y, playerRadius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Check for collision between player and ball
function checkCollision(player) {
    const distance = Math.hypot(player.x - ball.x, player.y - ball.y);
    return distance < playerRadius + ball.radius;
}

// Move the ball slightly when touched by a player
function moveBallWithPlayer(player) {
    const angle = Math.atan2(ball.y - player.y, ball.x - player.x);
    ball.x += Math.cos(angle) * ballPushDistance;
    ball.y += Math.sin(angle) * ballPushDistance;
}

// Ball collision with top, bottom, left, or right walls using Pythagorean bounce
function updateBall() {
    // If the ball is not moving, check for player collision to push it
    homePlayers.forEach(player => {
        if (checkCollision(player)) {
            moveBallWithPlayer(player);
        }
    });

    awayPlayers.forEach(player => {
        if (checkCollision(player)) {
            moveBallWithPlayer(player);
        }
    });

    // Ball collision with top wall
    if (ball.y - ball.radius <= 10) {
        ball.speedY = -ball.speedY;  // Reverse the vertical speed (Y axis)
        ball.y = ball.radius + 10;   // Prevent ball from sticking to the top wall
    }

    // Ball collision with bottom wall
    if (ball.y + ball.radius >= fieldHeight - 10) {
        ball.speedY = -ball.speedY;  // Reverse the vertical speed (Y axis)
        ball.y = fieldHeight - ball.radius - 10; // Prevent ball from sticking to the bottom wall
    }

    // Ball collision with left wall
    if (ball.x - ball.radius <= 10) {
        ball.speedX = -ball.speedX;  // Reverse the horizontal speed (X axis)
        ball.x = ball.radius + 10;   // Prevent ball from sticking to the left wall
    }

    // Ball collision with right wall
    if (ball.x + ball.radius >= fieldWidth - 10) {
        ball.speedX = -ball.speedX;  // Reverse the horizontal speed (X axis)
        ball.x = fieldWidth - ball.radius - 10;  // Prevent ball from sticking to the right wall
    }

    // Ball collision with goals
    if (ball.x <= goalWidth && ball.y >= (fieldHeight - goalHeight) / 2 && ball.y <= (fieldHeight + goalHeight) / 2) {
        awayScore++;
        resetBall();
    } else if (ball.x >= fieldWidth - goalWidth && ball.y >= (fieldHeight - goalHeight) / 2 && ball.y <= (fieldHeight + goalHeight) / 2) {
        homeScore++;
        resetBall();
    }

    // Ball collision with goal pose (increase score when touched)
    const goalPoseWidth = 40;
    const goalPoseHeight = 200;

    // Home team goal pose collision
    if (
        ball.x >= goalWidth / 2 - goalPoseWidth / 2 &&
        ball.x <= goalWidth / 2 + goalPoseWidth / 2 &&
        ball.y >= fieldHeight / 2 - goalPoseHeight / 2 &&
        ball.y <= fieldHeight / 2 + goalPoseHeight / 2
    ) {
        awayScore++; // Increase away score
        resetBall();
    }

    // Away team goal pose collision
    if (
        ball.x >= fieldWidth - goalWidth / 2 - goalPoseWidth / 2 &&
        ball.x <= fieldWidth - goalWidth / 2 + goalPoseWidth / 2 &&
        ball.y >= fieldHeight / 2 - goalPoseHeight / 2 &&
        ball.y <= fieldHeight / 2 + goalPoseHeight / 2
    ) {
        homeScore++; // Increase home score
        resetBall();
    }
}

// Reset the ball to the center after a goal
function resetBall() {
    ball.x = fieldWidth / 2;
    ball.y = fieldHeight / 2;
    ball.speedX = 0;
    ball.speedY = 0;
}

// AI movement for players
function movePlayerAI(player, ball) {
    const angle = Math.atan2(ball.y - player.y, ball.x - player.x);
    player.x += Math.cos(angle) * player.speed;
    player.y += Math.sin(angle) * player.speed;
}

// Assign roles and behaviors
function playerBehavior(player, ball) {
    if (player.role === 'goalkeeper') {
        // Goalkeeper behavior: Track the ball and stay in the goal
        if (player.team === 'home') {
            // Home team goalkeeper (left side of the field)
            if (ball.x < fieldWidth / 2) {
                const angle = Math.atan2(ball.y - player.y, 0 - player.x);
                player.x += Math.cos(angle) * player.speed;
                player.y += Math.sin(angle) * player.speed;
            }
        } else {
            // Away team goalkeeper (right side of the field)
            if (ball.x > fieldWidth / 2) {
                const angle = Math.atan2(ball.y - player.y, fieldWidth - player.x);
                player.x += Math.cos(angle) * player.speed;
                player.y += Math.sin(angle) * player.speed;
            }
        }
        // Keep the goalkeeper within the goal area
        if (player.x < goalWidth) player.x = goalWidth;
        if (player.x > fieldWidth - goalWidth) player.x = fieldWidth - goalWidth;
        if (player.y < (fieldHeight - goalHeight) / 2) player.y = (fieldHeight - goalHeight) / 2;
        if (player.y > (fieldHeight + goalHeight) / 2) player.y = (fieldHeight + goalHeight) / 2;
    } else if (player.role === 'forward') {
        // Forward behavior: Move towards the ball and attempt to shoot
        if (Math.hypot(player.x - ball.x, player.y - ball.y) < 50) {
            // Attempt to shoot if close to goal
            if (ball.x > fieldWidth - goalWidth - 20) {
                // If close to goal, shoot
                if (player.team === 'home') ball.speedX = 5;
                else ball.speedX = -5;
            }
        } else {
            movePlayerAI(player, ball);
        }
    } else if (player.role === 'midfielder') {
        // Midfielder behavior: Support attack or defense
        movePlayerAI(player, ball);
    } else if (player.role === 'defender') {
        // Defender behavior: Stay close to ball and try to block
        if (Math.hypot(player.x - ball.x, player.y - ball.y) < 70) {
            movePlayerAI(player, ball);
        }
    }
}

// Update players' movements
function updatePlayerMovement() {
    homePlayers.forEach(player => playerBehavior(player, ball));
    awayPlayers.forEach(player => playerBehavior(player, ball));
}

// Display score
function drawScore() {
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Home: ${homeScore} - Away: ${awayScore}`, fieldWidth / 2 - 100, 30);
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, fieldWidth, fieldHeight); // Clear the field
    drawField();
    drawBall();
    drawPlayers();
    drawScore();
    updateBall();
    requestAnimationFrame(gameLoop);
}
// Player collision detection
function checkPlayerCollision(player1, player2) {
    const distance = Math.hypot(player1.x - player2.x, player1.y - player2.y);
    return distance < 2 * playerRadius; // If players are overlapping
}

// Handle player collisions
function resolvePlayerCollision(player1, player2) {
    const angle = Math.atan2(player2.y - player1.y, player2.x - player1.x); // Get angle of collision
    const overlap = 2 * playerRadius - Math.hypot(player1.x - player2.x, player1.y - player2.y);

    // Move players apart along the angle of the collision
    player1.x -= Math.cos(angle) * overlap / 2;
    player1.y -= Math.sin(angle) * overlap / 2;
    player2.x += Math.cos(angle) * overlap / 2;
    player2.y += Math.sin(angle) * overlap / 2;
}

// Update player movements (including handling collisions with other players)
function updatePlayerMovement() {
    homePlayers.forEach(player => {
        playerBehavior(player, ball);
        awayPlayers.forEach(opponent => {
            if (checkPlayerCollision(player, opponent)) {
                resolvePlayerCollision(player, opponent);
            }
        });
    });

    awayPlayers.forEach(player => {
        playerBehavior(player, ball);
        homePlayers.forEach(opponent => {
            if (checkPlayerCollision(player, opponent)) {
                resolvePlayerCollision(player, opponent);
            }
        });
    });
}
// Check for collision between two players
function playersCollide(player1, player2) {
    const distance = Math.hypot(player1.x - player2.x, player1.y - player2.y);
    return distance < playerRadius * 2; // Collision occurs if distance is less than twice the radius
}

// Resolve collision by moving players apart
function resolvePlayerCollision(player1, player2) {
    const dx = player2.x - player1.x;
    const dy = player2.y - player1.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) return; // Prevent divide by zero

    const overlap = playerRadius * 2 - distance; // Amount of overlap
    const adjustX = (dx / distance) * overlap / 2; // Adjust positions equally
    const adjustY = (dy / distance) * overlap / 2;

    // Move players apart
    player1.x -= adjustX;
    player1.y -= adjustY;
    player2.x += adjustX;
    player2.y += adjustY;
}

// Check and resolve collisions for all players
function handlePlayerCollisions(players) {
    for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            if (playersCollide(players[i], players[j])) {
                resolvePlayerCollision(players[i], players[j]);
            }
        }
    }
}

// Update player collisions
function updatePlayerCollisions() {
    // Handle collisions among home players
    handlePlayerCollisions(homePlayers);

    // Handle collisions among away players
    handlePlayerCollisions(awayPlayers);

    // Handle collisions between home and away players
    homePlayers.forEach(homePlayer => {
        awayPlayers.forEach(awayPlayer => {
            if (playersCollide(homePlayer, awayPlayer)) {
                resolvePlayerCollision(homePlayer, awayPlayer);
            }
        });
    });
}
let gameTime = 0; // Time in seconds
let isGameOver = false;
let lastTimeUpdate = 0; // Store the last time the game time was updated

// Display score with larger text
function drawScore() {
    ctx.font = '48px Arial';  // Increase font size for scoreline
    ctx.fillStyle = 'black';
    ctx.fillText(`Home: ${homeScore} - Away: ${awayScore}`, fieldWidth / 2 - 150, 50);
}

// Display game time in minutes and seconds
function drawGameTime() {
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Time: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`, 20, 50);
}

// Update the game time, incrementing by 1 every second
function updateGameTime() {
    const now = Date.now();
    if (now - lastTimeUpdate >= 1000) { // If 1 second has passed
        gameTime++;
        lastTimeUpdate = now; // Update the time of the last update

        if (gameTime >= 90) {
            isGameOver = true; // End the game when it reaches 90 seconds
            alert('Game Over!'); // Show alert when the game is over
        }
    }
}
// Integrate collision update into the game loop
function gameLoop() {
    if (isGameOver) return; // Stop the game loop if game is over


    ctx.clearRect(0, 0, fieldWidth, fieldHeight); // Clear the field
    drawField();
    drawBall();
    drawPlayers();
    drawScore();
    drawGameTime(); // Display game time
    updateBall();
    updatePlayerMovement();
    updatePlayerCollisions(); // Add collision handling here
    updateGameTime(); // Update the game time
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
