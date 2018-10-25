import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TableComponent } from "./table.component";
import { TableService } from "./table.service";
import { ColumnComponent } from "./column/column.component";
import { OrderByPipe } from "./pipes/order-by.pipe";
import { SearchComponent } from "./search/search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditorComponent } from "./editor/editor.component";
import { ImageUploaderComponent } from "./image-uploader/image-uploader.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [
		TableComponent,
		ColumnComponent,
		SearchComponent,
		EditorComponent,
		ImageUploaderComponent,
		OrderByPipe,
	],
	exports: [
		TableComponent
	],
	providers: [
		TableService,
	]
})
export class TableModule {}
