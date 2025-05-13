import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QuestionComponent } from './components/question/question.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { AboutComponent } from './components/about/about.component';
import { DoubtsComponent } from './components/doubts/doubts.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    RankingComponent,
    AboutComponent,
    DoubtsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
