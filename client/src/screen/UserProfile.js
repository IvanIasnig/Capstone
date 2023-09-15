import { useAuth } from "../provider/AuthProvider";

import { Link } from "react-router-dom";

function UserProfile() {
  const { name } = useAuth();

  return (
    <div>
      <h1>Benvenuto, {name}!</h1>
      <Link to="/userProfile/diet" className="btn btn-primary mt-3 ms-2">
        Diet
      </Link>

      <Link to="/userProfile/workout" className="btn btn-primary mt-3 ms-2">
        Workout
      </Link>
    </div>
  );
}

export default UserProfile;
