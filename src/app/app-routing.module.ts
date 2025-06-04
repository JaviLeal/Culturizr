import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { AboutComponent } from './components/about/about.component';
import { DoubtsComponent } from './components/doubts/doubts.component';
import { HomeComponent } from './components/home/home.component';
import { ChronometerComponent } from './components/game_modes/chronometer/chronometer.component';
import { ClassicComponent } from './components/game_modes/classic/classic.component';
import { OneThemeComponent } from './components/game_modes/one-theme/one-theme.component';
import { ExtremeComponent } from './components/game_modes/extreme/extreme.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'about', component: AboutComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'doubts', component: DoubtsComponent },
  { path: 'home', component: HomeComponent },
  { 
    path: 'classic', 
    component: ClassicComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chrono',
    component: ChronometerComponent,
    canActivate: [AuthGuard]
  },  
  { path: 'onetheme', 
    component: OneThemeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'extreme', 
    component: ExtremeComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
