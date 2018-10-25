import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { IndexPageComponent } from "./index.component";

export const routes: Routes = [
	{
		path: '',
		component: IndexPageComponent,
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class IndexRoutingModule {}
