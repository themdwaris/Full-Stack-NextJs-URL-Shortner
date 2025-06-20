import { useEffect, useState } from 'react'
import axios from 'axios'

const RegionStats = ({ shortId }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchStats() {
      const res = await axios.get(`/api/stats/${shortId}`)
      const raw = res.data
      const formatted = Object.entries(raw).map(([location, clicks]) => ({
        location,
        clicks
      }))
      setData(formatted)
    }

    fetchStats()
  }, [shortId])

  return (
    <div className="mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-3">📍 City & Region-wise Clicks</h2>
      {data.length === 0 ? (
        <p>No location data available.</p>
      ) : (
        <ul className="space-y-2">
          {data.map((item, index) => (
            <li key={index} className="flex justify-between border-b pb-1">
              <span>{item.location}</span>
              <span className="font-semibold">{item.clicks} clicks</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RegionStats
