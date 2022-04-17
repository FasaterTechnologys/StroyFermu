const fs = require('fs');
const colors = require('colors');
const mongoose = require('mongoose');
const deferred = require('deferred');

const config = require("./config.js");
const db = require('./include/db');
const vk = require('./include/vk');
const util = require('./include/util');

const user = require('./include/user');
const game = require('./include/game');
const configpen = require('./config.json');
const { Qiwi } = require('node-qiwi-promise-api');
const qiwi = new Qiwi("d7d9f2910f479288a29fc449ed796048");

mongoose.connect("mongodb+srv://fastmagaz:poger000@cluster0.f5u7o.mongodb.net/test", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})




let payment = {
	id: {
		type: Number,
		required: true,
	},
	
	amountrub: Number,
	amountvkc: Number,
	date: Number,
	name: String,
	committed: Boolean,
	uid: Number
}

const Payment = mongoose.model('Payment', payment)

const userSchema = {
	id: {
		type: Number,
		required: true,
	},
	rassilka: {
		type: Boolean,
		required: true,
		default: true
	},
	firstName: {
		type: String,
		required: true,
	},
	qiwi: {
		type: String,
		default: '',
	},
	reposts: [{
		type: Number,
	}],
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
}

const User = mongoose.model('User', userSchema)

let _cmpen = [];


let cmds = [fs.readdirSync(`${__dirname}/cmds/conversation`).filter((name) => /\.js$/i.test(name)).map((name) => require(`${__dirname}/cmds/conversation/${name}`)), fs.readdirSync(`${__dirname}/cmds/private`).filter((name) => /\.js$/i.test(name)).map((name) => require(`${__dirname}/cmds/private/${name}`))];

//const cmds = fs.readdirSync(`${__dirname}/cmds/`).filter((name) => /\.js$/i.test(name)).map((name) => require(`${__dirname}/cmds/${name}`));
/* —---------------------— [ Бот ] —---------------------— */

let defferred = []


let biznes = [{id: 0, name: "Производство жидкого мыла", attachmnent: "photo-208942376_457239186", doxod: 1000, stm: 10000, toplv: 1},{id: 1, name: "Переработка стекла", attachmnent: "photo-208942376_457239183", doxod: 10000, stm: 100000, toplv: 2},{id: 2, name: "Ювелирный бизнес", attachmnent: "photo-208942376_457239184", toplv: 5, doxod: 100000, stm: 1000000,},{id: 3, name: "Аэрапорт", attachmnent: "photo-208942376_457239185", doxod: 1000000, stm: 10000000, toplv: 5},]
let ferm = [{id: 0, name: "GTX 950 TI", doxod: 0.01, stm: 1000000, energ: 1, attachmnent: "photo-208942376_457239211"}, {id: 1, name: "GTX 750 TI", doxod: 0.1, stm: 100000000, energ: 5, attachmnent: "photo-208942376_457239212" },{id: 2, name: "GTX 1030 TI", doxod: 1, stm: 1000000000, energ: 10, attachmnent: "photo-208942376_457239215"},{id: 3, name: "GTX 1050 TI", doxod: 5, stm: 8000000000, energ: 15, attachmnent: "photo-208942376_457239214	"},{id: 3, name: "RTX 3090 TI", doxod: 20, stm: 10000000000, energ: 10, attachmnent: "photo-208942376_457239213"}]
let toplv = [{id: 0, name: "Малый УЭЦН", doxod: 1, stm : 50000, attachmnent: "photo-208942376_457239218"},{id: 1, name: "Средний УЭЦН", doxod: 2, stm : 1500000, attachmnent: "photo-208942376_457239220"},{id: 2, name: "Большой УЭЦН", doxod: 10, stm : 100000000, attachmnent: "photo-208942376_457239224"},]
let energ = [{id: 0, name: "Ручной генератор", doxod: 1, stm : 500000, attachmnent: "photo-208942376_457239223"},{id: 1, name: "Ветряк", doxod: 2, stm : 15000000, attachmnent: "photo-208942376_457239222"},{id: 2, name: "гидроэлектростанция", doxod: 10, stm : 30000000, attachmnent: "photo-208942376_457239221"},{id: 3, name: "АЭС", doxod: 20, stm : 40000000, attachmnent: "photo-208942376_457239219"},]
let car = [
	{
		name: 'Brabus 900',
		attachment: 'photo-208942376_457239188',
		shans: '3'
	},
	{
	  name: 'Honda Vezel 2014',
	  attachment: 'photo-208942376_457239191',
	  shans: '1'
	},
	{
	  name: 'ВАЗ 2101',
	  attachment: 'photo-208942376_457239192',
	  shans: '0'
	},
	{
	  name: 'Nissan',
	  attachment: 'photo-208942376_457239193',
	  shans: '0'
	},
	{
	  name: 'Citroen C3 Urban',
	  attachment: 'photo-208942376_457239194',
	  shans: '1'
	},
	{
	  name: 'Formula 1 Renault',
	  attachment: 'photo-208942376_457239195',
	  shans: '2'
	},
	{
	  name: 'Tuning Mansory F8XX',
	  attachment: 'photo-208942376_457239196',
	  shans: '2'
	},
	{
	  name: 'Renault Megane',
	  attachment: 'photo-208942376_457239187',
	  shans: '1'
	}
  ]

let gun = [
	{
	  name: 'Револьвер',
	  attachment: 'photo-208942376_457239200',
	  shans: '1'
	},
	{
	  name: 'Пистолет F-28',
	  attachment: 'photo-208942376_457239199',
	  shans: '0'
	},
	{
	  name: 'Модернизированный Пистолет H-63',
	  attachment: 'photo-208942376_457239208',
	  shans: '0'
	},
	{
	  name: 'ПП-43',
	  attachment: 'photo-208942376_457239206',
	  shans: '1'
	},
	{
	  name: 'АК-47',
	  attachment: 'photo-208942376_457239203',
	  shans: '2'
	},
	{ name: 'М4А4', attachment: 'photo-208942376_457239207', shans: '1' },
	{
	  name: 'AUG-56',
	  attachment: 'photo-208942376_457239204',
	  shans: '2'
	},
	{
	  name: 'GT-44',
	  attachment: 'photo-208942376_457239202',
	  shans: '2'
	},
	{
	  name: 'RPG', 
	  attachment: 'photo-208942376_457239201', 
	  shans: '3' },
	{
	  name: 'Модернизированный DTS-81',
	  attachment: 'photo-208942376_457239205',
	  shans: '3'
	}
  ]
  


vk.setHook(['new_message', 'edit_message'], async (context) => {
	if(context.senderId < 0) return
	const userId = Number(context.senderId);
	const _user = await user.getUser(userId);
	if (context.referralValue % 1 == 0) {
		const form = context.referralValue
		// if (context.referralValue == context.senderId) return 
		// else if (_user.ref != 0) return 
		if(_user != null) return
		if (context.referralValue == context.senderId) return
		else if (_user.ref != 0) return
		let numb = util.random(1000000, 5000000)
		var bulk = db.get().collection('users').initializeUnorderedBulkOp();
		bulk.find({ uid: Number(form) }).update({ $inc: { balance: +numb, refusers: +1,ref: Number(form) } });
		bulk.execute();
		
		vk.get()._vk.api.call("messages.send", {
			peer_id: Number(form),
			random_id: util.random(-200000000, 200000000),
			message: `Игрок ${_user.name} был взян в рабство и ты получил $${util.number_format(numb)}` });
	}
	context.question = async (text) => {
		await context.send(text);
		let def = deferred();
		defferred.push({ user_id: context.senderId, def: def });
		return await def.promise((data) => { return data.text; });
	}
	if(_user == null) {context.send(`Приветствую тебя в боте Строй ферму,
	тебе нужно заработать свои первые деньги в начальном бизнесе и купить свою первую ферму, но не забывай что для неё нужно электричество, а для бизнеса топливо, если что-то из этого закончится, то прибыль получать не будешь.
	
	✈Так же в 12.00, 15.00 и 17.00 будет проводиться аукцион на котором можно купить машины и оружие и потом использовать его в ограблении или продать другим игрокам в специальной беседе. Удачи!`)
	let name = await context.question(`Начнём знакомство, напиши своё имя:`);
	if(name.length < 3 || name.length > 12) {context.send(`Слишком длинный или короткий ник, изменить его можно будет в настройках`)
	name = _user.name
}
	db.get().collection('users').updateOne({ uid: userId }, { $set: { name: name, menu: 0, balance: 0 } });
	context.send(`Отлично! Теперь ты ${name}. Если что имя можно поменять в настройках`)

	return context.send(`Приступай к работе, на выбор у тебя их 3, нажми на кнопку работа`)
}
	
	if (context.senderId < 1 || context.isOutbox || context.isGroup) {
		return;
	}
	vk.setHook(['new_wall_repost'], async (context) => {

		const userId = Number(context.wall.ownerId);
		const _user = await user.getUser(userId);
		
		if (!_user || _user.postId == Number(configpen[0].id)) {
			return;
		}
		db.get().collection('users').updateOne({ uid: Number(context.wall.ownerId) }, { $set: { postId: Number(configpen[0].id) } , $inc: { balance: Number(configpen[0].bonus),  } });
		vk.get()._vk.api.call("messages.send", {
			peer_id: Number(userId),
			random_id: util.random(-200000000, 200000000),
			message: `💰Ты получил $${util.number_format(configpen[0].bonus)} за репост записи↩`
		}).catch((err) => { console.log(`Ошибка при отправке сообщения ${err}`); });
	})

	defferred.forEach(async (data) => {
		if (data.user_id == context.senderId) {
			data.def.resolve(context);
			return defferred.splice(defferred.indexOf(data), 1);
		}
	});

	
	let str = context.text.toLowerCase();
	let dedhuy = str.split(" ");
	
		if(str == "назад" ){
			db.get().collection('users').updateOne({ uid: context.peerId },{ $set : {menu: 0} });
			return context.send({ message:"Вы вернулись в меню◀", keyboard: game.getPrivateKeyboard() })
		}
		if( str == "подтвердить"|| str == "отмена" || _user.menu == 10) return
		let cmd = await cmds[(!context.isChat ? 1 : 0)].find(context.messagePayload && context.messagePayload.command ? (cmd => cmd.bregexp ? cmd.bregexp.test(context.messagePayload.command) : (new RegExp(`^\\s*(${cmd.button.join('|')})`, "i")).test(context.messagePayload.command)) : (cmd => cmd.regexp ? cmd.regexp.test(context.text) : (new RegExp(`^\\s*(${cmd.tag.join('|')})`, "i")).test(context.text)));
		if (!cmd	) {
			if (!context.isChat && Number(context.text % 1 != 0)) { await context.send({ message: `👁Напиши команду "проф" что бы вернуться в Меню ❗`, keyboard: game.getPrivateKeyboard() }); }
			return;
		}
		else{
			setTimeout(() => _cmpen[context.senderId] = null, 1000);
			if(_cmpen[context.senderId] != undefined ? _cmpen[context.senderId].trel == "pens" : false) {
        		_cmpen[context.senderId] = null
        		return 
      		}
			_cmpen[context.senderId] = {trel: "pens"}
			cmd["cmd"] = await (context.messagePayload && context.messagePayload.command ? context.messagePayload.command : context.text);

		}
		console.log(`[ newMessage ] [ ${context.peerId} ] [ ${context.senderId} ] ==> ${context.text}`);

		console.log(`[ newMessage ] [ ${context.peerId} ] [ ${context.senderId} ] ==> ${context.text}`);

		await cmd.func(context, { db, util, user, _user, cmd, cmds, vk, cmd, fs, game, _cmpen, configpen, qiwi, biznes, toplv, energ, ferm,car }).then(() => { }).catch((e) => {
			console.log(`Ошибка:\n${e}`.red.bold);
		})





})



async function run() {
	await db.connect(function (err) {
		if (err) { return console.log(`[ RCORE ] Ошибка подключения к базе данных! (MongoDB)`, err); }
		console.log(`[ RCORE ] Успешно подключен к базе данных! (MongoDB)`);
	});

	await vk.connect(function (err) {
		if (err) { return console.log(`[ RCORE ] Ошибка подключения! (VK)`, err); }
		console.log(`[ RCORE ] Успешно подключен! (VK)`)
	});
    

	console.log(`[ RCORE ] Бот успешно запущен и готов к работе!`);
}


run().catch(console.error);


process.on("uncaughtException", e => {
	console.log(e);
});

process.on("unhandledRejection", e => {
	console.log(e);
});


setInterval(async () => {
    let winUsers = await db.get().collection('users').find();
	winUsers.forEach((res, i) => {
		if(res.toplv != -1 && res.nalog < toplv[res.toplv].stm * 50 /100){
			db.get().collection('users').updateOne({ uid: res.uid }, { $inc: { toplv: toplv[res.toplv].doxod, nalog: toplv[res.toplv].stm /100} });
		}
		if(res.biznes != -1 && res.strmat != 0 && res.toplv < biznes[res.biznes].toplv){
		let pe = biznes[res.biznes].stm / 2 / (100000000 / 50000)
		if(res.strmat <= pe) return db.get().collection('users').updateOne({ uid: res.uid }, { $inc: { balance: +biznes[res.biznes].doxod, strmat: 0} });
		db.get().collection('users').updateOne({ uid: res.uid }, { $inc: { balance: +biznes[res.biznes].doxod, strmat: -pe, toplv: -biznes[res.biznes].toplv,} });
		}
		if(res.ferm == -1){

		}
	  }); 
}, 60000)




setInterval(async () => {
    const options = {
		rows: 2,
		operation: 'IN',
		sources: ['QW_RUB'],
	}
    let response = (await qiwi.getOperationHistory(options)).data // история платежей
	response.map(async (operation) => {
		let check = await Payment.findOne({ id: Number(operation.txnId) });
		if(check) return operation;
		if(!operation.comment) return;
		if(operation.comment.startsWith("bc_")) {
		console.log(3)
			let id = Number(operation.comment.split("bc_")[1])
			let amount = operation.sum.amount  * 1000
			console.log(amount)
			const [us] = (await vk.get()._vk.api.users.get({ user_ids: id }))
			let rubAmount = operation.sum.amount
			try {
				db.get().collection('users').updateOne({ uid: id }, { $inc: { balance: +Math.round(Number(amount))} });
				db.get().collection('users').updateOne({ uid: id }, { $inc: { contribution: +Math.round(Number(amount))} });
				
				await vk.get()._vk.api.messages.send({ user_id: 398851926, message: `🔥 *id${us.id} (${us.first_name}) перевёл ${util.number_format(rubAmount)}₽ \n✅ Ему успешно отправлено ${util.number_format(amount)} PandaCoin` }).catch((err) => { return console.log(`Ошибка при отправке сообщения!`) })
				await vk.get()._vk.api.messages.send({
					user_id: id,
				message: `✅ Поступил платёж в размере ${Number(rubAmount)}₽ 
💰 На ваш баланс выдано ${util.number_format(amount)} PandaCoin

💬 Пожалуйста, оставьте отзыв, чтобы другие люди поверили в нашу честность: https://vk.com/topic-209591778_48344666` }).catch((err) => { return console.log(`Ошибка при отправке сообщения!`) })
				} catch (e) {
				await vk.get()._vk.api.messages.send({
					user_id: id,
					message: `❗ Во время покупки PandaCoin произошла ошибка!
Свяжитесь с администратором группы!
Ошибка: ${e}`, }).catch((err) => { return console.log(`Ошибка при отправке сообщения!`) })
			}
		}
	})
}, 15000)






