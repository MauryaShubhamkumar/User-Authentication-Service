import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );
            localStorage.setItem(
                "role",
                response.data.role
            );
            setMessage("Login Successful");
            navigate("/profile");

        } catch (error) {

            setMessage(error.response.data.message);

        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto border border-gray-300 shadow-md" >
            <h2 className="text-2xl font-semibold mb-4" >Login Page</h2>

            <input className="border rounded px-2 py-1"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input className="border rounded px-2 py-1"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-800" onClick={handleSubmit}>
                Login
            </button>

            <p className="text-gray-700 mb-2">{message}</p>

        </div>
    );
}

export default Login;