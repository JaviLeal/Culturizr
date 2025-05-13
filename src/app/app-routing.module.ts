import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { AboutComponent } from './components/about/about.component';
import { DoubtsComponent } from './components/doubts/doubts.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'about', component: AboutComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'doubts', component: DoubtsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
