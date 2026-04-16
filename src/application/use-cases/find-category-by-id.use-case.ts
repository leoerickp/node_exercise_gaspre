import { Category } from "../../domain/interfaces/category.interface";

export class FindCategoryByIdUseCase {
  execute(root: Category, id: number): Category | null {
    if(root.id === id) return root;
    for(const subcategory of root.subcategories){
      const result = this.execute(subcategory, id);
      if(result) return result;
    }
    return null;
  }
}