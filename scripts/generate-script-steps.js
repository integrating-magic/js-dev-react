import { exec, spawn } from "node:child_process";

function pbcopy(data) {
  return new Promise((resolve, reject) => {
    const proc = spawn("pbcopy");

    proc.on("error", (error) => {
      reject(new Error(`Failed to run pbcopy: ${error.message}`));
    });

    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`pbcopy exited with code ${code}`));
        return;
      }
      resolve();
    });

    proc.stdin.on("error", (error) => {
      reject(new Error(`Failed writing to pbcopy: ${error.message}`));
    });

    proc.stdin.write(data);
    proc.stdin.end();
  });
}

function convertClipboardToFM() {
  return new Promise((resolve, reject) => {
    exec(
      "osascript -e 'set the clipboard to (do shell script \"pbpaste\" as «class XMSS»)'",
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to convert clipboard to FM steps: ${error.message}`
            )
          );
          return;
        }
        resolve();
      }
    );
  });
}

const xml = `<fmxmlsnippet type="FMObjectList"><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA[JSONGetElement ( Get ( ScriptParameter ) ; "callbackName" )]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$callbackName</Name></Step><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA[JSONGetElement ( Get ( ScriptParameter ) ; "promiseID" )]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$promiseID</Name></Step><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA[JSONGetElement ( Get ( ScriptParameter ) ; "parameter" )]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$parameter</Name></Step><Step enable="True" id="89" name="# (comment)"></Step><Step enable="True" id="89" name="# (comment)"><Text>Your logic here</Text></Step><Step enable="True" id="89" name="# (comment)"></Step><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA["web"]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$webviewerName</Name></Step><Step enable="True" id="175" name="Perform JavaScript in Web Viewer"><ObjectName><Calculation><![CDATA[$webviewerName]]></Calculation></ObjectName><FunctionName><Calculation><![CDATA[$callbackName]]></Calculation></FunctionName><Parameters Count="1"><P><Calculation><![CDATA[$promiseID]]></Calculation></P></Parameters></Step></fmxmlsnippet>`;

async function main() {
  await pbcopy(xml);
  console.log("\x1b[34mXML copied to clipboard.\x1b[0m");

  await convertClipboardToFM();
  console.log(
    "\x1b[32mConverted to script steps. Go paste it in your FM script!\x1b[0m"
  );
}

main().catch((error) => {
  console.error(`\x1b[31m${error.message}\x1b[0m`);
  process.exitCode = 1;
});
