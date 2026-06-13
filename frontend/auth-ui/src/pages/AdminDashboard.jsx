import { useState, useEffect } from "react";
import axios from "axios";
function AdminDashboard() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/admin/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUsers(response.data.users);
                setLoading(false);

            } catch (error) {

                console.log(error.response?.data);
                setLoading(false);

            }
        };

        fetchUsers();

    }, []);
    if (loading) {
        return <h2>Loading Users...</h2>;
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this user?")) {
            return;
        }
        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/admin/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== id)
            );

        } catch (error) {

            console.log(error.response?.data);

        }
    };

    const handleRoleChange = async (id, newRole) => {

        try {

            const token = localStorage.getItem("token");

            await axios.patch(
                `http://localhost:5000/api/admin/users/${id}/role`,
                {
                    role: newRole
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(
                users.map((user) =>
                    user._id === id
                        ? { ...user, role: newRole }
                        : user
                )
            );

        } catch (error) {

            console.log(error.response?.data);

        }
    };
    const filteredUsers = users.filter(
        (user) =>
            user.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            user.email
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    const totalUsers = users.length;

    const totalAdmins = users.filter(
        (user) => user.role === "admin"
    ).length;

    const totalRegularUsers = users.filter(
        (user) => user.role === "user"
    ).length;
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">

                <div className="bg-blue-500 text-white p-4 rounded">
                    <h3>Total Users</h3>
                    <p className="text-2xl font-bold">
                        {totalUsers}
                    </p>
                </div>

                <div className="bg-green-500 text-white p-4 rounded">
                    <h3>Total Admins</h3>
                    <p className="text-2xl font-bold">
                        {totalAdmins}
                    </p>
                </div>

                <div className="bg-purple-500 text-white p-4 rounded">
                    <h3>Regular Users</h3>
                    <p className="text-2xl font-bold">
                        {totalRegularUsers}
                    </p>
                </div>

            </div>
            <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
            />

            <table className="w-full border border-gray-300 shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border-b border-gray-300 text-left">Name</th>
                        <th className="p-3 border-b border-gray-300 text-left">Email</th>
                        <th className="p-3 border-b border-gray-300 text-left">Phone</th>
                        <th className="p-3 border-b border-gray-300 text-left">Role</th>
                        <th className="border p-3 text-left">
                            Joined On
                        </th>
                        <th className="p-3 border-b border-gray-300 text-left">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                            <td className="p-3 border-b border-gray-300">{user.name}</td>
                            <td className="p-3 border-b border-gray-300">{user.email}</td>
                            <td className="p-3 border-b border-gray-300">{user.phoneNumber}</td>

                            <td className="p-3 border-b border-gray-300">
                                <select className="border rounded px-2 py-1"
                                    value={user.role}
                                    onChange={(e) =>
                                        handleRoleChange(
                                            user._id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="user">
                                        User
                                    </option>

                                    <option value="admin">
                                        Admin
                                    </option>
                                </select>
                            </td>
                            <td className="text-left">
                                {new Date(user.createdAt).toLocaleString()}
                            </td>
                            <td >
                                <button className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-800"
                                    onClick={() =>
                                        handleDelete(user._id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;