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

  setUserInfo(res) {
    this._userName.textContent = res.name;
    this._userDesc.textContent = res.about;
    this._userAvatar.src = res.avatar;
  };
}
