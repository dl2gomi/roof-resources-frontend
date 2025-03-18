import Image from 'next/image';

function IconInput({ icon, placeholder, type, name, bordered = true, background }) {
  return (
    <div className="grow-0 shrink-0 basis-auto py-1">
      <div
        className={`rounded box-border flex justify-start items-center flex-row w-full h-[45px] px-4 ${
          bordered ? 'border border-solid border-[#1e3c55]' : ''
        }`}
        style={{ backgroundColor: background ?? 'transparent' }}
      >
        <Image src={icon} alt={`${placeholder} icon`} height={20} />
        <input
          className="[font-family:Montserrat,sans-serif] text-sm font-light text-[#1e3c55] grow-0 shrink-0 basis-auto ml-[9px] m-0 p-0 focus:outline-none focus:ring-0 focus:border-transparent"
          placeholder={placeholder}
          type={type}
          name={name}
        />
      </div>
    </div>
  );
}

export default IconInput;
