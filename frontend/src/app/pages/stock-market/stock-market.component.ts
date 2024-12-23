import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../@core/services/language.service';

@Component({
  selector: 'ngx-stock-market',
  templateUrl: './stock-market.component.html',
  styleUrls: ['./stock-market.component.scss']
})
export class StockMarketComponent implements OnInit {
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
