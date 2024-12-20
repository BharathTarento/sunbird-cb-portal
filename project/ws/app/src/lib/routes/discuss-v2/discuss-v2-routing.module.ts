import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussV2HomeComponent } from './routes/discuss-v2-home/discuss-v2-home.component';

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./wrapper/wrapper.module').then(u => u.WrapperModule),
    component: DiscussV2HomeComponent,
    data: {
      pageId: 'discussion-forum',
      module: 'Discuss',
    },
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscussV2RoutingModule { }
