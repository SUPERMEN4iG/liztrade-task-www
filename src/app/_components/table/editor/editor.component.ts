import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TableService } from "../table.service";

@Component({
	selector: 'table-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
	@Input() row;
	@Output() rowChange = new EventEmitter();

	form: FormGroup;
	get formControls(): any { return this.form.controls; }
	isSubmitted = false;

	constructor(private _tableService: TableService) {
		this.form = new FormGroup({
			first_name: new FormControl('', [Validators.required]),
			last_name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			image: new FormControl('', [])
		});
	}

	onFormSend(values) {
		this.isSubmitted = true;
		if (!this.form.valid) {
			return;
		}

		try {
			this._tableService.insert(values);
		} catch (err) {
			alert(err);
		}
	}
}
