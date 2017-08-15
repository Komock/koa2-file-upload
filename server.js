const fs = require('fs');

//====== Vendors
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Body = require('koa-better-body');
const KoaRouter = require('koa-router');
const Static = require('koa-static');
const Send = require('koa-send');
const Multer = require('koa-multer');
const AsyncBusboy = require('async-busboy');


const App = new Koa();
const Router = KoaRouter();
// Multer
const Storage = Multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/images/thumbs/');
	},
	filename: function (req, file, cb) {
		console.log(file);
		cb(null, file.originalname);
	}
});
const Upload = Multer({
	storage: Storage
});


//=== Body Parser 'koa-better-body'
App.use(Body());

//=== Read static
App.use(Static(__dirname + '/public/'));

Router.get('/', async (ctx, next) => {
	await Send(ctx, './public/index.html');
});


Router.post('/api/upload', async (ctx, next) => {
	console.log(ctx);
	console.log(ctx.request.body);
	// let dirIsEmpty = true;
	// await new Promise((res, rej)=> {
	// 	fs.readdir('uploads/images/thumbs/', function (err, items) {
	// 		if (items.length !== 0) dirIsEmpty = false;
	// 		if (err) console.error(err);
	// 		console.log(items, items.length);
	// 		console.log('dirIsEmpty', dirIsEmpty);
	// 		res();
	// 	});
	// });

	// if(!dirIsEmpty){
	// 	let msg = 'Dir already contain file!';
	// 	console.warn(msg);
	// 	ctx.body = msg;
	// 	return;
	// }
	
	// await new Promise((res, rej)=> {
	// 	Upload.single('fileInput')(ctx, (...args) => {
	// 		console.log(args);
	// 		res();
	// 	});
	// });


	ctx.response.body = 'Loaded!';
});


App.use(Router.routes()).use(Router.allowedMethods());


App.listen(3030);