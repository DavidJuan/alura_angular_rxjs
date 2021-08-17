import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './model/acoes';
import { AcoesService } from './acoes.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { merge } from 'rxjs';

const TEMPO_DE_ESPERA = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes();

  acoesFiltradas$ = this.acoesInput.valueChanges.pipe(
    debounceTime(TEMPO_DE_ESPERA),
    tap(console.log),
    filter((value) => value.length >= 3 || !value.length),
    distinctUntilChanged(),
    switchMap((value) => this.acoesService.getAcoes(value)),
    tap(console.log)
  );
  acoes$ = merge(this.todasAcoes$, this.acoesFiltradas$);

  constructor(private acoesService: AcoesService) {}
}
