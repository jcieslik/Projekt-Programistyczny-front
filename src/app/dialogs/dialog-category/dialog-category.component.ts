import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent {

  currentCategories: Category[] = [];

  childrenIds: number[] = [];

  isChildrenCategories = false;

  constructor(
    public dialogRef: MatDialogRef<DialogCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category[]) {
    this.currentCategories = this.data.filter(category => {
      return category.parentCategoryId == null;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getButtonColor(index: number): string {
    switch (index % 3) {
      case 0:
        return 'primary';
      case 1:
        return 'accent';
      case 2:
        return 'warn';
      default:
        return '';
    }
  }

  selectCategory(category: Category) {
    this.isChildrenCategories = true;
    if (category.childrenCategories.length > 0) {
      this.childrenIds = [];
      category.childrenCategories.forEach(cat => {
        this.childrenIds.push(cat.id);
      })
      this.currentCategories = this.data.filter(cat => {
        return this.childrenIds.includes(cat.id);
      })
      return;
    }
    else {
      this.dialogRef.close(category);
    }
  }

  goBack() {
    this.currentCategories = this.data.filter(category => {
      return category.parentCategoryId == null;
    })
    this.isChildrenCategories = false;
  }
}
