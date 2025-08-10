import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AddNewPost() {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tagsArray = formData.tags
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean);

        try {
            const res = await fetch("http://localhost:3007/add-new-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    content: formData.content,
                    tags: tagsArray
                })
            });

            const data = await res.json();
            console.log("Response status:", res.status);
            console.log("Response data:", data);

            if (res.ok) {
                setMessage("Post created successfully!");
                setFormData({ title: "", content: "", tags: "" }); // reset form data
            } else {
                setMessage(data.message || "Error occurred");
            }
        } catch (err) {
            setMessage("Something went wrong.");
        }
    };


    if (!token) return <p>Please login to add new posts.</p>;

    return (
        <section className="main-container login-signup">
            <div className="form-login">
                <div className="contactForm loginForm">
                    <h2 className="loginHeadeing">Add New Post</h2>
                    <form onSubmit={handleSubmit} className="formContact">
                        <div className="inputGroup">
                            <input
                                type="text"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="formInput"
                                placeholder=" "
                                required
                            />
                            <label htmlFor="title" className="inputLabel">
                                Post Title
                            </label>
                        </div>
                        <div className="inputGroup">
                            <textarea
                                id="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="formInput"
                                placeholder=" "
                                required
                                rows={5}
                                style={{ resize: "vertical" }}
                            />
                            <label htmlFor="content" className="inputLabel">
                                Post Content
                            </label>
                        </div>
                        <div className="inputGroup">
                            <input
                                type="text"
                                id="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="formInput"
                                placeholder=" "
                            />
                            <label htmlFor="tags" className="inputLabel">
                                Tags (comma separated)
                            </label>
                        </div>
                        <div className="submitButton">
                            <button type="submit" className="btn">
                                Create Post
                            </button>
                            {message && <p style={{ marginTop: "10px" }}>{message}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
