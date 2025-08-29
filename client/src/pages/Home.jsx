import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import FeaturedSection from '../components/FeaturedSection';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonial />
    </>
  )
}

export default Home