import React from "react";

import ComplaintsChart from "./ComplainChart.page";
import GeneralChart from "./GeneralChart.page";
import Recent from "../components/admin/Recent";

const Main = () => {
  return (
    <div className="container w-full md:w-[75vw] flex flex-col flex-grow z-0 h-screen overflow-y-hidden bg-white shadow-lg shadow-emerald-500 bg-opacity-60 backdrop-blur-md backdrop-filter py-6 rounded-lg ms-0 md:mx-8  ">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 h-[400px] sm:h-[400px] md:h-[20vh] px-6">
        <div className="bg-slate-200 shadow-lg shadow-slate-500 rounded-2xl h-[100px] sm:h-[150px] md:h-[200px] mb-5">
          <ComplaintsChart />
        </div>
        <div className="bg-slate-200 shadow-lg shadow-slate-500 rounded-2xl h-[100px] md:h-[200px]">
          <GeneralChart />
        </div>
        <div>
          <Recent />
        </div>
      </div>
    </div>
  );
};

export default Main;
