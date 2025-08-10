import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Login from "./pages/login";
import "./App.css"
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Post from "./pages/posts";
import ProtectedRoute from "./components/protectedRoutes";
import AddNewPost from "./pages/addNewPost";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/posts" element={<Post />} />
        <Route path="/add-new-post" element={<ProtectedRoute><AddNewPost /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
