
import axios from "axios";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function OTP({ setStep, mobile, setMobile }) {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    // Editable mobile number

    useEffect(() => {
        console.log("Mobile number in OTP:", mobile);
    }, [mobile]);

    const handleInput = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]{1}$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (!/^[0-9]{1}$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
            e.preventDefault();
        }
        if (e.key === "Backspace" || e.key === "Delete") {
            if (otp[index] === "" && index > 0) {
                setOtp((prevOtp) => {
                    const newOtp = [...prevOtp];
                    newOtp[index - 1] = "";
                    return newOtp;
                });
                setTimeout(() => {
                    inputRefs.current[index - 1].focus();
                }, 0);
            } else {
                setOtp((prevOtp) => {
                    const newOtp = [...prevOtp];
                    newOtp[index] = "";
                    return newOtp;
                });
                if (error) {
                    setError("");
                }
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        if (/^\d{4}$/.test(text)) {
            const newOtp = text.split("");
            setOtp(newOtp);
            inputRefs.current[3].focus();
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!/^[6-9]\d{9}$/.test(mobile)) {
    //         setError("Invalid mobile number.");
    //         return;
    //     }
    //     const otpValue = otp.join("");
    //     if (otpValue === "1234") {

    //         setStep(3); // Proceed to the next step if OTP is valid
    //     } else {
    //         setError("Invalid OTP. Please try again.");
    //     }
    // };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Join the OTP array into a single string
        const otpValue = otp.join("");
        if (otpValue !== "1234") {
            setError("Invalid OTP. Please try again.");
            return;
        }

        try {
            const { data } = await axios.get(`http://localhost:5000/checkPhone/${mobile}`, {
                params: { phone: mobile },
            });
           

            if (data.exists) {

                // If the number exists, navigate to the /home route
                navigate("/");
            } else {
                // If the number does not exist, proceed to the next step
                setStep(3);


            }
        } catch (err) {
            console.log("Error checking phone:", err);
            setError("An error occurred while verifying the phone number.");
        }
    };



    const handleEditMobile = () => {
        setIsEditing(true);
    };

    const handleSaveMobile = () => {
        if (/^[6-9]\d{9}$/.test(mobile)) {
            setIsEditing(false);
            setError("");
        } else {
            setError("Invalid mobile number..");

        }
    };

    return (
        <div className="max-w-md mx-auto mt-24 bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
                <h1 className="text-2xl text-center font-bold mb-1">Mobile Phone Verification</h1>
                <div className="px-8 py-2">
                    <p className="text-[15px] text-slate-500">
                        We sent a 4-digit code to you at
                    </p>
                    <p className="text-[15px] text-slate-500">
                        {isEditing ? (
                            <input
                                type="text"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="border p-2 rounded-md"
                            />
                        ) : (
                            `(+91) ${mobile}`
                        )}
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            width={"12px"}
                            viewBox="0 0 117.74 122.88"
                            style={{
                                enableBackground: "new 0 0 117.74 122.88",
                                display: "inline-block",
                                verticalAlign: "middle",
                                marginBottom: "9px",
                                cursor: "pointer",
                            }}
                            onClick={isEditing ? handleSaveMobile : handleEditMobile}
                            className="ml-1"
                        >
                            <style type="text/css">{`.st0 { fill-rule:evenodd; clip-rule:evenodd; }`}</style>
                            <g>
                                <path
                                    className="w-1"
                                    d="M94.62,2c-1.46-1.36-3.14-2.09-5.02-1.99c-1.88,0-3.56,0.73-4.92,2.2L73.59,13.72l31.07,30.03l11.19-11.72
            c1.36-1.36,1.88-3.14,1.88-5.02s-0.73-3.66-2.09-4.92L94.62,2L94.62,2L94.62,2z M41.44,109.58c-4.08,1.36-8.26,2.62-12.35,3.98
            c-4.08,1.36-8.16,2.72-12.35,4.08c-9.73,3.14-15.07,4.92-16.22,5.23c-1.15,0.31-0.42-4.18,1.99-13.6l7.74-29.61l0.64-0.66
            l30.56,30.56L41.44,109.58L41.44,109.58L41.44,109.58z M22.2,67.25l42.99-44.82l31.07,29.92L52.75,97.8L22.2,67.25L22.2,67.25z"
                                />
                            </g>
                        </svg>
                    </p>
                </div>
            </header>
            <form id="otp-form" onSubmit={handleSubmit}>
                <div className="flex items-center justify-center gap-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            value={digit}
                            onChange={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            maxLength="1"
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        />
                    ))}
                </div>

                {error && <div className="text-red-500 mt-4">{error}</div>}

                <div className="max-w-[260px] mx-auto mt-4">
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                    >
                        Verify OTP
                    </button>
                </div>
            </form>

            <div className="text-sm text-slate-500 mt-4 flex justify-center items-center gap-7">
                <p>Didn’t receive the code?</p>
                <button className="font-medium text-indigo-500 hover:text-indigo-600 ">
                    Resend
                </button>
            </div>
        </div>
    );
}
OTP.propTypes = {
    setStep: PropTypes.func.isRequired,
    mobile: PropTypes.string.isRequired,
    setMobile: PropTypes.func.isRequired,
};
