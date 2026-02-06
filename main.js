// ============================================
// Main JavaScript - Navigation & General Functions
// ============================================

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Initialize user data storage if not exists
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Initialize progress tracking if not exists
    if (!localStorage.getItem('userProgress')) {
        localStorage.setItem('userProgress', JSON.stringify({}));
    }

    // Initialize leaderboard if not exists
    if (!localStorage.getItem('leaderboard')) {
        localStorage.setItem('leaderboard', JSON.stringify([]));
    }
});

// Utility function to show/hide elements
function showElement(element) {
    if (element) {
        element.classList.remove('hidden');
    }
}

function hideElement(element) {
    if (element) {
        element.classList.add('hidden');
    }
}

// Utility function to get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

// Utility function to set current user
function setCurrentUser(user) {
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('currentUser');
    }
}
