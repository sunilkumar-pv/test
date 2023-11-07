import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wildcardSearch'
})
export class WildcardSearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    const filteredItems = items.filter(item => {
      return item.name.toLowerCase().includes(searchText);
    });

    if (filteredItems.length === 0) {
      return [{ id: 'not-found', name: 'Search not found' }]; 
    }

    return filteredItems;
  }
}
