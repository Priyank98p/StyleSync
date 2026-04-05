import React from 'react'
import Title from "../components/Title"
import { assets } from "../assets/assets.js"

const About = () => {
  return (
    <div>
      <div className='flex items-center justify-center text-4xl text-center pt-8 gap-3'>
        <Title text1={"About Us"} />
        <p className='border w-15 h-0'></p>
      </div>

      <div className='my-12 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:w-112.5' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam provident earum obcaecati facilis veritatis incidunt officia voluptatem quibusdam ex, exercitationem, quae in dolorem eos porro nemo ab architecto laboriosam nobis, blanditiis mollitia asperiores? Autem non accusamus iure eos dolorem esse dignissimos praesentium at iusto odio dicta itaque velit, totam repellendus.</p>
        <p>facere iste facilis eligendi ut, harum nesciunt labore atque tempora vel odio doloremque quas, consequatur amet nihil blanditiis magnam. Quibusdam veritatis nulla, soluta eligendi, assumenda in ad provident exercitationem minus commodi tempore? Dolorem, earum?</p>

        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi saepe excepturi aut ipsa, provident velit?</p>
        </div>
      </div>

      <div className='flex items-center gap-3 text-4xl py-4'>
        <Title text1={"Why Choose Us"}/>
        <p className='border w-15 h-0'></p>
      </div>
      <div className='flex flex-col gap-2 md:flex-row text-sm mb-20'>
        <div className='border border-gray-400 rounded-2xl px-10 md:px-15 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur obcaecati nesciunt ipsum, reiciendis eaque, placeat quos sapiente odit ullam, doloremque minus quod asperiores itaque doloribus.</p>
        </div>
        <div className='border border-gray-400 rounded-2xl px-10 md:px-15 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur obcaecati nesciunt ipsum, reiciendis eaque, placeat quos sapiente odit ullam, doloremque minus quod asperiores itaque doloribus.</p>
        </div>
        <div className='border border-gray-400 rounded-2xl px-10 md:px-15 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur obcaecati nesciunt ipsum, reiciendis eaque, placeat quos sapiente odit ullam, doloremque minus quod asperiores itaque doloribus.</p>
        </div>
      </div>
    </div>
  )
}

export default About