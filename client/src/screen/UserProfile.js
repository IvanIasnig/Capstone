import { useAuth } from "../provider/AuthProvider";

function UserProfile() {
  const { name } = useAuth();

  const storedRof = JSON.parse(localStorage.getItem("restOfData"));

  function Kcal(data) {
    let bmr = 0;
    let x = 0;
    let y = 0;
    let z = 0;
    if (data.sex === "M") {
      x = 66.5;
      y = 13.75 * data.weight;
      z = 5.003 * data.height - 6.75 * data.age;
    } else {
      x = 655.1;
      y = 9.563 * data.weight;
      z = 1.85 * data.height - 4.676 * data.age;
    }
    bmr = x + y + z;
    let res = Math.round(bmr);
    return res.toString();
  }

  return (
    <div>
      <h1>Benvenuto, {name}!</h1>
      <div>le tue kcal giornaliere sono: {Kcal(storedRof)}</div>
    </div>
  );
}

export default UserProfile;
