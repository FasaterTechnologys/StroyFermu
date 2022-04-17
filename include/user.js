const db = require('./db');
const vk = require('./vk');

module.exports = {
  getUser: async(uid) => {
    if (uid < 0) return
    let _user = await db.get().collection('users').findOne({ uid: Number(uid) });
    if(_user != null) return _user;
    
    let vkUser = await vk.get()._vk.api.call('users.get', { user_ids: Number(uid), fields: 'name,lastname,sex,photo_100' });
    if(!vkUser || !vkUser[0]) { return false; }

    let userInfo = {
      uid: Number(uid),
      name: `${vkUser[0].first_name} ${vkUser[0].last_name}` ,
      right: 0,
      inGame: [],
      balance: 50000, //баланс
      deposit: 0, 
      win: 0,
      time: 60000, // время для получения денег с 
      timebiznes: 0,
      skladbiznes: "",
      contribution: 0,
      output: 0,
      lose: 0,
      stop: 0,
      winround: 0,
      loseround: 0,
      bonus: 0,
      stavka: 0,
      ref: 0, 
      refusers: 0,
      grab: 0, // для ограбления
      menu: 10, // где находится юзер
      orug: "", // оружие
      car: "", // машины
      biznes: -1, // бизнес
      ferm: -1, // ферма
      toplv: -1, // топливо
      energ: -1, // енергия
      stc: 0, // основная валюта
      toplvdoxod: 0, // доход топлива
      akc: 0, //награда за репост
      energdoxod: 0, // доход энергии
      penis: 0, // машина которая будет показана в профиле
      root: 0, // права админа
      strmat: 0, //строй материалы
      garag: 0, // гараж есть или нету
      doxod: 0, // доход с бизнеса
      nalog: 0, // налог который должны платить 
      firstMessage: Math.floor(new Date() / 1000)
    }; db.get().collection('users').insertOne(userInfo);
    return null;
  },

  isUser: async(uid) => {
    return (await db.get().collection('users').findOne({ uid: Number(uid) }) == null ? false : true);
  },
}
