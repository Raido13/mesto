export default class UserInfo {
  constructor(userDataSelectors) {
    this._userName = document.querySelector(userDataSelectors.userNameSelector);
    this._userOccupation = document.querySelector(userDataSelectors.userOccupationSelector);
    this._userAvatar = document.querySelector(userDataSelectors.userAvatarSelector);
  }

  getUserInfo() {
    const userData = { userName: this._userName.textContent, userOccupation: this._userOccupation.textContent };
    return userData;
  }

  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.userName;
    this._userOccupation.textContent = userInfo.userOccupation;
  }

  setUserAvatar(userAvatarLink) {
    this._userAvatar.style.background = `center / cover no-repeat url('${userAvatarLink}')`;
  }
}