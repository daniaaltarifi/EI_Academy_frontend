import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Draggable from "react-draggable";
import { API_URL } from "../App";
import { useParams } from "react-router-dom";

function Quiz() {
  const { testbankcourseid, numofques } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const user_id = localStorage.getItem("id");
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [dragDropAnswers, setDragDropAnswers] = useState([]);
  const [text, setText] = useState("");

  const handleDragStart = (event, answerText) => {
    event.dataTransfer.setData("text", answerText);
  };

  const handleDrop = (event, dropZoneId) => {
    event.preventDefault();
    const answerText = event.dataTransfer.getData("text");

    // Check if this drop zone already has an answer
    setDragDropAnswers((prev) => {
      const existingZone = prev.find((zone) => zone.id === dropZoneId);

      if (existingZone) {
        // If the zone already has an answer, update it
        return prev.map((zone) =>
          zone.id === dropZoneId ? { ...zone, answer: answerText } : zone
        );
      } else {
        // Otherwise, add a new entry for the drop zone
        return [...prev, { id: dropZoneId, answer: answerText }];
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/testbank/getTestBankByIdByNumberOfQuestions/${testbankcourseid}/${numofques}/${user_id}`
        );
        setQuestions(res.data);
        console.log("first quiz finished", res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [testbankcourseid, numofques]);
  const handleAnswerSelect = (answer_id, answer_text) => {
    setSelectedAnswer((prev) => [
      ...prev,
      { id: answer_id, answer_text: answer_text },
    ]);
  };

  const handleNext = async () => {
    // if (!selectedAnswer) {
    //   alert("Please select an answer before proceeding.");
    //   return;
    // }
    let answersToPost = [];
    // Check for the answer based on the question type
    if (questions[currentQuestionIndex].question_type === "سحب وافلات") {
      // Ensure dragDropAnswers are in the right format
      answersToPost = dragDropAnswers.map((zone) => ({
        id: zone.id,
        answer_text: zone.answer,
      }));
    } else if (questions[currentQuestionIndex].question_type === "نص") {
      // For text questions, send the final value of text (not intermediate)
      answersToPost = [
        { id: currentQuestionIndex + 1, answer_text: text }, // Only store the final answer
      ];
    } else {
      answersToPost = selectedAnswer;
    }

    console.log("dragDropAnswers:", dragDropAnswers);

    try {
      const res = await axios.post(`${API_URL}/exams/createExam`, {
        user_id: user_id,
        question_id: questions[currentQuestionIndex].id,
        answers: answersToPost,
      });
      // console.log("Sent:", {
      //   question_id: questions[currentQuestionIndex].id,
      //   answers: answersToPost,
      // });
    } catch (error) {
      console.error(error);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer([]);
      setDragDropAnswers([]);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/exams/getUserHistorySummary/${user_id}`
      );
      setScoreData(res.data);
      console.log("score", res.data);
      setQuizFinished(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container courses_margin">
      {!quizFinished ? (
        questions.length > 0 && (
          <div>
            <h5 style={{ color: "#018abe", marginBottom: "20px" }}>
              {questions[currentQuestionIndex].question_text}
            </h5>

            {questions[currentQuestionIndex].question_type === "دوائر" &&
              questions[currentQuestionIndex].Answers.map((option, index) => (
                <div className="d-flex mb-3" key={index}>
                  <Form.Check
                    type="radio"
                    name="quizOption"
                    className="ms-2"
                    onChange={() =>
                      handleAnswerSelect(option.id, option.answer_text)
                    }
                    checked={selectedAnswer.some(
                      (answer) => answer.id === option.id
                    )}
                  />
                  <span>{option.answer_text}</span>
                </div>
              ))}
            {questions[currentQuestionIndex].question_type ===
              "إجابات متعددة" &&
              questions[currentQuestionIndex].Answers.map((option, index) => (
                <div className="d-flex mb-3" key={index}>
                  <Form.Check
                    className="ms-2"
                    onChange={() =>
                      handleAnswerSelect(option.id, option.answer_text)
                    }
                    checked={selectedAnswer.some(
                      (answer) => answer.id === option.id
                    )}
                  />
                  <span>{option.answer_text}</span>
                </div>
              ))}
            {questions[currentQuestionIndex].question_type === "نص" && (
              <textarea
                rows={5}
                className="w-100"
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            )}

            {questions[currentQuestionIndex].question_type === "سحب وافلات" && (
              <div>
                <h6>اسحب وافلت الإجابات في الأماكن الصحيحة</h6>

                {/* Drop Zones - Render based on dragDropAnswers state */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {questions[currentQuestionIndex].Answers.map((_, index) => (
                    <div
                      key={index}
                      className="drop-zone"
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => handleDrop(event, `zone_${index}`)}
                      style={{
                        width: "200px",
                        height: "50px",
                        border: "2px dashed #018abe",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: dragDropAnswers.find(
                          (zone) => zone.id === `zone_${index}`
                        )
                          ? "#d4edda"
                          : "#f8d7da",
                      }}
                    >
                      {
                        // Check if the answer has been dropped into this zone
                        dragDropAnswers.find(
                          (zone) => zone.id === `zone_${index}`
                        )
                          ? dragDropAnswers.find(
                              (zone) => zone.id === `zone_${index}`
                            ).answer
                          : "اسحب الإجابة هنا"
                      }
                    </div>
                  ))}
                </div>

                {/* Draggable Answers */}
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "20px" }}
                >
                  {questions[currentQuestionIndex].Answers.map(
                    (option, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(event) =>
                          handleDragStart(event, option.answer_text)
                        }
                        style={{
                          backgroundColor: "#018abe",
                          padding: "10px",
                          borderRadius: "10px",
                          color: "#fff",
                          cursor: "grab",
                          userSelect: "none",
                        }}
                      >
                        {option.answer_text}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="d-flex justify-content-end mt-4">
              {/* <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="btn show_video_btn"
                style={{
                  backgroundColor: "#f8c36e",
                }}
              >
                السابق
              </button> */}
              <button onClick={handleNext} className="btn show_video_btn">
                {currentQuestionIndex === questions.length - 1
                  ? "إنهاء الاختبار"
                  : "التالي"}
              </button>
            </div>
          </div>
        )
      ) : (
        <>
          <div className="score-container text-center p-4">
            <h2>🎉 نتيجتك النهائية! 🎉</h2>
            <div className="score_result">
              <h1 className="text_score">{scoreData.successRate}%</h1>
            </div>
            <div className="d-flex flex-wrap">
              <div className="correct_wrong_answer">
                <img
                  src={require("../assets/checked.png")}
                  alt="checked"
                  title="checked"
                />
                <hr />
                <p>
                  إجابات صحيحة: {scoreData.correctAnswers} /{" "}
                  {scoreData.totalQuestions}
                </p>
              </div>
              <div className="correct_wrong_answer">
                <img
                  src={require("../assets/no.png")}
                  alt="checked"
                  title="checked"
                />
                <hr />
                <p> إجابات خاطئة: {scoreData.incorrectAnswers}</p>
              </div>
            </div>
            <h5> {scoreData.feedback.level}</h5>
            <h5>
              {" "}
              {scoreData.feedback.icon}
              {scoreData.feedback.message}
            </h5>
            <h5> {scoreData.feedback.recommendation}</h5>
          </div>
          <h4 style={{ marginTop: "20px", color: "red" }}>
            ❌ الأسئلة الخاطئة:
          </h4>
          {scoreData.incorrectQuestions.map((q, index) => (
            <div>
              <h5 style={{ color: "#018abe", marginBottom: "20px" }}>
                {q.question_text}
              </h5>
              <div className={`d-flex mb-3 option incorrect `}>
                <span>{q.user_answer}</span>
              </div>
              <div className="d-flex mb-3 option correct">
                <span>{q.correct_answer}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Quiz;
