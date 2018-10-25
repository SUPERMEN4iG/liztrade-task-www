import { Injectable } from "@angular/core";
import { ColumnSortType } from "./column/column.const";
import { OrderByPipe } from "./pipes/order-by.pipe";
import { ITableColumn } from "./column/column";
import * as _ from 'underscore';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class TableService {
	private dataTmp: Array<any> = [];
	private data: Array<any> = [];
	data$: BehaviorSubject<any> = new BehaviorSubject({});

	constructor() {}

	init(data) {
		this.data = data;
		this.dataTmp = Object.assign([], data);
	}

	sort(fields: ITableColumn[]) {
		_.each(fields, (field) => {
			if (field.sort != ColumnSortType.none) {
				this.data = new OrderByPipe().transform(this.data, field.name, field.sort === ColumnSortType.asc ? false : true);
			}
		});
		this.sync();
	}

	delete(index) {
		this.dataTmp = _.reject(this.dataTmp, (it, _index) => _index === parseInt(index, 10));
		this.data = _.reject(this.data, (it, _index) => _index === parseInt(index, 10));
		this.sync('delete');
	}

	filter(like: string, skipFields: Array<string> = []) {
		this.data = _.filter(
			this.dataTmp,
			(row: any) => {
				return _.any(
							_.keys(row)
							.filter(
								function(eq: string) { return this.skipFields.indexOf(eq) === -1; },
								{ skipFields }
							),
							(it) => {
								return row[it] && row[it].toString().includes(like);
							}
						);
			}
		);
		this.sync();
	}

	insert(row) {
		const comparer = (left: string, right: string) => {
			return left.toString().toLowerCase().trim() === right.toString().toLowerCase().trim();
		};

		const isFounded = _.any(
			this.dataTmp,
			(_row) => {
				const keys = _.keys(row);
				const countBy = _.countBy(keys, (it) => {
					return comparer(_row[it], row[it]);
				});
				return countBy['true'] != null && countBy['true'] === keys.length;
			}
		);

		if (isFounded) {
			throw Error(`error_row_equals`);
		}

		const id = _.max(_.pluck(this.dataTmp, 'id')) + 1;
		this.dataTmp.push(
			Object.assign({ id }, row)
		);
		this.data.push(
			Object.assign({ id }, row)
		);
		this.sync('insert');
	}

	sync(state = 'read') {
		console.info(`sync() ${this.data.length} rows`);
		this.data$.next({ state, data: this.data });
	}

	clear() {
		this.data.splice(0, this.data.length);
		this.dataTmp.splice(0, this.dataTmp.length);
	}

	destroy() {
		this.data = null;
		this.dataTmp = null;
	}
}
