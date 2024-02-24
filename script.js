const form = document.getElementById('signupForm');

const submitForm = (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);

  console.log(formProps);

  localStorage.setItem('user', JSON.stringify(formProps));

  window.location.href = 'home.html';

  alert('Form data submitted successfully!');
};

form.addEventListener('submit', submitForm);
