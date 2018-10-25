import { Component, Input, Output, EventEmitter, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	selector: 'table-image-uploader',
	templateUrl: './image-uploader.component.html',
	styleUrls: ['./image-uploader.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ImageUploaderComponent),
			multi: true
		}
	]
})
export class ImageUploaderComponent implements ControlValueAccessor {
	private selectedFile: File;

	@Input() image: string | ArrayBuffer = '';
	@Output() imageChange = new EventEmitter();

	get value() {
		return this.image;
	}

	set value(val) {
		this.image = val;
		this.onChange(val);
		this.onTouched();
	}

	constructor() {}

	onChange: any = () => { };
	onTouched: any = () => { };

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
	}

	writeValue(value) {
		if (value) {
		  this.value = value;
		}
	}

	onFileChanged(event) {
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = () => {
			this.value = reader.result;
		};
	}
}
