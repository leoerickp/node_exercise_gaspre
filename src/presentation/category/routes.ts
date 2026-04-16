import { Router } from "express";
import { CategoryController } from "./category.controller";
import { AnalizeTreeUseCase, BuildTreeUseCase, FindCategoryByIdUseCase, GetActiveLeafPathsUseCase } from "../../application/use-cases";

export class CategoryRoutes {
  static get routes() {
    const router = Router();
    const categories = new CategoryController(
      new BuildTreeUseCase(),
      new GetActiveLeafPathsUseCase(),
      new AnalizeTreeUseCase(),
      new FindCategoryByIdUseCase()
    );
    router.post('/', categories.buildTree);
    router.get('/active-leaf-paths', categories.getActiveLeafPaths);
    router.get('/analize', categories.analizeTree);
    router.get('/:id', categories.findCategoryById);

    return router;
  }
}