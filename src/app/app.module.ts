import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QuestionComponent } from './components/question/question.component';
import { AuthComponent } from './components/auth/auth.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { AboutComponent } from './components/about/about.component';
import { DoubtsComponent } from './components/doubts/doubts.component';
import { HomeComponent } from './components/home/home.component';
import { ChronometerComponent } from './components/game_modes/chronometer/chronometer.component';
import { ClassicComponent } from './components/game_modes/classic/classic.component';
import { OneThemeComponent } from './components/game_modes/one-theme/one-theme.component';
import { ExtremeComponent } from './components/game_modes/extreme/extreme.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    RankingComponent,
    AboutComponent,
    DoubtsComponent,
    HomeComponent,
    ChronometerComponent,
    ClassicComponent,
    OneThemeComponent,
    ExtremeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
