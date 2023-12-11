import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";

function AddLecture(){

  const courseDetails = useLocation().state

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userInput, setUserInput] = useState({
    // id : courseDetails._id,
    lecture : undefined,
    title : "",
    description : "",
    videoSrc : ""
  });

  function handleInputChange(e){
    const {name, value} = e.target
    setUserInput({
        ...userInput,
        [name] : value
    })
  }

  function handleVideo(e){
    const video = e.target.files[0]
    const source = window.URL.createObjectURL(video)
    console.log('source',source)
    setUserInput({
        ...userInput,
        lecture : video,
        videoSrc : source
    })
  }

  async function onFormSubmit(e){
     e.preventDefault()
     if(!userInput.lecture || !userInput.title || !userInput.description || !userInput.videoSrc){
        toast.error("All fields are mandatory")
        return 
     }
     const response = await dispatch(addCourseLecture(userInput));
     if(response?.payload?.success){
        setUserInput({
            // id : courseDetails._id,
            lecture : undefined,
            title : "",
            description : "",
            videoSrc : "" 
        })
     }
  }

  useEffect(() => {
    // if(!courseDetails) navigate("/course")
  },[])



    return(
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button
                        className="absolute left-2 text-xl text-green-500"
                        onClick={() => navigate(-1)}
                        >
                            <AiOutlineArrowLeft/>
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add New Lecture
                        </h1>
                    </header>
                    <form 
                    onSubmit={onFormSubmit}
                    className="flex flex-col gap-3"
                    >
                        <input
                         type="text" 
                         name="title"
                         placeholder="Entre the title of Lecture"
                         onChange={handleInputChange}
                         className="bg-transparent px-3 py-1 border"
                         value={userInput.title}                      
                         />
                         <textarea 
                         type="text"
                         name="description" 
                         placeholder="Entre the description of Lecture"
                         onChange={handleInputChange}
                         className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-24 "
                         value={userInput.description}
                         />
                         {
                            userInput.videoSrc ? (
                                <video
                                muted
                                src={userInput.videoSrc}
                                controls
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-tl w-full"
                                >

                                </video>
                            ) : (
                                    <div className="h-48 border flex items-center justify-center cursor-pointer">
                                        <label 
                                        className="font-semibold text-xl cursor-pointer" 
                                        > Choose your file</label>
                                        <input 
                                        type="file"
                                        // className="hidden"
                                        id="lecture"
                                        name="lecture"
                                        onChange={handleVideo}
                                        accept="video/mp4 video/x-mp4 video/x"
                                        
                                        />
                                    </div>
                            )
                         }
                         <button 
                         className="btn btn-primary py-1 font-semibold text-lg "
                         type="submit">
                            Add new Lecture
                         </button>
                    </form>
                </div>
            </div>

    </HomeLayout>
    )
   

}

export default AddLecture;