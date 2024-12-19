import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en'); // Ngôn ngữ mặc định
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {}

  changeLanguage(language: string): void {
    this.currentLanguageSubject.next(language);
    console.log(`Ngôn ngữ đã chuyển đổi: ${language}`); // Log ngôn ngữ mới
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.getValue(); // Trả về ngôn ngữ hiện tại
  }
}