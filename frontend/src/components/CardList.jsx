import CardImg from '../assets/cardimg.jpg';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CardList = ({ title, category }) => {
    const [data, setData] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDEyNTdiNTIzOGQyNjY1OGJlN2FkZjIzOTZiMTM3ZCIsIm5iZiI6MTc0OTUyODY1MC4xOTUwMDAyLCJzdWIiOiI2ODQ3YjA0YTk1YWMwNmE3M2UyMDY3NjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hPW90adMl2oCCM1onr3Rnz9A5G04iqJmxuej1d34wSo'
        },
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setData(res.results))
        .catch(err => console.error(err));
    }, []);

    return (
        <div className='text-white md:px-4'>
            <h2 className='pt-10 pb-5 text-lg font-medium'>{title}</h2>

            <Swiper slidesPerView={"auto"} spaceBetween={10} className='mySwiper'>
                {data.map((item, index) => (
                    <SwiperSlide key={index} className='max-w-72'>
                        <Link to={`/movies/${item.id}`}>
                        <img src={`http://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt="" className='h-44 w-full object-center object-cover' />
                        <p className='text-center pt-2'>{item.original_title}</p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CardList;