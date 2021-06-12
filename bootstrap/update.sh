git reset --hard
git pull
composer install
php artisan migrate --force
rm -rf ./public
git clone https://gitee.com/zhuchunshu/CodeFec-Public.git public
echo "更新完成"