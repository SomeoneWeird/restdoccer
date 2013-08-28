var argv = require('optimist')
	.usage("Usage: $0 --file [filename]")
	.demand([ 'file' ])
	.alias('file', 'f')
	.describe('file', 'File containing REST documentation JSON')
	.argv;

var fs = require('fs');

var ejs = require('ejs');

var index_template = fs.readFileSync('template/index.ejs').toString();

if(!fs.existsSync(argv.file)) {

	console.error(argv.file + " doesn't exist!");
	process.exit();

}

var doc_json;

try {

	doc_json = JSON.parse(fs.readFileSync(argv.file).toString());	

} catch(e) {

	console.error(argv.file + " is not valid JSON... exiting");
	process.exit();

}

if(!fs.existsSync('output')) {

	fs.mkdirSync('output');

	console.log("Created directory output...");

}

var index_html = ejs.render(index_template, doc_json);

console.log("Generated index.html, merging files.");

// js_files is in reverse order

var js_files = [
	'bootstrap.js',
	'jquery.js'
]

var css_files = [
	'bootstrap.css',
	'bootstrap-responsive.css',
	'style.css'
]

css_files.forEach(function(file) {
	var file = fs.readFileSync('template/files/' + file).toString();
	data = "<style>" + file + "</style>";
	index_html = index_html.replace("<head>", "<head>" + data);
});

js_files.forEach(function(file) {
	var file = fs.readFileSync('template/files/' + file).toString();
	data = "<script>" + file + "</script>";
	index_html = index_html.replace("<head>", "<head>" + data);
});


fs.writeFileSync('output/index.html', index_html);

console.log("Merged files, finished.");
