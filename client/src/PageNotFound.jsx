import {  useNavigate } from "react-router-dom";
import notFound from "./assets/Image/404-error.png";

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <>
            <section className="bg-white h-auto">
                <div className=" mx-auto max-w-screen-xl ">
                    <div className="mx-auto max-w-screen-sm text-center ">
                        {/* <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 ">404</h1> */}
                        <img src={notFound} className="h-auto max-w-full object-cover  " />
                        <p className="mb-4 text-3xl tracking-tight font-bold text-black md:text-4xl ">Sorry, page not found</p>
                        <p className="mb-2 text-lg font-light text-gray-500 dark:text-gray-400">It will be as simple as Occidental in fact, it will be Occidental </p>
                        <button onClick={() => navigate(-1)} className="inline-flex text-white  hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-base px-5 py-2.5 text-center  my-4" style={{ backgroundColor: "rgb(5,118,185)" }}>Back </button>
                    </div>
                </div>
            </section>
            ;
        </>
    );
}

export default PageNotFound;