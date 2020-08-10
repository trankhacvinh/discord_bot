module.exports = {
	name: 'logging',
	description: 'Console logging',
	write(...message) {
		console.log(message.join('\t'))
	},
};