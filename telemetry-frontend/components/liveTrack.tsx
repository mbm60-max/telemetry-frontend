import React, { useState } from 'react';
import './liveTrack.css';

interface TestProps {
  targetSrc: string;
  trackName: string;
  testOffset:number;
}

const Test = ({ targetSrc, trackName,testOffset }: TestProps) => {

  const carStyle = {
    offsetDistance: `${testOffset}%`,
  };

  const getCarClass = () => `car car-${trackName}`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '430px' }}>
      <img src={targetSrc} alt="Fuel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-60%, -50%)',
          transformOrigin: 'center',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <g className="path" fill="none" stroke="#fff" strokeWidth="2">
          <path id="car-path" d={getPathByTrackName(trackName)} stroke="#FF0707" />
        </g>
        <g className={getCarClass()} style={carStyle}>
        <circle cx="11" cy="11" r="11" fill="#DA2E22"/>
        </g>
      </svg>

      
    </div>
  );
};

const getPathByTrackName = (trackName: string) => {
  switch (trackName) {
    case 'spa':
      return 'M79 16.5L48 1.5L89 71.5V86.5L83 91.5V106.5L89 125L96.5 159.5L101.5 186L89 215L67.5 233L48 242.5L26 256L7.5 279.5L1 304.5L10 317L26 322H35.5L48 304.5L53 296L64 291L79 296L89 291L96.5 273.5L109 242.5L120 227.5H148.5L159.5 236.5L164.5 273.5L174.5 304.5V317L152 334V342.5L159.5 345.5L208.5 310.5L203 291L208.5 283.5L214 273.5L174.5 141L148.5 100.5L143 80.5L131 71.5L79 16.5Z';
    case 'legunaSeca':
      return 'M0.5 129.5V184L13 191.5L20.5 184V173L16 156.5L20.5 135V116.5H34L60 124.5L93.5 129.5L101 143V191.5L93.5 230.5L84.5 263.5L101 271H116.5L193 258L205 248L213 230.5V209V184V160.5V143L218.5 124.5V114H205V101V73.5L198.5 59L185 50.5L165 59L144 66.5H123L116.5 59L84.5 0.5H79L29.5 66.5L13 95.5L0.5 129.5Z';
    case 'goodWood':
      return 'M20 3L3 25L11.5 45.5L30 60L47.5 78V94L37 123L47.5 148L63 170.5L82.5 193.5L103 206.5L134 214.5L166.5 227.5H191.5L208.5 220.5L216 206.5L222.5 193.5L216 148V100V78L228 45.5L216 25H177H119H78L44 3H20Z';
    case 'autopolis':
      return 'M3 78V90.5L13.5 105V121.5L8 151.5L18.5 164L35 170L64.5 164L75 151.5L91 40L100.5 30.5L107 40L127.5 100.5L139.5 121.5L171 139L185.5 151.5L190 170L177.5 184.5L145 198.5L133.5 222.5V232H145L154.5 213L164.5 208H185.5L195 222.5L203 243.5H219L291 222.5L311 213L324.5 198.5L338.5 179.5L332.5 170L260.5 121.5L127.5 30.5L119 16L100.5 4L83.5 16L75 40V63.5L64.5 78H35L28 63.5H13.5L3 78Z';  
    case 'autopolisShortCourse':
      return 'M9.19063 37.8871L4.4748 10.1222L10.4491 4.21473L22.7609 4.67488L29.0984 11.0425L28.8568 17.5049L253.178 151.229L252.771 162.113L236.295 174.1L215.487 192.055L198.458 196.868L143.803 207.768L113.141 214.456L102.763 206.235L95.8594 193.034L84.8261 180.36L75.5142 176.606L59.3817 179.409L40.5872 198.461L29.917 198.062L30.1966 190.58L35.1686 178.504L47.1045 167.029L70.4424 158.364L90.933 148.912L91.4288 135.647L86.8854 125.26L77.8023 115.383L57.8965 109.19L33.8958 91.6034L20.3583 68.9584L9.19063 37.8871Z';   
    case 'circuitDeBarcelonaCatalunya':
      return 'M28.5 187.5L6.5 222.5L3 241V258.5L13 273.5L28.5 277.5L41.5 273.5L54.5 263L69 258.5L82 263H90.5L222 60.5L228.5 53.5V38.5L208 17.5H202.5H191.5L167.5 3L133.5 26V38.5L142.5 45H157.5L167.5 38.5L191.5 45V53.5L97.5 102L74.5 118.5L82 150L103 180.5L111.5 195L90.5 229L59 245.5H41.5V229L64.5 187.5L59 167.5H41.5L28.5 187.5Z';  
    case 'fujiSpeedway':
      return 'M3 195V205.5L4.5 208.5H15L27.5 203.5L36.5 193L41.5 189L47 187L56.5 195L43 217L27.5 228.5L48.5 248.5H66L73.5 263L122.5 228.5L142.5 195L136.5 147L142.5 132H151L176 158.5L190 166.5L206.5 158.5L215 147V126L206.5 111L200.5 95.5L245.5 46L252.5 24V3H245.5L3 195Z'; 
    case 'fujiSpeedwayShort':
      return 'M230.71 38.0387L15.3909 199.616L6.37427 207.986L12.9957 211.046L24.658 212.989L31.5807 208.939L43.1798 203.813L56.6889 189.491L66.4084 193.832L67.6574 204.849L63.1965 214.335L50.292 220.969L45.9519 228.265L51.6629 233.061L99.8938 248.277L128.646 228.416L151.963 209.443L168.987 174.038L162.693 151.074L161.596 141.401L168.395 129.744L177.141 128.752L189.291 138.261L209.096 150.168L218.48 151.553L234.24 147.317L242.499 142.026L247.325 135.764L249.964 126.484L245.071 115.88L238.813 109.513L232.828 102.299L228.209 94.1141L231.03 86.446L271.982 40.7079L276.928 28.9888L279.228 6.95562L274.156 4.53698L268.296 8.19502L230.71 38.0387Z'; 
    case 'redBullRing':
      return 'M42.5 3L6 7.5L57.5 63L79 111.5L131.5 194.5L147.5 210.5L326 160.5L336 148.5L326 110L314 96H201L173.5 103L153 120L135 129.5L120 120L101 84V63L116 58H147.5L177.5 63L201 54L217.5 34L213 23H188L135 16L82.5 7.5L42.5 3Z'; 
    case 'redBullRingShort':
      return 'M8.52609 25.2379L4 39.4896L61.2417 125L228.707 76.9353L250.805 65.1986L254 57.3741L237.227 8.19169L228.707 4H147.77L91.0607 8.19169L71.8914 19.3695L61.2417 35.8568H45.2673L34.6177 29.4296L29.5591 19.3695H13.0522L8.52609 25.2379Z'; 
    case 'circuitDeLaSarthe':
      return 'M3 84L6 94L14 120V132V144.5L6 152.5L14 157.5L17.5 166V173L6 190.5L28.5 222.5L38.5 259L56.5 253.5L60 263.5L76 277L97.5 292L158.5 312.5V304.5L152.5 232.5L87 30L70 3H56.5L47.5 11L43.5 18H34.5L28.5 23L17.5 30V34.5L14 38L6 48L3 84Z'; 
    case 'circuitDeLaSartheShort':
      return 'M3 84L6 94L14 120V132V144.5L6 152.5L14 157.5L17.5 166V173L6 190.5L28.5 222.5L38.5 259L56.5 253.5L60 263.5L76 277L97.5 292L158.5 312.5V304.5L152.5 232.5L87 30L70 3H56.5L47.5 11L43.5 18H34.5L28.5 23L17.5 30V34.5L14 38L6 48L3 84Z'; 
    case 'tskuba':
      return 'M30.5 70.5L22.5 105.5L3 181.5V200.5L9 218.5L18 231.5L30.5 240L47 244H61L76.5 240L91.5 231.5L237 30L241 15.5V3H224.5L212.5 21.5L198.5 64.5L152.5 115H101L85.5 124.5L76.5 151.5L68.5 212H54H47L41 200.5L47 186.5L54 164.5V115L61 94L68.5 64.5L76.5 38L68.5 21.5H54L41 34.5L30.5 70.5Z'; 
    case 'autodromoNazionaleMonza':
      return 'M20 104.5L15.5 140.5L3 257.5L7.5 279L15.5 289L25.5 294.5L35 289L51 156L60.5 145.5V131L73.5 124L146 64.5L178 45L173.5 3H162L141.5 9.5L124.5 13.5L116 19L73.5 23H56L39.5 31L25.5 45L20 85L25.5 104.5H20Z'; 
    case 'autodromoNazionaleMonzaShort':
      return 'M178.987 4.28858L147.919 12.8977L132.521 17.9242L128.113 24.1717L58.8538 27.4252L42.6277 34.6154L23.0855 52.8664L4.06654 253.229L4.03471 272.475L13.0758 289.33L22.6876 293.435L32.5878 289.362L37.5444 283.356L51.4941 157.08L65.8073 143.391L65.8268 131.603L137.648 74.9477L189.906 49.0526L189.953 20.906L185.024 10.0722L178.987 4.28858Z'; 
    case 'autodromoDeInterlagos':
      return 'M11 81L3 119V127L40 265.5H53L66 255.5L77 260L95.5 265.5L119 260L129.5 246.5L175 85L170 76L138 67L119 76L69 149.5L53 155L29.5 149.5L22 127V105.5L29.5 102.5L48 110L58 98L48 85L33.5 67L29.5 49.5L33.5 43H40L53 55.5L66 67H85L101 55.5L109.5 40L119 24V14.5L101 3H82.5L53 10.5L33.5 24L22 40L11 81Z'; 
    case 'nurburgring24':
      return 'M24 183L28 171L24 143L14.5 129L5 123.5L14.5 115.5L36.5 99.5L40 84.5L43.5 76.5L63 55.5V45.5L51 39L58.5 31.5L67 18.5L81.5 28.5L92 24.5H103L107.5 18.5L127.5 10L139.5 4L144.5 28.5L169 39L194 42.5L204 49L219 39H234L222.5 49L225.5 52L239.5 42.5L250 39V28.5L254.5 24.5L266.5 28.5L272.5 31.5L278 36.5L281 42.5V52L285.5 55.5L289 66H278L272.5 73.5L266.5 84.5V94.5L257 101.5L250 110.5L234 120.5H222.5L214.5 115.5L209 120.5V129L222.5 135V146.5L139.5 197.5L127.5 206L120.5 219.5L113.5 225.5L107.5 230L81.5 255.5H71L67 263L71 278L58.5 297H51L63 283.5V267.5V258.5L58.5 252.5L71 238.5L88 234.5L97 219.5L103 225.5L97 230L73.5 227L63 222.5L58.5 216H51L48 209L40 206L24 183Z'; 
     case 'nordschleife':
      return 'M4 152.58V157.739V162.898L20.4672 175.279L30.1538 200.042V218.615L24.3419 230.996V242.346L54.3704 270.205L58.245 278.459H65.0256V282.587L75.6809 291.873L86.3362 288.777L99.8974 296L108.615 291.873L115.396 282.587L127.02 291.873H134.769L139.613 285.682L155.111 261.951L166.735 251.633L267.476 187.661V180.438L264.57 171.152L250.04 162.898V154.643L255.852 149.484L267.476 154.643H279.1L293.63 145.357L312.034 124.721H318.815L322.689 117.498V98.9258L330.439 82.417H344V72.0989L337.219 65.9081V57.6537V47.3357L304.285 29.7951L300.41 39.0813L293.63 53.5265L283.943 57.6537L267.476 65.9081V61.7809L279.1 47.3357H267.476L255.852 53.5265L236.479 61.7809L225.823 47.3357H209.356L183.202 42.1767L166.735 25.6678V4H161.892L149.299 10.1908L134.769 15.3498L123.145 21.5406L120.239 33.9223H113.459L103.772 29.7951L92.1481 33.9223V29.7951L84.3989 25.6678H75.6809L71.8063 29.7951L64.057 39.0813L58.245 42.1767V47.3357L65.0256 57.6537H71.8063V70.0353L47.5897 94.7986V103.053L41.7778 108.212V122.657L24.3419 144.325L4 152.58Z'; 
    case 'nurburgringgp':
      return 'M158.835 30.4266L85.9774 51.2476L52.594 95.8258L33.4211 124.121L37.7068 133.998L40.8647 137.201L57.3308 148.145L65.4511 155.886V166.831L44.9248 239.971V252.25V267.198V277.075L10.4135 318.45L5 328.594L10.4135 335H18.5338L37.7068 301.366L50.3383 285.884L85.9774 259.991V252.25L83.0451 245.844L68.3835 234.365L65.4511 225.823L68.3835 206.337L83.0451 150.815L78.7594 128.392L65.4511 124.121L68.3835 117.448V107.571L83.0451 103.567L99.2857 107.571L103.346 117.448L95.6767 141.739L99.2857 148.145L123.872 128.392L215 18.9484V13.0758L205.075 4L185.451 8.80484L163.797 18.9484L158.835 30.4266Z'; 
    case 'willowSpringBig':
      return 'M9 93L3 119L9 129L24.5 143.5H54L61.5 129L88.5 93L100 84.5H113.5L264.5 188L285 183.5L310.5 165.5L315.5 134.5L310.5 99L285 72L264.5 67L217 55L153.5 28L141 36.5L120 41L109 36.5L100 18L73.5 3L61.5 9.5V28L73.5 41V55L54 67L9 93'; 
    case 'willowSpringStreet':
      return 'M101.601 107.689L82.1134 139.227V161.689L86.0436 180.975L82.1134 196.403L73.7616 207.975L62.626 213.42V225.899L70.3227 245.866L78.8382 271.504V287.613L73.7616 300.773H59.187L15.7907 245.866H9.07655L4 256.756L19.0659 310.076L29.7103 326.412L155.805 382L169.07 377.462L173 362.714L169.07 351.824L155.805 345.697L140.084 315.521L107.169 310.076L101.601 250.63L107.169 231.345L109.953 213.42L120.597 201.849V180.975V26.4622L107.169 4H93.249L86.0436 13.3025V26.4622L93.249 39.6218L107.169 62.7647V86.8151L101.601 107.689Z';
    case 'willowSpringHorse':
      return 'M4 67.6312V61.1521M4 61.1521V51.4335L13.3288 44.9544H26.1559L47.1458 77.3498L96.122 146.46L192.908 192.894H224.393L243.051 181.015L251.214 169.137L247.715 150.779L148.597 107.586L132.271 83.8289V67.6312L148.597 61.1521L171.919 67.6312L224.393 100.027L251.214 107.586L269.871 100.027L279.2 83.8289L269.871 67.6312L236.054 31.9962V17.9582L243.051 5L269.871 17.9582L293.193 31.9962L323.512 44.9544L341.003 61.1521L348 91.3878L341.003 122.703L323.512 141.061V181.015L279.2 264.164L236.054 289H164.922L103.119 272.802L4 83.8289V61.1521Z'; 
    case 'willowSpringStreetReverse':
      return 'M101.601 107.689L82.1134 139.227V161.689L86.0436 180.975L82.1134 196.403L73.7616 207.975L62.626 213.42V225.899L70.3227 245.866L78.8382 271.504V287.613L73.7616 300.773H59.187L15.7907 245.866H9.07655L4 256.756L19.0659 310.076L29.7103 326.412L155.805 382L169.07 377.462L173 362.714L169.07 351.824L155.805 345.697L140.084 315.521L107.169 310.076L101.601 250.63L107.169 231.345L109.953 213.42L120.597 201.849V180.975V26.4622L107.169 4H93.249L86.0436 13.3025V26.4622L93.249 39.6218L107.169 62.7647V86.8151L101.601 107.689Z'; 
    case 'willowSpringHorseReverse':
      return 'M4 67.6312V61.1521M4 61.1521V51.4335L13.3288 44.9544H26.1559L47.1458 77.3498L96.122 146.46L192.908 192.894H224.393L243.051 181.015L251.214 169.137L247.715 150.779L148.597 107.586L132.271 83.8289V67.6312L148.597 61.1521L171.919 67.6312L224.393 100.027L251.214 107.586L269.871 100.027L279.2 83.8289L269.871 67.6312L236.054 31.9962V17.9582L243.051 5L269.871 17.9582L293.193 31.9962L323.512 44.9544L341.003 61.1521L348 91.3878L341.003 122.703L323.512 141.061V181.015L279.2 264.164L236.054 289H164.922L103.119 272.802L4 83.8289V61.1521Z'; 
    case 'brandsHatch':
      return 'M23 53L8.5 74L3 94.5L8.5 111.5L112.5 148.5L120 160L112.5 196V220.5L143 249.5L169.5 256.5H194.5L207 249.5L224 205.5L228.5 177L219.5 160L108.5 107L53 94.5L42.5 80.5V64.5L85.5 41.5L125.5 32L137 47.5L139.5 88L149.5 94.5L157.5 80.5L154 17L137 3L112.5 7.5L23 53Z'; 
    case 'brandsHatchIndy':
      return 'M4 147.919V133.217L8.46154 113.873L20.359 88.3394L42.6667 69.7692L162.385 10.9638L185.436 4H205.513L221.872 10.9638L230.795 24.8914L236 41.914V133.217L230.795 141.729H215.923L209.231 130.122L205.513 78.2805L195.103 57.3891L185.436 45.0091L126.692 61.2579L69.4359 92.9819L57.5385 111.552V147.919L53.0769 157.204L36.7179 175H20.359L11.4359 166.489L4 147.919Z'; 
    case 'mountPanorama':
      return 'M85.5 126L78 144L39.5 126H27.5L22.5 134L34 148L27.5 169.5L12 178.5L3 200V215.5L22.5 237L53.5 240.5H67.5H78V249.5H89L97.5 261H106.5L114 274.5H119.5L133 255.5L141 207L154 115L169.5 81.5L161.5 71.5L165.5 12.5L106.5 3L85.5 126Z'; 
    case 'suzuka':
      return 'M3 27.5V11L25 3L40 20L52.5 55.5L87.5 82L123.5 88L145 78L162 55.5L170 44L174.5 49.5L166 68.5V93.5L170 143L204.5 148L233.5 121.5L261.5 107.5L293.5 114L304 129.5L297.5 156.5V171L327 180.5L338.5 196.5L344.5 216L368 223.5L391.5 260.5L404.5 270.5L415.5 260.5L421.5 242.5L319 93.5L304 84.5706H284L270.5 93.5L261.5 84.5706L211.5 121.5L183.5 129.5L108.5 98.5L40 64.5L3 27.5Z'; 
    case 'suzukaEast':
      return 'M4 13.7053L8.2406 31.4984L18.8421 35.2727L26.2632 47.1348V61.6928L18.8421 79.4859L26.2632 90.8088L42.6955 96.2006L58.0677 100.514L63.8985 112.915L74.5 131.248H86.1617L97.8233 137.718L122.737 171.687L130.688 176L140.759 171.687L145 162.52V146.884L133.338 131.248L26.2632 7.23511L8.2406 4L4 13.7053Z'; 
    case 'sardegna':
      return 'M4 32L52 89L37.5 230.5L41 273L62 266.5H87L137.5 227V209L201.5 192.5L212 177L189 138L197 63L171.5 4L161.5 11L143 20L115.5 25.5L87 20L67 11L10.5 25.5L4 32Z'; 
    case 'sardegnaB':
      return 'M19.065 29.8947L26.1545 41.8947L4 178.316L9.31707 196L19.065 193.474L39.4472 189.684H56.2846H71.3496L86.4146 170.105L94.3902 156.211L86.4146 149.263L35.9024 156.211L32.3577 149.263V141.684L71.3496 120.211L74.8943 78.5263L56.2846 41.8947L113 33.6842V25.4737L86.4146 4H71.3496L35.9024 17.2632L19.065 29.8947Z'; 
    case 'sardegnaC':
      return 'M19.5556 19.37L4 139.063V193.817L10.8444 197L32.6222 190.633H48.1778H58.1333L116 146.067L109.778 115.507L92.9778 90.6767H83.0222L71.2 79.2167L63.7333 63.9367L43.8222 44.8367L36.3556 30.83V15.55L29.5111 6L23.9111 10.4567L19.5556 19.37Z'; 
    case 'sardegnaReverse':
      return 'M4 32L52 89L37.5 230.5L41 273L62 266.5H87L137.5 227V209L201.5 192.5L212 177L189 138L197 63L171.5 4L161.5 11L143 20L115.5 25.5L87 20L67 11L10.5 25.5L4 32Z'; 
    case 'sardegnaBReverse':
      return 'M19.065 29.8947L26.1545 41.8947L4 178.316L9.31707 196L19.065 193.474L39.4472 189.684H56.2846H71.3496L86.4146 170.105L94.3902 156.211L86.4146 149.263L35.9024 156.211L32.3577 149.263V141.684L71.3496 120.211L74.8943 78.5263L56.2846 41.8947L113 33.6842V25.4737L86.4146 4H71.3496L35.9024 17.2632L19.065 29.8947Z'; 
    case 'sardegnaCReverse':
      return 'M19.5556 19.37L4 139.063V193.817L10.8444 197L32.6222 190.633H48.1778H58.1333L116 146.067L109.778 115.507L92.9778 90.6767H83.0222L71.2 79.2167L63.7333 63.9367L43.8222 44.8367L36.3556 30.83V15.55L29.5111 6L23.9111 10.4567L19.5556 19.37Z'; 
    case 'specialStageRouteX':
      return 'M226.5 261L8.5 42.5L3 31L8.5 12L18 3H34L51.5 12L259 218L273 242L269 261L259 266L243.5 270.5L226.5 261Z'; 
    case 'sainteCroix':
      return 'M67 45L3 127V135L67 188.5L72 201L53 223.5V245.5L67 259.5H97L109.5 239L121.5 245.5L194.5 168.5L229 195.5V161L218.5 142.5L229 112V50L224 14.5L206.5 4L180 32L194.5 45L201 66L189 81L132 40.5L116.5 66L139.5 81V112L109.5 117V85L67 45Z'; 
    case 'sainteCroixB':
      return 'M70.272 4L5 75.9231V81.5641L53.5356 117.526V129.513L46.841 139.385V153.487L40.1464 168.295L15.0418 176.756L5 183.103L10.8577 191.564L62.7406 224H156.464L169.017 209.897L147.259 191.564L133.033 176.756L205 109.064L194.958 97.7821V85.7949L189.1 75.9231L169.017 64.641H120.481V37.141L78.6402 4H70.272Z'; 
    case 'sainteCroixC':
      return 'M24.638 97.2834L19.4194 103.068V124.762L26.8746 131.27L38.0573 138.502V145.733L31.3477 165.257L19.4194 177.55L26.8746 193.459L24.638 205.752L6 218.046L11.2186 222.384L167.032 226L178.961 222.384V212.984L157.34 190.567V184.059L207.29 124.762L200.581 116.085V106.684L187.907 92.2215L167.032 87.1596V61.127L149.885 48.8339L164.05 29.3094L207.29 62.5733L214 56.0651V43.0489L200.581 22.8013L214 4H113.355V32.9251L53.7133 103.068H41.0394L24.638 97.2834Z'; 
    case 'sainteCroixReverse':
      return 'M67 45L3 127V135L67 188.5L72 201L53 223.5V245.5L67 259.5H97L109.5 239L121.5 245.5L194.5 168.5L229 195.5V161L218.5 142.5L229 112V50L224 14.5L206.5 4L180 32L194.5 45L201 66L189 81L132 40.5L116.5 66L139.5 81V112L109.5 117V85L67 45Z'; 
    case 'sainteCroixBReverse':
      return 'M70.272 4L5 75.9231V81.5641L53.5356 117.526V129.513L46.841 139.385V153.487L40.1464 168.295L15.0418 176.756L5 183.103L10.8577 191.564L62.7406 224H156.464L169.017 209.897L147.259 191.564L133.033 176.756L205 109.064L194.958 97.7821V85.7949L189.1 75.9231L169.017 64.641H120.481V37.141L78.6402 4H70.272Z'; 
    case 'sainteCroixCReverse':
      return 'M24.638 97.2834L19.4194 103.068V124.762L26.8746 131.27L38.0573 138.502V145.733L31.3477 165.257L19.4194 177.55L26.8746 193.459L24.638 205.752L6 218.046L11.2186 222.384L167.032 226L178.961 222.384V212.984L157.34 190.567V184.059L207.29 124.762L200.581 116.085V106.684L187.907 92.2215L167.032 87.1596V61.127L149.885 48.8339L164.05 29.3094L207.29 62.5733L214 56.0651V43.0489L200.581 22.8013L214 4H113.355V32.9251L53.7133 103.068H41.0394L24.638 97.2834Z'; 
    case 'kyotoDrivingPark':
      return 'M14.5 11L3 39.5V49.5L12 66L68 107.5L135.5 190L144 193L157 183L200 193L229.5 175.5L259 169.5L297.5 175.5H316.5V165L238.5 132.5L217 111L196.5 98.5L118.5 92L111 80.5L113.5 69L125.5 66L328 69L344.5 60L355.5 39L348 19L322 11H255.5L235 19L212.5 3L192.5 11L161.5 19L42 3L14.5 11Z'; 
    case 'kyotoDrivingParkMiyabi':
      return 'M54.7975 98.1288L41.4632 87.5227L4 24.5492V11.2917L8.44479 4H18.6043L47.1779 19.2462V27.8636L59.2423 37.8068L73.8466 34.4924L192.586 105.42L204.65 123.981L211 143.867L204.65 162.428L192.586 175.023L170.997 179L151.313 171.045L97.9755 105.42L79.5614 98.1288H54.7975Z'; 
    case 'kyotoDrivingParkFull':
      return 'M4 29.3767V48.1333L10.785 59.1667L22.0935 72.4067L46.972 93.37L63.9346 99.99L128.393 178.327L125 189.36L115.953 191.567L93.3364 178.327L79.7664 183.843L71.8505 191.567L84.2897 215.84L115.953 254.457L128.393 262.18H147.617L169.103 266.593L214.336 327.277L231.299 335L256.178 327.277L268.617 312.933V291.97L256.178 271.007L158.925 215.84L138.57 202.6V191.567L147.617 183.843H158.925L169.103 198.187H184.935L205.29 191.567L262.963 167.293L307.065 173.913H325.159V161.777L243.738 129.78L231.299 116.54L223.383 99.99L128.393 93.37L115.953 80.13V66.89L128.393 59.1667L342.121 66.89L359.084 59.1667L367 41.5133V23.86L347.776 9.51667H277.664L262.963 18.3433H243.738L214.336 4L173.626 18.3433L40.1869 4L22.0935 9.51667L4 29.3767Z'; 
    case 'kyotoDrivingParkReverse':
      return 'M14.5 11L3 39.5V49.5L12 66L68 107.5L135.5 190L144 193L157 183L200 193L229.5 175.5L259 169.5L297.5 175.5H316.5V165L238.5 132.5L217 111L196.5 98.5L118.5 92L111 80.5L113.5 69L125.5 66L328 69L344.5 60L355.5 39L348 19L322 11H255.5L235 19L212.5 3L192.5 11L161.5 19L42 3L14.5 11Z'; 
    case 'kyotoDrivingParkFullReverse':
      return 'M4 29.3767V48.1333L10.785 59.1667L22.0935 72.4067L46.972 93.37L63.9346 99.99L128.393 178.327L125 189.36L115.953 191.567L93.3364 178.327L79.7664 183.843L71.8505 191.567L84.2897 215.84L115.953 254.457L128.393 262.18H147.617L169.103 266.593L214.336 327.277L231.299 335L256.178 327.277L268.617 312.933V291.97L256.178 271.007L158.925 215.84L138.57 202.6V191.567L147.617 183.843H158.925L169.103 198.187H184.935L205.29 191.567L262.963 167.293L307.065 173.913H325.159V161.777L243.738 129.78L231.299 116.54L223.383 99.99L128.393 93.37L115.953 80.13V66.89L128.393 59.1667L342.121 66.89L359.084 59.1667L367 41.5133V23.86L347.776 9.51667H277.664L262.963 18.3433H243.738L214.336 4L173.626 18.3433L40.1869 4L22.0935 9.51667L4 29.3767Z'; 
    case 'tokyoExpresswayCentralOuter':
      return 'M49.5 87L31.5 120L10 142.5L3 169.5L22 209L47 213.5L74.5 220.5L98 225L136.5 229L147.5 217V192.5L140.5 166L154.5 142.5L178.5 112L204 100.5L213.5 83.5L222 68.5L232.5 48.5L213.5 12.5L163.5 3L90 8L74.5 34L49.5 87Z'; 
    case 'tokyoExpresswayCentralInner':
      return 'M83.3043 19.5253L63.4783 64.6899V68.2184L37.2795 117.617L13.205 138.788L4 164.899L8.95652 181.835L25.2422 210.063H37.2795L63.4783 215.709L83.3043 221.354L115.168 227H141.366L150.571 215.709V195.949L141.366 181.835V164.899L150.571 147.256L178.186 112.677L204.385 97.8576L214.298 87.9779V77.3924L223.503 68.2184L232 52.693L214.298 19.5253L195.888 10.3513L150.571 4L98.882 10.3513L83.3043 19.5253Z'; 
    case 'tokyoExpresswayEastOuter':
      return 'M7 32.1667L11.9052 37.5833L117.367 34.3333L127.177 49.5L141.893 53.8333L184.813 60.3333L192.171 74.4167L208.113 95H236.318L266.976 85.25L274.333 74.4167L300.086 69L311.122 60.3333L322.159 41.9167L341.78 28.9167L401.868 23.5L408 14.8333L401.868 4L331.969 8.33333L266.976 23.5L141.893 28.9167H20.4893L7 32.1667Z'; 
    case 'tokyoExpresswayEastInner':
      return 'M193.929 24.7209L4 29.4302V36.9651L101.774 33.1977L116.384 49.2093L162.461 54.8605L181.567 77.4651L208.539 85L236.635 77.4651L243.378 67.1046H251.245L277.093 58.6279L296.198 33.1977L310.808 29.4302L367 24.7209V16.2442L362.505 4H350.142L315.303 7.76744L277.093 12.4767L232.139 20.9535L193.929 24.7209Z'; 
    case 'tokyoExpresswaySouthOuter':
      return 'M41.4634 101.438L32.0976 119.242V122.209L12.5854 160.042L4 178.588L7.12195 188.232L21.1707 203.069H32.0976L41.4634 210.487L53.9512 222.356L72.6829 232L82.8293 230.516L89.0732 222.356L114.829 182.297L120.293 160.042L122.634 137.046L137.463 119.242L142.927 101.438L146.049 84.3758L149.951 73.9902L165.561 48.0261L190.537 22.0621L196 9.45098L190.537 5L157.756 38.3824L137.463 78.4412H114.829L107.805 81.4085L95.3171 84.3758L70.3415 73.9902L53.9512 88.085L41.4634 101.438Z'; 
    case 'tokyoExpresswaySouthInner':
      return 'M21.3077 148.117L43.8077 100.103L66.3077 82.56L85.3462 91.7933H99.1923L103.519 86.2533H133.808L184 15.1567V5L168.423 10.54L133.808 63.17V76.0967V108.413L113.038 142.577L108.712 173.97L88.8077 222.907L81.8846 237.68V245.99L103.519 259.84L126.885 266.303L133.808 282H145.058L148.519 274.613L136.404 267.227L62.8462 237.68L10.0577 202.593L4 193.36L21.3077 148.117Z'; 
    case 'dragonTrail':
      return 'M21.5 228.5L13.5 246.5V250.5L4 270.5L13.5 276L52 246.5L100.5 228.5H130.5L147 220.5L171.5 228.5L183.5 239.5L229 246.5L240 235.5L183.5 197.5L147 150.5L151.5 115.5L130.5 92L151.5 64L162 4L130.5 13L106.5 47L83 70.5L91 83L52 119.5L21.5 228.5Z'; 
    case 'dragonTrailGardens':
      return 'M13.8591 48.7619L9.30872 73.0612L6.27517 94.1633L4 113.347L9.30872 129.973V150.435L20.6846 183.048L24.4765 192L32.0604 189.442L41.1611 172.177V158.109L50.2617 145.959V137.646L41.1611 121.02V109.51L64.6711 92.8844V87.7687L59.3624 80.0952L44.953 36.6122L59.3624 25.7415L78.3221 28.2993L88.9396 42.3673L84.3893 59.6327L61.6376 158.109L73.0134 161.946H84.3893L117 28.2993L111.691 14.8707L98.7987 4H84.3893L29.7852 25.102V42.3673L13.8591 48.7619Z'; 
    case 'dragonTrailReverse':
      return 'M21.5 228.5L13.5 246.5V250.5L4 270.5L13.5 276L52 246.5L100.5 228.5H130.5L147 220.5L171.5 228.5L183.5 239.5L229 246.5L240 235.5L183.5 197.5L147 150.5L151.5 115.5L130.5 92L151.5 64L162 4L130.5 13L106.5 47L83 70.5L91 83L52 119.5L21.5 228.5Z'; 
    case 'dragonTrailGardensReverse':
      return 'M13.8591 48.7619L9.30872 73.0612L6.27517 94.1633L4 113.347L9.30872 129.973V150.435L20.6846 183.048L24.4765 192L32.0604 189.442L41.1611 172.177V158.109L50.2617 145.959V137.646L41.1611 121.02V109.51L64.6711 92.8844V87.7687L59.3624 80.0952L44.953 36.6122L59.3624 25.7415L78.3221 28.2993L88.9396 42.3673L84.3893 59.6327L61.6376 158.109L73.0134 161.946H84.3893L117 28.2993L111.691 14.8707L98.7987 4H84.3893L29.7852 25.102V42.3673L13.8591 48.7619Z'; 
    case 'autodromoLagoMaggioreGP':
      return 'M33.5 95L43 123.5L4 189.5L10 196.5L193 123.5L201.5 95L242.5 73.5L267 84.5L279 79.5H295.5L319 130.5L332 148.5L351 159L358.5 148.5V123.5L300.5 23H287.5L256.5 49L219 27.5L210.5 23V39.5L219 49L102 130.5L83 135.5L71 120L67.5 68L76 49L95 39.5V23L83 3H67.5L25.5 73.5L33.5 95Z'; 
    case 'autodromoLagoMaggioreCenter':
      return 'M118.5 33.5L42.5 91L23 105.5L4 123V130.5L10 135L77 112L94.5 102.5L103 94L107.5 77.5L111 72L126 63.5L134 54L149.5 33.5V20.5L144 11L126 3.5H122H118.5V11L126 20.5V26L118.5 33.5Z'; 
    case 'autodromoLagoMaggioreEast':
      return 'M120.605 36.1538L25.0382 114.846L11.9363 122.462L5 141.923L11.9363 147L25.0382 141.923L82.8408 118.231L94.4013 108.923L101.338 93.6923L105.191 81.8462L120.605 67.4615L135.248 61.5385H146.809L161.452 67.4615H169.93L182.261 61.5385L194.592 67.4615L210.777 122.462L219.255 135.154L232.357 141.923H242.376L247 135.154V108.923L194.592 4H186.115L174.554 20.0769L161.452 28.5385H155.287L120.605 10.7692H112.127V20.0769L120.605 28.5385V36.1538Z'; 
    case 'autodromoLagoMaggioreWest':
      return 'M42.8689 32.4722L27.7213 67.6111L24.9672 75.2778L38.7377 99.5556V113.611L5 159.611L9.13115 166H16.7049L64.9016 148.75L165.426 112.333L173.689 99.5556L177.131 88.0556L189.525 81.0278L198.475 72.0833L215 50.3611L212.246 38.8611L189.525 26.7222H184.016V32.4722L191.59 42.0556V50.3611L107.59 106.583L89.6885 113.611H69.7213L64.9016 106.583V50.3611L77.2951 42.0556L89.6885 32.4722V26.7222L82.1148 17.7778L69.7213 5L60.082 8.83333L42.8689 32.4722Z'; 
    case 'autodromoLagoMaggioreGPReverse':
      return 'M33.5 95L43 123.5L4 189.5L10 196.5L193 123.5L201.5 95L242.5 73.5L267 84.5L279 79.5H295.5L319 130.5L332 148.5L351 159L358.5 148.5V123.5L300.5 23H287.5L256.5 49L219 27.5L210.5 23V39.5L219 49L102 130.5L83 135.5L71 120L67.5 68L76 49L95 39.5V23L83 3H67.5L25.5 73.5L33.5 95Z'; 
    case 'autodromoLagoMaggioreCenterReverse':
      return 'M118.5 33.5L42.5 91L23 105.5L4 123V130.5L10 135L77 112L94.5 102.5L103 94L107.5 77.5L111 72L126 63.5L134 54L149.5 33.5V20.5L144 11L126 3.5H122H118.5V11L126 20.5V26L118.5 33.5Z'; 
    case 'autodromoLagoMaggioreEastReverse':
      return 'M120.605 36.1538L25.0382 114.846L11.9363 122.462L5 141.923L11.9363 147L25.0382 141.923L82.8408 118.231L94.4013 108.923L101.338 93.6923L105.191 81.8462L120.605 67.4615L135.248 61.5385H146.809L161.452 67.4615H169.93L182.261 61.5385L194.592 67.4615L210.777 122.462L219.255 135.154L232.357 141.923H242.376L247 135.154V108.923L194.592 4H186.115L174.554 20.0769L161.452 28.5385H155.287L120.605 10.7692H112.127V20.0769L120.605 28.5385V36.1538Z'; 
    case 'autodromoLagoMaggioreWestReverse':
      return 'M42.8689 32.4722L27.7213 67.6111L24.9672 75.2778L38.7377 99.5556V113.611L5 159.611L9.13115 166H16.7049L64.9016 148.75L165.426 112.333L173.689 99.5556L177.131 88.0556L189.525 81.0278L198.475 72.0833L215 50.3611L212.246 38.8611L189.525 26.7222H184.016V32.4722L191.59 42.0556V50.3611L107.59 106.583L89.6885 113.611H69.7213L64.9016 106.583V50.3611L77.2951 42.0556L89.6885 32.4722V26.7222L82.1148 17.7778L69.7213 5L60.082 8.83333L42.8689 32.4722Z'; 
    case 'nothernIsleSpeedway':
      return 'M16.5 32.5L5.5 74L3 71.5L16.5 111L43 138.5L68.5 146H286.5L323 124L341 88L337.5 56L315 17L278.5 3H63L16.5 32.5Z'; 
    case 'blueMoonSpeedway':
      return 'M3 109.5V131.5L14.5 153L34 164.5H316.5L334 160.5L342 143.5L334 126.5L119.5 3H83.5L56 20L3 109.5Z'; 
    case 'blueMoonSpeedwayInA':
      return 'M104.507 35.4545L24.8368 17.0455L4 75.9545V120.136L18.7083 151.432L39.5451 168H326.358L345.969 151.432L357 120.136L350.872 85.1591L267.524 6L230.753 46.5L211.142 94.3636L120.441 85.1591L66.5104 120.136L61.6076 112.773V94.3636L104.507 63.0682V35.4545Z'; 
    case 'blueMoonSpeedwayInB':
      return 'M37.7747 5L25.7901 33.5676L4 68.9369V104.306L12.716 128.793L30.1481 149.198L47.5802 156H307.972L327.583 149.198L357 128.793V104.306L340.657 75.7387L251.318 5L178.321 21.3243L117.309 33.5676L37.7747 5Z'; 
    case 'blueMoonSpeedwayReverse':
      return 'M3 109.5V131.5L14.5 153L34 164.5H316.5L334 160.5L342 143.5L334 126.5L119.5 3H83.5L56 20L3 109.5Z'; 
    case 'blueMoonSpeedwayInAReverse':
      return 'M104.507 35.4545L24.8368 17.0455L4 75.9545V120.136L18.7083 151.432L39.5451 168H326.358L345.969 151.432L357 120.136L350.872 85.1591L267.524 6L230.753 46.5L211.142 94.3636L120.441 85.1591L66.5104 120.136L61.6076 112.773V94.3636L104.507 63.0682V35.4545Z'; 
    case 'blueMoonSpeedwayInBReverse':
      return 'M37.7747 5L25.7901 33.5676L4 68.9369V104.306L12.716 128.793L30.1481 149.198L47.5802 156H307.972L327.583 149.198L357 128.793V104.306L340.657 75.7387L251.318 5L178.321 21.3243L117.309 33.5676L37.7747 5Z'; 
    case 'broadBeanRaceway':
      return 'M18.5 73.5L3 108.5V140L18.5 162.5L41 185L63.5 191.5H257.5L273 185L281 162.5V44L265 15.5L239 3H214.5L187 15.5L160.5 34L139 44H71.5L46 52L18.5 73.5Z'; 
    case 'broadBeanRacewayReverse':
      return 'M18.5 73.5L3 108.5V140L18.5 162.5L41 185L63.5 191.5H257.5L273 185L281 162.5V44L265 15.5L239 3H214.5L187 15.5L160.5 34L139 44H71.5L46 52L18.5 73.5Z'; 
    case 'alsace':
      return 'M29 238L10.5 271.5L14.5 281.5L29 284.5H42L46.5 265L57.5 222.5H69.5L101 255.5L119.5 262L150 255.5L139 204V178L150 163.5H168.5L197 178H207V169L197 155L183 134L177.5 112L197 3H190.5L145 63L139 80.5L119.5 75L108.5 97L69.5 128.5L57.5 155L42 169L10.5 155L4 163.5L20 178L29 238Z'; 
    case 'alsaceReverse':
      return 'M29 238L10.5 271.5L14.5 281.5L29 284.5H42L46.5 265L57.5 222.5H69.5L101 255.5L119.5 262L150 255.5L139 204V178L150 163.5H168.5L197 178H207V169L197 155L183 134L177.5 112L197 3H190.5L145 63L139 80.5L119.5 75L108.5 97L69.5 128.5L57.5 155L42 169L10.5 155L4 163.5L20 178L29 238Z'; 
    case 'fishermansRanch':
      return 'M11 74L6 85L4 94H15L32.5 81.5L44 85V94L32.5 104L37 118L95.5 149.5V163.5H62.5L56.5 168.5L68 174V186.5H46.5L4 252.5L6 271H15L24 262.5L37 255L52.5 266L90 271L105 262.5L113 255L121.5 262.5L134 271H163L199 266L227 255L241.5 235.5V211V193L234.5 186.5L216.5 174L206.5 168.5L185.5 154L182 139L185.5 129.5L212 118V97L221 85L249 77L259.5 61.5L250.5 52L241.5 61.5L234.5 56.5L241.5 47.5V42.5H227L221 38L206.5 29.5L194.5 14.5L176 3L158 14.5L113 29.5H90L79.5 38L52.5 42.5L28.5 61.5L11 74Z'; 
    case 'fishermansRanchReverse':
      return 'M11 74L6 85L4 94H15L32.5 81.5L44 85V94L32.5 104L37 118L95.5 149.5V163.5H62.5L56.5 168.5L68 174V186.5H46.5L4 252.5L6 271H15L24 262.5L37 255L52.5 266L90 271L105 262.5L113 255L121.5 262.5L134 271H163L199 266L227 255L241.5 235.5V211V193L234.5 186.5L216.5 174L206.5 168.5L185.5 154L182 139L185.5 129.5L212 118V97L221 85L249 77L259.5 61.5L250.5 52L241.5 61.5L234.5 56.5L241.5 47.5V42.5H227L221 38L206.5 29.5L194.5 14.5L176 3L158 14.5L113 29.5H90L79.5 38L52.5 42.5L28.5 61.5L11 74Z'; 
    case 'sardegnaWindMills':
      return 'M56.5 37L3 55V67.5L20 95.5L69 126V145.5L42 168.5L20 223L42 229.5L46 243.5H56.5L101 209L92.5 191L101 126L113.5 115L126.5 103.5L119.5 85.5L101 61.5V49L133 28.5V9L119.5 3H92.5L69 9L56.5 37Z'; 
    case 'sardegnaWindMillsReverse':
      return 'M56.5 37L3 55V67.5L20 95.5L69 126V145.5L42 168.5L20 223L42 229.5L46 243.5H56.5L101 209L92.5 191L101 126L113.5 115L126.5 103.5L119.5 85.5L101 61.5V49L133 28.5V9L119.5 3H92.5L69 9L56.5 37Z'; 
    case 'coloradoSprings':
      return 'M13.5 123.5L3 150.5L13.5 170.5L30.5 188L56 201L83 209.5L105.5 196L120 184H132.5L168.5 205.5L182 196H199L210 213.5L226 234.5L238.5 238.5L248.5 222.5L258.5 196L285 166L290.5 144L274.5 133L248.5 116.5L226 97H203.5L161.5 106.5L139 91.5L132.5 52.5L124.5 30L83 3H61.5L47 18L56 47V63.5L25 82L13.5 123.5Z'; 
    case 'coloradoSpringsReverse':
      return 'M13.5 123.5L3 150.5L13.5 170.5L30.5 188L56 201L83 209.5L105.5 196L120 184H132.5L168.5 205.5L182 196H199L210 213.5L226 234.5L238.5 238.5L248.5 222.5L258.5 196L285 166L290.5 144L274.5 133L248.5 116.5L226 97H203.5L161.5 106.5L139 91.5L132.5 52.5L124.5 30L83 3H61.5L47 18L56 47V63.5L25 82L13.5 123.5Z'; 
    default:
      return '';
  }
};

export default Test;
