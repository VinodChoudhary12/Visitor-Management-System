


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisitorNavbar from "./VisitorNavbar";
import defaultImage from "../assets/Image/user.png";

function Users() {
    const [users, setUsers] = useState([]);         // All users
    const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users based on input
    const [location, setLocation] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers(); // Fetch all users once on component load
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/users");
            setUsers(res.data);
            setFilteredUsers(res.data); // Initially, show all users
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
        setLocation(selectedLocation);
        filterUsers(username, selectedLocation); // Filter users based on username and location
    };

    const handleUsernameChange = (e) => {
        console.log(e.target.value);
        // alert(username)
        const enteredUsername = e.target.value;
        setUsername(enteredUsername);
        filterUsers(enteredUsername, location); // Filter users based on username and location

    };

    // Filter the users locally based on username and location
    const filterUsers = (username, location) => {
        let filtered = users;

        if (username) {
            filtered = filtered.filter(user => user.name.toLowerCase().includes(username.toLowerCase()));
        }
        if (location) {
            filtered = filtered.filter(user => user.location === location);
        }

        setFilteredUsers(filtered); // Set filtered users
    };

    const userData = (user) => {
        navigate("/meeting-request", { state: { user } });
    };

    return (
        <>
            <VisitorNavbar />
            <div className="mt-3 px-4 cursor-pointer">
                <h2 className="text-2xl text-center mb-4 font-bold text-blue-500">User List</h2>
                <div className="flex lg:justify-center lg:gap-3 gap-3   mb-4 w-full">
                    {/* Username Search */}
                    <input
                        type="text"
                        placeholder="Search by Username"

                        value={username}
                        //onKeyUp={handleUsernameChange}
                        onChange={handleUsernameChange} // Filter users based on input change
                        className="px-3 py-2 border rounded w-1/2 lg:w-1/4"
                    />

                    {/* Location Dropdown */}
                    <select
                        value={location}
                        onChange={handleLocationChange} // Filter users based on location selection
                        className="px-3 py-2 border rounded  w-1/2 lg:w-1/4"
                    >
                        <option value="">Filter by Location</option>
                        <option value="Indore">Indore</option>
                        <option value="Pithampur">Pithampur</option>
                        <option value="Dewas">Dewas</option>
                    </select>
                </div>
                {
                    filteredUsers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mt-1 gap-6 content-center ">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => userData(user)}
                                    className="h-auto gap-6 flex items-center justify-center mt-5 "
                                >
                                    <div className="bg-gray-100  relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={user.image || defaultImage}
                                                alt="User"
                                                className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                                            />
                                            <div className="w-fit transition-all transform duration-500">
                                                <h1 className="text-gray-600  font-bold">
                                                    {user.name || 'Default Name'}
                                                </h1>
                                                <p className="text-gray-400">{user.role || 'User Role'}</p>
                                                <a
                                                    href={`mailto:${user.username}`}
                                                    className="text-xs text-gray-500  group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500"
                                                >
                                                    {user.username || 'user@example.com'}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-3">
                                            <div>Location</div>
                                            <div>{user.location || 'Unknown Location'}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="m-auto">No users found</p>
                    )
                }
            </div>




            <section className="py-24 cursor-pointer ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h2 className="font-manrope text-5xl text-center font-bold text-gray-900 mb-6">Meet the Team</h2>
                        <p className="text-lg text-gray-500 text-center">These people work on making our company the best.</p>
                    </div>
                    {filteredUsers.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-6"> {/* Flexbox container */}
                            {filteredUsers.map((user) => {
                                return (
                                    <div key={user.id} onClick={() => userData(user)} className="group block text-center w-64">
                                        <div className="relative mb-5">
                                            <img src={user.image || defaultImage} alt={user.name} className="w-28 h-28 rounded-2xl object-cover mx-auto transition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600" />
                                        </div>
                                        <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">{user.name || 'User Name'}</h4>
                                        <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">{user.role || 'User Role'}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="m-auto">No User Found</p>
                    )}
                </div>
            </section>



        </>
    );
}
export default Users;
