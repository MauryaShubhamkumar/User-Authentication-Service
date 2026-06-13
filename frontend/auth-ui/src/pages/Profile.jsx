import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/auth/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(response.data);
                setName(response.data.name);
                setPhoneNumber(response.data.phoneNumber);

            } catch (error) {
                console.log(error.response?.data);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                "http://localhost:5000/api/auth/profile",
                {
                    name,
                    phoneNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser({
                ...user,
                name,
                phoneNumber,
            });

            setIsEditing(false);

        } catch (error) {
            console.log(error.response?.data);
        }
    };

    const handleCancel = () => {
        setName(user.name);
        setPhoneNumber(user.phoneNumber);
        setIsEditing(false);
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 border rounded-lg shadow-md">

            <h2 className="text-3xl font-bold mb-6">
                Profile
            </h2>

            {!isEditing ? (
                <>
                    <p className="mb-3">
                        <strong>Name:</strong> {user.name}
                    </p>

                    <p className="mb-3">
                        <strong>Email:</strong> {user.email}
                    </p>

                    <p className="mb-3">
                        <strong>Phone:</strong> {user.phoneNumber}
                    </p>

                    <p className="mb-6">
                        <strong>Role:</strong> {user.role}
                    </p>

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-3 hover:bg-blue-600"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>

                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) =>
                                setPhoneNumber(e.target.value)
                            }
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={handleUpdate}
                        >
                            Save
                        </button>

                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;