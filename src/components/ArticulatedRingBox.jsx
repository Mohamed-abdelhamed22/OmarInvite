// Both states share the same stationary base and the same hinged lid.
// The closed photo supplies only velvet texture on the outside of that lid.
export default function ArticulatedRingBox() {
  return <span className="articulated-box" aria-hidden="true">
    <span className="box-halo" />
    <span className="box-cavity" />
    <img className="box-interior" src="/assets/ring-box-real.png" alt="" width="1280" height="1280" fetchPriority="high" />
    <img className="box-fixed-front" src="/assets/ring-box-closed.png" alt="" width="1280" height="1280" />
    <span className="box-hinged-lid">
      <span className="lid-face lid-satin"><img src="/assets/ring-box-real.png" alt="" width="1280" height="1280" /></span>
      <span className="lid-face lid-velvet"><img src="/assets/ring-box-closed.png" alt="" width="1280" height="1280" /></span>
    </span>
  </span>;
}
