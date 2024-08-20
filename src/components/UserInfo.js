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
}

export default UserInfo;
