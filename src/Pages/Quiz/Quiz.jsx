import { useState, useEffect, useRef, useMemo } from "react";
import useLocalStorage from "use-local-storage";
import Button from "../../components/Button/Button";
import { data } from "../../assets/Data";
import { useNavigate } from "react-router-dom";
import Points from "../../components/Points/Points";
import { usePoints } from "../../ContextAPI/PointsContext";

function Quiz() {
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDark, setIsDark] = useLocalStorage("isDark", preference);
    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [isLock, setIsLock] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [progress, setProgress] = useState(0);

    const { points, addPoints, setPoints, resetPoints, userName } = usePoints();
    const navigate = useNavigate();
    const questionsToShow = 20;

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);
    const optionArr = [option1, option2, option3, option4];

    useEffect(() => {
        initializeQuiz();
    }, []);

    const initializeQuiz = () => {
        const shuffledQuestions = data.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, questionsToShow);
        setQuestions(selectedQuestions);
        setIndex(0);
        setProgress(0);
        setPoints(0);
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
            // Show the points modal after answering the last question
            setTimeout(() => {
                setModalShow(true); // Show points modal
            }, 1500);
        }

        if (!isLock) {
            const selectedOption = e.currentTarget;
            const selectedOptionClassList = selectedOption.classList;

            if (currentQuestion.answer === answer) {
                selectedOptionClassList.add('correct__option');
                setTimeout(() => {
                    addPoints(5); // Add points for correct answer
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

    const updateProgress = () => {
        setProgress((prevProgress) => prevProgress + 5);
    };

    const handlePlayAgain = () => {
        resetPoints();
        initializeQuiz();
        setModalShow(false);
    };

    const handleSkipToScore = () => {
        setModalShow(true);
    };

    const listOptions = useMemo(() => {
        return questions.length > 0 && [
            {
                id: "1",
                option: option1,
                alpha: "A",
                opt: questions[index]?.options.option1,
            },
            {
                id: "2",
                option: option2,
                alpha: "B",
                opt: questions[index]?.options.option2,
            },
            {
                id: "3",
                option: option3,
                alpha: "C",
                opt: questions[index]?.options.option3,
            },
            {
                id: "4",
                option: option4,
                alpha: "D",
                opt: questions[index]?.options.option4,
            },
        ];
    }, [questions, index]);

    return (
        <>
            <div data-theme={isDark ? "dark" : "light"} className="min-h-[100vh]">
                <header className="w-[full] py-[20px]">
                    <div className="w-[90%] md:w-[80%] mx-auto flex items-center justify-between">
                        <h1 className="text-[#048970] text-[30px] font-[600]">DevSpack</h1>
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
                        <div>
                            <span>{index + 1}</span> {/* Display current question number */}
                            <span> of {questionsToShow}</span>
                        </div>
                        <div className="flex gap-1">
                            <span>{points}</span> {/* Display points from context */}
                            <span>Points</span>
                        </div>
                    </div>
                    <div className="flex justify-center mt-[40px]">
                        {questions.length > 0 && (
                            <span className="md:text-[30px] text-[20px] font-[700] text-[#048970] text-center">{questions[index]?.question}</span>
                        )}
                    </div>
                    <div className="mt-[40px]">
                        <ul>
                            {questions.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {listOptions.map((listOption) => (
                                        <li key={listOption.id} ref={listOption.option} onClick={(e) => checkAnswer(e, listOption.id)} className={`flex gap-5 items-center bg-[#28282c] p-3 rounded-[8px] shadow-sm hover:translate-y-[-5px] transition ease-in-out duration-[0.5s] cursor-pointer`}>
                                            <div className="bg-[white] w-[50px] h-[50px] rounded-[8px] flex justify-center items-center">
                                                <span className="text-black font-[800] text-[18px] px-[20px]">{listOption.alpha}</span>
                                            </div>
                                            <span className="text-[20px] font-[500] text-[#048970]">{listOption.opt}</span>
                                        </li>
                                    ))}
                                </div>
                            )}
                        </ul>
                    </div>
                    <div className="flex justify-between py-[40px]">
                        <Button
                            type="button"
                            styles="text-[#fff] text-[15px] font-[500] md:px-[60px] px-[30px] rounded-[5px] py-[10px] bg-[#048970] shadow-2xl"
                            label="Back To Menu"
                            onClick={() => navigate('/menu')}
                        />
                        <Button
                            type="button"
                            styles="text-[#fff] text-[15px] font-[500] md:px-[60px] px-[30px] rounded-[5px] py-[10px] bg-[#048970] shadow-2xl"
                            label="Skip To Score"
                            onClick={handleSkipToScore}
                        />
                    </div>
                </div>
                {modalShow && (
                    <Points
                        points={points}
                        userName={userName}
                        onPlayAgain={handlePlayAgain}
                    />
                )}
            </div>
        </>
    );
}

export default Quiz;
