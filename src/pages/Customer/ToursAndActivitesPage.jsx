import React from 'react'
import ToursAndActivitiesCards from '../../components/ToursAndActivities/ToursAndActivitiesCards'
import TopActivities from '../../components/ToursAndActivities/TopActivities'
import ToursActivitesBreadCrumbs from '../../components/ToursAndActivities/ToursActivitesBreadCrumbs'

const ToursAndActivitesPage = () => {
  return (
    <div>
        <ToursActivitesBreadCrumbs/>
      <ToursAndActivitiesCards/>
      <TopActivities/>
    </div>
  )
}

export default ToursAndActivitesPage
