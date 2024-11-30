

// import axios from "axios";
// import { useEffect, useState } from "react";
// import VisitorNavbar from "./VisitorNavbar";
// import { useNavigate } from "react-router-dom";
// import formatMeetingTime from "../FormatDate";
// import Swal from "sweetalert2";
// import Footer from "../Footer";

// function VisitorMeetings() {
//     const [meetings, setMeetings] = useState([]);
//     const navigate = useNavigate()


//     useEffect(() => {
//         const visitor = JSON.parse(localStorage.getItem("user"));
//         async function fetchData(visitor) {
//             try {
//                 const res = await axios.get(`http://localhost:5000/VisitorMettings/${visitor.email}`);
//                 // console.log(res.data);
//                 setMeetings(res.data);
//                 if (res.status == 404) {
//                     Swal.fire({
//                         icon: "warning",
//                         title: `Mettings Not Found `,
//                         text: `You Have to Make Apoinment First`,
//                     });
//                     navigate('/meeting-request')
//                 }

//             } catch (error) {
//                 console.error("Error fetching meetings:", error);
//             }
//         }
//         if (visitor) {
//             fetchData(visitor);
//         }
//         else {
//             navigate("/signup");
//         }
//     }, [navigate]);

//     // Function to determine the border color based on status
//     const getStatusBorderColor = (status) => {
//         switch (status) {
//             case "PENDING":
//                 return "border-yellow-300";
//             case "APPROVED":
//                 return "border-green-300";
//             case "REJECTED":
//                 return "border-orange-400";
//             default:
//                 return "border-gray-200";
//         }
//     };

//     return (
//         <>
//             <VisitorNavbar />
//             {
//                 meetings.length > 0 ? (<div className="grid lg:grid-cols-4 gap-5 p-10 cursor-pointer">
//                     {meetings.map((meeting, index) => (
//                         <div
//                             key={index}
//                             onClick={() => navigate(`/QR/${meeting.id}`)}
//                             className={`bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4 border-4 ${getStatusBorderColor(meeting.status)}`}
//                         >
//                             <div className="p-6">
//                                 <h3 className="text-lg font-semibold">{formatMeetingTime(meeting.meeting_time)}</h3>
//                                 <div className="flex justify-between">
//                                     <p className="mt-2 text-sm text-gray-500 leading-relaxed">
//                                         {meeting.Description || "No description provided."}
//                                     </p>
//                                 </div>

//                                 <div className="flex justify-between items-center  w-full mt-3">
//                                     <p className="mt-2 text-sm text-gray-700 leading-relaxed">Status : </p>
//                                     <p className="mt-2 text-sm text-gray-700 leading-relaxed font-semibold ">
//                                         {meeting.status || "No description provided."}
//                                     </p>

//                                 </div>
//                                 <div className="flex justify-between items-center w-full mt-3">
//                                     <div className="mt-2 text-sm text-gray-700 leading-relaxed  ">
//                                         Meeting To  :
//                                     </div>
//                                     <p className="font-semibold text-center mt-2">{meeting.meetingToName || meeting.meetingTo}</p>

//                                 </div>

//                                 <div className="grid lg:grid-cols-1 gap-3  mt-2">
//                                     <button
//                                         type="button"
//                                         className="mt-4 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700"
//                                     // onClick={() => navigate(`/meeting/${meeting.id}`, { state: { notification: meeting } })}

//                                     >
//                                         View
//                                     </button>
//                                     {meeting.remark_By_User ? (
//                                         <span className="text-balance   text-center">{meeting.remark_By_User}</span>
//                                     ) : (
//                                         <p></p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>) :
//                     (
//                         <div className="lg:text-2xl text-wrap text-center flex justify-center items-center  ">
//                             You Dont Have Any Meeting
//                         </div>
//                     )
//             }
//             {
//                 meetings.length > 0 ? (<Footer />) : (<div className="bottom-0 fixed">
//                     <Footer />
//                 </div>)
//             }



//         </>
//     );
// }

// export default VisitorMeetings;

import axios from "axios";
import { useEffect, useState } from "react";
import VisitorNavbar from "./VisitorNavbar";
import { useNavigate } from "react-router-dom";
import formatMeetingTime from "../FormatDate";
import Swal from "sweetalert2";
import Footer from "../Footer";

function VisitorMeetings() {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        const visitor = JSON.parse(localStorage.getItem("user"));

        async function fetchData(visitor) {
            try {
                setLoading(true); // Start loading
                const res = await axios.get(
                    `http://localhost:5000/VisitorMettings/${visitor.email}`
                );

                setMeetings(res.data);
                if (res.status === 404) {
                    Swal.fire({
                        icon: "warning",
                        title: `Meetings Not Found`,
                        text: `You have to make an appointment first.`,
                    });
                    navigate("/meeting-request");
                }
            } catch (error) {
                console.error("Error fetching meetings:", error);
            } finally {
                setLoading(false); // End loading
            }
        }

        if (visitor) {
            fetchData(visitor);
        } else {
            navigate("/signup");
        }
    }, [navigate]);

    // Function to determine the border color based on status
    const getStatusBorderColor = (status) => {
        switch (status) {
            case "PENDING":
                return "border-yellow-300";
            case "APPROVED":
                return "border-green-300";
            case "REJECTED":
                return "border-orange-400";
            default:
                return "border-gray-200";
        }
    };

    return (
        <>
            <VisitorNavbar />
            {loading ? (
                <div className="flex min-h-screen items-center justify-center bg-white">

                </div>
            ) : meetings.length > 0 ? (
                <div className="grid lg:grid-cols-4 gap-5 p-10 cursor-pointer">
                    {meetings.map((meeting, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/QR/${meeting.id}`)}
                            className={`bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4 border-4 ${getStatusBorderColor(
                                meeting.status
                            )}`}
                        >
                            <div className="p-6">
                                <h3 className="text-lg font-semibold">
                                    {formatMeetingTime(meeting.meeting_time)}
                                </h3>
                                <div className="flex justify-between">
                                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                        {meeting.Description || "No description provided."}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center  w-full mt-3">
                                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                                        Status :
                                    </p>
                                    <p className="mt-2 text-sm text-gray-700 leading-relaxed font-semibold ">
                                        {meeting.status || "No description provided."}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center w-full mt-3">
                                    <div className="mt-2 text-sm text-gray-700 leading-relaxed  ">
                                        Meeting To :
                                    </div>
                                    <p className="font-semibold text-center mt-2">
                                        {meeting.meetingToName || meeting.meetingTo}
                                    </p>
                                </div>

                                <div className="grid lg:grid-cols-1 gap-3  mt-2">
                                    <button
                                        type="button"
                                        className="mt-4 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700"
                                    >
                                        View
                                    </button>
                                    {meeting.remark_By_User ? (
                                        <span className="text-balance   text-center">
                                            {meeting.remark_By_User}
                                        </span>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="lg:text-2xl text-wrap text-center flex justify-center items-center">
                    You Don’t Have Any Meeting
                </div>
            )}
            {meetings.length > 0 ? (
                <Footer />
            ) : (
                <div className="bottom-0 fixed">
                    <Footer />
                </div>
            )}
        </>
    );
}

export default VisitorMeetings;
