#!/usr/bin/env node

var argv = require('optimist')
	.usage("Usage: $0 --apis [filename] --info [filename]")
	.demand([ 'apis', 'info' ])
	.describe('apis', 'File containing API JSON.')
	.describe('info', 'File containing info JSON.')
	.alias('output', 'o')
	.describe('output', 'Output file')
	.describe('minify', "Minify HTML output")
	.alias('minify', 'm')
	.default('minify', true)
	.argv;

var fs = require('fs');

var ejs = require('ejs');

var min_html = require('html-minifier');
var min_css  = require('sqwish');
var min_js   = require("uglify-js");

var templates = {

	index:    fs.readFileSync(__dirname + '/template/index.ejs').toString(),
	rest:     fs.readFileSync(__dirname + '/template/rest.ejs').toString(),
	function: fs.readFileSync(__dirname + '/template/function.ejs').toString()
	
}

var checkFile = function(file) {
	if(!fs.existsSync(file)) {
		console.error(file + " doesn't exist!");
		process.exit(1);
	}
}

checkFile(argv.apis);
checkFile(argv.info);

if(!argv.output) {
	var filename = argv.apis.split('.');
	filename.pop();
	argv.output = filename.join('.') + '.html';
}

var info;
var apis;

try {

	info = JSON.parse(fs.readFileSync(argv.info).toString());
	apis = JSON.parse(fs.readFileSync(argv.apis).toString());

} catch(e) {

	console.error("One of the specified files is not valid JSON... exiting");
	console.log(e);	
	process.exit(1);

}

if(apis.length == 0) {

	console.error("No specified APIs, exiting.");
	process.exit(1);

}

// inline logo image

if(info.logo) {

	var logo = fs.readFileSync(info.logo);

    var data_uri_prefix = "data:image/png;base64,";
    var image = data_uri_prefix + new Buffer(logo, 'binary').toString('base64'); 

    info.logo = image;

}

var _apis = [];

for(var i = 0; i < apis.length; i++) {

	var api = apis[i];

	api.index = i;

	var type = api.type;

	var _html = ejs.render(templates[type], {
		api: api
	});

	_apis.push(_html);

}

var index_html = ejs.render(templates['index'], {
	info: info,
	apis: _apis
});

console.log("Rendered " + argv.output);

var js_files = [
	'jquery.js',
	'meny.min.js',
	'bootstrap.js'
]

var css_files = [
	'bootstrap.css',
	'bootstrap-responsive.css',
	'meny.css',
	'style.css'
]

css_files.forEach(function(file) {
	var data = fs.readFileSync(__dirname + '/template/files/' + file).toString();
	if(argv.minify) {
		console.log("Compressing " + file);
		data = min_css.minify(data);
	}
	console.log("Merging " + file + "...");
	data = "<style>" + data + "</style>";
	index_html = index_html.replace("<head>", "<head>" + data);
});

for(var i = js_files.length - 1; i >= 0; i--) { //reverse include js files

	var file = js_files[i];
	var data = fs.readFileSync(__dirname + '/template/files/' + file).toString();
	if(argv.minify) {
		console.log("Minifying " + file);
		data = min_js.minify(data, { fromString: true }).code;
	}
	console.log("Merging " + file + "...");
	data = "<script>" + data + "</script>";
	index_html = index_html.replace("<head>", "<head>" + data);

}

if(argv.minify) {
	console.log("Cleaning HTML....");
	index_html = min_html.minify(index_html, {
	 removeComments: true,
	 removeCommentsFromCDATA: true,
	 collapseWhitespace: true,
	 collapseBooleanAttributes: true,
	 removeAttributeQuotes: true,
	 removeEmptyAttributes: true
	});
}

fs.writeFileSync(argv.output, index_html);

console.log("Merged files, finished.");
