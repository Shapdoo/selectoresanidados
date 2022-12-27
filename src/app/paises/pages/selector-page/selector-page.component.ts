import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap, tap, timeout } from 'rxjs';
import { PaisSmall } from '../../interfaces/paises.interfaces';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css'],
})
export class SelectorPageComponent implements OnInit {
  public flag = false;

  public selectsForm: FormGroup = this._fb.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]],
  });

  public $paises = new Observable<PaisSmall[]>();
  public $borders = new Observable<PaisSmall[]>();

  public regions: string[] = [];

  constructor(private _fb: FormBuilder, private _ps: PaisesService) {}

  ngOnInit(): void {
    this.regions = this._ps.regiones;

    //Cuando cambie la region
    this.$paises = this.selectsForm?.controls['region']?.valueChanges.pipe(
      tap((_) => {
        this.selectsForm?.controls['pais']?.reset('');
        this.flag = true;
      }),
      switchMap((region) => {
        return this._ps.getPaisesPorRegion(region);
      }),
      tap((_) => (this.flag = false))
    );

    //Cuando cambie el pais
    this.$borders = this.selectsForm?.controls['pais']?.valueChanges.pipe(
      tap((_) => {
        this.selectsForm?.controls['frontera']?.reset('');
        this.flag = true;
      }),
      switchMap((code) => this._ps.getPaisesPorCCA3(code)),
      switchMap((pais) => {
        const country = pais?.[0].borders || [];
        return this._ps.getPaisesPorCodigos(country);
      }),
      tap((_) => {
        this.flag = false;
      }));
  }

  guardar(): void {
    console.log(this.selectsForm.value);
  }
}
