
npm run build-only

cd dist

git add -A
git commit -m 'deploy'

git branch -M main
git pull  git@github.com:jumpalong/jumpalong.github.io.git main
git push -f git@github.com:jumpalong/jumpalong.github.io.git main
