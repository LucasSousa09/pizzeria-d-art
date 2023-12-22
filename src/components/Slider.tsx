'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination';

import bannerImg from '../assets/ardalan-hamedani.png'
import bannerImg1 from '../assets/ivan-torres-unsplash.jpg'
import bannerImg2 from '../assets/pranjall-kumar-unsplash.jpg'
import bannerImg3 from '../assets/shayan-ramesht-unsplash.jpg'

import { SliderSlide } from './SliderSlide';

export function Slider(){
    return (
        <Swiper
            className='mt-[104px]'
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
        >
            <SwiperSlide className='relative'>
                <SliderSlide author='Rodrigues Lucas' text='"Mais do que uma pizza, uma obra de arte"' bannerImg={bannerImg.src} />
            </SwiperSlide>
            
            <SwiperSlide>
                <SliderSlide author='Rodrigues Lucas' text='"A criatividade é o limite da sua pizza"' bannerImg={bannerImg1.src} />
            </SwiperSlide>
            
            <SwiperSlide>
                <SliderSlide author='Rodrigues Lucas' text='"Combina com qualquer dia da semana"' bannerImg={bannerImg2.src} />
            </SwiperSlide>
            
            <SwiperSlide>
                <SliderSlide author='Rodrigues Lucas' text='"Satisfação é certa por aqui!"' bannerImg={bannerImg3.src} /> 
            </SwiperSlide>    
        </Swiper>
    )
}