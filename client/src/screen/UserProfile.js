import { useAuth } from "../provider/AuthProvider";

import { Link } from "react-router-dom";

function UserProfile() {
  const { name } = useAuth();

  return (
    <div>
      <h1>Benvenuto, {name}!</h1>

      <button className="btn btn-primary mt-3 text-decoration-none">
        <Link to="/userProfile/diet">Diet</Link>
        <Link to="/userProfile/workout">Workout</Link>
      </button>
    </div>
  );
}

export default UserProfile;
