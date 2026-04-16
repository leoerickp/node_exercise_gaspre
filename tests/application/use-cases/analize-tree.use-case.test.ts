import { AnalizeTreeUseCase } from "../../../src/application/use-cases";
import { Category } from "../../../src/domain/interfaces/category.interface";

describe('AnalizeTreeUseCase', () => {
  it('should analize the tree', () => {
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
    const result = new AnalizeTreeUseCase().execute(root);
    expect(result).toEqual({
      anomalies: [],
      total: 6,
      active: 5,
      inactive: 1,
      maxDepth: 2
    });
  });
});