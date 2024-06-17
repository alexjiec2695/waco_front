import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { AuthGuard } from './auth/auth.guard';
import { BasicdataComponent } from './pages/basicdata/basicdata.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "pokemons", component: PokemonsComponent, canActivate: [AuthGuard] },
  { path: "basicdata", component: BasicdataComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
