import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import formatMeetingTime from './FormatDate';
import rejectedImage from './assets/Image/rejected.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const QRCodeDisplay = ({ visitorId }) => {
    const [qrCode, setQrCode] = useState('');
    const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState()
    const [meeting_time, setMeetingTime] = useState();
    const [meetingTo, setMeetingTo] = useState("");
    const [status, setStatus] = useState()
    const [description, setDescription] = useState("");
    const [remark_By_User, setRemark_By_User] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        fetchQRCode(user);
    }, [visitorId]);
    const fetchQRCode = async (user) => {

        try {
            const response = await axios.get(`http://localhost:5000/qr-code/${visitorId}`);
            // console.log(response.data);
            if (user.email !== response.data.qr_code.email) {
                await Swal.fire("You Dont Have  Authorized ", "", "warning");
                navigate(-1)
            }
            // setEmail(response.data.qr_code.email);
            //setName(response.data.qr_code.name)
            // setPhone(response.data.qr_code.phone)
            setMeetingTime(response.data.qr_code.meeting_time)
            setMeetingTo(response.data.qr_code.meetingTo)
            setName(response.data.qr_code.meetingToName)

            setStatus(response.data.qr_code.status)
            setDescription(response.data.qr_code.Description)
            setQrCode(response.data.qr_code.qr_code);
            setRemark_By_User(response.data.qr_code.remark_By_User)
        }
        catch (error) {
            console.error('Error fetching QR Code:', error);
        }
    };
   
    async function cancle() {
        try {
            // Show the confirmation dialog first
            const result = await Swal.fire({
                title: "Are you sure you want to cancel the meeting?",
                showDenyButton: true,
                confirmButtonText: "Yes, cancel it!",
                denyButtonText: "No, keep it"
            });

            // If the user confirms the cancellation
            if (result.isConfirmed) {
                // Proceed with the API call to cancel the meeting
                const response = await axios.get(`http://localhost:5000/cancelMeeting/${visitorId}`);

                if (response.status === 200) {
                    // If the meeting is successfully canceled, show a success message
                    Swal.fire("Cancelled!", "Your meeting has been canceled.", "success");

                    // Optionally navigate to the meetings page
                    navigate('/mettings');
                }
            } else if (result.isDenied) {
                // If the user denies the cancellation, show an informational message
                Swal.fire("Your meeting is still active", "", "success");
            }
        } catch (error) {
            console.error('Error canceling meeting:', error);
            // Optionally show an error message if the API call fails
            Swal.fire("Error", "There was an issue canceling the meeting.", "error");
        }
    }


    return (

        <>


            <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-6 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                <div className="flex items-center gap-2 px-6">
                    <h3 className="text-xl text-gray-800 font-bold flex-1">{formatMeetingTime(meeting_time)}</h3>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="18px" className="cursor-pointer fill-blue-600 shrink-0"
                        viewBox="0 0 64 64">
                        <path
                            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                            data-original="#000000"></path>
                    </svg> */}
                </div>
                {/* <div className="min-h-[300px]">
                    {
                        status != 'REJECTED' ? (<img src={qrCode} className="w-full my-6" />) : ((<img src={rejectedImage} alt="QR Not Availble" className="w-full my-6" />))
                    }
                </div> */}
                <div className="min-h-[300px]">
                    {status === "REJECTED" ? (
                        <img src={rejectedImage} alt="QR Not Available" className="w-full my-6" />
                    ) : status === "PENDING" ? (
                        <div className=" ">
                            <video src='https://cdnl.iconscout.com/lottie/premium/thumb/pending-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--text-word-sticky-note-hang-board-notice-and-sign-pack-miscellaneous-icons-9264737.mp4' loop
                                autoPlay
                                muted height="1%" />
                        </div>
                    ) : status === "CANCELED" ? <div className=''> <img src={qrCode} className="w-full my-6 blur-md" alt="QR Code" /></div> : (
                        <img src={qrCode} className="w-full my-6" alt="QR Code" />
                    )}
                </div>

                <div className="px-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {description}
                    </p>
                    <div className="mt-8 flex items-center flex-wrap gap-4">
                        {/* {
                            status == "REJECTED" ? (<h3 className="text-xl text-red-500 font-bold flex-1">{status}</h3>) : (<h3 className="text-xl  font-bold flex-1">{status}</h3>)
                        } */}
                        <h3
                            className={`text-xl font-bold flex-1 ${status === "REJECTED"
                                ? "text-red-500"
                                : status === "APPROVED"
                                    ? "text-green-500"
                                    : status === "PENDING"
                                        ? "text-yellow-500"
                                        : "text-gray-800"
                                }`}
                        >
                            {status}
                        </h3>

                        {
                            status == 'APPROVED' || status == 'PENDING' ?
                                (<button type="button" onClick={() => cancle()}
                                    className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider bg-red-500 hover:bg-red-600 outline-none">cancel
                                </button>) : ('')
                        }
                    </div>
                    <div className='flex flex-col gap-2 mt-2' >
                        <small className=''> Remark by {name || meetingTo} :   </small>
                        <small>{remark_By_User}</small>
                    </div>
                </div>
            </div>
        </>
    );
};
QRCodeDisplay.propTypes = {
    visitorId: PropTypes.string.isRequired, // Ensure visitorId is a required string
};


export default QRCodeDisplay;
