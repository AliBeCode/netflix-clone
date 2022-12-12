import { Movie } from "../typings"
import { useRef, useState } from "react"
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import Thumbnail from "./Thumbnail";

interface Props {
    title: string
    /* For Firebase: */
    /* movie: Movie | DocumentData[] */
    movies: Movie[]
}

function Row({title, movies}:Props) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState(false)

    /* Функция скрола */
    const handleClick = (direction: string) => {
        setIsMoved(true)

        if(rowRef.current) {
            const {scrollLeft, clientWidth} = rowRef.current
        
            const scrollTo = direction ==="left" 
                ? scrollLeft - clientWidth 
                : scrollLeft + clientWidth

                rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"})
        }
    }

    return (
        <div className="relative bottom-52 md:bottom-32 md:ml-3 lg:bottom-0 h-40 space-y-0.5 md:space-y-3 ">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>
            <div className="group relative md:-ml-16">
                <IoChevronBackOutline className={`absolute top-0 bottom-0 lg:left-2 z-30 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 md:left-8 ${
                    !isMoved && 'hidden'
                }`}
                onClick={() => handleClick("left")}/>
                
                <div ref={rowRef} className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide">
                    {movies.map((movie) => (
                        <Thumbnail key={movie.id} movie={movie}/>
                    ))}
                </div>
                
                <IoChevronForward className="absolute top-0 bottom-0 right-2 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
                onClick={() => handleClick("right")}/>
            </div>
        </div>
    )
}

export default Row