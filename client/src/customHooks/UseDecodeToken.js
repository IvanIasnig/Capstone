import jwtDecode from "jwt-decode";

function UseDecodeToken(authToken) {
  if (!authToken) return null;
  try {
    const decoded = jwtDecode(authToken);
    return decoded.sub;
  } catch (err) {
    console.error("Errore durante la decodifica del token", err);
    return null;
  }
}

export default UseDecodeToken;
