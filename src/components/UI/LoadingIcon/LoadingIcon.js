import { useContext } from "react";
import ThemeContext from "../../../context/themeContext";

function LoadingIcon() {
  const { color } = useContext(ThemeContext); 
  
  return (
    <div className="w-100 text-center my-5">
      <div className={`spinner-border text-${color}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingIcon;