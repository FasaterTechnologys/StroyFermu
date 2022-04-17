module.exports = {
    tag: ["Электростанции"],
    button: ["elctrstanc"],
    func: async(context, { vk, _user, game, energ, util , db, toplv}) => {
      
      if(_user.energ != -1) {
        await context.send({message:`Привет ${_user.name}!\n🔌 Твоя электростанция: "${energ[_user.energ].name}".\n🧰 Запас энергии: ${util.number_format(_user.energdoxod)}⚡.\n🔄 Оборот: ${energ[_user.energ].doxod}⚡/ч.\n💰 Сумма налога: $${util.number_format(_user.nalog)}.\n${_user.nalog > energ[_user.energ].stm * 50 /100 ? "❗ Высокая сумма налога! Станция отключена ❗": "" }`, attachment: energ[_user.energ].attachmnent, keyboard: game.getStancInfo("electro")})
      }else{
      db.get().collection('users').updateOne({ uid: _user.uid }, { $set: { menu: 1, } });
      let str = ""
      for(let i = 0; i < energ.length; i++){
        str += `${i + 1} •  Электростанция: ${energ[i].name}
  Доход: ${util.number_format(energ[i].doxod)}⚡,
  ----------------
  Стоимость: $${util.number_format(energ[i].stm)}
  \n\n\n
  `
      }
      context.send({ message:`
      Электростанции:
  
  ${str}
  
  `, keyboard: game.getFr() });
     
    let id = await context.question(`Выбери электростанцию:`);
    db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { menu: 0 } });
    if(id.toLowerCase() == "назад") return
    if(energ[Number(id) -1] == undefined ) return context.send({ message:"Вы вернулись в меню", keyboard: game.getPrivateKeyboard() })
    if(Number(energ[Number(id)-1].stm) > _user.balance ) return context.send({message: `Тебе не хватает $${util.number_format(Number(energ[Number(id)-1].stm) - _user.balance)}\nЗаработай их нажав на кнопку Работа`, keyboard: game.getPrivateKeyboard()})
    context.send({message:`Ты точно хочешь купить электростанцию "${energ[Number(id)-1].name}" за $${util.number_format(energ[Number(id)-1].stm)}?`, attachment: energ[Number(id)-1].attachmnent, keyboard: game.getTrue("электростанции")})
    let truep = await context.question(`Нажми подтвердить:`);
    if(truep.toLowerCase() == "подтвердить"){
      db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { energ: (Number(id) -1), balance: _user.balance - Number(energ[Number(id)-1].stm) } });
    return context.send({ message:`Вы купили электростанцию ${energ[Number(id)-1].name} за $${util.number_format(energ[Number(id)-1].stm)}`, keyboard: game.getPrivateKeyboard() })
    }
       }
    } 
  };
  
  