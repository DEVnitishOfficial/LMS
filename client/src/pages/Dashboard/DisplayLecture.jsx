import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { deleteCourseLecture, getCourseLecture } from "../../Redux/Slices/LectureSlice";

function DisplayLecture() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId){
    await dispatch(deleteCourseLecture({courseId: courseId, lectureId: lectureId}))
    await dispatch(getCourseLecture(courseId));
    
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLecture(state._id));
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        <div className="text-2xl text-center font-semibold text-yellow-500">
          Course Name : {state.title}
        </div>
          
        {lectures && lectures.length>0 &&<div className="flex justify-center gap-10 w-full">
            {/* Left section for playing videos and displaying course details to admin */}
          <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
            <video
              src={lectures && lectures[currentVideo]?.lecture?.secure_url}
              className="object-fill rounded-tr-lg rounded-tl-lg w-full"
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            >
            </video>
            <div>
            <h1>
                <span className="text-yellow-500 "> Title : 
                    {lectures && lectures[currentVideo]?.title}
                </span>
            </h1>
            <p>
                <span className="text-yellow-500 line-clamp-4">
                    Description : {" "}
                </span>
            </p>
          </div>
          </div>
        
       
        {/* Right section for displaying course list */}
        <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lecture List</p>
                {role === 'ADMIN' && (
                    <button onClick={() => navigate("/course/addlecture",{state:{...state}})} className=" bg-green-500 px-2 py-1 rounded-md font-semibold text-xl">
                        Add new lectures
                    </button>
                )}
            </li>
            {
                lectures && lectures.map((lecture, index) =>{
                    return(
                        <li key={lecture.id} className="space-y-2 ">
                            <p className="cursor-pointer" onClick={() => {setCurrentVideo(index)}}>
                                <span>
                                    {" "} Lecture {index + 1} : {" "}
                                </span>
                                {lecture?.title}
                            </p>
                {role === 'ADMIN' && (
                    <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className="bg-red-500 px-2 py-1 rounded-md font-semibold text-sm">
                        Delete Lecture
                    </button>
                )}

                        </li>
                    )
                } )
            }
        </ul>
      </div>}
      </div>
    </HomeLayout>
  );
}
export default DisplayLecture;
