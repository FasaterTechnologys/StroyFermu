module.exports = {
  tag: ["Продать ферму"],
  button: ["resferm"],
  func: async(context, { vk, _user, game, ferm, util , db, toplv}) => {
    
    if(_user.ferm != -1) {
      let id = await context.question({message: `❓ Ты точно хочешь ферму:\n🏢 "${ferm[_user.ferm].name}"\n💵 За неё ты получишь $${util.number_format(ferm[_user.ferm].stm * 60 / 100)}`, keyboard: game.getTrue("Назад")});
      if(id.toLowerCase() != "подтвердить") return
      db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { ferm: -1 } , $inc: { balance: ferm[_user.ferm].stm * 60 / 100 } });
      context.send({message: `Ты продал бизнес "${ferm[_user.ferm].name}".\n💳 Теперь твой баланс: $${util.number_format(_user.balance +  ferm[_user.ferm].stm * 60 / 100) }`, keyboard: game.getPrivateKeyboard()})
    }
  } 
};

