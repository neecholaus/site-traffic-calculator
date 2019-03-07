const fs = require('fs');
const results = JSON.parse(fs.readFileSync('./results.json'));

let _dict = {};

results.forEach(item => {
	// Grab count and url
	let _data = item.split(',');
	const [count, url] = _data;

	let splitUrl = url.split('.');

	// Iterate through url backwards
	for(let i = splitUrl.length - 1; i >= 0; i--) {
 		// Current tld/subdomain/domain
		let a = splitUrl[i];

		// Everything following the current part
		let b = splitUrl.join('.').split(a)[1];

		// Combine current section and remaining url
		let c = `${a}${b}`;

		if(!_dict[c]) _dict[c] = 0;

		// Add count
		_dict[c] += parseInt(count);
	}
});

Object.keys(_dict).forEach(url => {
	console.log(`${_dict[url]} ${url}`);
});
