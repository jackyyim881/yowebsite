export default function Wave() {
  return (
    <>
      <div className="relative   top-[1ch] w-full leading-0">
        <svg
          width="100%"
          height="60%"
          id="svg"
          viewBox="0 0 1440 750"
          xmlns="http://www.w3.org/2000/svg"
          class="transition duration-300 ease-in-out delay-150"
        >
          <path
            d="M 0,600 L 0,150 C 98.83253588516749,117.95215311004785 197.66507177033498,85.90430622009568 295,97 C 392.334928229665,108.09569377990432 488.17224880382776,162.3349282296651 588,177 C 687.8277511961722,191.6650717703349 791.6459330143541,166.75598086124398 884,169 C 976.3540669856459,171.24401913875602 1057.244019138756,200.64114832535887 1148,202 C 1238.755980861244,203.35885167464113 1339.377990430622,176.67942583732057 1440,150 L 1440,600 L 0,600 Z"
            stroke="none"
            stroke-width="0"
            fill="url(#gradient)"
            fill-opacity="0.53"
            class="transition-all duration-300 ease-in-out delay-150 path-0"
          ></path>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="5%" stop-color="#F78DA7"></stop>
              <stop offset="95%" stop-color="#8ED1FC"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,600 L 0,350 C 121.8468899521531,353.89473684210526 243.6937799043062,357.7894736842105 334,336 C 424.3062200956938,314.2105263157895 483.07177033492826,266.7368421052632 578,287 C 672.9282296650717,307.2631578947368 804.0191387559809,395.2631578947369 913,413 C 1021.9808612440191,430.7368421052631 1108.8516746411483,378.2105263157895 1193,356 C 1277.1483253588517,333.7894736842105 1358.5741626794259,341.89473684210526 1440,350 L 1440,600 L 0,600 Z"
            stroke="none"
            stroke-width="0"
            fill="url(#gradient)"
            fill-opacity="1"
            class="transition-all duration-300 ease-in-out delay-150 path-1"
          ></path>
        </svg>
      </div>
    </>
  );
}
