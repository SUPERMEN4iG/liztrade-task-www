import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
	selector: 'table-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent {
	@Input('value') value = '';
	@Output('onSearch') onSearch = new EventEmitter();
	protected onInputChange = new Subject<string>();

	constructor() {
		this.onInputChange
			.pipe(
				debounceTime(300)
			)
			.subscribe((val) => this.onSearch.emit(val));
	}
}
