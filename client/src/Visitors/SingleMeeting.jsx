import { useLocation } from 'react-router-dom';
import VisitorNavbar from './VisitorNavbar';

function SingleMeeting() {
    const location = useLocation();
    const notification = location.state?.notification || location.state?.meeting;

    if (!notification) {
        return <div>No notification data available.</div>;
    }
    function formatMeetingTime(meetingTime) {
        const date = new Date(meetingTime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    return (
        <>
            <VisitorNavbar />
            <div>
                <h2 className='text-center text-xl mt-2' >Meeting Details</h2>
                {/* <p><strong>Meeting Time:</strong> {notification.meeting_time}</p>
                <p><strong>Status:</strong> {notification.status}</p>
                <p><strong>Meeting With:</strong> {notification.meetingTo}</p> */}
                {/* Add more fields as needed */}
                <div className="grid  lg:grid-cols-1 gap-3 p-10">

                    <div
                        key={notification.id}
                        className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4"
                    >
                        <div className="p-6">
                            <h3 className="text-lg font-semibold">{formatMeetingTime(notification.meeting_time)}</h3>
                            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                {notification.Description || "No description provided."}
                            </p>
                            <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                                {notification.status || "No description provided."}
                            </p>



                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}

export default SingleMeeting;
