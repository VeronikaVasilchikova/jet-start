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
					editaction: "dblclick",
					columns: [
						{
							id: "id",
							header: "#",
							width: 60,
							sort: "int"
						},
						{
							id: "Name",
							fillspace: true,
							header: "Name",
							sort: "string",
							editor:"text"
						}
					]
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
					click:() => this.doAddClick(this.$$("templateDatatable"), { "Name": "New Item" })
				},
				{
					view: "button",
					localId: "btnDelete",
					value: "Delete",
					css: "webix_primary",
					click:() => this.doDeleteClick(this.$$("templateDatatable"))
				}
			]
		};

		return {
			rows:[ templateDatatable, templateToolbar ]
		};
	}
	init() {
		this.$$("templateDatatable").parse(this._gridData);
	}
	doAddClick(item, object){
		item.add(object, 0);
	}
	doDeleteClick(item){
		let sel = item.getSelectedId();
		if (sel) {
			webix
				.confirm({
					title: "Remove this item",
					text: "Are you sure you want to remove this item?"
				})
				.then(function() {
					item.remove(sel);
					webix.message("Item removing is confirmed");
				})
				.fail(function() {
					webix.message("Item removing is rejected");
				});
		}
	}
}
