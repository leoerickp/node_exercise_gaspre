import { Router } from "express";
import { CategoryController } from "./category.controller";
import { BuildTreeUseCase } from "../../application/use-cases";

export class CategoryRoutes {
  static get routes() {
    const router = Router();
    const categories = new CategoryController(
      new BuildTreeUseCase()
    );
    router.post('/', categories.buildTree);

    return router;
  }
}