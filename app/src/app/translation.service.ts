import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private baseUrl = 'https://babyrentacar-b0505.cognitiveservices.azure.com/';
  private apiKey = '6f3a832fb3624dcfac55658d8f75f309';
  private region = 'westeurope'

  constructor(private http: HttpClient) {}

  translateText(text: string, targetLanguage: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Ocp-Apim-Subscription-Key', this.apiKey)
      .set('Ocp-Apim-Subscription-Region',this.region);
    const body = [{
      text: text
    }];
    const params = new HttpParams()
      .set('to', targetLanguage);

    return this.http.post(`${this.baseUrl}`, body, { headers, params });
  }
}
