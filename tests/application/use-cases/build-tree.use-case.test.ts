import { BuildTreeUseCase } from "../../../src/application/use-cases";
import { Category } from "../../../src/domain/interfaces/category.interface";

describe('BuildTreeUseCase', () => {
  it('should build the tree', () => {
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
    const result = new BuildTreeUseCase().execute(root);
    expect(result).toEqual(root);
  });

  it('should throw an error if the tree has a cycle', () => {
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
            { id: 5, name: 'Laptops', active: true, subcategories: [
              {
                id: 2,
                name: 'Computadoras',
                active: true,
                subcategories: [
                  { id: 5, name: 'Laptops', active: true, subcategories: [] },
                  { id: 6, name: 'Desktops', active: false, subcategories: [] }
                ]
              }
            ] },
            { id: 6, name: 'Desktops', active: false, subcategories: [] }
          ]
        },
        { id: 3, name: 'Celulares', active: true, subcategories: [] },
        { id: 4, name: 'Accesorios', active: true, subcategories: [] }
      ]
    };
    expect(() => new BuildTreeUseCase().execute(root)).toThrow('Cycle detected');
  });

  it('should throw an error if the tree has  a duplicate id', () => {
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
        { id: 2, name: 'Celulares', active: true, subcategories: [] },
        { id: 4, name: 'Accesorios', active: true, subcategories: [] }
      ]
    };
    expect(() => new BuildTreeUseCase().execute(root)).toThrow('Duplicate ID');
  });

  it('should throw an error if the tree is empty', () => {
    expect(() => new BuildTreeUseCase().execute({})).toThrow('Empty tree');
    expect(() => new BuildTreeUseCase().execute(null)).toThrow('Empty tree');
  });

  it('should throw an error if the tree is invalid', () => {
    const root = {
      id: '1',
      name: 'Electrónica',
      active: true,
      subcategories: []
    };
    expect(() => new BuildTreeUseCase().execute(root)).toThrow('INVALID_ID');
    expect(() => new BuildTreeUseCase().execute(null)).toThrow('Empty tree');
  });
});