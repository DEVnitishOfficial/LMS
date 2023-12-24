import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js'
import { useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layout/HomeLayout'
import { deleteCourses, getAllCourses } from '../../Redux/Slices/CourseSlice'
import { getPaymentRecord } from '../../Redux/Slices/RazorpaySlice'
import { getStatsData } from '../../Redux/Slices/StateSlice'
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
)

function AdminDashboard () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { allUserCount, subscribedCount } = useSelector(state => state.stats)
  const { allPayments, finalMonths, monthelySalesRecords } = useSelector(
    state => state.razorPay
  )

  const userData = {
    labels: ['Registered user', 'Enrolled user'],
    datasets: [
      {
        label: 'user Details',
        data: [allUserCount, subscribedCount],
        backgroundColor: ['yellow', 'green'],
        borderWidth: 1,
        borderColor: ['yellow', 'green']
      }
    ]
  }
  const salesData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    fontColor: 'white',
    datasets: [
      {
        label: 'sales/month',
        data: monthelySalesRecords,
        backgroundColor: ['(255, 99, 132)'],
        borderColor: ['white'],
        borderWidth: 2
      }
    ]
  }

  const myCourse = useSelector(state => state?.course?.courseData)

  async function onCourseDelete (id) {
    if (window.confirm('Are you sure you want to delete this course ?')) {
      const res = await dispatch(deleteCourses(id))
      if (res?.payload?.success) {
        await dispatch(getAllCourses())
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses())
      await dispatch(getStatsData())
      await dispatch(getPaymentRecord())
    })()
  }, [])

  return (
    <HomeLayout>
      <div className='min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white'>
        <h1 className='text-center text-5xl font-semibold text-yellow-500 '>
          Admin Dashboard
        </h1>
        <div className='grid grid-cols-2 gap-5 m-auto mx-10'>
          <div className='flex flex-col items-center gap-10 p-5 shadow-lg rounded-md'>
            <div className='w-80 h-80'>
              <Pie data={userData} />
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default AdminDashboard
