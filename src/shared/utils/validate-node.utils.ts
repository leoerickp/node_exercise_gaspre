
export const validateNode = (node: any, map: Map<number, any>): string | null => {
  if (!node || typeof node !== 'object') {
    return 'INVALID_NODE';
  }

  if (typeof node.id !== 'number') {
    return 'INVALID_ID';
  }

  if (!node.name || !node.name.trim()) {
    return 'INVALID_NAME';
  }

  if (map.has(node.id)) {
    throw new Error(`Duplicate ID: ${node.id}`);
  }

  if (
    node.subcategories !== undefined &&
    !Array.isArray(node.subcategories)
  ) {
    return 'INVALID_SUBCATEGORIES';
  }

  return null;
}