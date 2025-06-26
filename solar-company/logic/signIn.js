// Function to handle login
    document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get login inputs
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Retrieve user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    // User not found
    // if (storedUser && storedUser.email !== email && storedUser.password !== password) {
    //     document.getElementById('notfound').textContent = 'User not found!!!';
    // }

    // Check if user exists and passwords match
    if (storedUser && storedUser.email === email && storedUser.password === password) {
            document.getElementById('message').textContent = `Welcome, ${storedUser.fullname}!`;
            // Redirect to dashboard after signup
            setTimeout(() => {
            window.location.href = './installers-dashboard.html'; // Change this to your actual dashboard page
            }, 2000); // 2 seconds delay for feedback message before redirect
        } else {
        document.getElementById('message').textContent = 'Invalid email or password';
    };


    // Clear inputs
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
});
