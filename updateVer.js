const branch = require("git-branch");
const fs = require("fs");
branch("some/path")
  .then((name) => {
    var res = name.split("/");
    if (res[0] == "release") {
      fs.writeFileSync(".env", '#.env\nREACT_APP_VERSION = "' + res[1] + '"');
    }
  }) //=> 'Branch: master'
  .catch(console.error);
