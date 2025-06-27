// Function to handle signup
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    
    // Get user inputs
    const fullname = document.getElementById('signup-fullname').value;
    const phonenumber = document.getElementById('signup-phonenumber').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const location = document.getElementById('signup-location').value;

    // Save user to localStorage
    const user = { fullname, phonenumber, email, password, location };
    localStorage.setItem('user', JSON.stringify(user));

    // Clear inputs
    document.getElementById('signup-fullname').value = '';
    document.getElementById('signup-phonenumber').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('signup-location').value ='';

    // Feedback to user
    document.getElementById('message').textContent = 'You have successfully signed up as an Installer!';

    // Redirect to dashboard after signup
    setTimeout(() => {
    window.location.href = './installers-dashboard.html'; // Change this to your actual dashboard page
    }, 2000); // 2 seconds delay for feedback message before redirect
});
