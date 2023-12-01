import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center h-[90vh]">
        <form
          className="flex flex-col justify-center text-white gap-5 rounded-lg p-4 w-[700px] my-10 shadow-[0_0_10px_black] relative"
          onSubmit={onFormSubmit}
        >
          <Link className="absolue top-8 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-2xl font-bold">Create New Course</h1>

          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_upload" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border"
                      src={userInput.previewImage}
                      alt="img"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-xl ">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  onChange={handleImageUpload}
                  className="hidden"
                  type="file"
                  id="image_upload"
                  name="image_upload"
                  accept=".jpg, .jpeg, .png"
                />
              </div>

              <div className="flex flex-col gap-1 ">
                <label className="text-lg font-semibold mt-4" htmlFor="title">
                  Course Title
                </label>
                <input
                  className="bg-transparent px-2 py-1 border"
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Entre course title..."
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div>
            <div className="flex flex-col gap-1 ">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Course Instructor
                </label>
                <input
                  className="bg-transparent px-2 py-1 border"
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Entre course creator name..."
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1 ">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course Category
                </label>
                <input
                  className="bg-transparent px-2 py-1 border"
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Entre course creator name..."
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1 ">
                <label className="text-lg font-semibold" htmlFor="description">
                  Course Description
                </label>
                <textarea
                  className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Entre course creator name..."
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>
          <button type="submit" className=" py-2 w-full bg-yellow-600 hover:bg-yelllow-500 ease-in-out transition-all duration-300 ">
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
