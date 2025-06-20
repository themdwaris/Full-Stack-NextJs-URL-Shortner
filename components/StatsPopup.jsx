import React from 'react'

const StatsPopup = ({children,setOpenStats}) => {
  return (
    <div className='px-5 w-full h-screen fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm' onClick={(e)=>{
        e.stopPropagation()
        setOpenStats(false)
    }}>
        {children}
    </div>
  )
}

export default StatsPopup