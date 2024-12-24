import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Test = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isTestStarted, setIsTestStarted] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [inputAnswer, setInputAnswer] = useState("");
    const [isTestCompleted, setIsTestCompleted] = useState(false);
    const navigate = useNavigate();

    const words = JSON.parse(localStorage.getItem("words")) || [];
    
    const generateQuestions = (words) => {
        const shuffledWords = [...words].sort(() => 0.5 - Math.random());
        const questionSet = shuffledWords.map((word) => {
            const questionType = Math.floor(Math.random() * 3); // Randomize question type
            const options = [...words]
                .filter((w) => w.translation !== word.translation) // Exclude current word
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map((w) => w.translation);

            options.push(word.translation); // Add correct answer
            options.sort(() => 0.5 - Math.random()); // Shuffle options

            if (questionType === 0) {
                return {
                    question: `Which word in Korean matches this definition: "${word.definition}"?`,
                    type: "multiple-choice",
                    correctAnswer: word.translation,
                    options,
                };
            } else if (questionType === 1) {
                return {
                    question: `What is the word in Korean for this image?`,
                    type: "image",
                    image: word.image,
                    correctAnswer: word.translation,
                };
            } else {
                const exampleSentence = word.examples?.[0] || "No example available.";
                return {
                    question: `Fill in the blank: "${exampleSentence.replace(word.translation, "_____")}"`,
                    type: "fill-in",
                    correctAnswer: word.translation,
                };
            }
        });

        setQuestions(questionSet);
    };
    const hasGeneratedQuestions = useRef(false);

    if (!hasGeneratedQuestions.current && words.length > 0) {
        generateQuestions(words);
        hasGeneratedQuestions.current = true;
    }
    const calculateOverallProgress = () => {
        if (!questions.length) return 0;
        return ((currentQuestionIndex + 1) / questions.length) * 100;
    };

    const handleAnswer = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const userAnswer = currentQuestion.type === "multiple-choice" ? selectedOption : inputAnswer;

        if (userAnswer.trim() === currentQuestion.correctAnswer.trim()) {
            setScore(score + 5); // Increment score for correct answers
        }

        setSelectedOption(""); // Reset selected option
        setInputAnswer(""); // Reset input field

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsTestCompleted(true); // Mark test as completed
        }
    };

    if (!words.length) {
        return <div>No words found in localStorage. Please add some words to start the test.</div>;
    }

    if (!questions.length) {
        return <div>Loading...</div>;
    }

    if (!isTestStarted) {
        return (
            <div className="flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold mb-4">Ready to Start the Test?</h1>
                <button
                    onClick={() => setIsTestStarted(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Start Test
                </button>
            </div>
        );
    }

    if (isTestCompleted) {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-full h-2 bg-gray-200 overflow-hidden mb-10">
                    <div
                        className="h-2 bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-300"
                        style={{ width: `${calculateOverallProgress()}%` }}
                    />
                </div>
                <h1 className="text-2xl font-bold mb-4">Test Completed</h1>
                <p className="text-lg">
                    Your Score: {score} / {questions.length * 5}
                </p>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                    Go to Dashboard
                </button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="test-page flex flex-col items-center">
            <div className="w-full max-w-full h-2 bg-gray-200 overflow-hidden mb-4">
                <div
                    className="h-2 bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-300"
                    style={{ width: `${calculateOverallProgress()}%` }}
                />
            </div>
            <h1 className="text-xl font-semibold my-5">All Words Test</h1>
            <div className="question-section flex flex-col rounded-lg border bg-slate-200 p-5 w-fit h-fit items-center">
                <p className="font-bold m-3">{currentQuestion.question}</p>
                {currentQuestion.type === "image" && (
                    <div className="m-3">
                        <img
                            src={currentQuestion.image || "placeholder.jpg"}
                            alt="Test"
                            className="test-image"
                        />
                        <input
                            type="text"
                            placeholder="Type your answer..."
                            value={inputAnswer}
                            onChange={(e) => setInputAnswer(e.target.value)}
                            className="input-answer m-3"
                        />
                    </div>
                )}
                {currentQuestion.type === "multiple-choice" && (
                    <div className="options m-3">
                        <select
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            className="select-answer"
                        >
                            <option value="">Select an answer</option>
                            {currentQuestion.options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {currentQuestion.type === "fill-in" && (
                    <input
                        type="text"
                        placeholder="Type your answer..."
                        value={inputAnswer}
                        onChange={(e) => setInputAnswer(e.target.value)}
                        className="input-answer"
                    />
                )}
            </div>
            <button
                onClick={handleAnswer}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                disabled={
                    (currentQuestion.type === "multiple-choice" && !selectedOption) ||
                    (currentQuestion.type !== "multiple-choice" && !inputAnswer)
                }
            >
                Next
            </button>
            <p>
                Question {currentQuestionIndex + 1} of {questions.length}
            </p>
        </div>
    );
};

export default Test;
