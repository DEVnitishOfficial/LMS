
import aboutMainImage from '../assets/Images/aboutMainImage.png'
import CarouselSlide from '../components/CarouselSlide'
import { celebrities } from '../constant/CelebrityData'
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
              {celebrities && celebrities.map((celebrity) => (
                <CarouselSlide
                {...celebrity}
                key={celebrity.slideNumber}
                totalSlide={celebrities.length}
                />
              ) )}
</div>
        </div>
    </HomeLayout>
  )
}

export default AboutUs