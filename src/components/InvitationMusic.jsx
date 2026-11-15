import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const InvitationMusic = forwardRef(function InvitationMusic(_, ref) {
  const audio = useRef(null);
  const [activated, setActivated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [notice, setNotice] = useState('');

  function play() {
    const player = audio.current;
    if (!player) return;
    player.volume = .5;
    setNotice('');
    // Called directly by the opening click, preserving browser user activation.
    player.play()?.catch(() => {
      setPlaying(false);
      setNotice('اضغط على زر الصوت لتشغيل الموسيقى');
    });
  }
  useImperativeHandle(ref, () => ({ start() { setActivated(true); play(); } }));
  useEffect(() => {
    const player = audio.current;
    return () => player?.pause();
  }, []);

  return <>
    <audio ref={audio} className="invitation-audio" preload="auto" loop onPlaying={() => { setPlaying(true); setNotice(''); }} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setNotice('تعذّر تشغيل الموسيقى. اضغط على زر الصوت للمحاولة مجددًا.'); }}>
      <source src="/assets/audio/wedding-song.mp3" type="audio/mpeg" />
    </audio>
    {activated && <div className="music-control-wrap">
      <button type="button" className={`music-control ${playing ? 'is-playing' : ''}`} aria-label={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'} aria-pressed={playing} title={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'} onClick={() => { if (audio.current?.paused) play(); else audio.current?.pause(); }}>
        {playing ? <Volume2 size={19} strokeWidth={1.5} /> : <VolumeX size={19} strokeWidth={1.5} />}
      </button>
      <span className="music-status" role="status" aria-live="polite">{notice}</span>
    </div>}
  </>;
});
export default InvitationMusic;
