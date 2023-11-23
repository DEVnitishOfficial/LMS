
import aboutMainImage from '../assets/Images/aboutMainImage.png'
import apj from '../assets/Images/apj.png'
import billgates from '../assets/Images/billGates.png'
import einstein from '../assets/Images/einstein.png'
import nelson from '../assets/Images/nelsonMandela.png'
import steve from '../assets/Images/steveJobs.png'
import HomeLayout from '../Layout/HomeLayout'

function AboutUs() {
  return (
    <HomeLayout >
        <div className='pl-20 pt-20 flex flex-col text-white '>
            {/* some text and image */}
            <div className='flex items-center gap-5 mx-10'>
                <section className='w-1/2 space-y-10'>
                    <h1 className='text-5xl text-yellow-500 font-semibold'>
                        Affordable and quality education
                    </h1>
                    <p className='text-xl text-gray-200'>
                        Our goal is to provide the affordable and quality education to the world.
                        we are providing the platform for the aspiring teachers and student to
                         share theire skills, creativity and konowledge to each other to empower and contribute 
                         in the growth and wellness of mankind.
                    </p>
                </section>
                <div className='w-1/2'>
                    <img
                    id='test1'
                    style={{
                        // filter: "drop-shadow(0 -6mm 4mm rgb(160, 0, 210))"
                        filter: "drop-shadow(0 0 1rem pink)"
                    }}
                    className='drop-shadow-2xl'
                    src={aboutMainImage} alt="" />
                </div>
            </div>

            <div className="carousel w-1/2 my-16 m-auto">
  <div id="slide1" className="carousel-item relative w-full">
    <div className='flex flex-col items-center justify-center gap-5 px-[15%]'>    
    <img src={apj} className="w-40 rounded-full border-2 border-gray-400" />
    <p className='text-xl text-gray-200'>
        {"Look at the sky. We are not alone. The whole universe is friendly to us and conspires only to give the best to those who dream and work."}
    </p>
    <h3 className='text-2xl font-semibold'>APJ Abdul Kalam</h3>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide5" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
  <div className='flex flex-col items-center justify-center gap-5 px-[15%]'>    
    <img src={billgates} className="w-40 rounded-full border-2 border-gray-400" />
    <p className='text-xl text-gray-200'>
        {"Success is a lousy teacher. It seduces smart people into thinking they can’t lose."}
    </p>
    <h3 className='text-2xl font-semibold'>Bill Gates</h3>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
  <div className='flex flex-col items-center justify-center gap-5 px-[15%]'>    
    <img src={einstein} className="w-40 rounded-full border-2 border-gray-400" />
    <p className='text-xl text-gray-200'>
        {"Life is like riding a bicycle. To keep your balance, you must keep moving."}
    </p>
    <h3 className='text-2xl font-semibold'>Albert Einstein</h3>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
  <div className='flex flex-col items-center justify-center gap-5 px-[15%]'>    
    <img src={nelson} className="w-40 rounded-full border-2 border-gray-400" />
    <p className='text-xl text-gray-200'>
        {"Do not judge me by my successes, judge me by how many times I fell down and got back up again."}
    </p>
    <h3 className='text-2xl font-semibold'> Nelson Mandela</h3>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide5" className="btn btn-circle">❯</a>
    </div>
    </div>
  </div>

  <div id="slide5" className="carousel-item relative w-full">
  <div className='flex flex-col items-center justify-center gap-5 px-[15%]'>    
    <img src={steve} className="w-40 rounded-full border-2 border-gray-400" />
    <p className='text-xl text-gray-200'>
        {"Innovation distinguishes between a leader and a follower."}
    </p>
    <h3 className='text-2xl font-semibold'>Steve Jobs</h3>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
    </div>
  </div>
</div>
        </div>
    </HomeLayout>
  )
}

export default AboutUs