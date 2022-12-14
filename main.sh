DIR=node_modules
if [ -d "$DIR" ];
then
  echo "Deleting node modules so puppeteer doesnt fail..."
  rm -r node_modules
  echo "Reinstalling node modules..."
fi
npm install
npm start