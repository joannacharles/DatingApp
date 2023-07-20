import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"", runGuardsAndResolvers:"always", canActivate:[AuthGuard],
    children:[
    {path:"messages",component:MessagesComponent},
    {path:"members",component:MemberListComponent},
    {path:"member/:id",component:MemberDetailComponent},
    {path:"lists",component:ListsComponent}
    ]
  },
  {path:"**",component:HomeComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
