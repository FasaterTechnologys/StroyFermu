module.exports = {
  tag: ["Продать станцию"],
  button: ["electro"],
  func: async(context, { vk, _user, game, energ, util , db}) => {
    
    if(_user.energ != -1) {
      let id = await context.question({message: `❓ Ты точно хочешь продать cтанцию:\n🏢 "${energ[_user.energ].name}"\n💵 За неё ты получишь $${util.number_format(energ[_user.energ].stm * 60 / 100)}`, keyboard: game.getTrue("Назад")});
      if(id.toLowerCase() != "подтвердить") return
      db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { energ: -1 } , $inc: { balance: energ[_user.energ].stm * 60 / 100 } });
      context.send({message: `Ты продал cтанцию "${energ[_user.energ].name}".\n💳 Теперь твой баланс: $${util.number_format(_user.balance +  energ[_user.energ].stm * 60 / 100) }`, keyboard: game.getPrivateKeyboard()})
    }
  } 
};

