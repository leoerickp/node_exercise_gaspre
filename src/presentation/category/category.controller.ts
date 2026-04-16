import { Request, Response } from "express";
import { BuildTreeUseCase } from "../../application/use-cases";

export class CategoryController {
  constructor (
    private readonly buildTreeUseCase: BuildTreeUseCase
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
}