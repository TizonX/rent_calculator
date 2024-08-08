import React from "react";
import Spinner from "../ReUsableComponents/Loader";
import HomeDefaultImage from "../../asset/image/homeDefault.jpg";
import { useRouter } from "next/navigation";
const HomeCard = ({ propertyData }) => {
  const router = useRouter();
  const handlePropertySelect = (param) => {
    router.push(`/property-details/${param}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-2">
      {propertyData.length > 0 ? (
        propertyData.map((count, index) => (
          <div
            key={index}
            className="flex flex-col bg-white border shadow-sm rounded-xl w-80 cursor-pointer"
            onClick={() => handlePropertySelect(count._id)}
          >
            <img
              className="w-full h-auto rounded-t-xl"
              src={count.bannerImage}
              alt="Card Image"
              onError={(e) => (e.currentTarget.src = HomeDefaultImage)}
            />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800">
                {count.propertyName}
              </h3>
              <h3 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {count.houseNo}
              </h3>
              <p className="mt-1 text-gray-500">{count.address}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="spinner">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default HomeCard;
