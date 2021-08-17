import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './model/acoes';
import { AcoesService } from './acoes.service';
import { switchMap, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes();

  acoesFiltradas$ = this.acoesInput.valueChanges.pipe(
    tap(console.log),
    switchMap((value) => this.acoesService.getAcoes(value)),
    tap(console.log)
  );
  acoes$ = merge(this.todasAcoes$, this.acoesFiltradas$);

  constructor(private acoesService: AcoesService) {}
}
