import React from 'react'
import Button from '../button/button';
import { MdDelete } from 'react-icons/md';


const MyJobPostItem = ({data}: any) => {
  return (
    <div className="w-full flex flex-col gap-6 justify-between bg-light rounded-lg mb-4 shadow-lg p-6 xl:flex-row lg:gap-8">
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold text-gray-800">Developer</h3>
       <p className="max-w-[800px]">
          It is a long established fact that a reader will be distracted by the readable content 
          of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
          more-or-less normal distribution of letters, as opposed to using Content here, content 
          here, making it look like readable English. Many desktop publishing packages and web 
          page editors now use Lorem Ipsum as their default model text, and a search for lorem 
          ipsum will uncover many web sites still in their infancy. Various versions have evolved 
          over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
    </div>
    <div className="flex flex-col items-end justify-end">
      <div className="flex gap-2 items-center justify-between">
        <Button
          //onClick={() => push(`/jobs/${data?._id}`)}
          className="bg-gray-200 text-gray-500 font-bold text-lg border-2  hover:bg-white hover:border-[#006c53] hover:text-black text px-4 py-2 rounded-2xl flex items-center duration-200"
        >
          Detail Information
        </Button>
        <div>
          <MdDelete className="w-12 h-12 text-gray-500 cursor-pointer hover:text-[#006c53] duration-300"/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MyJobPostItem;



{
    /*
    {item.description.substring(0, 80)}...
    */
  }