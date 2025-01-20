import React, { useState } from "react";
import Lottie from "lottie-react";
import congratsAnimation from "../../assets/congratsAnimation.json";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { usePoints } from "../../ContextAPI/PointsContext";

const Points = ({ onPlayAgain, points }) => {
    const navigate = useNavigate();
    const { userName } = usePoints();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePlayAgain = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        console.log("Resetting quiz...");

        await onPlayAgain();

        console.log("Quiz reset successfully. Navigating to /quiz...");
        navigate("/quiz");
        setIsProcessing(false);
    };

    return (
        <div className="load">
            <div className="px-[20px] bg-[#28282c] rounded-[30px] w-[95%] md:w-[80%]">
                {/* Lottie Animation */}
                <div className="flex justify-center">
                    <Lottie
                        animationData={congratsAnimation}
                        className="congratsAnimation lg:w-[30%] lg:h-[20%] md:w-[60%]"
                    />
                </div>
                {/* User's Name */}
                <p className="text-center text-[goldenrod] font-[600] text-[25px] lg:mt-[-70px] pb-[20px]">
                    {userName || "Player"}
                </p>
                {/* Points Display */}
                <p className="text-center text-white font-[700] text-[30px] mb-[20px]">
                    Your Total Score is {points} points.
                </p>
                {/* Play Again Button */}
                <div className="flex justify-center pb-[40px]">
                    <Button
                        type="button"
                        styles="text-[#28282c] text-[15px] font-[500] md:px-[60px] px-[30px] rounded-[5px] py-[10px] bg-[goldenrod] shadow-2xl"
                        label={isProcessing ? "Resetting..." : "Play Again"}
                        onClick={handlePlayAgain}
                        disabled={isProcessing}
                    />
                </div>
            </div>
        </div>
    );
};

export default Points;
