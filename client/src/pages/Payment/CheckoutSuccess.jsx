import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function CheckoutSuccess(){

    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(getUserData())
    },[])

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex justify-center items-center text-white">
                <div className="w-80 h-[26rem] flex justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-green-500 absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Payment Successfull</h1>

                          <div className="px-4 flex flex-col justify-center items-center space-y-2">
                            <div className="text-center space-y-2">
                                <h2 className="text-lg font-semibold"> Welcome to the pro bundle</h2>
                                <p className="">
                                    Now you can enjoy all the course
                                </p>
                            </div>
                            <AiFillCheckCircle className="text-green-500 text-5xl"/>
                          </div>

                          <Link to="/" className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 font-semibold text-center rounded-bl-lg rounded-br-lg">
                           <button>Go To Dashboard</button>
                          </Link>

                </div>

            </div>
        </HomeLayout>
    )
}
export default CheckoutSuccess;