import {JetView} from "webix-jet";

export default class GridView extends JetView {
	constructor(app, name, data){
		super(app, name);
		this._gridData = data;
	}
	config(){
		const templateDatatable = {
			rows: [
				{
					view: "datatable",
					localId: "templateDatatable",
					select: true,
					css: "webix_header_border webix_data_border",
					scroll: "y",
					editable: true,
					autoConfig: true,
					editaction: "dblclick"
				},
			]
		};

		const templateToolbar = {
			view: "toolbar",
			elements: [
				{
					view: "button",
					localId: "btnAdd",
					value: "Add",
					css: "webix_primary",
					click: () => this.doAddClick()
				},
				{
					view: "button",
					localId: "btnDelete",
					value: "Delete",
					css: "webix_primary",
					click:() => this.doDeleteClick()
				}
			]
		};

		return {
			rows:[ templateDatatable, templateToolbar ]
		};
	}
	init() {
		this.table = this.$$("templateDatatable");
		this.table.parse(this._gridData);
	}
	doAddClick(){
		//this.table.add({}, 0);
		this._gridData.add({}, 0);
	}
	doDeleteClick(){
		let sel = this.table.getSelectedId();
		if (sel) {
			//this.table.remove(sel);
			this._gridData.remove(sel);
		}
	}
}
