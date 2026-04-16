export const detectCycle = (root: any): boolean => {
  const visited = new Set<number>();
  const stack = new Set<number>();

  function dfs(node: any): boolean {
    if (!node) return false;

    if (stack.has(node.id)) return true;
    if (visited.has(node.id)) return false;

    visited.add(node.id);
    stack.add(node.id);

    for (const child of node.subcategories ?? []) {
      if (dfs(child)) return true;
    }

    stack.delete(node.id);
    return false;
  }

  return dfs(root);
}