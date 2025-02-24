function ToggleButton() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="24"
      viewBox="0 0 42 24"
      fill="none"
    >
      <rect width="42" height="24" rx="12" fill="#DFE2E1" />
      <g filter="url(#filter0_d_170_2341)">
        <circle cx="11.75" cy="12" r="10" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_170_2341"
          x="0.75"
          y="2"
          width="22"
          height="22"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_170_2341"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0666667 0 0 0 0 0.0470588 0 0 0 0 0.133333 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_170_2341"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_170_2341"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default ToggleButton;
