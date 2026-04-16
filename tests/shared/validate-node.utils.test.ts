import { validateNode } from "../../src/shared/utils/validate-node.utils";
import { Category } from "../../src/domain/interfaces/category.interface";

describe('ValidateNodeUseCase', () => {
  it('should validate the node', () => {
    const root: Category = {
      id: 1,
      name: 'Electrónica',
      active: true,
      subcategories: [
        {
          id: 2,
          name: 'Computadoras',
          active: true,
          subcategories: [
            { id: 5, name: 'Laptops', active: true, subcategories: [] },
            { id: 6, name: 'Desktops', active: false, subcategories: [] }
          ]
        },
        { id: 3, name: 'Celulares', active: true, subcategories: [] },
        { id: 4, name: 'Accesorios', active: true, subcategories: [] }
      ]
    };
    const result = validateNode(root, new Map<number, Category>());
    expect(result).toBeNull();
  });

  it('should throw an error if the node is invalid', () => {
    expect(validateNode({}, new Map<number, Category>())).toBe('INVALID_ID');
    expect(validateNode(null, new Map<number, Category>())).toBe('INVALID_NODE');
    expect(validateNode(undefined, new Map<number, Category>())).toBe('INVALID_NODE');
    expect(validateNode(1, new Map<number, Category>())).toBe('INVALID_NODE');
    expect(validateNode('1', new Map<number, Category>())).toBe('INVALID_NODE');
    expect(validateNode(true, new Map<number, Category>())).toBe('INVALID_NODE');
    expect(validateNode(false, new Map<number, Category>())).toBe('INVALID_NODE');
    expect(validateNode([], new Map<number, Category>())).toBe('INVALID_ID');
  });

  it('should throw an error if the node has an invalid id', () => {
    const root = {
      id: '1',
      name: 'Electrónica',
      active: true,
      subcategories: []
    };
    expect(validateNode(root, new Map<number, Category>())).toBe('INVALID_ID');
  });

  it('should throw an error if the node has an invalid name', () => {
    const root = {
      id: 1,
      name: '',
      active: true,
      subcategories: []
    };
    expect(validateNode(root, new Map<number, Category>())).toBe('INVALID_NAME');
  });

  it('should throw an error if the node has an invalid subcategories', () => {
    const root = {
      id: 1,
      name: 'Electrónica',
      active: true,
      subcategories: 'hola'
    };
    expect(validateNode(root, new Map<number, Category>())).toBe('INVALID_SUBCATEGORIES');
  });
});