"""Check local anchor links in the generated production HTML."""
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])


def verify(build, public):
    pages = {}
    for path in build.rglob('*.html'):
        route = '/' + path.relative_to(build).as_posix()[:-5]
        route = '/' if route == '/index' else route
        page = Page()
        page.feed(path.read_text())
        pages[route] = page
    if not pages:
        raise RuntimeError('No production HTML pages found')
    errors = set()
    for route, page in pages.items():
        for href in page.links:
            link = urlsplit(href)
            if link.scheme or link.netloc:
                continue
            if not link.path:
                target = route
            elif link.path.startswith('/'):
                target = unquote(link.path).rstrip('/') or '/'
            else:
                errors.add(f'{route}: unresolved relative link {href}')
                continue
            if target not in pages:
                asset = public / target.lstrip('/')
                if not asset.is_file() or public.resolve() not in asset.resolve().parents:
                    errors.add(f'{route}: missing route {href}')
            elif link.fragment and unquote(link.fragment) not in pages[target].ids:
                errors.add(f'{route}: missing fragment {href}')
    if errors:
        raise RuntimeError('\n'.join(sorted(errors)))
    return len(pages)


if __name__ == '__main__':
    root = Path(__file__).resolve().parents[1]
    try:
        count = verify(root / '.next/server/app', root / 'public')
    except (RuntimeError, ValueError) as error:
        print(error, file=sys.stderr)
        sys.exit(1)
    print(f'Local routes and fragment targets verified across {count} production HTML pages')
