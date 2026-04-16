import { Router } from "express";
import { CategoryRoutes } from "./category/routes";

export class RoutesApp {
  static get routes() {
    const router = Router();

    router.use('/api/categories', CategoryRoutes.routes);
    
    return router;
  }
}