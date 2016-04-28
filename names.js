var swig  = require('swig');

var locals = {
	description: 'This is a bare-bones template.',
	title: 'An Example',
	people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};

swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
    console.log(output);
});
