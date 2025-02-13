import React from 'react'
import AppBar from './LandingPage/AppBar'
import MainSection from './LandingPage/MainSection'

const LandingPage = () => {
    return (
        <div className='bg-black min-w-screen min-h-screen overflow-y-hidden'>
            <AppBar />
            <MainSection />
        </div>
    )
}

export default LandingPage
    