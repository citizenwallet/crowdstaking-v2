type TProps = {
  onClick: () => void;
};

function SwapReverse({ onClick }: TProps) {
  return (
    <button
      type="button"
      className="absolute top-1/2 left-1/2 transform  -translate-y-1/2 -translate-x-1/2  inline-block  bg-breadgray-grey300 px-3 py-1.5 text-neutral-600 hover:text-neutral-500 border-2 rounded-lg border-breadgray-grey200"
      onClick={onClick}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 15 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-current"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.5 0H8.5V12H10.5V14H8.5V16H6.5V14H4.5V12H6.5V0ZM2.5 10V12H4.5V10H2.5ZM2.5 10V8H0.5V10H2.5ZM12.5 10V12H10.5V10H12.5ZM12.5 10V8H14.5V10H12.5Z"
          fill="#F8F8F8"
        />
      </svg>
    </button>
  );
}

export default SwapReverse;
