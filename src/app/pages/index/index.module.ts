import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IndexPageComponent } from "./index.component";
import { IndexRoutingModule } from "./index.routing";
import { TableModule } from "src/app/_components/table/table.module";

@NgModule({
	imports: [
		CommonModule,
		IndexRoutingModule,
		TableModule,
	],
	declarations: [
		IndexPageComponent
	]
})
export class IndexModule { }
