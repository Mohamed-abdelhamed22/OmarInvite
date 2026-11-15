import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Heart, Sparkles } from 'lucide-react';

export default function RoyalEntrance({ opened, onOpen, groom, bride }) {
  const [opening, setOpening] = useState(false);
  const timer = useRef(null);
  const clicked = useRef(false);
  useEffect(() => () => clearTimeout(timer.current), []);
  function reveal() {
    if (clicked.current || opened) return;
    clicked.current = true;
    setOpening(true);
    timer.current = setTimeout(onOpen, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 4500);
  }
  return <section id="home" className={`cover entrance royal-entrance ${opening ? 'is-opening' : ''} ${opened ? 'is-revealed' : ''}`} aria-label="دعوة لحفل زفاف عمر ومريم">
    <div className="royal-curtains" aria-hidden="true"><span className="curtain-top" /><span className="curtain-bottom" /></div>
    <div className="royal-dust" aria-hidden="true">{Array.from({length:15},(_,i)=><i key={i} style={{'--x':`${12+i*37%77}%`,'--y':`${12+i*19%75}%`,'--delay':`${i*-.63}s`}} />)}</div>
    <div className="cover-frame" aria-hidden="true" />
    <header className="cover-top"><span>دعوة من القلب <Heart size={12} fill="currentColor" /></span><span>٢ ديسمبر ٢٠٢٦</span></header>
    <div className="royal-title">
      <p className="royal-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      <p className="eyebrow">بكل الحب، وبمشاركة عائلتينا</p>
      <p className="royal-invite">نتشرّف بدعوتكم لحفل زفاف</p>
      <h1>{groom} <em>و</em> {bride}</h1>
      <p className="royal-tagline">وبوجودكم تكتمل فرحتنا</p>
      <div className="royal-date"><span>الأربعاء</span><strong>٢</strong><span>ديسمبر ٢٠٢٦</span></div>
    </div>
    <div className="royal-action" role="status" aria-live="polite">
      {opened ? <a className="royal-open-button" href="#invitation-details">تفاصيل فرحتنا <ArrowDown size={15} /></a> : <button className="royal-open-button" type="button" onClick={reveal} disabled={opening} aria-controls="invitation-details" aria-expanded={false}>{opening ? 'تبدأ حكايتنا…' : 'افتح الدعوة'}<Sparkles size={15} strokeWidth={1} /></button>}
    </div>
    <footer className="cover-footer"><span>قاعة الملكة</span><Heart size={14} strokeWidth={1} /><span>من ٧ إلى ١١ مساءً</span></footer>
  </section>;
}
