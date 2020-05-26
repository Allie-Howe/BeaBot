var { echo, when, wu, help } = require("../commands");

const onMessage = (user, userID, channelID, message, evt, bot) => {
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
};

module.exports = onMessage;

function checkCommand(message, cmd, args) {
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
}
