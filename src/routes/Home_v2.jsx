import React from 'react'
import Navbar from '../components/navbar/Navbar'

// import Navbar from '../components/global-components/Navbar'
import VideoBanner from '../components/section-components/VideoBanner'
import Search from '../components/section-components/Search'
const Home_v2 = () => {
  return (
    <>
      <Navbar />
      <VideoBanner />
      <Search />
    </>
  )
}

export default Home_v2