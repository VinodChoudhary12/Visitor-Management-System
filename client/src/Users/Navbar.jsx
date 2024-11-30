
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import kritigrp from "../assets/Image/KRITI group.png"
import formatMeetingTime from '../FormatDate';
export default function Navbar() {
    const [isDropdownOpen, setisDropdownOpen] = useState(false)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [meetingsNumber, setMeetingsNumbers] = useState();
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [firstLetter, setFirstLetter] = useState("")
    const navigate = useNavigate()

    const fetchData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate('/login')
        }
        try {
            const res = await axios.get(`http://localhost:5000/bellIcon/${user.username}`);
            setMeetingsNumbers(res.data.length);
            setFirstLetter(user.username.charAt(0).toUpperCase());
            if (meetingsNumber != 0) {
                setNotifications(res.data)
            }

        } catch (error) {
            console.error('Error fetching visitor details:', error);
        }
    };
    useEffect(() => {
        fetchData();


    });
    const toggleSlider = () => {
        setIsSliderOpen(!isSliderOpen);
        if (!isSliderOpen) fetchData() // Fetch notifications when opening
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
                                <Link to='/pending' className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Pending Meetings</Link>
                                <Link to='/today-meetings' className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Today schedule</Link>
                                <Link to='/my-meetings' className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">My Meetings</Link>
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
                                onClick={() => { toggleSlider(); setMeetingsNumbers() }}
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
                                {meetingsNumber > 0 && (
                                    <div className="absolute top-0 right-0 translate-x-1 -translate-y-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full ">
                                        {meetingsNumber}
                                    </div>
                                )}
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
                                        <li onClick={() => navigate('/UpdateProfile')} className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
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
                        <Link to='/pending' className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">Pending Meetings</Link>
                        <Link to='/today-meetings' className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"> Today schedule </Link>
                        <Link to='/my-meetings' className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">My Meetings</Link>
                    </div>
                </div>
                {isSliderOpen && (
                    <div className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:w-1/3 w-full h-full bg-white shadow-lg p-4 overflow-y-auto z-20 mx-auto sm:mx-0">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
                            <button onClick={() => { setIsSliderOpen(false); setNotifications([]); setMeetingsNumbers() }} className="text-2xl font-semibold mb-4">X</button>
                        </div>

                        {/* <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 border-b">Name</th>
                                    <th className="py-2 border-b">Email</th>
                                    <th className="py-2 border-b">Phone</th>
                                    <th className="py-2 border-b">Meeting Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <tr key={notification.id}>
                                            <td className="py-2 border-b">{notification.name}</td>
                                            <td className="py-2 border-b">{notification.email}</td>
                                            <td className="py-2 border-b">{notification.phone}</td>
                                            <td className="py-2 border-b">{notification.meeting_time}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="py-2" colSpan="4">No new notifications</td>
                                    </tr>
                                )}
                            </tbody>
                        </table> */}
                        {
                            notifications.length > 0 ? ((notifications.map((not) => (
                                <div key={not.id} className="flex justify-between hover:underline cursor-pointer p-4" >

                                    {`${not.name}  From  ${not.visitorCompany}  Want's  to  Meet  You  at  ${formatMeetingTime(not.meeting_time)} `}


                                </div>)))) : (<div>No new notifications</div>)
                        }

                    </div>
                )}
            </nav>
        </>

    )
}


