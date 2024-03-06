import React from 'react'
import useLocalStorage from 'use-local-storage';
import Button from '../../components/Button/Button';
import { NavLink } from 'react-router-dom';

function Error() {

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <div className='min-h-[100vh] w-full'>
        <div className='flex justify-center items-center'>
          <h1 className={`text-[${isDark}] font-[900] md:text-[8rem] text-[2rem] mt-[10rem]`}>404-Error</h1>
        </div>
        <h3 className='text-[#048970] font-[600] text-[1rem] text-center'>Opps! Page Not Found</h3>
        <p className={`text-center text-[${isDark}] py-6`}>Click the button below 👇 to go back to meun</p>
        <NavLink to="/meun" className='flex justify-center'>
          <Button
            label="meun"
            type="submit"
            styles="bg-[#28282c] text-[#048970] text-[15px] font-[500] rounded-[5px] py-[10px] shadow-2xl w-[80%] md:w-[50%] hover:md:w-[70%] transition-all ease-in-out duration-[0.5s]"
          />
        </NavLink>
      </div>
    </div>
  )
}

export default Error