//* theme-switch -----------------------------

import { save, load } from "./storage.js";

const themeSwitchFormRef = document.querySelector('.theme-form');
const themeSwitchInputDarkRef = document.querySelector('#dark');
const themeSwitchInputLightRef = document.querySelector('#light');

const bodyRef = document.querySelector('body');
// const lightTheme = {
//   bkgColor: dark,
// };
const STORAGE_KEY = "theme-state-key";

const storedTheme = load(STORAGE_KEY);
if (storedTheme !== undefined) { setTheme(storedTheme) } else setTheme('Light');

function setTheme(theme) {
  if (theme === 'Light') {
    bodyRef.classList.remove('theme-dark');
    themeSwitchInputLightRef.checked = true;
    themeSwitchInputDarkRef.checked = false;
  };
  if (theme === 'Dark') {

    bodyRef.classList.add('theme-dark');
    themeSwitchInputLightRef.checked = false;
    themeSwitchInputDarkRef.checked = true;
  }
}

themeSwitchFormRef.addEventListener('input', onThemeSwitchFormInput);

function onThemeSwitchFormInput(e) {
  const currentTheme = e.currentTarget.color.value;
  console.log('currentTheme :>> ', currentTheme);
  save(STORAGE_KEY, currentTheme);
  setTheme(currentTheme);
}