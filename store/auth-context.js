import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  location: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
  addLocation: () => {},
  addStudentList: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [location, setLocation] = useState("");
  const [studentList, setStudentList] = useState([]);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  function addLocation(location) {
    setLocation(location);
    AsyncStorage.setItem("location", location);
  }

  function addStudentList(studntList) {
    setStudentList(studntList);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    location: location,
    authenticate: authenticate,
    logout: logout,
    addLocation: addLocation,
    addStudentList: addStudentList,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
