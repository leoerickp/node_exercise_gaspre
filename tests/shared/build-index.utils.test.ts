import { buildIndex } from "../../src/shared/utils/build-index.utils";
import { Category } from "../../src/domain/interfaces/category.interface";

describe('BuildIndexUseCase', () => {
  it('should build the index', () => {
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
    const result = buildIndex(root);
    expect(result).toEqual(new Map<number, Category>([
      [1, root],
      [2, root.subcategories[0]],
      [5, root.subcategories[0].subcategories[0]],
      [6, root.subcategories[0].subcategories[1]],
      [3, root.subcategories[1]],
      [4, root.subcategories[2]]
    ]));
  });
});