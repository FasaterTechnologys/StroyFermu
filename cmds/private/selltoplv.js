module.exports = {
  tag: ["Продать станцию"],
  button: ["selltoplvn"],
  func: async(context, { vk, _user, game, toplv, util , db}) => {
    
    if(_user.toplv != -1) {
      let id = await context.question({message: `❓ Ты точно хочешь продать cтанцию:\n🏢 "${toplv[_user.toplv].name}"\n💵 За неё ты получишь $${util.number_format(toplv[_user.toplv].stm * 60 / 100)}`, keyboard: game.getTrue("Назад")});
      if(id.toLowerCase() != "подтвердить") return
      db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { toplv: -1 } , $inc: { balance: toplv[_user.toplv].stm * 60 / 100 } });
      context.send({message: `Ты продал cтанцию "${toplv[_user.toplv].name}".\n💳 Теперь твой баланс: $${util.number_format(_user.balance +  toplv[_user.toplv].stm * 60 / 100) }`, keyboard: game.getPrivateKeyboard()})
    }
  } 
};

