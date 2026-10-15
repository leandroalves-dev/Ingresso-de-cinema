import { CalendarX2 } from "lucide-react";

const MovieUnavailable = () => (
    <div className="my-6 flex min-h-48 flex-col items-center justify-center rounded-sm border border-dashed border-white/15 bg-white/[0.02] px-6 text-center text-[#818181]">
        <CalendarX2 size={34} className="mb-4 text-[#ff252d]/70" />
        <p className="text-base font-semibold text-[#b9b9b9]">Programação indisponível no momento.</p>
        <p className="mt-1 text-sm">Retorne novamente mais tarde.</p>
    </div>
);

export default MovieUnavailable;
