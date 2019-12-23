import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProgressPage } from './progress.page';

const routes: Routes = [
  {
    path: 'progress',
    component: ProgressPage,
    children: [
      { 
       path: 'detail', 
       loadChildren: '../progress-detail/progress-detail.module#ProgressDetailPageModule' }

    ]
  },
  {
    path: '',
    redirectTo: 'progress/detail',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProgressPage]
})
export class ProgressPageModule {}
