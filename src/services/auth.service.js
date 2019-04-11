import http from "./axios";

export function getUser() {
  try {
    let user = JSON.parse(window.localStorage.user);
    if (!user.hasOwnProperty("access_token")) throw "null";
    return user;
  } catch (err) {
    return null;
  }
}

class AuthService {
  isAuthenticated = false;
  constructor() {
    getUser() && (this.isAuthenticated = true);
  }
  signout() {
    this.isAuthenticated = false;
    window.localStorage.user = null;
    this.user = null;
  }
  async isAuthed() {
    try {
      if (!getUser()) throw { status: 401 };
      let user = await http.get("/users");
      this.user = this.isAuthenticated = true;
      return user;
    } catch (err) {
      this.signout();
      throw err;
    }
  }
  async authenticate(creds) {
    let user = await http.post("/users/signin", creds);
    window.localStorage["user"] = JSON.stringify(user.data.data);
    return user;
  }
}

export default AuthService;
