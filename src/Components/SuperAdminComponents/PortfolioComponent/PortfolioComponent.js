import React from "react";
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
        backgroundColor: '#1E1B39',
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
      },
      y: {
        ticks: {
          stepSize:1,
          callback: (value) => `${value}M`,
        },
        grid: {
      
            borderDash: [5, 5]
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
        },
      },
      y: {
        ticks: {
          stepSize: 1000,
        },
        grid: {
          borderDash: [5, 5],
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
        backgroundColor: '#1E1B39',
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
            <h4 className="text-xs  text-[#1E1B39] font-bold">Monthly Activity</h4>
            <div className="border-b mt-[11px] w-full mx-auto "></div>
            <div className="relative h-[160px] mt-4 flex justify-center items-center">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="absolute text-center">
                <p className="text-2xl text-[#1E1B39] font-bold">1.05</p>
                <p className="text-xs font-normal text-[#9291A5]">Average range</p>
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
                  <span className="text-[#615E83] text-xs font-semibold">{label}</span>
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
        <h3 className="text-xs text-[#9291A5] font-normal">Statistics</h3>
          <h3 className="text-xs  text-[#1E1B39] font-bold">Annual Revenue</h3>
          
          <div className="border-b mt-[11px] w-full mx-auto "></div>

          <Bar data={barData} className=" items-center mt-[14px] " options={barOptions} />
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
        {/* Total Employees Stats */}
        <div className="bg-white items-center justify-center h-[415px] p-6 shadow rounded-lg">
        <h3 className="text-xs text-[#9291A5] font-normal">Statistics</h3>
          <h3 className="text-xs  text-[#1E1B39] font-bold">Total Employees</h3>
       <div  className="h-[300px] mt-8">   <Line data={lineData}  options={lineOptions} /></div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioComponent;
