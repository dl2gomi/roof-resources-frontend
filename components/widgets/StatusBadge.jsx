const StatusBadge = ({ text, success = true, error = false, warning = false, info = false, style }) => {
  return (
    <>
      {success && (
        <div
          className="bg-[#16C09861] border-[#00B087] text-[#008767] border-1 rounded w-[70px] py-1  px-2 text-xs text-center"
          style={style}
        >
          {text}
        </div>
      )}
      {error && (
        <div
          className="bg-[#FFC5C5] border-[#DF0404] text-[#DF0404] border-1 rounded w-[70px] py-1 px-2 text-xs text-center"
          style={style}
        >
          {text}
        </div>
      )}
      {warning && (
        <div
          className="bg-[#F1B53380] border-[#B4A010] text-[#B4A010] border-1 rounded w-[70px] py-1 px-2 text-xs text-center"
          style={style}
        >
          {text}
        </div>
      )}
      {info && (
        <div
          className="bg-[#addaff] border-[#0266b7] text-[#0266b7] border-1 rounded w-[70px] py-1  px-2 text-xs text-center"
          style={style}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default StatusBadge;
