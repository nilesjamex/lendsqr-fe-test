import React from 'react'
import Spinner from "../Layout/Spinner/index"
// import Dash from '../Components/Dashboard/index'

const Dashboard = () => {
   // lazy load profile
   const OtherProfile = React.lazy(() => import('../Components/User/index'))
  return (
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherProfile />
      </div>
    </React.Suspense>
  )
}

export default Dashboard