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
import ProtectedRoute from "./component/ProtectedRoute";
import ErrorPage from "./screen/ErrorPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/userProfile" element={<ProtectedRoute />}>
            <Route index element={<UserProfile />} />
            <Route path="diet" element={<Diet />} />
            <Route path="workout" element={<Workout />} />
            <Route path="tables" element={<AllTables />} />
            <Route path="photos" element={<Photo />} />
            <Route path="logo" element={<Logo />} />
          </Route>
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
