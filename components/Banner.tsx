import Image from "next/image"
import { useEffect, useState } from "react"
import { baseUrl } from "../constants/movie"
import { Movie } from "../typings"
import { FaPlay, FaInfoCircle } from "react-icons/fa";

interface Props {
    netflixOriginals: Movie[]
}

function Banner({netflixOriginals}: Props) {
    const [movie, setMovie] = useState<Movie | null>(null)
    /* Получаем рандомный фильм с данными для баннера*/
    useEffect(() => {
        /* Получаем рандомное число с округлением в меньшую сторону(рандом * длину списка) */
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    }, [netflixOriginals])

    console.log(movie)
    return (
        <div className="flex flex-col space-y-2 py-20 md:space-y-2 lg: h-[65vh] lg:justify-end">
            
            <div className="absolute top-0 left-0 h-[96vh] w-screen">
                {/* Загружаем картинку(backdrop || poster (одно и тоже, для надёжности)) из данных переменной movie */}
                <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} fill alt="" objectFit="cover" priority quality={100}/>
            </div>

            <div className="relative z-20 pl-2 lg:pl-0 ">
                <h1 className="text-xl w-2/5 font-bold lg:text-5xl md:text-3xl text-shadow-xl">{movie?.title || movie?.name || movie?.original_name}</h1>
                <p className="max-w-xs  text-xs my-4 md:max-w-lg md:text-lg lg:max-w-xl text-shadow-xl">{movie?.overview}</p>
                <div className="flex space-x-3">
                    <button className="bannerButton bg-white text-black"><FaPlay className="h-4 w-4 text-black md:h-6 md:w-6" /> Play</button>
                    <button className="bannerButton bg-[gray]/60">More Info <FaInfoCircle className="w-5 h-5 md:w-7 md:h-7"/></button>
                </div>
            </div>

            
                
        </div>
    )
}

export default Banner