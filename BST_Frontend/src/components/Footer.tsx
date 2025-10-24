import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-bar">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} Bhutan Smart Tourism</span>
        <nav className="footer-links">
          <Link className="hover:underline underline-offset-4" href="/about">
            About Us
          </Link>
          <Link className="hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="hover:underline underline-offset-4" href="#">
            Terms
          </Link>
          <Link className="hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
