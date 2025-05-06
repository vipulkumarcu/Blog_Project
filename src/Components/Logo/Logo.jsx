import React from "react";
import logo from "../../Assets/logo.jpg";

function Logo ( { width = "100px" } )
{
  return (
    <div style = { { width } }>
      <img src = { logo } alt = "Logo" />
    </div>
  );
}

export default Logo;