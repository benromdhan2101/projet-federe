// auth.js - User authentication with LocalStorage

// User class to represent user data
class User {
    constructor(firstName, lastName, email, password, studentId = '') {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password; // Note: In a real app, never store plain passwords
        this.studentId = studentId;
    }
}

// Auth service to handle authentication
class AuthService {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    // Register a new user
    register(firstName, lastName, email, password, studentId) {
        // Check if user already exists
        if (this.users.some(user => user.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Create new user
        const newUser = new User(firstName, lastName, email, password, studentId);
        this.users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(this.users));
        
        return { success: true, user: newUser };
    }

    // Login user
    login(email, password, rememberMe = false) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
            }
            return { success: true, user };
        }
        
        return { success: false, message: 'Invalid email or password' };
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
    }

    // Check if user is logged in
    isAuthenticated() {
        return this.currentUser !== null || 
               localStorage.getItem('currentUser') !== null || 
               sessionStorage.getItem('currentUser') !== null;
    }

    // Get current user
    getCurrentUser() {
        if (this.currentUser) return this.currentUser;
        
        const storedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            return this.currentUser;
        }
        
        return null;
    }
}

// Initialize auth service
const authService = new AuthService();

// Helper function to redirect to home page
function redirectToHome() {
    window.location.href = '../index.html';
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const studentId = document.getElementById('student-id').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const result = authService.register(firstName, lastName, email, password, studentId);
    
    if (result.success) {
        alert('Registration successful! Please login.');
        window.location.href = '../login page/login.html';
    } else {
        alert(result.message);
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;

    const result = authService.login(email, password, rememberMe);
    
    if (result.success) {
        redirectToHome();
    } else {
        alert(result.message);
    }
}

// Check if user is logged in when page loads
function checkAuth() {
    if (authService.isAuthenticated() && 
        (window.location.pathname.includes('login.html') || 
         window.location.pathname.includes('sign-up.html'))) {
        redirectToHome();
    }
}

// Initialize forms if they exist on the page
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Update login/logout buttons in navbar
    const loginButton = document.querySelector('.Login-button');
    const signupButton = document.querySelector('.Signup-button');
    
    if (authService.isAuthenticated()) {
        if (loginButton) loginButton.textContent = 'Logout';
        if (signupButton) signupButton.style.display = 'none';
        
        if (loginButton) {
            loginButton.addEventListener('click', function(e) {
                e.preventDefault();
                authService.logout();
                window.location.reload();
            });
        }
    } else {
        if (loginButton) {
            loginButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = '../login page/login.html';
            });
        }
        
        if (signupButton) {
            signupButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = '../sign up/sign-up.html';
            });
        }
    }
});