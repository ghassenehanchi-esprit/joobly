import React from 'react'
import Button from '../button/button';
import { MdDelete } from 'react-icons/md';


const MyJobPostItem = ({data}: any) => {
  return (
    <div className="w-full flex flex-col gap-6 justify-between bg-light rounded-lg mb-4 shadow-lg p-6 xl:flex-row lg:gap-8">
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold text-gray-800">{data?.jobTitle}</h3>
       <p className="max-w-[800px]"
       dangerouslySetInnerHTML={{ __html: data?.description }}
        />
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