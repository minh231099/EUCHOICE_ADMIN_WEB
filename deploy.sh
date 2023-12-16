echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r -P 26266 build/* root@103.74.123.191:/var/www/EUCHOICE_ADMIN_WEB/

echo "Done!"