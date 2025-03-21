import Image from 'next/image';

import ltIcon from '@/public/icons/icon-lt.svg';
import gtIcon from '@/public/icons/icon-gt.svg';

const Pagination = ({ totalLength, limit, page, pageCount, pageClick }) => {
  return (
    <div className="grid grid-cols-12 justify-between items-center">
      {totalLength === undefined && (
        <div className="md:col-span-6 col-span-12 text-[#B5B7C0] text-center md:text-start pb-4"></div>
      )}
      {totalLength !== undefined && totalLength !== 0 && (
        <div className="md:col-span-6 col-span-12 text-[#B5B7C0] text-center md:text-start pb-4">{`Showing data ${
          (page - 1) * limit + 1
        } to ${Math.min(totalLength, page * limit)} of ${totalLength} entries`}</div>
      )}
      {totalLength !== undefined && totalLength === 0 && (
        <div className="md:col-span-6 col-span-12 text-[#B5B7C0] text-center md:text-start pb-4">No data</div>
      )}
      <div className="md:col-span-6 col-span-12 flex md:justify-end justify-center items-center pb-4">
        <div
          className="pagination-button flex justify-center items-center"
          onClick={page > 1 ? () => pageClick(page - 1) : () => {}}
        >
          <Image src={ltIcon} alt="Previous" height={16} />
        </div>
        {pageCount >= 1 && pageCount <= 7 && (
          <>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((ele) => (
              <div
                className={`pagination-button flex justify-center items-center ${ele === page ? 'active' : ''}`}
                key={ele}
                onClick={() => pageClick(ele)}
              >
                {ele}
              </div>
            ))}
          </>
        )}
        {pageCount >= 8 && (page === 1 || page === 2) && (
          <>
            <div
              className={`pagination-button flex justify-center items-center ${1 === page ? 'active' : ''}`}
              key={1}
              onClick={() => pageClick(1)}
            >
              {1}
            </div>
            <div
              className={`pagination-button flex justify-center items-center ${2 === page ? 'active' : ''}`}
              key={2}
              onClick={() => pageClick(2)}
            >
              {2}
            </div>
            <div className="pagination-button ellipse flex justify-center items-center">...</div>
            <div
              className={`pagination-button flex justify-center items-center ${pageCount === page ? 'active' : ''}`}
              key={pageCount}
              onClick={() => pageClick(pageCount)}
            >
              {pageCount}
            </div>
          </>
        )}
        {pageCount >= 8 && (page === pageCount || page === pageCount - 1) && (
          <>
            <div
              className={`pagination-button flex justify-center items-center ${1 === page ? 'active' : ''}`}
              key={1}
              onClick={() => pageClick(1)}
            >
              {1}
            </div>
            <div className="pagination-button ellipse flex justify-center items-center">...</div>
            <div
              className={`pagination-button flex justify-center items-center ${pageCount - 1 === page ? 'active' : ''}`}
              key={pageCount - 1}
              onClick={() => pageClick(pageCount - 1)}
            >
              {pageCount - 1}
            </div>
            <div
              className={`pagination-button flex justify-center items-center ${pageCount === page ? 'active' : ''}`}
              key={pageCount}
              onClick={() => pageClick(pageCount)}
            >
              {pageCount}
            </div>
          </>
        )}
        {pageCount >= 8 && page + 1 < pageCount && page - 1 > 1 && (
          <>
            <div
              className={`pagination-button flex justify-center items-center ${1 === page ? 'active' : ''}`}
              key={1}
              onClick={() => pageClick(1)}
            >
              {1}
            </div>
            <div className="pagination-button ellipse flex justify-center items-center">...</div>
            <div
              className={`pagination-button flex justify-center items-center active`}
              key={page}
              onClick={() => pageClick(page)}
            >
              {page}
            </div>
            <div className="pagination-button ellipse flex justify-center items-center">...</div>
            <div
              className={`pagination-button flex justify-center items-center ${pageCount === page ? 'active' : ''}`}
              key={pageCount}
              onClick={() => pageClick(pageCount)}
            >
              {pageCount}
            </div>
          </>
        )}
        <div
          className="pagination-button flex justify-center items-center"
          onClick={page === pageCount ? () => {} : () => pageClick(page + 1)}
        >
          <Image src={gtIcon} alt="Previous" height={16} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
