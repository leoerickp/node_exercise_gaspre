import { Router } from "express";
import { CategoryController } from "./category.controller";
import { BuildTreeUseCase, GetActiveLeafPathsUseCase } from "../../application/use-cases";

export class CategoryRoutes {
  static get routes() {
    const router = Router();
    const categories = new CategoryController(
      new BuildTreeUseCase(),
      new GetActiveLeafPathsUseCase()
    );
    router.post('/', categories.buildTree);
    router.get('/active-leaf-paths', categories.getActiveLeafPaths);

    return router;
  }
}