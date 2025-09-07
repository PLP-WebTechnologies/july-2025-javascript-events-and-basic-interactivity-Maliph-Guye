// script.js
// ==============================================
// DOM Content Loaded Event
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize all interactive features of the application
 */
function initializeApp() {
    initializeThemeSelector();
    initializeDrawingBoard();
    initializeFAQ();
    initializeFormValidation();
    initializePasswordToggle();
    initializeModal();
}

// ==============================================
// FEATURE 1: Theme Selector Functionality
// ==============================================
function initializeThemeSelector() {
    const themeDropdown = document.getElementById('themeDropdown');
    const colorPicker = document.getElementById('colorPicker');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        themeDropdown.value = savedTheme;
        applyTheme(savedTheme);
    }
    
    // Check for saved color preference
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        colorPicker.value = savedColor;
        document.documentElement.style.setProperty('--primary-color', savedColor);
    }
    
    /**
     * Handle theme dropdown changes
     */
    themeDropdown.addEventListener('change', function() {
        const selectedTheme = this.value;
        applyTheme(selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    });
    
    /**
     * Handle color picker changes
     */
    colorPicker.addEventListener('input', function() {
        const selectedColor = this.value;
        document.documentElement.style.setProperty('--primary-color', selectedColor);
        localStorage.setItem('themeColor', selectedColor);
    });
    
    /**
     * Apply the selected theme
     * @param {string} theme - The theme to apply
     */
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else if (theme === 'system') {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body.classList.add('dark-theme');
            } else {
                body.classList.remove('dark-theme');
            }
        } else {
            body.classList.remove('dark-theme');
        }
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (themeDropdown.value === 'system') {
                applyTheme('system');
            }
        });
    }
}

// ==============================================
// FEATURE 2: Interactive Drawing Board
// ==============================================
function initializeDrawingBoard() {
    const canvas = document.getElementById('drawingBoard');
    const clearBtn = document.getElementById('clearBoard');
    const colorBtns = document.querySelectorAll('.color-btn');
    const ctx = canvas.getContext('2d');
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let strokeColor = '#ff3b30';
    let lineWidth = 5;
    
    // Set canvas background to white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    /**
     * Start drawing
     */
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    /**
     * Draw on the canvas
     */
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    /**
     * Stop drawing
     */
    function stopDrawing() {
        isDrawing = false;
    }
    
    /**
     * Clear the canvas
     */
    function clearCanvas() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Event listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Clear button
    clearBtn.addEventListener('click', clearCanvas);
    
    // Color buttons
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            strokeColor = this.dataset.color;
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ==============================================
// FEATURE 3: Collapsible FAQ Section
// ==============================================
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    /**
     * Toggle FAQ answer visibility
     */
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.icon i');
            
            // Toggle active class
            answer.classList.toggle('active');
            
            // Change icon
            if (answer.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
}

// ==============================================
// FEATURE 4: Custom Form Validation
// ==============================================
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    /**
     * Validate name field
     * @returns {boolean} True if valid, false otherwise
     */
    function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        
        if (name === '') {
            nameError.textContent = 'Name is required';
            nameInput.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            nameError.textContent = 'Name can only contain letters and spaces';
            nameInput.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        nameError.textContent = '';
        nameInput.style.borderColor = 'var(--success-color)';
        return true;
    }
    
    /**
     * Validate email field
     * @returns {boolean} True if valid, false otherwise
     */
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailError.textContent = 'Email is required';
            emailInput.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        emailError.textContent = '';
        emailInput.style.borderColor = 'var(--success-color)';
        return true;
    }
    
    /**
     * Validate password field
     * @returns {boolean} True if valid, false otherwise
     */
    function validatePassword() {
        const password = passwordInput.value;
        const passwordError = document.getElementById('passwordError');
        
        if (password === '') {
            passwordError.textContent = 'Password is required';
            passwordInput.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            passwordError.textContent = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
            passwordInput.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        passwordError.textContent = '';
        passwordInput.style.borderColor = 'var(--success-color)';
        return true;
    }
    
    // Real-time validation as user types
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    /**
     * Handle form submission with custom validation
     */
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            // Form is valid - show success message
            alert('Form submitted successfully! Thank you for your message.');
            form.reset();
            
            // Reset border colors
            [nameInput, emailInput, passwordInput].forEach(input => {
                input.style.borderColor = 'var(--border-color)';
            });
        } else {
            // Form is invalid - show error message
            alert('Please fix the errors in the form before submitting.');
        }
    });
}

// ==============================================
// FEATURE 5: Password Visibility Toggle
// ==============================================
function initializePasswordToggle() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const icon = togglePassword.querySelector('i');
    
    /**
     * Toggle password visibility
     */
    togglePassword.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
}

// ==============================================
// FEATURE 6: Modal Functionality
// ==============================================
function initializeModal() {
    const modal = document.getElementById('myModal');
    const openModalBtn = document.getElementById('openModal');
    const closeBtn = document.querySelector('.close');
    
    /**
     * Open the modal
     */
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    /**
     * Close the modal
     */
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Event listeners
    openModalBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}