echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* shanta@172.105.117.44:/var/www/172.105.117.44/

echo "Done!"