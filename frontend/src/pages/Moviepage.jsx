import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Moviepage = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);

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

        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setRecommendations(res.results || []))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => {
                const trailer = res.results?.find((vid) => vid.site === "YouTube" && vid.type === "Trailer")
                setTrailerKey(trailer?.key || null);
            })
            .catch(err => console.error(err));
    }, [id])

    if (!movies) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="text-xl text-red-500">Loading....</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#181818] text-white">
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
                        <p className="max-w-2xl text-gray-200 mb-4">{movies.overview}</p>
                        <Link to={`https://www.youtube.com/watch?v=${trailerKey}`} target="_blank">
                            <button className='flex justify-center items-center bg-[#e50914] hover:bg-gray-200 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4'>
                                <Play className='mr-2 w-4 md:w-5 md:h-5' /> Watch Now
                            </button>
                        </Link>
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
                                <span className="ml-2">
                                    {movies.status}
                                </span>
                            </li>

                            <li>
                                <span className="font-semibold text-white">Release Date: </span>
                                <span className="ml-2">
                                    {movies.release_date}
                                </span>
                            </li>

                            <li>
                                <span className="font-semibold text-white">Original Language:
                                </span>{" "}
                                <span className="ml-2">
                                    {movies.original_language?.toUpperCase()}
                                </span>
                            </li>

                            <li>
                                <span className="font-semibold text-white">Budget: </span>
                                <span className="ml-2">
                                    {movies.budget ? `$${movies.budget.toLocaleString()}` : "N/A"}
                                </span>
                            </li>

                            <li>
                                <span className="font-semibold text-white">Revenue: </span>
                                <span className="ml-2">
                                    {movies.revenue ? `$${movies.revenue.toLocaleString()}` : "N/A"}
                                </span>
                            </li>

                            <li>
                                <span className="font-semibold text-white">Production Companies: </span>
                                <span className="ml-2">
                                    {movies.production_companies &&
                                        movies.production_companies.length > 0
                                        ? movies.production_companies.map((company) => company.name).join(", ")
                                        : "N/A"}
                                </span>
                            </li>

                            <li>
                                <span className="font-semibold text-white">Countries: </span>
                                <span className="ml-2">
                                    {movies.production_countries &&
                                        movies.production_countries.length > 0
                                        ? movies.production_countries.map((c) => c.name).join(", ")
                                        : "N/A"}
                                </span>
                            </li>

                            <li>
                                <span className="font-semibold text-white">Spoken Languages: </span>
                                <span className="ml-2">
                                    {movies.spoken_languages &&
                                        movies.spoken_languages.length > 0
                                        ? movies.spoken_languages.map((l) => l.name).join(", ")
                                        : "N/A"}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold mb-2 text-white">Tagline</h3>
                        <p className="italic text-gray-400 mb-6">{movies.tagline || "No tagline available."}</p>

                        <h3 className="font-semibold mb-2 text-white">Overview</h3>

                        <p className="text-gray-200">{movies.overview || "No overview available."}</p>
                    </div>
                </div>
            </div>

            {recommendations.length > 0 && (
                <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-4">
                        You might also like this...
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {recommendations.slice(0, 10).map((recommendation) => (
                            <div key={recommendation.id} className="bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition">
                                <Link to={`/movies/${recommendation.id}`}>
                                    <img
                                        src={`http://image.tmdb.org/t/p/w300/${recommendation.poster_path}`}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-2">
                                        <h3 className="text-sm font-semibold">
                                            {recommendation.title}
                                        </h3>
                                        <span className="text-xs text-gray-400">
                                            {recommendation.release_date?.slice(0, 4)}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Moviepage;