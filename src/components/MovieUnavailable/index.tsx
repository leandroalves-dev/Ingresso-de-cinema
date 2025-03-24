//Icons
import { BsInfoCircle } from "react-icons/bs"


const MovieUnavailable = () => {
  return (
    <div className="flex flex-col h-100 items-center justify-center text-neutral-700 text-[24px] bg-neutral-900 m-4 mb-10">
        <BsInfoCircle size={45}  className="text-neutral-800" />
        <p>Programação indisponível no momento!</p>
        <p>Retorne novamente mais tarde</p>
    </div> 
  )
}

export default MovieUnavailable
