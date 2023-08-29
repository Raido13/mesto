//класс с данными пользователя
export default class UserInfo {
  constructor(userDataSelectors) {
    this._userName = document.querySelector(userDataSelectors.userNameSelector);
    this._userOccupation = document.querySelector(userDataSelectors.userOccupationSelector);
    this._userAvatar = document.querySelector(userDataSelectors.userAvatarSelector);
  }

  //метод получения данных пользователя из DOM
  getUserInfo() {
    const userData = { name: this._userName.textContent, about: this._userOccupation.textContent };
    return userData;
  }

  //метод обновления данных пользователя, полученнных извне
  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userOccupation.textContent = about;
    this._userAvatar.style.background = `center / cover no-repeat url('${avatar}')`;
  }
}