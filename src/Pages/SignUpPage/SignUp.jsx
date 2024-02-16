import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import { Toggle } from "../../components/Toggle/Toggle";
import Input from "../../components/Input/Input";
import { InputCountries } from "../../components/InputCountries/InputCountry";
import Button from "../../components/Button/Button";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

function SignUp() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const navigate = useNavigate();

  return (
    <>
      <div
        className="flex justify-center items-center w-full h-[100vh]"
        data-theme={isDark ? "dark" : "light"}
      >
        <div className="md:w-[80%] mx-auto h-[80vh]">
          <div className="flex justify-between relative items-center">
            <h1 className="text-[#048970] text-[30px] font-[600]">feQuiz</h1>
            <div className="">
              <Toggle
                isChecked={isDark}
                handleChange={() => setIsDark(!isDark)}
              />
            </div>
          </div>
          <h1 className={`text-[${isDark}] font-[600] text-[24px] pt-4`}>
            Sign Up
          </h1>
          <h1 className="text-center font-[700] text-[25px] text-[#048970]">
            Let's Get Started!
          </h1>
          <p className={`text-[${isDark}] text-center text-[14px] font-[500]`}>
            Enter your details below to create your account and get started with
            the Quiz
          </p>
          <form className="mt-[50px]">
            <div className="flex md:flex-row flex-col gap-6 justify-between items-center">
              <Input
                inputClass={`bg-[#C4C4C4] w-full rounded-[8px] h-[50px] px-5`}
                type="text"
                placeholder="Enter first name"
              />
              <Input
                inputClass={`bg-[#C4C4C4] w-full rounded-[8px] h-[50px] font-[500] px-5`}
                type="text"
                placeholder="Enter last name"
              />
            </div>
            <div className="flex md:flex-row flex-col gap-6 justify-between items-center mt-[40px]">
              <div className="flex gap-2 items-center bg-[#C4C4C4] w-full ps-5 rounded-[8px]">
                <EmailOutlinedIcon className="text-[#28282c]" />
                <Input
                  inputClass={`bg-[#C4C4C4] w-full rounded-[8px] h-[50px]`}
                  type="text"
                  placeholder="Enter email address"
                />
              </div>
              <div className="w-full">
                <InputCountries />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-6 justify-between items-center mt-[40px]">
              <div className="flex gap-2 items-center bg-[#C4C4C4] w-full px-5 rounded-[8px]">
                <LockOutlinedIcon className="text-[#28282c]" />
                <Input
                  inputClass={`bg-[#C4C4C4] w-full rounded-[8px] h-[50px]`}
                  type="password"
                  placeholder="Enter password"
                />
                <RemoveRedEyeOutlinedIcon className="text-[#28282c] cursor-pointer"/>
              </div>
              <div className="flex gap-2 items-center bg-[#C4C4C4] w-full px-5 rounded-[8px]">
                <LockOutlinedIcon className="text-[#28282c]" />
                <Input
                  inputClass={`bg-[#C4C4C4] w-full rounded-[8px] h-[50px]`}
                  type="password"
                  placeholder="Comfirm password"
                />
                <RemoveRedEyeOutlinedIcon className="text-[#28282c] cursor-pointer"/>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <Button
                label="Submit"
                type="submit"
                styles="bg-[#28282c] text-[#048970] text-[15px] font-[500] px-[60px] rounded-[5px] py-[10px] shadow-2xl w-[30%] hover:w-[50%] transition-all ease-in-out duration-[0.5s]"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
