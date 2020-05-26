//Import libraries
const Discord = require("discord.io"),
  winston = require("winston");
//Import local files
const auth = require("./auth.json"),
  { echo, when, wu, help } = require("./commands");

//Initialise bot
const bot = new Discord.Client({
  token: auth.token,
  autorun: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

//Initialise winston logger
const logger = winston.createLogger({
  transports: new winston.transports.Console(),
  format: winston.format.printf(
    (log) => `[${log.level.toUpperCase()}] - ${log.message}`
  ),
});

//onReady - run when bot loads
bot.on("ready", (evt) => {
  logger.info("Logged in as '" + bot.username + "', ID " + bot.id);
});

//onMessage - run when a message is sent to any channel in the server
bot.on("message", (user, userID, channelID, message, evt) => {
  if (message.substring(0, 1) == "!") {
    var fromBot = userID == bot.id;

    var args = message.substring(1).split(" ");
    var cmd = args[0];
    args = args.splice(1);

    if (!fromBot) {
      msg = checkCommand(message, cmd, args);

      bot.sendMessage({
        to: channelID,
        message: msg,
      });
    }
  }
});

//onReactionAdd - run when a user adds a reaction to any message
bot.on("messageReactionAdd", (reaction) => {
  addRemoveRole(reaction, true);
});

//onReactionRemoved - run when a user removes a reaction to any message
bot.on("messageReactionRemove", (reaction) => {
  addRemoveRole(reaction, false);
});

const addRemoveRole = (reaction, isAdding) => {
  const { message_id } = reaction.d,
    target_msg = 713885800173142105n;

  if (message_id == target_msg) {
    const serverID = 694190509442465832n,
      roleID = 714795398996295682n,
      userID = reaction.d.user_id;

    if (isAdding)
      bot.addToRole({ serverID, userID, roleID }, (err) => {
        if (err) console.log(err);
      });
    else
      bot.removeFromRole({ serverID, userID, roleID }, (err) => {
        if (err) console.log(err);
      });
  }
};

const checkCommand = (message, cmd, args) => {
  switch (cmd) {
    case "echo":
      msg = echo(args);
      break;
    case "when":
      msg = when();
      break;
    case "wu":
      msg = wu(args);
      break;
    case "help":
      msg = help(args);
      break;
    default:
      msg = "Please provide a valid command.";
  }
  return msg;
};
