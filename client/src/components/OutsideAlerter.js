import React, { useRef, useEffect } from "react";

function useOutsideAlert(ref) {
  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      if (!e.target.matches(".btn-drop")) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
          const openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

export default function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlert(wrapperRef);
  return <div ref={wrapperRef}>{props.children}</div>;
}
