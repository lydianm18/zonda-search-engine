import React from "react";

const ArrowDown = ({ color}) => {
  return (
    <div>
      <svg
        width="22px"
        height="15px"
        viewBox="0 0 22 15"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g
          stroke={color}
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="square"
        >
          <g id="Group">
            <line
              x1="7.5"
              y1="0.5"
              x2="-1.85185201e-13"
              y2="7"
              id="Line-2"
            ></line>
            <line
              x1="7.5"
              y1="7"
              x2="9.63673585e-14"
              y2="14"
              id="Line-2-Copy"
              transform="translate(3.750000, 10.500000) scale(1, -1) translate(-3.750000, -10.500000) "
            ></line>
            <line x1="22" y1="7" x2="5.27577981e-13" y2="7" id="Line"></line>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ArrowDown;
