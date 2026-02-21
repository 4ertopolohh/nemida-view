# Nemida Studio Beta 2

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

`npm run build` also creates `dist/404.html` from `dist/index.html` so React Router works on GitHub Pages refresh/direct links.

## Deploy to GitHub Pages

Repository: `https://github.com/4ertopolohh/nemida-view`
Site URL: `https://4ertopolohh.github.io/nemida-view/`

1. Initialize git and connect remote (if this folder is not a git repo yet):
```bash
git init
git branch -M main
git remote add origin https://github.com/4ertopolohh/nemida-view.git
```
2. Push source branch:
```bash
git add .
git commit -m "Initial project setup"
git push -u origin main
```
3. Publish static build to `gh-pages` branch:
```bash
npm run deploy
```
4. In GitHub: `Settings -> Pages -> Build and deployment -> Deploy from a branch`, branch `gh-pages`, folder `/(root)`.
