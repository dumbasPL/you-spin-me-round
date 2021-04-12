require('dotenv').config();
const Discord = require('discord.js');

const PREFIX = process.env.PREFIX;

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let spins = [];

function spin_user(user, c1, c2) {
  
  if (spins[user.id]) {
    clearInterval(spins[user.id]);
    delete spins[user.id];
  }

  let flip = false;
  spins[user.id] = setInterval(() => {
    let c = flip ? c1 : c2;
    try {
      user.voice.setChannel(c);
    } catch (error) {
      
    }
    flip = !flip;
  }, 2000);
}

client.on('message', msg => {
  if (!msg.guild) {
    return;
  }
  let msg_str = msg.content.trim();
  if (msg_str.startsWith(PREFIX)) {
    if (!msg.member.hasPermission('ADMINISTRATOR')) {
      msg.channel.send("NN's don't have access");
      return;
    }
    let command = /s!(\w+)\s/.exec(msg_str);
    let print_commands = false;
    if (command && command[1]) {
      if (command[1] == "spin") {
        let args = /<@!?(\d.*?)>\s+(\d.*?)\s+(\d.*?)\s*$/.exec(msg_str);
        if (args) {
          if (args[2] != args[3]) {
            let user = msg.guild.members.cache.get(args[1]);
            let c1 = msg.guild.channels.cache.get(args[2]);
            let c2 = msg.guild.channels.cache.get(args[3]);
            if (user && c1 && c2) {
              spin_user(user, c1, c2);
              msg.channel.send("You spin me right 'round, baby\n" +
                "Right 'round like a record, baby\n" +
                "Right 'round, 'round, 'round");
            }
          } else {
            msg.channel.send("Use two different voice channels!");
          }
        } else {
          msg.channel.send(`Usage: ${PREFIX}spin <@user> <chanel1> <chanel2>`);
        }
      } else if (command[1] == "stop") {
        if (msg.mentions.users.size == 0) {
          msg.channel.send(`Usage: ${PREFIX}stop <@user1> [@user2] [@user3] [@user4]...`);
        } else {
          let count = 0;
          msg.mentions.users.forEach(user => {
            if (spins[user.id]) {
              clearInterval(spins[user.id]);
              delete spins[user.id];
              count++;
            }
          });
          msg.channel.send(`Stopped spin for ${count} user(s)`);
        }
      } else {
        print_commands = true;
      }
    } else {
      print_commands = true;
    }
    if (print_commands) {
      msg.channel.send("Commands: spin, stop");
    }
    
  }
});

client.login(process.env.CLIENT_TOKEN);