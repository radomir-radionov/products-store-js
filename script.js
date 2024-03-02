const signupFormEl = document.getElementById('signupForm');
const signInFormEl = document.getElementById('signInForm');
const textToggleFormEls = document.querySelectorAll('.text-toggle-form');

let isActiveForm = false;

const toggleForm = () => {
  if (isActiveForm) {
    signInFormEl.style.display = 'none';
    signupFormEl.style.display = 'block';
  } else {
    signInFormEl.style.display = 'block';
    signupFormEl.style.display = 'none';
  }

  isActiveForm = !isActiveForm;
};

const submitSignUpForm = (e) => {
  e.preventDefault();

  const formData = new FormData(signupFormEl);
  const newUser = Object.fromEntries(formData);

  console.log(newUser);

  const users = JSON.parse(localStorage.getItem('users') ?? '[]');

  localStorage.setItem('user', JSON.stringify(newUser));
  localStorage.setItem('users', JSON.stringify([...users, newUser]));

  window.location.href = 'home.html';

  alert('Registered successfully!');
};

const submitSignInForm = (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem('users') ?? '[]');

  const formData = new FormData(signInFormEl);
  const currUser = Object.fromEntries(formData);

  console.log(currUser);

  localStorage.setItem('user', JSON.stringify(currUser));

  const userMatchesCredentials = (user) => {
    return user.email === currUser.email && user.password === currUser.password;
  };

  const foundedUser = users.find(userMatchesCredentials);
  if (foundedUser) {
    localStorage.setItem('user', JSON.stringify(newUser));
    window.location.href = 'home.html';
    // Found a user that matches the credentials
    console.log('User found:', foundedUser);
  } else {
    // No user found with the provided credentials
    console.log('User not found');
    alert('User not found!');
  }
  // window.location.href = 'home.html';

  // alert('Form data submitted successfully!');
};

textToggleFormEls.forEach((item) => item.addEventListener('click', toggleForm));

signupFormEl.addEventListener('submit', submitSignUpForm);
signInFormEl.addEventListener('submit', submitSignInForm);
