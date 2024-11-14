import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userImage from './assets/Image/user.png'
import Swal from 'sweetalert2';


function UpdateProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [Phone, setPhone] = useState('')
    const navigate = useNavigate();

    // Load the current user's profile from localStorage (or any other place like an API)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setName(user.name);
            setEmail(user.email || user.username);
            setImage(user.image || ''); // Set image if exists
            setPhone(user.Phone || user.phone || '')
        } else {
            navigate('/login'); // Redirect to login if no user is logged in
        }
    }, [navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result.split(',')[1]); // Store only base64 part
            };
            reader.readAsDataURL(file);
        }
    };





    // const handleUpdateProfile = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const user = JSON.parse(localStorage.getItem('user'));

    //         // Make sure Phone is defined, possibly from another state
    //         const response = await axios.post('http://localhost:5000/updateProfile', {
    //             email,
    //             name,
    //             id: user.id,
    //             Phone,
    //             image, // Pass base64 string of the image
    //         });

    //         if (response.data.success) {
    //             // Include Phone if it’s being updated
    //             const updatedUser = { ...user, name, email, image, Phone };

    //             // Set the updated user in localStorage
    //             localStorage.setItem('user', JSON.stringify(updatedUser));

    //             // Verify in console if localStorage data is updating
    //             console.log('Updated localStorage:', JSON.parse(localStorage.getItem('user')));

    //             alert('Profile updated successfully!');
    //             navigate('/profile'); // Navigate to the profile page
    //         } else {
    //             alert('Failed to update profile: ' + response.data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error updating profile:', error);
    //         alert('An error occurred while updating your profile.');
    //     }
    // };


    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            const user = JSON.parse(localStorage.getItem('user'));

            // Make sure Phone is defined, possibly from another state
            const response = await axios.post('http://localhost:5000/updateProfile', {
                email,
                name,
                id: user.id,
                Phone,
                image, // Pass base64 string of the image
                role: user.role, // Send role from localStorage if available
            });

            if (response.data.success) {
                // Include Phone if it’s being updated
                const updatedUser = { ...user, name, email, image, Phone };

                // Set the updated user in localStorage
                localStorage.setItem('user', JSON.stringify(updatedUser));

                // Verify in console if localStorage data is updating
                console.log('Updated localStorage:', JSON.parse(localStorage.getItem('user')));

                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Profile Updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                if (user.role) {
                    navigate(-1);
                } else {
                    navigate('/profile');
                }
                navigate('/profile'); // Navigate to the profile page
            } else {
                alert('Failed to update profile: ' + response.data.message);
                await Swal.fire({
                    icon: "error",
                    title: "Unauthorized Access",
                    text: `${response.data.message}`,
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating your profile.');
        }
    };

    return (
        <>

            <div className="mt-10 max-w-lg mx-auto border  shadow-lg p-10">

                <h2 className="text-2xl font-bold text-center">Update Your Profile</h2>

                <div className="flex justify-center mt-2">
                    {image ? (
                        <img
                            src={`data:image/png;base64,${image}`}
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full"
                        />
                    ) : (
                        <img
                            src={userImage}
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full"
                        />
                    )}
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>
                    {
                        Phone && (<div>
                            <label htmlFor="Phone" className="block text-sm">Phone</label>
                            <input
                                type="tel"
                                id="name"
                                value={Phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2"
                                required
                            />
                        </div>)
                    }
                    <div className="font-[sans-serif]  mx-auto">
                        <label className="text-base text-gray-500 font-semibold mb-2 block">Upload Image</label>
                        <input type="file"
                            className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Update Profile</button>
                </form>
                <button onClick={() => navigate(-2)} className="w-full bg-blue-600 text-white py-2 rounded-lg mt-5">Back</button>
            </div>
        </>

    );
}

export default UpdateProfile;
