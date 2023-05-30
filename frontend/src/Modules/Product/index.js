import "../../assets/styles/css/product.css";
import "../../assets/styles/css/header.css";
import "../../assets/styles/css/base.css";
import "../../assets/styles/css/main.css";
import "../../assets/styles/css/footer.css";
import "../../assets/styles/css/overlay-menu.css";
import Img1 from "../../assets/img/logo-text.png";

import React, { useEffect, useState } from "react";
import axios from "axios";

//burger-bar
import { Link } from "react-router-dom";

// @svg
import { CartIcon } from "../../assets/svg";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem, clearItem } from "../../Redux/actions/cartAction";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [filter, setFilter] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();
  const { dataCart } = useSelector((state) => state);
  // console.log("store", dataCart);

  useEffect(() => {
    fetchGetListProducts();
  }, []);

  const fetchGetListProducts = async (type = "") => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:3002/products/listProducts",
        {
          page: 1,
          size: 10000,
          // productText: keySearch,
          category: type,
        }
      );
      if (data.retCode === 0) {
        const list = data.retData.products.reverse();
        const listProducts = list.map((item) => {
          return {
            ...item,
            quantity: 1,
            totalPrice: item.price,
          };
        });
        setListProducts(listProducts);
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  function openNav() {
    document.getElementById("overlay-menu").style.height = "100%";
  }
  function closeNav() {
    document.getElementById("overlay-menu").style.height = "0%";
  }

  function search_product(value) {
    let input = document.getElementById("searchbar").value;
    input = input.toLowerCase();
    let x = document.getElementsByClassName("content-body-item-product");
    for (let i = 0; i < x.length; i++) {
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display = "none";
      } else {
        x[i].style.display = "flex";
      }
    }
  }

  const openShopping = document.querySelector(".shopping");
  const closeShopping = document.querySelector(".closeShopping");
  const body = document.querySelector("body");

  openShopping?.addEventListener("click", () => {
    body.classList.add("active");
  });

  closeShopping?.addEventListener("click", () => {
    body.classList.remove("active");
  });

  const handleTotalMoney = () => {
    const listPrice = dataCart?.map((item) => {
      return item.totalPrice;
    });
    if (listPrice?.length === 0) {
      return 0;
    } else {
      const res =
        listPrice.reduce((total, currentValue) => {
          return total + currentValue;
        }) ?? 0;
      return res;
    }
  };


  return (
    <React.Fragment>
      <div className="content-header">
      <div className="wrapper">
        <div className="nav">
          <i className="fa-brands fa-instagram"></i>
          <img src={Img1} alt="" style={{
                cursor: "pointer", marginLeft: "280px",
              }} />
          <div class="end">
                {userInfo && Object.keys(userInfo)?.length > 0 ? (
                  <p
                    style={{
                      cursor: "pointer", paddingTop: "20px"
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
                      cursor: "pointer", paddingTop: "20px"
                    }}
                    onClick={() => (window.location.href = "/login")}
                  >
                    Login
                  </p>
                )}
                <i className="fa-solid fa-bars" onClick={() => openNav()}></i>
                <div className="shopping">
                  <div style={{ cursor: "pointer" }}>
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span className="quantity">{dataCart?.length}</span>
                  </div>
                </div>
              </div>
        </div>
      </div>
        <h1 className="content-header-title">MENU</h1>
      </div>
      <div className="content-body">
        <h2 className="content-body-title">PRODUCTS</h2>
        <input
          id="searchbar"
          onKeyUp={() => search_product()}
          type="text"
          name="search"
          placeholder="Search product.."
        />

        <div className="content-body-box">
          <div className="content-body-list">
            <div
              className="content-body-list-item"
              onClick={() => fetchGetListProducts("")}
            >
              All
            </div>
            <div
              className="content-body-list-item"
              onClick={() => fetchGetListProducts("Basic")}
            >
              Basic
            </div>
            <div
              className="content-body-list-item"
              onClick={() => fetchGetListProducts("Signature")}
            >
              Signature
            </div>
            <div
              className="content-body-list-item"
              onClick={() => fetchGetListProducts("Flavored-Coffee")}
            >
              Flavored Coffee
            </div>
            <div
              className="content-body-list-item"
              onClick={() => fetchGetListProducts("Non-coffee")}
            >
              Non-coffee
            </div>
          </div>

          <div className="content-body-item">
            <div className="row">
              {listProducts?.map((item, index) => {
                return (
                  <div className="col-4 p-2" key={`${index}-${item?._id}`}>
                    <div className="content-body-item-product">
                      <img
                        src={item?.image}
                        alt="product"
                        className="product-item"
                      />
                      <p className="product-item-title">{item?.name}</p>
                      <div className="product-item-content">
                        <div className="price">
                          <p className="product-item-price">{item?.price}$</p>
                        </div>
                        <div
                          className="cart"
                          onClick={() => {
                            dispatch(addItem(item));
                          }}
                        >
                          <a
                            href="#"
                            className="fa-solid fa-cart-shopping"
                            style={{ color: "#c8a27a", fontSize: "20px" }}
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="wrapper">
          <div className="section">
            <div className="logo">
              <img src="../../assets/img/logo-text.png" alt="" />
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
      <div className="card">
        <h1>Cart</h1>
        <div className="closeShopping">&times;</div>
        <ul className="listCard">
          {dataCart?.map((value, index) => {
            return (
              <li key={index}>
                <div className="start">
                  <img src={value.image} alt="" />
                  <div className="product-name">{value.name}</div>
                </div>
                <div>{value.totalPrice.toLocaleString()}</div>
                <div>
                  <button
                    onClick={() => {
                      const itemExistDelete = dataCart?.find(
                        (item) => item?._id === value._id
                      );
                      if (
                        itemExistDelete &&
                        Object.keys(itemExistDelete).length > 0
                      ) {
                        dispatch(deleteItem(value));
                      } else {
                        return;
                      }
                    }}
                  >
                    -
                  </button>
                  <div className="count">{value.quantity}</div>
                  <button
                    onClick={() => {
                      dispatch(addItem(value));
                    }}
                  >
                    +
                  </button>
                </div>
                  <button
                  onClick={() => {
                    const itemExistDelete = dataCart?.filter(
                      (item) => item?._id === value._id
                    );
                    dispatch(clearItem(value));
                    // while (
                    //   itemExistDelete &&
                    //   Object.keys(itemExistDelete).length > 0
                    // ) {
                      
                    // } 
                    return;
                  }}>&times;</button>
              </li>
            );
          })}
        </ul>
        <div className="checkOut">
          <div className="">Total: ${handleTotalMoney()}</div>
          <div className="checkoutButton"
            onClick={() => {
              if (userInfo && Object.keys(userInfo)?.length > 0) {
                window.location.href = "checkout";
              } else {
                window.location.href = "login";
              }
            }}
          >
            {/* <Link to="/checkout">Checkout</Link> */}
            Check Out ({dataCart?.length})
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Product;
