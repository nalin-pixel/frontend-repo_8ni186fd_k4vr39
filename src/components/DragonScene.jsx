import React from 'react'

/*
  DragonScene
  - SVG-based illustration styled with CSS-like attributes to achieve a semi-realistic look
  - Red/black dragon with sharp claws and jaws breathing animated fire
  - Plain green grass field background
*/

const DragonScene = () => {
  return (
    <div className="w-full h-screen bg-[#7cc26b] overflow-hidden relative">
      <svg
        viewBox="0 0 1600 900"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        <defs>
          {/* Grass gradient */}
          <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7bc96f" />
            <stop offset="60%" stopColor="#5cab4d" />
            <stop offset="100%" stopColor="#4f9a3a" />
          </linearGradient>

          {/* Subtle vignette */}
          <radialGradient id="vignette" cx="50%" cy="45%" r="65%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
          </radialGradient>

          {/* Dragon body gradient (red to near-black) */}
          <linearGradient id="dragonRedBlack" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b80b0b" />
            <stop offset="60%" stopColor="#7a0a0a" />
            <stop offset="100%" stopColor="#1a0e10" />
          </linearGradient>

          {/* Metallic dark for claws/horns */}
          <linearGradient id="darkSteel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d7dbe0" />
            <stop offset="50%" stopColor="#9aa0a6" />
            <stop offset="100%" stopColor="#4b4f55" />
          </linearGradient>

          {/* Scale texture via noise */}
          <filter id="scaleTexture" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="noise" />
            <feColorMatrix type="saturate" values="0.15" />
            <feBlend mode="multiply" in="SourceGraphic" in2="noise" />
            <feGaussianBlur stdDeviation="0.25"/>
          </filter>

          {/* Fire gradient */}
          <radialGradient id="fireGrad" cx="0" cy="0.5" r="1">
            <stop offset="0%" stopColor="#fff7c2" />
            <stop offset="25%" stopColor="#ffd44d" />
            <stop offset="55%" stopColor="#ff8a00" />
            <stop offset="85%" stopColor="#e04100" />
            <stop offset="100%" stopColor="#8a1a00" />
          </radialGradient>

          {/* Fire blur for glow */}
          <filter id="fireGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shadow under dragon */}
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" />
          </filter>

          {/* Subtle specular highlight */}
          <filter id="specular" x="-10%" y="-10%" width="120%" height="120%">
            <feSpecularLighting surfaceScale="2" specularConstant="0.65" specularExponent="20" lightingColor="#fff">
              <fePointLight x="900" y="200" z="200" />
            </feSpecularLighting>
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>

          {/* Simple wing membrane gradient */}
          <linearGradient id="wingMembrane" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7a0a0a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1a0e10" stopOpacity="0.9" />
          </linearGradient>

          {/* Fire animation */}
          <linearGradient id="fireAnim1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff0a8" />
            <stop offset="40%" stopColor="#ffb300" />
            <stop offset="80%" stopColor="#ff4d00" />
          </linearGradient>
        </defs>

        {/* Background grass field */}
        <rect x="0" y="0" width="1600" height="900" fill="url(#grassGrad)" />

        {/* Subtle horizon variation */}
        <g opacity="0.35">
          <ellipse cx="800" cy="760" rx="920" ry="260" fill="#3e8d31" />
          <ellipse cx="820" cy="780" rx="880" ry="220" fill="#5aa341" opacity="0.6" />
        </g>

        {/* Soft vignette to focus the scene */}
        <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)" />

        {/* Dragon shadow */}
        <ellipse cx="720" cy="690" rx="320" ry="70" fill="#000" opacity="0.35" filter="url(#softShadow)" />

        {/* Dragon Group */}
        <g transform="translate(450,210) scale(1.05)">
          {/* Tail */}
          <path d="M-100,420 C-60,390 -20,380 20,370 C90,350 160,330 210,300 C260,270 300,230 320,200 C340,170 340,150 330,140 C315,125 280,145 250,165 C220,185 200,200 180,220 C150,252 120,300 90,320 C45,350 -40,370 -100,365 C-130,362 -150,370 -160,385 C-170,400 -160,420 -140,425 C-126,428 -112,428 -100,420 Z" fill="url(#dragonRedBlack)" filter="url(#scaleTexture)" />

          {/* Body */}
          <path d="M220,420 C250,390 280,360 330,340 C420,305 520,320 590,360 C660,400 700,465 690,520 C678,585 610,630 530,650 C440,673 320,670 260,635 C225,615 205,580 205,545 C205,510 200,470 220,420 Z" fill="url(#dragonRedBlack)" filter="url(#scaleTexture)" />

          {/* Underbelly plates */}
          <path d="M260,610 C300,625 380,635 450,628 C495,623 545,610 575,590 C585,575 585,560 575,545 C530,520 470,505 400,505 C330,505 285,520 260,540 C250,555 248,590 260,610 Z" fill="#5b0b0b" opacity="0.9" />

          {/* Hind leg left */}
          <path d="M310,600 C300,660 300,705 315,730 C330,755 360,760 385,740 C400,728 410,700 418,675 C425,650 430,620 430,598 C410,590 360,590 310,600 Z" fill="url(#dragonRedBlack)" filter="url(#scaleTexture)" />
          {/* Hind claws */}
          <g transform="translate(410,725)">
            <path d="M0,0 C8,-10 25,-12 35,-10 C25,2 15,12 5,18 C-2,15 -2,8 0,0 Z" fill="url(#darkSteel)" />
            <path d="M-18,-6 C-8,-16 10,-18 20,-16 C10,-4 0,6 -10,12 C-18,8 -18,2 -18,-6 Z" fill="url(#darkSteel)" />
          </g>

          {/* Foreleg right */}
          <path d="M515,595 C510,640 520,675 540,700 C560,725 600,735 630,720 C650,710 665,690 675,665 C682,648 686,625 684,608 C660,598 610,592 515,595 Z" fill="url(#dragonRedBlack)" filter="url(#scaleTexture)" />
          {/* Fore claws */}
          <g transform="translate(650,705)">
            <path d="M0,0 C10,-12 30,-15 42,-12 C30,0 18,14 6,22 C-3,18 -3,8 0,0 Z" fill="url(#darkSteel)" />
            <path d="M-20,-10 C-8,-24 12,-27 24,-24 C12,-10 0,4 -12,14 C-20,10 -20,0 -20,-10 Z" fill="url(#darkSteel)" />
          </g>

          {/* Neck */}
          <path d="M540,500 C540,450 560,410 590,380 C615,355 650,340 690,335 C710,333 740,340 760,350 C780,360 790,380 790,400 C790,420 780,440 760,455 C735,475 700,490 660,498 C620,506 585,508 540,500 Z" fill="url(#dragonRedBlack)" filter="url(#scaleTexture)" />

          {/* Head base */}
          <path d="M745,390 C775,372 815,365 850,370 C885,375 915,392 930,410 C945,430 940,450 920,465 C900,480 865,490 835,490 C805,490 775,480 760,465 C745,450 740,430 745,390 Z" fill="url(#dragonRedBlack)" filter="url(#scaleTexture)" />

          {/* Jaw lower */}
          <path d="M825,460 C860,455 900,452 930,460 C940,465 948,470 948,480 C948,492 936,500 920,500 C900,500 865,498 835,492 C820,488 812,480 812,470 C812,465 815,462 825,460 Z" fill="#260a0a" />

          {/* Teeth */}
          <g fill="#f2f2f2">
            <path d="M840,445 l8,22 l-16,0 z" />
            <path d="M860,440 l8,22 l-16,0 z" />
            <path d="M880,438 l8,22 l-16,0 z" />
            <path d="M900,440 l8,22 l-16,0 z" />
            <path d="M920,445 l8,22 l-16,0 z" />
          </g>

          {/* Horns */}
          <g fill="url(#darkSteel)">
            <path d="M780,350 C790,320 820,300 845,295 C842,312 830,330 815,345 C800,360 788,360 780,350 Z" />
            <path d="M815,340 C830,315 865,300 890,297 C885,315 870,332 852,345 C835,356 822,355 815,340 Z" />
          </g>

          {/* Eye */}
          <ellipse cx="865" cy="430" rx="10" ry="8" fill="#ffdf40" />
          <ellipse cx="865" cy="430" rx="4" ry="6" fill="#6b2500" />

          {/* Wing */}
          <g opacity="0.95">
            <path d="M380,380 C450,320 540,290 620,285 C690,280 760,300 800,330 C760,340 730,355 690,375 C640,400 590,430 550,470 C520,500 500,525 490,550 C480,560 460,560 455,550 C450,540 455,510 470,480 C500,430 540,400 580,375 C520,375 460,385 410,405 C395,412 380,395 380,380 Z" fill="url(#wingMembrane)" />
            {/* Wing bones */}
            <g stroke="#2b1717" strokeWidth="8" strokeLinecap="round" opacity="0.9">
              <path d="M450,420 L595,350" />
              <path d="M445,445 L560,395" />
              <path d="M440,470 L520,430" />
            </g>
          </g>

          {/* Subtle specular highlight on head and neck */}
          <g opacity="0.35" filter="url(#specular)">
            <path d="M620,365 C660,350 730,350 770,370 C750,380 700,395 655,400 C635,400 625,390 620,365 Z" fill="#ffffff" />
            <path d="M760,400 C790,392 825,392 855,400 C830,410 800,418 770,420 C760,418 755,410 760,400 Z" fill="#ffffff" />
          </g>
        </g>

        {/* Fire breath with animated flicker */}
        <g transform="translate(1145,405)">
          {/* Outer glow */}
          <path d="M0,0 C60,-10 140,-5 220,20 C300,45 350,85 360,120 C365,140 350,170 325,190 C290,220 230,235 170,228 C120,222 85,205 65,190 C45,175 35,160 30,140 C20,110 20,70 30,40 C38,20 55,8 0,0 Z" fill="url(#fireGrad)" filter="url(#fireGlow)" opacity="0.9">
            <animate attributeName="d" dur="2.2s" repeatCount="indefinite"
              values="
              M0,0 C60,-10 140,-5 220,20 C300,45 350,85 360,120 C365,140 350,170 325,190 C290,220 230,235 170,228 C120,222 85,205 65,190 C45,175 35,160 30,140 C20,110 20,70 30,40 C38,20 55,8 0,0 Z;
              M0,0 C70,-5 150,0 230,25 C300,50 360,90 370,125 C375,145 360,175 330,195 C295,225 235,240 175,232 C125,226 90,208 70,192 C50,178 40,162 35,142 C22,112 18,72 28,42 C36,22 56,10 0,0 Z;
              M0,0 C55,-15 135,-10 215,15 C295,40 345,80 355,118 C360,138 345,168 318,188 C285,215 225,230 165,225 C115,220 82,205 62,188 C42,172 32,158 28,138 C18,108 20,68 32,40 C40,20 58,8 0,0 Z;
              M0,0 C60,-10 140,-5 220,20 C300,45 350,85 360,120 C365,140 350,170 325,190 C290,220 230,235 170,228 C120,222 85,205 65,190 C45,175 35,160 30,140 C20,110 20,70 30,40 C38,20 55,8 0,0 Z
              " />
          </path>

          {/* Inner core */}
          <path d="M0,0 C50,10 120,25 180,45 C240,65 280,95 290,120 C295,135 285,155 270,168 C250,185 215,195 185,192 C150,188 122,175 105,165 C92,158 82,140 78,125 C72,102 75,75 85,55 C92,40 96,30 0,0 Z" fill="url(#fireAnim1)" opacity="0.9">
            <animate attributeName="opacity" values="0.8;1;0.85;1;0.8" dur="1.6s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Foreground grass blades for depth */}
        <g opacity="0.85">
          {Array.from({ length: 80 }).map((_, i) => {
            const x = 10 + i * 20
            const h = 40 + (i % 5) * 12
            const sway = i % 2 === 0 ? 8 : -6
            return (
              <path key={i}
                d={`M${x},900 C${x + sway},${900 - h / 2} ${x - sway},${900 - h} ${x},${900 - h}`}
                stroke="#2c7a1f" strokeWidth="3" fill="none" strokeLinecap="round" />
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export default DragonScene
