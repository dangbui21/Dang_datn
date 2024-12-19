import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../@core/services/language.service';

@Component({
  selector: 'ngx-chart-guide',
  templateUrl: './chart-guide.component.html',
  styleUrls: ['./chart-guide.component.scss']
})
export class ChartGuideComponent implements OnInit {
  currentLanguage: string = 'en';

  constructor(private languageService: LanguageService) {
    // Lắng nghe sự thay đổi ngôn ngữ
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  ngOnInit() {
    // Lấy ngôn ngữ hiện tại khi component được khởi tạo
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }
}
