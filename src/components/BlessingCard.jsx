import { Heart, Sparkles } from 'lucide-react';
import GoldSprig from './GoldSprig';

export default function BlessingCard() {
  return <section className="blessing-card" aria-labelledby="blessing-title">
    <GoldSprig className="sprig-top" /><GoldSprig className="sprig-bottom" />
    <Sparkles size={24} strokeWidth={1} className="blessing-ornament" aria-hidden="true" />
    <p className="eyebrow">دعوة حلوة من القلب</p>
    <h2 id="blessing-title">وبالحبّ <em>تبدأ حكايتنا</em></h2>
    <div className="blessing-divider" aria-hidden="true"><span /><Heart size={15} strokeWidth={1} /><span /></div>
    <p className="blessing-prayer">اللَّهُمَّ بَارِكْ لَنَا، وَبَارِكْ عَلَيْنَا،<br />وَاجْمَعْ بَيْنَنَا فِي خَيْرٍ</p>
    <p className="blessing-note">دعواتكم لنا بالسعادة أجمل هدية،<br />ووجودكم بيننا تمام فرحتنا.</p>
    <p className="blessing-signature">عمر <span>و</span> مريم</p>
  </section>;
}
