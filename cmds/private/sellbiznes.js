module.exports = {
  tag: ["Продать бизнес"],
  button: ["resbiznes"],
  func: async(context, { vk, _user, game, biznes, util , db, toplv}) => {
    
    if(_user.biznes != -1) {
      let id = await context.question({message: `❓ Ты точно хочешь продать бизнес:\n🏢 "${biznes[_user.biznes].name}"\n💵 За него ты получишь $${util.number_format(biznes[_user.biznes].stm * 60 / 100)}`, keyboard: game.getTrue("Назад")});
      if(id.toLowerCase() != "подтвердить") return
      db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { biznes: -1 } , $inc: { balance: biznes[_user.biznes].stm * 60 / 100 } });
      context.send({message: `Ты продал бизнес "${biznes[_user.biznes].name}".\n💳 Теперь твой баланс: $${util.number_format(_user.balance +  biznes[_user.biznes].stm * 60 / 100) }`, keyboard: game.getPrivateKeyboard()})
    }
  } 
};

