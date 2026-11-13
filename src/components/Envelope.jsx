import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Envelope.css";

const ASSET = "/assets/envelope";

export default function Envelope({ onOpen }) {
  const screenRef = useRef(null);
  const sceneRef = useRef(null);
  const flapRef = useRef(null);
  const sealRef = useRef(null);
  const letterRef = useRef(null);
  const timelineRef = useRef(null);
  const openingRef = useRef(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sceneRef.current,
        { opacity: 0, y: 35, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 1.25, ease: "power3.out" });
    }, screenRef);
    return () => {
      timelineRef.current?.kill();
      ctx.revert();
    };
  }, []);

  const openInvitation = () => {
    if (openingRef.current) return;
    openingRef.current = true;
    setOpening(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onOpen?.();
      return;
    }

    const timeline = gsap.timeline({ onComplete: () => onOpen?.() });
    timelineRef.current = timeline;
    timeline
      .to(sealRef.current, { scale: 0.65, opacity: 0, duration: 0.35, ease: "power2.in" })
      .to(flapRef.current, { rotationX: 178, duration: 0.85, ease: "power2.inOut" }, "-=0.05")
      .set(flapRef.current, { zIndex: 1 })
      .to(letterRef.current, { y: "-78%", duration: 1.12, ease: "power3.out" }, "+=0.12")
      .to(letterRef.current, { scale: 1.055, duration: 0.3, ease: "power2.out" }, "-=0.25")
      .to(screenRef.current, { opacity: 0, duration: 0.68, ease: "power2.inOut" }, "+=0.3");
  };

  return (
    <section className="photo-envelope-screen" ref={screenRef}>
      <div className="photo-envelope-header">
        <p>A CELEBRATION OF LOVE</p>
        <h1>You're Invited</h1>
        <span>A beautiful beginning awaits</span>
      </div>
      <button
        className="photo-envelope-scene"
        ref={sceneRef}
        type="button"
        aria-label="Open wedding invitation"
        disabled={opening}
        onClick={openInvitation}
      >
        <img className="pe-back" src={`${ASSET}/env-back.png`} alt="" draggable="false" />
        <div className="pe-letter" ref={letterRef}>
          <img src={`${ASSET}/letter.png`} alt="" draggable="false" />
          <div className="pe-letter-text">
            <small>THE WEDDING OF</small>
            <strong>Ahmed <em>&amp;</em> Sara</strong>
            <small>15 JUNE 2027</small>
          </div>
        </div>
        <img className="pe-flap" ref={flapRef} src={`${ASSET}/env-flap.png`} alt="" draggable="false" />
        <img className="pe-front" src={`${ASSET}/env-front.png`} alt="" draggable="false" />
        <img className="pe-seal" ref={sealRef} src={`${ASSET}/seal.png`} alt="" draggable="false" />
      </button>
      <p className="photo-envelope-hint">{opening ? "UNFOLDING YOUR INVITATION" : "TAP THE SEAL TO OPEN"}</p>
      <div className="photo-envelope-ornament">— ✦ —</div>
    </section>
  );
}
