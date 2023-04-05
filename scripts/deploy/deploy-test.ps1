
npm run build-only

cd dist


git init 
git add -A
git commit -m 'deploy'

git branch -M main
# git pull  git@github.com:jumpalong/jumpalong.github.io.git main
git push -f -u git@github.com:jumpalong/test.git main

cd ..
