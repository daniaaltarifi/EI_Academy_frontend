import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { API_URL } from "../App";
import { useParams } from "react-router-dom";

function Explanation() {
  const { topic_id } = useParams();
  const [testBank, setTestBank] = useState([]);
  const getQuestionsbyid = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_URL}/testbank/getquestionbyid/${topic_id}`
      );
      setTestBank(res.data); // Set the state with the fetched data
    } catch (error) {
      console.error(error);
    }
  }, [topic_id]);
  useEffect(() => {
    getQuestionsbyid();
  }, [topic_id]);
  return (
    <div>
      <div className="container courses_margin">
        <h3 style={{ color: "#833988" }}>صفحة الشرح :</h3>
        <hr className="mt-4" style={{ color: "#F57D20" }} />
        {testBank.map((ques, index) => (
          <div key={ques.id}>
            <h5 style={{ color: "#833988" ,paddingBottom:"7px"}}>
              السؤال {index + 1} : {ques.question_text}
            </h5>
            <p>
              <b> الاجابة : </b>
              {ques.correct_answer}
            </p>

            <p style={{ color: "#833988" }}>الشرح : {ques.explanation}</p>
            <hr className="mt-5" style={{ color: "#F57D20" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explanation;
