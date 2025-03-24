interface PaginationProps{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}


const Pagination = ({ currentPage, totalPages, onPageChange}: PaginationProps) => {
    return (
        <div className="flex justify-center gap-1 items-center m-5 text-white">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-[#990000] rounded-[4px] ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >Anterior</button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#990000] rounded-[4px] ${currentPage === index + 1 ? 'bg-[#990000]' : 'bg-neutral-800'} `}

                >
                {index + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-[#990000] rounded-[4px] ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `}
            >Próximo</button>
        </div>
    )
}

export default Pagination