/*import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
//import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: ""
  });

    const handleShowPassword = () => {
        setShowPassword((preve) => !preve);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((preve) => !preve);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    const handleUploadProfileImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])


      setData((preve) => {
          return {
              ...preve,
              image: data
          }
      })

    }
    console.log(process.env.REACT_APP_SERVER_DOMIN)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, email, password, confirmPassword } = data;
        if (firstName && email && password && confirmPassword) {

            if (password === confirmPassword) {

          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
              method: "POST",
              headers: {
                  "content-type": "application/json;charset=UTF-8"
              },
              body: JSON.stringify(data)
          })

          const dataRes = await fetchData.json()


          // alert(dataRes.message);
          toast(dataRes.message)
              if (dataRes.alert) {
                  navigate("/login");
              }

          } else {
              alert("password and confirm password not equal");
          }
      } else {
          alert("Please Enter required fields");
      }
  };

    return (
        <div className="p-3 md:p-4">
            <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
             
              <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
                  <img src={data.image ? data.image : loginSignupImage} className="w-full h-full" />

                  <label htmlFor="profileImage">
                      <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                          <p className="text-sm p-1 text-white">Upload</p>
                      </div>
                      <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage} />
                  </label>
              </div>

              <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                      type={"text"}
                      id="firstName"
                      name="firstName"
                      className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                      value={data.firstName}
                      onChange={handleOnChange}
                  />

                  <label htmlFor="lastName">Last Name</label>
                  <input
                      type={"text"}
                      id="lastName"
                      name="lastName"
                      className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                      value={data.lastName}
                      onChange={handleOnChange}
                  />

                  <label htmlFor="email">Email</label>
                  <input
                      type={"email"}
                      id="email"
                      name="email"
                      className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                      value={data.email}
                      onChange={handleOnChange}
                  />

                  <label htmlFor="password">Password</label>
                  <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                      <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className=" w-full bg-slate-200 border-none outline-none "
                          value={data.password}
                          onChange={handleOnChange}
                      />
                      <span
                          className="flex text-xl cursor-pointer"
                          onClick={handleShowPassword}
                      >
                          {showPassword ? <BiShow /> : <BiHide />}
                      </span>
                  </div>

                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
                      <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmpassword"
                          name="confirmPassword"
                          className=" w-full bg-slate-200 border-none outline-none "
                          value={data.confirmPassword}
                          onChange={handleOnChange}
                      />
                      <span
                          className="flex text-xl cursor-pointer"
                          onClick={handleShowConfirmPassword}
                      >
                          {showConfirmPassword ? <BiShow /> : <BiHide />}
                      </span>
                  </div>

                  <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                      Sign up
                  </button>
              </form>
              <p className="text-left text-sm mt-2">
                  Already have account ?{" "}
                  <Link to={"/login"} className="text-red-500 underline">
                      Login
                  </Link>
              </p>
          </div>
      </div>
  );
}

export default Signup;
*/
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Container style={{ width: "400px" }}>
                <Row>
                    <Col>
                        <div className="p-4 box">
                            <h2 className="mb-3">Welcome To Signup</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email address"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="Submit">
                                        Sign up
                                    </Button>
                                </div>
                            </Form>
                        </div>
                        <div className="p-4 box mt-3 text-center">
                            Already have an account? <Link to="/login">Log In</Link>
                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default Signup;