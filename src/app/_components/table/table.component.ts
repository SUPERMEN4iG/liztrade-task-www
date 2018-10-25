import { Component, Input, Output, OnChanges, SimpleChanges, OnDestroy, OnInit } from "@angular/core";
import { TableService } from "./table.service";
import * as _ from 'underscore';
import { ITableColumn } from "./column/column";
import { ColumnSortType } from "./column/column.const";
import { Subscription } from "rxjs";
import { transition, style, trigger, animate, state, keyframes } from "@angular/animations";

@Component({
	selector: 'app-table',
	styleUrls: ['./table.component.scss'],
	templateUrl: './table.component.html',
	animations: [
		trigger('flyInOut', [
			state('in', style({transform: 'translateX(0)'})),
			transition('void => *', [
				animate(700, keyframes([
					style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
					style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
					style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
				]))
			]),
			transition('void => false', [
				style({transform: 'translateX(0)'})
			]),
			transition('* => void', [
				animate(700, keyframes([
					style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
					style({opacity: 1, transform: 'translateX(-15px)', offset: 0.4}),
					style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
				]))
			])
		])
	],
})
export class TableComponent implements OnChanges, OnDestroy, OnInit {
	@Input('data') data = [];
	@Input('fields') fields = [];
	@Input('options') options;

	private dataSub$: Subscription;

	isAnimationBlock = true;

	constructor(private _tableService: TableService) {}

	ngOnInit() {
		this.dataSub$ = this._tableService.data$.subscribe((res) => {
			if (res.state && (res.state === 'insert' || res.state === 'delete')) {
				this.isAnimationBlock = false;
			}
			this.data = res.data;
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.fields != null && this.fields != null && this.fields.length > 0) {
			if (typeof this.fields[0] === 'string') {
				this.fields = _.map(this.fields, (el) => {
					return <ITableColumn>{
						name: el,
						sort: ColumnSortType.none
					};
				});
			}
		}

		if (changes.data != null && this.data != null) {
			this._tableService.init(this.data);
		}
	}

	ngOnDestroy() {
		if (this.dataSub$ != null && !this.dataSub$.closed) {
			this.dataSub$.unsubscribe();
		}
		this._tableService.destroy();
	}

	onSortChange(field: ITableColumn, value) {
		this._tableService.sort(this.fields);
	}

	onSearchChange(value) {
		this._tableService.filter(value, ['image']);
	}

	onDelete(index) {
		this._tableService.delete(index);
	}
}
