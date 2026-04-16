import { Request, Response } from "express";
import { BuildTreeUseCase, GetActiveLeafPathsUseCase } from "../../application/use-cases";
import { rootStore } from "../../domain/datasources/category/root.datasource";
import { HttpError } from "../../shared/errors/http-error";

export class CategoryController {
  constructor (
    private readonly buildTreeUseCase: BuildTreeUseCase,
    private readonly getActiveLeafPathsUseCase: GetActiveLeafPathsUseCase,
  ){}

  public buildTree = (req: Request, res: Response) => {
    const newRoot = req.body;
    try {
      const tree = this.buildTreeUseCase.execute(newRoot);
      return res.json(tree);
    } catch (error) {
      if(error instanceof Error){
        throw new Error(error.message);
      }
      throw new Error('Unknown error');
    }    
  }

  public getActiveLeafPaths = (req: Request, res: Response) => {
    const root = rootStore.get();
    if(!root){
      throw new HttpError(404, 'Categories are empty');
    }
    const paths = this.getActiveLeafPathsUseCase.execute(root);
    return res.json(paths);
  }
}