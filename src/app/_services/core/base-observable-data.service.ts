import { Subject, Observable, of, throwError } from "rxjs";
import { takeUntil, delay, skipUntil, debounceTime } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { IDictionary } from "src/app/_interfaces/IDictionary";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class BaseObservableDataService {
	private _data: IDictionary<any[]> = {};
	private _data$: IDictionary<Subject<any>> = {};
	private _locker: IDictionary<Subject<any>> = {};

	constructor () {}

	protected append(key: string) {
		// TODO: need to append() implements
		if (this._data$[key] != null) {
			this._data$[key].observers.forEach((obs) => {
				obs.complete();
			});

			if (this._locker[key] != null) {
				this._locker[key].observers.forEach((locker) => {
					locker.complete();
				});
			}
		}

		this._data$[key] = new Subject<any>();
	}

	protected get(key: string, input: Observable<any>, isRefresh: boolean = false, isNeedEmit: boolean = true) {
		if (this._data$[key] != null) {
			if (this._locker[key] && this._locker[key].observers.length > 0) {
				return this._data$[key].asObservable();
			}

			if (this._data[key] != null && !isRefresh) {
				return Observable.of(this._data[key]);
			}

			if (this._locker[key] == null) {
				this._locker[key] = new Subject<any>();
			}

			return input
				.pipe(
					takeUntil(this._locker[key]),
				)
				.map((data) => {
					this._data[key] = data;
					if (isNeedEmit) {
						this._data$[key].next(this._data[key]);
						this._data$[key].complete();
					}
					return data;
				});
		}
	}
}
