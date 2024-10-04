import { useState, useEffect, useRef, useMemo } from "react";
import congratsAnimation from "../../assets/congratsAnimation.json"
import Lottie from "lottie-react";
import useLocalStorage from "use-local-storage";
import Button from "../../components/Button/Button";
import { data } from "../../assets/Data";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../ContextAPI/UserContext";
import Timer from "../../components/Timer/Timer";

function Quiz() {

    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDark, setIsDark] = useLocalStorage("isDark", preference);
    const [index, setIndex] = useState(0);
    const [questions, setQuestion] = useState([]);
    const [points, setPoints] = useState(0);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [isLock, setIsLock] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const { userName } = useUser();

    const questionsToShow = 20;

    useEffect(() => {
        const shuffledQuestions = data.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, questionsToShow);
        setQuestion(selectedQuestions);
        setSelectedQuestions(selectedQuestions);
    }, []);

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const optionArr = [option1, option2, option3, option4];

    const updateProgress = () => {
        setProgress((prevProgress) => prevProgress + 5);
    };


    const checkAnswer = (e, answer) => {
        const currentQuestion = questions[index];

        if (index < questionsToShow - 1) {
            setTimeout(() => {
                setIndex((prevIndex) => prevIndex + 1);
                setIsLock(false);

                optionArr.forEach((optionRef) => {
                    if (optionRef && optionRef.current) {
                        optionRef.current.classList.remove('correct__option', 'incorrect__option');
                    }
                });

                if (currentQuestion.answer === answer) {
                    updateProgress();
                }

            }, 1500);
        } else {
            setTimeout(() => {
                setModalShow(true);
            }, 1500);
        }

        if (!isLock) {
            const selectedOption = e.currentTarget;
            const selectedOptionClassList = selectedOption.classList;

            if (currentQuestion.answer === answer) {
                selectedOptionClassList.add('correct__option');
                setTimeout(() => {
                    setPoints(points + 5);
                }, 1500);
            } else {
                selectedOptionClassList.add('incorrect__option');
                const correctOption = optionArr[currentQuestion.answer - 1];
                if (correctOption && correctOption.current) {
                    correctOption.current.classList.add('correct__option');
                }
            }
            setIsLock(true);
        }
    };


    const showMoadal = () => {
        setModalShow(true);
    }

    const redirectMenu = () => {
        setModalShow(false);
        setIsLoading(true);
        setTimeout(() => {
            navigate('/meun')
        }, 1500);
    }

    const backToQuiz = () => {
        setModalShow(false);
        setIsLoading(true);

        const shuffledQuestions = data.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, questionsToShow);
        setQuestion(selectedQuestions);
        setSelectedQuestions(selectedQuestions);

        optionArr.forEach(optionRef => {
            if (optionRef && optionRef.current) {
                optionRef.current.classList.remove('correct__option', 'incorrect__option');
            }
        });

        setProgress(0)


        setTimeout(() => {
            setIsLock(false);
            setIsLoading(false);
            setIndex(0);
            setPoints(0);
        }, 1500);
    };

    const listOptions = useMemo(() => {
        return questions.length > 0 && [
            {
                id: "1",
                option: option1,
                alpha: "A",
                opt: questions[index].options.option1,
            },
            {
                id: "2",
                option: option2,
                alpha: "B",
                opt: questions[index].options.option2,
            },
            {
                id: "3",
                option: option3,
                alpha: "C",
                opt: questions[index].options.option3,
            },
            {
                id: "4",
                option: option4,
                alpha: "D",
                opt: questions[index].options.option4,
            },
        ];
    }, [questions, index]);

    return (
        <>
            <div data-theme={isDark ? "dark" : "light"} className="min-h-[100vh]">
                <header className="w-[full] py-[20px]">
                    <div className="w-[90%] md:w-[80%] mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-[#048970] text-[30px] font-[600]">feQuiz</h1>
                        </div>
                        <Timer />
                        <div className="circular-progress-bar-container">
                            <svg className="circular-progress-bar" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="#eee" strokeWidth="8" fill="none" />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="#048970"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray="251"
                                    strokeDashoffset={251 - (251 * progress) / 100}
                                />
                            </svg>
                        </div>

                    </div>
                </header>
                <div className="w-[95%] mx-auto md:w-[80%]">
                    <div className="flex justify-between text-[18px] font-[600]">
                        <div className="">
                            <span>{index + 1}</span>
                            <span> of {questionsToShow}</span>
                        </div>
                        <div className="flex gap-1">
                            <span>{points}</span>
                            <span>Points</span>
                        </div>
                    </div>
                    <div className="flex justify-center mt-[40px]">
                        {questions.length > 0 && (
                            <span className="md:text-[30px] text-[20px] font-[700] text-[#048970] text-center">{questions[index].question}</span>
                        )}
                    </div>
                    <div className="mt-[40px]">
                        <ul >
                            {questions.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {listOptions.map(listOption => {
                                        return (
                                            <li key={listOption.id} ref={listOption.option} onClick={(e) => (checkAnswer(e, listOption.id))} className={`flex gap-5 items-center bg-[#28282c] p-3 rounded-[8px] shadow-sm hover:translate-y-[-5px] transition ease-in-out duration-[0.5s] cursor-pointer`}>
                                                <div className={`bg-[white] w-[50px] h-[50px] rounded-[8px] flex justify-center items-center`}>
                                                    <span className="text-black font-[800] text-[18px]  px-[20px]">{listOption.alpha}</span>
                                                </div>
                                                <span className={`text-[20px] font-[500] text-[#048970]`}>{listOption.opt}
                                                </span>
                                            </li>
                                        )
                                    })}
                                </div>
                            )}
                        </ul>
                    </div>
                    <div className="flex justify-between py-[40px]">
                        <Button
                            type="button"
                            styles="text-[#fff] text-[15px] font-[500] md:px-[60px] px-[30px] rounded-[5px] py-[10px] bg-[#048970] shadow-2xl"
                            label="Back To Meun"
                            onClick={redirectMenu}
                        />
                        <Button
                            type="button"
                            styles="text-[#fff] text-[15px] font-[500] md:px-[60px] px-[30px] rounded-[5px] py-[10px] bg-[#048970] shadow-2xl"
                            label="Skip To Score"
                            onClick={showMoadal}
                        />
                    </div>
                </div>
            </div>
            {isLoading && (
                <div className="load">
                    <span className="loading loading-dots loading-lg bg-[#048970]"></span>
                </div>
            )}
            {modalShow && (
                <div className="load">
                    <div className={`px-[20px] bg-[#28282c] rounded-[30px] w-[95%] md:w-[80%]`}>
                        <div className="flex justify-center">
                            <Lottie animationData={congratsAnimation} className="congratsAnimation lg:w-[30%] lg:h-[20%] md:w-[60%]" />
                        </div>
                        <p className="text-center text-[goldenrod] font-[600] text-[25px] lg:mt-[-70px] pb-[20px]">{userName}</p>
                        <p className="text-center text-white font-[700] text-[30px] mb-[20px]">Your Total Score is {points} points.</p>
                        <div className="flex justify-center pb-[40px]">
                            <Button
                                type="button"
                                styles="text-[#28282c] text-[15px] font-[500] md:px-[60px] px-[30px] rounded-[5px] py-[10px] bg-[goldenrod] shadow-2xl"
                                label="Play again"
                                onClick={backToQuiz}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Quiz