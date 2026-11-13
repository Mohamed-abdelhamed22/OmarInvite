export default function JewelryBox() {
  return <svg className="jewelry-illustration" viewBox="0 0 440 350" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="velvet" x1="100" y1="80" x2="350" y2="270" gradientUnits="userSpaceOnUse"><stop stopColor="#965967"/><stop offset=".38" stopColor="#6B2F42"/><stop offset="1" stopColor="#321321"/></linearGradient>
      <linearGradient id="front" x1="98" y1="220" x2="342" y2="310" gradientUnits="userSpaceOnUse"><stop stopColor="#71364A"/><stop offset=".5" stopColor="#471B2D"/><stop offset="1" stopColor="#2C101E"/></linearGradient>
      <linearGradient id="gold" x1="150" y1="100" x2="290" y2="270" gradientUnits="userSpaceOnUse"><stop stopColor="#A77A42"/><stop offset=".3" stopColor="#FAE3AE"/><stop offset=".6" stopColor="#BD945B"/><stop offset="1" stopColor="#EACD94"/></linearGradient>
      <radialGradient id="lining"><stop stopColor="#643447"/><stop offset="1" stopColor="#1C0D19"/></radialGradient>
      <linearGradient id="gem"><stop stopColor="white"/><stop offset=".45" stopColor="#BCD5E0"/><stop offset=".6" stopColor="white"/><stop offset="1" stopColor="#9AB1C5"/></linearGradient>
      <filter id="shadow"><feGaussianBlur stdDeviation="10"/></filter>
    </defs>
    <ellipse cx="220" cy="307" rx="134" ry="15" fill="#130711" opacity=".5" filter="url(#shadow)"/>
    <path d="M94 204Q94 189 110 185L306 165Q321 164 333 174L351 207L350 266Q349 279 335 284L145 312Q131 314 120 303L96 279Z" fill="url(#front)" stroke="#A66F77" strokeOpacity=".45"/>
    <path d="M96 218L135 251Q141 256 151 254L349 222" stroke="#BB8E71" strokeOpacity=".5"/>
    <path d="M103 267L133 296Q139 302 148 300L338 273" stroke="#2B1020" strokeWidth="3"/>
    <path d="M95 199Q95 190 110 185L303 159Q314 157 324 166L349 196Q360 210 343 218L151 248Q139 250 130 242L100 216Q92 209 95 199Z" fill="url(#velvet)" stroke="url(#gold)" strokeOpacity=".5"/>
    <path d="M110 201L306 174L335 203L145 233Z" fill="url(#lining)" stroke="#9F6575"/>
    <path d="M145 223L313 198" stroke="#140A13" strokeWidth="5" strokeLinecap="round"/>
    <g className="jewel-ring">
      <ellipse cx="225" cy="189" rx="19" ry="28" transform="rotate(18 225 189)" stroke="#8C5C28" strokeWidth="8"/>
      <ellipse cx="225" cy="188" rx="19" ry="28" transform="rotate(18 225 188)" stroke="url(#gold)" strokeWidth="5"/>
      <path d="M216 155L219 142L238 140L246 151L229 173Z" fill="url(#gem)" stroke="#FBEDCE"/>
      <path d="M219 142L227 151L238 140M216 155L227 151L229 173L236 151L246 151M227 151H236" stroke="white" strokeOpacity=".8"/>
      <path className="jewel-glint" d="M252 128V146M243 137H261M250 135L254 139M254 135L250 139" stroke="#FFF6DC" strokeLinecap="round"/>
    </g>
    <g className="jewelry-lid">
      <path d="M89 191L89 178Q89 167 102 164L302 136Q313 135 321 144L352 176L352 189Q352 200 339 203L147 231Q135 233 126 225L94 202Q89 198 89 191Z" fill="#351423" stroke="#AB7883" strokeOpacity=".5"/>
      <path d="M89 178Q89 168 102 164L302 136Q313 135 321 144L349 172Q359 184 343 189L147 218Q137 220 128 213L96 189Q89 184 89 178Z" fill="url(#velvet)" stroke="#B8858C"/>
      <path d="M106 179L306 151L333 178L142 205Z" stroke="url(#gold)" strokeWidth=".9"/>
      <path d="M115 180L303 155L325 176L143 201Z" stroke="#D4AC75" strokeOpacity=".3" strokeWidth=".6"/>
      <text x="222" y="183" textAnchor="middle" fill="url(#gold)" fontFamily="Aref Ruqaa, serif" fontSize="25" transform="rotate(-8 222 176)">عمر ومريم</text>
    </g>
    <rect x="232" y="247" width="23" height="15" rx="4" transform="rotate(-8 232 247)" fill="url(#gold)"/>
    <path d="M241 251L242 257" stroke="#704529" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}
