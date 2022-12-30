import React from 'react'
import Spinner from "../Layout/Spinner/index"
// import Dash from '../Components/Dashboard/index'

const Dashboard = () => {
   // lazy load dashboard
   const OtherTable = React.lazy(() => import('../Components/Dashboard/index'))
  return (
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherTable />
      </div>
    </React.Suspense>
  )
}

export default Dashboard