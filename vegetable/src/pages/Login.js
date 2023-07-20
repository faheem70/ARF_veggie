
/*import React, { useState } from 'react'
import loginSignUp from "../assest/login-animation.gif";
import { BiShow, BiHide } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({

        email: "",
        password: "",
    });
    const navigate = useNavigate()
    const userData = useSelector(state => state)

    const dispatch = useDispatch()

    const handleShowPassword = () => {
        setShowPassword((preve) => !preve);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;


        if (email && password) {

            const fetchData = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const dataRes = await fetchData.json()

            console.log(dataRes);



            //console.log(dataRes)
            //alert('Successfully');
            toast(dataRes.message)
            if (dataRes.alert) {
                dispatch(loginRedux(dataRes))
                //localStorage.setItem('token', dataRes.result.token)
                setTimeout(() => {
                    navigate("/")

                }, 1000);
            }

            console.log(userData)

        }


        else {
            alert("Please enter required field");
        }
    }
    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex  flex-col p-4'>

                <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
                    <img src={loginSignUp} className=' w-full' alt='signup' />

                </div>

                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>


                    <label htmlFor='email'>E-mail</label>
                    <input type={'email'} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange} />

                    <label htmlFor='password'>Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                        <input type={showPassword ? 'text' : 'password'} id='password' name='password' className='w-full bg-slate-200  border-none outline-none' value={data.password} onChange={handleOnChange} />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
                    </div>




                    <button className='w-full max-w-[150px] m-auto bg-blue-400 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Login</button>

                </form>
                <p className='text-left text-sm mt-3'>Don't  have  an account? <Link to={"/signup"} className='text-blue-500 underline'>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login
*/
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Row, Container, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import "../styles/cardFeature.css"
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>

            <Container style={{ width: "100%", maxWidth: "400px" }}>
                <Row>
                    <Col>
                        <div className="p-4 box">
                            <h2 className="mb-3">Welcome To Login</h2>
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
                                        Log In
                                    </Button>
                                </div>
                            </Form>
                            <hr />
                            <div>
                                <GoogleButton
                                    className="g-btn"
                                    type="dark"
                                    onClick={handleGoogleSignIn}
                                />
                            </div>
                            <Link to="/phonesignup" className="link-no-underline">
                                <div className="d-grid gap-2 mt-3">
                                    <Button variant="success" type="Submit">
                                        Sign in with Phone
                                    </Button>
                                </div>
                            </Link>
                        </div>
                        <div className="p-4 box mt-3 text-center">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </div>

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;