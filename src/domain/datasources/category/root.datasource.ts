import { Category } from "../../interfaces/category.interface";


class RootStore {
  private root: Category | null = null;

  set(root: Category) {
    this.root = root;
  }

  get(): Category | null {
    return this.root;
  }

  clear() {
    this.root = null;
  }
}

export const rootStore = new RootStore();