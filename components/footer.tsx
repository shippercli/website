export default function Footer() {
  return (
    <footer
      className="border-t py-10 backdrop-blur-md"
      style={{
        borderColor: "var(--border)",
        background: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} Shipper. Open source under MIT.
        </p>
      </div>
    </footer>
  );
}