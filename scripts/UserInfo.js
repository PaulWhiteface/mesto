export default class UserInfo {
  constructor({nickname, job}) {
    this._name = document.querySelector(nickname);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    const userInfo = {
      nickname: this._name.textContent,
      job: this._job.textContent
    }
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.nickname;
    this._job.textContent = data.job
  }
}