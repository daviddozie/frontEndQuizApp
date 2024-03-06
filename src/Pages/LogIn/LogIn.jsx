import useLocalStorage from "use-local-storage";
import { useNavigate, NavLink } from "react-router-dom";
import { Toggle } from "../../components/Toggle/Toggle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import Input from "../../components/Input/Input";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Button from "../../components/Button/Button";
import { database } from "../../Firebase Auth/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

function LogIn() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newFormErrors = { ...formErrors };

    for (const key in formData) {
      if (formData[key] === "") {
        newFormErrors[key] = `Please enter your ${key}`;
        isValid = false;
      } else {
        newFormErrors[key] = "";
      }
    }

    if (!isValid) {
      newFormErrors.genericError = "Please make sure all fields are not empty.";
      const firebaseMessage = "Invalid credentials"
    } else {
      newFormErrors.genericError = "";
    }

    setFormErrors(newFormErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      resetErrors();

      signInWithEmailAndPassword(database, formData.email, formData.password)
      .then(authData => {
        console.log(authData, "authData");
        setIsLoading(true);
        setTimeout(() => {
          navigate("/meun");
        }, 1500);
      })
      .catch(err => {
        setFirebaseError(true);
        setIsLoading(false);
      });
    } 
  
  };

  const resetErrors = () => {
    setFirebaseError(false);
    setFormErrors({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div
        className="flex justify-center items-center w-full min-h-[100vh]"
        data-theme={isDark ? "dark" : "light"}
      >
        <div className="md:w-[80%] w-[90%] mx-auto md:min-h-[80vh] min-h-[100vh] pt-[50px] md:pt-[100px] lg:pt-[0px]">
          <div className="flex justify-between relative items-center">
            <h1 className="text-[#048970] text-[30px] font-[600]">feQuiz</h1>
            <div className="absolute right-0 top-[-20px]">
              <Toggle
                isChecked={isDark}
                handleChange={() => setIsDark(!isDark)}
              />
            </div>
          </div>
          <h1 className="text-center font-[700] text-[35px] text-[#048970] pt-[80px] lg:pt-8">
            Welcome Back!
          </h1>
          <p className={`text-[${isDark}] text-center text-[14px] font-[500]`}>
            Login your details below and get started with the Quiz 👉
          </p>
          <div className="md:w-[60%] w-[90%] mx-auto">
            <form className="mt-[50px]" onSubmit={handleSubmit}>
              <div className="flex gap-2 items-center bg-[#C4C4C4] w-full ps-5 rounded-[8px] mb-8">
                <PersonOutlineOutlinedIcon className="text-[#28282c]" />
                <Input
                  inputClass={`bg-[#C4C4C4] w-full rounded-[8px] h-[50px]`}
                  type="email"
                  placeholder="Enter email address"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <PasswordInput
                inputClass="bg-[#C4C4C4] w-full rounded-[8px] h-[50px]"
                placeholder="Enter password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div className="flex justify-end pt-3">
                <NavLink to="#">
                  <span className="text-[14px] font-[500] text-[#048970]">forgot password?</span>
                </NavLink>
              </div>
              <div className="flex justify-center mt-8">
                <Button
                  label="Log In"
                  type="submit"
                  styles="bg-[#28282c] text-[#048970] text-[15px] font-[500] rounded-[5px] py-[10px] shadow-2xl w-[100%] md:w-[50%] hover:md:w-[70%] transition-all ease-in-out duration-[0.5s]"
                />
              </div>
            </form>
            <div className="flex gap-1 text-[14px] font-[500] justify-center pt-3 pb-5 md:pb-0">
              <p className={`${isDark}`}>Don't have an account</p>
              <NavLink to="/signup">
                <span className="text-[#048970]">Sign Up</span>
              </NavLink>
            </div>
          </div>
        </div>
        {Object.values(formErrors).some((error) => error) && (
          <div className="errorModal">
            <div className="md:w-[60%] lg:w-[30%] w-[90%] h-[60px] rounded-[4px] bg-[red] flex items-center justify-between px-2 absolute md:left-[80px] md:top-[86%] left-4 top-4 errorModal-content">
              <div className="flex items-center gap-1 md:gap-4">
                <div>
                  <div className="border-[2px] border-[white] w-[20px] h-[20px] rounded-[50%] text-white flex justify-center items-center text-[12px] md:text-[16px] font-[600]">
                    !
                  </div>
                </div>
                <div className="text-white text-[10px] md:text-[16px]">
                  {formErrors.genericError && (
                    <p className="text-white text-[12px] md:text-[14px] font-[500] ">
                      {formErrors.genericError}
                    </p>
                  )}
                </div>
              </div>
              <HighlightOffOutlinedIcon
                className="text-white cursor-pointer"
                onClick={resetErrors}
              />
            </div>
          </div>
        )}
      </div>
      {isLoading && (
        <div className="load">
          <span className="loading loading-dots loading-lg bg-[#048970]"></span>
        </div>
      )}
      {firebaseError && (
        <div className="errorModel">
          <div className="md:w-[60%] lg:w-[30%] w-[90%] h-[60px] rounded-[4px] bg-[red] flex items-center justify-between md:px-3 px-1 absolute md:left-[80px] md:top-[86%] left-4 top-4 errorModal-content">
            <div className="flex items-center gap-1 md:gap-4">
              <div>
                <div className="border-[2px] border-[white] w-[20px] h-[20px] rounded-[50%] text-white flex justify-center items-center text-[12px] md:text-[16px] font-[600]">
                  !
                </div>
              </div>
              <p className="text-white text-[10px] md:text-[16px]">
                Invalid Credentials
              </p>
            </div>
            <HighlightOffOutlinedIcon
              className="text-white cursor-pointer"
              onClick={resetErrors}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default LogIn;
