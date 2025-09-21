        let sequence = [];
        let userSequence = [];
        let level = 0;
        let started = false;
        let strictMode = false;
    
        
        const colors = ["red", "green", "blue", "yellow"];
        const colorSounds = {
            red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
            green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
            blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
            yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
        };
        
        const startButton = document.getElementById("start-button");
        const levelTitle = document.getElementById("level-title");
        const colorButtons = document.querySelectorAll(".color-button");
        
        startButton.addEventListener("click", function() {
            if (!started) {
                console.log("Game Started");
                started = true;
                startButton.textContent = "Restart Game";
                resetGame();
                levelUp();
            } else {
                resetGame();
                levelUp();
            }
        });
        
        colorButtons.forEach(button => {
            button.addEventListener("click", function() {
                if (!started) return;
                
                const color = this.id;
                userSequence.push(color);
                
                btnFlash(this);
                playSound(color);
                
                checkAnswer(userSequence.length - 1);
            });
        });
        
        function btnFlash(btn) {
            btn.classList.add("flash");
            setTimeout(function() {
                btn.classList.remove("flash");
            }, 500);
        }
        
        function playSound(color) {
            if (colorSounds[color]) {
                colorSounds[color].currentTime = 0;
                colorSounds[color].play();
            }
        }
        
        function levelUp() {
            level++;
            userSequence = [];
            levelTitle.textContent = `Level ${level}`;
            
            const randomColor = colors[Math.floor(Math.random() * 4)];
            sequence.push(randomColor);
            
            console.log("Sequence: ", sequence);
            
            // Show the sequence to the player
            showSequence();
        }
        
        function showSequence() {
            let i = 0;
            const interval = setInterval(function() {
                const color = sequence[i];
                const colorBtn = document.getElementById(color);
                
                btnFlash(colorBtn);
                playSound(color);
                
                i++;
                if (i >= sequence.length) {
                    clearInterval(interval);
                }
            }, 800);
        }
        
        function checkAnswer(currentLevel) {
            if (userSequence[currentLevel] !== sequence[currentLevel]) {
                // Wrong answer
                gameOver();
                return;
            }
            
            if (userSequence.length === sequence.length) {
                // Correct sequence
                setTimeout(function() {
                    levelUp();
                }, 1000);
            }
        }
        
        function gameOver() {
            console.log("Game Over");
            playSound("red");
            levelTitle.textContent = "Game Over! Press Restart to try again";
            document.body.classList.add("game-over");
            
            setTimeout(function() {
                document.body.classList.remove("game-over");
            }, 300);
            
            started = false;
        }
        
        function resetGame() {
            sequence = [];
            userSequence = [];
            level = 0;
            started = true;
        };