const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};
loadFormData();
form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);

function onInput(evt) {
  const { name, value } = evt.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    formData = JSON.parse(savedData);
    form.email.value = formData.email || '';
    form.message.value = formData.message || '';
  } catch (error) {
    console.error('Помилка при зчитуванні з localStorage:', error);
  }
}

function onSubmit(evt) {
  evt.preventDefault();

  const { email, message } = formData;

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
}
