
'use client'
import {
  Chart as ChartJS,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar} from 'react-chartjs-2';
import { useMemo } from 'react';
import Link from 'next/link';
import { RiLinkM } from 'react-icons/ri';
import { IoCloseOutline } from 'react-icons/io5';


ChartJS.register(BarElement,PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Stats = ({stats,shortCode,originalUrl,totalClicks,setOpenStats}) => {
  

  const labels = useMemo(
    () =>
      stats.map(entry =>
        new Date(entry.time).toLocaleString('en-IN', {
          dateStyle: 'short',
          timeStyle: 'short',
        })
      ),
    [stats]
  );

  const dataPoints = stats.map(entry => entry.clickCount||1);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Clicks',
        data: dataPoints, // 1 per click
        fill: true,
        borderColor: '#6366f1',
        backgroundColor: 'rgb(78, 80, 228)',
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          afterLabel: function (context) {
            const entry = stats[context.dataIndex];
            return [
              `IP: ${entry.ip}`,
              `City: ${entry.city}`,
              `Region: ${entry.region}`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        title: {
          display: true,
          // text: 'Number of Clicks',
        },
      },
      x: {
        title: {
          display: true,
          // text: 'Time',
        },
      },
    },
  };
  

  return (
    <div
      className="w-full max-w-xl mx-auto max-h-10/12 overflow-y-auto hide-scrollbar"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-5 relative rounded-lg bg-gradient-to-b from-slate-950 to-slate-800 overflow-y-auto overflow-x-auto hide-scrollbar">
        <span className='text-slate-200 cursor-pointer absolute top-4 right-4 transition transform active:scale-90' onClick={()=>setOpenStats(false)}><IoCloseOutline size={25} /></span>
        <h1 className="text-xl md:text-2xl font-semibold text-center text-slate-100 py-6">
          Shortened URL Stats
        </h1>
        <div className="flex flex-col items-center">
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/${shortCode}`}
            target='_blank'
            rel="noopener noreferrer"
            className="text-xl font-bold text-blue-300 cursor-pointer transition transform active:scale-90 hover:underline"
          >
            {`mymd.vercel.app/${shortCode}`}
          </a>
          <div className="flex items-center py-3">
            <p className="text-slate-100 font-semibold text-sm flex items-center gap-0.5">
              Original URL <RiLinkM size={18} />
            </p>
            &nbsp;
            <a
              href={originalUrl}
              target='_blank'
              rel="noopener noreferrer"
              className="w-full max-w-[200px] text-slate-200 text-sm text-ellipsis truncate hover:underline hover:text-blue-400"
            >
              {originalUrl}
            </a>
          </div>
          <div className="mt-6 w-full flex items-center justify-around p-4 rounded-lg border border-gray-600 text-slate-100">
            <div className="text-center text-balance">
              <p className="font-semibold">Total Clicks</p>
              <p className="font-bold mt-2">{totalClicks}</p>
            </div>
            
          </div>

          <div className="mt-8">
            <h2 className="text-balance font-bold mb-4 text-slate-100">
              Clicks Over Time
            </h2>

             <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

