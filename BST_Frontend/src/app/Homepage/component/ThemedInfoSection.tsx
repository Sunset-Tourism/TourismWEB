import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ThemedInfoSection() {
  return (
    <section className="themed-info-section">
      <div className="themed-info-card">
        <div className="themed-info-img-wrapper">
          <Image
            src="/adventure2.png"
            alt="adventure"
            fill
            className="themed-info-img"
            priority
          />
        </div>
        <div className="themed-info-title">
          adventure <ArrowRight strokeWidth={2.2} />
        </div>
        <div className="themed-info-desc">
          Discover thrilling adventures in Bhutan's breathtaking landscapes,
          from high mountain treks to white-water rafting. Experience the spirit
          of adventure in a land of natural wonders.
        </div>
      </div>
      <div className="themed-info-card culture">
        <div className="themed-info-img-wrapper">
          <Image
            src="/culture.png"
            alt="culture"
            fill
            className="themed-info-img"
            priority
          />
        </div>
        <div className="themed-info-title">
          culture <ArrowRight strokeWidth={2.2} />
        </div>
        <div className="themed-info-desc">
          Immerse yourself in Bhutan's vibrant culture, where ancient traditions
          blend with daily life. Festivals, music, and art create a unique and
          welcoming atmosphere for all visitors.
        </div>
      </div>
      <div className="themed-info-card sustainability">
        <div className="themed-info-img-wrapper">
          <Image
            src="/wellness.png"
            alt="wellness"
            fill
            className="themed-info-img"
            priority
          />
        </div>
        <div className="themed-info-title">
          wellness <ArrowRight strokeWidth={2.2} />
        </div>
        <div className="themed-info-desc">
          Bhutan is a global leader in wellness and sustainability, offering
          eco-friendly travel and holistic experiences that nurture both body
          and spirit in harmony with nature.
        </div>
      </div>
    </section>
  );
}
