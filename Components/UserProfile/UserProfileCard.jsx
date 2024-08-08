import React from "react";
// import "../../style/UserProfileCard/UserProfileCard.css";
const UserProfileCard = ({ userData, open, close }) => {
  const defaultProfile =
    "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-2">
      <div className="flex flex-col items-center pb-10 pt-4">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={defaultProfile}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userData?.firstName + " " + userData?.lastName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {userData?.role}
        </span>
        <div className="flex mt-4 md:mt-6 w-64">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Log Out
          </button>
        </div>
        <div className="flex mt-2 md:mt-6 w-64">
          <button
            type="button"
            className="text-slate-700 outline-none bg-slate-100 hover:bg-slate-200 dark:hover:bg-blue-300 dark:focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            onClick={() => close(!open)}
          >
            + Add New Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
