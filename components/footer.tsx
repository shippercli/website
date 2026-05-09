export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Shipper. Open source under MIT.
      </div>
    </footer>
  );
}