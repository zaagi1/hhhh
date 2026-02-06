// ============================================
// Profile Page - Progress Tracking & Leaderboard
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    const profileContent = document.getElementById('profile-content');
    const leaderboardContent = document.getElementById('leaderboard-content');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    // Check if user is logged in
    if (!currentUser) {
        if (profileContent) {
            profileContent.innerHTML = `
                <div class="form-container">
                    <h2>Please Login</h2>
                    <p>You need to be logged in to view your profile.</p>
                    <a href="login.html" class="btn btn-primary">Go to Login</a>
                </div>
            `;
        }
        return;
    }

    // Load user profile
    function loadProfile() {
        if (!profileContent) return;

        const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        const userProgress = progress[currentUser.id] || {};

        // Calculate statistics
        const completedModules = Object.keys(userProgress).length;
        const totalScore = Object.values(userProgress).reduce((sum, module) => sum + (module.score || 0), 0);
        const averageScore = completedModules > 0 ? Math.round(totalScore / completedModules) : 0;

        // Get module names
        const moduleNames = {
            'vocabulary-builder': 'Vocabulary Builder',
            'grammar-quiz': 'Grammar Quiz',
            'pronunciation': 'Pronunciation Practice',
            'timed-challenge': 'Timed Challenge',
            'vocabulary-advanced': 'Advanced Vocabulary',
            'grammar-beginner': 'Grammar Basics'
        };

        let progressHTML = `
            <div class="form-container">
                <h2 class="form-title">Welcome, ${currentUser.name}!</h2>
                <div class="profile-stats">
                    <div class="stat-card">
                        <div class="stat-value">${completedModules}</div>
                        <div class="stat-label">Modules Completed</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${averageScore}%</div>
                        <div class="stat-label">Average Score</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${totalScore}</div>
                        <div class="stat-label">Total Points</div>
                    </div>
                </div>

                <h3 style="margin-top: 2rem; color: var(--button-color);">Your Progress</h3>
        `;

        if (completedModules === 0) {
            progressHTML += `
                <p style="text-align: center; padding: 2rem; color: #666;">
                    You haven't completed any modules yet. <a href="modules.html">Start learning now!</a>
                </p>
            `;
        } else {
            progressHTML += '<div class="progress-list">';
            for (const [moduleId, moduleData] of Object.entries(userProgress)) {
                const moduleName = moduleNames[moduleId] || moduleId;
                const score = moduleData.score || 0;
                const date = new Date(moduleData.date).toLocaleDateString();

                progressHTML += `
                    <div class="progress-item">
                        <div class="progress-item-header">
                            <h4>${moduleName}</h4>
                            <span class="progress-score">${score}%</span>
                        </div>
                        <div class="progress-bar" style="margin: 0.5rem 0;">
                            <div class="progress-fill" style="width: ${score}%">${score}%</div>
                        </div>
                        <div class="progress-date">Completed: ${date}</div>
                    </div>
                `;
            }
            progressHTML += '</div>';
        }

        progressHTML += `
                <div style="text-align: center; margin-top: 2rem;">
                    <a href="modules.html" class="btn btn-primary">Continue Learning</a>
                    <button class="btn btn-secondary" id="logout-btn" style="margin-left: 1rem;">Logout</button>
                </div>
            </div>
        `;

        profileContent.innerHTML = progressHTML;

        // Logout functionality
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        }
    }

    // Load leaderboard
    function loadLeaderboard() {
        if (!leaderboardContent) return;

        let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
        const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Update leaderboard with current scores
        for (const [userId, userProgress] of Object.entries(progress)) {
            const totalScore = Object.values(userProgress).reduce((sum, module) => sum + (module.score || 0), 0);
            const completedModules = Object.keys(userProgress).length;
            const averageScore = completedModules > 0 ? Math.round(totalScore / completedModules) : 0;

            const user = users.find(u => u.id === userId);
            if (user) {
                const existingEntry = leaderboard.findIndex(entry => entry.userId === userId);
                const entry = {
                    userId: userId,
                    name: user.name,
                    score: averageScore,
                    modulesCompleted: completedModules,
                    lastUpdated: new Date().toISOString()
                };

                if (existingEntry >= 0) {
                    leaderboard[existingEntry] = entry;
                } else {
                    leaderboard.push(entry);
                }
            }
        }

        // Sort by score (descending)
        leaderboard.sort((a, b) => b.score - a.score);

        // Keep top 10
        leaderboard = leaderboard.slice(0, 10);

        // Save updated leaderboard
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

        let leaderboardHTML = '<div class="leaderboard-container">';

        if (leaderboard.length === 0) {
            leaderboardHTML += '<p style="text-align: center; padding: 2rem; color: #666;">No scores yet. Be the first to complete a module!</p>';
        } else {
            leaderboardHTML += '<div class="leaderboard-list">';
            leaderboard.forEach((entry, index) => {
                const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
                const isCurrentUser = entry.userId === currentUser.id;
                leaderboardHTML += `
                    <div class="leaderboard-item ${isCurrentUser ? 'current-user' : ''}">
                        <div class="leaderboard-rank">${medal}</div>
                        <div class="leaderboard-name">${entry.name} ${isCurrentUser ? '(You)' : ''}</div>
                        <div class="leaderboard-score">${entry.score}%</div>
                        <div class="leaderboard-modules">${entry.modulesCompleted} modules</div>
                    </div>
                `;
            });
            leaderboardHTML += '</div>';
        }

        leaderboardHTML += '</div>';
        leaderboardContent.innerHTML = leaderboardHTML;
    }

    // Initialize
    loadProfile();
    loadLeaderboard();
});
