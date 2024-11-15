
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import formatMeetingTime from "../FormatDate";
import Swal from "sweetalert2";

import kritigrp from "../assets/Image/KRITI group.png"

function SecurityGard() {
    const [isDropdownOpen, setisDropdownOpen] = useState(false)
    const [meetings, setMeetings] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [firstLetter, setFirstLetter] = useState("")
    const navigate = useNavigate();

    // Check user role on component mount
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        // console.log(user);


        if (!user || user.role !== "security" && user.role !== "SECURITY") {
            Swal.fire({
                icon: "warning",
                title: "Unauthorized Access",
                text: "You are not an authenticated person.",
            }).then(() => {
                navigate("/login"); // Redirect to login or any other route
            });
        } else {
            setFirstLetter(user.username.charAt(0))
            fetchData(); // Fetch data only if the user is authorized
        }
    }, [navigate]);

    const fetchData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/TodayAllMeetings`
            );
            setMeetings(res.data);
        } catch (error) {
            console.error("Error fetching visitor details:", error);
        }
        // console.log(meetings);

    };

    const isToday = (date) => {
        const meetingDate = new Date(date).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);
        return meetingDate === today;
    };

    const toggleDropdown = () => {
        setisDropdownOpen(!isDropdownOpen)
    }

    return (
        <>

            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Hamburger icon positioned on the left */}
                        <div className="-ml-2 flex sm:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg
                                    className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Brand or logo */}

                        <div className="hidden sm:flex items-center">
                            <img className='h-20' src={kritigrp} />
                        </div>


                        {/* Centered links for larger screens */}
                        <div className="hidden sm:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link onClick={fetchData} className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Pending Meetings</Link>
                                <Link onClick={fetchData} className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Today schedule</Link>
                                <Link to='/scan' className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Scan</Link>
                            </div>
                        </div>

                        {/* User profile and notifications for larger screens */}
                        <div className=" sm:block">
                            <div className="ml-4 flex items-center md:ml-6">
                            </div>
                        </div>
                        <div className='flex' >
                            <button
                                type="button"

                                className="relative p-1 rounded-full cursor-pointer text-gray-600 hover:text-gray-800"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>

                            </button>
                            <div className="ml-3 relative" onClick={toggleDropdown}>
                                <button className="max-w-xs bg-gray-300 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">Open user menu</span>
                                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                                        {firstLetter}
                                    </div>
                                </button>
                            </div>
                            {isDropdownOpen && (
                                <div className={`absolute right-0 mt-8 w-48 bg-white text-black rounded-lg shadow-lg p-2 z-10 ease-in-out transition-transform duration-500 `} // Increased duration
                                    style={{ transform: isDropdownOpen ? 'translateY(20px)' : 'translateY(0)', opacity: isDropdownOpen ? 1 : 0 }}>
                                    <ul>
                                        <li className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                                        <li onClick={() => navigate('/reset-password')} className="p-2 hover:bg-gray-100 cursor-pointer">Change Password</li>
                                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                                            localStorage.clear();
                                            navigate('/login')
                                            // Redirect to login page if needed
                                        }}>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                {/* Mobile menu */}
                <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link onClick={fetchData} className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">Pending Meetings</Link>
                        <Link onClick={fetchData} className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"> Today schedule </Link>
                        <Link to='/scan' className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">Scan</Link>
                    </div>
                </div>

            </nav>
            <div className="w-full flex justify-center items-center mt-10  ">
                <div className="w-full max-w-7xl">
                    <h4 className="text-2xl text-center mb-4">Visitor Details</h4>
                    <div className="relative overflow-x-auto">
                        {meetings && meetings.length > 0 ? (
                            <table className="table w-full border border-gray-300 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Description</th>
                                        <th scope="col" className="px-6 py-3">From</th>
                                        <th scope="col" className="px-6 py-3">Time</th>

                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {meetings.map((meeting) => (
                                        <tr
                                            key={meeting.id}
                                            className={`text-center ${meeting.view_By_user === false ||
                                                meeting.view_By_user === 0
                                                ? "bg-gray-100"
                                                : "bg-white"
                                                } 
                                                        ${meeting.status ===
                                                    "PENDING" &&
                                                    isToday(
                                                        meeting.meeting_time
                                                    )
                                                    ? "bg-sky-100 shadow"
                                                    : ""
                                                } 
                                                        border-b `}
                                        >
                                            <td>{meeting.name}</td>
                                            <td>{meeting.email}</td>
                                            <td>{meeting.status}</td>
                                            <td>{meeting.Description}</td>
                                            <td>{meeting.visitorCompany}</td>
                                            <td>{formatMeetingTime(meeting.meeting_time)}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No Meetings available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SecurityGard;

