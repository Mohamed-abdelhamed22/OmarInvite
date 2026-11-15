import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CalendarDays, Heart, MapPin } from 'lucide-react';
import './App.css';
import InvitationEntrance from './components/RoyalEntrance';
import GoldSprig from './components/GoldSprig';
import InvitationStars from './components/InvitationStars';
import BlessingCard from './components/BlessingCard';
import InvitationMusic from './components/InvitationMusic';
import './reference-theme.css';
import './entrance.css';
import './royal-theme.css';
import './living-invitation.css';

// Wedding information supplied by the couple.
const wedding = {
  groom: 'عمر', bride: 'مريم',
  date: '2026-12-02T19:00:00+02:00', // Reception begins at 7 PM Cairo time.
  year: 2026, month: 11, day: 2,
  venue: 'قاعة الملكة', address: '', mapsUrl: 'https://maps.app.goo.gl/K7qVyGUzbHDoA6TB9?g_st=ic',
};
const displayDate = new Intl.DateTimeFormat('ar-EG', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Cairo',
}).format(new Date(wedding.date));
function Countdown() {
  const [now, setNow] = useState(Date.now);
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  const remaining = Math.max(0, new Date(wedding.date).getTime() - now);
  return <div className="countdown">{[['يوم', Math.floor(remaining / 86400000)], ['ساعة', Math.floor(remaining / 3600000) % 24], ['دقيقة', Math.floor(remaining / 60000) % 60], ['ثانية', Math.floor(remaining / 1000) % 60]].map(([label, value]) => <div key={label}><strong>{value.toLocaleString('ar-EG', { minimumIntegerDigits: 2, useGrouping: false })}</strong><span>{label}</span></div>)}</div>;
}
function WeddingCalendar() {
  const firstWeekday = new Date(Date.UTC(wedding.year, wedding.month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(wedding.year, wedding.month + 1, 0)).getUTCDate();
  const monthLabel = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(wedding.year, wedding.month, 1)));
  return <div className="wedding-calendar" aria-label={`تقويم زفافنا: ${displayDate}`}>
    <div className="calendar-header"><span className="eyebrow">احفظوا التاريخ</span><h3>{monthLabel}</h3><span className="calendar-flourish" aria-hidden="true">&#10022;</span></div>
    <div className="calendar-grid">
      {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => <span className="calendar-weekday" key={day}>{day}</span>)}
      {Array.from({ length: firstWeekday }, (_, i) => <span key={`blank-${i}`} aria-hidden="true" />)}
      {Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        return <span key={day} className={`calendar-day ${day === wedding.day ? 'wedding-day' : ''}`} aria-label={day === wedding.day ? `${displayDate}, يوم زفافنا` : undefined}>
          {day === wedding.day && <Heart aria-hidden="true" className="calendar-heart" fill="currentColor" strokeWidth={1} />}<span>{day.toLocaleString('ar-EG')}</span>
        </span>;
      })}
    </div>
    <p className="calendar-caption"><Heart size={13} aria-hidden="true" /> يوم واحد… وبداية عمر كامل.</p>
  </div>;
}
export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useRef(null);
  const details = useRef(null);
  const [entranceHeight, setEntranceHeight] = useState(null);
  function revealDetails() {
    setEntranceHeight(document.getElementById('home').getBoundingClientRect().height);
    setOpened(true);
  }
  useEffect(() => {
    if (!opened) return;
    const cards = Array.from(details.current.children);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers = new Set();
    const show = card => {
      card.dataset.revealed = 'true';
      card.inert = false;
    };
    if (reducedMotion || !('IntersectionObserver' in window)) {
      cards.forEach(show);
      return;
    }
    cards.forEach(card => { card.inert = true; });
    const observer = new IntersectionObserver(entries => {
      let stagger = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const timer = setTimeout(() => {
          show(entry.target);
          timers.delete(timer);
        }, 180 + stagger++ * 260);
        timers.add(timer);
      });
    }, { threshold: 0, rootMargin: '0px 0px -28px 0px' });
    cards.forEach(card => observer.observe(card));
    // Reveal the first card softly below the stage; never move the visitor's scroll.
    const first = setTimeout(() => show(cards[0]), 350);
    timers.add(first);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [opened]);
  return <main className={`invitation seamless-invitation ${opened ? 'details-visible' : ''}`} style={entranceHeight ? { '--entrance-height': `${entranceHeight}px` } : undefined}>
    <InvitationStars />
    <InvitationMusic ref={music} />
    <InvitationEntrance opened={opened} onOpen={revealDetails} onStart={() => music.current?.start()} groom={wedding.groom} bride={wedding.bride} />
    <div id="invitation-details" className="invitation-details" hidden={!opened} ref={details} tabIndex={-1}>
      <section className="royal-name-card" aria-label="العروسان"><GoldSprig className="sprig-top" /><GoldSprig className="sprig-bottom" /><p className="eyebrow">بكل الحب ندعوكم لمشاركتنا فرحتنا</p><h2>{wedding.groom}<em>و</em>{wedding.bride}</h2><p>حفل زفافنا<br />الأربعاء، ٢ ديسمبر ٢٠٢٦</p></section>
<section className="verse-card"><span aria-hidden="true">&#10022;</span><p>وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً</p></section><section className="countdown-section"><p className="eyebrow">كل لحظة تقرّبنا من أجمل يوم</p><h2>نعدّ الأيام <em>حتى نلتقي.</em></h2><Countdown /><WeddingCalendar /></section><section id="details" className="details"><div className="details-heading"><p className="eyebrow">تفاصيل الفرح</p><h2>يوم جميل.<br /><em>وبوجودكم أجمل.</em></h2><p>نحتفل بالحب، ونصنع معكم أجمل الذكريات.</p></div><div className="event-details"><article><CalendarDays size={24} strokeWidth={1} /><div><p className="eyebrow">الموعد</p><h3>{displayDate}</h3><p>من ٧ مساءً حتى ١١ مساءً</p></div></article><article><MapPin size={24} strokeWidth={1} /><div><p className="eyebrow">المكان</p><h3>{wedding.venue || "سنعلن المكان قريبًا"}</h3><p>{wedding.address || "ننتظركم بكل حب"}</p>{wedding.mapsUrl ? <a href={wedding.mapsUrl} target="_blank" rel="noopener noreferrer">افتح الموقع على خرائط جوجل <ArrowUpRight size={14} /></a> : <small>الموقع والاتجاهات قريبًا.</small>}</div></article></div></section><div className="love-note"><span>“</span><p>أجمل ما في حكايتنا<br />أنكم جزء منها.</p><Heart size={22} strokeWidth={1} /></div><BlessingCard /><footer className="footer"><p>{wedding.groom} <em>و</em> {wedding.bride}</p><span>٢ ديسمبر ٢٠٢٦ · وللعمر بقية معًا</span><a className="text-button" href="#home">العودة إلى بداية حكايتنا <Heart size={13} /></a></footer>
    </div>
  </main>;
}
