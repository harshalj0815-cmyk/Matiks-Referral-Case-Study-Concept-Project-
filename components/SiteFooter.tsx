import "./SiteFooter.css";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harshaljadhav15/" },
  { label: "X", href: "https://x.com/Har5hal_" },
  { label: "Medium", href: "https://medium.com/@harshalj0815" },
];

/** Thanks footer: looping video background, centered card, social chips + contact CTA. */
export default function SiteFooter() {
  return (
    <footer className="sf-footer">
      <video
        className="sf-footer__video"
        poster="/footer/footer-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/footer/footer-video.mp4" type="video/mp4" />
      </video>
      <div className="sf-footer__shade" aria-hidden="true" />

      <div className="sf-card">
        <h2 className="sf-card__title">Thanks For Reading</h2>
        <ul className="sf-row">
          {links.map((link) => (
            <li key={link.label}>
              <a
                className="sf-chip"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a className="sf-cta" href="mailto:harshalj1508@gmail.com">
              Contact me
            </a>
          </li>
          <li>
            {/* No live portfolio link yet — kept as a static button. */}
            <button
              type="button"
              className="sf-cta sf-cta--static"
              disabled
              aria-disabled="true"
              title="Portfolio coming soon"
            >
              Portfolio
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
