import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './model/acoes';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(
    private httpClient: HttpClient,
    private sharedModule: SharedModule
  ) {}

  getAcoes(value?: string) {
    const params = value ? new HttpParams().append('valor', value) : undefined;
    return this.httpClient
      .get<AcoesAPI>(`${this.sharedModule.api}/acoes`, { params })
      .pipe(
        tap((valor) => console.log(valor)),
        pluck('payload'),
        map((acoes) =>
          acoes.sort((acaoA, acaoB) => this.orderByCode(acaoA, acaoB))
        )
      );
  }

  private orderByCode(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }
    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }

    return 0;
  }
}
