// src/app/checkbox-list/checkbox.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckboxService {

  toggleSelectAll(checkboxes: HTMLInputElement[]): boolean {
    const anyUnchecked = checkboxes.some((checkbox) => !checkbox.checked);
    const toggleValue = anyUnchecked;

    for (const checkbox of checkboxes) {
      checkbox.checked = toggleValue;
    }

    return toggleValue;
  }

  toggleCheckbox(checkbox: HTMLInputElement): boolean {
    checkbox.checked = !checkbox.checked;
    return checkbox.checked;
  }

  updateSelectedCheckboxes(
    checkboxes: HTMLInputElement[],
    jsonData: any[]
  ): string {
    const selectedNames = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => {
        const itemId = checkbox.value;
        const item = jsonData.find((dataItem) => dataItem.id.toString() === itemId);
        return item ? item.name : '';
      });

    return selectedNames.join(', ');
  }
  
}
