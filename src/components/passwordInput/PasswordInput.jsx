import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

function PasswordInput({ inputClass, placeholder, onChange }) {
  const [isPasswordCliked, setIsPasswordClicked] = useState(false);

  const inputType = isPasswordCliked ? "text" : "password";

  const handleToggle = () => {
    setIsPasswordClicked(!isPasswordCliked);
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center bg-[#C4C4C4] w-full px-5 rounded-[8px]">
        <LockOutlinedIcon className="text-[#28282c]" />
        <input
          className={inputClass}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
        />
        {isPasswordCliked ? (
          <VisibilityOffOutlinedIcon
            className="text-[#28282c] cursor-pointer"
            onClick={handleToggle}
          />
        ) : (
          <RemoveRedEyeOutlinedIcon
            className="text-[#28282c] cursor-pointer"
            onClick={handleToggle}
          />
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
