import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { FeaturesService } from 'src/app/services/features.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  searchcontrol = new FormControl('')

  @Output("searchText") searchText = new EventEmitter<string>()
  text: string = "";

  constructor(private featureService: FeaturesService) { }


  ngOnInit(): void {
    this.searchcontrol.valueChanges
      .pipe(
        debounceTime(500)
      ).subscribe((val: any) => {
        this.featureService.searchInpText.next(val)
      })

  }




}
