

// //  VisitorDetails.js
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import formatMeetingTime from '../FormatDate';
// import kritigrp from '../assets/Image/user.png'

// const VisitorDetails = () => {
//     const navigate = useNavigate()
//     const location = useLocation();
//     const [visitorDetails, setVisitorDetails] = useState(location.state?.visitorDetails);
//     useEffect(() => {
//         getData()
//     })
//     // Function to change visitor status
//     const changeStatus = async (newStatus) => {
//         if (visitorDetails) {
//             try {
//                 // Send a request to update the visitor's status on the server
//                 await axios.post(`http://localhost:5000/visitor/status/${visitorDetails.id}`, { status: newStatus });
//                 // alert(`Visitor status updated to ${newStatus}`);

//                 // Fetch the updated visitor details to reflect the status change
//                 const response = await axios.get(`http://localhost:5000/visitor/${visitorDetails.id}`);
//                 setVisitorDetails(response.data); // Update visitor details with new data

//             } catch (error) {

//                 console.error('Error updating status:', error);
//             }
//         }
//     };
//     async function getData() {
//         try {
//             console.log(visitorDetails);

//             const response = await axios.get(`http://localhost:5000/visitor/${3}`);
//             //const response = await axios.get(`http://localhost:5000/visitor/${visitorDetails.id}`);

//             setVisitorDetails(response.data); // Update visitor details with new data

//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     }



//     return (
//         <>
//             <div>

//                 {visitorDetails ? (
//                     <>
//                         <section className="py-10 my-auto ">
//                             <style>
//                                 {`
//         @media print {
//             .flex {
//                 display: flex !important;
//                 flex-direction: row !important;
//             }
//             .gap-4 {
//                 gap: 1rem !important;
//             }
//             .hidden-print {
//                 display: none !important; /* Hide non-essential elements */
//             }
//             .rounded-lg {
//                 border-radius: 0.5rem !important;
//             }

//             .print-only {
//                 display: block !important; /* Visible only in print */

//         }
//         @media screen {
//             .print-only {
//                 display: none !important; /* Hidden on screen */
//             }
//         }
//         }
//         `}
//                             </style>
//                             <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
//                                 <div
//                                     className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center ">
//                                     <div className="">
//                                         <h1
//                                             className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 :text-white">
//                                             Visitor Details
//                                         </h1>

//                                         <div className='border p-5 text-sm'>
//                                             <div className="w-full rounded-sm bg-[url('../../')] bg-cover bg-center bg-no-repeat items-center">
//                                             </div>
//                                             <div
//                                                 className="w-full rounded-sm bg-[url()] bg-cover bg-center bg-no-repeat items-center">

//                                                 <div
//                                                     className={`mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full`}
//                                                 >
//                                                     <img
//                                                         src={visitorDetails.account_image || kritigrp}
//                                                         alt="Visitor"
//                                                         className="rounded-full object-cover w-full h-full"
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full ">
//                                                 <div className="w-full  mb-4 mt-6">
//                                                     <label htmlFor="" className="mb-2 :text-gray-300"> Name</label>
//                                                     <input type="text"
//                                                         className="mt-2 p-4 w-full border-2 rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
//                                                         value={visitorDetails.name}
//                                                         disabled />
//                                                 </div>
//                                                 <div className="w-full  mt-6 lg:mt-6">
//                                                     <label htmlFor="" className=" :text-gray-300">Email</label>
//                                                     <input type="email"
//                                                         className="mt-2 p-4 w-full border-2 rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
//                                                         placeholder="Email"
//                                                         value={visitorDetails.email}
//                                                         disabled
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
//                                                 <div className="w-full">
//                                                     <h3 className=":text-gray-300 mb-2">Phone</h3>

//                                                     <input type="tel"
//                                                         className="mt-2 p-4 w-full border-2 rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
//                                                         value={visitorDetails.phone}
//                                                         disabled />
//                                                 </div>
//                                                 <div className="w-full mt-2">
//                                                     <h3 className=":text-gray-300 mb-2">Meeting Schedule</h3>
//                                                     <input type="text"
//                                                         className="text-grey p-4 w-full border-2 rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
//                                                         value={formatMeetingTime(visitorDetails.meeting_time)}
//                                                         disabled
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center items-center w-full">
//                                                 <div className="w-full  mb-4 mt-6">
//                                                     <label htmlFor="" className="mb-2 :text-gray-300"> Meeting To</label>
//                                                     <input type="text"
//                                                         className="mt-2 p-4 w-full border-2 bg-slate-100 rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
//                                                         value={visitorDetails.meetingToName}
//                                                         disabled
//                                                     />
//                                                 </div>
//                                                 <div className="w-full flex justify-around items-center mt-1.5">
//                                                     <div className="w-full   ">
//                                                         <label htmlFor="" className="mb-2 :text-gray-300"> From</label>
//                                                         <input type="text"
//                                                             className="mt-2 p-4 w-full border-2  bg-slate-100  rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
//                                                             value={visitorDetails.visitorCompany}
//                                                             disabled
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="w-full flex justify-around items-center  mt-7  lg:mt-8">
//                                                 <label htmlFor="" className=" :text-gray-300">Status</label>
//                                                 <div className='font-semibold'>{visitorDetails.status}</div>
//                                             </div>

//                                             <div className="hidden-print flex justify-between w-full items-center gap-3 rounded-lg bg-blue-500 mt-4 text-white  font-semibold">
//                                                 <button
//                                                     className="w-1/3 p-4"
//                                                     onClick={() => changeStatus('CHECKED_IN')}
//                                                     disabled={visitorDetails.status === 'CHECKED_IN'}
//                                                 >
//                                                     Check In
//                                                 </button>
//                                                 <button
//                                                     className=" w-1/3 p-4"
//                                                     onClick={() => changeStatus('CHECKED_OUT')}
//                                                     disabled={visitorDetails.status === 'CHECKED_OUT'}
//                                                 >
//                                                     Check Out
//                                                 </button>
//                                             </div>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='flex  lg:justify-around justify-between items-center mt-12 print-only'>
//                                 <lable>Host Signature</lable>
//                                 <lable> Visitor Signature</lable>
//                             </div>
//                             <div onClick={() => navigate('/today-all-meetings')} className="hidden-print sm:w-full lg:w-1/2 p-4 rounded-lg bg-blue-500 mt-4 text-white lg:text-lg font-semibold text-center cursor-pointer lg:mx-auto ">Back</div>
//                             {/* <div onClick={window.print} className="sm:w-full lg:w-1/2 p-4 rounded-lg bg-blue-500 mt-4 text-white lg:text-lg font-semibold text-center cursor-pointer lg:mx-auto ">print</div> */}
//                             <div className="lg:w-1/12 w-1/3 hidden-print rounded-lg bg-blue-500 mt-4 p-2 text-white lg:text-lg font-semibold text-center cursor-pointer mx-auto  " onClick={window.print}>
//                                 Print
//                             </div>
//                         </section>

//                     </>
//                 ) : (
//                     <p>No visitor data available.</p>
//                 )}
//             </div>
//         </>
//     );
// };
// export default VisitorDetails;




import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import formatMeetingTime from '../FormatDate';
import kritigrp from '../assets/Image/user.png';

const VisitorDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [visitorDetails, setVisitorDetails] = useState(location.state?.visitorDetails);

    useEffect(() => {
        getData();
    }, []); // Empty dependency array ensures it runs only once

    // Function to update visitor status
    const changeStatus = async (newStatus) => { 
        if (visitorDetails) {
            try {
                await axios.post(`http://localhost:5000/visitor/status/${visitorDetails.id}`, { status: newStatus });
                const response = await axios.get(`http://localhost:5000/visitor/${visitorDetails.id}`);
                setVisitorDetails(response.data);
            } catch (error) {
                console.error('Error updating status:', error);
            }
        }
    };
    // Function to fetch visitor data
    async function getData() {
        try {
            const response = await axios.get(`http://localhost:5000/visitor/${3}`);
            //const response = await axios.get(`http://localhost:5000/visitor/${visitorDetails.id}`);
            setVisitorDetails(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <style>
                {`
                @media print {
                    .print-only {
                        display: flex !important; /* Visible in print */
                    }
                    .hidden-print {
                        display: none !important; /* Hidden in print */
                    }
                }
                @media screen {
                    .print-only {
                        display: none !important; /* Hidden on screen */
                    }
                }
                `}
            </style>
            <div>
                {visitorDetails ? (
                    <>
                        <section className="py-10 my-auto">
                            <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                                <div className="lg:w-[88%] mx-auto shadow-2xl p-4 rounded-xl h-fit self-center">
                                    <h1 className="lg:text-3xl font-serif font-extrabold mb-2">Visitor Details</h1>
                                    <div className="border p-5 text-sm">
                                        <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full">
                                            <img
                                                src={visitorDetails.account_image || kritigrp}
                                                alt="Visitor"
                                                className="rounded-full object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="flex lg:flex-row gap-2 justify-center w-full mt-6">
                                            <div className="w-full">
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    value={visitorDetails.name}
                                                    className="p-4 w-full border-2 rounded-lg"
                                                    disabled
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    value={visitorDetails.email}
                                                    className="p-4 w-full border-2 rounded-lg"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="flex lg:flex-row gap-2 justify-center w-full mt-6">
                                            <div className="w-full">
                                                <label>Phone</label>
                                                <input
                                                    type="tel"
                                                    value={visitorDetails.phone}
                                                    className="p-4 w-full border-2 rounded-lg"
                                                    disabled
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label>Meeting Schedule</label>
                                                <input
                                                    type="text"
                                                    value={formatMeetingTime(visitorDetails.meeting_time)}
                                                    className="p-4 w-full border-2 rounded-lg"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="flex lg:flex-row gap-2 justify-center w-full mt-6">
                                            <div className="w-full">
                                                <label>Meeting To</label>
                                                <input
                                                    type="text"
                                                    value={visitorDetails.meetingToName}
                                                    className="p-4 w-full border-2 rounded-lg"
                                                    disabled
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label>From</label>
                                                <input
                                                    type="text"
                                                    value={visitorDetails.visitorCompany}
                                                    className="p-4 w-full border-2 rounded-lg"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="w-full flex justify-around items-center  mt-7  lg:mt-8">
                                            <label>Status</label>
                                            <div className="font-semibold">{visitorDetails.status}</div>
                                        </div> */}
                                        <div className="w-full flex justify-around items-center mt-7 lg:mt-8">
                                            <label>Status</label>
                                            <div className="font-semibold">
                                                {visitorDetails.status === 'CHECKED_IN' ? (
                                                    <>
                                                        {visitorDetails.status} <br />
                                                        <span className="text-sm text-gray-500">Entry Time : {formatMeetingTime(visitorDetails.entry_time)}</span>
                                                    </>
                                                ) : visitorDetails.status === 'CHECKED_OUT' ? (
                                                    <>
                                                        {visitorDetails.status} <br />
                                                        <span className="text-sm text-gray-500">Exit Time : {formatMeetingTime(visitorDetails.exit_time)}</span>
                                                    </>
                                                ) : (
                                                    visitorDetails.status
                                                )}
                                            </div>
                                        </div>

                                        <div className="hidden-print flex justify-between w-full items-center gap-3 rounded-lg bg-blue-500 mt-4 text-white font-semibold">
                                            <button
                                                className="w-1/3 p-4"
                                                onClick={() => changeStatus('CHECKED_IN')}
                                                disabled={visitorDetails.status === 'CHECKED_IN'}
                                            >
                                                Check In
                                            </button>
                                            <button
                                                className="w-1/3 p-4"
                                                onClick={() => changeStatus('CHECKED_OUT')}
                                                disabled={visitorDetails.status === 'CHECKED_OUT'}
                                            >
                                                Check Out
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center mt-12 print-only">
                                            <label>Host Signature</label>
                                            <label>Visitor Signature</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={() => navigate('/today-all-meetings')}
                                className="hidden-print w-1/3 mx-auto bg-blue-500 p-2 text-white font-semibold text-center cursor-pointer mt-4 rounded-lg"
                            >
                                Back
                            </div>
                            <div
                                onClick={window.print}
                                className="hidden-print w-1/3 mx-auto bg-blue-500 p-2 text-white font-semibold text-center cursor-pointer mt-4 rounded-lg"
                            >
                                Print
                            </div>
                        </section>
                        <div className='mx-auto p-10 flex justify-around print-only'>
                            Photography is not allowed in premises Please meet host person only
                        </div>
                    </>
                ) : (
                    <p>No visitor data available.</p>
                )}
            </div>
        </>
    );
};

export default VisitorDetails;
