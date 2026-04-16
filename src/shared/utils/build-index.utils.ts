import { validateNode } from "./validate-node.utils";

export function buildIndex(root: any): Map<number, any> {
  const map = new Map<number, any>();
  if(!root || Object.keys(root).length === 0){
    return map;
  }
  const dfs = (node: any) => {
    const validationError = validateNode(node, map);    
    if(validationError){
      throw new Error(validationError);
    }

    map.set(node.id, node);

    for (const child of node.subcategories ?? []) {
      dfs(child);
    }
  } 

  dfs(root);

  return map;
}