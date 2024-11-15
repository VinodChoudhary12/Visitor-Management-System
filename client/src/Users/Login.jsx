

import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            if (response.data.success) {
                // console.log(response.data.user);

                const { password, ...userWithoutPassword } = response.data.user; // Destructure to remove password
                console.log(password);
                console.clear()

                localStorage.setItem("user", JSON.stringify(userWithoutPassword)); // Store user data (with image) in localStorage
                // console.clear();
                if (userWithoutPassword.role === "SECURITY") {
                    navigate('/today-all-meetings');
                } else {
                    navigate('/my-meetings'); // Navigate to my-meetings for other roles
                }
                //navigate('/my-meetings'); // Navigate to the meetings page after successful login
            } else {
                // alert('Login failed: ' + response.data.message);
                Swal.fire({
                    icon: "error",
                    title: "Unauthorized Access",
                    text: `${response.data.message}`,
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            // alert('An error occurred during login. Please try again.');
        }
    };

    return (
        <form onSubmit={handleLogin} className='mt-10 w-full' >
            <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto ">
                <div className="mx-auto mb-2 space-y-3">
                    <h1 className="text-2xl font-bold text-gray-700">Log into visitor Management</h1>
                    <p className="text-gray-500">Login to access your account</p>
                </div>

                <div className="relative mt-2 w-full">
                    <input
                        type="text"
                        id="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                        placeholder="Username"
                    />
                    <label htmlFor="email" className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transhtmlForm cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Your Email </label>
                </div>

                <div className="relative mt-2 w-full">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                        placeholder="Password"
                    />
                    <label htmlFor="password" className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transhtmlForm cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Your Password</label>
                </div>
                <Link to='/reset-password' className='flex justify-end text-blue-600 hover:underline cursor-pointer '>Reset Password</Link>
                <button type='submit' className="rounded-lg bg-blue-600 py-3 font-bold text-white">Login</button>
            </div>
        </form>
    );
}

export default Login;

