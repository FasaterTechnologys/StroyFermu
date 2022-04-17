module.exports = {
  tag: ["Бизнес"],
  button: ["biznes"],
  func: async(context, { vk, _user, game, biznes, util , db, toplv}) => {
    
    if(_user.biznes != -1) {
      if(Number(_user.strmat) == 0) context.send("❗ Нету строй материалов! Бизнес не приносит доход.")
      context.send({message:`Привет ${_user.name}!\n🏢 Твой бизнес "${biznes[_user.biznes].name}".\n💳 Баланс бизнеса: $${util.number_format(_user.doxod)}.\n🚚 Запас топлива: 🛢${_user.toplv == -1 ? "Нету." : `${_user.toplvdoxod} | $${toplv[_user.toplv].doxod}/ч.`}\n💵 Чистый доход: $${util.number_format(Number(biznes[_user.biznes].doxod))}/мин.\n🌲 Стройматериалов на складе: ${util.number_format(Number(_user.strmat))}/${util.number_format(Number(biznes[_user.biznes].stm) / 2)}.`, attachment: biznes[_user.biznes].attachmnent, keyboard: game.getBiznes()})
    }else{
    db.get().collection('users').updateOne({ uid: _user.uid }, { $set: { menu: 1, } });
    let str = ""
    for(let i = 0; i < biznes.length; i++){
      str += `${i + 1} •  Бизнес: ${biznes[i].name}
Доход: $${util.number_format(biznes[i].doxod)}/мин,
Затрата топлива: ${biznes[i].toplv}🛢
----------------
Стоимость: $${util.number_format(biznes[i].stm)}
\n\n\n
`
    }
    context.send({ message:`
Бизнесы:

${str}

Запомни! Если не будет топлива то бизнес не будет приносить прибыль!
`, keyboard: game.getFr() });
   
  let id = await context.question(`Выбери бизнес:`);
  db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { menu: 0 } });
  if(id.toLowerCase() == "назад") return
  if(biznes[Number(id) -1] == undefined ) return context.send({ message:"Вы вернулись в меню", keyboard: game.getPrivateKeyboard() })
  if(Number(biznes[Number(id)-1].stm) > _user.balance ) return context.send({message: `Тебе не хватает $${util.number_format(Number(biznes[Number(id)-1].stm) - _user.balance)}\nЗаработай их нажав на кнопку Работа`, keyboard: game.getPrivateKeyboard()})
  context.send({message:`Ты точно хочешь купить бизнес "${biznes[Number(id)-1].name}" за $${util.number_format(biznes[Number(id)-1].stm)}?`, attachment: biznes[Number(id)-1].attachmnent, keyboard: game.getTrue("бизнес")})
  let truep = await context.question(`Нажми подтвердить:`);
  if(truep.toLowerCase() == "подтвердить"){
    db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { biznes: (Number(id) -1), balance: _user.balance - Number(biznes[Number(id)-1].stm) } });
  return context.send({ message:`Вы купили бизнес ${biznes[Number(id)-1].name} за $${util.number_format(biznes[Number(id)-1].stm)}`, keyboard: game.getPrivateKeyboard() })
  }
	 }
  } 
};

