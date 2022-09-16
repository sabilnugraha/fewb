import React, { useState, useContext, useEffect } from "react";
import Logo from "../assets/logo.png";
import Desain from "../assets/Jumbotron.png";
import "../landingPages.css";
import { Container, Col, Row, Card, Navbar, Nav, Modal } from "react-bootstrap";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/usercontext";
import NavbarUser from "../components/navbar";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
import LoginAuth from "../components/auth/login";
import RegisterAuth from "../components/auth/register";

function LandingPages() {
  const [state, dispatch] = useContext(Usercontext);

  const navigate = useNavigate();

  const [user, setUser] = React.useContext(Usercontext);

  const [dataproduct, setDataproduct] = useState([]);

  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  function SwitchLogin() {
    setShow(false);
    setShowRegister(true);
  }
  function SwitchRegister() {
    setShowRegister(false);
    setShow(true);
  }


  useEffect(() => {
    const dataproduct = async () => {
      try {
        const response = await API.get("/products");
        setDataproduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataproduct();
  }, [setDataproduct]);

  const movetoDetail = (id) => {
    navigate("/product/" + id);
  };

  let subscribe = state.isLogin;
  console.log(subscribe);



  console.log(state);

  return (
    <div>
      <div>
        <Container className="">
          {subscribe ? (
            <NavbarUser />
          ) : (
            <Navbar className="mt-5 d-flex justify-content-between ">
              <Nav className="">
                <img style={{ width: "70px" }} src={Logo} alt="" />
              </Nav>
              <Nav className="">
                <div>
                  <div>
                    <AuthModal />
                  </div>
                </div>
              </Nav>
            </Navbar>
          )}
        </Container>
      </div>
      <div>
        <Container>
          <div className="m-5">
            <img
              style={{ borderRadius: "10px", width: "100%" }}
              src={Desain}
              alt=""
            />
          </div>
          <div className="m-5">
            <div>
              <h1 className="">Let's order</h1>
            </div>
            <Row>
              {dataproduct.map((item, index) => (
                <Col md={3} xs={6}
                  key={index}
                  
                >
                  <div className="cards mt-3"
                  style={{
                    borderRadius: "10px", height: "90%"
                  }}>
                  {subscribe ? (<img
                    className=""
                    src={item.image}
                    style={{ cursor: "pointer", height: "75%", width: "100%", borderRadius: "8px" }}
                    onClick={() => movetoDetail(item?.id)}
                  /> ) : (<img
                    className=""
                    src={item.image}
                    style={{ cursor: "pointer", height: "75%", width: "100%", borderRadius: "8px" }}
                    onClick={handleShowRegister}
                  />)}
                  

                  
                    <h3 className='ms-2' style={{ color: "#BD0707", fontSize: "100%" }}>
                      {item.title}
                    </h3>
                    <p className='ms-2' style={{ fontSize: "80%" }}>{convertRupiah.convert(item?.price)}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
      <Modal show={show} onHide={handleClose}>
        <div className="m-4">
          <Modal.Title>
            <h1 className="mb-4">Login</h1>
          </Modal.Title>
          <LoginAuth />

          <p className="mt-4" style={{ color: "black" }}>
            Don't have an account ? click{" "}
            <a onClick={SwitchLogin} style={{ cursor: "pointer" }}>
              <b>Here</b>
            </a>
          </p>
        </div>
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister}>
        <div className="p-2">
        
            <p>Please login or register !</p>
        
          
        </div>
      </Modal>
    </div>
  );
}

export default LandingPages;
