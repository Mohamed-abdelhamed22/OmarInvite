import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Heart } from 'lucide-react';
import TheaterScene from './TheaterScene';
import ArticulatedRingBox from './ArticulatedRingBox';

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
    timer.current = setTimeout(onOpen, reducedMotion ? 0 : 2900);
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
        aria-label="دوس على الخاتم لفتح العلبة وإظهار تفاصيل الدعوة" aria-expanded={opened} aria-controls="invitation-details">
        <ArticulatedRingBox />
        <span className="ring-light" aria-hidden="true" />
        <span className="diamond-flare" aria-hidden="true">✦</span>
        <span className="diamond-flare flare-small" aria-hidden="true">✧</span>
      </button>
    </div>
    <div className="open-hint" role="status" aria-live="polite">
      <span className="hint-line" />
      {shimmering || opened ? <p>{opened ? 'أهلًا بكم في حكايتنا' : 'نفتح لكم حكايتنا…'}</p> : <button className="hint-action" type="button" onClick={reveal} aria-controls="invitation-details" aria-expanded={false}>دوس على الخاتم <span aria-hidden="true">✦</span></button>}
      <span className="hint-line" />
    </div>
    {opened && <a href="#invitation-details" className="entrance-discover">تفاصيل فرحتنا <ArrowDown size={16} /></a>}
    <footer className="cover-footer"><span>من ٧ إلى ١١ مساءً</span><Heart size={14} strokeWidth={1} /><span>قاعة الملكة</span></footer>
  </section>;
}
