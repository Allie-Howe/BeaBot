const echo = (args) => {
  if (args.length == 0) msg = "There's no echo here";
  else {
    var msg = args[0] + " ";
    for (i = 1; i < args.length; i++) {
      msg += args[i] + " ";
    }
  }
  return msg;
};

const when = () => {
  var dateTime = new Date();
  var date =
    dateTime.getDate() +
    "/" +
    (dateTime.getMonth() + 1) +
    "/" +
    dateTime.getFullYear();
  var time =
    dateTime.getHours() +
    ":" +
    dateTime.getMinutes() +
    ":" +
    dateTime.getSeconds();

  return "The date is " + date + ", the time is " + time;
};

const wu = (args) => {
  if (args.length == 0) msg = "You've given no date";
  else {
    var dateTime = new Date();
    var date = args[0].substring(0).split("/");

    var year = dateTime.getFullYear() - args[2];
    var month = dateTime.getMonth() + 1 - args[1];
    var day = dateTime.getDate() - args[0];

    var newDate = [day, month, year];

    var msg = day;
  }
  msg += " -- THIS COMMAND IS A WORK IN PROGRESS AND WILL NOT BE CORRECT --";
  return msg;
};

const help = (args) => {
  var fs = require("fs");
  var err = false;
  var filePath = "./help_refs/";

  if (args[0] == undefined) filePath += "general";
  else filePath += args[0];
  /*
  switch (args[0]) {
    case undefined:
      filePath += "general";
      break;
    case "echo":
      filePath += "echo";
      break;
    case "when":
      filePath += "when";
      break;
    case "cat":
      filePath += "cat";
      break;
    default:
      err = true;
      break;
  }*/

  try {
    msg = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    if (error.code == "EISDIR" || "ENOENT")
      msg = "We couldn't help with this command. Did you type it correctly?";
    else msg = "An error occured:" + error.message;
  }

  var msg;
  // if (!err) msg = fs.readFileSync(filePath, "utf8");
  //  else msg = "Unable to recognise command.";

  return msg;
};

module.exports = {
  echo,
  when,
  wu,
  help,
};
