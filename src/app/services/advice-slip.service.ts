import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AdviceSlipModel } from '../models/slip-models';

@Injectable({
  providedIn: 'root'
})
export class AdviceSlipService {
  constructor(private http: HttpClient) { }

  /** 
   * GET random advice slip from the server
   * 
   * @returns Observable
   */
  getRandomAdvice(): Observable<AdviceSlipModel> {
    return this.http.get<AdviceSlipModel>(`${environment.base_url}advice`);
  }

  /** 
   * Search the advice slip from the server
   * 
   * @returns Observable
   */
  getSearchedAdvice(searchQuery: string): Observable<AdviceSlipModel> {
    return this.http.get<AdviceSlipModel>(`${environment.base_url}advice/search/${searchQuery}`);
  }
}
