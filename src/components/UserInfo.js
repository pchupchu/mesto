export default class UserInfo {
  constructor({ userName, userDesc, userAvatar }) {
    this._userName = userName;
    this._userDesc = userDesc;
    this._userAvatar = userAvatar;
  };

  getUserInfo() {
    const userInfo = {
      userName: this._userName.textContent,
      userDesc: this._userDesc.textContent,
      userAvatar: this._userAvatar.src,
    };

    return userInfo;
  };

  getUserId(user) {
    return this._userId = user._id;
  }

  setUserInfo(nameInput, jobinput) {
    this._userName.textContent = nameInput;
    this._userDesc.textContent = jobinput;
  };

  setUserAvatar(avatarInput) {
    this._userAvatar.src = avatarInput;
  };
}
