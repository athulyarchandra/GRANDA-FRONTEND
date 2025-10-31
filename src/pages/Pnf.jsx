import React from 'react'
import pnf from '../assets/404-page.gif'
const Pnf = () => {
  return (
    <>
    <div className='p-8 flex justify-center items-center flex-col min-h-screen'>
        <img className='w-96' src={pnf} alt="404" />
        <p className='text-black font-bold text-xl'>The Resource requested could not be found</p>
    </div>
    </>
  )
}

export default Pnf