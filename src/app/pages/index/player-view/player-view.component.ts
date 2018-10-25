import { Component, Input } from "@angular/core";

@Component({
	selector: 'app-player-view',
	templateUrl: './player-view.component.html',
	styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent {
	@Input('player') player;

	constructor() {}
}
