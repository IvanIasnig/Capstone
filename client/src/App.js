import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./screen/Registration";
import Login from "./screen/Login";
import { AuthProvider } from "./provider/AuthProvider";
import UserProfile from "./screen/UserProfile";
import Diet from "./screen/Diet";
import Workout from "./screen/Workout";
import AllTables from "./screen/AllTables";
import Photo from "./screen/Photo";
import Logo from "./component/Logo";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />} />
          <Route path="/userProfile" element={<UserProfile />}></Route>
          <Route path="/userProfile/diet" element={<Diet />} />
          <Route path="/userProfile/workout" element={<Workout />} />
          <Route path="/userProfile/tables" element={<AllTables />} />
          <Route path="/userProfile/photos" element={<Photo />} />
          <Route path="/userProfile/logo" element={<Logo />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
