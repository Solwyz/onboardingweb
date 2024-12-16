import React, { useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function PortfolioComponent() {
  const [activeTab, setActiveTab] = useState("Month");

  // Handle tab switching for Day, Week, Month, Year
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const barData = {
    labels: ["2019", "2020", "2021", "2022"],

    datasets: [
      {
        label: "Services",
        data: [2, 3.1, 2.8, 2.5],
        backgroundColor: "#4A3AFF",
      },
      {
        label: "Inhouse",
        data: [1.5, 2.3, 2, 2.2],
        backgroundColor: "#C893FD",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom container height
    borderRadius: 8,
    barThickness: 24,
    borderWidth: 2,
    plugins: {
      legend: {
        display: false,
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#1E1B39",
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}M`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        barPercentage: 0.6, // Adjust bar width as a percentage of available space
        categoryPercentage: 0.8, // Adjust space between bars in the same group
      },
      y: {
        ticks: {
          stepSize: 1,
          callback: (value) => `${value}M`,
        },
      },
    },
  };

  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Male",
        data: [
          1000, 2000, 1500, 3000, 2500, 2000, 2700, 3500, 4000, 3000, 2800,
          3200,
        ],
        borderColor: "#4A3AFF",
        fill: false,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
      },
      {
        label: "Female",
        data: [
          800, 1500, 1200, 2000, 1800, 1600, 2100, 2800, 3000, 2500, 2400, 2900,
        ],
        borderColor: "#C893FD",
        fill: false,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.raw} employees`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          axis: {
        borderColor: "#E5E5EF", // Set color of the x-axis line
      },
        },
      },
      y: {
        ticks: {
          stepSize: 1000,
          color: "#615E83",
        },
        grid: {
          borderDash: [5, 5],
        },
        axis: {
        borderColor: "#fffff", // Set color of the y-axis line
      },
      },
    },
  };

  const doughnutData = {
    labels: ["Approved", "Pending", "Under Review", "Rejected"],
    datasets: [
      {
        data: [410, 142, 340, 590],
        backgroundColor: ["#4A3AFF", "#962DFF", "#E0C6FD", "#C6D2FD"],
        hoverOffset: 25,
      },
    ],
  };

  const doughnutOptions = {
    maintainAspectRatio: false, // Allows custom height and width
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1E1B39",
        callbacks: {
          label: (context) => ` ${context.raw}`,
        },
      },
    },
    cutout: "65%",
    hoverOffset: 10,
  };

  return (
    <div className=" min-h-screen ">
      <div className="grid grid-cols-4   gap-2">
        {/* Monthly Activity Chart */}
        <div className="bg-white h-[393px] px-6 pt-4 pb-6 shadow rounded-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xs text-[#9291A5] font-normal">Statistics</h3>
            <h4 className="text-xs  text-[#1E1B39] font-bold">
              Monthly Activity
            </h4>
            <div className="border-b mt-[11px] w-full mx-auto "></div>
            <div className="relative h-[160px] mt-4 flex justify-center items-center">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="absolute text-center">
                <p className="text-2xl text-[#1E1B39] font-bold">1.05</p>
                <p className="text-xs font-normal text-[#9291A5]">
                  Average range
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {doughnutData.labels.map((label, index) => (
              <div
                key={label}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center space-x-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        doughnutData.datasets[0].backgroundColor[index],
                    }}
                  ></span>
                  <span className="text-[#615E83] text-xs font-semibold">
                    {label}
                  </span>
                </div>
                <span className="font-normal text-xs text-[#9291A5]">
                  {doughnutData.datasets[0].data[index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Annual Revenue Chart */}
        <div className="col-span-2 h-[393px] bg-white pl-8 pt-8 py-4 pr-4 shadow rounded-lg">
          <div className="flex justify-between pr-[50px]">
            <div className="">
              <h3 className="text-xs text-[#9291A5] font-normal">Statistics</h3>
              <h3 className="text-xs text-[#1E1B39] font-bold">
                Annual Revenue
              </h3>
            </div>
            {/* Legend with Circle Indicators */}
            <div className=" ">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#4A3AFF" }}
                ></div>
                <span className="text-sm text-[#615E83] font-medium">
                  Services
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#C893FD" }}
                ></div>
                <span className="text-sm text-[#615E83] font-medium">
                  Inhouse
                </span>
              </div>
            </div>
          </div>

          <div className="border-b mt-[34px] w-[440px] border-[#E5E5EF] mx-auto "></div>

          {/* Bar Chart */}
          <div className="h-[245px] mt-6  items-center pr-4">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Mini Statistics */}
        <div className="space-y-2 ">
          <div className="bg-white h-[193px] p-6 shadow rounded-lg flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-2">Statistics</h3>
            <p className="text-4xl font-bold text-green-500">635</p>
            <p className="text-sm text-green-500">+21.01%</p>
          </div>
          <div className="bg-white p-6 h-[192px] shadow rounded-lg flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-2">Statistics</h3>
            <p className="text-4xl font-bold text-green-500">635</p>
            <p className="text-sm text-green-500">+21.01%</p>
          </div>
        </div>
      </div>

      <div className="mt-2">
           {/* Total Employees Stats with Tabs */}
      <div className=" bg-white items-center justify-center h-[415px]  shadow rounded-lg">
      <div className="flex pl-8 pt-8 pr-[106px]">
         <div className="">
            <h3 className="text-xs text-[#9291A5] font-normal">Statistics</h3>
            <h3 className="text-xs text-[#1E1B39] font-bold">Total Employees</h3>
    
         </div>
         <div className="flex justify-center items-center ml-[336px] space-x-[84px]">
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 bg-[#4A3AFF] rounded-full"></div>
      <span className="text-sm text-[#615E83] font-medium">Male</span>
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 bg-[#C893FD] rounded-full"></div>
      <span className="text-sm text-[#C893FD] font-medium">Female</span>
    </div>
  </div>

          {/* Tabs */}
          <div className="flex justify-center bg-[#F8F8FF] ml-[122px] rounded-[14px] items-center h-[49px]">
  <div className="flex space-x-2 py-[16px] px-[24px] ">
    {["Day", "Week", "Month", "Year"].map((tab) => (
      <button
        key={tab}
        onClick={() => handleTabClick(tab)}
        className={`text-sm font-medium py-[10px] px-[14px] rounded-[13px] ${
          activeTab === tab ? "bg-[#304BA0] text-white" : "text-[#9291A5]"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>

      </div>

        {/* Line Chart */}
        <div className="h-[280px] pl-5 pb-[28px] pr-[35px] mt-[45px]">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>


      </div>
    </div>
  );
}

export default PortfolioComponent;
