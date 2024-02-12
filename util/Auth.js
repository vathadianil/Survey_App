import axios from "axios";
const API_KEY = "AIzaSyAjYpELwhv98kjn2HSuOMWW9csUgldjy_4";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const { data } = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  const token = data.idToken;
  return token;
}

export async function createUser(email, password) {
  return await authenticate("signUp", email, password);
}

export async function login(email, password) {
  return await authenticate("signInWithPassword", email, password);
}
