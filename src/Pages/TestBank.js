// import axios from "axios";
// import React, { useState, useEffect, useCallback } from "react";
// import Form from "react-bootstrap/Form";
// import Draggable from "react-draggable";
// import { API_URL } from "../App";
// import { useParams } from "react-router-dom";

// function TestBank() {
//   const { topic_id } = useParams();
//   const [question, setQuestion] = useState("");
//   const [testBank, setTestBank] = useState([]);
//   const [blanks, setBlanks] = useState([]);
//   const getQuestionsbyid = useCallback(async () => {
//     try {
//       const res = await axios.get(
//         `${API_URL}/testbank/getquestionbyid/${topic_id}`
//       );
//       setTestBank(res.data); // Set the state with the fetched data
//     } catch (error) {
//       console.error(error);
//     }
//   }, [topic_id]);

//   useEffect(() => {
//     // if (!hasMounted) return;

//     const fetchData = async () => {
//       const apiData = {
//         question:
//           " السؤال الثالث : تعتبر ال ______________واحدة من اهم الادوات التي تساعد في عملية تسحين نتائج البحث وهذا باستخدام _______________ كما ان لديها العديد من الميزات والخصائص مثل : 1____________ 2___________",
//         blanks: [
//           {
//             sentence:
//               "<span class='drop-zone' data-accept='fitz'></span>, a native of St Paul, Minnesota, finished four novels.",
//             accept: " الادوات",
//           },
//           {
//             sentence:
//               "<span class='drop-zone' data-accept='carraway'></span> attended Yale with <span class='drop-zone' data-accept='buchanan'></span>.",
//             accept: ["الكلمات المفتاحية"],
//           },
//           {
//             sentence:
//               "George Wilson owns a garage in <span class='drop-zone' data-accept='ashes'></span> where Tom brings Nick for a party.",
//             accept: "الميزة الاولى",
//           },
//           {
//             sentence:
//               "Jay Gatsby, the Buchanans, and Nick all make <span class='drop-zone' data-accept='westegg'></span> their home.",
//             accept: "الميزة الثانية",
//           },
//         ],
//       };
//       setQuestion(apiData.question);
//       setBlanks(apiData.blanks.map((b) => ({ ...b, answer: null })));
//     };
//     fetchData();
//   }, []); //hasMounted // Only fetch data if the component has mounted

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     getQuestionsbyid();

//     const resizeObserver = new ResizeObserver(() => {
//       requestAnimationFrame(() => {
//         // Resize logic
//       });
//     });

//     resizeObserver.observe(document.body); // or the specific element

//     return () => resizeObserver.disconnect();
//   }, [topic_id]);
//   //   useEffect(() => {
//   //     setTimeout(() => {
//   //       const resizeObserver = new ResizeObserver(() => {
//   //         // Your resize logic
//   //       });

//   //       resizeObserver.observe(document.body); // or any specific element

//   //       return () => resizeObserver.disconnect();
//   //     }, 0); // Adjust timeout duration if needed
//   //   }, []);

//   const handleDrop = (answer, blankIndex) => {
//     setBlanks((prev) => {
//       const newBlanks = [...prev];
//       newBlanks[blankIndex].answer = answer;
//       return newBlanks;
//     });
//   };

//   return (
//     <>
//       <div style={{ overflow: "hidden" }}>
//         <div className="container courses_margin">
//           {testBank.map((question, index) => (
//             <div key={question.id} style={{ marginBottom: "30px" }}>
//               <h5 style={{ color: "#833988", marginBottom: "20px" }}>
//                 السؤال {index + 1} : {question.question_text}
//               </h5>
//               {/* Render Different Question Types */}
//               {question.question_type === "دوائر" && (
//                 <div>
//                   {question.Answers?.map((answer) => (
//                     <div className="d-flex mb-3" key={answer.id}>
//                       <Form.Check
//                         type="radio"
//                         aria-label={`radio ${answer.id}`}
//                         name={`question${question.id}`}
//                         value={answer.answer}
//                         className="ms-2"
//                       />
//                       <span>{answer.answer_text}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {question.question_type === "إجابات متعددة" && (
//                 <div>
//                   {question.Answers?.map((answer) => (
//                     <div className="d-flex mb-3" key={answer.id}>
//                       <Form.Check
//                         type="checkbox"
//                         aria-label={`checkbox ${answer.id}`}
//                         name={`question${question.id}`}
//                         value={answer.answer}
//                         className="ms-2"
//                       />
//                       <span>{answer.answer_text}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {question.question_type === "نص" && (
//                 <div>
//                   <p style={{ color: "#F57D20", fontWeight: "bold" }}>
//                     ادخل الاجابة :
//                   </p>
//                   <textarea rows={5} className="w-100"></textarea>
//                 </div>
//               )}

//               {question.question_type === "سحب وافلات" && (
//                 <div>
//                   <div
//                     className="answers"
//                   >
//                     {question.Answers?.map((answer, answerIndex) => (
//                       <Draggable
//                         key={answerIndex}
//                         onStop={(e, data) =>
//                           handleDrop(answer.answer, answerIndex)
//                         }
//                       >
//                         <button
//                           className="show_video_btn"
//                           data-target={answer.answer}
//                           style={{width: "150px",height: "30px"}}
//                         >
//                           {answer.answer_text}
//                         </button>
//                       </Draggable>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Display the correct answer if needed */}
//               <span>
//                 <b> الاجابة الصحيحة : </b> {question.correct_answer}
//               </span>
//               <hr className="mt-4" style={{ color: "#F57D20" }} />
//             </div>
//           ))}

     
//         </div>
//       </div>
//     </>
//   );
// }

// export default TestBank;
import { useState, useEffect } from "react";

function TestBank() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isIncorrect, setIsIncorrect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const apiData = [
        {
          type: "radio",
          question: "ما معنى ال SEO ؟",
          options: [
            "السيو هي معنا تحسين محركات البحث من أجل زيادة زوار الموقع",
            "السيو هو مصطلح غير متعلق بتحسين المواقع"
          ],
          correct: 0,
          explanation: "السيو يساعد في تحسين ظهور موقعك على محركات البحث.",
          video: "https://example.com/seo-video"
        }
      ];
      setQuestions(apiData);
    };
    fetchData();
  }, []);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestionIndex].correct) {
      setCorrectAnswer(selectedOption);
      setIsIncorrect(false);
    } else {
      setCorrectAnswer(questions[currentQuestionIndex].correct);
      setIsIncorrect(true);
    }
  };

  return (
    <div className="container courses_margin">
      {questions.length > 0 && (
        <div>
          <h5 style={{ color: "#833988", marginBottom: "20px" }}>
            {questions[currentQuestionIndex].question}
          </h5>

          {questions[currentQuestionIndex].type === "radio" && (
            questions[currentQuestionIndex].options.map((option, index) => (
              <div
                key={index}
                className={`d-flex mb-3 option ${
                  correctAnswer !== null
                    ? index === correctAnswer
                      ? "correct"
                      : index === selectedOption
                      ? "incorrect"
                      : ""
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="quizOption"
                  checked={selectedOption === index}
                  onChange={() => handleOptionSelect(index)}
                  disabled={correctAnswer !== null}
                  className="ms-2"
                />
                <span>{option}</span>
              </div>
            ))
          )}

          {isIncorrect && (
            <div className="d-flex">
            {/* Video Button */}
            <button
              className="show_video_btn"
              // onClick={() =>
              //   handleVideoClick(topic.id)
              // }
              href={questions[currentQuestionIndex].video}
            > فيديو{" "}
              <i
                className="fa-regular fa-circle-play"
                style={{ color: "#fff" }}
              ></i>
            </button>
            {/* Explanation Button */}
            {/* <Link
              to={`/explanation/${topic.id}`}
            > */}
              <button
                className="show_video_btn"
                style={{
                  backgroundColor: "#f8c36e",
                }}
                onClick={() => alert(questions[currentQuestionIndex].explanation)}
              >
                شرح{" "}
                <i
                  className="fa-regular fa-circle-play"
                  style={{ color: "#fff" }}
                ></i>
              </button>
            {/* </Link> */}
          </div>
          )}
          

          <div className="d-flex justify-content-between mt-4">
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
              className="btn show_video_btn"
              style={{
                backgroundColor: "#f8c36e",
              }}
            >
              السابق
            </button>
            <button onClick={handleNext} className="btn show_video_btn">
              التالي
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestBank;
