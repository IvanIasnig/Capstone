import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import Registration from "./screen/Registration";
import Login from "./screen/Login";
import { AuthProvider } from "./provider/AuthProvider";
import UserProfile from "./screen/UserProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/userProfile" element={<UserProfile />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
