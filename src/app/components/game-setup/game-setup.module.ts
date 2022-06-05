import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { GameSetupComponent } from './game-setup.component';

@NgModule({
  declarations: [GameSetupComponent],
  imports: [MatRadioModule, MatButtonModule, ReactiveFormsModule],
  exports: [GameSetupComponent],
})
export class GameSetupModule {}
