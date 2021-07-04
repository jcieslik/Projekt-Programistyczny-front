export class Category {
  name: string;
  parentCategoryId?: number;
  childrenCategories: Category[];
  id: number;
}