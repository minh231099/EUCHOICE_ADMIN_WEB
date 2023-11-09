echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r -P 19668 build/* root@103.175.147.216:/var/www/EUCHOICE_ADMIN_WEB/

echo "Done!"