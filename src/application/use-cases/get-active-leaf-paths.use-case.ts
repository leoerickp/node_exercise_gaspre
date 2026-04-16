import { Category } from "../../domain/interfaces/category.interface";

export class GetActiveLeafPathsUseCase {
  private paths: string[] = [];
  execute(root: Category): string[] {
    this.dfs(root, [], true);
    return this.paths;
  } 

  private dfs(node: Category, path: string[], isActive: boolean) {
    if (!node || !node.active || !isActive) return;

    const currentPath = [...path, node.name.trim()];
    const children = node.subcategories ?? [];

    if (children.length === 0) {
      this.paths.push(currentPath.join('/'));
      return;
    }

    for (const child of children) {
      this.dfs(child, currentPath, isActive && node.active);
    }
  }
}