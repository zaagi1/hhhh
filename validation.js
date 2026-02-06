// ============================================
// Form Validation Functions
// ============================================

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation - at least 8 chars, uppercase, lowercase, and number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Clear error message
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Validate email
function validateEmail(email) {
    return emailRegex.test(email);
}

// Validate password strength
function validatePassword(password) {
    return passwordRegex.test(password);
}

// Signup Form Validation
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    const successMessage = document.getElementById('success-message');

    if (signupForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');

        // Real-time validation
        if (nameInput) {
            nameInput.addEventListener('blur', function () {
                if (!nameInput.value.trim()) {
                    showError('name-error', 'Name is required');
                } else if (nameInput.value.trim().length < 2) {
                    showError('name-error', 'Name must be at least 2 characters');
                } else {
                    clearError('name-error');
                }
            });
        }

        if (emailInput) {
            emailInput.addEventListener('blur', function () {
                if (!emailInput.value.trim()) {
                    showError('email-error', 'Email is required');
                } else if (!validateEmail(emailInput.value)) {
                    showError('email-error', 'Please enter a valid email address');
                } else {
                    clearError('email-error');
                }
            });
        }

        if (passwordInput) {
            passwordInput.addEventListener('blur', function () {
                if (!passwordInput.value) {
                    showError('password-error', 'Password is required');
                } else if (!validatePassword(passwordInput.value)) {
                    showError('password-error', 'Password must be at least 8 characters with uppercase, lowercase, and a number');
                } else {
                    clearError('password-error');
                }
            });
        }

        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('blur', function () {
                if (!confirmPasswordInput.value) {
                    showError('confirm-password-error', 'Please confirm your password');
                } else if (confirmPasswordInput.value !== passwordInput.value) {
                    showError('confirm-password-error', 'Passwords do not match');
                } else {
                    clearError('confirm-password-error');
                }
            });
        }

        // Form submission
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Clear previous errors
            clearError('name-error');
            clearError('email-error');
            clearError('password-error');
            clearError('confirm-password-error');

            let isValid = true;

            // Validate name
            if (!nameInput.value.trim()) {
                showError('name-error', 'Name is required');
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                showError('name-error', 'Name must be at least 2 characters');
                isValid = false;
            }

            // Validate email
            if (!emailInput.value.trim()) {
                showError('email-error', 'Email is required');
                isValid = false;
            } else if (!validateEmail(emailInput.value)) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }

            // Check if email already exists
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.email === emailInput.value.trim())) {
                showError('email-error', 'This email is already registered');
                isValid = false;
            }

            // Validate password
            if (!passwordInput.value) {
                showError('password-error', 'Password is required');
                isValid = false;
            } else if (!validatePassword(passwordInput.value)) {
                showError('password-error', 'Password must be at least 8 characters with uppercase, lowercase, and a number');
                isValid = false;
            }

            // Validate confirm password
            if (!confirmPasswordInput.value) {
                showError('confirm-password-error', 'Please confirm your password');
                isValid = false;
            } else if (confirmPasswordInput.value !== passwordInput.value) {
                showError('confirm-password-error', 'Passwords do not match');
                isValid = false;
            }

            if (isValid) {
                // Save user to localStorage
                const newUser = {
                    id: Date.now().toString(),
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    password: passwordInput.value, // In production, this should be hashed
                    createdAt: new Date().toISOString()
                };

                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // Hide form and show success message
                signupForm.style.display = 'none';
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                }
            }
        });
    }

    // Login Form Validation
    const loginForm = document.getElementById('login-form');
    const loginSuccessMessage = document.getElementById('login-success-message');

    if (loginForm) {
        const loginEmailInput = document.getElementById('login-email');
        const loginPasswordInput = document.getElementById('login-password');

        if (loginEmailInput) {
            loginEmailInput.addEventListener('blur', function () {
                if (!loginEmailInput.value.trim()) {
                    showError('login-email-error', 'Email is required');
                } else if (!validateEmail(loginEmailInput.value)) {
                    showError('login-email-error', 'Please enter a valid email address');
                } else {
                    clearError('login-email-error');
                }
            });
        }

        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            clearError('login-email-error');
            clearError('login-password-error');

            let isValid = true;

            // Validate email
            if (!loginEmailInput.value.trim()) {
                showError('login-email-error', 'Email is required');
                isValid = false;
            } else if (!validateEmail(loginEmailInput.value)) {
                showError('login-email-error', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate password
            if (!loginPasswordInput.value) {
                showError('login-password-error', 'Password is required');
                isValid = false;
            }

            if (isValid) {
                // Check credentials
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u =>
                    u.email === loginEmailInput.value.trim() &&
                    u.password === loginPasswordInput.value
                );

                if (user) {
                    // Set current user
                    localStorage.setItem('currentUser', JSON.stringify({
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }));

                    // Show success message
                    if (loginSuccessMessage) {
                        loginForm.style.display = 'none';
                        loginSuccessMessage.classList.remove('hidden');
                    }

                    // Redirect to modules after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'modules.html';
                    }, 2000);
                } else {
                    showError('login-password-error', 'Incorrect email or password');
                }
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const contactSuccessMessage = document.getElementById('contact-success-message');
    const sendAnotherBtn = document.getElementById('send-another');

    if (contactForm) {
        const contactNameInput = document.getElementById('contact-name');
        const contactEmailInput = document.getElementById('contact-email');
        const contactSubjectInput = document.getElementById('contact-subject');
        const contactMessageInput = document.getElementById('contact-message');

        // Real-time validation
        if (contactNameInput) {
            contactNameInput.addEventListener('blur', function () {
                if (!contactNameInput.value.trim()) {
                    showError('contact-name-error', 'Name is required');
                } else {
                    clearError('contact-name-error');
                }
            });
        }

        if (contactEmailInput) {
            contactEmailInput.addEventListener('blur', function () {
                if (!contactEmailInput.value.trim()) {
                    showError('contact-email-error', 'Email is required');
                } else if (!validateEmail(contactEmailInput.value)) {
                    showError('contact-email-error', 'Please enter a valid email address');
                } else {
                    clearError('contact-email-error');
                }
            });
        }

        if (contactSubjectInput) {
            contactSubjectInput.addEventListener('blur', function () {
                if (!contactSubjectInput.value.trim()) {
                    showError('contact-subject-error', 'Subject is required');
                } else {
                    clearError('contact-subject-error');
                }
            });
        }

        if (contactMessageInput) {
            contactMessageInput.addEventListener('blur', function () {
                if (!contactMessageInput.value.trim()) {
                    showError('contact-message-error', 'Message is required');
                } else if (contactMessageInput.value.trim().length < 10) {
                    showError('contact-message-error', 'Message must be at least 10 characters');
                } else {
                    clearError('contact-message-error');
                }
            });
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            clearError('contact-name-error');
            clearError('contact-email-error');
            clearError('contact-subject-error');
            clearError('contact-message-error');

            let isValid = true;

            // Validate name
            if (!contactNameInput.value.trim()) {
                showError('contact-name-error', 'Name is required');
                isValid = false;
            }

            // Validate email
            if (!contactEmailInput.value.trim()) {
                showError('contact-email-error', 'Email is required');
                isValid = false;
            } else if (!validateEmail(contactEmailInput.value)) {
                showError('contact-email-error', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate subject
            if (!contactSubjectInput.value.trim()) {
                showError('contact-subject-error', 'Subject is required');
                isValid = false;
            }

            // Validate message
            if (!contactMessageInput.value.trim()) {
                showError('contact-message-error', 'Message is required');
                isValid = false;
            } else if (contactMessageInput.value.trim().length < 10) {
                showError('contact-message-error', 'Message must be at least 10 characters');
                isValid = false;
            }

            if (isValid) {
                // In a real application, this would send the data to a server
                // For now, we'll just show a success message
                contactForm.style.display = 'none';
                if (contactSuccessMessage) {
                    contactSuccessMessage.classList.remove('hidden');
                }
            }
        });

        // Send another message button
        if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', function () {
                contactForm.style.display = 'block';
                contactForm.reset();
                if (contactSuccessMessage) {
                    contactSuccessMessage.classList.add('hidden');
                }
            });
        }
    }
});
