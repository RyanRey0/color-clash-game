document.addEventListener('DOMContentLoaded', function () {
    const player1Panels = [
        document.getElementById('player1-panel1'),
        document.getElementById('player1-panel2'),
        document.getElementById('player1-panel3'),
        document.getElementById('player1-panel4')
    ];
    const player2Panels = [
        document.getElementById('player2-panel1'),
        document.getElementById('player2-panel2'),
        document.getElementById('player2-panel3'),
        document.getElementById('player2-panel4')
    ];
    const player1Score = document.getElementById('player1-score');
    const player2Score = document.getElementById('player2-score');

    let player1Points = 0;
    let player2Points = 0;
    let maxScore = 10;
    let gameInterval;

    function startGame() {
        gameInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * 4); // Random panel index
            const randomColor = getRandomColor(); // Random color for the panel
            illuminatePanel(player1Panels[randomIndex], randomColor);
            illuminatePanel(player2Panels[randomIndex], randomColor);
        }, 2000); // Change every 2 seconds
    }

    function illuminatePanel(panel, color) {
        const originalColor = panel.style.backgroundColor;
        panel.style.backgroundColor = color;
        let opacity = 0.5; // Initial opacity

        // Saturate the color
        const saturationInterval = setInterval(() => {
            opacity += 0.05; // Increase opacity gradually
            panel.style.backgroundColor = `rgba(${color.r},${color.g},${color.b},${opacity})`;

            if (opacity >= 1) {
                clearInterval(saturationInterval);
            }
        }, 50); // 50ms interval for smooth transition

        // Revert to original color after 1 second
        setTimeout(() => {
            panel.style.backgroundColor = originalColor;
        }, 1000);
    }

    function getRandomColor() {
        const colors = [
            { r: 255, g: 235, b: 59 }, // Yellow
            { r: 76, g: 175, b: 80 },  // Green
            { r: 158, g: 158, b: 158 },// Gray
            { r: 33, g: 150, b: 243 }  // Blue
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    }

    function handleClick(event) {
        const clickedPanel = event.target;
        const isPlayer1 = player1Panels.includes(clickedPanel);
        const isPlayer2 = player2Panels.includes(clickedPanel);

        if (isPlayer1 || isPlayer2) {
            const correctPanel = isPlayer1 ? player1Panels : player2Panels;
            if (correctPanel.includes(clickedPanel) && clickedPanel.style.backgroundColor !== '') {
                if (isPlayer1) {
                    player1Points++;
                    player1Score.textContent = player1Points.toString().padStart(2, '0');
                } else if (isPlayer2) {
                    player2Points++;
                    player2Score.textContent = player2Points.toString().padStart(2, '0');
                }

                if (player1Points === maxScore || player2Points === maxScore) {
                    clearInterval(gameInterval);
                    endGame();
                }
            }
        }
    }

    function endGame() {
        alert(`Fin del juego. Jugador 1: ${player1Points} puntos. Jugador 2: ${player2Points} puntos.`);
    }

    // Event listener for panel clicks
    document.querySelectorAll('.color-panel').forEach(panel => {
        panel.addEventListener('click', handleClick);
    });

    // Start the game
    startGame();
});
