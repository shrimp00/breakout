const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const port = 3000;

app.use(
	fileUpload({ // use express-fileupload middleware
		limits: { // limits upload file size to ~10MB
			fileSize: 10000000,
		},
		abortOnLimit: true,
	})
);

app.use(express.static('public')); // serve index.html

app.get('/', (req, res) => { // hello world in root dir
	res.send('hii world :3');
});

app.post('/upload', (req, res) => { // handles image upload

	const { image } = req.files; // get file from 'image' field

	if(!image) return res.sendStatus(400); // if no file exit
	if(/^image/.test(image.mimetype)) return res.sendStatus(400); // if does not have image mime type dont upload

	image.mv(__dirname + '/upload/' + image.name); // move file to upload dir

	res.sendStatus(200); // all works

});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});


/*

npm init
^ change index.js to app.js !! ( though it seems to work without this as well ..? )
npm install express
npm install express-fileupload

"
Malicious users can try to upload an image named ‘…/index.js’ but express-fileupload will automatically strip those dots and the file will still end up in the correct folder.
"

*/