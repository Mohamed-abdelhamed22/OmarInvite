import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Heart } from 'lucide-react';
import TheaterScene from './TheaterScene';

export default function InvitationEntrance({ opened, onOpen, groom, bride }) {
  const [shimmering, setShimmering] = useState(false);
  const timer = useRef(null);
  const clicked = useRef(false);
  useEffect(() => () => clearTimeout(timer.current), []);

  function reveal() {
    if (clicked.current || opened) return;
    clicked.current = true;
    setShimmering(true);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer.current = setTimeout(onOpen, reducedMotion ? 0 : 1750);
  }

  return <section id="home" className={`cover entrance ${shimmering ? 'is-shimmering' : ''} ${opened ? 'is-revealed' : ''}`} aria-label="دعوة زفاف عمر ومريم">
    <TheaterScene />
    <div className="cover-frame" aria-hidden="true" />
    <header className="cover-top"><span>دعوة من القلب</span><span>٢ ديسمبر ٢٠٢٦</span></header>
    <div className="cover-copy">
      <p className="eyebrow">بكل الحب، وبمشاركة عائلتينا</p>
      <p className="entrance-invite">يسعدنا أن ندعوكم لحفل زفافنا</p>
      <h1>{groom} <em>و</em> {bride}</h1>
      <p>وفرحتنا لا تكتمل إلا بوجودكم.</p>
    </div>
    <div className="ring-display">
      <div className="marble-pedestal" aria-hidden="true"><div className="pedestal-top" /><div className="pedestal-body" /></div>
      <button className="ring-image-button" type="button" onClick={reveal} disabled={shimmering || opened}
        aria-label="المس علبة الخاتم لإظهار تفاصيل الدعوة" aria-expanded={opened} aria-controls="invitation-details">
        <img className="real-ring-box" src="/assets/ring-box-real.png" alt="علبة خاتم مخمل نبيتي ببطانة عاجية وخاتم ألماس" width="1024" height="1024" fetchPriority="high" />
        <span className="ring-light" aria-hidden="true" />
        <span className="diamond-flare" aria-hidden="true">✦</span>
        <span className="diamond-flare flare-small" aria-hidden="true">✧</span>
      </button>
    </div>
    <div className="open-hint" role="status" aria-live="polite">
      <span className="hint-line" />
      <p>{opened ? 'أهلًا بكم في حكايتنا' : shimmering ? 'وبكم تكتمل الفرحة…' : 'المس الخاتم لتبدأ الحكاية'}</p>
      <span className="hint-line" />
    </div>
    {opened && <a href="#invitation-details" className="entrance-discover">تفاصيل فرحتنا <ArrowDown size={16} /></a>}
    <footer className="cover-footer"><span>من ٧ إلى ١١ مساءً</span><Heart size={14} strokeWidth={1} /><span>قاعة الملكة</span></footer>
  </section>;
}
