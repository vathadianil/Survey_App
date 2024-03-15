import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AppContext = createContext({
  token: "",
  location: "",
  isAuthenticated: false,
  formList: {
    fatherOccupationList: [],
    motherOccupationList: [],
    casteList: [],
    subCasteList: [],
    hallTicketNoList: [],
    mediumList: [],
    religionList: [],
  },
  studentData: {},
  authenticate: () => {},
  logout: () => {},
  addLocation: () => {},
  addStudentData: () => {},
  addFormList: () => {},
});

function AppContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [location, setLocation] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [formList, setFormList] = useState({
    fatherOccupationList: [],
    motherOccupationList: [],
    casteList: [],
    subCasteList: [],
    hallTicketNoList: [],
    mediumList: [],
    religionList: [],
  });

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    // setLocation("");
    // AsyncStorage.removeItem("location");
  }

  function addLocation(location) {
    setLocation(location);
    AsyncStorage.setItem("location", location);
  }

  function addStudentData(studentData) {
    setStudentData(studentData);
  }

  function addFormList(formList) {
    setFormList(formList);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    location: location,
    formList: formList,
    studentData: studentData,
    authenticate: authenticate,
    logout: logout,
    addLocation: addLocation,
    addStudentData: addStudentData,
    addFormList: addFormList,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
