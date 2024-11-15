

//  VisitorDetails.js
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import formatMeetingTime from '../FormatDate';
import kritigrp from '../assets/Image/user.png'

const VisitorDetails = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [visitorDetails, setVisitorDetails] = useState(location.state?.visitorDetails);
    useEffect(() => {
        getData()
    })
    // Function to change visitor status
    const changeStatus = async (newStatus) => {
        if (visitorDetails) {
            try {
                // Send a request to update the visitor's status on the server
                await axios.post(`http://localhost:5000/visitor/status/${visitorDetails.id}`, { status: newStatus });
                // alert(`Visitor status updated to ${newStatus}`);

                // Fetch the updated visitor details to reflect the status change
                const response = await axios.get(`http://localhost:5000/visitor/${visitorDetails.id}`);
                setVisitorDetails(response.data); // Update visitor details with new data

            } catch (error) {

                console.error('Error updating status:', error);
            }
        }
    };
    async function getData() {
        try {
            console.log(visitorDetails);

            //const response = await axios.get(`http://localhost:5000/visitor/${10}`);
            const response = await axios.get(`http://localhost:5000/visitor/${visitorDetails.id}`);

            setVisitorDetails(response.data); // Update visitor details with new data

        } catch (error) {
            console.error('Error updating status:', error);
        }
    }



    return (
        <>
            <div>

                {visitorDetails ? (
                    <>
                        <section className="py-10 my-auto ">
                            <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                                <div
                                    className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center ">

                                    <div className="">
                                        <h1
                                            className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 :text-white">
                                            Visitor Details
                                        </h1>

                                        <div className='border p-5 text-sm'>
                                            <div className="w-full rounded-sm bg-[url('../../')] bg-cover bg-center bg-no-repeat items-center">

                                            </div>

                                            <div
                                                className="w-full rounded-sm bg-[url()] bg-cover bg-center bg-no-repeat items-center">

                                                <div
                                                    className={`mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat`}
                                                    style={{ backgroundImage: `url(${visitorDetails.account_image || kritigrp})` }}
                                                >

                                                    {/* <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">

                                             <input type="file" name="profile" id="upload_profile" hidden required />

                                                 <label htmlFor="upload_profile">
                                                     <svg data-slot="icon" className="w-6 h-5 text-blue-700" fill="none"
                                                         strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24"
                                                         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                         <path strokeLinecap="round" strokeLinejoin="round"
                                                             d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                                         </path>
                                                         <path strokeLinecap="round" strokeLinejoin="round"
                                                             d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                                         </path>
                                                     </svg>
                                                 </label>
                                         </div>  */}
                                                </div>

                                                {/* Cover Icon */}
                                                {/* <div className="flex justify-end">

                                         <input type="file" name="profile" id="upload_cover" hidden required />

                                             <div
                                                 className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                                                 <label htmlFor="upload_cover" className="inline-flex items-center gap-1 cursor-pointer">Cover

                                                     <svg data-slot="icon" className="w-6 h-5 text-blue-700" fill="none" strokeWidth="1.5"
                                                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http:www.w3.org/2000/svg"
                                                         aria-hidden="true">
                                                         <path strokeLinecap="round" strokeLinejoin="round"
                                                             d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                                         </path>
                                                         <path strokeLinecap="round" strokeLinejoin="round"
                                                             d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                                         </path>
                                                     </svg>
                                                 </label>
                                             </div>

                                     </div> */}
                                            </div>
                                            {/* <h2 className="text-center mt-1 font-semibold :text-gray-300">Upload Profile and Cover Image</h2> */}
                                            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full ">
                                                <div className="w-full  mb-4 mt-6">
                                                    <label htmlFor="" className="mb-2 :text-gray-300"> Name</label>
                                                    <input type="text"
                                                        className="mt-2 p-4 w-full border-2 rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
                                                        value={visitorDetails.name}
                                                        disabled />
                                                </div>
                                                <div className="w-full  mt-6 lg:mt-6">
                                                    <label htmlFor="" className=" :text-gray-300">Email</label>
                                                    <input type="email"
                                                        className="mt-2 p-4 w-full border-2 rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
                                                        placeholder="Email"
                                                        value={visitorDetails.email}
                                                        disabled
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                                <div className="w-full">
                                                    <h3 className=":text-gray-300 mb-2">Phone</h3>

                                                    <input type="tel"
                                                        className="mt-2 p-4 w-full border-2 rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
                                                        value={visitorDetails.phone}
                                                        disabled />
                                                </div>
                                                <div className="w-full mt-2">
                                                    <h3 className=":text-gray-300 mb-2">Meeting Schedule</h3>
                                                    <input type="text"
                                                        className="text-grey p-4 w-full border-2 rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
                                                        value={formatMeetingTime(visitorDetails.meeting_time)}
                                                        disabled
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center items-center w-full">
                                                <div className="w-full  mb-4 mt-6">
                                                    <label htmlFor="" className="mb-2 :text-gray-300"> Meeting To</label>
                                                    <input type="text"
                                                        className="mt-2 p-4 w-full border-2 bg-slate-100 rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
                                                        value={visitorDetails.meetingToName}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="w-full flex justify-around items-center mt-1.5">
                                                    <div className="w-full   ">
                                                        <label htmlFor="" className="mb-2 :text-gray-300"> From</label>
                                                        <input type="text"
                                                            className="mt-2 p-4 w-full border-2  bg-slate-100  rounded-lg :text-gray-200 :border-gray-600 :bg-gray-800"
                                                            value={visitorDetails.visitorCompany}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-around items-center  mt-7  lg:mt-8">
                                                <label htmlFor="" className=" :text-gray-300">Status</label>
                                                <div className='font-semibold'>{visitorDetails.status}</div>
                                            </div>

                                            <div className="flex justify-between w-full items-center gap-3 rounded-lg bg-blue-500 mt-4 text-white  font-semibold">
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

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => navigate('/today-all-meetings')} className="sm:w-full lg:w-1/2 p-4 rounded-lg bg-blue-500 mt-4 text-white lg:text-lg font-semibold text-center cursor-pointer lg:mx-auto ">Back</div>
                        </section>


                    </>
                ) : (
                    <p>No visitor data available.</p>
                )}
            </div>



            {/*  */}

        </>

    );
};

export default VisitorDetails;




// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import formatMeetingTime from '../FormatDate';
// import kritigrp from '../assets/Image/user.png'

// const VisitorDetails = () => {
//     const location = useLocation();
//     const [visitorDetails, setVisitorDetails] = useState(location.state?.visitorDetails);
//     const [imageUrl, setImageUrl] = useState("http://localhost:5000/uploads/1730719051963-logo-light.png");

//     useEffect(() => {
//         getData(); // Fetch data when component mounts
//     }, []);

//     const changeStatus = async (newStatus) => {
//         if (visitorDetails) {
//             try {
//                 // Send a request to update the visitor's status on the server
//                 await axios.post(`http://localhost:5000/visitor/status/${visitorDetails.id}`, { status: newStatus });

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
//             const response = await axios.get(`http://localhost:5000/visitor/${visitorDetails.id}`);
//             setVisitorDetails(response.data); // Update visitor details with new data
//             // If imageUrl is not valid, fallback to kritigrp
//             if (!response.data.imageUrl) {
//                 setImageUrl(kritigrp);
//             } else {
//                 setImageUrl(response.data.imageUrl); // Set the fetched image URL
//             }
//         } catch (error) {
//             console.error('Error fetching visitor data:', error);
//         }
//     }

//     // Handle image loading errors
//     const handleImageError = () => {
//         setImageUrl(kritigrp); // Fallback to default image
//     };

//     return (
//         <div>
//             {visitorDetails ? (
//                 <section className="py-10 my-auto">
//                     <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
//                         <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center">
//                             <div>
//                                 <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 text-white">
//                                     Visitor Details
//                                 </h1>
//                                 <div>
//                                     <div className="w-full rounded-sm bg-[url('../../')] bg-cover bg-center bg-no-repeat items-center">
//                                         <div
//                                             className={`mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat`}
//                                             style={{ backgroundImage: `url(${imageUrl})` }}
//                                             // Handle image load error
//                                             onErrorCapture={handleImageError}
//                                         >
//                                             {/* Image container */}
//                                         </div>
//                                     </div>
//                                     <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
//                                         <div className="w-full mb-4 mt-6">
//                                             <label htmlFor="" className="mb-2 text-gray-300">Name</label>
//                                             <input type="text"
//                                                 className="mt-2 p-4 w-full border-2 rounded-lg text-gray-200 bg-gray-800"
//                                                 value={visitorDetails.name}
//                                                 disabled
//                                             />
//                                         </div>
//                                         <div className="w-full mt-6 lg:mt-6">
//                                             <label htmlFor="" className="text-gray-300">Email</label>
//                                             <input type="email"
//                                                 className="mt-2 p-4 w-full border-2 rounded-lg text-gray-200 bg-gray-800"
//                                                 value={visitorDetails.email}
//                                                 disabled
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
//                                         <div className="w-full">
//                                             <h3 className="text-gray-300 mb-2">Phone</h3>
//                                             <input type="tel"
//                                                 className="mt-2 p-4 w-full border-2 rounded-lg text-gray-200 bg-gray-800"
//                                                 value={visitorDetails.phone}
//                                                 disabled
//                                             />
//                                         </div>
//                                         <div className="w-full mt-2">
//                                             <h3 className="text-gray-300 mb-2">Meeting Schedule</h3>
//                                             <input type="text"
//                                                 className="text-grey p-4 w-full border-2 rounded-lg text-gray-200 bg-gray-800"
//                                                 value={formatMeetingTime(visitorDetails.meeting_time)}
//                                                 disabled
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
//                                         <div className="w-full mb-4 mt-6">
//                                             <label htmlFor="" className="mb-2 text-gray-300">Meeting To</label>
//                                             <input type="text"
//                                                 className="mt-2 p-4 w-full border-2 rounded-lg text-gray-200 bg-gray-800"
//                                                 value={visitorDetails.meetingTo}
//                                                 disabled
//                                             />
//                                         </div>
//                                         <div className="w-full flex justify-around items-center mt-7 lg:mt-8">
//                                             <label htmlFor="" className="text-gray-300">Status</label>
//                                             <div className="font-semibold">{visitorDetails.status}</div>
//                                         </div>
//                                     </div>
//                                     <div className="flex justify-between w-full items-center gap-3 rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
//                                         <button
//                                             className="w-1/3 p-4"
//                                             onClick={() => changeStatus('CHECKED_IN')}
//                                             disabled={visitorDetails.status === 'CHECKED_IN'}
//                                         >
//                                             Check In
//                                         </button>
//                                         <button
//                                             className="w-1/3 p-4"
//                                             onClick={() => changeStatus('CHECKED_OUT')}
//                                             disabled={visitorDetails.status === 'CHECKED_OUT'}
//                                         >
//                                             Check Out
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             ) : (
//                 <p>No visitor data available.</p>
//             )}
//         </div>
//     );
// };

// export default VisitorDetails;
