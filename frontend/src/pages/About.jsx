import React from 'react'
import Title from "../components/Title"
import { assets } from "../assets/assets.js"

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8'>
        <Title text1={"About Us"} />
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
    </div>
  )
}

export default About