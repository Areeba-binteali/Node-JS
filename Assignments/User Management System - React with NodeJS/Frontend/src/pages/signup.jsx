import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function SignUp() {
    const { setToken } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        userName: "",
        emailAddress: "",
        password: "",
        dob: "",
        age: ""
    });

    const [serverMessage, setServerMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const res = await fetch("http://localhost:3007/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                // localStorage.setItem("token", data.token);
                setServerMessage(data.message);
                setError("");
                setLoading(false);
                setToken(data.token);
                navigate("/dashboard", {
                    state: {
                        userName: data.userName,
                        message: data.message,
                        description: data.description
                    }
                });

            } else {
                setError(data.message);
                setServerMessage("");
                setLoading(false);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <section className="main-container login-signup">
            <div className="form-login">
                <div className="contactForm loginForm">
                    <h2 className="loginHeadeing">Create Account</h2>
                    <form onSubmit={handleSubmit} className="formContact">
                        <div className="inputGroup">
                            <input
                                type="text"
                                id="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className="formInput"
                                placeholder=" "
                            />
                            <label htmlFor="userName" className="inputLabel">
                                Full Name
                            </label>
                        </div>
                        <div className="inputGroup">
                            <input
                                type="email"
                                id="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleChange}
                                className="formInput"
                                placeholder=" "
                            />
                            <label htmlFor="emailAddress" className="inputLabel">
                                Email Address
                            </label>
                        </div>
                        <div className="inputGroup">
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="formInput"
                                placeholder=" "
                            />
                            <label htmlFor="password" className="inputLabel">
                                Password
                            </label>
                        </div>
                        <div className="signUpRow">
                            <div className="inputGroup">
                                <input
                                    type="date"
                                    id="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="formInput"
                                    placeholder=" "
                                />
                                <label htmlFor="dob" className="inputLabel">
                                    Date of Birth
                                </label>
                            </div>
                            <div className="inputGroup">
                                <input
                                    type="number"
                                    id="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="formInput"
                                    placeholder=" "
                                />
                                <label htmlFor="age" className="inputLabel">
                                    Age
                                </label>
                            </div>
                        </div>
                        <div className="submitButton">
                            <div className="login-text">
                                <p className="linkToAccount">
                                    Already have an account?{" "}
                                    <a href="/login" className="signupLoginLink">
                                        Login
                                    </a>
                                </p>
                                <p> {serverMessage && <p style={{ color: "green" }}>{serverMessage}</p>}
                                    {error && <p style={{ color: "red" }}>{error}</p>}</p>
                            </div>
                            <input
                                type="submit"
                                className="btn"
                                value={loading ? "Loading..." : "Sign Up"}
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
