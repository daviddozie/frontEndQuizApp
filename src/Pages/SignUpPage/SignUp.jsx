import useLocalStorage from "use-local-storage";
import { useNavigate, NavLink } from "react-router-dom";
import { Toggle } from "../../components/Toggle/Toggle";
import Input from "../../components/Input/Input";
import { InputCountries } from "../../components/InputCountries/InputCountry";
import Button from "../../components/Button/Button";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { useState } from "react";
import { database } from "../../Firebase Auth/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../../ContextAPI/UserContext";

function SignUp() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    comfirmPassword: "",
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
    } else if (formData.password !== formData.comfirmPassword) {
      newFormErrors.genericError = "Password don't match";
      isValid = false;
    } else {
      newFormErrors.genericError = "";
    }

    setFormErrors(newFormErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser(formData.firstName);
    console.log("User set:", formData.firstName);

    if (validateForm()) {
      resetErrors();

      createUserWithEmailAndPassword(database, formData.email, formData.password)
        .then(authData => {
          console.log(authData, "authData");
          setIsLoading(true);

          setTimeout(() => {
            navigate("/meun");
          }, 1500);
        })
        .catch(() => {
          setFirebaseError(true);
          setIsLoading(false);
        });
    }
  };


  const resetErrors = () => {
    setFirebaseError(false)
    setFormErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      comfirmPassword: "",
    });
  };

  return (
    <>
      <div
        className="flex justify-center items-center w-full min-h-[100vh]"
        data-theme={isDark ? "dark" : "light"}
      >
        <div className="md:w-[80%] w-[90%] mx-auto md:min-h-[80vh] min-h-[100vh]">
          <div className="flex justify-between relative items-center">
            <h1 className="text-[#048970] text-[30px] font-[600]">feQuiz</h1>
            <div className="absolute right-0 top-[-20px]">
              <Toggle
                isChecked={isDark}
                handleChange={() => setIsDark(!isDark)}
              />
            </div>
          </div>
          <h1 className="text-center font-[700] text-[25px] text-[#048970] pt-8">
            Let's Get Started!
          </h1>
          <p className={`text-[${isDark}] text-center text-[14px] font-[500]`}>
            Enter your details below to create your account and get started with
            the Quiz 👉
          </p>
          <form className="mt-[50px]" onSubmit={handleSubmit}>
            <div className="flex md:flex-row flex-col gap-9 justify-between items-center">
              <Input
                inputClass={`bg-[#C4C4C4] w-full rounded-[8px] h-[50px] px-5`}
                type="text"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <Input
                inputClass={`bg-[#C4C4C4] w-full rounded-[8px] h-[50px] font-[500] px-5`}
                type="text"
                placeholder="Enter last name"
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
            <div className="flex md:flex-row flex-col gap-9 justify-between items-center mt-[40px]">
              <div className="flex gap-2 items-center bg-[#C4C4C4] w-full ps-5 rounded-[8px]">
                <EmailOutlinedIcon className="text-[#28282c]" />
                <Input
                  inputClass={`bg-[#C4C4C4] w-full rounded-[8px] h-[50px]`}
                  type="email"
                  placeholder="Enter email address"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <InputCountries />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-9 justify-between items-center mt-[40px]">
              <PasswordInput
                inputClass="bg-[#C4C4C4] w-full rounded-[8px] h-[50px]"
                placeholder="Enter password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <PasswordInput
                inputClass="bg-[#C4C4C4] w-full rounded-[8px] h-[50px]"
                placeholder="Comfirm password"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    comfirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-center mt-5">
              <Button
                label="Sign Up"
                type="submit"
                styles="bg-[#28282c] text-[#048970] text-[15px] font-[500] rounded-[5px] py-[10px] shadow-2xl w-[100%] md:w-[30%] hover:md:w-[50%] transition-all ease-in-out duration-[0.5s]"
              />
            </div>
          </form>
          <div className="flex gap-1 text-[14px] font-[500] justify-center pt-3 pb-5 md:pb-0">
            <p className={`${isDark}`}>Already have an account</p>
            <NavLink to="/">
              <span className="text-[#048970]">Log In</span>
            </NavLink>
          </div>
        </div>
        {Object.values(formErrors).some((error) => error) && (
          <div className="errorModal">
            <div className="md:w-[60%] lg:w-[30%] w-[90%] h-[60px] rounded-[4px] bg-[red] flex items-center justify-between md:px-3 px-1 absolute md:left-[80px] md:top-[86%] left-4 top-4 errorModal-content">
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
                Credentials in use
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

export default SignUp;
