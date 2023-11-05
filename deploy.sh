echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* root@178.128.28.105:/var/www/EU_CHOICE_ADMIN_APP/

echo "Done!"