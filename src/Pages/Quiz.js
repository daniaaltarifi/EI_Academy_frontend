// import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Draggable from "react-draggable";

// function Quiz() {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       const apiData = [
//         {
//           type: "radio",
//           question: "ما معنى ال SEO ؟",
//           options: [
//             "السيو هي معنا تحسين محركات البحث من أجل زيادة زوار الموقع",
//             "السيو هو مصطلح غير متعلق بتحسين المواقع",
//           ],
//         },
//         {
//           type: "text",
//           question: "ما معنى ال SEO ؟",
//         },
//         {
//           type: "dragdrop",
//           question:
//             "تعتبر ال ______________واحدة من اهم الادوات التي تساعد في تحسين نتائج البحث باستخدام _______________ كما أن لديها العديد من الميزات مثل: 1____________ 2___________",
//           blanks: [
//             { accept: "الادوات" },
//             { accept: "الكلمات المفتاحية" },
//             { accept: "الميزة الاولى" },
//             { accept: "الميزة الثانية" },
//           ],
//         },
//       ];
//       setQuestions(apiData);
//     };
//     fetchData();
//   }, []);

//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   return (
//     <div className="container courses_margin">
//       {questions.length > 0 && (
//         <div>
//           <h5 style={{ color: "#833988", marginBottom: "20px" }}>
//             {questions[currentQuestionIndex].question}
//           </h5>

//           {questions[currentQuestionIndex].type === "radio" &&
//             questions[currentQuestionIndex].options.map((option, index) => (
//               <div className="d-flex mb-3" key={index}>
//                 <Form.Check type="radio" name="quizOption" className="ms-2" />
//                 <span>{option}</span>
//               </div>
//             ))}

//           {questions[currentQuestionIndex].type === "text" && (
//             <textarea rows={5} className="w-100"></textarea>
//           )}

//           {questions[currentQuestionIndex].type === "dragdrop" && (
//             <div
//               className="answers"
//               style={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 justifyContent: "center",
//               }}
//             >
//               {questions[currentQuestionIndex].blanks.map((blank, index) => (
//                 <Draggable key={index}>
//                   <button
//                     style={{
//                       backgroundColor: "#833988",
//                       border: "none",
//                       borderRadius: "20px",
//                       padding: "5px",
//                       color: "#fff",
//                       marginLeft: "5px",
//                     }}
//                   >
//                     {blank.accept}
//                   </button>
//                 </Draggable>
//               ))}
//             </div>
//           )}

//           <div className="d-flex justify-content-between mt-4">
//             <button
//               onClick={handlePrev}
//               disabled={currentQuestionIndex === 0}
//               className="btn btn-secondary"
//             >
//               السابق
//             </button>
//             {currentQuestionIndex === questions.length - 1 ? (
//               <button onClick={handleNext} className="btn btn-primary">
//                 انهاء
//               </button>
//             ) : (
//               <button onClick={handleNext} className="btn btn-primary">
//                 التالي
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Quiz;
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
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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

      // const apiData = [
      //   {
      //     type: "radio",
      //     question: "ما معنى ال SEO ؟",
      //     options: [
      //       "السيو هي معنا تحسين محركات البحث من أجل زيادة زوار الموقع",
      //       "السيو هو مصطلح غير متعلق بتحسين المواقع",
      //     ],
      //   },
      //   {
      //     type: "text",
      //     question: "ما معنى ال SEO ؟",
      //   },
      //   {
      //     type: "dragdrop",
      //     question:
      //       "تعتبر ال ______________واحدة من اهم الادوات التي تساعد في تحسين نتائج البحث باستخدام _______________ كما أن لديها العديد من الميزات مثل: 1____________ 2___________",
      //     blanks: [
      //       { accept: "الادوات" },
      //       { accept: "الكلمات المفتاحية" },
      //       { accept: "الميزة الاولى" },
      //       { accept: "الميزة الثانية" },
      //     ],
      //   },
      // ];
      // setQuestions(apiData);
    };
    fetchData();
  }, [testbankcourseid, numofques]);
  const handleAnswerSelect = (answer_id) => {
    setSelectedAnswer(answer_id);
  };
  const handleNext = async () => {
    // if (!selectedAnswer) {
    //   alert("Please select an answer before proceeding.");
    //   return;
    // }
    try {
      const res = await axios.post(`${API_URL}/exams/createExam`, {
        user_id: user_id,
        question_id: questions[currentQuestionIndex].id,
        answer_id: selectedAnswer,
      });
      console.log("Sent:", {
        question_id: questions[currentQuestionIndex].id,
        answer_id: selectedAnswer,
      });
    } catch (error) {
      console.error(error);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    const mockScoreData = {
      user_id: 17,
      totalQuestions: 6,
      correctAnswers: 3,
      incorrectAnswers: 3,
      successRate: 50,
      failRate: 50,
      feedback: "Good effort! Focus more on weak areas.",
      incorrectQuestions: [
        {
          question_id: 11,
          user_answer: "العصر الحجري الحديث",
          correct_answer: "وقوعه بين آسيا وإفريقيا وأوروبا",
        },
        {
          question_id: 13,
          user_answer: "مناخ الصحراء الحار",
          correct_answer: "النبطية",
        },
        {
          question_id: 13,
          user_answer: "مناخ الصحراء الحار",
          correct_answer: "النبطية",
        },
      ],
    };
    setScoreData(mockScoreData);
    setQuizFinished(true);
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
                    onChange={() => handleAnswerSelect(option.id)}
                    checked={selectedAnswer === option.id}
                  />
                  <span>{option.answer_text}</span>
                </div>
              ))}

            {questions[currentQuestionIndex].type === "نص" && (
              <textarea rows={5} className="w-100" ></textarea>
            )}

            {questions[currentQuestionIndex].type === "سحب وافلات" && (
              <div
                className="answers"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {questions[currentQuestionIndex].Answers.map((blank, index) => (
                  <Draggable key={index}>
                    <button
                      style={{
                        backgroundColor: "#018abe",
                        border: "none",
                        borderRadius: "20px",
                        padding: "5px",
                        color: "#fff",
                        marginLeft: "5px",
                      }}
                    >
                      {blank.accept}
                    </button>
                  </Draggable>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-between mt-4">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="btn show_video_btn"
                style={{
                  backgroundColor: "#f8c36e",
                }}
              >
                السابق
              </button>
              <button onClick={handleNext} className="btn show_video_btn">
                {currentQuestionIndex === questions.length - 1
                  ? "إنهاء الاختبار"
                  : "التالي"}
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="score-container text-center p-4">
          <h2>🎉 نتيجتك النهائية! 🎉</h2>
          <div className="score_result">
            <h1 className="text_score">{scoreData.successRate}%</h1>
          </div>
          <div className="d-flex">
            <div className="correct_wrong_answer">
              <img
                src={require("../assets/checked.png")}
                alt="checked"
                title="checked"
              />
              <hr />
              <p>
                {" "}
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

          {/* <h3>
            ✅ إجابات صحيحة: {scoreData.correctAnswers} /{" "}
            {scoreData.totalQuestions}
          </h3>
          <h3>❌ إجابات خاطئة: {scoreData.incorrectAnswers}</h3> */}
          {/* <h4>📊 نسبة النجاح: {scoreData.successRate}%</h4> */}
          <h5>💡 {scoreData.feedback}</h5>
          <h4 style={{ marginTop: "20px", color: "red" }}>
            ❌ الأسئلة الخاطئة:
          </h4>
          <ul>
            {scoreData.incorrectQuestions.map((q, index) => (
              <li key={index}>
                ❌ <strong>إجابتك:</strong> {q.user_answer} | ✅{" "}
                <strong>الصحيح:</strong> {q.correct_answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Quiz;
