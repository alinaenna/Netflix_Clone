import { Bookmark, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [movies, setMovies] = useState(null);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDEyNTdiNTIzOGQyNjY1OGJlN2FkZjIzOTZiMTM3ZCIsIm5iZiI6MTc0OTUyODY1MC4xOTUwMDAyLCJzdWIiOiI2ODQ3YjA0YTk1YWMwNmE3M2UyMDY3NjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hPW90adMl2oCCM1onr3Rnz9A5G04iqJmxuej1d34wSo'
        }
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => {
                if (res.results && res.results.length > 0) {
                    const randomIndex = Math.floor(Math.random() * res.results.length);
                    setMovies(res.results[randomIndex]);
                }
            }) // ← this will now log results
            .catch(err => console.error(err));
    }, []);

    if (!movies) {
        return <p>Loading....</p>
    }

    return (
        <div className='text-white relative'>
            <img src={`http://image.tmdb.org/t/p/original/${movies.backdrop_path}`} alt="Hero background" className='w-full rounded-2xl h-[580px] object-center object-cover' />

            <div className='flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10 font-medium'>
                <button className='flex justify-center items-center bg-white hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'>
                    <Bookmark className='mr-2 w-4 md:w-5 md:h-5' /> Save for later
                </button>
                <Link to={`/movies/${movies.id}`}>
                    <button className='flex justify-center items-center bg-[#e50914] hover:bg-gray-200 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'>
                        <Play className='mr-2 w-4 md:w-5 md:h-5' /> Watch Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Hero;