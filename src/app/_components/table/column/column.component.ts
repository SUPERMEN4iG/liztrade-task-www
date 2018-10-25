import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ColumnSortType } from "./column.const";

@Component({
	selector: 'table-column',
	styleUrls: ['./column.component.scss'],
	templateUrl: './column.component.html'
})
export class ColumnComponent {
	@Input('name') name;
	@Input('sort') sort: ColumnSortType = ColumnSortType.none;
	@Output('sortChange') sortChange = new EventEmitter();

	constructor() {}

	onSortChange() {
		if (this.sort === ColumnSortType.none) {
			this.sort = ColumnSortType.desc;
		} else if (this.sort === ColumnSortType.desc) {
			this.sort = ColumnSortType.asc;
		} else if (this.sort === ColumnSortType.asc) {
			this.sort = ColumnSortType.none;
		}

		this.sortChange.emit(this.sort);
	}
}
