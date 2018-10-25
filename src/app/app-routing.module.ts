import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: './pages/index/index.module#IndexModule'
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
	constructor(private _router: Router) {
		this._router.errorHandler = (error: any) => {
			console.error(error);
			this._router.navigate(['/']);
		};
	}
}
