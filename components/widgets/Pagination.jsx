import Image from 'next/image';

import ltIcon from '@/public/icons/icon-lt.svg';
import gtIcon from '@/public/icons/icon-gt.svg';

const Pagination = ({ totalLength, limit, page, pageCount }) => {
  return (
    <div className="grid grid-cols-12 justify-between items-center">
      <div className="md:col-span-6 col-span-12 text-[#B5B7C0] text-center md:text-start pb-4">{`Showing data ${
        (page - 1) * limit + 1
      } to ${Math.min(totalLength, page * limit)} of ${totalLength} entries`}</div>
      <div className="md:col-span-6 col-span-12 flex md:justify-end justify-center items-center pb-4">
        <div className="pagination-button flex justify-center items-center">
          <Image src={ltIcon} alt="Previous" height={16} />
        </div>
        <div className="pagination-button active flex justify-center items-center">1</div>
        <div className="pagination-button flex justify-center items-center">2</div>
        <div className="pagination-button flex justify-center items-center">3</div>
        <div className="pagination-button ellipse flex justify-center items-center">...</div>
        <div className="pagination-button flex justify-center items-center">40</div>
        <div className="pagination-button flex justify-center items-center">
          <Image src={gtIcon} alt="Previous" height={16} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
