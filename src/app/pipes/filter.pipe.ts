import { Pipe, PipeTransform } from '@angular/core';
import { Iuser } from '../model/user.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any | Iuser[], searchText: string): any[] {
     const loweSearchTxt=searchText.toLocaleLowerCase()
    if (!items) {
      return []
    }
    if (!searchText) {
      return items
    }
    return items.filter((elment: Iuser) => {
      const full_name = elment.first_name.concat(" ", elment.last_name).toLocaleLowerCase();
      return (elment.id.toString().includes(loweSearchTxt) || full_name.includes(loweSearchTxt) || elment.email.toLocaleLowerCase().includes(loweSearchTxt))

    })

  }

}
