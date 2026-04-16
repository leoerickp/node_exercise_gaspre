import { detectCycle } from "../../src/shared/utils/detect-cycle.utils";
import { Category } from "../../src/domain/interfaces/category.interface";

describe('DetectCycleUseCase', () => {
  it('should detect cycle', () => {
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
    const result = detectCycle(root);
    expect(result).toBe(false);
  });
});