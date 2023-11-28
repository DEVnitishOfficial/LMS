import { useState } from 'react'
import {toast} from 'react-hot-toast'
import { BsPersonCircle } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { isValidEmail, isValidPassword } from '../Helper/regexMatcher'
import HomeLayout from '../Layout/HomeLayout'
import { createAccount } from '../Redux/Slices/AuthSlice'

function SignUp() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [previewImage, setPreviewImage] = useState("")

    const [signUpData, SetSignUpData] = useState({
        fullName : "",
        email : "",
        password : "",
        avatar : ""
    })

    function handleUserInput(e){
        const {name, value} = e.target;
        SetSignUpData({
            ...signUpData,
            [name] : value
        })
    }
    
    function getImage(event){
        event.preventDefault()
        // getting the image
        const uploadImage = event.target.files[0]

        if(uploadImage){
            SetSignUpData({
                ...signUpData,
                avatar : uploadImage
            })
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadImage)
            fileReader.addEventListener("load", function(){
                console.log(this.result)
                setPreviewImage(this.result)
            })
        }
    }

     async function createNewAccount(event){
        event.preventDefault()
        if(!signUpData.email || !signUpData.password || !signUpData.avatar || !signUpData.fullName){
            toast.error("please fill all the field")
            return
        }
            //checking name length
        if(signUpData.fullName.length < 5){
            toast("FullName should be at least of 5 characters")
            return
        }
            // checking valid email
        if(!isValidEmail(signUpData.email)){
        toast('Please entre a valid email')
        return
        }
             // checking password validation
        if(!isValidPassword(signUpData.password)){
        toast('Password should be at least 6-16 character with one number and special character')
        return
        }

        const formData = new FormData()
        formData.append('fullName', signUpData.fullName)
        formData.append('email',signUpData.email)
        formData.append('password',signUpData.password)
        formData.append('avatar',signUpData.avatar)

        // dispatch create account action

        const response = await dispatch(createAccount(formData)) 
        console.log('response',response)
        if(response?.payload?.success)
        navigate("/")
        SetSignUpData({
            fullName : "",
            email : "",
            password : "",
            avatar : ""
        })

        setPreviewImage("")
        

    }

  return (
   <HomeLayout>
    <div className='flex items-center justify-center h-[90vh]'>
        <form noValidate onSubmit={createNewAccount} className='flex flex-col gap-3 justify-center rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
            <h1 className='text-center text-2xl font-bold'>
                Registration Page
            </h1>

            <label htmlFor="image_uploads" className='cursor-pointer'>
                {previewImage ? (
                <img className='h-24 w-24 rounded-full m-auto'src={previewImage} alt='profileImage' />
                ): (
                <BsPersonCircle className=' h-24 w-24 rounded-full m-auto'/>
                )}
            </label>
            <input
            onChange={getImage}
            className=''
            type="file" 
            name='image_uploads'
            id='image-upload'
            accept='.jpg, .jpeg, .png, .svg,'
            />

<div className='flex flex-col gap-1'>
                <label htmlFor="fullName" className='font-semibold'>Name</label>
                <input 
                className='bg-transparent px-2 py-1 border'
                type="text" 
                required
                name='fullName'
                id='fullName'
                onChange={handleUserInput}
                value={signUpData.fullName}
                placeholder='Entre your name....'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='font-semibold'>Email</label>
                <input 
                className='bg-transparent px-2 py-1 border'
                type="email" 
                required
                name='email'
                id='email'
                onChange={handleUserInput}
                value={signUpData.email}
                placeholder='Entre your mail....'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                <input 
                className='bg-transparent px-2 py-1 border'
                type="password" 
                required
                name='password'
                id='password'
                placeholder='Entre your password....'
                onChange={handleUserInput}
                value={signUpData.password}
                />
            </div>

            <button type='submit' className='bg-yellow-600 mt-2 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                Create Account
            </button>

            <p className='text-center'>
                Already have an account ? <Link to="/login" className='link text-accent cursor-pointer'> Login </Link>
            </p>
        </form>

    </div>
   </HomeLayout>
  )
}

export default SignUp