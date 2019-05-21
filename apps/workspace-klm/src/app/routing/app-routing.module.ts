import { HomeComponent } from '@libs/home/src/index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'home' },
    pathMatch: 'full'
  },
  {
    data: { animation: 'not-found' },
    loadChildren: '@libs/not-found/src/index#NotFoundModule',
    path: 'not-found'
  },
  // Routes parses from top to bottom, thus put '**' is at the end.
  {
    path: '**', // Wildcard path, which means to catch all other routes, not specified above.
    redirectTo: 'not-found', // Alternative to component in routes, which redirects to specific path.
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }) // Don't scroll down automatically on route change.
  ]
})
export class RoutingModule {}
