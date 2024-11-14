



import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const MeetingRequest = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const navigate = useNavigate();

    const [visitorData, setVisitorData] = useState(null); // Initialize visitorData with null
    useEffect(() => {
        const storedVisitorData = JSON.parse(localStorage.getItem("user"));
        console.log(storedVisitorData);
        if (!storedVisitorData && !user || Object.keys(user).length === 0) {
            // Redirect to login if no user data is found
            navigate("/");
        } else {
            setVisitorData(storedVisitorData);
            if (storedVisitorData.role === "SECURITY") {
                navigate("/today-all-meetings"); // Redirect security guard to today-all-meetings
            } else if (storedVisitorData.role) { // Checks for undefined or null
                Swal.fire({
                    icon: "error",
                    title: "Unauthorized Access You Are not Visitor",
                    text: "You don't have authorization for this page",
                }).then(() => {
                    navigate("/my-meetings"); // Redirect non-security users to my-meetings
                });
            }
        }
    }, [navigate, user]);
    // Initialize visitor state only once visitorData is available
    const [visitor, setVisitor] = useState({
        name: visitorData?.name || '',
        email: visitorData?.email || '',
        phone: visitorData?.phone || '',
        meeting_time: '',
        meetingTo: user?.username || '',
        Description: '',// Ensure the case matches your database column
        meetingToName: user?.name,
    });
    // Update visitor fields once visitorData is set
    useEffect(() => {
        if (visitorData) {
            setVisitor(prevVisitor => ({
                ...prevVisitor,
                name: visitorData.name,
                email: visitorData.email,
                phone: visitorData.Phone || visitorData.phone
            }));
        }
    }, [visitorData]);

    const handleChange = (e) => {
        setVisitor({ ...visitor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/request-meeting', visitor);
            console.log(response.data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Meeting sent successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/mettings')
        } catch (error) {
            console.error("Error submitting meeting request:", error);
        } finally {
            setVisitor({});
        }
    };
    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:MM
    };
    return (
        <>

            <div className="flex justify-center items-center bg-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mt-10"
                >
                    <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Request Meeting</h2>

                    {/* Form Fields */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={visitor.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={visitor.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={visitor.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Meeting Time</label>
                        <input
                            type="datetime-local"
                            name="meeting_time"
                            onChange={handleChange}
                            required
                            min={getCurrentDateTime()}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Description</label>
                        <textarea
                            name="Description"
                            placeholder="Meeting Purpose"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Request Meeting
                    </button>
                </form>
            </div>
        </>

    );
};

export default MeetingRequest;
