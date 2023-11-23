import { useNavigate } from "react-router-dom"

function NotFound() {
    const navigate = useNavigate()
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]'>
        <h1 className="text-9xl text-white font-extrabold tracking-widest">
            404
        </h1>
        <div className="bg-red-500 text-black font-bold rotate-12 rounded px-2 text-sm absolute">
            Page not found ....
        </div>
        <button className="mt-5">
            <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring ">
                <span onClick={() => navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                Go Back
                </span>
            </a>
            
        </button>
    </div>
  )
}

export default NotFound