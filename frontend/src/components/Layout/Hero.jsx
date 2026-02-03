import React from 'react'
import heroImg from '../../assets/rabbit-hero.webp'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='relative'>
      <img src={heroImg} alt='Rabbit' className='w-full h-[400px] md:h-[500px] lg:[750px] object-cover'/>
      <div className='absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center'>
        <div className='text-center text-white p-6'>

            <h1 className='text-4xl md:text-8x1 font-bold tracking-tighter uppercase mb-4'>
                Vacation <br /> Ready
            </h1>
            <p className='mb-6 tracking-tighter text-sm md:text-s'>
                Explore our vacation-ready outfits with fast worldwide shipping.
            </p>
            <Link to='#' className='bg-white text-gray-950 rounded-sm px-4 py-2 text-md'>
            <button>Shop now</button>
            </Link>

        </div>
        
      </div>
    </section>
  )
}

export default Hero
