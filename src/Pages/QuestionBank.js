import { useState, useEffect, useContext } from "react";
import React from "react";
import SliderComp from "../components/SliderComp";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/courses.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App.js";
import courseimg from "../assets/course.webp";
import "../Css/QuestionBank.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../UserContext.js";
import MiniPopUp from "../components/MiniPopUpLogin.js";
import MiniPopUpConfirm from "../components/MiniPopUpConfirm.js";

function QuestionBank() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testBank, setTestBank] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [allTestBank, setAllTestBank] = useState([]);
  const { hash } = useLocation();
  const [selectedTestBank, setSelectedTestBank] = useState("");
  const [noCoursesMessage, setNoCoursesMessage] = useState("");
  // FOR PURCHASE PACKAGE
  const { user } = useContext(UserContext);
  const { isLoggedIn } = user;
  const [show, setShow] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [coupon_code, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [studentNameError, setStudentNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [courseError, setcourseError] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [ShowPopupConf, setShowPopupConf] = useState(false);
  const title_popup = "تسجيل الدخول";
  const description_popup = "لشراء باقة يجب تسجيل الدخول";
  const title_popup_confirm = " تنبيه";
  const description_popup_confirm = "تمت العملية بنجاح ,انتقل الى دوراتي";

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  const handleClosePopupConf = () => {
    setShowPopupConf(false);
  };
  const handleInputChange = (event) => {
    setCurrentSlide(0);
    const query = event.target.value;
    setSearchQuery(query);
    // Filter the courses based on the search query
    const filteredResults = testBank.filter((course) =>
      course.testBankCourse_name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const cardsPerSlide = 9; // Maximum cards per slide
  const [totalSlides, setTotalSlides] = useState(0);
  const fetchTestbank = async () => {
    let url = `${API_URL}/testbank/gettestbank`;
    try {
      const response = await axios.get(url);
      const fetchedCourses = response.data;
      if (fetchedCourses.length === 0) {
        setNoCoursesMessage("لا يوجد بنك اسئلة متاح ");
        setAllTestBank([]);
        setTestBank([]);
        setTotalSlides(0);
        return;
      } else {
        setNoCoursesMessage(""); // Clear message if there are courses
        setAllTestBank(fetchedCourses);
        setTestBank(
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
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/Courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTestbank();
    fetchCourses();

  }, []);
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
    return (currentSlide + 1) * cardsPerSlide < allTestBank.length;
  };

  const dataToDisplay = searchQuery ? searchResults : testBank;
  useEffect(() => {}, [testBank, searchResults, dataToDisplay]);

  const handleValidate = () => {
    if (isLoggedIn) {
      setShow(true);
    } else {
      setShowLoginPopup(true);
    }
  };
  const handleClose = () => setShow(false);
  const validateCouponCode = async (code) => {
    try {
      const response = await fetch(`${API_URL}/PaymentsCourse/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coupon_code: coupon_code, course_id: Number(selectedCourse) ,testBank_id:Number(selectedTestBank)}),
      });

      const data = await response.json();

      if (!response.ok) {
        return data.error || "Invalid coupon code";
      }
      // Check if the coupon type is not 'course'
      if (data.couponType !== "courseandtestbank") {
        return "رمز الكوبون غير صالح"; // Return the error message
      }
      return ""; // No error
    } catch (error) {
      console.error("Error checking coupon code:", error);
      return "Invalid coupon code";
    }
  };
  const handleSubmitPackage = async (event) => {
    event.preventDefault();
    // Validate all fields
    const errors = {};

    if (!studentName) errors.studentName = "اسم الطالب مطلوب";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "البريد الإلكتروني غير صحيح";
    if (!address) errors.address = "مكان السكن مطلوب";
    if (!phone || !/^\d+$/.test(phone)) errors.phone = "رقم الهاتف غير صحيح";

    // Custom validation for coupon code
    const couponError = await validateCouponCode(coupon_code); // Await the result of validateCouponCode
    if (!coupon_code || couponError) {
      errors.couponCode = couponError || "رقم الكوبون غير صالح";
    }
    // Set errors and return if any
    setStudentNameError(errors.studentName || "");
    setEmailError(errors.email || "");
    setAddressError(errors.address || "");
    setPhoneError(errors.phone || "");
    setcourseError(errors.department || "");
    setCouponError(errors.couponCode || "");

    if (Object.keys(errors).length > 0) {
      return;
    }
    setCouponError("");
    setStudentNameError("");
    setEmailError("");
    setAddressError("");
    setPhoneError("");
    const userId = localStorage.getItem("id"); // Retrieve user_id from local storage

    if (!userId) {
      handleClose();
      setShowLoginPopup(true);
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/PaymentsCourse/courses`, {
        student_name: studentName,
        email: email,
        address: address,
        phone: phone,
        coupon_code: coupon_code,
        course_id: selectedCourse,
        testBank_id:selectedTestBank,
        user_id: userId,
      });
      handleClose();
      setSmShow(true);
      setShowPopupConf(true);
      // Clear recorded courses
      setStudentName("");
      setEmail("");
      setAddress("");
      setAddress("");
      setPhone("");
      setCouponCode("");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );

      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Invalid coupon code"
      ) {
        setCouponError("رقم الكوبون غير صالح");
      } else {
        console.log(error.response)
      }
    }
  };
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
                placeholder="ابحث عن بنك اسئلة"
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
        </div>
      </div>
      <div className="container text-center purchaseDepartment_box">
        <h2 className="h_home_box">
          احصل الآن على الباقة الكاملة التي تشمل بنك الأسئلة والمادة كاملة{" "}
        </h2>
        <p className="p_home_box">
          استمتع بتجربة تعليمية متكاملة تساعدك على التفوق والنجاح{" "}
        </p>
        <button
          type="button"
          className="btn btn-light click_here_btn"
          onClick={handleValidate}
        >
          اضغط هنا
        </button>
        {/* Modal */}
        <Modal show={show} onHide={handleClose} dir="rtl">
          <Modal.Title className="modal_title">شراء باقة كاملة</Modal.Title>
          <Modal.Body>
            <Form id="buyDepartmentForm">
              <Form.Group className="mb-3">
                <Form.Label className="text_field">اسم الطالب</Form.Label>
                <Form.Control
                  type="text"
                  className={`input_filed_modal ${
                    studentNameError ? "border-danger" : ""
                  }`}
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
                {studentNameError && (
                  <Form.Text className="text-danger">
                    {studentNameError}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text_field text-center">
                  الأيميل
                </Form.Label>
                <Form.Control
                  type="email"
                  className={`input_filed_modal ${
                    emailError ? "border-danger" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && (
                  <Form.Text className="text-danger">{emailError}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text_field text-center">
                  مكان السكن
                </Form.Label>
                <Form.Control
                  type="text"
                  className={`input_filed_modal ${
                    addressError ? "border-danger" : ""
                  }`}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                {addressError && (
                  <Form.Text className="text-danger">{addressError}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text_field text-center">
                  رقم الهاتف
                </Form.Label>
                <Form.Control
                  type="number"
                  className={`input_filed_modal ${
                    phoneError ? "border-danger" : ""
                  }`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {phoneError && (
                  <Form.Text className="text-danger">{phoneError}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text_field text-center">
                  المادة
                </Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className={`select_dep ${courseError ? "border-danger" : ""}`}
                >
                  <option value="">اختر المادة</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.subject_name}
                    </option>
                  ))}
                </Form.Control>
                {courseError && (
                  <Form.Text className="text-danger">{courseError}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text_field text-center">
                  بنك الاسئلة
                </Form.Label>
                <Form.Control
                  as="select"
                  value={selectedTestBank}
                  onChange={(e) => setSelectedTestBank(e.target.value)}
                  className={`select_dep`}
                >
                  <option value="">اختر بنك اسئلة
                  </option>
                  {testBank.map((testba) => (
                    <option key={testba.id} value={testba.id}>
                      {testba.testBankCourse_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text_field text-center">
                  الكوبون
                </Form.Label>
                <Form.Control
                  type="text"
                  className={`input_filed_modal ${
                    couponError ? "border-danger" : ""
                  }`}
                  value={coupon_code}
                  onChange={(e) => setCouponCode(e.target.value)}
                  required
                />
                {couponError && (
                  <Form.Text className="text-danger">{couponError}</Form.Text>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              onClick={handleSubmitPackage}
              form="buyDepartmentForm"
              className="buy_department_btn"
            >
              شراء الآن
            </Button>
          </Modal.Footer>
        </Modal>

        {/*End Modal */}
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
                            src={card.image}
                            className="card-img-top img-fluid card_img"
                            alt="course"
                            title="default-course-img"
                            loading="lazy"
                          />
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <p className="course_title_card">
                                {card.testBankCourse_name}
                              </p>
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
        {/* MiniPopUpLogin */}
        {showLoginPopup && (
          <MiniPopUp
            title_popup={title_popup}
            description_popup={description_popup}
            show={showLoginPopup}
            onClose={handleClosePopup}
          />
        )}
      </div>
      {ShowPopupConf && (
        <MiniPopUpConfirm
          title_popup_confirm={title_popup_confirm}
          description_popup_confirm={description_popup_confirm}
          smShow={smShow}
          onClose={handleClosePopupConf}
        />
      )}
    </>
  );
}

export default QuestionBank;
