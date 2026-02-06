// ============================================
// Modules Page - Dynamic Content & Learning Activities
// ============================================

// Module data
const modules = [
    {
        id: 'vocabulary-builder',
        title: 'Vocabulary Builder',
        description: 'Learn new words with interactive flashcards. Flip cards to see translations and practice your memory.',
        level: 'beginner',
        icon: '📚',
        questions: 10,
        time: '5-10 min'
    },
    {
        id: 'grammar-quiz',
        title: 'Grammar Quizzes',
        description: 'Test your knowledge with multiple-choice questions covering essential grammar rules.',
        level: 'intermediate',
        icon: '✏️',
        questions: 15,
        time: '10-15 min'
    },
    {
        id: 'pronunciation',
        title: 'Pronunciation Practice',
        description: 'Improve your speaking skills with listen-and-repeat exercises. Practice makes perfect!',
        level: 'beginner',
        icon: '🎤',
        questions: 8,
        time: '5-8 min'
    },
    {
        id: 'timed-challenge',
        title: 'Timed Language Challenges',
        description: 'Test your speed and knowledge with quick quizzes. Can you beat the clock?',
        level: 'advanced',
        icon: '⏱️',
        questions: 20,
        time: '5 min'
    },
    {
        id: 'vocabulary-advanced',
        title: 'Advanced Vocabulary',
        description: 'Master complex words and phrases for advanced learners.',
        level: 'advanced',
        icon: '📖',
        questions: 12,
        time: '10-12 min'
    },
    {
        id: 'grammar-beginner',
        title: 'Grammar Basics',
        description: 'Learn fundamental grammar rules with easy-to-understand examples.',
        level: 'beginner',
        icon: '📝',
        questions: 10,
        time: '8-10 min'
    }
];

// Vocabulary words for flashcards
const vocabularyWords = [
    { word: 'Hello', translation: 'Hola', language: 'Spanish' },
    { word: 'Thank you', translation: 'Gracias', language: 'Spanish' },
    { word: 'Goodbye', translation: 'Adiós', language: 'Spanish' },
    { word: 'Please', translation: 'Por favor', language: 'Spanish' },
    { word: 'Yes', translation: 'Sí', language: 'Spanish' },
    { word: 'No', translation: 'No', language: 'Spanish' },
    { word: 'Water', translation: 'Agua', language: 'Spanish' },
    { word: 'Food', translation: 'Comida', language: 'Spanish' },
    { word: 'Friend', translation: 'Amigo', language: 'Spanish' },
    { word: 'Love', translation: 'Amor', language: 'Spanish' }
];

// Grammar quiz questions
const grammarQuestions = [
    {
        question: 'Which sentence is grammatically correct?',
        options: [
            'I am going to the store.',
            'I is going to the store.',
            'I are going to the store.',
            'I be going to the store.'
        ],
        correct: 0
    },
    {
        question: 'Choose the correct past tense form:',
        options: [
            'I runned yesterday.',
            'I ran yesterday.',
            'I run yesterday.',
            'I running yesterday.'
        ],
        correct: 1
    },
    {
        question: 'Which is the correct plural form?',
        options: [
            'Childs',
            'Children',
            'Childes',
            'Child'
        ],
        correct: 1
    },
    {
        question: 'Select the correct article:',
        options: [
            'A apple',
            'An apple',
            'The apple',
            'Apple'
        ],
        correct: 1
    },
    {
        question: 'Which sentence uses the correct verb form?',
        options: [
            'She don\'t like pizza.',
            'She doesn\'t like pizza.',
            'She not like pizza.',
            'She no like pizza.'
        ],
        correct: 1
    }
];

// Initialize modules page
document.addEventListener('DOMContentLoaded', function () {
    const modulesContainer = document.getElementById('modules-container');
    const levelFilter = document.getElementById('level-filter');
    const moduleActivity = document.getElementById('module-activity');
    const activityContent = document.getElementById('activity-content');
    const backToModulesBtn = document.getElementById('back-to-modules');

    // Load modules
    function loadModules(level = 'all') {
        if (!modulesContainer) return;

        modulesContainer.innerHTML = '';

        const filteredModules = level === 'all'
            ? modules
            : modules.filter(m => m.level === level);

        filteredModules.forEach(module => {
            const moduleCard = createModuleCard(module);
            modulesContainer.appendChild(moduleCard);
        });
    }

    // Create module card
    function createModuleCard(module) {
        const card = document.createElement('div');
        card.className = 'module-card';
        card.innerHTML = `
            <div class="module-icon" style="font-size: 3rem; margin-bottom: 1rem;">${module.icon}</div>
            <h3>${module.title}</h3>
            <span class="module-level ${module.level}">${module.level.charAt(0).toUpperCase() + module.level.slice(1)}</span>
            <p class="module-description">${module.description}</p>
            <div class="module-stats">
                <span>📊 ${module.questions} questions</span>
                <span>⏱️ ${module.time}</span>
            </div>
            <button class="btn btn-primary btn-block start-learning-btn" data-module-id="${module.id}">
                Start Learning
            </button>
        `;

        const startBtn = card.querySelector('.start-learning-btn');
        startBtn.addEventListener('click', () => {
            startModule(module.id);
        });

        return card;
    }

    // Start module activity
    function startModule(moduleId) {
        if (!moduleActivity || !activityContent) return;

        // Hide modules grid
        const modulesGridSection = document.querySelector('.modules-grid-section');
        if (modulesGridSection) {
            modulesGridSection.style.display = 'none';
        }

        // Show activity section
        moduleActivity.classList.remove('hidden');

        // Load appropriate activity based on module
        switch (moduleId) {
            case 'vocabulary-builder':
            case 'vocabulary-advanced':
                loadVocabularyBuilder();
                break;
            case 'grammar-quiz':
            case 'grammar-beginner':
                loadGrammarQuiz();
                break;
            case 'pronunciation':
                loadPronunciationPractice();
                break;
            case 'timed-challenge':
                loadTimedChallenge();
                break;
            default:
                loadVocabularyBuilder();
        }
    }

    // Back to modules
    if (backToModulesBtn) {
        backToModulesBtn.addEventListener('click', function () {
            moduleActivity.classList.add('hidden');
            const modulesGridSection = document.querySelector('.modules-grid-section');
            if (modulesGridSection) {
                modulesGridSection.style.display = 'block';
            }
        });
    }

    // Level filter
    if (levelFilter) {
        levelFilter.addEventListener('change', function () {
            loadModules(this.value);
        });
    }

    // Load vocabulary builder
    function loadVocabularyBuilder() {
        if (!activityContent) return;

        let currentIndex = 0;
        let score = 0;
        const shuffledWords = [...vocabularyWords].sort(() => Math.random() - 0.5);

        function showFlashcard() {
            if (currentIndex >= shuffledWords.length) {
                showVocabularyResults(score, shuffledWords.length);
                return;
            }

            const word = shuffledWords[currentIndex];
            activityContent.innerHTML = `
                <div class="activity-container">
                    <h2>Vocabulary Builder</h2>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(currentIndex / shuffledWords.length) * 100}%">
                            ${currentIndex} / ${shuffledWords.length}
                        </div>
                    </div>
                    <div class="flashcard-container">
                        <div class="flashcard" id="flashcard">
                            <div class="flashcard-front">
                                <div class="flashcard-word">${word.word}</div>
                                <p style="margin-top: 1rem; font-size: 1rem;">Click to flip</p>
                            </div>
                            <div class="flashcard-back">
                                <div class="flashcard-translation">${word.translation}</div>
                                <p style="margin-top: 1rem; font-size: 1rem;">${word.language}</p>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 2rem;">
                        <button class="btn btn-primary" id="know-btn">I Know This</button>
                        <button class="btn btn-secondary" id="dont-know-btn">Don't Know</button>
                    </div>
                </div>
            `;

            const flashcard = document.getElementById('flashcard');
            const knowBtn = document.getElementById('know-btn');
            const dontKnowBtn = document.getElementById('dont-know-btn');

            flashcard.addEventListener('click', function () {
                this.classList.toggle('flipped');
            });

            knowBtn.addEventListener('click', function () {
                score++;
                currentIndex++;
                showFlashcard();
            });

            dontKnowBtn.addEventListener('click', function () {
                currentIndex++;
                showFlashcard();
            });
        }

        function showVocabularyResults(score, total) {
            const percentage = Math.round((score / total) * 100);
            activityContent.innerHTML = `
                <div class="activity-container">
                    <div class="quiz-result">
                        <h2>Vocabulary Builder Complete!</h2>
                        <div class="quiz-score">${score} / ${total}</div>
                        <p>You got ${percentage}% correct!</p>
                        <div style="margin-top: 2rem;">
                            <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
                            <button class="btn btn-secondary" id="back-to-modules-2">Back to Modules</button>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('back-to-modules-2').addEventListener('click', function () {
                moduleActivity.classList.add('hidden');
                const modulesGridSection = document.querySelector('.modules-grid-section');
                if (modulesGridSection) {
                    modulesGridSection.style.display = 'block';
                }
            });

            // Update progress
            updateProgress('vocabulary-builder', percentage);
        }

        showFlashcard();
    }

    // Load grammar quiz
    function loadGrammarQuiz() {
        if (!activityContent) return;

        let currentQuestion = 0;
        let score = 0;
        let selectedOption = null;

        function showQuestion() {
            if (currentQuestion >= grammarQuestions.length) {
                showGrammarResults(score, grammarQuestions.length);
                return;
            }

            const question = grammarQuestions[currentQuestion];
            activityContent.innerHTML = `
                <div class="activity-container">
                    <h2>Grammar Quiz</h2>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(currentQuestion / grammarQuestions.length) * 100}%">
                            ${currentQuestion} / ${grammarQuestions.length}
                        </div>
                    </div>
                    <div class="quiz-container">
                        <div class="quiz-question">${question.question}</div>
                        <div class="quiz-options" id="quiz-options">
                            ${question.options.map((option, index) => `
                                <div class="quiz-option" data-index="${index}">${option}</div>
                            `).join('')}
                        </div>
                        <button class="btn btn-primary btn-block" id="submit-answer" disabled>Submit Answer</button>
                    </div>
                </div>
            `;

            const options = document.querySelectorAll('.quiz-option');
            const submitBtn = document.getElementById('submit-answer');

            options.forEach(option => {
                option.addEventListener('click', function () {
                    options.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedOption = parseInt(this.dataset.index);
                    submitBtn.disabled = false;
                });
            });

            submitBtn.addEventListener('click', function () {
                if (selectedOption === null) return;

                // Show correct/incorrect
                options.forEach((opt, index) => {
                    if (index === question.correct) {
                        opt.classList.add('correct');
                    } else if (index === selectedOption && index !== question.correct) {
                        opt.classList.add('incorrect');
                    }
                    opt.style.pointerEvents = 'none';
                });

                if (selectedOption === question.correct) {
                    score++;
                }

                submitBtn.textContent = 'Next Question';
                submitBtn.onclick = function () {
                    currentQuestion++;
                    selectedOption = null;
                    showQuestion();
                };
            });
        }

        function showGrammarResults(score, total) {
            const percentage = Math.round((score / total) * 100);
            activityContent.innerHTML = `
                <div class="activity-container">
                    <div class="quiz-result">
                        <h2>Grammar Quiz Complete!</h2>
                        <div class="quiz-score">${score} / ${total}</div>
                        <p>You got ${percentage}% correct!</p>
                        <div style="margin-top: 2rem;">
                            <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
                            <button class="btn btn-secondary" id="back-to-modules-3">Back to Modules</button>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('back-to-modules-3').addEventListener('click', function () {
                moduleActivity.classList.add('hidden');
                const modulesGridSection = document.querySelector('.modules-grid-section');
                if (modulesGridSection) {
                    modulesGridSection.style.display = 'block';
                }
            });

            updateProgress('grammar-quiz', percentage);
        }

        showQuestion();
    }

    // Load pronunciation practice
    function loadPronunciationPractice() {
        if (!activityContent) return;

        const practiceWords = [
            { word: 'Hello', phonetic: '/həˈloʊ/' },
            { word: 'Thank you', phonetic: '/θæŋk juː/' },
            { word: 'Please', phonetic: '/pliːz/' },
            { word: 'Water', phonetic: '/ˈwɔːtər/' },
            { word: 'Friend', phonetic: '/frend/' }
        ];

        let currentIndex = 0;

        function showPronunciation() {
            if (currentIndex >= practiceWords.length) {
                showPronunciationResults();
                return;
            }

            const word = practiceWords[currentIndex];
            activityContent.innerHTML = `
                <div class="activity-container">
                    <h2>Pronunciation Practice</h2>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(currentIndex / practiceWords.length) * 100}%">
                            ${currentIndex} / ${practiceWords.length}
                        </div>
                    </div>
                    <div style="text-align: center; padding: 3rem 0;">
                        <div style="font-size: 3rem; margin-bottom: 2rem;">${word.word}</div>
                        <div style="font-size: 1.5rem; color: #666; margin-bottom: 2rem;">${word.phonetic}</div>
                        <button class="btn btn-primary" id="play-audio" style="margin-bottom: 2rem;">
                            🔊 Play Audio
                        </button>
                        <p style="margin-top: 2rem; color: #666;">Listen and repeat the word</p>
                    </div>
                    <div style="text-align: center; margin-top: 2rem;">
                        <button class="btn btn-primary" id="next-pronunciation">Next Word</button>
                    </div>
                </div>
            `;

            document.getElementById('play-audio').addEventListener('click', function () {
                // In a real app, this would play audio
                // For now, we'll use Web Speech API if available
                if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(word.word);
                    utterance.lang = 'en-US';
                    speechSynthesis.speak(utterance);
                } else {
                    alert('Audio playback: ' + word.word);
                }
            });

            document.getElementById('next-pronunciation').addEventListener('click', function () {
                currentIndex++;
                showPronunciation();
            });
        }

        function showPronunciationResults() {
            activityContent.innerHTML = `
                <div class="activity-container">
                    <div class="quiz-result">
                        <h2>Pronunciation Practice Complete!</h2>
                        <p>Great job practicing your pronunciation!</p>
                        <div style="margin-top: 2rem;">
                            <button class="btn btn-primary" onclick="location.reload()">Practice Again</button>
                            <button class="btn btn-secondary" id="back-to-modules-4">Back to Modules</button>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('back-to-modules-4').addEventListener('click', function () {
                moduleActivity.classList.add('hidden');
                const modulesGridSection = document.querySelector('.modules-grid-section');
                if (modulesGridSection) {
                    modulesGridSection.style.display = 'block';
                }
            });
        }

        showPronunciation();
    }

    // Load timed challenge
    function loadTimedChallenge() {
        if (!activityContent) return;

        const challengeQuestions = [
            { question: 'What is "Hello" in Spanish?', options: ['Hola', 'Adiós', 'Gracias', 'Por favor'], correct: 0 },
            { question: 'What is "Thank you" in Spanish?', options: ['Hola', 'Adiós', 'Gracias', 'Por favor'], correct: 2 },
            { question: 'What is "Goodbye" in Spanish?', options: ['Hola', 'Adiós', 'Gracias', 'Por favor'], correct: 1 },
            { question: 'What is "Please" in Spanish?', options: ['Hola', 'Adiós', 'Gracias', 'Por favor'], correct: 3 },
            { question: 'What is "Water" in Spanish?', options: ['Agua', 'Comida', 'Amigo', 'Amor'], correct: 0 }
        ];

        let currentQuestion = 0;
        let score = 0;
        let timeLeft = 60; // 60 seconds
        let timerInterval;

        function startTimer() {
            timerInterval = setInterval(() => {
                timeLeft--;
                const timerDisplay = document.getElementById('timer-display');
                if (timerDisplay) {
                    timerDisplay.textContent = `Time: ${timeLeft}s`;
                }

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    showTimedResults(score, challengeQuestions.length);
                }
            }, 1000);
        }

        function showQuestion() {
            if (currentQuestion >= challengeQuestions.length || timeLeft <= 0) {
                clearInterval(timerInterval);
                showTimedResults(score, challengeQuestions.length);
                return;
            }

            const question = challengeQuestions[currentQuestion];
            activityContent.innerHTML = `
                <div class="activity-container">
                    <h2>Timed Challenge</h2>
                    <div class="timer-display" id="timer-display">Time: ${timeLeft}s</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(currentQuestion / challengeQuestions.length) * 100}%">
                            ${currentQuestion} / ${challengeQuestions.length}
                        </div>
                    </div>
                    <div class="quiz-container">
                        <div class="quiz-question">${question.question}</div>
                        <div class="quiz-options" id="quiz-options">
                            ${question.options.map((option, index) => `
                                <div class="quiz-option" data-index="${index}">${option}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            const options = document.querySelectorAll('.quiz-option');

            options.forEach(option => {
                option.addEventListener('click', function () {
                    const selectedIndex = parseInt(this.dataset.index);

                    // Show result immediately
                    options.forEach((opt, index) => {
                        if (index === question.correct) {
                            opt.classList.add('correct');
                        } else if (index === selectedIndex && index !== question.correct) {
                            opt.classList.add('incorrect');
                        }
                        opt.style.pointerEvents = 'none';
                    });

                    if (selectedIndex === question.correct) {
                        score++;
                    }

                    // Move to next question after short delay
                    setTimeout(() => {
                        currentQuestion++;
                        showQuestion();
                    }, 1000);
                });
            });
        }

        function showTimedResults(score, total) {
            const percentage = Math.round((score / total) * 100);
            activityContent.innerHTML = `
                <div class="activity-container">
                    <div class="quiz-result">
                        <h2>Time's Up!</h2>
                        <div class="quiz-score">${score} / ${total}</div>
                        <p>You got ${percentage}% correct!</p>
                        <div style="margin-top: 2rem;">
                            <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
                            <button class="btn btn-secondary" id="back-to-modules-5">Back to Modules</button>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('back-to-modules-5').addEventListener('click', function () {
                moduleActivity.classList.add('hidden');
                const modulesGridSection = document.querySelector('.modules-grid-section');
                if (modulesGridSection) {
                    modulesGridSection.style.display = 'block';
                }
            });

            updateProgress('timed-challenge', percentage);
        }

        showQuestion();
        startTimer();
    }

    // Update user progress
    function updateProgress(moduleId, score) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) return;

        let progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        if (!progress[currentUser.id]) {
            progress[currentUser.id] = {};
        }

        progress[currentUser.id][moduleId] = {
            score: score,
            completed: true,
            date: new Date().toISOString()
        };

        localStorage.setItem('userProgress', JSON.stringify(progress));

        // Update leaderboard
        updateLeaderboard(currentUser.id, progress[currentUser.id]);
    }

    // Update leaderboard
    function updateLeaderboard(userId, userProgress) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.id === userId);
        if (!user) return;

        const totalScore = Object.values(userProgress).reduce((sum, module) => sum + (module.score || 0), 0);
        const completedModules = Object.keys(userProgress).length;
        const averageScore = completedModules > 0 ? Math.round(totalScore / completedModules) : 0;

        let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
        const existingIndex = leaderboard.findIndex(entry => entry.userId === userId);

        const entry = {
            userId: userId,
            name: user.name,
            score: averageScore,
            modulesCompleted: completedModules,
            lastUpdated: new Date().toISOString()
        };

        if (existingIndex >= 0) {
            leaderboard[existingIndex] = entry;
        } else {
            leaderboard.push(entry);
        }

        // Sort by score (descending)
        leaderboard.sort((a, b) => b.score - a.score);

        // Keep top 10
        leaderboard = leaderboard.slice(0, 10);

        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }

    // Initial load
    loadModules('all');
});
