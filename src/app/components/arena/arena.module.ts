import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ArenaComponent } from './arena.component';

@NgModule({
  declarations: [ArenaComponent],
  imports: [CommonModule, MatRadioModule, MatButtonModule, ReactiveFormsModule],
  exports: [ArenaComponent],
})
export class ArenaModule {}
