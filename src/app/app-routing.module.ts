import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaComponent } from './components/arena/arena.component';
import { GameSetupComponent } from './components/game-setup/game-setup.component';

const routes: Routes = [
  {
    path: 'setup-game',
    component: GameSetupComponent,
    loadChildren: () =>
      import('./components/game-setup/game-setup.module').then(
        (m) => m.GameSetupModule
      ),
  },
  {
    path: 'arena',
    component: ArenaComponent,
    loadChildren: () =>
      import('./components/arena/arena.module').then((m) => m.ArenaModule),
  },
  {
    path: '',
    redirectTo: '/setup-game',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
