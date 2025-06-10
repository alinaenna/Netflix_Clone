import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Moviepage = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState(null);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDEyNTdiNTIzOGQyNjY1OGJlN2FkZjIzOTZiMTM3ZCIsIm5iZiI6MTc0OTUyODY1MC4xOTUwMDAyLCJzdWIiOiI2ODQ3YjA0YTk1YWMwNmE3M2UyMDY3NjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hPW90adMl2oCCM1onr3Rnz9A5G04iqJmxuej1d34wSo'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(res => res.json())
            .then(res => setMovies(res))
            .catch(err => console.error(err));
    }, [id])

    if (!movies) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="text-xl text-red-500">Loading....</span>
            </div>
        );
    };

    return <div className="min-h-screen bg-[#181818] text-white">
        <div className="relative h-[60vh] flex items-end"
            style={{
                backgroundImage: `url(http://image.tmdb.org/t/p/original/${movies.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>

            <div className="relative z-10 flex items-end p-8 gap-8">
                <img src={`http://image.tmdb.org/t/p/w500/${movies.poster_path}`} className="rounded-lg shadow-lg w-48 hidden md:block" />
                
                <div>
                    <h1 className="text-4xl font-bold mb-3">{movies.title}</h1>
                    <div className="flex items-center gap-4 mb-2">
                        <span>⭐️ {movies.vote_average?.toFixed(1)}</span>
                        <span>{movies.release_date}</span>
                        <span>{movies.runtime} min</span>
                    </div>
                    <div className="flex gap-2 mb-4">
                        {movies.genres.map((genre) => (
                            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <p className="max-w-2xl text-gray-200">{movies.overview}</p>
                    <button className='flex justify-center items-center bg-[#e50914] hover:bg-gray-200 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4'>
                    <Play className='mr-2 w-4 md:w-5 md:h-5' /> Watch Now
                </button>
                </div>
            </div>
        </div>
        <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <ul className="text-gray-300 space-y-3">
                        <li>
                            <span className="font-semibold text-white">Status: </span>
                            <span className="ml-2">{movies.status}</span>
                        </li>

                        <li>
                            <span className="font-semibold text-white">Release Date: </span>
                            <span className="ml-2">{movies.release_date}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
};

export default Moviepage;