import { Category } from "../../domain/interfaces/category.interface";

interface Anomaly{
  code: string;
  path?: string;
  id?: number;
}
export class AnalizeTreeUseCase {
  private anomalies: Anomaly[] = [];
  private visited = new Set<number>();
  private total:number = 0;
  private active: number = 0;
  private inactive: number = 0;
  private maxDepth: number = 0;

  execute(root: Category){
    this.dfs(root, [], 0);
    return {
      anomalies: this.anomalies,
      total: this.total,
      active: this.active,
      inactive: this.inactive,
      maxDepth: this.maxDepth
    };
  }

  private dfs(node: Category, path: string[], depth: number){
    if (!node) {
      this.anomalies.push({ code: 'NULL_CHILD', path: path.join('/') });
      return;
    }

    if (typeof node.id !== 'number') {
      this.anomalies.push({ code: 'INVALID_ID', path: path.join('/') });
      return;
    }

    if (this.visited.has(node.id)) {
      this.anomalies.push({ code: 'DUPLICATE_ID', id: node.id });
      return;
    }

    this.visited.add(node.id);

    this.total++;
    node.active ? this.active++ : this.inactive++;

    this.maxDepth = Math.max(this.maxDepth, depth);

    if (!Array.isArray(node.subcategories)) {
      this.anomalies.push({
        code: 'INVALID_SUBCATEGORIES',
        id: node.id,
      });
      return;
    }

    for (const child of node.subcategories) {
      this.dfs(child, [...path, node.name], depth + 1);
    }
  }
}