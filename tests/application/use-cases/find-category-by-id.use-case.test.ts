import { Category } from "../../../src/domain/interfaces/category.interface";
import { FindCategoryByIdUseCase } from "../../../src/application/use-cases";

describe('FindCategoryByIdUseCase', () => {
  it('should find a category by id', () => {
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
    const result = new FindCategoryByIdUseCase().execute(root, 3);
    expect(result).toEqual({ id: 3, name: 'Celulares', active: true, subcategories: [] });
  });
});