import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import 'hammerjs';

import {AppComponent} from './app.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {ExcategoryComponent} from './components/excategory/excategory.component';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormField,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExcategoryService} from './services/excategory.service';
import {MenuComponent} from './components/menu/menu.component';
import {NonExCategoryComponent} from './components/non-ex-category/non-ex-category.component';
import {TransitsComponent} from './components/transits/transits.component';
import {MainComponent} from './components/main/main.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import {FeedbackCriteriaComponent} from './components/feedback-criteria/feedback-criteria.component';
import {AddUserComponent} from './components/add-user/add-user.component';

import {StopsComponent} from './components/stops/stops.component';
import {MessageComponent} from './components/message/message.component';
import {UserService} from './services/user.service';
import { FilterPipe } from './filter.pipe';
import { StopsGridComponent } from './components/stops/stops-grid.component';
import { BusyHoursDiagramComponent } from './components/stops/components/busy-hours-diagram/busy-hours-diagram.component';
import { RaitingDiagramComponent } from './components/stops/components/raiting-diagram/raiting-diagram.component';
import { AverageRateComponent } from './components/stops/components/average-rate/average-rate.component';
import { StatisticAverageRateComponent } from './components/stops/components/statistic-average-rate/statistic-average-rate.component';
import {DiagramService} from './services/diagram.service';
import { AddFeedbackComponent } from './components/stops/components/add-feedback/add-feedback.component';
import { FeedbackService } from './services/feedback.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    ExcategoryComponent,
    MenuComponent,
    NonExCategoryComponent,
    TransitsComponent,
    MainComponent,
    FeedbackCriteriaComponent,
    AddUserComponent,
    StopsComponent,
    MessageComponent,
    StopsComponent,
    FilterPipe,
    StopsGridComponent,
    BusyHoursDiagramComponent,
    RaitingDiagramComponent,
    AverageRateComponent,
    StatisticAverageRateComponent,
    AddFeedbackComponent
  ],
  exports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatSidenavModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    SlideshowModule,
    HttpClientModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatIconModule,
    MatCheckboxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ExcategoryService, UserService, DiagramService,FeedbackService],
  bootstrap: [AppComponent],
  entryComponents: [AddFeedbackComponent]
})
export class AppModule {
}
