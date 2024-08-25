import { Component, OnInit } from '@angular/core';
import { LoaderSpinnerService } from 'src/app/services/loader-spinner.service';

@Component({
  selector: 'app-loadin-spinner',
  templateUrl: './loadin-spinner.component.html',
  styleUrls: ['./loadin-spinner.component.scss']
})
export class LoadinSpinnerComponent implements OnInit {

  
  readonly loader$ = this.loadingSpinner.isLoadin$;

  constructor(private loadingSpinner: LoaderSpinnerService) { }

  ngOnInit(): void {
  }

}
