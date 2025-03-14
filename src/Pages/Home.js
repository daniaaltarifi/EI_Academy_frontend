import React, { useEffect, useState } from "react";
import "../Css/home.css";
import StudentsOpinions from "../components/StudentsOpinions";
import PurpleBox from "../components/PurpleBox";
import axios from "axios";
import { API_URL } from "../App";
import { Link } from "react-router-dom";

function Home() {
  const [faq, setFaq] = useState([]);
  const [about, setAbout] = useState([]);
  const [basmatrainig, setBasmaTraining] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/Fqs/getFaqs`);
        const data = response.data;
        setFaq(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    const fetchAbout = async () => {
      try {
        const response = await axios.get(`${API_URL}/abouts/getabout`);
        const data = response.data;
        setAbout(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    const fetchBasma = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/basmatrainning/basma-trainings/1`
        );
        const data = response.data;
        setBasmaTraining(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    fetchData();
    fetchAbout();
    fetchBasma();
  }, []);

  useEffect(() => {
    const preloadImage = document.createElement("link");
    preloadImage.rel = "preload";
    preloadImage.as = "image";
    preloadImage.href =
      "https://res.cloudinary.com/dqimsdiht/Basma_Academy/kmg1us6gsvfd1kt2w2be?w=800&f_auto&q_auto:eco";
    preloadImage.crossOrigin = "anonymous";
    document.head.appendChild(preloadImage);
  }, [about]);

  return (
    <>
      <div
        className="container text-center about-section"
        style={{ overflowX: "hidden" }}
      >
        {about.map((abou) => (
          <div className="row" key={abou.id}>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <h2 className="about_title">
                {abou.title}
                </h2>
              <p className="p_about">{abou.descr}</p>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-12 ">
              <img
                srcSet={`
                  https://res.cloudinary.com/dqimsdiht/${abou.img}?w=400&f_auto&q_auto:eco 400w,
                `}
                sizes="(max-width: 768px) 100vw, 50vw"
                src="https://res.cloudinary.com/dqimsdiht/Basma_Academy/kmg1us6gsvfd1kt2w2be?w=800&f_auto&q_auto:eco"
                alt="slider img"
                className="about_img img-fluid"
                decoding="async"
                loading="eager"
              />
            </div>
          </div>
        ))}
      </div>
      {/* End About section */}
      {/* Home Box */}

      {basmatrainig &&
      Array.isArray(basmatrainig) &&
      basmatrainig.length > 0 ? (
        basmatrainig.map((item) => (
          <PurpleBox
            key={item.id}
            title={item.title}
            description={item.descr}
            link="/courses"
          />
        ))
      ) : (
        <p>No questions available</p> 
      )}

      {/* FAQ section */}
      <section className="margin_section" style={{ overflowX: "hidden" }}>
        <div className="container text-center">
          <h1 className="faq">الأسئلة المتكررة</h1>
          <div className="row">
            <div className="col">
              {faq.map((quesans) => (
                <details>
                  <summary>{quesans.ques}</summary>
                  <div>{quesans.ans} </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
      <h1 className="faq">أراء وتجارب طلابنا </h1>

      <StudentsOpinions />
    </>
  );
}

export default Home;
