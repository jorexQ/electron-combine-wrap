import { BootstrapCore } from "./bootstrap/bootstrap-core";

const bootstrap = BootstrapCore.impl({
  startOptionFile: "C:/Users/q6286/Desktop/myContent/DocumentTemplateEditor/dist/electron-start-config.json"
});

bootstrap.open();

console.log("setup success");
