import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { API_URL } from "../App";
import courseimg from "../assets/course.webp";

function MyCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userId = user.userId;
  const [courseId, setCourseId] = useState(null);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API_URL}/PaymentsCourse/getApprovedCoursesForUser/${userId}`
  //       );
  //       setCourses(response.data);
  //       setSearchResults(response.data);
  //       if (response.data.length > 0) {
  //         setCourseId(response.data[0].course_id);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching approved courses:", error);
  //     }
  //   };

  //   fetchCourses();
  // }, [userId]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/PaymentsCourse/getApprovedCoursesForUser/${userId}`
        );
        const fetchedCourses = response.data;

        // Fetch additional data (student count and lesson count) for each course
        const coursesWithDetails = await Promise.all(
          fetchedCourses.map(async (course) => {
            try {
              const studentCountResponse = await axios.get(
                `${API_URL}/Courses/users-counts/${course.course_id}`
              );

              const lessonCountResponse = await axios.get(
                `${API_URL}/Courses/lesson-counts/${course.course_id}`
              );

              // Ensure we access the lesson_count correctly from the response
              const lessonCountData = lessonCountResponse.data;
              const lessonCount =
                Array.isArray(lessonCountData) && lessonCountData.length > 0
                  ? lessonCountData[0].lesson_count
                  : 0;

              return {
                ...course,
                student_count: studentCountResponse.data?.student_count || 0,
                lesson_count: lessonCount || 0,
              };
            } catch (error) {
              console.error(
                `Error fetching data for course ${course.course_id}:`,
                error
              );
              return {
                ...course,
                student_count: 0,
                lesson_count: 0,
              };
            }
          })
        );

        setCourses(coursesWithDetails);
        setSearchResults(coursesWithDetails);
        if (coursesWithDetails.length > 0) {
          setCourseId(coursesWithDetails[0].course_id);
        }
      } catch (error) {
        console.error("Error fetching approved courses:", error);
      }
    };

    fetchCourses();
  }, [userId]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/departments/getDepartments`
        );
        setDepartment(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);
  useEffect(() => {
    const filterCourses = () => {
      let filteredCourses = [...courses]; // Ensure a fresh copy of courses

      if (searchQuery) {
        filteredCourses = filteredCourses.filter((course) =>
          course.subject_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedDepartment) {
        filteredCourses = filteredCourses.filter(
          (course) => course.department_id === parseInt(selectedDepartment)
        );
      }

      setSearchResults(filteredCourses);
    };

    filterCourses();
  }, [searchQuery, selectedDepartment, courses]); // Added `courses` dependency

  // useEffect(() => {
  //   const filterCourses = () => {
  //     let filteredCourses = courses;

  //     // Filter by search query
  //     if (searchQuery) {
  //       filteredCourses = filteredCourses.filter((course) =>
  //         course.subject_name.toLowerCase().includes(searchQuery.toLowerCase())
  //       );
  //     }

  //     // Filter by selected department
  //     if (selectedDepartment) {
  //       filteredCourses = filteredCourses.filter(
  //         (course) => course.department_id === parseInt(selectedDepartment)
  //       );
  //     }

  //     setSearchResults(filteredCourses);
  //   };

  //   filterCourses();
  // }, [searchQuery, selectedDepartment]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDepartment = (e) => {
    setSelectedDepartment(e.target.value);
  };
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  if (typeof window !== "undefined") {
    const observer = new ResizeObserver(() => {});
    observer.observe(document.body);
  }
  
  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setWindowSize(window.innerWidth), 200); // Debounce update
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {/* background image */}
      <div className="slide-item">
        <img
          src={require("../assets/corsee.webp")}
          alt={`Contact Video`}
          className="img_home"
          loading="lazy"
        />
        <div className="overlay">
          <div className="overlay-content">
            <h1 style={{ fontWeight: "700", fontSize: "64px" }}>دوراتي</h1>
          </div>
        </div>
      </div>
      {/* End background image */}

      <section className="margin_section">
        <div className="container ">
          <div className="row ">
            <div className="col-lg-3 col-md-4 col-sm-12">
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
                <a href="#" className="btn btn-s purple_btn search_btn">
                  بحث{" "}
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12">
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
            <div className="col-lg-6 col-md-4 col-sm-12"></div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row d-flex flex-wrap justify-content-center align-items-center">
          {searchResults.map((course, index) => (
            <>
              {/* Render Course Card if course_id exists */}
              {course.course_id !== null && (
                <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/mycoursedetails/${course.course_id}`}
                  >
                    <div className="card card_cont">
                      <img
                        src={`https://res.cloudinary.com/dqimsdiht/${course.course?.img}`}
                        className="card-img-top img-fluid card_img"
                        alt={course.course?.subject_name}
                        loading="lazy"
                      />
                      <div className="card-body">
                        <div>
                          <p className="card-text card_dep">
                            {course.course?.Department?.title ||
                              "No Department Available"}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="course_title_card">
                            {course.course?.subject_name}
                          </p>
                          <p className="teacher_name_card">
                            {course.course?.teacher?.teacher_name}
                          </p>
                        </div>
                        <hr style={{ marginTop: "1px" }} />
                        <div className="d-flex justify-content-between">
                          <i
                            className="fa-solid fa-file card_icon"
                            style={{ color: "#f8c36e" }}
                          ></i>
                          <p className="details_courses_card">
                            {course.student_count} طالب
                          </p>
                          <i
                            className="fa-solid fa-graduation-cap card_icon"
                            style={{ color: "#f8c36e" }}
                          ></i>
                          <p className="details_courses_card">
                            {course.lesson_count} درس
                          </p>
                          <i
                            className="fa-solid fa-clock card_icon"
                            style={{ color: "#f8c36e" }}
                          ></i>
                          <p className="details_courses_card">
                            {new Date(
                              course.course?.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Render Test Bank Card if TestBank.id exists */}
              {course.testBank_id !== null && (
                <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/questiondetails/${course.TestBank?.id}`}
                  >
                    <div className="card card_cont">
                      <img
                        src={courseimg} // Assuming courseimg is a default image for test bank cards
                        className="card-img-top img-fluid card_img"
                        alt={course.TestBank?.testBankCourse_name}
                        loading="lazy"
                      />
                      <div className="card-body">
                        <div>
                          <p className="card-text card_dep">
                            {course.TestBank?.semester ||
                              "No semester Available"}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="course_title_card">
                            {course.TestBank?.testBankCourse_name}
                          </p>
                        </div>
                        <hr style={{ marginTop: "1px" }} />
                        <div className="d-flex justify-content-between">
                          <i
                            className="fa-solid fa-file card_icon"
                            style={{ color: "#f8c36e" }}
                          ></i>
                          <p className="details_courses_card">بنك اسئلة</p>
                          <i
                            className="fa-solid fa-graduation-cap card_icon"
                            style={{ color: "#f8c36e" }}
                          ></i>
                          <p className="details_courses_card">
                            عدد المواضيع:{" "}
                            {course.TestBank?.Units?.reduce(
                              (total, unit) =>
                                total + (unit.Topics?.length || 0),
                              0
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyCourses;
