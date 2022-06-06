import { Router } from "express";
import fs from "fs";
const routes = Router();

const entities = fs.readdirSync("./src/entities");
(async () => {
  for (const entity of entities) {
    const router = await import(`../entities/${entity}/router.js`);
    routes.use(`/`, router.default);
  }
})();

export default routes;
