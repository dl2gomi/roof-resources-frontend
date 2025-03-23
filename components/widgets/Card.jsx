const Card = ({ title, content, subContent }) => {
  return (
    <div className="w-full rounded-sm border-1 border-[#1E3C55] flex flex-col items-center justify-center p-3">
      <div className="text-gray-600 mb-2 uppercase overflow-hidden text-ellipsis whitespace-nowrap w-full text-center">
        {title}
      </div>
      <div className="flex items-end">
        <span className="text-3xl text-[#1E3C55] mr-2 font-bold">{content}</span>
        {subContent && <span className="text-lg text-gray-400 line-through">{subContent}</span>}
      </div>
    </div>
  );
};

export default Card;
