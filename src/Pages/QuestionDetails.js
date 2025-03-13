import React, { useState, useEffect, useRef, useContext } from "react";
import "../Css/courseDetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Tabs from "../Pages/Tabs.js";
import Tab from "../Pages/Tab.js";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { UserContext } from "../UserContext.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../Css/courses.css";
import MiniPopUpLogin from "../components/MiniPopUpLogin.js";
import MiniPopUpConfirm from "../components/MiniPopUpConfirm.js";
import ReadMoreReact from "read-more-react";
import { API_URL } from "../App.js";
import quesicon from "../assets/wallet.png";
import VideoModel from "../components/VideoModel.js";
import courseimg from "../assets/course.webp";
import defaultvideo from "../assets/Introduction to Online Courses.mp4";
import InputGroup from "react-bootstrap/InputGroup";
import { Alert } from "react-bootstrap";

function QuestionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testBankDetails, setTestBankDetails] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [testbankId, settestbankId] = useState(null);
  const [show, setShow] = useState(false); // State for controlling modal visibility
  const { user } = useContext(UserContext);
  const { userId } = user;
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");
  const [couponError, setCouponError] = useState("");
  const [studentNameError, setStudentNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State for controlling MiniPopUpLogin visibility
  const [ShowPopupConf, setShowPopupConf] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [course_users, setCourse_users] = useState([]);
  const [approvedUser, setApprovedUser] = useState(null);
  // NEW EI ACADEMY
  const [numberOfQuestion, setNumberOfQuestion] = useState("");
  const [topics, setTopics] = useState([]);
  const [trainingData, setTrainingData] = useState({
    topic_id: "",
    questionCount: "",
    questionType: "",
  });
  const isValid = numberOfQuestion > 0;
  const title_popup = "تسجيل الدخول";
  const description_popup = "لشراء قسم يجب تسجيل الدخول";
  const title_popup_confirm = " تنبيه";
  const description_popup_confirm = "تمت العملية ، طلبك قيد الأنتظار";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTestBankDetails();
    fetchTopicByTestbankId();
  }, []);

  const [expandedItemId, setExpandedItemId] = useState(null);
  const handleClick = (itemId) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  const fetchTestBankDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/testbank/gettestbank/${id}`);
      const data = await response.json();
      setTestBankDetails(data);
      if (data && data[0]) {
        settestbankId(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };
  // GET TOPICS BY TESTBANK ID
  const fetchTopicByTestbankId = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/testbank/getTopicsByTestBankId/${id}`
      );
      setTopics(response.data);
    } catch (error) {
      console.error("Error fetching topics by testbank ID:", error);
    }
  };
  const handleClose = () => {
    setShow(false);
    setShowPopupVideo(false);
  };
  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };
  const handleClosePopupConf = () => {
    setShowPopupConf(false);
  };

  const validateCouponCode = async (code) => {
    try {
      const response = await fetch(`${API_URL}/PaymentsCourse/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coupon_code: couponCode, testBank_id: testbankId }),
      });

      const data = await response.json();
      if (!response.ok) {
        return data.error || "Invalid coupon code";
      }
      // Check if the coupon type is not 'course'
      if (data.couponType !== "testBank") {
        return "رمز الكوبون غير صالح"; // Return the error message
      }
      return ""; // No error
    } catch (error) {
      console.error("Error checking coupon code:", error);
      return "Invalid coupon code";
    }
  };

  const handleSubmitPay = async (event) => {
    event.preventDefault();
    // Validate all fields
    const errors = {};

    if (!studentName) errors.studentName = "اسم الطالب مطلوب";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "البريد الإلكتروني غير صحيح";
    if (!address) errors.address = "مكان السكن مطلوب";
    if (!phone || !/^\d+$/.test(phone)) errors.phone = "رقم الهاتف غير صحيح";

    // Custom validation for coupon code
    const couponError = await validateCouponCode(couponCode); // Await the result of validateCouponCode
    if (!couponCode || couponError) {
      errors.couponCode = couponError || "رقم الكوبون غير صالح";
    }
    // Set errors and return if any
    setStudentNameError(errors.studentName || "");
    setEmailError(errors.email || "");
    setAddressError(errors.address || "");
    setPhoneError(errors.phone || "");

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
      setMessage("User ID not found. Please log in.");
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
        coupon_code: couponCode,
        testBank_id: testbankId,
        user_id: userId,
      });
      setMessage("Request was successful!");
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
        setMessage("There was an error with your submission.");
      }
    }
  };

  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchCourseUsers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/PaymentsDepartments/getallcourseusers`
        );
        setCourse_users(response.data);
      } catch (error) {
        console.error("Failed to fetch course users:", error);
      }
    };

    if (testbankId) {
      fetchCourseUsers();
    }
  }, [testbankId]);

  // Determine if the user is approved
  useEffect(() => {
    if (course_users.length > 0 && userId && testbankId) {
      // Check if the user is approved for the current course

      const user_courses = course_users.find(
        (user) =>
          user.payment_status === "approved" &&
          user.user_id == userId &&
          user.testBank_id === testbankId
      );
      setApprovedUser(user_courses);
    }
  }, [course_users, userId, testbankId]); // Include `course` in dependency array if `course.expiration_date` is used

  const [showPopupVideo, setShowPopupVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const handleVideoClick = () => {
    setVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ"); // Example video URL
    setShowPopupVideo(true);
  };
  const handleChangeTrainigData = (e) => {
    const { name, value } = e.target;
    setTrainingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const startTraining = () => {
    if (
      !trainingData.topic_id ||
      !trainingData.questionCount ||
      !trainingData.questionType
    ) {
      setMessage('يرجى إدخال جميع البيانات')
      return;
    }
    navigate(
      `/testbank/${trainingData.topic_id}/${trainingData.questionCount}/${trainingData.questionType}`
    );
  };
  return (
    <>
      {/* header of course details */}
      {testBankDetails.map((course) => (
        <div
          className="container text-center cont_course_details"
          key={course.id}
        >
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center">
              <img
                src={course.image}
                alt="coursedetails"
                className="img-fluid img_coursedetails"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6 col-md-6 cl-sm-12 d-flex flex-column justify-content-center ">
              <h1 className="title_coursedetails">
                {course.testBankCourse_name}
              </h1>
              <div className="d-flex justify-content-around ">
                <div className="d-flex">
                  <i
                    class="fa-solid fa-graduation-cap card_icon"
                    style={{ color: "#f8c36e" }}
                  ></i>
                  <p
                    className="details_courses_card"
                    style={{ color: "#f8c36e", fontWeight: "bold" }}
                  >
                    الفصل {course.semester}
                  </p>
                </div>
                <div className="d-flex">
                  <i
                    class="fa-solid fa-file card_icon"
                    style={{ color: "#f8c36e" }}
                  ></i>
                  <p
                    className="details_courses_card "
                    style={{ color: "#f8c36e", fontWeight: "bold" }}
                  >
                    عدد المواضيع :
                    {course.Units?.reduce(
                      (total, unit) => total + (unit.Topics?.length || 0),
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* End header of course details */}
      <section className="margin_section">
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12">
              {/* <Video/> */}

              {/* {videosData.length > 0 && ( */}
              {testBankDetails.map((testbank) => (
  <div className="video_cont" key={testbank.id}>
    <div className="video_wrapper">
      <div>
        <video
          controls
          controlsList="nodownload"
          className="video_play"
          preload="metadata"
        >
          <source src={testbank.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {approvedUser ? (
          <div className="d-flex justify-content-center">
            <div>
              <h2 className="title_after_purchase">
                {testbank.testBankCourse_name}
              </h2>
              <h2 className="title_after_purchase">{testbank.semester}</h2>
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-center">
              <p className="after_price_coursedetails">{testbank.after_price}JD</p>
              <p className="before_price_coursedetails">{testbank.before_price}JD</p>
            </div>
            <button className="purchase_now_coursedetails" onClick={handleShow}>
              شراء الان
            </button>
          </div>
        )}

                    {/* Modal */}
                    <Modal show={show} onHide={handleClose} dir="rtl">
                      <Modal.Title className="modal_title">
                        شراء بنك اسئلة
                      </Modal.Title>
                      <Modal.Body>
                        <Form id="buyDepartmentForm">
                          <Form.Group className="mb-3">
                            <Form.Label className="text_field">
                              اسم الطالب
                            </Form.Label>
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
                              <Form.Text className="text-danger">
                                {emailError}
                              </Form.Text>
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
                              <Form.Text className="text-danger">
                                {addressError}
                              </Form.Text>
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
                              <Form.Text className="text-danger">
                                {phoneError}
                              </Form.Text>
                            )}
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
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              required
                            />
                            {couponError && (
                              <Form.Text className="text-danger">
                                {couponError}
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          type="submit"
                          onClick={handleSubmitPay}
                          form="buyDepartmentForm"
                          className="buy_department_btn"
                        >
                          شراء الآن
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* End Modal */}
                  </div>
                </div>
              </div>
))}


              {/*End video  */}
            </div>
            {testBankDetails.map((course) => (
              <div
                className="col-lg-7 col-md-12 col-sm-12 col_tabs_coursedetails"
                key={course.id}
              >
                <Tabs>
                  <Tab title="عن المادة">
                    <div className="description_coursedetails">
                      <ReadMoreReact
                        text={course.description}
                        // text={
                        //   "عصرنا الرقمي، تحولت التكنولوجيا إلى عنصر أساسي في حياتنا اليومية، ومعها، ظهر التعليم عن بُعد كوسيلة مثالية لتكميل النظام التعليمي التقليدي. هذه الطريقة الجديدة تمكن الطلاب من فهم المفاهيم المعقدة بسهولة أكبر"
                        // }
                        min={200}
                        ideal={300}
                        max={500}
                        readMoreText="اقرأ المزيد"
                        readMoreClassName="read-more-button"
                      />
                    </div>
                  </Tab>
                  <Tab title="شراء الان">
                    <div className="description_coursedetails">
                      <ReadMoreReact
                        text={
                          "عصرنا الرقمي، تحولت التكنولوجيا إلى عنصر أساسي في حياتنا اليومية، ومعها، ظهر التعليم عن بُعد كوسيلة مثالية لتكميل النظام التعليمي التقليدي. هذه الطريقة الجديدة تمكن الطلاب من فهم المفاهيم المعقدة بسهولة أكبر"
                        }
                        min={200}
                        ideal={300}
                        max={500}
                        readMoreText="اقرأ المزيد"
                        readMoreClassName="read-more-button"
                      />
                    </div>
                    <div>
                      <button
                        className="purchase_now_coursedetails mt-3"
                        onClick={handleShow}
                      >
                        شراء الان
                      </button>
                    </div>
                  </Tab>
                  {approvedUser ? (
                  <Tab title="تدريبات">
                    <div>
                      <p className="description_coursedetails">
                        {course.descr}
                      </p>
                      {/* <div className="container text-center">
                        {courseDetails.map((item) =>
                          item.Units?.map((unit, unitIndex) => (
                            <div key={unit.id} className="unit-container p-4">
                              <h5 className="title_unit">
                                الوحدة {unit.unit_name}
                              </h5>
                              {unit.Topics?.map((topic, topicIndex) => (
                                <div key={topic.id} className="topic-container">
                                  <div
                                    className="topic-section p-3"
                                    onClick={() => handleClick(topic.id)}
                                  >
                                    <div className="d-flex align-items-center">
                                      <IoIosArrowDown
                                        style={{ marginRight: "10px" }}
                                      />
                                      <h6 className="mb-0">
                                        الموضوع {topicIndex + 1}
                                      </h6>
                                    </div>
                                    {expandedItemId === topic.id && (
                                      <div className="mt-3">
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                          <Link
                                            to={`/testbank/${topic.id}`}
                                            className="link_to_testbank"
                                          >
                                            <div className="d-flex align-items-center">
                                              <img
                                                src={quesicon}
                                                alt="quesicon"
                                                height={"25px"}
                                                width={"25px"}
                                              />
                                              <p className="mb-0">
                                                {topic.topic_name}
                                              </p>
                                            </div>
                                          </Link>

                                          <div className="d-flex">
                                            <button
                                              className="show_video_btn"
                                              onClick={() =>
                                                handleVideoClick(topic.id)
                                              }
                                            >
                                              فيديو{" "}
                                              <i
                                                className="fa-regular fa-circle-play"
                                                style={{ color: "#fff" }}
                                              ></i>
                                            </button>
                                            <Link
                                              to={`/explanation/${topic.id}`}
                                            >
                                              <button
                                                className="show_video_btn"
                                                style={{
                                                  backgroundColor: "#f8c36e",
                                                }}
                                              >
                                                شرح{" "}
                                                <i
                                                  className="fa-regular fa-circle-play"
                                                  style={{ color: "#fff" }}
                                                ></i>
                                              </button>
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="topic-details mt-3">
                                          <p>{topic.details}</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))
                        )}
                      </div> */}
                      <div className="training_cont unit-container p-4">
                        <div className="topic-section p-3 ">
                          <InputGroup size="sm" className="mb-3">
                            <Form.Select
                              aria-label="Default select example"
                              onChange={handleChangeTrainigData}
                              name="topic_id"
                            >
                              <option>اختر الموضوع</option>
                              {topics.map((topic) => (
                                <option key={topic.id} value={topic.id}>
                                  {topic.topic_name}
                                </option>
                              ))}
                            </Form.Select>
                            <InputGroup.Text id="inputGroup-sizing-sm">
                              عدد الاسئلة
                            </InputGroup.Text>
                            <Form.Control
                              name="questionCount"
                              aria-label="Small"
                              aria-describedby="inputGroup-sizing-sm"
                              onChange={handleChangeTrainigData}
                            />
                            <Form.Select
                              aria-label="Default select example"
                              onChange={handleChangeTrainigData}
                              name="questionType"
                            >
                              <option>نوع الاسئلة</option>
                              <option value="repeated">اسئلة مكررة </option>
                              <option value="non_repeated">اسئلة جديدة</option>
                            </Form.Select>
                            <div className="d-flex">
                              <button
                                className="show_video_btn mt-2"
                                style={{
                                  backgroundColor: "#f8c36e",
                                }}
                                onClick={startTraining}
                              >
                                ابدا التدريب
                              </button>
                            </div>
                          </InputGroup>
                          {message && (
                            <Alert variant="danger">{message}</Alert>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab>
                   ) : (
                    <p>
                     
                    </p>
                  )} 

                  {approvedUser ? (
                  <Tab title=" دوسيات ودفاتر ">
                    <div>
                      <div className="container text-center">
                        {/* {videosData.map((item, index) => ( */}
                        <div
                          className="row cont_files_and_paper"
                          // key={item.id}
                          // onClick={() => handleClick(item.id)}
                        >
                          <div
                            className={`col-lg-6 col-md-6 col-sm-12  `}
                            //   ${
                            //   expandedItemId === item.id ? "mb-3" : ""
                            // }
                          >
                            <div className="d-flex align-items-center p-3">
                              <img
                                src={quesicon}
                                alt="quesicon"
                                height={"25px"}
                                width={"25px"}
                              />
                              <li style={{ cursor: "pointer" }}>دوسية 1 </li>
                            </div>
                          </div>
                          {/* {expandedItemId === item.id && ( */}
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <button
                                className="show_video_btn"
                                // onClick={handleVideoClick}
                              >
                                تنزيل <i className="fa-solid fa-download"></i>
                              </button>
                              {/* <Link to={`/explanation`}> */}
                              <button
                                className="show_video_btn"
                                style={{
                                  backgroundColor: "#f8c36e",
                                }}
                              >
                                عرض <i className="fa-regular fa-eye"></i>
                              </button>
                              {/* </Link> */}
                            </div>
                          </div>
                          {/* )} */}
                        </div>
                        {/* ))} */}
                      </div>
                    </div>
                  </Tab>
                   ) : (
                    <p>
                   
                    </p>
                  )} 
                  {approvedUser ? (
                  <Tab title="اختبارات محوسبة">
                    <div>
                      <div className="container text-center">
                        {/* {videosData.map((item, index) => ( */}
                        <div
                          className="row cont_files_and_paper "
                          // key={item.id}
                        >
                          <div className={`col-lg-6 col-md-6 col-sm-12 `}>
                            <div className="p-3">
                              <li style={{ cursor: "pointer" }}>
                                <InputGroup size="sm" className="mb-3">
                                  <InputGroup.Text id="inputGroup-sizing-sm">
                                    عدد الاسئلة
                                  </InputGroup.Text>
                                  <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    onChange={(e) =>
                                      setNumberOfQuestion(e.target.value)
                                    }
                                    required
                                    min="1"
                                  />
                                </InputGroup>
                              </li>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="d-flex justify-content-evenly">
                              <div className="d-flex ">
                                <Link
                                  to={`/quiz/${testbankId}/${numberOfQuestion}`}
                                >
                                  <button
                                    className="show_video_btn mt-2"
                                    style={{
                                      backgroundColor: "#f8c36e",
                                    }}
                                    disabled={!isValid}
                                  >
                                    ابدا الاختبار
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                          {!isValid && <p>يرجى اختيار عدد الاسئلة أكبر من 0</p>}
                        </div>
                        {/* ))} */}
                      </div>
                    </div>
                  </Tab>
                 ) : (
                    <p>
                    
                    </p>
                  )} 
                </Tabs>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* MiniPopUpLogin */}
      {showLoginPopup && (
        <MiniPopUpLogin
          title_popup={title_popup}
          description_popup={description_popup}
          show={showLoginPopup}
          onClose={handleClosePopup}
        />
      )}

      {ShowPopupConf && (
        <MiniPopUpConfirm
          title_popup_confirm={title_popup_confirm}
          description_popup_confirm={description_popup_confirm}
          smShow={smShow}
          onClose={handleClosePopupConf}
        />
      )}
      <VideoModel
        show={showPopupVideo}
        handleClose={handleClose}
        videoUrl={videoUrl}
      />
    </>
  );
}

export default QuestionDetails;
