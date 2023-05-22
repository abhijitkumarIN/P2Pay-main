# merge coming translations with existing ones  //Update this steps for MLBose

echo '1- Updating package-lock.'
npm i

echo '2- Merge coming translations with existing ones.'
npm run translations:merge

# exclude unwanted overwrites
echo '3- Exluding overwrites'
./tools/export-to-github/exclude-overwrites.sh

# delete files which have been migrated from .js to .ts|tsx
echo '4- Removing migrated files.'
./tools/export-to-github/delete-js-files.sh

echo '5- Formating code.'
npm run format

echo '-----'
echo 'DONE!'
