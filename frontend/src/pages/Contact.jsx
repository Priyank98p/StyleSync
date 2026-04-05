import React from 'react'
import Title from "../components/Title"
import {assets} from "../assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"

const Contact = () => {
  return (
    <div>
      <div className='flex items-center justify-center gap-3 text-center text-4xl pt-10'>
        <Title text1={"Contact Us"}/>
        <p className='border w-15 h-0'></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-120' src={assets.contact_img} alt="" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our store</p>
          <p className='text-gray-600'>New Delhi <br />House no. 32, Rithala </p>
          <p className='text-gray-600'>Tel: 91+ 988723452 <br /> Email: admin@StyleSync.com</p>
          <p className='font-semibold text-xl'>Career at StyleSync</p>
          <p className='text-gray-600'>Learn more about our teams and job openings</p>
          <button className='border border-black rounded-xl px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact