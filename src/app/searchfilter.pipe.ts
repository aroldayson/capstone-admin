import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter',
  standalone: true
})
export class SearchfilterPipe implements PipeTransform {
  transform(items: any[], keyword: string): any[] {
    if (!items || !keyword) {
      return items; // Return original array if no keyword is entered
    }

    keyword = keyword.toLowerCase();

    // Handle both objects and primitive values
    return items.filter(item => {
      if (typeof item === 'object') {
        // Convert object values to string and search within them
        return Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(keyword);
      } else {
        // Handle primitive values (e.g., strings or numbers)
        return String(item).toLowerCase().includes(keyword);
      }
    });
  }

}
