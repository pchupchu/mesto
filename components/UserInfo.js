export default class UserInfo {
  constructor({ userName, userDesc }) {
    this._userName = userName;
    this._userDesc = userDesc;
  };

  getUserInfo() {
    const userInfo = {
      userName: this._userName.textContent,
      userDesc: this._userDesc.textContent,
    };

    return userInfo;
  };

  setUserInfo(nameInput, jobinput) {
    this._userName.textContent = nameInput;
    this._userDesc.textContent = jobinput;
  };
}
