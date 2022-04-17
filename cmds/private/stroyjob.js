

module.exports = {
    tag: ["Строительство зданий"],
    button: ["stroyjob"],
    func: async(context, { vk, _user, game, util , db, user}) => {
      let random = util.random(1, 3)
      let i = 0
      let time = 1
      async function car() {
        setTimeout(async() =>  {
          const puser = await user.getUser(context.peerId);
          if(puser.menu != 5) return
          random = util.random(1, 3)
          if(random == 1) str = "Положи кирпич⬅️"
          if(random == 2) str = "Положи кирпич⬆"
          if(random == 3) str = "Положи кирпич➡️"
          let name = await context.question({message: str, attachment: "photo-208942376_457239226"});
          if(Number(name) % 1 != 0) return
          if(Number(name) != random) return await context.send({message: "Ты поставил крипич не туда! Начни заново", keyboard: game.getJob()})
          i++
          db.get().collection('users').updateOne({ uid: context.peerId }, { $inc: { balance: +1000 }});
          await context.send("Отлично! Ты заработал $1.000")
          car()
        }, util.random(2000, 5000));    
      }
      
        await context.send({message:`Привет ${_user.name}!\n🚚Ты начал работать строителем! Если захочешь закончить нажми кнопку назад⬅`, keyboard: game.getPlayJob()})
        await context.send("📦Заливаем бетон...")
        db.get().collection('users').updateOne({ uid: context.peerId }, { $set:{menu: 5} });
        setTimeout(async() =>  {
          await context.send("🚚Поднимаемся по строительным лесам...")
          car()     
        }, util.random(1000, 2000));            
      } 
  };


  