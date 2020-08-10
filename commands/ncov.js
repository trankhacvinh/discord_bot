const axios = require('axios');
module.exports = {
	name: 'ncov',
	description: `Hiện thông tin về dịch bệnh covid 19 tại Việt Nam và thế giới.`,
	async execute(message) {
		var url = 'api gì đó';
		await axios.get(url).then(response => {
			var data = response.data.items

			var vietNamData = data.filter(function (el) {
				return el.type === 'vietnam'
			});
			var trenkNhiem = data.filter(function (el) {
				return el.type !== '*' && el.type !== 'world' && el.total >= 10000
			});
			message.channel.send(message.author.toString() + 'Tình hình dịch Covid-19 tại Việt Nam và trên thế giới như sau:\n');
			var text = '';
			text += '**Đế chế Đại Việt - Việt Nam**:\n';
			text += `- Tổng số ca nhiễm: **${vietNamData[0].total}**\t\tTử vong: **${vietNamData[0].death}**\t\tHồi phục: **${vietNamData[0].recovered}**\n`;
			text += `Số ca tăng thêm hôm nay: **${vietNamData[0].changed.total}**\t\tSố ca hồi phục hôm nay: **${vietNamData[0].changed.recovered}**\n`;
			text += `\n- Sau đây là thống kê top 20 những quốc gia và vùng lãnh thổ có dịch bệnh: \n`;
			message.channel.send(text);
			var max = trenkNhiem.length <= 20 ? trenkNhiem.length : 20;
			for (let i = 0; i < max; i++) {
				const el = trenkNhiem[i];
				let temp = '';
				temp += `${i+1}. **${el.type}**\t\tSố ca nhiễm: **${el.total}**\t\tTử vong: **${el.death}**\t\tHồi phục: **${el.recovered}**\n`
				temp += `Số ca tăng thêm hôm nay: **${el.changed.total}**\t\tSố ca hồi phục hôm nay: **${el.changed.recovered}**\n`;
				message.channel.send(temp);
			}
		}).catch(() => {
			message.channel.send(message.author.toString() + ' Không cập nhật được :(')
		})
	},
};