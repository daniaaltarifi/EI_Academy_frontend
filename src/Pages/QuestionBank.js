import { useState, useEffect } from "react";
import React from "react";
import SliderComp from "../components/SliderComp";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/courses.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App.js";
import courseimg from "../assets/course.webp";
import "../Css/QuestionBank.css";
function QuestionBank() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [courses, setCourses] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teacherData, setTeacherData] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const { hash } = useLocation();
  //   const { user, logout } = useContext(UserContext);
  //   const { isLoggedIn, userName, userId, img } = user;
  const location = useLocation();
  const [selectedTeacherEmail, setSelectedTeacherEmail] = useState("");
  const [noCoursesMessage, setNoCoursesMessage] = useState("");

  const handleInputChange = (event) => {
    setCurrentSlide(0);
    const query = event.target.value;
    setSearchQuery(query);
    // Filter the courses based on the search query
    const filteredResults = courses.filter((course) =>
      course.testBankCourse_name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const cardsPerSlide = 9; // Maximum cards per slide
  const [totalSlides, setTotalSlides] = useState(0);
  const fetchCourses = async () => {
    const departmentId =
      selectedDepartment ||
      new URLSearchParams(location.search).get("department");
    const teacherEmail = selectedTeacherEmail;
    // let url = `${API_URL}/Courses`;
    let url = `${API_URL}/testbank/gettestbank`;

    if (departmentId && teacherEmail) {
      // Both department and teacher filters are selected
      url = `${API_URL}/Courses/filter/${departmentId}/${teacherEmail}`;
    } else if (departmentId) {
      // Only department filter is selected
      url = `${API_URL}/Courses/getbydep/${departmentId}`;
    } else if (teacherEmail) {
      // Only teacher filter is selected
      url = `${API_URL}/TeacherRoutes/teachercourse/${teacherEmail}`;
    }
    try {
      const response = await axios.get(url);
      const fetchedCourses = response.data;

      if (fetchedCourses.length === 0) {
        setNoCoursesMessage("لا يوجد مواد متاحة ");
        setAllCourses([]);
        setCourses([]);
        setTotalSlides(0);
        return;
      } else {
        setNoCoursesMessage(""); // Clear message if there are courses
        setAllCourses(fetchedCourses);
        setCourses(
          fetchedCourses.slice(
            currentSlide * cardsPerSlide,
            (currentSlide + 1) * cardsPerSlide
          )
        );
        setTotalSlides(Math.ceil(fetchedCourses.length / cardsPerSlide));
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const departmentId = query.get("department");
    if (departmentId) {
      setSelectedDepartment(departmentId);
    } else {
      setSelectedDepartment(null); // Reset the selected department if none is found
    }
  }, [location.search]);
  // Fetch courses whenever selected department or currentSlide changes
  useEffect(() => {
    fetchCourses();
  }, [selectedDepartment, currentSlide, selectedTeacherEmail]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   const fetchDepartments = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API_URL}/departments/getDepartments`
  //       );
  //       setDepartment(response.data);
  //     } catch (error) {
  //       console.error("Error fetching departments:", error);
  //     }
  //   };
  //   fetchDepartments();
  // }, []);

  // useEffect(() => {
  //   const fetchTeacherData = async () => {
  //     if (!selectedDepartment) return; // Do nothing if no department is selected

  //     try {
  //       const response = await axios.get(
  //         `${API_URL}/Courses/getbydep/${selectedDepartment}`
  //       );
  //       const rawData = response.data;

  //       // Remove duplicates and extract teacher names
  //       const uniqueTeachers = rawData.reduce((unique, course) => {
  //         const teacherName = course.teacher?.teacher_name;
  //         const teacherId = course.teacher_id;
  //         const teacherEmail = course.teacher?.email;

  //         const isDuplicate = unique.some(
  //           (item) => item.teacher_id === teacherId
  //         );

  //         if (teacherName && teacherId && teacherEmail && !isDuplicate) {
  //           unique.push({
  //             teacher_id: teacherId,
  //             teacher_name: teacherName,
  //             email: teacherEmail,
  //           });
  //         }
  //         return unique;
  //       }, []);

  //       setTeacherData(uniqueTeachers);
  //     } catch (error) {
  //       console.error("Error fetching teacher data:", error);
  //     }
  //   };
  //   fetchTeacherData();
  // }, [selectedDepartment]);

  // const handleDepartment = (e) => {
  //   const selectedDepartmentId = e.target.value;
  //   setSelectedDepartment(selectedDepartmentId);
  //   setCurrentSlide(0); // Reset to the first slide when department changes
  // };

  // const handleTeacher = (e) => {
  //   const selectedTeacherId = e.target.value;
  //   setSelectedTeacher(selectedTeacherId);
  //   const teacher = teacherData.find(
  //     (tech) => tech.teacher_id.toString() === selectedTeacherId
  //   );
  //   if (teacher) {
  //     setSelectedTeacherEmail(teacher.email);
  //   } else {
  //     setSelectedTeacherEmail("");
  //   }
  //   setCurrentSlide(0); // Reset to the first slide when department changes
  // };
  // Handle slide navigation
  const nextSlide = () => {
    if (hasNextSlide()) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const hasNextSlide = () => {
    return (currentSlide + 1) * cardsPerSlide < allCourses.length;
  };

  const dataToDisplay = searchQuery ? searchResults : courses;
  useEffect(() => {}, [courses, searchResults, dataToDisplay]);

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
      <div className="container courses_margin" id="order-section">
        <div className="row ">
          <div className="col-lg-12 col-md-4 col-sm-12">
            <div className="navbar__search">
              <span>
                <i
                  className="fa-solid fa-magnifying-glass fa-sm"
                  style={{ color: "#833988" }}
                ></i>{" "}
              </span>
              <input
                type="text"
                placeholder="ابحث عن مادة"
                value={searchQuery}
                className="search_course"
                onChange={handleInputChange}
              />
              <a
                href="#"
                className="btn btn-s purple_btn search_btn"
                onChange={handleInputChange}
              >
                بحث
              </a>
            </div>
          </div>
          {/* <div className="col-lg-4 col-md-4 col-sm-12">
            <select
              name="department"
              value={selectedDepartment}
              onChange={handleDepartment}
              id="lang"
              className="select_dep"
            >
              <option value="">اختر قسم</option>
              {department.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <select
              name="teacher"
              value={selectedTeacher}
              onChange={handleTeacher}
              id="lang"
              className="select_dep"
            >
              <option value="">اختر استاذ</option>
              {teacherData.map((tech) => (
                <option key={tech.id} value={tech.teacher_id}>
                  {tech.teacher_name}
                </option>
              ))}
            </select>
          </div> */}
        </div>
      </div>

      <div className="slick-wrapper">
        <div className="container ">
          {noCoursesMessage ? (
            <div
              className="no-courses-message d-flex justify-content-center "
              style={{ color: "#833988" }}
            >
              <p>{noCoursesMessage}</p>
            </div>
          ) : (
            dataToDisplay.length > 0 && (
              <div className="row justify-content-center align-items-center">
                {dataToDisplay.map((card, index) => (
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div
                      key={index}
                      className={`slide ${
                        index === currentSlide ? "active" : ""
                      }`}
                    >
                      <Link
                        to={`/questiondetails/${card.id}`}
                        className="link_card"
                      >
                        <div className="card card_cont">
                          <img
                            src={courseimg}
                            className="card-img-top img-fluid card_img"
                            alt="course"
                            title="default-course-img"
                            loading="lazy"
                          />
                          <div className="card-body">
                            <div>
                              {/* rating here */}
                              {/* <p className="card-text card_dep">
                                {" "}
                                {card.semester}
                              </p> */}
                            </div>
                            <div className="d-flex justify-content-between">
                              <p className="course_title_card">
                                {card.testBankCourse_name}
                              </p>{" "}
                              {/* <p className=" teacher_name_card">
                                الفصل {card.semester}
                              </p> */}
                            </div>
                            <hr style={{ marginTop: "1px" }} />
                            <div className="d-flex justify-content-between">
                              <i
                                className="fa-solid fa-file card_icon"
                                style={{ color: "#f8c36e" }}
                              ></i>
                              <p className="details_courses_card">
                                الفصل {card.semester}
                              </p>
                              <i
                                className="fa-solid fa-graduation-cap card_icon"
                                style={{ color: "#f8c36e" }}
                              ></i>

                              <p className="details_courses_card">
                                عدد المواضيع :{" "}
                                {card.Units?.reduce(
                                  (total, unit) =>
                                    total + (unit.Topics?.length || 0),
                                  0
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>{" "}
                  </div>
                ))}
                <div
                  className="col-md-12 col-sm-12 col_btn_prevNext"
                  style={{ marginTop: "10px" }}
                >
                  <button
                    onClick={nextSlide}
                    className="btn mb-3  "
                    disabled={currentSlide === totalSlides - 1}
                  >
                    {" "}
                    <i className="fa fa-arrow-right"></i>
                  </button>
                  <div className="number_slide_questionbank">
                    <span className="space_between_numslide">
                      {currentSlide + 1}
                    </span>
                    {/* Next Slide Number */}
                    {hasNextSlide() && (
                      <span style={{ cursor: "pointer" }} onClick={nextSlide}>
                        {currentSlide + 2}
                      </span>
                    )}
                  </div>
                  <button onClick={prevSlide} className="btn  mb-3  ">
                    <i className="fa fa-arrow-left"></i>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default QuestionBank;
