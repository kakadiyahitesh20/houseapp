import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpModule} from '@angular/http';
import {HouseService} from "./House-service";



@NgModule({
    declarations: [AppComponent],
    imports:      [BrowserModule,HttpModule],
    bootstrap:    [AppComponent],
    providers: [HouseService      ]
})
export class AppModule {}
