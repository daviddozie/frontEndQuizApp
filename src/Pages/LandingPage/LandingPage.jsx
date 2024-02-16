import Lottie from "lottie-react"
import animationData from "../../assets/quizAnimation.json"
import Button from "../../components/Button/Button"
import { Toggle } from "../../components/Toggle/Toggle"
import useLocalStorage from "use-local-storage"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function LandingPage() {
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDark, setIsDark] = useLocalStorage("isDark", preference);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleNav = () => {
        setIsLoading(true)
        setTimeout(() => {
            navigate('/quiz')
        }, 3000);
    }

    return (
        <div>
            <div className="min-h-[100vh] w-full" data-theme={isDark ? "dark" : "light"}>
                <header className="w-[full] py-[20px]">
                    <div className="w-[90%] md:w-[80%] mx-auto flex items-center justify-between py-5 rounded-[40px] relative">
                        <div>
                            <h1 className="text-[#048970] text-[30px] font-[600]">feQuiz</h1>
                        </div>
                        <div>
                            <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
                        </div>
                    </div>
                </header>
                <div className='w-[80%] mx-auto'>
                    <div className="flex justify-between lg:flex-row flex-col-reverse">
                        <div className="lg:mt-[60px] lg:ms-[0px]">
                            <h1 className="text-[#048970] font-[600] lg:text-[60px] text-[30px] text-center md:text-[40px] lg:text-start">Welcome to the</h1>
                            <h1 className={`text-[${isDark}] font-[600] lg:text-[60px] text-[30px] text-center leading-6 pb-3 md:text-[40px] lg:text-start`}>Frontend Quiz</h1>
                            <div>
                                <p className={`text-[${isDark}] lg:pt-[40px] text-[14px] my-7 lg:text-start text-center md:text-[18px] font-[400] lg:max-w-[80%]`}>Unlock the secrets of frontend skill in our quick quiz! Test your HTML, CSS, JavaScript and React prowess, and level up your skills with each question.</p>
                            </div>
                            <div className="mt-[20px] text-center lg:text-start">
                                <Button
                                    type="button"
                                    styles="bg-[#28282c] text-[#048970] text-[15px] font-[500] px-[60px] rounded-[5px] py-[10px] shadow-2xl home__btn"
                                    label="Start Quiz"
                                    onClick={handleNav}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-end md:mt-[-40px] lg:mt-[0px]">
                            <Lottie animationData={animationData} className="lg:w-[90%] w-full" />
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && (
                <div className="load">
                    <span className="loading loading-dots loading-lg bg-[#048970]"></span>
                </div>
            )}
        </div>
    )
}
export default LandingPage