import React, { useState, useEffect } from "react";

function Logo() {
  const [active, setActive] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 500);
    setTimeout(() => {
      setFade(true);
    }, 3500); // Inizia la dissolvenza dopo 2.5 secondi
  }, []);

  return (
    <div
      className={`animation-container ${active ? "active" : ""} ${
        fade ? "fade" : ""
      }`}
    >
      <div id="W" className="letter">
        W
      </div>
      <div id="U" className="letter mt-3">
        U
      </div>
      <div className="dot"></div>
    </div>
  );
}

export default Logo;
