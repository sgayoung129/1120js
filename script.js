// script.js

// Check which page we are on
if (document.title === "이름 입력") {
    // Logic for the name input page (index.html)
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const nameInput = document.getElementById('nameInput');
            const name = nameInput.value;
            if (name) {
                window.location.href = 'game.html?name=' + encodeURIComponent(name);
            } else {
                alert('이름을 입력해주세요.');
            }
        });
    }
} else if (document.title === "가위바위보 게임") {
    // Logic for the game page (game.html)
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');

    const welcomeMsg = document.getElementById('welcomeMsg');
    if (welcomeMsg) {
        welcomeMsg.textContent = name ? `${name}님, 안녕하세요!` : '안녕하세요!';
    }

    const choices = ['rock', 'paper', 'scissors'];
    const choiceMap = {
        'rock': '바위',
        'paper': '보',
        'scissors': '가위'
    };

    let playerScore = 0;
    let computerScore = 0;

    const rockBtn = document.getElementById('rock');
    const paperBtn = document.getElementById('paper');
    const scissorsBtn = document.getElementById('scissors');
    const restartBtn = document.getElementById('restartBtn');

    const playerChoiceSpan = document.getElementById('player-choice');
    const computerChoiceSpan = document.getElementById('computer-choice');
    const winnerH2 = document.getElementById('winner');
    const playerScoreSpan = document.getElementById('player-score');
    const computerScoreSpan = document.getElementById('computer-score');

    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    function determineWinner(player, computer) {
        if (player === computer) {
            return 'tie';
        }
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'player';
        }
        return 'computer';
    }

    function playGame(playerChoice) {
        const computerChoice = getComputerChoice();
        const winner = determineWinner(playerChoice, computerChoice);

        playerChoiceSpan.textContent = choiceMap[playerChoice];
        computerChoiceSpan.textContent = choiceMap[computerChoice];

        if (winner === 'player') {
            winnerH2.textContent = '당신이 이겼습니다!';
            playerScore++;
            playerScoreSpan.textContent = playerScore;
        } else if (winner === 'computer') {
            winnerH2.textContent = '컴퓨터가 이겼습니다!';
            computerScore++;
            computerScoreSpan.textContent = computerScore;
        } else {
            winnerH2.textContent = '비겼습니다!';
        }
    }
    
    if (rockBtn) rockBtn.addEventListener('click', () => playGame('rock'));
    if (paperBtn) paperBtn.addEventListener('click', () => playGame('paper'));
    if (scissorsBtn) scissorsBtn.addEventListener('click', () => playGame('scissors'));

    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            playerScore = 0;
            computerScore = 0;
            playerScoreSpan.textContent = playerScore;
            computerScoreSpan.textContent = computerScore;
            playerChoiceSpan.textContent = '';
            computerChoiceSpan.textContent = '';
            winnerH2.textContent = '';
        });
    }
}
