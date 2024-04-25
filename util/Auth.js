import { GET_TOKEN } from "./apiRequests";
import axios from "./axios";

async function authenticate(mode, username, password) {
  const { data } = await axios.post(GET_TOKEN, {
    username,
    password,
  });
  const loginData = {
    token: data?.access_token,
    agentId: data?.agent_id,
    userId: data?.user_id,
    firstName: data?.fname,
    lastName: data?.lname,
    isActive: data?.is_active,
    collegeId: data?.cID,
    collegeName: data?.cName,
  };
  return loginData;
}

// export async function createUser(email, password) {
//   return await authenticate("signUp", email, password);
// }

export async function login(email, password) {
  return await authenticate("signInWithPassword", email, password);
}
