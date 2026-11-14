import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, CalendarDays, Check, Heart, MapPin } from 'lucide-react';
import './App.css';
import TheaterScene from './components/TheaterScene';
import './reference-theme.css';

// Wedding information supplied by the couple.
const wedding = {
  groom: 'عمر', bride: 'مريم',
  date: '2026-12-02T19:00:00+02:00', // Reception begins at 7 PM Cairo time.
  year: 2026, month: 11, day: 2,
  venue: 'قاعة الملكة', address: '', mapsUrl: 'https://maps.app.goo.gl/K7qVyGUzbHDoA6TB9?g_st=ic',
};
const initials = `${wedding.groom[0]} و ${wedding.bride[0]}`;
const displayDate = new Intl.DateTimeFormat('ar-EG', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Cairo',
}).format(new Date(wedding.date));
const storageKey = 'wedding-rsvp-v1';
function readDraft() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey));
    return value && typeof value.name === 'string' && ['yes', 'no'].includes(value.attendance) ? value : null;
  } catch { return null; }
}
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
function RingBox({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  function open() {
    if (opening) return;
    setOpening(true);
    timer.current = setTimeout(onOpen, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2400);
  }
  return <main className={`cover ${opening ? 'opening' : ''}`}>
    <TheaterScene interactive /><div className="cover-frame" aria-hidden="true" />
    <header className="cover-top"><span>{initials}</span><span>٢ ديسمبر ٢٠٢٦</span></header>
    <div className="cover-copy"><p className="eyebrow">صندوق صغير… وحكاية حب تدوم</p><h1>حكايتنا تبدأ<br />بكلمة <em>نعم.</em></h1><p>وفرحتنا لا تكتمل إلا بوجودكم.</p></div>
    <button className="box-button" onClick={open} disabled={opening} aria-label="افتح صندوق الخاتم لعرض دعوة الزفاف">
      <span className="stage-tap-target" />
    </button>
    <div className="open-hint"><span className="hint-line" /><p>{opening ? 'بداية جميلة في انتظاركم…' : 'المس الصندوق لتفتح الدعوة'}</p><span className="hint-line" /></div>
    <footer className="cover-footer"><span>دعوة من القلب، لكم</span><Heart size={14} strokeWidth={1} /><span>بكل الحب</span></footer>
  </main>;
}
function RSVP() {
  const [draft, setDraft] = useState(readDraft);
  const [attendance, setAttendance] = useState(draft?.attendance || 'yes');
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name')).trim();
    if (!name) { setError('من فضلك اكتب اسمك.'); return; }
    const response = { name, attendance, guests: attendance === 'yes' ? Number(data.get('guests')) : 0, message: String(data.get('message')).trim(), savedAt: new Date().toISOString() };
    try { localStorage.setItem(storageKey, JSON.stringify(response)); setSaved(response); setDraft(response); setError(''); }
    catch { setError('تعذّر حفظ ردك في المتصفح. يرجى السماح بالتخزين المحلي والمحاولة مرة أخرى.'); }
  }
  return <section className="rsvp-section" id="rsvp"><div className="rsvp-intro"><p className="eyebrow">مكانكم في القلب قبل القاعة</p><h2>تشاركونا فرحة<br /><em>بداية حكايتنا؟</em></h2><p>أجمل أيامنا مع أغلى الناس.<br />وجودكم بيننا هو تمام فرحتنا.</p><Heart size={32} strokeWidth={1} /><p className="demo-note">ننتظركم في قاعة الملكة. من ٧ مساءً حتى ١١ مساءً.</p></div>
    <div className="rsvp-card">{saved ? <div className="success" role="status"><Check size={36} strokeWidth={1} /><h3>شكرًا لك، {saved.name}.</h3><p>{saved.attendance === 'yes' ? 'تم حفظ تأكيد حضورك ورسالتك على هذا الجهاز.' : 'تم حفظ ردك ورسالتك على هذا الجهاز.'}</p><p className="storage-note">هذه نسخة تجريبية، ولم يتم إرسال ردك إلى العروسين بعد.</p><button className="text-button" onClick={() => setSaved(null)}>تعديل ردي <ArrowUpRight size={16} /></button></div> : <form onSubmit={submit}><h3>تأكيد الحضور</h3><p className="form-subtitle">رد صغير منكم… وفرحة كبيرة لنا.</p><label htmlFor="guest-name">الاسم بالكامل</label><input id="guest-name" name="name" autoComplete="name" placeholder="اكتب اسمك هنا" required maxLength={100} defaultValue={draft?.name || ''} /><fieldset><legend>هل تشاركنا الفرحة؟</legend><div className="attendance"><button type="button" aria-pressed={attendance === 'yes'} className={attendance === 'yes' ? 'selected' : ''} onClick={() => setAttendance('yes')}><Heart size={15} /> بكل فرح، سأحضر</button><button type="button" aria-pressed={attendance === 'no'} className={attendance === 'no' ? 'selected' : ''} onClick={() => setAttendance('no')}>للأسف، أعتذر</button></div></fieldset>{attendance === 'yes' && <><label htmlFor="guests">عدد الحضور شاملًا أنت</label><select id="guests" name="guests" defaultValue={draft?.guests || 1}>{[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n.toLocaleString('ar-EG')} {n === 1 ? 'شخص' : 'أشخاص'}</option>)}</select></>}<label htmlFor="message">رسالة للعروسين <span>(اختياري)</span></label><textarea id="message" name="message" defaultValue={draft?.message || ''} rows="3" maxLength={2000} placeholder="اترك لنا دعوة حلوة، أمنية، أو ذكرى جميلة…" /><p className="storage-note">نسخة تجريبية: يُحفظ الرد في هذا المتصفح فقط، لحين تفعيل إرساله إلى العروسين.</p>{error && <p role="alert">{error}</p>}<button className="primary-button" type="submit">حفظ ردي <ArrowUpRight size={17} /></button></form>}</div></section>;
}
export default function App() {
  const [opened, setOpened] = useState(false);
  const invitation = useRef(null);
  useEffect(() => { if (opened) { window.scrollTo(0, 0); invitation.current?.focus(); } }, [opened]);
  if (!opened) return <RingBox onOpen={() => setOpened(true)} />;
  return <main className="invitation" ref={invitation} tabIndex={-1}><nav><a href="#home" className="nav-monogram">{initials}</a><div><a href="#details">تفاصيل الفرح</a><a href="#rsvp">تأكيد الحضور <ArrowUpRight size={14} /></a></div></nav><section className="hero" id="home"><TheaterScene /><div className="hero-arch" aria-hidden="true" /><p className="eyebrow">بكل الحب، وبمشاركة عائلتينا</p><p className="script-line">يسعدنا أن ندعوكم لحفل زفافنا</p><h1>{wedding.groom} <em>و</em> {wedding.bride}</h1><p className="eyebrow hero-subtitle">بداية حكايتنا</p><div className="date-line"><span>ديسمبر</span><strong>{wedding.day.toLocaleString('ar-EG')}</strong><span>{wedding.year.toLocaleString('ar-EG', { useGrouping: false })}</span></div><p className="hero-location">الأربعاء، ٢ ديسمبر ٢٠٢٦</p><a href="#details" className="discover">تفاصيل يومنا <ArrowDown size={17} /></a></section><section className="verse-card"><span aria-hidden="true">&#10022;</span><p>وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً</p></section><section className="countdown-section"><p className="eyebrow">كل لحظة تقرّبنا من أجمل يوم</p><h2>نعدّ الأيام <em>حتى نلتقي.</em></h2><Countdown /><WeddingCalendar /></section><section id="details" className="details"><div className="details-heading"><p className="eyebrow">تفاصيل الفرح</p><h2>يوم جميل.<br /><em>وبوجودكم أجمل.</em></h2><p>نحتفل بالحب، ونصنع معكم أجمل الذكريات.</p></div><div className="event-details"><article><CalendarDays size={24} strokeWidth={1} /><div><p className="eyebrow">الموعد</p><h3>{displayDate}</h3><p>من ٧ مساءً حتى ١١ مساءً</p></div></article><article><MapPin size={24} strokeWidth={1} /><div><p className="eyebrow">المكان</p><h3>{wedding.venue || "سنعلن المكان قريبًا"}</h3><p>{wedding.address || "ننتظركم بكل حب"}</p>{wedding.mapsUrl ? <a href={wedding.mapsUrl} target="_blank" rel="noopener noreferrer">افتح الموقع على خرائط جوجل <ArrowUpRight size={14} /></a> : <small>الموقع والاتجاهات قريبًا.</small>}</div></article></div></section><div className="love-note"><span>“</span><p>أجمل ما في حكايتنا<br />أنكم جزء منها.</p><Heart size={22} strokeWidth={1} /></div><RSVP /><footer className="footer"><p>{wedding.groom} <em>و</em> {wedding.bride}</p><span>٢ ديسمبر ٢٠٢٦ · وللعمر بقية معًا</span><button className="text-button" onClick={() => setOpened(false)}>افتح صندوق الحب من جديد <Heart size={13} /></button></footer></main>;
}
