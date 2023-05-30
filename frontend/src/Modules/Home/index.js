import "../../assets/styles/css/header.css";
import "../../assets/styles/css/base.css";
import "../../assets/styles/css/main.css";
import "../../assets/styles/css/footer.css";
import "../../assets/styles/css/overlay-menu.css";

import React from "react";

// @img
import Img1 from "../../assets/img/logo-text.png";
import Img2 from "../../assets/img/couvee-text.png";
import Img3 from "../../assets/img/couvee-right-hand2.png";
import Img4 from "../../assets/img/couvee-left-hand3.png";
import Img5 from "../../assets/img/cookie.jpg";
import Img6 from "../../assets/img/red velvet latte.jpg";
import Img7 from "../../assets/img/chocolate.jpg";
import Img8 from "../../assets/img/matcha latte.jpg";
import Img9 from "../../assets/img/caramel machiato.jpg";
import Img10 from "../../assets/img/melaca.jpg";
import Img11 from "../../assets/img/locations.jpg";
import Img12 from "../../assets/img/tee.jpg";
import Img13 from "../../assets/img/mug.jpg";
import Img14 from "../../assets/img/bag.jpg";
import Img15 from "../../assets/img/honey-lemonade.jpg";
import Img16 from "../../assets/img/caramel-macciato.jpg";

//burger-bar
import { Link } from "react-router-dom";

const Home = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  console.log("userInfo", userInfo);

  function openNav() {
    document.getElementById("overlay-menu").style.height = "100%";
  }
  function closeNav() {
    document.getElementById("overlay-menu").style.height = "0%";
  }

  return (
    <React.Fragment>
      <div className="header">
        <div className="wrapper">
          <div className="nav">
            <i className="fa-brands fa-instagram"></i>
            <img src={Img1} alt="" style={{
                  cursor: "pointer", marginLeft:"280px", 
                }}/>
            {userInfo && Object.keys(userInfo)?.length > 0 ? (
              <p
                style={{
                  cursor: "pointer", paddingTop:"20px"
                }}
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  setTimeout(() => {
                    window.location.href = "/login";
                  }, 1000);
                }}
              >
                Logout
              </p>
            ) : (
              <p
                style={{
                  cursor: "pointer", paddingTop:"20px"
                }}
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </p>
            )}
            <i className="fa-solid fa-bars" onClick={() => openNav()}></i>
          </div>
        </div>
        <div className="image-container">
          <div className="couvee-text">
            <img src={Img2} alt="" />
          </div>
          <div className="image-hands-container">
            <img className="right-hand" src={Img3} alt="" />
            <img className="left-hand" src={Img4} alt="" />
          </div>
        </div>
      </div>
      <div className="page">
        <div className="main">
          <div className="wrapper">
            <div className="about section">
              <div className="col content-col">
                <h2 className="section-heading">Story</h2>
                <p className="section-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  illo error tempora a excepturi porro labore suscipit odit
                  dolor obcaecati, aliquid odio, officia architecto natus quos
                  quod voluptate alias velit.
                </p>
                <button className="section-button-arrow-dark">
                  <p>Full Story</p>
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </button>
              </div>
              <div className="col">
                <img src="../img/story.jpg" alt="" />
              </div>
            </div>
            <div className="products section">
              <div className="content-col">
                <h2 className="section-heading">Products</h2>
                <div className="carousel-viewport">
                  <div className="carousel-slide">
                    <div className="product">
                      <img src={Img5} alt="" />
                      <h2 className="product-name">Black Cookie Latte</h2>
                    </div>
                    <div className="product">
                      <img src={Img6} alt="" />
                      <h2 className="product-name">Red Velvet Latte</h2>
                    </div>
                    <div className="product">
                      <img src={Img7} alt="" />
                      <h2 className="product-name">Dark Chocolate</h2>
                    </div>
                  </div>
                  <div className="carousel-slide">
                    <div className="product">
                      <img src={Img8} alt="" />
                      <h2 className="product-name">Matcha Latte</h2>
                    </div>
                    <div className="product">
                      <img src={Img9} alt="" />
                      <h2 className="product-name">Caramel Macchiato</h2>
                    </div>
                    <div className="product">
                      <img src={Img10} alt="" />
                      <h2 className="product-name">Melacca</h2>
                    </div>
                  </div>
                </div>
                <button className="section-button-center-dark">all menu</button>
              </div>
            </div>
            <div className="location section">
              <div className="col content-col">
                <h2 className="section-heading">Locations</h2>
                <p className="section-text">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
                  at, dolores quisquam tenetur voluptas vitae nam, hic quae
                  repellendus modi assumenda reprehenderit et dignissimos atque
                  sunt ullam. Pariatur, quasi a?
                </p>
                <button className="section-button-arrow-dark">
                  <p>Locations</p>
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </button>
              </div>
              <div className="col">
                <img src={Img11} alt="" />
              </div>
            </div>
            <div className="merchandise section">
              <div className="content-col">
                <h2 className="section-heading">Merchandise</h2>
                <div className="row">
                  <div className="img-container">
                    <img src={Img12} alt="" />
                  </div>
                  <div className="img-container">
                    <img src={Img13} alt="" />
                  </div>
                  <div className="img-container">
                    <img src={Img14} alt="" />
                  </div>
                </div>
                <div className="row-button">
                  <button className="section-button-center-dark">
                    ORDER NOW
                  </button>
                  <button className="section-button-center-light">
                    ALL ITEM
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="promo section">
            <div className="wrapper">
              <div className="promo-item">
                <div className="col">
                  <img src={Img15} alt="" />
                </div>
                <div className="col">
                  <h3 className="title">Buy 1 Large, Get FREE 1 Regular</h3>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Iste, impedit dolor consectetur, magnam odit.
                  </p>
                  <div className="row">
                    <p className="date">1 July - 30 July 2019</p>
                    <a href="#">See more {">"}</a>
                  </div>
                </div>
              </div>
              <div className="promo-item">
                <div className="col">
                  <img src={Img16} alt="" />
                </div>
                <div className="col">
                  <h3 className="title">Buy 1 Large, Get FREE 1 Regular</h3>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Iste, impedit dolor consectetur, magnam odit.
                  </p>
                  <div className="row">
                    <p className="date">1 July - 30 July 2019</p>
                    <a href="">See more {">"}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="instagram section">
            <div className="wrapper">
              <img src={Img1} alt="" />
              <h2 className="section-heading">find us on instagram!</h2>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="wrapper">
            <div className="section">
              <div className="logo">
                <img src={Img1} alt="" />
              </div>
              <div className="content-col">
                <p>LINKS</p>
                <div className="content-row">
                  <div className="content-col">
                    <a href="">Homepage</a>
                    <a href="">Story</a>
                  </div>
                  <div className="content-col">
                    <a href="">Menu</a>
                    <a href="">Locations</a>
                  </div>
                  <div className="content-col">
                    <a href="">Merchandise</a>
                    <a href="">Contact</a>
                  </div>
                </div>
              </div>
              <div className="content-col">
                <p>CONTACT</p>
                <a href="">Code0Bug@Couvee.com</a>
              </div>
              <div className="content-col">
                <p>SOCIALS</p>
                <a href="">
                  <i className="fa-brands fa-instagram"></i> couvee.c0b
                </a>
              </div>
            </div>
          </div>
          <div className="colophon">
            <div className="wrapper">
              <p>Web Application Development Project - Semester 2, 2023</p>
              <p>Couvee - Code0Bug</p>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay" id="overlay-menu">
        <a
          href="javascript:void(0)"
          className="closebtn"
          onClick={() => closeNav()}
        >
          &times;
        </a>

        <nav className="overlay-menu">
          <Link to="/"> HOMEPAGE </Link>
          <Link to="/Product">MENU</Link>
          <Link to="/Login">LOGIN</Link>
          <Link to="/Register">REGISTER</Link>
          <Link to="/">CONTACT</Link>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Home;
