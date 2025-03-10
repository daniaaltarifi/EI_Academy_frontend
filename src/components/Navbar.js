import React, { useContext, useRef } from "react";
import "../Css/navbar.css";
import AuthNavbar from "../components/AuthNavbar.js";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext.js";

function Navbar({ handleLogout }) {
  const { user } = useContext(UserContext);
  const navbarCollapseRef = useRef(null);

  const handleLinkClick = () => {
    if (navbarCollapseRef.current.classList.contains("show")) {
      navbarCollapseRef.current.classList.remove("show");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid responsive_container">
          <AuthNavbar user={user} handleLogout={handleLogout} />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            ref={navbarCollapseRef}
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link text_navbar"
                  onClick={handleLinkClick}
                >
                  الرئيسية
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/courses"
                  className="nav-link text_navbar"
                  onClick={handleLinkClick}
                >
                  تعلم معنا
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/questionbank"
                  className="nav-link text_navbar"
                  onClick={handleLinkClick}
                >
                  بنك الاسئلة
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/whoweare"
                  className="nav-link text_navbar"
                  onClick={handleLinkClick}
                >
                  من نحن
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="/cardprice"
                  className="nav-link text_navbar"
                  onClick={handleLinkClick}
                >
                  نقاط البيع
                </Link>
              </li>
              {user.isLoggedIn && (
                <li className="nav-item dropdown">
                  <Link
                    to="/mycourses"
                    className="nav-link text_navbar"
                    onClick={handleLinkClick}
                  >
                    دوراتي
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  to="/blogs"
                  className="nav-link text_navbar"
                  onClick={handleLinkClick}
                >
                  المدونة
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/library"
                  className="nav-link text_navbar"
                  onClick={handleLinkClick}
                >
                  المكتبة
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link text_navbar"
                  onClick={handleLinkClick}
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
            <div className="logo_container">
              <Link to="/">
                <img
                  srcSet={`${require("../assets/ei-academy-high-resolution-logo.png")} 300w,
           ${require("../assets/ei-academy-high-resolution-logo.png")} 600w,
           ${require("../assets/ei-academy-high-resolution-logo.png")} 1200w`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                  alt="Company Logo"
                  className="logo_size"
                  decoding="async"
                  title="logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

<link rel="preload" href="path_to_your_image.webp" as="image" />;

export default Navbar;
