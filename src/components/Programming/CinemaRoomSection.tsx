import { DoorOpen } from "lucide-react";

import { Room } from "../../types/Movies";
import ScreeningTimeButton from "./ScreeningTimeButton";

interface CinemaRoomSectionProps {
    room: Room;
    onSelectTime: (time: string, language: string) => void;
}

const CinemaRoomSection = ({ room, onSelectTime }: CinemaRoomSectionProps) => (
    <section className="mb-6 last:mb-0" aria-labelledby={`room-${room.id}`}>
        <h3 id={`room-${room.id}`} className="mb-3 inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-[#f7f7f7]">
            <DoorOpen size={15} className="text-[#32dfff]" /> {room.name}
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Object.entries(room.showtimes).flatMap(([language, times]) => (times ?? []).map((time) => (
                <ScreeningTimeButton key={`${language}-${time}`} language={language} time={time} onSelect={() => onSelectTime(time, language)} />
            )))}
        </div>
    </section>
);

export default CinemaRoomSection;
