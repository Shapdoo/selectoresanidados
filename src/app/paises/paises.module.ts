import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaisesRoutingModule } from './paises-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';


@NgModule({
  declarations: [
    SelectorPageComponent,
    PlaceholderComponent
  ],
  imports: [
    CommonModule,
    PaisesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaisesModule { }
