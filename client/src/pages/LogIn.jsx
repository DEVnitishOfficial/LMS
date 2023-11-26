import { useState } from 'react'
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import HomeLayout from '../Layout/HomeLayout'
import { logIn } from '../Redux/Slices/AuthSlice'

function LogIn() {

    const dispatch = useDispatch()

    const [logInData, setLogInData] = useState({
        email : "",
        password : ""
    })

    function handleUserInput(e){
        const {name, value} = e.target;
        setLogInData({
            ...logInData,
            [name] : value
        })
    }

     async function handleLogIn(event){
        event.preventDefault()
        if(!logInData.email || !logInData.password){
            toast.error("please fill all the field")
            return
        }

        // dispatch create account action

        const response = await dispatch(logIn(logInData)) 
        console.log('response',response)
        if(response?.payload?.success)
        setLogInData({
            email : "",
            password : "",
        })
        

    }

  return (
   <HomeLayout>
    <div className='flex items-center justify-center h-[90vh]'>
        <form noValidate onSubmit={handleLogIn} className='flex flex-col gap-3 justify-center rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
            <h1 className='text-center text-2xl font-bold'>
                LogIn Page
            </h1>

            <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='font-semibold'>Email</label>
                <input 
                className='bg-transparent px-2 py-1 border'
                type="email" 
                required
                name='email'
                id='email'
                onChange={handleUserInput}
                value={logInData.email}
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
                value={logInData.password}
                />
            </div>

            <button type='submit' className='bg-yellow-600 mt-2 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                LogIn
            </button>

            <p className='text-center'>
                Having no account ? <Link to="/signup" className='link text-accent cursor-pointer'> SignUp </Link>
            </p>
        </form>

    </div>
   </HomeLayout>
  )
}

export default LogIn