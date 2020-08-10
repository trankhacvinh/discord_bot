const Discord = require('discord.js');
const axios = require('axios');
const {
	imageConfig,
	imageChannel
} = require('../config.json')
const subReddits = require('../subReddit.json')
const utils = require('../utils.js')

function getSubRedditListOn() {
	var sourceArray = []
	var resultArray = []
	if (imageConfig.theLoai === 'all') {
		sourceArray = [...subReddits.anime.sub, ...subReddits.real.sub]
	} else if (imageConfig.theLoai === 'anime') {
		sourceArray = subReddits.anime.sub
	} else if (imageConfig.theLoai === 'real') {
		sourceArray = subReddits.real.sub
	}
	if (imageConfig.pg === 'all') {
		resultArray = sourceArray.filter((el) => {
			return el.status === 0
		})
	} else {
		resultArray = sourceArray.filter((el) => {
			return el.pg === imageConfig.pg && el.status === 0
		})
	}

	return resultArray
}

module.exports = {
	name: 'ecchi',
	description: 'Đăng ảnh theo nguồn được cài đặt. Bật tắt bằng **on**/**off**',
	args: true,
	execute(message, args) {
		try {
			if (args[0] === 'on') {
				message.client.loops.set('ecchi', setInterval(function () {
					var sub = utils.randomArray(getSubRedditListOn()).name
					axios.get(`my api server/${sub}/${imageConfig.soLuong}`)
						.then((result) => {
							if (result.data.memes.length > 0) {
								for (let i = 0; i < result.data.memes.length; i++) {
									var meme = result.data.memes[i]
									const channel = message.client.channels.cache.get(imageChannel)
									const webAttachment = new Discord.MessageAttachment(meme.url)
									setTimeout(function () {
										channel.send(webAttachment)
									}, i * 5000)
								}
							}
						}).catch(error => {
							if (error.response.status === 400) {
								for (let i = 0; i < imageConfig.soLuong; i++) {
									axios.get(`https://www.reddit.com/r/${sub}/random/.json`)
										.then((result) => {
											if (result.data.length > 0) {
												var image = result.data[0].data.children[0].data.preview.images[0].variants.gif.source.url
												const channel = message.client.channels.cache.get(imageChannel)
												const webAttachment = new Discord.MessageAttachment(image)
												setTimeout(function () {
													channel.send(webAttachment)
												}, i * 5000)
											}
										}).catch(error => {
											return;
										})
								}
							}
						})
				}, (imageConfig.thoiGian > 0 ? imageConfig.thoiGian : 1) * 60000))
			} else if (args[0] === 'off') {
				clearInterval(message.client.loops.get('ecchi'))
			} else if (args[0] === 'config') {
				if (args.length >= 5) {
					//option: theLoai pg soluong thoigian
					const theLoai = args[1]
					const pg = args[2]
					const soLuong = args[3]
					const thoiGian = args[4]
					imageConfig.theLoai = theLoai
					imageConfig.pg = pg
					imageConfig.soLuong = soLuong
					imageConfig.thoiGian = thoiGian
					return message.channel.send('Cập nhật cấu hình thành công!')
				} else {
					return message.channel.send(`Cấu hình hiện tại:\nThể loại: ${imageConfig.theLoai}\nĐộ tuổi: ${imageConfig.pg}\nSố ảnh post 1 lần: ${imageConfig.soLuong}\nThời gian post: ${imageConfig.thoiGian} phút`)
				}
			}
			return;

		} catch (e) {
			console.log('can not send image')
		}
	},
};