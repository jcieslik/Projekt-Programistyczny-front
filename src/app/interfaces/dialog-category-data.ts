import { Category } from "../models/category";

export interface DialogCategoryData {
    categories: Category[];
    selectedCategory: Category;
  }