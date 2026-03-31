import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import TopSelling from '../components/TopSelling'
import Policy from '../components/Policy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <TopSelling />
      <Policy />
      <NewsLetterBox />
    </div>
  )
}

export default Home