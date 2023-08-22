//блок утилитарных функций

function fillInputField(inputElements, userData) {
  inputElements.usernameInput.value = userData.userName.textContent;
  inputElements.userOccupationInput.value = userData.userOccupation.textContent;
}

/*
//блок утилитарных функций

//импортируем необходимые функции и переменные
import {
  profileUsername,
  profileOccupation,
  avatarEditButton
} from '../pages/index.js';

//экспортируем необходимые функции и переменные
export { 
  fillInputField,
  renderLoading,
  updateUserData,
  updateUserAvatar
};

//добавляем в инпуты значения данных пользователя


//Функция по замене текста кнопки, пока идёт процесс сохранения данных на сервере
function renderLoading(isLoading, formElement) {
  const submitButton = formElement.querySelector('.popup__submit-button');
  if(isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
}

//функция обновить данные пользователя
function updateUserData(name, about) {
  profileUsername.textContent = name;
  profileOccupation.textContent = about;
}

//функция обновить аватар
function updateUserAvatar(avatar) {
  avatarEditButton.style.background = `center / cover no-repeat url('${avatar}')`; 
}

*/