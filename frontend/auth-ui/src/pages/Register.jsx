import { useState } from "react";
import axios from "axios"; 



function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    // console.log(name);

    const handleSubmit = async () => {
        try{
            const response= await axios.post(
            "http://localhost:5000/api/auth/register",
            { name, email,phoneNumber, password }
        );
        setMessage("User Registered Successfully");
        }catch(error){
            setMessage(error.response.data.message);
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto border border-gray-300 shadow-md" >
            <h2 className="text-2xl font-semibold mb-4" >Register Page</h2>

            <input className="border rounded px-2 py-1"   
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

            <input className="border rounded px-2 py-1" 
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input className="border rounded px-2 py-1" 
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <br /><br />

            <input className="border rounded px-2 py-1" 
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />
            

            <button className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-800"
            onClick={handleSubmit}>
                Register
            </button>
            <br />
            <p className="text-gray-700 mb-2">{message}</p>
        </div>
    );
}



export default Register;