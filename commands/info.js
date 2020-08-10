module.exports = {
	name: 'info',
	description: 'Hiện thông tin của bạn hoặc của người được tag.',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`${message.author.toString()} your info: ${message.author.username}'s id: ${message.author.id}`);
		}

		const infos = message.mentions.users.map(user => {
			return `${user.username}'s id: ${user.id}`;
		});

		message.channel.send(`${message.author.toString()} ${infos}`);
	},
};