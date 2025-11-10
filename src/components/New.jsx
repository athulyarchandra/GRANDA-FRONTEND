import React, { useState } from 'react'

const New = () => {
    const [count,setCount] = useState(0)
    const [even,setEven] = useState(false)

    const handleIncrement = ()=>{
         setCount(count+1)
        if(count%2 !== 0){
            setEven(true)
        }else{
            setEven(false)
        }
    }

  return (
    <>
   <div className='min-h-screen flex justify-center items-center m-15 '>
   <div className='m-14'>
        <h1 className={even? "text-red-600" : "text-bg-blue"}>Counter: {count}</h1>
        <button className=' p-2 border' onClick={handleIncrement}>+</button>
        <button className='p-2 border' onClick={()=>setCount(0)}>Reset</button>
        <button className='p-2 border' onClick={()=>setCount(count - 1)}>-</button>
   </div>
   </div>
    </>
  )
}
  
export default New