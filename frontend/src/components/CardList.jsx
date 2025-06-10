import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CardList = ({ title, category }) => {
    const [data, setData] = useState([]);
    const uniqueId = category || title?.toLowerCase().replace(/\s+/g, '-');
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

            {/* Wrap in group for hover effect */}
            <div className="relative group h-44">
                {/* Custom arrows */}
                <button className={`custom-prev-${uniqueId} absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 bg-black/60 hover:bg-black/80 active:scale-90 text-white w-10 h-10 rounded-full flex items-center justify-center transition`}>
                    ‹
                </button>
                <button className={`custom-next-${uniqueId} absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 bg-black/60 hover:bg-black/80 active:scale-90 text-white w-10 h-10 rounded-full flex items-center justify-center transition`}>
                    ›
                </button>

                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    modules={[Navigation]}
                    onSwiper={(swiper) => {
                        setTimeout(() => {
                            swiper.params.navigation.prevEl = `.custom-prev-${uniqueId}`;
                            swiper.params.navigation.nextEl = `.custom-next-${uniqueId}`;
                            swiper.navigation.destroy();
                            swiper.navigation.init();
                            swiper.navigation.update();
                        });
                    }}
                    className="mySwiper"
                >

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
        </div>
    );
};

export default CardList;