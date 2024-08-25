import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/main-store/store';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalPages!: number;
  @Input() currentPage!: number;
  @Output()pageNum=new EventEmitter<number>()
  pagesNums: number[] = [];

    constructor(private store: Store<IAppState>) { }

  ngOnInit(): void { }



  ngOnChanges(changes: SimpleChanges): void {
    this.getPagesNum()


  }
  getPagesNum() {
    this.pagesNums = Array.from({ length: this.totalPages }, (_, i) => {
      return i + 1
    })
  }

  onPageIndexChange(index: number) {
    this.pageNum.emit(index)

  }
}
