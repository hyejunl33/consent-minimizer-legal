# Legal pages for the Chrome Web Store listing

Static, self-contained pages. No build step, no external requests.

- `index.html` — links to both policies
- `privacy.html` — Korean policy
- `privacy-en.html` — English policy

## Publish with GitHub Pages

The extension repo is private, so these pages live in their own public repo.

```bash
cd legal-site
git init -b main
git add .
git commit -m "docs: privacy policy for Chrome Web Store listing"
gh repo create consent-minimizer-legal --public --source=. --push
gh api -X POST repos/hyejunl33/consent-minimizer-legal/pages \
  -f 'source[branch]=main' -f 'source[path]=/'
```

Pages takes about a minute to build. Then verify:

- https://hyejunl33.github.io/consent-minimizer-legal/privacy.html
- https://hyejunl33.github.io/consent-minimizer-legal/privacy-en.html

Use the Korean URL in the Korean listing and the English URL in the English
listing. Both must load before you submit.
