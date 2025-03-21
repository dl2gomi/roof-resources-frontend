import React from 'react';
import { toast } from 'react-toastify';

const Toaster = {
  success: (title, contents) => {
    toast.success(
      <div>
        <div className="fs-6 fw-bold" style={{ lineHeight: '24px' }}>
          {title}
        </div>
        {contents?.map((content, index) => (
          <div key={index} className="fs-6" style={{ lineHeight: '24px' }}>
            {`${content}`}
          </div>
        ))}
      </div>,
      {
        hideProgressBar: true,
      }
    );
  },

  error: (title, contents) => {
    toast.error(
      <div>
        <div className="fs-6 fw-bold" style={{ lineHeight: '24px' }}>
          {title}
        </div>
        {contents?.map((content, index) => (
          <div key={index} className="fs-6" style={{ lineHeight: '24px' }}>
            {`${content}`}
          </div>
        ))}
      </div>,
      {
        hideProgressBar: true,
      }
    );
  },

  info: (title, contents) => {
    toast.info(
      <div>
        <div className="fs-6 fw-bold" style={{ lineHeight: '24px' }}>
          {title}
        </div>
        {contents?.map((content, index) => (
          <div key={index} className="fs-6" style={{ lineHeight: '24px' }}>
            {`${content}`}
          </div>
        ))}
      </div>,
      {
        hideProgressBar: true,
      }
    );
  },

  warning: (title, contents) => {
    toast.warning(
      <div>
        <div className="fs-6 fw-bold" style={{ lineHeight: '24px' }}>
          {title}
        </div>
        {contents?.map((content, index) => (
          <div key={index} className="fs-6" style={{ lineHeight: '24px' }}>
            {`${content}`}
          </div>
        ))}
      </div>,
      {
        hideProgressBar: true,
      }
    );
  },
};

export default Toaster;
