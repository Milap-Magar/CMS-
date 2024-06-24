// Main.js
import React from "react";
import ComplaintsChart from "./ComplainChart.page";

const Main = () => {
  return (
    <div className="w-full md:w-[75vw] flex flex-col flex-grow overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[580px] sm:h-[20vh] md:h-[30vh] px-6">
        <div className="bg-slate-200 shadow-lg shadow-slate-500 rounded-2xl h-[100px] md:h-[200px]">
          {" "}
          <ComplaintsChart />
        </div>
        <div className="bg-slate-200 shadow-lg shadow-slate-500 rounded-2xl h-[100px] md:h-[200px]">
          {" "}
          <ComplaintsChart />
        </div>
        <div className="bg-slate-200 shadow-lg shadow-slate-500 rounded-2xl h-[100px] md:h-[200px]">
          {" "}
          <ComplaintsChart />
        </div>
        <div className="bg-slate-200 shadow-lg shadow-slate-500 rounded-2xl h-[100px] md:h-[200px]">
          {" "}
          <ComplaintsChart />
        </div>
      </div>
      {/* <div className="flex-grow mx-5 overflow-y-auto font-raleway">
        <div className="p-4 border bg-slate-200 rounded-2xl shadow-lg shadow-slate-500">
          <h2 className="text-xl font-semibold mb-4">Recent Complaints:</h2>
          <div className="space-y-4">
            <div className="p-4 bg-slate-100 rounded-md shadow">
              Recent Item 1
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Main;
