class UserInfo {
  constructor({ nameSelector, jobSelector, api }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._api = api;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    console.log("Updating Name:", name, "Updating Job:", job);
    console.log("Name Element:", this._nameElement);
    console.log("Job Element:", this._jobElement);

    if (name && this._nameElement) {
      this._nameElement.textContent = name;
    }
    if (job && this._jobElement) {
      this._jobElement.textContent = job;
    }
  }

  updateUserInfo({ name, job }) {
    this._api
      .updateUserInfo({ name, job })
      .then((res) => {
        this.setUserInfo({ name: res.name, job: res.about });
      })
      .catch((err) => console.error(`Error updating user info: ${err}`));
  }
}

export default UserInfo;
