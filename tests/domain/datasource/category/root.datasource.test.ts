import { rootStore } from "../../../../src/domain/datasources/category/root.datasource";

describe('RootStore', () => {
  it('should set and get the root', () => {
    const root = {
      id: 1,
      name: 'Electrónica',
      active: true,
      subcategories: []
    };
    rootStore.set(root);
    expect(rootStore.get()).toEqual(root);
  });

  it('should clear the root', () => {
    rootStore.clear();
    expect(rootStore.get()).toBeNull();
  });
});