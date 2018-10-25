import { IDictionary } from "src/app/_interfaces/IDictionary";
import { ITableColumn } from "./column/column";

export interface ITableOptions {
	sort: IDictionary<ITableColumn>
}