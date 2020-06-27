import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatInputModule } from '@angular/material/input'
import {MatListModule} from '@angular/material/list';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    PerfectScrollbarModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    PerfectScrollbarModule
  ],
  providers:[{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
}],
})
export class MaterialModule {}

