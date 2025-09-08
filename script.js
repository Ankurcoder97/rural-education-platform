// Game state management
let gameState = {
    level: 1,
    xp: 0,
    coins: 100,
    streak: 0,
    currentQuiz: null,
    currentQuestion: 0,
    score: 0,
    totalQuestionsAnswered: 0,
    correctAnswers: 0
};

// Quiz questions database for rural education
const quizData = {
    math: [
        {
            question: "What is 15 × 8?",
            options: ["120", "115", "125", "130"],
            correct: 0,
            explanation: "15 × 8 = 120"
        },
        {
            question: "If a farmer has 24 apples and sells 1/3 of them, how many apples are left?",
            options: ["8", "16", "12", "20"],
            correct: 1,
            explanation: "24 ÷ 3 = 8 sold, so 24 - 8 = 16 left"
        },
        {
            question: "What is the area of a rectangular field with length 12m and width 8m?",
            options: ["96 m²", "40 m²", "20 m²", "80 m²"],
            correct: 0,
            explanation: "Area = length × width = 12 × 8 = 96 m²"
        },
        {
            question: "A shopkeeper bought 50 kg rice for ₹2000. What is the cost per kg?",
            options: ["₹35", "₹40", "₹45", "₹50"],
            correct: 1,
            explanation: "₹2000 ÷ 50 kg = ₹40 per kg"
        }
    ],
    science: [
        {
            question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            correct: 1,
            explanation: "Plants absorb CO₂ and release O₂ during photosynthesis"
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Quartz"],
            correct: 2,
            explanation: "Diamond is the hardest naturally occurring substance"
        },
        {
            question: "Which planet is closest to the Sun?",
            options: ["Venus", "Mercury", "Earth", "Mars"],
            correct: 1,
            explanation: "Mercury is the innermost planet in our solar system"
        },
        {
            question: "What causes day and night on Earth?",
            options: ["Earth's orbit", "Earth's rotation", "Sun's movement", "Moon's phases"],
            correct: 1,
            explanation: "Earth's rotation on its axis causes day and night"
        }
    ],
    english: [
        {
            question: "Which of these is a synonym for 'happy'?",
            options: ["Sad", "Joyful", "Angry", "Tired"],
            correct: 1,
            explanation: "Joyful means the same as happy"
        },
        {
            question: "What is the plural of 'child'?",
            options: ["Childs", "Childes", "Children", "Child"],
            correct: 2,
            explanation: "The irregular plural of 'child' is 'children'"
        },
        {
            question: "In the sentence 'The cat sat on the mat', what is the verb?",
            options: ["cat", "sat", "on", "mat"],
            correct: 1,
            explanation: "Verbs show action or state of being. 'Sat' is the action"
        },
        {
            question: "Which sentence is grammatically correct?",
            options: ["I am going to school", "I are going to school", "I is going to school", "I be going to school"],
            correct: 0,
            explanation: "'I am' is the correct form of the verb 'to be' with 'I'"
        }
    ],
    history: [
        {
            question: "Who was the first Prime Minister of India?",
            options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. Rajendra Prasad"],
            correct: 1,
            explanation: "Jawaharlal Nehru was India's first Prime Minister (1947-1964)"
        },
        {
            question: "In which year did India gain independence?",
            options: ["1945", "1946", "1947", "1948"],
            correct: 2,
            explanation: "India gained independence on August 15, 1947"
        },
        {
            question: "Which movement was led by Mahatma Gandhi in 1930?",
            options: ["Quit India", "Non-Cooperation", "Salt March", "Khilafat"],
            correct: 2,
            explanation: "The Salt March (Dandi March) was led by Gandhi in 1930"
        },
        {
            question: "Who built the Red Fort in Delhi?",
            options: ["Akbar", "Shah Jahan", "Aurangzeb", "Humayun"],
            correct: 1,
            explanation: "The Red Fort was built by Mughal Emperor Shah Jahan"
        }
    ],
    geography: [
        {
            question: "Which is the longest river in India?",
            options: ["Yamuna", "Ganga", "Godavari", "Krishna"],
            correct: 1,
            explanation: "The Ganga (Ganges) is India's longest river at 2,525 km"
        },
        {
            question: "Which state in India has the highest literacy rate?",
            options: ["Kerala", "Tamil Nadu", "Maharashtra", "Karnataka"],
            correct: 0,
            explanation: "Kerala has the highest literacy rate in India (93.9%)"
        },
        {
            question: "What is the capital of Rajasthan?",
            options: ["Udaipur", "Jodhpur", "Jaipur", "Kota"],
            correct: 2,
            explanation: "Jaipur, also known as the Pink City, is Rajasthan's capital"
        },
        {
            question: "Which mountain range separates India from China?",
            options: ["Western Ghats", "Eastern Ghats", "Himalayas", "Aravalli"],
            correct: 2,
            explanation: "The Himalayas form the northern border between India and China"
        }
    ],
    agriculture: [
        {
            question: "Which season is best for sowing wheat in India?",
            options: ["Monsoon", "Winter", "Summer", "Spring"],
            correct: 1,
            explanation: "Wheat is a Rabi crop, sown in winter (Oct-Dec)"
        },
        {
            question: "What is the main nutrient that nitrogen provides to plants?",
            options: ["Color", "Growth", "Taste", "Smell"],
            correct: 1,
            explanation: "Nitrogen is essential for plant growth and leaf development"
        },
        {
            question: "Which crop is known as the 'King of Cereals'?",
            options: ["Rice", "Wheat", "Maize", "Barley"],
            correct: 2,
            explanation: "Maize (corn) is called the 'King of Cereals' due to its high yield"
        },
        {
            question: "What type of soil is best for rice cultivation?",
            options: ["Sandy", "Clay", "Rocky", "Saline"],
            correct: 1,
            explanation: "Clay soil retains water well, making it ideal for rice cultivation"
        }
    ]
};

// Achievements system
const achievements = [
    { id: 'first_quiz', name: 'First Steps', description: 'Complete your first quiz!', xp: 50, coins: 20 },
    { id: 'perfect_score', name: 'Perfect!', description: 'Get 100% in a quiz!', xp: 100, coins: 50 },
    { id: 'streak_5', name: 'On Fire!', description: 'Answer 5 questions correctly in a row!', xp: 75, coins: 30 },
    { id: 'level_5', name: 'Scholar', description: 'Reach level 5!', xp: 200, coins: 100 },
    { id: 'questions_50', name: 'Dedicated Learner', description: 'Answer 50 questions!', xp: 150, coins: 75 }
];

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGame();
});

// Initialize all game systems
function initGame() {
    createParticles();
    updateStats();
    loadGameState();
    addEventListeners();
    animateCards();
}

// Create floating particles background effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Update user statistics display
function updateStats() {
    document.getElementById('level').textContent = gameState.level;
    document.getElementById('xp').textContent = gameState.xp;
    document.getElementById('coins').textContent = gameState.coins;
    document.getElementById('streak').textContent = gameState.streak;
    document.getElementById('userXP').textContent = gameState.xp + ' XP';
}

// Add interactive event listeners
function addEventListeners() {
    // Add hover effects to subject cards
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Add click effects to stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
            
            // Show random motivational message
            const messages = [
                'Keep learning!', 'You\'re doing great!', 'Knowledge is power!', 
                'Rural education matters!', 'Every lesson counts!'
            ];
            showAchievement('💪 Motivation', messages[Math.floor(Math.random() * messages.length)]);
        });
    });
}

// Animate cards on load
function animateCards() {
    const cards = document.querySelectorAll('.subject-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}

// Start a quiz for a specific subject
function startQuiz(subject) {
    gameState.currentQuiz = subject;
    gameState.currentQuestion = 0;
    gameState.score = 0;
    
    // Hide dashboard and show quiz
    document.getElementById('gameBoard').style.display = 'none';
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.style.display = 'block';
    quizContainer.style.animation = 'fadeIn 0.5s ease';
    
    // Set quiz title
    const subjectNames = {
        math: 'Mathematics',
        science: 'Science',
        english: 'English',
        history: 'History',
        geography: 'Geography',
        agriculture: 'Agriculture'
    };
    
    document.getElementById('quizSubject').textContent = `${subjectNames[subject]} Quiz 🎯`;
    
    showQuestion();
}

// Display current question
function showQuestion() {
    const quiz = quizData[gameState.currentQuiz];
    const question = quiz[gameState.currentQuestion];
    
    // Update question text with animation
    const questionElement = document.getElementById('quizQuestion');
    questionElement.style.opacity = '0';
    
    setTimeout(() => {
        questionElement.textContent = `Question ${gameState.currentQuestion + 1}/${quiz.length}: ${question.question}`;
        questionElement.style.opacity = '1';
    }, 200);
    
    // Create option buttons
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.style.animationDelay = (index * 0.1) + 's';
        optionElement.onclick = () => selectAnswer(index);
        
        // Add entrance animation
        optionElement.style.opacity = '0';
        optionElement.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            optionElement.style.opacity = '1';
            optionElement.style.transform = 'translateX(0)';
            optionElement.style.transition = 'all 0.3s ease';
        }, index * 100 + 300);
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Hide control buttons
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('endBtn').style.display = 'none';
}

// Handle answer selection with enhanced feedback
function selectAnswer(selectedIndex) {
    const quiz = quizData[gameState.currentQuiz];
    const question = quiz[gameState.currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    gameState.totalQuestionsAnswered++;
    
    // Provide visual and statistical feedback
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        gameState.score++;
        gameState.correctAnswers++;
        gameState.streak++;
        
        // Calculate XP based on streak and difficulty
        let xpGain = 50 + (gameState.streak * 5);
        let coinGain = 10 + Math.floor(gameState.streak / 2);
        
        gameState.xp += xpGain;
        gameState.coins += coinGain;
        
        showAchievement('🎉 Correct!', `+${xpGain} XP, +${coinGain} Coins\n${question.explanation}`);
        
        // Check for streak achievements
        if (gameState.streak === 5) {
            unlockAchievement('streak_5');
        }
        
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        gameState.streak = 0;
        showAchievement('❌ Incorrect', `Correct answer: ${question.options[question.correct]}\n${question.explanation}`);
    }
    
    updateStats();
    checkAchievements();
    
    // Show control buttons after delay
    setTimeout(() => {
        if (gameState.currentQuestion < quiz.length - 1) {
            document.getElementById('nextBtn').style.display = 'inline-block';
        } else {
            document.getElementById('endBtn').style.display = 'inline-block';
            calculateFinalResults();
        }
    }, 2000);
}

// Move to next question
function nextQuestion() {
    gameState.currentQuestion++;
    showQuestion();
}

// Calculate final quiz results with detailed feedback
function calculateFinalResults() {
    const quiz = quizData[gameState.currentQuiz];
    const percentage = Math.round((gameState.score / quiz.length) * 100);
    
    let bonusXP = 0;
    let bonusCoins = 0;
    let message = '';
    
    if (percentage === 100) {
        bonusXP = 200;
        bonusCoins = 100;
        message = '🏆 Perfect Score! Outstanding!';
        unlockAchievement('perfect_score');
    } else if (percentage >= 80) {
        bonusXP = 150;
        bonusCoins = 75;
        message = '🌟 Excellent Performance!';
    } else if (percentage >= 60) {
        bonusXP = 100;
        bonusCoins = 50;
        message = '👍 Good Job!';
    } else if (percentage >= 40) {
        bonusXP = 50;
        bonusCoins = 25;
        message = '📚 Keep Studying!';
    } else {
        bonusXP = 25;
        bonusCoins = 10;
        message = '💪 Practice Makes Perfect!';
    }
    
    gameState.xp += bonusXP;
    gameState.coins += bonusCoins;
    
    // Check for first quiz completion
    if (gameState.totalQuestionsAnswered <= quiz.length) {
        unlockAchievement('first_quiz');
    }
    
    showAchievement(message, 
        `Quiz Complete: ${gameState.score}/${quiz.length} (${percentage}%)\n` +
        `Bonus: +${bonusXP} XP, +${bonusCoins} Coins`
    );
    
    // Level up check
    checkLevelUp();
    updateStats();
    saveGameState();
}

// Check for level up
function checkLevelUp() {
    const xpNeeded = gameState.level * 300;
    if (gameState.xp >= xpNeeded) {
        gameState.level++;
        gameState.xp = gameState.xp - xpNeeded; // Carry over extra XP
        
        showAchievement('🎊 Level Up!', 
            `Welcome to Level ${gameState.level}!\n` +
            `Bonus: +100 Coins!`
        );
        
        gameState.coins += 100;
        
        if (gameState.level === 5) {
            unlockAchievement('level_5');
        }
    }
}

// Check for various achievements
function checkAchievements() {
    if (gameState.totalQuestionsAnswered >= 50) {
        unlockAchievement('questions_50');
    }
}

// Unlock specific achievement
function unlockAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !gameState.unlockedAchievements?.includes(achievementId)) {
        if (!gameState.unlockedAchievements) {
            gameState.unlockedAchievements = [];
        }
        
        gameState.unlockedAchievements.push(achievementId);
        gameState.xp += achievement.xp;
        gameState.coins += achievement.coins;
        
        setTimeout(() => {
            showAchievement(`🏆 ${achievement.name}`, 
                `${achievement.description}\n+${achievement.xp} XP, +${achievement.coins} Coins!`
            );
        }, 1000);
    }
}

// End quiz and return to dashboard
function endQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.style.animation = 'fadeOut 0.5s ease';
    
    setTimeout(() => {
        quizContainer.style.display = 'none';
        document.getElementById('gameBoard').style.display = 'grid';
        
        // Re-animate cards
        document.querySelectorAll('.subject-card').forEach((card, index) => {
            card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
        });
    }, 500);
}

// Enhanced achievement popup system
function showAchievement(title, description) {
    const popup = document.getElementById('achievementPopup');
    const titleEl = document.getElementById('achievementTitle');
    const descEl = document.getElementById('achievementDesc');
    
    titleEl.textContent = title;
    descEl.textContent = description;
    
    popup.classList.add('show');
    
    // Add sound effect simulation
    navigator.vibrate && navigator.vibrate(200);
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 4000);
    
    // Click to dismiss
    popup.onclick = () => {
        popup.classList.remove('show');
    };
}

// Save game state (in a real app, this would save to backend)
function saveGameState() {
    try {
        // In a real implementation, this would be an API call
        console.log('Game state saved:', gameState);
        
        // For demo purposes, we could use localStorage if available
        // but avoiding it due to artifact restrictions
        
        // Simulate successful save
        setTimeout(() => {
            console.log('✅ Game progress saved successfully!');
        }, 500);
        
    } catch (error) {
        console.error('Failed to save game state:', error);
    }
}

// Load game state (in a real app, this would load from backend)
function loadGameState() {
    try {
        // In a real implementation, this would be an API call
        console.log('Loading game state...');
        
        // For demo purposes, initialize with default state
        // In a real app, this would load user's actual progress
        
        gameState.unlockedAchievements = [];
        
        console.log('✅ Game state loaded successfully!');
        updateStats();
        
    } catch (error) {
        console.error('Failed to load game state:', error);
        // Use default state if loading fails
        updateStats();
    }
}

// Add keyboard shortcuts for better accessibility
document.addEventListener('keydown', function(event) {
    // Press 'R' to restart current quiz
    if (event.key.toLowerCase() === 'r' && gameState.currentQuiz) {
        if (confirm('Are you sure you want to restart this quiz?')) {
            startQuiz(gameState.currentQuiz);
        }
    }
    
    // Press 'H' to go back to home/dashboard
    if (event.key.toLowerCase() === 'h') {
        if (document.getElementById('quizContainer').style.display === 'block') {
            if (confirm('Are you sure you want to return to the dashboard?')) {
                endQuiz();
            }
        }
    }
    
    // Press number keys (1-4) to select quiz options
    if (gameState.currentQuiz && ['1', '2', '3', '4'].includes(event.key)) {
        const optionIndex = parseInt(event.key) - 1;
        const options = document.querySelectorAll('.quiz-option');
        if (options[optionIndex] && options[optionIndex].style.pointerEvents !== 'none') {
            selectAnswer(optionIndex);
        }
    }
});

// Performance optimization: Throttle resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recreate particles on resize for better distribution
        createParticles();
    }, 250);
});

// Add visibility change handler to pause/resume animations
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Initialize service worker for offline functionality (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // In a real app, you would register a service worker here
        console.log('📱 App ready for offline functionality');
    });
}

// Export functions for potential module usage
window.EduQuest = {
    startQuiz,
    endQuiz,
    updateStats,
    showAchievement,
    gameState
};