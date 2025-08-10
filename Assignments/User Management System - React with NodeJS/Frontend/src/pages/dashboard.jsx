import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [msgData, setMsgData] = useState(location.state || {});

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await fetch("http://localhost:3007/verify-user", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } catch (err) {
                console.error(err);
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        verifyUser();
    }, [navigate]);

    return (
        <section className="main-container dashboard">
            <h1>{msgData.message}</h1>
            <p>{msgData.description}</p>
        </section>
    );
}
