import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AppContext = createContext({
  loginData: {},
  location: "",
  formSubmittedTimeStamp: null,
  isAuthenticated: false,
  formList: {
    fatherOccupationList: [],
    motherOccupationList: [],
    casteList: [],
    subCasteList: [],
    hallTicketNoList: [],
    mediumList: [],
    religionList: [],
    previousEducationList: [],
    admissionCategoryList: [],
  },
  studentData: {},
  authenticate: () => {},
  logout: () => {},
  addLocation: () => {},
  addStudentData: () => {},
  addFormList: () => {},
  onFormSubmit: () => {},
});

function AppContextProvider({ children }) {
  const [loginData, setLoginData] = useState({});
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
    previousEducationList: [],
    admissionCategoryList: [],
  });
  const [formSubmittedTimeStamp, setFormSubmittedTimeStamp] = useState(null);

  function authenticate(loginData) {
    setLoginData(loginData);
    AsyncStorage.setItem("loginData", JSON.stringify(loginData));
  }

  function logout() {
    setLoginData({});
    AsyncStorage.removeItem("loginData");
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

  function onFormSubmit(timeStamp) {
    setFormSubmittedTimeStamp(timeStamp);
  }

  const value = {
    loginData: loginData,
    isAuthenticated: !!loginData.token,
    location: location,
    formList: formList,
    studentData: studentData,
    formSubmittedTimeStamp: formSubmittedTimeStamp,
    authenticate: authenticate,
    logout: logout,
    addLocation: addLocation,
    addStudentData: addStudentData,
    addFormList: addFormList,
    onFormSubmit: onFormSubmit,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
