// import axios from "axios";
// const API_KEY = "AIzaSyAjYpELwhv98kjn2HSuOMWW9csUgldjy_4";

import { GET_TOKEN } from "./apiRequests";
import axios from "./axios";

// async function authenticate(mode, email, password) {
//   const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
//   const { data } = await axios.post(url, {
//     email,
//     password,
//     returnSecureToken: true,
//   });
//   const token = data.idToken;
//   return token;
// }

// export async function createUser(email, password) {
//   return await authenticate("signUp", email, password);
// }

// export async function login(email, password) {
//   return await authenticate("signInWithPassword", email, password);
// }

async function authenticate(mode, username, password) {
  const { data } = await axios.post(GET_TOKEN, {
    username,
    password,
  });
console.log({data})
  const loginData = {
    token: data?.access_token,
    agentId: data?.agent_id,
    userId: data?.user_id,
    firstName: data?.fname,
    lastName: data?.lname,
    isActive: data?.is_active,
  };
  return loginData;
}

// export async function createUser(email, password) {
//   return await authenticate("signUp", email, password);
// }

export async function login(email, password) {
  return await authenticate("signInWithPassword", email, password);
}
