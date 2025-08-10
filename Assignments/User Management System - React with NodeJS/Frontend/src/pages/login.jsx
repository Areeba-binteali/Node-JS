import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:3007/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                setToken(data.token);
                // Redirect to dashboard
                navigate("/dashboard", {
                    state: {
                        userName: data.userName,
                        message: data.message,
                        description: data.description
                    }
                });
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="main-container login-signup">
            <div className="form-login">
                <div className="contactForm loginForm">
                    <h2 className="loginHeadeing">Login to your Account</h2>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <form onSubmit={handleSubmit} className="formContact">
                        <div className="inputGroup">
                            <input
                                type="email"
                                id="email"
                                className="formInput"
                                placeholder=" "
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email" className="inputLabel">Email Address</label>
                        </div>
                        <div className="inputGroup">
                            <input
                                type="password"
                                id="password"
                                className="formInput"
                                placeholder=" "
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className="inputLabel">Password</label>
                        </div>
                        <div className="submitButton">
                            <p className="linkToAccount">Don't have an account? <a href="/sign-up" className="signupLoginLink">Create One</a></p>
                            <input type="submit" className='btn' value={loading ? "Loading..." : "Login"} />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
