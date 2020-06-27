import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { SharedModule } from '../shared/shared.module';
import { PostRecommandComponent } from './post-recommand/post-recommand.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: 'blog', component: PostListComponent },
  { path: 'blog/:id', component: PostDetailComponent },
  { path: 'dashboard', component: PostDashboardComponent },
  { path: 'recommand', component: PostRecommandComponent},
  { path: 'personalcenter', component: PersonalCenterComponent},
  { path: 'logout', component: LogoutComponent}
]

@NgModule({
  declarations: [PostDashboardComponent, PostDetailComponent, PostListComponent, PostRecommandComponent, PersonalCenterComponent, LogoutComponent],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class PostsModule { }
