<h1><code>run.js</code></h1>

1. create the following file `run_calc.js` with the following content:  

```js
module.exports = {
 command : "calc.exe"
,spawn_options : {
   "stdio"                     : "ignore"
  ,"detached"                  : true
  ,"shell"                     : false
  ,"windowsVerbatimArguments"  : false
  ,"windowsHide"               : true
  ,"timeout"                   : undefined
 }
}
```

2. copy `nodew_run_.exe` and rename its name to `nodew_run_calc.exe` .

3. run `nodew_run_calc.exe`  

or just run `nodew.exe run.js run_calc.js`,  
or create a shortcut, or start-run, or cmd.  

the benefit of using `nodew_run_.exe` is avoiding using `cmd`/`powershell`/`explorer.exe` (I.E. "shell") to launch the program.  




<hr/>

this is a way to use NodeJS' `.spawn` to launch a program,  
`nodew.exe` is a modified `node.exe` binary, that has been set to Windows-SubSystem,  
I.E. the OS will not assign a stdout/error/input pipe to it - so it won't show a console window.  

<hr/>
<br/>

<h3>run programs, using <a href="https://nodejs.org/api/child_process.html#child_processspawncommand-args-options"><code>.spawn</code></a> and a "running script", optionally without showing the console window</h3>


I've made a very simple, yet effective way,  
of running a process in Windows,  
while trying to avoid using CMD and powershell as a middle-man,  
but also be able to using the <del>JSON</del> JS-Object feature of native JavaScript.  
it is pretty much a way to expose `.spawn`.

<hr/>

<a href="https://paypal.me/%65%31%61%64%6B%61%72%61%6B%30/%35%55%53%44" title="show your support">♥</a>  

<br/>


- no dependencies.  
- you can use relative paths in the running script.
- you can use stuff like `process.env` or `process.cwd()` or anything else in the running script.
- you can 100% avoid CMD/powershell hell! - no need to escape stuff with `%` (but you are able to use `shell` if you s (unless you want to use `shell` if you so wish).  
- simple to read, easy to modify/expand.
- designed for personal usage, I.E. it is just like running any command on your machine - risky if you don't know what you are doing - in other words, don't run `del /s C:\*` or `format c:`.  
- a modified node binaries provided (`nodew.exe` - without console-window, and `node.exe`). instructions provided on how to make those yourself.  
- minimal checked exist, use on your own risk.

<hr/>

<h3>two examples are provided</h3>

`nodew.exe run.js run_calc.js`  
is probably the simplest example possible,  
`calc.exe` is available (on your Windows) in a folder that exists in the `PATH` environment variable,  
meaning you can call it, and it will work. the example uses the default spawn options to "launch and forget" the exe,  
I.E. it will not wait for it.


`nodew.exe run.js run_chrome_dev.js`  
pretty much the reason I started it,  
I already have several (old) run projects,  
that used ini.  
but Chrome has a massive amount of arguments,  
spawn accepts an array by default which allows to use a JSON like structure (JS-object really)  
and break the arguments over several lines,  
I also broke long arguments into a multiple-line string, which I've normalized to single line right there in the running script.
the arguments are sent 'as is' to the exe,  
meaning not through the shell middle-man (cmd),  
so no need to wrap stuff with `" "` unless I want `chrome.exe` to have it,  
which I did in stuff like `--enable-features` (although not really needed).  
there are other benefits such as not creating the process as a sub-process of `cmd.exe`, nor `conhost.exe`, nor `explorer.exe`.  

to run the command you can use start-run,  
create a shortcut or launch cmd.  
and having `nodew.exe` (or `node.exe` if you prefer) available in the `PATH` or same folder.  

a more self-contained example might be using .net, or C++  
and ShellExecute, but it means most of the native JS-object (JSON) functionality will be lost..

<br/>
<br/>

when I starting building the `run.js` script,  
I've actually in a similar manner to previous c# and vb clients,  
by parsing the file that holds the data (be it a json, or ini),  
after few iterations, I've figured that most of the code is there,  
to make the json into a javascript code, collapsing multi-line,  
adding support for comments, adding special replacement to include the current folder, etc..  
eventually I just figured there is no need to place the data in json then parse it,  
just building a valid js file is perfectly fine, and the require mechanism is already pretty much  
what I've needed. it means the so-called data-file, is a js-file, capable of using the entire extended javascript syntax 
without any adjustments (other than adding module export) and the actual launcher is basically really is just a launcher (i.e. execute spawn),  
with very minimal checks. that native it is something that you can not do with any other language (without a ton of pre-adjustments),  
it isn't very safe, since the module provided can run any code, but js is a scripting language, 
meaning you can just pre-view the very small amount of code beforehand.  



<hr/>
<br/>

<h2>TL;DR..</h2>

```txt
how to use?
----------------
1. create a new .js file (for example "run_chrome_dev.js")
2. create an object with 
     - command - string
     - args - array of strings (optional)
     - spawn_options - object (optional) as explain in https://nodejs.org/api/child_process.html#child_processspawncommand-args-options 
   
   note:
   use any nodejs commands to arrange your object, 
     - process.cwd() can help you get the current working folder
     - you can break long lines using ` ` multi-line string syntax, 
       then make it into a single line using .replace(/[\r\n]/gm,"") again.

3. assign the object to module.exports =
4. run:
     node run.js "run_chrome_dev.js"
   note: you can create a shortcut

5. avoiding console window:
     - make your self a node.exe that does not show a console 
       download node.exe
       https://nodejs.org/download/nightly/v20.0.0-nightly20221214cf0a42cf11/win-x64/node.exe
       look in your computer for "editbin.exe" 
       and run: "editbin.exe" /NOLOGO "/SUBSYSTEM:WINDOWS" "node.exe"
       you can also download https://github.com/eladkarako/manifest/archive/refs/heads/master.zip
       and drag-and-drop node.exe over "_set_subsystem_windows.cmd"
       (it will make Windows to avoid assigning a standard-error/output/input pipe to the exe).
     - optionally rename node.exe to nodew.exe ("java convention").
     - advised: if you are launching a batch file, explicitly use cmd.exe /c or cmd.exe /k
     - optionally specify the hide window option.
     - advised: specify deatached true to avoid the node (nodew) process from hanging.

note:
you can use relative paths for forward slash in the command,  
you can also use double-backward slash.
the command is normalized.

note: 
all args are used as is.
if you need "" add them.

note: 
if you'll use "shell" you'll be able to launch files 
that have associations in Windows, such as PDF or DOCX.
but it also means you'll need to handle characters such as ^ | % 

note: 
try avoid creating a batch file to launch the command-line,  
just create a shortcut.

note:
the exe provided were slightly modified using https://github.com/eladkarako/manifest
and compressed with the new upx 4.0.1 (https://github.com/upx/upx) and:
upx.exe --best --lzma -f --backup -v --color *.exe
to reduce their file-size from 70MB to 15MB.
it is a known fact antivirus-program do not like it.
you can avoid those and just download and use your own node,  
and create nodew (Windows subsystem) as explained above.

all of MY work is licensed under public domain (The UnLicensed), 
you are free to use, fork and modify. no support.

EladKarako December 2022.

```

