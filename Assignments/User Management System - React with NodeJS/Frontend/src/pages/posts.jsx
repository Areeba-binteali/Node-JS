import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // your token context

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { token } = useContext(AuthContext); // token from context

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("http://localhost:3007/posts");
                const data = await res.json();

                if (res.ok) {
                    setPosts(data);
                } else {
                    setError(data.message || "Failed to fetch posts");
                }
            } catch (err) {
                setError("Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section className="main-container dashboard">
            <h1>Posts Page</h1>

            {/* Show button only if logged in */}
            {token && (
                <div className="addPost">
                    <Link to="/add-new-post" className="btn"> Add New Post</Link>
                </div>
            )}

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && posts.length === 0 && <p>No posts available</p>}

            <div className="posts-list">
                {posts.map(post => (
                    <div key={post._id} className="post-card">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>
                            By {post.author?.userName || "Unknown"} on {new Date(post.createdDate).toLocaleDateString()}
                        </small>
                        <br />
                        <small>
                            Tags: {post.tags && post.tags.length > 0 ? post.tags.join(", ") : "No tags"}
                        </small>
                    </div>
                ))}

            </div>

        </section>
    );
}
