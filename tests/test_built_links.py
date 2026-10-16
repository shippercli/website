import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('built_links', Path(__file__).parents[1] / 'scripts/verify-built-links.py')
verifier = importlib.util.module_from_spec(spec)
spec.loader.exec_module(verifier)


class BuiltLinksTest(unittest.TestCase):
    def check(self, html, expected=None):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            build = root / 'build'
            public = root / 'public'
            build.mkdir()
            public.mkdir()
            (build / 'index.html').write_text(html)
            (build / 'docs.html').write_text('<h1 id="Overview">Docs</h1>')
            (public / 'download.txt').write_text('fixture')
            if expected:
                with self.assertRaisesRegex(RuntimeError, expected):
                    verifier.verify(build, public)
            else:
                self.assertEqual(verifier.verify(build, public), 2)

    def test_valid_routes_fragments_assets_and_external_links(self):
        self.check('<a href="/docs?view=full#Overview">Docs</a><a href="/download.txt">File</a><a href="https://example.com/absent">External</a>')

    def test_missing_route(self):
        self.check('<a href="/absent">Missing</a>', 'missing route')

    def test_missing_fragment(self):
        self.check('<a href="/docs#absent">Missing</a>', 'missing fragment')

    def test_unresolved_markdown_link(self):
        self.check('<a href="DOCS.md">Missing</a>', 'unresolved relative link')

    def test_empty_build_is_not_success(self):
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaisesRegex(RuntimeError, 'No production HTML'):
                verifier.verify(Path(directory), Path(directory))


if __name__ == '__main__':
    unittest.main()
