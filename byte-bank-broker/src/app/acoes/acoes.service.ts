import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(
    private httpClient: HttpClient,
    private sharedModule: SharedModule
  ) { }

  getAcoes() {
    return this.httpClient.get<any>('http://localhost:3000/acoes')
    // return this.httpClient.get<any>(`${this.sharedModule.api}/acoes`)
  }
}
