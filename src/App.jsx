import React from 'react'

function App() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 flex items-end justify-center">
      {/* Inline styles for advanced SVG effects */}
      <style>{`
        @keyframes flameFlicker {
          0% { transform: scale(1) translateY(0); opacity: 0.95; }
          50% { transform: scale(1.05) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 0.95; }
        }
        @keyframes smokeDrift {
          0% { transform: translate(0,0) scale(1); opacity: .25; }
          50% { transform: translate(6px,-10px) scale(1.08); opacity: .15; }
          100% { transform: translate(0,0) scale(1); opacity: .25; }
        }
        @keyframes wingPulse {
          0% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(-1.2deg) translateY(1px); }
          100% { transform: rotate(0deg) translateY(0); }
        }
        @keyframes tailSway {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(1.5deg); }
          100% { transform: rotate(0deg); }
        }
        .glow-soft { filter: drop-shadow(0 0 6px rgba(255, 150, 40, 0.65)) drop-shadow(0 0 16px rgba(255, 90, 0, 0.45)); }
        .glow-strong { filter: drop-shadow(0 0 10px rgba(255, 170, 70, 0.9)) drop-shadow(0 0 22px rgba(255, 100, 20, 0.65)); }
      `}</style>

      {/* Ground - plain green grass */}
      <div className="absolute bottom-0 left-0 right-0 h-[38vh]">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 500">
          <defs>
            <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3fb94f" />
              <stop offset="70%" stopColor="#2f9e3d" />
              <stop offset="100%" stopColor="#218a30" />
            </linearGradient>
            <filter id="grassNoise" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise"/>
              <feColorMatrix type="saturate" values="0.3"/>
              <feBlend in="SourceGraphic" in2="noise" mode="multiply"/>
              <feGaussianBlur stdDeviation="0.25"/>
            </filter>
          </defs>
          <rect x="0" y="0" width="1200" height="500" fill="url(#grassGrad)" filter="url(#grassNoise)"/>
          {/* Subtle texture blades */}
          {Array.from({length: 80}).map((_, i) => {
            const x = (i * 15) % 1200
            const h = 20 + ((i * 37) % 50)
            const offset = ((i * 123) % 15) - 7
            return (
              <path key={i} d={`M ${x} 500 q ${offset} -${h/2} 0 -${h} q ${-offset} ${h/2} 0 ${h}`} stroke="#1d7a2a" strokeWidth="1.5" fill="none" opacity="0.35"/>
            )
          })}
        </svg>
      </div>

      {/* Dragon + Fire as scalable SVG */}
      <div className="relative w-full max-w-7xl h-[70vh] mb-[8vh]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700">
          <defs>
            {/* Body gradient: deep black to crimson red */}
            <linearGradient id="scaleGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0b0b0d" />
              <stop offset="45%" stopColor="#1b0c0f" />
              <stop offset="100%" stopColor="#8b0d12" />
            </linearGradient>
            <linearGradient id="highlightRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff2a2a"/>
              <stop offset="100%" stopColor="#8e0e12"/>
            </linearGradient>
            <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffee88"/>
              <stop offset="60%" stopColor="#ff7b00"/>
              <stop offset="100%" stopColor="#6b1800"/>
            </radialGradient>
            {/* Metallic claws */}
            <linearGradient id="clawMetal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f7f7f7"/>
              <stop offset="60%" stopColor="#c9c9c9"/>
              <stop offset="100%" stopColor="#8e8e8e"/>
            </linearGradient>
            {/* Fire gradients */}
            <radialGradient id="fireCore" cx="30%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#ffffb0"/>
              <stop offset="40%" stopColor="#ffb600"/>
              <stop offset="70%" stopColor="#ff6400"/>
              <stop offset="100%" stopColor="#d11f00"/>
            </radialGradient>
            <filter id="fireBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.2"/>
            </filter>
            <filter id="heatWobble" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence baseFrequency="0.012" numOctaves="2" type="fractalNoise" seed="12" result="turb"/>
              <feDisplacementMap in="SourceGraphic" in2="turb" scale="8" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            {/* Scale texture */}
            <pattern id="scalePattern" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
              <path d="M12,0 C18,0 24,6 24,12 C24,18 18,24 12,24 C6,24 0,18 0,12 C0,6 6,0 12,0 Z" fill="#1a0f12" opacity="0.25" />
              <path d="M12,2 C17,2 22,7 22,12 C22,17 17,22 12,22 C7,22 2,17 2,12 C2,7 7,2 12,2 Z" fill="#a30f16" opacity="0.12" />
            </pattern>
          </defs>

          {/* Dragon shadow on grass */}
          <ellipse cx="520" cy="520" rx="260" ry="38" fill="#0f3f1a" opacity="0.35" />

          {/* Tail (rear to front for depth) */}
          <g transform="translate(220,250)" style={{ transformOrigin: '220px 250px' }}>
            <g style={{ animation: 'tailSway 5s ease-in-out infinite' }}>
              <path d="M50,260 C120,230 180,210 260,230 C330,248 360,280 410,300 C450,316 500,326 540,340 C560,346 590,364 610,378 C620,386 630,400 632,415 C634,430 620,446 600,450 C585,453 567,447 556,440 C540,430 532,422 508,410 C470,388 410,360 368,340 C320,317 270,300 220,300 C140,300 90,290 60,280 C40,273 30,266 26,257 C18,240 26,230 50,260 Z" fill="url(#scaleGrad)"/>
            </g>
          </g>

          {/* Body */}
          <g transform="translate(360,180)">
            <path d="M0,180 C30,120 120,70 210,60 C300,50 380,80 430,130 C470,170 480,220 470,270 C458,330 410,380 340,400 C250,425 140,400 80,350 C30,310 -10,260 0,180 Z" fill="url(#scaleGrad)"/>
            {/* Chest highlight */}
            <path d="M120,170 C150,140 220,120 280,125 C330,130 360,155 375,185 C385,205 360,235 320,246 C270,260 210,258 168,240 C140,228 120,205 120,170 Z" fill="url(#highlightRed)" opacity="0.35"/>
            {/* Scale texture overlay */}
            <path d="M0,180 C30,120 120,70 210,60 C300,50 380,80 430,130 C470,170 480,220 470,270 C458,330 410,380 340,400 C250,425 140,400 80,350 C30,310 -10,260 0,180 Z" fill="url(#scalePattern)" opacity="0.55"/>
          </g>

          {/* Wing */}
          <g transform="translate(380,90)" style={{ transformOrigin: '480px 220px', animation: 'wingPulse 3.8s ease-in-out infinite' }}>
            <path d="M60,250 C80,160 140,110 220,80 C310,45 420,40 520,70 C580,90 610,110 640,140 C660,160 650,180 630,185 C600,192 540,198 480,205 C430,210 360,225 300,250 C240,275 170,300 140,310 C120,316 92,300 86,286 C78,266 52,282 60,250 Z" fill="#12090b" opacity="0.9" />
            <path d="M100,260 C170,220 260,190 360,175 C470,158 566,160 610,166 C632,169 646,182 636,195 C620,216 556,232 480,244 C390,258 288,275 200,300 C152,314 122,308 106,292 C98,284 88,272 100,260 Z" fill="#7a0d12" opacity="0.75" />
            {/* Membrane veins */}
            <g stroke="#2b0d10" strokeWidth="4" opacity="0.7">
              <path d="M120,270 L200,220" />
              <path d="M200,220 L320,200" />
              <path d="M200,220 L240,260" />
              <path d="M240,260 L360,230" />
              <path d="M320,200 L420,200" />
              <path d="M360,230 L460,220" />
              <path d="M420,200 L520,210" />
            </g>
          </g>

          {/* Neck + Head */}
          <g transform="translate(650,170)">
            {/* Neck */}
            <path d="M-210,210 C-180,170 -140,140 -80,130 C-30,122 20,130 60,150 C92,166 116,190 128,215 C138,236 120,256 94,256 C68,256 44,242 4,234 C-42,224 -110,226 -144,240 C-170,250 -194,238 -210,210 Z" fill="url(#scaleGrad)" />

            {/* Head shape */}
            <path d="M60,150 C90,130 140,120 186,130 C210,135 230,145 244,160 C260,178 260,206 246,224 C236,236 216,242 196,242 C174,242 160,236 140,234 C118,232 90,240 70,235 C54,231 48,220 50,206 C52,190 60,166 60,150 Z" fill="#12090b" />
            {/* Jaw */}
            <path d="M68,208 C90,212 120,214 144,214 C164,214 184,216 198,220 C210,224 218,232 220,240 C222,250 214,256 204,258 C188,260 160,258 138,256 C110,254 88,248 70,238 C58,232 56,220 68,208 Z" fill="#7a0d12" />
            {/* Teeth */}
            {[...Array(7)].map((_,i)=>{
              const x = 92 + i*16
              const y = 210 + (i%2===0?0:2)
              return <path key={i} d={`M${x},${y} l6,18 l-12,0 Z`} fill="url(#clawMetal)" stroke="#444" strokeWidth="0.5"/>
            })}
            {/* Eye */}
            <circle cx="182" cy="178" r="6" fill="url(#eyeGlow)" className="glow-strong" />

            {/* Horns */}
            <path d="M150,140 C152,120 166,98 190,86 C200,80 210,88 208,96 C204,112 192,124 182,136 C174,146 162,148 150,140 Z" fill="#2a2a2a" />
            <path d="M174,136 C178,116 198,94 222,86 C232,82 242,92 238,100 C230,116 212,126 198,136 C188,144 180,144 174,136 Z" fill="#2a2a2a" />

            {/* Claws (front) */}
            <g transform="translate(-40,250)">
              {[0,1,2].map((i)=>{
                const x = i*32
                return (
                  <g key={i} transform={`translate(${x},0)`}>
                    <path d="M0,0 L16,-18 L22,-12 L10,8 Z" fill="url(#clawMetal)" stroke="#555" strokeWidth="1" />
                    <path d="M10,8 C20,10 36,12 48,6 C60,0 62,-12 58,-20 C54,-28 46,-30 36,-26 C26,-22 12,-10 10,8 Z" fill="#1a0f12" />
                  </g>
                )
              })}
            </g>

            {/* FIRE - layered shapes with glow and wobble */}
            <g transform="translate(210,208) rotate(-2)">
              <g className="glow-soft" style={{ animation: 'flameFlicker 0.95s ease-in-out infinite' }}>
                <path d="M0,0 C20,-6 34,-12 48,-20 C70,-32 86,-48 98,-68 C108,-84 120,-100 140,-106 C162,-112 180,-98 178,-78 C176,-58 158,-44 146,-34 C122,-14 100,2 78,18 C62,30 44,44 38,58 C32,70 42,86 60,86 C82,86 108,76 130,66 C150,58 168,50 188,46 C198,44 214,46 220,56 C226,66 220,80 206,86 C170,104 126,116 88,118 C48,120 22,114 6,98 C-6,86 -8,66 -6,50 C-4,30 4,12 0,0 Z" fill="url(#fireCore)" filter="url(#fireBlur)"/>
                {/* smaller inner flame */}
                <path d="M10,4 C24,-2 40,-12 58,-26 C72,-38 86,-56 100,-60 C118,-66 128,-54 124,-40 C120,-26 98,-10 86,0 C70,12 56,24 46,40 C38,52 40,64 52,68 C70,74 96,66 120,56 C140,48 160,40 174,40 C184,40 190,48 186,56 C180,70 150,84 120,94 C92,102 64,106 42,102 C22,98 8,88 2,76 C-4,64 -2,50 2,38 C4,30 6,14 10,4 Z" fill="url(#fireCore)" filter="url(#heatWobble)" opacity="0.95"/>
              </g>
              {/* smoke wisps */}
              <g opacity="0.25" style={{ animation: 'smokeDrift 4.5s ease-in-out infinite' }}>
                <ellipse cx="160" cy="-40" rx="34" ry="18" fill="#d3d3d3" filter="url(#fireBlur)"/>
                <ellipse cx="210" cy="-56" rx="28" ry="14" fill="#cfcfcf" filter="url(#fireBlur)"/>
                <ellipse cx="240" cy="-72" rx="22" ry="12" fill="#d8d8d8" filter="url(#fireBlur)"/>
              </g>
            </g>
          </g>

        </svg>
      </div>
    </div>
  )
}

export default App
