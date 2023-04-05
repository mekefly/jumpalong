@REM # set -e

# 构建
npm run build-only

# 进入输出产物文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' %3E CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://%3CUSERNAME>.github.io
git push -f git@github.com:jumpalong/jumpalong.github.io.git master

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:Wang9977/netease-cloud-games.git master:gh-pages

# cd -