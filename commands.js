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

  var filePath = "./help_refs/";

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
  }
  return fs.readFileSync(filePath, "utf8");
};

module.exports = {
  echo,
  when,
  wu,
  help,
};
