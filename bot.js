const fetch = require("node-fetch");

//Import libraries
const Discord = require("discord.js"),
  winston = require("winston");

//Import local files
const auth = require("../auth.json"), //NOT IN GITHUB REPOSITORY
  { echo, when, wu, help } = require("./commands");

const BEA_SIGNAL = "&";

//Initialise bot
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.login(auth.token);

//Initialise winston logger
const logger = winston.createLogger({
  transports: new winston.transports.Console(),
  format: winston.format.printf(
    (log) => `[${log.level.toUpperCase()}] - ${log.message}`
  ),
});

//onReady - run when client loads
client.once("ready", () => {
  logger.info(client.user.username + " has taken flight! ID " + client.user.id);
});

//onMessage - run when a message is sent to any channel in the server
client.on("message", (message) => {
  if (!message.content.startsWith(BEA_SIGNAL) || message.author.bot) return;
  const args = message.content.slice(BEA_SIGNAL.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  msg = doCommands(cmd, args);

  message.channel.send(msg);
});

//#region Reactions
//onReactionAdd - run when a user adds a reaction to any message
client.on("messageReactionAdd", (reaction, user) => {
  addRemoveRole(reaction, user, true);
});

//onReactionRemoved - run when a user removes a reaction to any message
client.on("messageReactionRemove", (reaction, user) => {
  addRemoveRole(reaction, user, false);
});

const addRemoveRole = (reaction, user, isAdding) => {
  console.log(user);
  if (reaction.partial) {
    getCachedReaction(reaction);
  }

  const { id } = reaction.message,
    target_msg = 713885800173142105n;
  if (id == target_msg) {
    var role = reaction.message.guild.roles.get("714795398996295682");
    if (isAdding) user.roles.add(role);
    else user.roles.remove(role);
  }
};

const getCachedReaction = async (reaction) => {
  try {
    await reaction.fetch();
  } catch (error) {
    console.log("There was an error with fetching cached message: ", error);
  }
};
//#endregion

const doCommands = (cmd, args) => {
  var msg;
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
    case "cat":
      getCat().then((msg) => {
        return msg;
      });
      break;
    default:
      msg = "Please provide a valid command.";
  }
  return msg;
};

const getCat = async () => {
  try {
    var { file } = await fetch("https://aws.random.cat/meow").then((response) =>
      response.json()
    );
    return file;
  } catch (error) {
    return error;
  }
};
