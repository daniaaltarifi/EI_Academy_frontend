import React, { useEffect, useState } from "react";
import SliderComp from "../components/SliderComp";
import "../Css/whoweare.css";
import StudentsOpinions from "../components/StudentsOpinions.js";
import PurpleBox from "../components/PurpleBox.js";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../App.js";
function WhoWeAre() {
  const [basmatrainig, setBasmaTraining] = useState([]);
  const [whoweare, setWhoweare] = useState([]);
  const [slider, setSlider] = useState([]);
  const [aboutteacher, setAboutTeacher] = useState([]);

  const fetchData = async (url, setter) => {
    try {
      const { data } = await axios.get(url);
      setter(data);
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
    }
  };

  const fetchAllData = async () => {
    const basmaUrl = `${API_URL}/basmatrainning/basma-trainings/2`;
    const whoWeAreUrl = `${API_URL}/WhoWeAre/getWhoweares`;
    const aboutTeacherUrl = `${API_URL}/aboutTeacher/getaboutteacher`;

    await Promise.all([
      fetchData(basmaUrl, setBasmaTraining),
      fetchData(whoWeAreUrl, setWhoweare),
      fetchData(aboutTeacherUrl, setAboutTeacher),
    ]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllData();
  }, []);

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <>
      <SliderComp />
      {/* <SliderComp title={title} description={description} /> */}

      {/* slider box */}
      <div className="container  slider_box">
        <div className="row">
          {whoweare.map((who, index) => (
            <div className="col-lg-4 col-md-12 col-sm-12 p-1" key={who.id}>
              <div className="d-flex">
                <p className="description_of_steps_who">
                  {who.title}


                   </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* End slider box */}
      {/* Our Teachear */}
      <div className="container text-center about-section" id="order-section">
        {aboutteacher.map((tech) => (
          <div className="row ">
            <div className="col-lg-5 col-md-6 col-sm-12">
              <h2 className="about_title">
                {tech.title}
                </h2>
              <p className="p_about">{tech.descr}</p>
            </div>{" "}
            <div className="col-lg-7 col-md-6 col-sm-12 ">
              <img
                src={`https://res.cloudinary.com/dqimsdiht/${tech.img}`}
                alt="about"
                className="about_img img-fluid "
                loading="lazy"
              />
            </div>
            <p className="paragraph_who pt-4">{tech.para}</p>
          </div>
        ))}
      </div>
      {/* End Our Teachear */}
      <StudentsOpinions />
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
        <p>No Courses available</p> // Show a message when no items are available
      )}
    </>
  );
}

export default WhoWeAre;
