import { save, load } from "./storage.js";//фунцкії для роботи з Localstorage
import throttle from 'lodash.throttle';


const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');

inputRef.setAttribute('required', '');
textareaRef.setAttribute('required', '');


const STORAGE_KEY = "feedback-form-state";
let formData = load(STORAGE_KEY) || {};

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

fillFormDataAtStart();

function fillFormDataAtStart() {
  if (formData !== undefined) {
    inputRef.value = formData.email || "";
    textareaRef.value = formData.message || "";
  }
}

function onFormInput({ target }) {
  formData[target.name] = target.value.trim();
  save(STORAGE_KEY, formData);
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  formRef.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}
