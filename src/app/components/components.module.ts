import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class ComponentsModule { }
