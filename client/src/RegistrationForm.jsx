
import { useState } from "react";
import OTP from "./OTP";
import axios from "axios";
import Swal from "sweetalert2";
const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        email: "",
        password: "",
        CompanyName: "",
        image: "",
        mobile: ""
    });
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };
    const setMobile = (newMobile) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            mobile: newMobile,
        }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formPayload = new FormData();
        formPayload.append("name", formData.firstname);
        formPayload.append("phone", formData.mobile);
        formPayload.append("email", formData.email);
        formPayload.append("password", formData.password);
        formPayload.append("CompanyName", formData.CompanyName);
        if (formData.image) {
            formPayload.append("image", formData.image);
        }

        try {
            const response = await axios.post("http://localhost:5000/addVisitor", formPayload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${response.data.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFormData({
                    firstname: "",
                    email: "",
                    password: "",
                    CompanyName: "",
                    image: null,
                    mobile: "",
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'warning',
                title: `${error.response?.data?.error}`,
                text: `You Have Already Have an Account with ${formData.email} `,
            });

        } finally {
            setLoading(false);
        }
    };
    const handleForm = (e) => {
        e.preventDefault();
        setStep(2)
    }
    const renderStepContent = () => {

        switch (step) {
            case 1:
                return (
                    <>

                        <form className="mt-24 " onSubmit={handleForm}>
                            <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
                                <div className="mx-auto mb-2 space-y-3">
                                    <h1 className="text-2xl font-bold text-gray-700">Log into Visitor Management</h1>
                                    <p className="text-gray-500">Login to access your account</p>
                                </div>
                                <div className=" ">
                                    <div className="flex items-center ">
                                        <button id="dropdown-phone-button" data-dropdown-toggle="dropdown-phone" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                                            <svg className=" w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100">
                                                {/* Saffron Stripe */}
                                                <rect width="150" height="33.33" fill="#FF9933" />
                                                {/* White Stripe */}
                                                <rect width="150" height="33.33" y="33.33" fill="white" />
                                                {/* Green Stripe */}
                                                <rect width="150" height="33.33" y="66.66" fill="#138808" />

                                                {/* Ashoka Chakra */}
                                                <circle cx="75" cy="50" r="15" fill="#000080" />
                                                {/* 24 Spokes of the Ashoka Chakra */}
                                                {[...Array(24)].map((_, index) => {
                                                    const angle = (index * 15); // 360° / 24 spokes
                                                    const x1 = 75 + 15 * Math.cos((angle - 90) * (Math.PI / 180));
                                                    const y1 = 50 + 15 * Math.sin((angle - 90) * (Math.PI / 180));
                                                    const x2 = 75 + 20 * Math.cos((angle - 90) * (Math.PI / 180));
                                                    const y2 = 50 + 20 * Math.sin((angle - 90) * (Math.PI / 180));

                                                    return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000080" strokeWidth="1" />;
                                                })}
                                            </svg>
                                            +91
                                            {/* <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" /></svg> */}
                                        </button>
                                        <div id="dropdown-phone" className="relative   z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button">
                                                <li>
                                                    <button type="button" className="inline-flex  w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                        <span className="inline-flex items-center relative  w-full">
                                                            <svg
                                                                fill="none"
                                                                aria-hidden="true"
                                                                className="h-4 w-4 me-2"
                                                                viewBox="0 0 20 15"
                                                            >
                                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                                                <mask
                                                                    id="a"
                                                                    style={{ maskType: 'luminance' }}
                                                                    width="20"
                                                                    height="15"
                                                                    x="0"
                                                                    y="0"
                                                                    maskUnits="userSpaceOnUse"
                                                                >
                                                                    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                                                </mask>
                                                                <g mask="url(#a)">
                                                                    <path
                                                                        fill="#D02F44"
                                                                        fillRule="evenodd"
                                                                        d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                    <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                                                                    <g filter="url(#filter0_d_343_121520)">
                                                                        <path
                                                                            fill="url(#paint0_linear_343_121520)"
                                                                            fillRule="evenodd"
                                                                            d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </g>
                                                                </g>
                                                                <defs>
                                                                    <linearGradient
                                                                        id="paint0_linear_343_121520"
                                                                        x1=".933"
                                                                        x2=".933"
                                                                        y1="1.433"
                                                                        y2="6.1"
                                                                        gradientUnits="userSpaceOnUse"
                                                                    >
                                                                        <stop stopColor="#fff" />
                                                                        <stop offset="1" stopColor="#F0F0F0" />
                                                                    </linearGradient>
                                                                    <filter
                                                                        id="filter0_d_343_121520"
                                                                        width="6.533"
                                                                        height="5.667"
                                                                        x=".933"
                                                                        y="1.433"
                                                                        colorInterpolationFilters="sRGB"
                                                                        filterUnits="userSpaceOnUse"
                                                                    >
                                                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                        <feColorMatrix
                                                                            in="SourceAlpha"
                                                                            result="hardAlpha"
                                                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                        />
                                                                        <feOffset dy="1" />
                                                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                                        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_343_121520" />
                                                                        <feBlend
                                                                            in="SourceGraphic"
                                                                            in2="effect1_dropShadow_343_121520"
                                                                            result="shape"
                                                                        />
                                                                    </filter>
                                                                </defs>
                                                            </svg>
                                                            India (+1)
                                                        </span>
                                                    </button>
                                                </li>
                                                {/* <li>
                                                    <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                        <span className="inline-flex items-center">
                                                            <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 20 15">
                                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                                                <mask
                                                                    id="a"
                                                                    style={{ maskType: 'luminance' }}
                                                                    width="20"
                                                                    height="15"
                                                                    x="0"
                                                                    y="0"
                                                                    maskUnits="userSpaceOnUse"
                                                                >
                                                                    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                                                </mask>
                                                                <g mask="url(#a)">
                                                                    <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                                                    <path
                                                                        fill="#fff"
                                                                        fillRule="evenodd"
                                                                        d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                    <path
                                                                        stroke="#DB1F35"
                                                                        strokeLinecap="round"
                                                                        strokeWidth=".667"
                                                                        d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093"
                                                                    />
                                                                    <path
                                                                        fill="#E6273E"
                                                                        fillRule="evenodd"
                                                                        d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </g>
                                                            </svg>
                                                            United Kingdom (+44)
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                        <span className="inline-flex items-center">
                                                            <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
                                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                                                <mask
                                                                    id="a"
                                                                    style={{ maskType: 'luminance' }}
                                                                    width="20"
                                                                    height="15"
                                                                    x="0"
                                                                    y="0"
                                                                    maskUnits="userSpaceOnUse"
                                                                >
                                                                    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                                                </mask>
                                                                <g mask="url(#a)">
                                                                    <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                                                    <path
                                                                        fill="#fff"
                                                                        stroke="#fff"
                                                                        strokeWidth=".667"
                                                                        d="M0 .167h-.901l.684.586 3.15 2.7v.609L-.194 6.295l-.14.1v1.24l.51-.319L3.83 5.033h.73L7.7 7.276a.488.488 0 00.601-.767L5.467 4.08v-.608l2.987-2.134a.667.667 0 00.28-.543V-.1l-.51.318L4.57 2.5h-.73L.66.229.572.167H0z"
                                                                    />
                                                                    <path
                                                                        fill="url(#paint0_linear_374_135177)"
                                                                        fillRule="evenodd"
                                                                        d="M0 2.833V4.7h3.267v2.133c0 .369.298.667.666.667h.534a.667.667 0 00.666-.667V4.7H8.2a.667.667 0 00.667-.667V3.5a.667.667 0 00-.667-.667H5.133V.5H3.267v2.333H0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                    <path
                                                                        fill="url(#paint1_linear_374_135177)"
                                                                        fillRule="evenodd"
                                                                        d="M0 3.3h3.733V.5h.934v2.8H8.4v.933H4.667v2.8h-.934v-2.8H0V3.3z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                    <path
                                                                        fill="#fff"
                                                                        fillRule="evenodd"
                                                                        d="M4.2 11.933l-.823.433.157-.916-.666-.65.92-.133.412-.834.411.834.92.134-.665.649.157.916-.823-.433zm9.8.7l-.66.194.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm0-8.866l-.66.193.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.193zm2.8 2.8l-.66.193.193-.66-.193-.66.66.193.66-.193-.193.66.193.66-.66-.193zm-5.6.933l-.66.193.193-.66-.193-.66.66.194.66-.194-.193.66.193.66-.66-.193zm4.2 1.167l-.33.096.096-.33-.096-.33.33.097.33-.097-.097.33.097.33-.33-.096z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <linearGradient
                                                                        id="paint0_linear_374_135177"
                                                                        x1="0"
                                                                        x2="0"
                                                                        y1=".5"
                                                                        y2="7.5"
                                                                        gradientUnits="userSpaceOnUse"
                                                                    >
                                                                        <stop stopColor="#fff" />
                                                                        <stop offset="1" stopColor="#F0F0F0" />
                                                                    </linearGradient>
                                                                    <linearGradient
                                                                        id="paint1_linear_374_135177"
                                                                        x1="0"
                                                                        x2="0"
                                                                        y1=".5"
                                                                        y2="7.033"
                                                                        gradientUnits="userSpaceOnUse"
                                                                    >
                                                                        <stop stopColor="#FF2E3B" />
                                                                        <stop offset="1" stopColor="#FC0D1B" />
                                                                    </linearGradient>
                                                                </defs>
                                                            </svg>
                                                            Australia (+61)
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                        <span className="inline-flex items-center">
                                                            <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
                                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                                                <mask id="a" style={{ maskType: 'luminance' }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                                    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                                                </mask>
                                                                <g mask="url(#a)">
                                                                    <path fill="#262626" fillRule="evenodd" d="M0 5.167h19.6V.5H0v4.667z" clipRule="evenodd" />
                                                                    <g filter="url(#filter0_d_374_135180)">
                                                                        <path fill="#F01515" fillRule="evenodd" d="M0 9.833h19.6V5.167H0v4.666z" clipRule="evenodd" />
                                                                    </g>
                                                                    <g filter="url(#filter1_d_374_135180)">
                                                                        <path fill="#FFD521" fillRule="evenodd" d="M0 14.5h19.6V9.833H0V14.5z" clipRule="evenodd" />
                                                                    </g>
                                                                </g>
                                                                <defs>
                                                                    <filter id="filter0_d_374_135180" width="19.6" height="4.667" x="0" y="5.167" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                                                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                                        <feOffset />
                                                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                                        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                                    </filter>
                                                                    <filter id="filter1_d_374_135180" width="19.6" height="4.667" x="0" y="9.833" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                                                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                                        <feOffset />
                                                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                                        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                                    </filter>
                                                                </defs>
                                                            </svg>
                                                            Germany (+49)
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                        <span className="inline-flex items-center">
                                                            <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 20 15">
                                                                <rect
                                                                    width="19.1"
                                                                    height="13.5"
                                                                    x=".25"
                                                                    y=".75"
                                                                    fill="#fff"
                                                                    stroke="#F5F5F5"
                                                                    strokeWidth=".5"
                                                                    rx="1.75"
                                                                />
                                                                <mask
                                                                    id="a"
                                                                    style={{ maskType: 'luminance' }}
                                                                    width="20"
                                                                    height="15"
                                                                    x="0"
                                                                    y="0"
                                                                    maskUnits="userSpaceOnUse"
                                                                >
                                                                    <rect
                                                                        width="19.1"
                                                                        height="13.5"
                                                                        x=".25"
                                                                        y=".75"
                                                                        fill="#fff"
                                                                        stroke="#fff"
                                                                        strokeWidth=".5"
                                                                        rx="1.75"
                                                                    />
                                                                </mask>
                                                                <g mask="url(#a)">
                                                                    <path fill="#F44653" d="M13.067.5H19.6v14h-6.533z" />
                                                                    <path
                                                                        fill="#1035BB"
                                                                        fillRule="evenodd"
                                                                        d="M0 14.5h6.533V.5H0v14z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </g>
                                                            </svg>
                                                            France (+33)
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                        <span className="inline-flex items-center">
                                                            <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 20 15">
                                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                                                <mask
                                                                    id="a"
                                                                    style={{ maskType: 'luminance' }}
                                                                    width="20"
                                                                    height="15"
                                                                    x="0"
                                                                    y="0"
                                                                    maskUnits="userSpaceOnUse"
                                                                >
                                                                    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                                                </mask>
                                                                <g mask="url(#a)">
                                                                    <path
                                                                        fill="#262626"
                                                                        fillRule="evenodd"
                                                                        d="M0 5.167h19.6V.5H0v4.667z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                    <g filter="url(#filter0_d_374_135180)">
                                                                        <path
                                                                            fill="#F01515"
                                                                            fillRule="evenodd"
                                                                            d="M0 9.833h19.6V5.167H0v4.666z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </g>
                                                                    <g filter="url(#filter1_d_374_135180)">
                                                                        <path
                                                                            fill="#FFD521"
                                                                            fillRule="evenodd"
                                                                            d="M0 14.5h19.6V9.833H0V14.5z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </g>
                                                                </g>
                                                                <defs>
                                                                    <filter
                                                                        id="filter0_d_374_135180"
                                                                        width="19.6"
                                                                        height="4.667"
                                                                        x="0"
                                                                        y="5.167"
                                                                        colorInterpolationFilters="sRGB"
                                                                        filterUnits="userSpaceOnUse"
                                                                    >
                                                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                        <feColorMatrix
                                                                            in="SourceAlpha"
                                                                            result="hardAlpha"
                                                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                        />
                                                                        <feOffset />
                                                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                                        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                                    </filter>
                                                                    <filter
                                                                        id="filter1_d_374_135180"
                                                                        width="19.6"
                                                                        height="4.667"
                                                                        x="0"
                                                                        y="9.833"
                                                                        colorInterpolationFilters="sRGB"
                                                                        filterUnits="userSpaceOnUse"
                                                                    >
                                                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                        <feColorMatrix
                                                                            in="SourceAlpha"
                                                                            result="hardAlpha"
                                                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                        />
                                                                        <feOffset />
                                                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                                        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                                    </filter>
                                                                </defs>
                                                            </svg>
                                                            Germany (+49)
                                                        </span>
                                                    </button>
                                                </li> */}
                                            </ul>
                                        </div>
                                        <label htmlFor="phone-input" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Phone number:</label>
                                        <div className="relative w-full">
                                            <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} id="phone-input" aria-describedby="helper-text-explanation" className="block p-2.5  relative  w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" pattern="^[6-9]\d{9}$" placeholder="123-456-7890" required />
                                        </div>
                                    </div>
                                    <p id="helper-text-explanation" className="mt-2 mb-4 text-sm text-gray-500 dark:text-gray-400">We will send you an SMS with a verification code.</p>
                                    <button type="submit" className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send verification code</button>
                                </div>
                            </div>
                        </form>
                    </>
                );
            case 2:
                return (
                    <>
                        <OTP setStep={setStep} mobile={formData.mobile} setMobile={setMobile} />
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="font-[sans-serif]">
                            <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[160px] sm:p-6 p-4">
                                <h4 className="sm:text-3xl text-2xl font-bold text-white">
                                    Create your account
                                </h4>
                            </div>
                            <div className="mx-4 mb-4 -mt-16">
                                <form
                                    onSubmit={handleSignUp}
                                    className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md"
                                >
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* First Name */}
                                        <div>
                                            <label className="text-gray-800 text-sm mb-2 block">
                                                First Name <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                name="firstname"
                                                type="text"
                                                value={formData.firstname}
                                                onChange={handleInputChange}
                                                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                                                placeholder="Enter name"
                                                required
                                            />
                                        </div>
                                        {/* Email */}
                                        <div>
                                            <label className="text-gray-800 text-sm mb-2 block">
                                                Email Id <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                                                placeholder="Enter email"
                                                required
                                            />
                                        </div>
                                        {/* Mobile */}
                                        <div>
                                            <label className="text-gray-800 text-sm mb-2 block">
                                                Mobile No. <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                name="mobile"
                                                type="tel"
                                                value={formData.mobile}
                                                onChange={handleInputChange}
                                                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                                                placeholder="Enter mobile number"
                                                required
                                            />
                                        </div>
                                        {/* Password */}
                                        <div>
                                            <label className="text-gray-800 text-sm mb-2 block">
                                                Password <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                name="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                                                placeholder="Enter Password"
                                                required
                                            />
                                        </div>
                                        {/* Organization Name */}
                                        <div>
                                            <label className="text-gray-800 text-sm mb-2 block">
                                                Organization Name <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                name="CompanyName"
                                                type="text"
                                                value={formData.CompanyName}
                                                onChange={handleInputChange}
                                                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                                                placeholder="Enter Company Name"
                                                required
                                            />
                                        </div>
                                        {/* Upload Image */}
                                        <div>
                                            <label className="text-gray-800 text-sm mb-2 block">
                                                Upload Image <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                name="image"
                                                type="file"
                                                onChange={handleFileChange}
                                                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-8 flex justify-between items-center">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="px-6 py-2 font-semibold text-gray-600 bg-gray-200 rounded"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleSignUp}
                                            className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                                            disabled={loading}
                                        >
                                            {loading ? "Signing up..." : "Sign up"}
                                        </button>
                                    </div>

                                    {/* Feedback Messages */}
                                </form>
                            </div>
                        </div>
                    </>
                );
            default:
                return <div className="Text Red">Complete!</div>;
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">

            {step < 4 && (
                <>
                    <div className="mb-5">{renderStepContent()}</div>
                    {/* {step !== 2 && ( // Hide all buttons if step is 2
                        <div className="flex justify-between">
                            {step > 1 && ( // Show "Previous" button only when step > 1
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded"
                                >
                                    Previous
                                </button>
                            )}

                            {step === 3 ? (
                                <button
                                    onClick={() => setStep(4)}
                                    className="px-4 py-2 text-white bg-green-600 rounded"
                                >
                                    Complete
                                </button>
                            ) : (
                                step !== 1 && (
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        className="px-4 py-2 text-white bg-blue-600 rounded"
                                    >
                                        Submit
                                    </button>
                                )
                            )}
                        </div>
                    )} */}
                </>
            )}


            {step === 4 && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Registration Complete!</h2>
                </div>
            )}

        </div>
    );
};

export default RegistrationForm;

