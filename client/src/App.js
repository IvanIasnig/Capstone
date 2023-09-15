import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import Registration from "./screen/Registration";
import Login from "./screen/Login";
import { AuthProvider } from "./provider/AuthProvider";
import UserProfile from "./screen/UserProfile";
import Diet from "./screen/Diet";
import Workout from "./screen/Workout";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/userProfile" element={<UserProfile />}></Route>
          <Route path="/userProfile/diet" element={<Diet />} />
          <Route path="/userProfile/workout" element={<Workout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
