import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => (
    <div className="flex items-center justify-center gap-1.5 py-8 text-white">
        <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="inline-flex h-9 items-center gap-1 rounded-sm border border-white/10 bg-white/[0.04] px-2.5 text-xs text-[#b9b9b9] transition-colors hover:border-[#ff252d]/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-40" aria-label="Página anterior">
            <ChevronLeft size={15} /><span className="hidden sm:inline">Anterior</span>
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
            <button type="button" key={index} onClick={() => onPageChange(index + 1)} className={`h-9 min-w-9 rounded-sm px-3 text-xs font-semibold transition-colors ${currentPage === index + 1 ? "bg-[#d50000] text-white shadow-[0_0_12px_rgba(255,0,20,0.25)]" : "border border-white/10 bg-white/[0.04] text-[#b9b9b9] hover:border-[#ff252d]/60 hover:text-white"}`}>
                {index + 1}
            </button>
        ))}

        <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="inline-flex h-9 items-center gap-1 rounded-sm border border-white/10 bg-white/[0.04] px-2.5 text-xs text-[#b9b9b9] transition-colors hover:border-[#ff252d]/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-40" aria-label="Próxima página">
            <span className="hidden sm:inline">Próximo</span><ChevronRight size={15} />
        </button>
    </div>
);

export default Pagination;
