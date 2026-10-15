interface MessageProps {
    message: string;
    type?: "error" | "success";
}

const Message = ({ message, type = "error" }: MessageProps) => (
    <div role={type === "error" ? "alert" : "status"} className={`rounded-sm border px-3 py-2.5 text-sm leading-5 ${type === "error" ? "border-[#ff252d]/30 bg-[#ff252d]/10 text-[#ff9b9f]" : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"}`}>
        {message}
    </div>
);

export default Message;
