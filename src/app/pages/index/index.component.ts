import { Component } from "@angular/core";
import { PlayerService } from "src/app/_services/data/players.service";

@Component({
	selector: 'app-index-page',
	styleUrls: ['./index.component.scss'],
	templateUrl: './index.component.html'
})
export class IndexPageComponent {
	public fields = [];
	public data = [];

	constructor(private _playersService: PlayerService) {
		this._playersService.getPlayers().subscribe(
			(res) => {
				this.fields = res.fields;
				this.data = res.data;
			},
			(err) => {
				alert(err.toString());
			}
		);
	}
}
