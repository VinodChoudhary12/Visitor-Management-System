

import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function VisitorSignup() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        CompanyName: '',
        image: null
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            setFormData((prev) => ({ ...prev, image: e.target.files[0] })); // Store the selected file
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('phone', formData.phone);
        form.append('email', formData.email);
        form.append('password', formData.password);
        form.append('CompanyName', formData.CompanyName)

        if (formData.image) {
            form.append('image', formData.image); // Append the image file
            // Convert image to base64 before saving in localStorage
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result.split(',')[1]; // Get the base64 string
                const dataToStore = {
                    ...formData,
                    image: base64Image, // Store base64 string
                };
                localStorage.setItem("user", JSON.stringify(dataToStore)); // Store the data in localStorage
            };
            reader.readAsDataURL(formData.image);
        }

        try {
            const response = await axios.post('http://localhost:5000/addVisitor', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await Swal.fire({
                position: "center",
                icon: "success",
                title: `${response.data.message}`,
                showConfirmButton: false,
                timer: 1500
            });
            //alert(response.data.message); // Notify the user of success
            navigate("/mettings");
            setFormData({ name: '', phone: '', email: '', password: '', image: null, CompanyName: '' }); // Reset the form
        } catch (error) {
            console.error('Error adding visitor:', error);
            Swal.fire({
                icon: "warning",
                title: "Unauthorized Access",
                text: `Something went wrong`,
            });
            //alert('Error adding visitor. Please try again.');
        }
    };

    return (
        <div className="font-[sans-serif]">
            <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[160px] sm:p-6 p-4">
                <h4 className="sm:text-3xl text-2xl font-bold text-white">Create your account</h4>
            </div>

            <div className="mx-4 mb-4 -mt-16">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">First Name <span className='text-red-600'>  *</span> </label>
                            <input name="name" type="text" value={formData.name} onChange={handleChange} className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter name" required />
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Email Id <span className='text-red-600'>  *</span></label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter email" required />
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Mobile No. <span className='text-red-600'>  *</span></label>
                            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter mobile number" required />
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Password <span className='text-red-600'>  *</span></label>
                            <input name="password" type="password" value={formData.password} onChange={handleChange} className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter Password" required />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Organization Name <span className='text-red-600'>  *</span> </label>
                            <input name="CompanyName" type="text" value={formData.CompanyName} onChange={handleChange} className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter Company Name" required />
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Upload Image <span className='text-red-600'>  *</span></label>
                            <input name="image" type="file" onChange={handleChange} className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" required />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center">
                        <button type="submit" className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
                            Sign up
                        </button>
                        <Link to='/Visitorlogin' className='text-blue-500 hover:underline text-lg'>LogIn</Link>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default VisitorSignup;

