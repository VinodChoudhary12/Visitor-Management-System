import { useEffect, useState } from 'react';
import userpng from "./assets/Image/user.png";
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [visitorData, setVisitorData] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch data from localStorage
        const storedData = JSON.parse(localStorage.getItem("user"));

        if (storedData) {
            setVisitorData(storedData);
        }
    }, []);

    return (
        <div className="font-[sans-serif]">
            <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[160px] sm:p-6 p-4">
                <h4 className="sm:text-3xl text-2xl font-bold text-white">Your Profile</h4>
            </div>

            {visitorData ? (
                <div className="mx-4 mb-4 -mt-16">
                    <div className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="col-span-2">
                                {/* <h3 className="text-lg font-semibold text-gray-800">Profile Image:</h3> */}
                                {visitorData.image ? (
                                    <img
                                        src={`data:image/jpeg;base64,${visitorData.image}`}
                                        alt="Profile"
                                        className="w-40 h-40 object-cover rounded-full mx-auto"
                                    />
                                ) : (
                                    <img
                                        src={userpng}
                                        alt="Profile"
                                        className="w-40 h-40 object-cover rounded-full mx-auto"
                                    />
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Name:</h3>
                                <p className="text-sm text-gray-600">{visitorData.name}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Email:</h3>
                                <p className="text-sm text-gray-600">{visitorData.email}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Phone:</h3>
                                <p className="text-sm text-gray-600">{visitorData.Phone}</p>
                            </div>

                        </div>

                        <button onClick={() => navigate(-2)} className=" w-full   bg-blue-600 text-white py-2 rounded-lg mt-5">Back</button>
                    </div>
                </div>
            ) : (
                <p>Loading your profile...</p>
            )}
        </div>
    );
}

export default Profile;
