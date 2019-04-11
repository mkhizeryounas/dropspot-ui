import { base_url } from "./config.service";
import { getUser } from "./auth.service";

import axios from "axios";

let headers = {};
let user = getUser();

if (user) {
  headers["Authorization"] = `Bearer ${user.access_token}`;
}

const instance = axios.create({
  baseURL: base_url,
  timeout: 10000,
  headers
});

export default instance;
