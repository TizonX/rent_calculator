import React from 'react'
import { useRouter } from 'next/navigation'
import "../../style/HomeCard/HomeCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse
} from "@fortawesome/free-solid-svg-icons";
import Spinner from '../ReUsableComponents/Loader';
const HomeCard = ({ propertyData }) => {
  const defaultHomeImg = "https://newhomelistingservice.com/assets/default_logo/large_square_emg_default-04cb60da994cb5a009f5f7640a7881a7b035e7bddba555c218b5e084b2a64f93.jpg";
  const router = useRouter()
  const handlePropertySelect = (param) => {
    router.push(`/property-details/${param}`);
  }
  return (
    <div className="parentCard">

      {propertyData.length > 0 ?

        propertyData.map((count, index) => (
          <div className='card' key={index} onClick={() => handlePropertySelect(count)}>
            <div className='home-image'>
              {/* <FontAwesomeIcon
              icon={faHouse}
            /> */}
              <img src={defaultHomeImg} alt="Home" />
            </div>
            <h2>Title</h2>
          </div>
        ))
        :
        <div className='spinner'>
          <Spinner />
        </div>
      }
    </div>
  )
}

export default HomeCard