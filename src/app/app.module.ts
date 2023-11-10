import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WildcardSearchPipe } from './wildcard-search.pipe';
import { NoEmptyInputDirective } from './no-empty-input.directive';
import { PaginationComponent } from './pagination/pagination.component';
import { HomeComponent } from './home/home.component';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';
import { ContactComponent } from './contact/contact.component';
import { CameraComponent } from './camera/camera.component';
 
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    WildcardSearchPipe,
    NoEmptyInputDirective,
    PaginationComponent,
    HomeComponent,
    CheckboxListComponent,
    ContactComponent,
    CameraComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
