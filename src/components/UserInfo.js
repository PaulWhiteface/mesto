export default class UserInfo {
  constructor({nickname, job, avatar}) {
    this._name = document.querySelector(nickname);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      nickname: this._name.textContent,
      job: this._job.textContent
    }
    return userInfo;
  }

  setUserInfo(nickname, job) {
    this._name.textContent = nickname;
    this._job.textContent = job;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}