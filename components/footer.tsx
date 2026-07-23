export default function Footer() {
  return (
    <footer
      className="border-t py-10 backdrop-blur-md"
      style={{
        borderColor: "var(--border)",
        background: "var(--footer-surface)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} Shipper. Open source under MIT. Built with ❤️ by{" "}
          <a
            href="https://ulties.com"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Ulties
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
