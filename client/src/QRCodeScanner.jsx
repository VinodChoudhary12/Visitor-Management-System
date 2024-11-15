
// import { useState } from 'react';
// import QrScanner from 'react-qr-scanner';
// import axios from 'axios';

// const QRCodeScanner = () => {
//     const [scanResult, setScanResult] = useState('');
//     const [visitorDetails, setVisitorDetails] = useState(null);

//     const handleScan = async (data) => {
//         if (data) {
//             setScanResult(data.text);
//             console.log('Scanned Result:', data.text);
//             alert(data.text)
//             try {
//                 // const id = data.text
//                 const response = await axios.get(`http://localhost:5000/visitor/${data.text}`);
//                 setVisitorDetails(response.data);
//             } catch (error) {
//                 console.error('Error fetching visitor details:', error);
//                 setVisitorDetails(null);
//             }
//         }
//     };

//     const handleError = (err) => {
//         console.error('Scanner Error:', err);
//     };

//     const changeStatus = async (newStatus) => {
//         if (visitorDetails) {
//             alert("if me gya", visitorDetails)
//             console.log(visitorDetails);
//             try {
//                 await axios.post(`http://localhost:5000/visitor/status/${visitorDetails.id}`, { status: newStatus });
//                 alert('Visitor status updated to ' + newStatus);
//                 console.log(newStatus);

//                 const response = await axios.get(`http://localhost:5000/visitor/${visitorDetails.id}`);
//                 setVisitorDetails(response.data);
//             } catch (error) {
//                 console.error('Error updating status:', error);
//             }
//         }
//     };

//     const previewStyle = {
//         height: 240,
//         width: 320,
//         display: 'block',
//         margin: 'auto'
//     };

//     return (
//         <div>
//             <h3>Scan QR Code</h3>
//             <QrScanner
//                 delay={300}
//                 style={previewStyle}
//                 onError={handleError}
//                 onScan={handleScan}
//             />
//             {scanResult && <p>Scanned Result: {scanResult}</p>}
//             {visitorDetails && (
//                 <div>
//                     <h4>Visitor Details</h4>
//                     <p>Name: {visitorDetails.name}</p>
//                     <p>Email: {visitorDetails.email}</p>
//                     <p>Status: {visitorDetails.status}</p>
//                     <button onClick={() => changeStatus('CHECKED_IN')}>Check In</button>
//                     <button onClick={() => changeStatus('CHECKED_OUT')}>Check Out</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default QRCodeScanner;





// QRCodeScanner.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import axios from 'axios';
import Swal from 'sweetalert2';

const QRCodeScanner = () => {
    const [scanResult, setScanResult] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);

        if (!user || user.role !== "security" && user.role !== "SECURITY") {
            Swal.fire({
                icon: "warning",
                title: "Unauthorized Access",
                text: "You are not an authenticated person.",
            }).then(() => {
                navigate("/login"); // Redirect to login or any other route
            });
        }
    }, [navigate]);
    const handleScan = async (data) => {
        console.log(data);

        if (data) {
            setScanResult(data.text);

            try {
                const response = await axios.get(`http://localhost:5000/visitor/${data.text}`);
                const visitorDetails = response.data;

                // Redirect to VisitorDetails with visitor data
                navigate('/visitor-details', { state: { visitorDetails } });
            } catch (error) {
                console.error('Error fetching visitor details:', error);
            }
        }
        else {
            console.log(data);

        }
    };

    const handleError = (err) => {
        console.error('Scanner Error:', err);
    };

    const previewStyle = {
        height: 240,
        width: 320,
        display: 'block',
        margin: 'auto'
    };

    return (
        <div>
            <h3>Scan QR Code</h3>
            <QrScanner
                delay={300}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
            {scanResult && <p>Scanned Result: {scanResult}</p>}
        </div>
    );
};

export default QRCodeScanner;



