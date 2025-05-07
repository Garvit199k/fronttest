function showLoginDetails(show) {
  let loginDetails = document.getElementById('login-details');
  if (!loginDetails) {
    loginDetails = document.createElement('p');
    loginDetails.id = 'login-details';
    loginDetails.textContent = 'Please enter your username and password to login to the typing test.';
    loginSection.insertBefore(loginDetails, loginForm);
  }
  loginDetails.style.display = show ? 'block' : 'none';
}

function showRegisterDetails(show) {
  let registerDetails = document.getElementById('register-details');
  if (!registerDetails) {
    registerDetails = document.createElement('p');
    registerDetails.id = 'register-details';
    registerDetails.textContent = 'Create a new account by choosing a username and password.';
    registerSection.insertBefore(registerDetails, registerForm);
  }
  registerDetails.style.display = show ? 'block' : 'none';
}
