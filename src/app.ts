import { RoutesApp } from "./presentation/routes";
import { Server } from "./presentation/server";

(async() => {
  main();
})()

function main() {
  const server = new Server({
    port: 3000,
    publicPath: 'public',
    routes: RoutesApp.routes,
  });
  server.start();
}