import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../@core/services/language.service';

@Component({
  selector: 'ngx-technical-charts',
  templateUrl: './technical-charts.component.html',
  styleUrls: ['./technical-charts.component.scss']
})
export class TechnicalChartsComponent implements OnInit {
  currentLanguage: string = 'en';

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }
}
