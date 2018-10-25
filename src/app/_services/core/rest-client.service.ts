import { Injectable } from "@angular/core";
import {
	HttpClient,
	HttpHeaders,
	HttpParams
  } from '@angular/common/http';

@Injectable()
export class RestClientService {
	private _defaultheaders: HttpHeaders = new HttpHeaders({
		'Content-Type': 'application/x-www-form-urlencoded'
	});

	constructor(private _http: HttpClient) {}

	public get(url: string, headers = this._defaultheaders, body?: any) {
		return this._http.get(
			url,
			{
			  headers: headers,
			  params: new HttpParams({fromObject: {...body}}),
			}
		);
	}

	public getText(url: string) {
		return this._http.get(
			url,
			{
				responseType: 'text'
			}
		);
	}
}
