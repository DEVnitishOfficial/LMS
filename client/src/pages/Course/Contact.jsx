import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../Helper/axiosInstance";
import { isValidEmail } from "../../Helper/regexMatcher";
import HomeLayout from "../../Layout/HomeLayout";

function Contact() {

       const [userInput, setUserInput] = useState({
        name : "",
        email : "",
        message : ""
       })

       function handleInputChange(e){
        const {name, value} = e.target;
        console.log(name,value)
        setUserInput({
            ...userInput,
            [name] : value
        })
       }

       async function onFormSubmit(e){
        e.preventDefault()
        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("all fields are mandatory");
            return;
        }

        if(!isValidEmail(userInput.email)){
            toast.error("Invalid Email");
            return;
        }

        try{
            const response = axiosInstance.post("/contact", userInput)
            toast.promise(response, {
                loading : "Submitting your form",
                success : "Form submittes successfully",
                error : "Failed to submit form"
            })
            const contactResponse = await response
            if(contactResponse?.data.success){
                setUserInput({
                    name : "",
                    email : "",
                    message : ""
                })
            }
        }catch(error){
            toast.error("Failed to submit form")
        }

       }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
        noValidate
        onSubmit={onFormSubmit}
        className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">
          <h1 className="text-3xl font-semibold">Contact Form</h1>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              type="text"
              name="name"
              placeholder="Entre your name..."
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Email
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              type="email"
              name="email"
              placeholder="Entre your Email..."
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              id="message"
              type="message"
              name="message"
              placeholder="Entre your message..."
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>
          <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
