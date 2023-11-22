'use client'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination';

import bannerImg from '../assets/ardalan-hamedani.png'

export function Slider(){
    return (
        <Swiper
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide className='relative'>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay flex flex-col justify-center items-center gap-8'>
                    <strong className="text-background text-6xl font-medium">"Mais do que uma pizza, uma obra de arte"</strong>
                    <span className="text-background text-4xl font-medium">Rodrigues, Lucas</span>
                </div>
                <Image src={bannerImg.src} alt="" height={600} width={1920}/>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>    
        </Swiper>
    )
}