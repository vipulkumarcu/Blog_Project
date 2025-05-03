import React from "react";

function Button (
  {
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
  }
)
{
  return (
    <button
      type = { type }
      className = { `px-2 py-1 ${ bgColor } ${ textColor  } ${ className }` } { ...props }
    >
      { children }
    </button>
  );
}

export default Button;