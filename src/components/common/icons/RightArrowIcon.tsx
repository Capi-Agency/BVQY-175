import React from 'react';

type Props = {
  className?: string;
};

const RightArrowIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 15 10"
      fill="none"
    >
      <path
        d="M14.2171 4.60856L9.60856 9.21712L8.72477 8.33333L11.8245 5.23356H0V3.98356H11.8245L8.72477 0.883789L9.60856 0L14.2171 4.60856Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default RightArrowIcon;
