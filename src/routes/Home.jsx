import React from 'react';

import Navbar from '../components/navbar/Navbar'
import Hero from '../components/hero/Hero'
import Destinations from '../components/destinations/Destinations'
import Search from '../components/search/Search'
import Selects from '../components/selects/Selects'
import ImgCarousel from '../components/carousel/ImgCarousel';
import Footer from '../components/footer/Footer';
import Header from '../components/header/header';
import TourSearch from '../components/TourSearch/TourSearch';
import Offer from '../components/section-components/Offer';

import '../assets/css/style.css'
import ScriptComponent from '../components/ScriptComponent';
// import '../assets/js/script.js'

const Home = () => {
    return (
        <>
            <Header />

            <Hero />
            <Destinations />
            <Search />
            <Selects />
            <ImgCarousel />
            <Footer />

            <ScriptComponent />
        </>
    )
}

export default Home

