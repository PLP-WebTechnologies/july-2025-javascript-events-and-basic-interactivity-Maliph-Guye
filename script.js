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
    initializeThemeToggle();
    initializeCounter();
    initializeFormValidation();
    initializePasswordToggle();
    initializeModal();
}

// ==============================================
// FEATURE 1: Theme Toggle Functionality
// ==============================================
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = 'Switch to Light Mode';
    }
    
    /**
     * Toggle between light and dark themes
     */
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update button text and save preference
        if (body.classList.contains('dark-mode')) {
            this.textContent = 'Switch to Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            this.textContent = 'Switch to Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ==============================================
// FEATURE 2: Interactive Counter
// ==============================================
function initializeCounter() {
    const counterValue = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const resetBtn = document.getElementById('resetCounter');
    
    let count = 0;
    
    /**
     * Update counter display with current value
     */
    function updateCounter() {
        counterValue.textContent = count;
        // Add visual feedback for positive/negative values
        if (count > 0) {
            counterValue.style.color = '#28a745';
        } else if (count < 0) {
            counterValue.style.color = '#dc3545';
        } else {
            counterValue.style.color = '#333';
        }
    }
    
    /**
     * Increment counter value
     */
    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounter();
    });
    
    /**
     * Decrement counter value
     */
    decrementBtn.addEventListener('click', function() {
        count--;
        updateCounter();
    });
    
    /**
     * Reset counter to zero
     */
    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();
    });
    
    // Initialize counter display
    updateCounter();
}

// ==============================================
// FEATURE 3: Custom Form Validation
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
            nameInput.style.borderColor = '#dc3545';
            return false;
        }
        
        if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.style.borderColor = '#dc3545';
            return false;
        }
        
        nameError.textContent = '';
        nameInput.style.borderColor = '#28a745';
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
            emailInput.style.borderColor = '#dc3545';
            return false;
        }
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#dc3545';
            return false;
        }
        
        emailError.textContent = '';
        emailInput.style.borderColor = '#28a745';
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
            passwordInput.style.borderColor = '#dc3545';
            return false;
        }
        
        if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordInput.style.borderColor = '#dc3545';
            return false;
        }
        
        passwordError.textContent = '';
        passwordInput.style.borderColor = '#28a745';
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
            alert('Form submitted successfully!');
            form.reset();
            
            // Reset border colors
            [nameInput, emailInput, passwordInput].forEach(input => {
                input.style.borderColor = '#ddd';
            });
        } else {
            // Form is invalid - show error message
            alert('Please fix the errors in the form before submitting.');
        }
    });
}

// ==============================================
// FEATURE 4: Password Visibility Toggle
// ==============================================
function initializePasswordToggle() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    
    /**
     * Toggle password visibility
     */
    togglePassword.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.textContent = '🔒';
        } else {
            passwordInput.type = 'password';
            this.textContent = '👁️';
        }
    });
}

// ==============================================
// FEATURE 5: Modal Functionality
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