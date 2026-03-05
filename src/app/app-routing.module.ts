import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SuggestionDetailsComponent } from './core/suggestion-details/suggestion-details.component';
import { AddSuggestionComponent } from './core/add-suggestion/add-suggestion.component';
import { UpdateSuggestionComponent } from './core/update-suggestion/update-suggestion.component';
import { AddAtelierNadineComponent } from './core/add-atelier-nadine/add-atelier-nadine.component';
import { ListAtelierNadineComponent } from './core/list-atelier-nadine/list-atelier-nadine.component';
import { AtelierDetailsNadineComponent } from './core/atelier-details-nadine/atelier-details-nadine.component';
import { UpdateAtelierNadineComponent } from './core/update-atelier-nadine/update-atelier-nadine.component';

const routes: Routes = [
  { path:'', redirectTo:'home', pathMatch:'full'},
  { path:'home', component: HomeComponent},
  { path:'suggestion/list', component: ListSuggestionComponent},
  { path:'suggestion/add', component: AddSuggestionComponent},
  { path:'suggestion/details/:id', component: SuggestionDetailsComponent},
  { path:'suggestion/update/:id', component: UpdateSuggestionComponent},
  { path:'atelier/list', component: ListAtelierNadineComponent},
  { path:'atelier/add', component: AddAtelierNadineComponent},
  { path:'atelier/details/:id', component: AtelierDetailsNadineComponent},
  { path:'atelier/update/:id', component: UpdateAtelierNadineComponent},
  { path:'annonce', loadChildren: () => import('./annonce/annonce.module').then( m => m.AnnonceModule) },
  { path:'user', loadChildren: () => import('./user/user.module').then( m => m.UserModule) },
  { path:'**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
