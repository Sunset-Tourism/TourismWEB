import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-bar">
      <div className="footer-inner">
        <span className="text-[11px] sm:text-inherit">
          © {new Date().getFullYear()} Bhutan Smart Tourism
        </span>
        <nav className="footer-links text-[11px] sm:text-inherit">
          <Link className="hover:underline underline-offset-4" href="/about">
            About Us
          </Link>
          <Link className="hover:underline underline-offset-4" href="#">
            <span className="sm:hidden">Privacy</span>
            <span className="hidden sm:inline">Privacy Policy</span>
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
