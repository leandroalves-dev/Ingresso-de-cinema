import { Room } from "../../types/Movies";
import ScreeningTimeButton from "./ScreeningTimeButton";

interface CinemaRoomSectionProps {
    room: Room;
    onSelectTime: (time: string, language: string) => void;
}

const CinemaRoomSection = ({ room, onSelectTime }: CinemaRoomSectionProps) => (
    <section className="cinema-room mb-3 last:mb-0 lg:mb-5" aria-labelledby={`room-${room.id}`}>
        <h3 id={`room-${room.id}`} className="cinema-room-label mb-2 inline-flex items-center rounded-sm border border-white/25 bg-white/[0.04] px-2 py-1 text-[0.65rem] font-semibold text-[#f7f7f7] lg:mb-3 lg:px-3 lg:py-2 lg:text-xs">
            {room.name}
        </h3>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:gap-2">
            {Object.entries(room.showtimes).flatMap(([language, times]) => (times ?? []).map((time) => (
                <ScreeningTimeButton key={`${language}-${time}`} language={language} time={time} onSelect={() => onSelectTime(time, language)} />
            )))}
        </div>
    </section>
);

export default CinemaRoomSection;
