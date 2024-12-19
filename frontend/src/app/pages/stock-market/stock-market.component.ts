import { Component } from '@angular/core';
import { LanguageService } from '../../@core/services/language.service';


@Component({
  selector: 'ngx-stock-market',
  templateUrl: './test.component.html',
  styleUrls: ['./stock-market.component.scss']
})
export class StockMarketComponent  {
  currentLanguage: string = 'en';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // Lắng nghe sự thay đổi ngôn ngữ từ LanguageService
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }
  
}
