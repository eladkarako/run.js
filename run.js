"use strict";

function resolve_path(s){ //normalize to full paths, with forward-slash (works fine in node under Windows).
  s = s || "";
  if("" === s){ throw new Error("[ERROR] empty."); } //don't resolve empty string.
  s = s.replace(/\"/g,"").replace(/\\+/g,"/");
  s = require("path").resolve(s);
  s = s.replace(/[\/\\]+/g,"/").replace(/\/+$/g,"");
  return s;
}

const extra_args_from_command_line  = process.argv.slice(3)
     ,path_to_json                  = resolve_path( process.argv.slice(2,3).pop() )
     ,json_obj                      = require(path_to_json)
     ,child_process                 = require("child_process")
     ;

if(!json_obj.command){ throw new Error("[ERROR] missing command."); }

child_process.spawn(json_obj.command
                   ,json_obj.args
                   ,json_obj.spawn_options
                   );

process.exitCode = 0;
process.exit();
