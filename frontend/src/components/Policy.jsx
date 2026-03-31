import React from 'react'
import { assets } from '../assets/assets'

const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} alt="" className='w-16 m-auto mb-5' />
            <p className='font-semibold text-2xl'>Exhchange Policy</p>
            <p className='text-gray-500'>We Offer Hassle Free Exchange Policy</p>
        </div>
        <div>
            <img src={assets.quality_icon} alt="" className='w-16 m-auto mb-5' />
            <p className='font-semibold text-2xl'>7 Days Return Policy</p>
            <p className='text-gray-500'>We Provide 7 Days Free Return Policy</p>
        </div>
        <div>
            <img src={assets.support_img} alt="" className='w-14 m-auto mb-5' />
            <p className='font-semibold text-2xl'>Customer Support</p>
            <p className='text-gray-500'>We Provide 24/7 Customer Support</p>
        </div>

    </div>
  )
}

export default Policy