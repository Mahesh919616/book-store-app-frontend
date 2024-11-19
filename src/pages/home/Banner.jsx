import React from 'react';
import bannerImg from '../../assets/banner.png'

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
        <div className='w-full md:w-1/2 flex items-center md:justify-end'>
            <img src={bannerImg} alt="" />
        </div>
        <div className='w-full md:w-1/2'>
            <h1 className='md:text-5xl text-2xl mb-7 font-medium'>New Releases This Week</h1>
            <p className='mb-10'>It's time to update your reading list with some of the latest and greatest releases in the literary world.
            From heart-pumping thrillers to captivating memories, this week new releases offers something for everyone.
            </p>
            <button className='btn-primary'>Subscribe</button>
        </div>
    </div>
  )
}

export default Banner