

import { useState, useEffect } from "react";
import kritigro from "./assets/Image/KRITI group.png";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function ResetPassword() {
    // State to hold user data from localStorage
    const [userData, setUserData] = useState(null);
    const [password, setPassword] = useState()
    const [email, setEmail] = useState("")
    const [userName, setUsername] = useState()
    const [confirmn_new_password, set_confirmn_new_password] = useState()
    const navigate = useNavigate()

    // State to handle loading state
    const [loading, setLoading] = useState(true);

    // Load user data when the component mounts
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user"));
        setUserData(data);
        if (data) {
            setEmail(data.email || data.username || "")
        }

        setLoading(false);
    }, []);

    if (loading) {
        // Optionally, you can show a loading spinner or message while the data is being loaded
        return <div>Loading...</div>;
    }

    async function resetpasswordWithoutMail() {

        if (password !== confirmn_new_password) {
            await Swal.fire({
                icon: "warning",
                title: "Not match",
                text: "Password and Confirm Password is not Match",
            });
            return
        }
        console.log(userData);
        console.log(password);
        console.log(email);

        console.log(confirmn_new_password);

        try {
            const res = await axios.post("http://localhost:5000/reset-password", { email, newPassword: confirmn_new_password, username: email || userName })
            console.log(res.data);
            if (res.status === 404) {
                await Swal.fire({
                    icon: "warning",
                    title: "Not Found",
                    text: "Password and Confirm Password is not Match"
                });
                return
            }
            if (res.data.table == "users") {
                navigate('/login')
            }
            else {
                navigate("/Visitorlogin")
            }


        } catch (err) {
            console.log(err);

        }




    }




    // Conditional rendering based on the presence of user data
    if (userData) {
        return (
            <section>
                <main id="content" role="main" className="w-full lg:h-screen max-w-md p-6 mx-auto">
                    <div className="bg-white border shadow-lg mt-7 rounded-xl">
                        <div className="p-4 sm:p-7">
                            <div className="text-center">
                                <div className="flex items-end justify-center mb-6 text-2xl font-bold">

                                    <img src={kritigro} />

                                </div>
                                <h1 className="block text-lg font-bold text-gray-800">Reset Password</h1>
                            </div>

                            <div className="">

                                <div className="grid gap-y-4">
                                    <div>
                                        <label htmlFor="new_password" className="block mb-2 ml-1 text-xs font-semibold">New password</label>
                                        <div className="relative">
                                            <input type="password" id="new_password" name="new_password"
                                                className="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required aria-describedby="new-password-error"
                                                placeholder="Enter a new password"
                                                onKeyUp={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <p className="hidden mt-2 text-xs text-red-600" id="new-password-error">Please include a password that complies with the rules to ensure security</p>
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-2 ml-1 text-xs font-semibold">Confirm new password</label>
                                        <div className="relative">
                                            <input type="password"
                                                className="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"

                                                placeholder="Enter a new password"
                                                onKeyUp={(e) => set_confirmn_new_password(e.target.value)}
                                            />
                                        </div>
                                        <p className="hidden mt-2 text-xs text-red-600" id="confirmn_new-password-error">Please include a password that complies with the rules to ensure security</p>
                                    </div>
                                    <button onClick={resetpasswordWithoutMail}
                                        className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-blue-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Reset my password
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </section>
        );
    } else {
        return (
            <section className="bg-gray-50 h-auto ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        <img className="w-36 h-30 " src={kritigro} alt="logo" />

                    </Link>
                    <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md  m:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Change Password
                        </h2>
                        <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="name@company.com" required="" onKeyUp={(e) => { setEmail(e.target.value); setUsername(e.target.value) }} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " required="" onKeyUp={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                                <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " required="" onKeyUp={(e) => set_confirmn_new_password(e.target.value)} />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="newsletter" className="font-light text-gray-500 ">I accept the <a className="font-medium text-blue-600 hover:underline " href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button onClick={resetpasswordWithoutMail} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Reset Password</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }


}

export default ResetPassword;
