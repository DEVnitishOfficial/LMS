import { useEffect } from "react"
import toast from "react-hot-toast"
import {BiRupee} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import HomeLayout from "../../Layout/HomeLayout"
import { getRazorPayId,purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice.js"

function CheckOut(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const razorPayKey = useSelector((state) => state?.razorPay?.key)
    const subscription_id = useSelector((state) => state?.razorPay?.subscription_id)
    const userData = useSelector((state) => state?.auth?.data)
    const isPaymentVerified = useSelector((state) => state?.razorPay?.isPaymentVerified)
    const paymentDetails = {
        razorpay_payment_id : " ",
        razorpay_subscription_id : " ",
        razorpay_signature : " "
    }

    async function handleSubscription(e){
        e.preventDefault()
        if(!razorPayKey || !subscription_id){
        toast.error("Something went wrong either with razorPayKey or id")
            return;
        }
        const options = {
            key : razorPayKey,
            subscription_id : subscription_id,
            name : "nitishOfficial Pvt. Ltd.",
            theme : {
                color : "#F37254"
            },
            prefill : {
                name : userData.name,
                email : userData.email
            },
            description : "subscription",
            handler : async function (response){
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id
                paymentDetails.razorpay_signature = response.razorpay_signature

                toast.success("payment successfull")
                await dispatch(verifyUserPayment(paymentDetails))
                isPaymentVerified ? navigate("/checkout/success") : navigate("/checkout/fail")
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

   async function load(){
        await dispatch(getRazorPayId())
        await dispatch(purchaseCourseBundle())

    }

    useEffect(() => {
         load()
    },[])
   return(
    <HomeLayout>
        <form 
        onSubmit={handleSubscription}
        className=" min-h-[90vh] flex justify-center items-center text-white"
        >
            <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative"
            >
                <h1
                className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg"
                >Subscription Bundle</h1>
                <div className="px-4 space-y-5 text-center ">
                    <p className="text-[17px]">
                        This purchase will allow you to access all the available course
                        of our platform for {" "}
                        <span className="text-yellow-500 font-bold">
                            <br />
                            1 year subscription duration
                        </span>
                        All the existing and new launched courses will also be available
                    </p>
                    <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                        <BiRupee/> <span>499</span>only
                    </p>
                    <div>
                        <p>100% refund on cancellation </p>
                        <p>* Terms and condition applied *</p>
                    </div>
                    <button
                    type="submit" className="bg-yellow-600 hover:bg-yellow-500 tranistion-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-bold font-semibold rounded-bl-lg rounded-br-lg py-2">
                            Buy Now
                    </button>
                </div>
            </div>
        </form>
    </HomeLayout>
   )
}

export default CheckOut