import { Injectable } from "@angular/core";
import { } from 'rxjs/operators';
import { BaseObservableDataService } from "../core/base-observable-data.service";
import { RestClientService } from "../core/rest-client.service";
import { Observable } from "rxjs";
import * as _ from 'underscore';

export const INDENTIFIER_PLAYERS = 'players';

@Injectable()
export class PlayerService extends BaseObservableDataService {

	constructor(private _restClient: RestClientService) {
		super();
		super.append(INDENTIFIER_PLAYERS);
	}

	getPlayers(): Observable<any> {
		return super.get(
			INDENTIFIER_PLAYERS,
			this._restClient.getText(`./assets/data/users.json`)
				.map(
					(res: any) => {
						const data = JSON.parse(res);
						const fields = _.chain(data[0])
											.keys()
											.without('image')
											.value();
						return { fields, data };
					}
				) // TODO: need to implement abstract httpErrorHandler
		);
	}
}
