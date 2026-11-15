export default function InvitationStars() {
  return <div className="invitation-sky" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <span key={i} style={{ '--x': `${4 + i * 37 % 92}%`, '--drift': `${(i % 2 ? 1 : -1) * (12 + i * 7 % 35)}px`, '--delay': `${-(i * .71)}s`, '--size': `${3 + i * 5 % 6}px`, '--duration': `${7 + i % 5 * .8}s` }}><svg viewBox="0 0 24 24"><path d="M12 0 15 9 24 12 15 15 12 24 9 15 0 12 9 9Z" fill="currentColor" /></svg></span>)}</div>;
}
