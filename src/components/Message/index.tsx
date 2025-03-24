interface MessageProps{
    message: string;
    type?: 'error' | 'success'
}

const Message = ({ message, type = "error"}: MessageProps) => {
  return (
    <div className={`p-2 my-2 text-sm rounded ${type === "error" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-700"}`}>
        {message}
    </div>
  )
}

export default Message