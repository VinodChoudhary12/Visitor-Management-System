


import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import formatMeetingTime from "../FormatDate";

function UserTodayMeet() {
    const [meetings, setMeetings] = useState([]);
    // const [textbarOpen, setTextbarOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [activeMeetingId, setActiveMeetingId] = useState(null);

    const fetchData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        try {
            const res = await axios.get(`http://localhost:5000/todayUserMeetings/${user.username}`);
            setMeetings(res.data);
        } catch (error) {
            console.error("Error fetching visitor details:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const changeStatus = async (meetingId, newStatus) => {
        // Find the meeting with the provided ID to check the current status
        const meeting = meetings.find((m) => m.id === meetingId);

        if (!meeting) {
            Swal.fire({
                icon: "error",
                title: "Meeting not found",
                text: "The specified meeting does not exist.",
            });
            return;
        }

        // Check if the current status matches the new status
        if (meeting.status === newStatus) {
            Swal.fire({
                icon: "warning",
                title: `Status is already ${newStatus}`,
                text: `The visitor status is already ${newStatus}. No changes were made.`,
            });
            return; // Exit the function if the status is the same
        }

        // Check for description before rejecting
        if (newStatus === "REJECTED" && !description.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Please enter a remark",
                text: "A remark is required to reject the visitor.",
            });
            return;
        }

        // Proceed to update status if all conditions are met
        try {
            await axios.post(`http://localhost:5000/approve/${meetingId}`, {
                status: newStatus,
                remark_By_User: description,
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Visitor status updated to ${newStatus}`,
                showConfirmButton: false,
                timer: 1500
            });
            setMeetings((prevMeetings) =>
                prevMeetings.map((meeting) =>
                    meeting.id === meetingId ? { ...meeting, status: newStatus } : meeting
                )
            );
            // Reset state after updating
            setActiveMeetingId(null);
            setDescription("");
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-full flex justify-center items-center mt-6">
                <div className="w-full max-w-7xl">
                    <h4 className="text-2xl text-center mb-4">Visitor Details</h4>
                    <div className="relative overflow-x-auto">
                        {meetings && meetings.length > 0 ? (
                            <table className="table w-full border border-gray-300">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Description</th>
                                        <th scope="col" className="px-6 py-3">From</th>
                                        <th scope="col" className="px-6 py-3">Time</th>
                                        <th scope="col" className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                {/* <tbody className="text-sm">
                                    {meetings.map((meeting) => (
                                        <tr key={meeting.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                                            <td>{meeting.name}</td>
                                            <td>{meeting.email}</td>
                                            <td>{meeting.status}</td>
                                            <td>{meeting.Description}</td>
                                            <td>{meeting.meeting_time}</td>
                                            <td className="flex justify-evenly">
                                                <button
                                                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2.5 py-1 text-center me-1 mb-2"
                                                    onClick={() => changeStatus(meeting.id, "APPROVED")}
                                                >
                                                    Approve
                                                </button>
                                                {activeMeetingId === meeting.id ? (
                                                    <>
                                                        <input
                                                            className="border border-slate-600 ml-2"
                                                            placeholder="Enter reason for rejection"
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            value={description}
                                                            required
                                                        />
                                                        <button
                                                            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1 text-center me-2 mb-2"
                                                            onClick={() => changeStatus(meeting.id, "REJECTED")}
                                                        >
                                                            Confirm Reject
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2.5 py-1 text-center me-2 mb-2"
                                                        onClick={() => setActiveMeetingId(meeting.id)}
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> */}
                                <tbody className="text-sm">
                                    {meetings.map((meeting) => (
                                        <tr
                                            key={meeting.id}
                                            className={`text-center ${meeting.view_By_user === false || meeting.view_By_user === 0 ? 'bg-gray-100' : 'bg-white'} border-b `}
                                        >
                                            <td>{meeting.name}</td>
                                            <td>{meeting.email}</td>
                                            <td>{meeting.status}</td>
                                            <td>{meeting.Description}</td>
                                            <td>{meeting.visitorCompany}</td>
                                            <td>{formatMeetingTime(meeting.meeting_time)}</td>
                                            {/* <td className="flex justify-evenly">
                                                <button
                                                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-2.5 py-1 text-center me-1 mb-2"
                                                    onClick={() => changeStatus(meeting.id, "APPROVED")}
                                                >
                                                    Approve
                                                </button>
                                                {activeMeetingId === meeting.id ? (
                                                    <>
                                                         <button
                                                            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2.5 py-1 text-center me-2 mb-2"
                                                            onClick={() => changeStatus(meeting.id, "REJECTED")}
                                                            disabled={["CHECKED_IN", "CHECKED_OUT", "CANCELED"].includes(meeting.status)}
                                                        >
                                                            Confirm Reject
                                                        </button>
                                                        <input
                                                            className="border rounded border-slate-600 ml-2 mr-2 h-auto"
                                                            placeholder="Enter reason for rejection"
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            value={description}
                                                            required
                                                        />
                                                    </>
                                                ) : (
                                                    <button
                                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm px-2.5 py-1 text-center me-2 mb-2"
                                                        onClick={() => setActiveMeetingId(meeting.id)}
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                            </td> */}
                                            <td className="flex justify-evenly">
                                                {/* Approve button with conditional disable */}
                                                <button
                                                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2.5 py-1 text-center me-1 mb-2"
                                                    onClick={() => changeStatus(meeting.id, "APPROVED")}
                                                    disabled={["CHECKED_IN", "CHECKED_OUT", "CANCELED"].includes(meeting.status)}
                                                >
                                                    Approve
                                                </button>

                                                {/* Reject button with conditional disable and additional logic */}
                                                {activeMeetingId === meeting.id ? (
                                                    <>
                                                        <input
                                                            className="border border-slate-600 ml-2"
                                                            placeholder="Enter reason for rejection"
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            value={description}
                                                            required
                                                        />
                                                        <button
                                                            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1 text-center me-2 mb-2"
                                                            onClick={() => changeStatus(meeting.id, "REJECTED")}
                                                            disabled={["CHECKED_IN", "CHECKED_OUT", "CANCELED"].includes(meeting.status)}
                                                        >
                                                            Confirm Reject
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1 text-center me-2 mb-2"
                                                        onClick={() => setActiveMeetingId(meeting.id)}
                                                        disabled={["CHECKED_IN", "CHECKED_OUT", "CANCELED"].includes(meeting.status)}
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                            </td>
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
export default UserTodayMeet;

