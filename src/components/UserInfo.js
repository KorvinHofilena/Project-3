class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    if (this._nameElement) this._nameElement.textContent = name;
    if (this._jobElement) this._jobElement.textContent = about;
  }
}

export default UserInfo;
