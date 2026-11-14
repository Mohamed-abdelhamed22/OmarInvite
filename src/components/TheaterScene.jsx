import JewelryBox from './JewelryBox';

export default function TheaterScene({ interactive = false }) {
  return <div className={`theater-scene ${interactive ? 'scene-interactive' : ''}`} aria-hidden="true">
    <div className="stage-spotlight" />
    <div className="stage-curtain curtain-right" />
    <div className="stage-curtain curtain-left" />
    <div className="stage-particles">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ '--x': `${12 + (i * 37 % 77)}%`, '--y': `${8 + (i * 23 % 72)}%`, '--delay': `${i * -.37}s`, '--size': `${i % 3 + 1}px` }} />)}</div>
    <div className="stage-floor" />
    <div className="marble-pedestal"><div className="pedestal-top" /><div className="pedestal-body" /></div>
    <div className="stage-jewelry"><JewelryBox /></div>
    <div className="rose-garden">{Array.from({ length: 23 }, (_, i) => <span className="stage-rose" key={i} style={{ '--rose-x': `${i * 4.6 - 1}%`, '--rose-y': `${i * 17 % 39}px`, '--rose-rotation': `${i * 47}deg`, '--rose-size': `${25 + i * 13 % 27}px` }}><i /><b /></span>)}</div>
    <div className="falling-petals">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--x': `${15 + i * 11}%`, '--delay': `${i * -1.8}s` }} />)}</div>
  </div>;
}
