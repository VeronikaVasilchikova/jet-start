import {JetView} from "webix-jet";
import {countries} from "models/countries";
import {statuses} from "models/statuses";

export default class DataView extends JetView{
	config(){

		const tabbar = {
			view: "tabbar",
			multiview: true,
			value: "countriesTable",
			options: [
				{ value: "Countries", id: "countriesTable" },
				{ value: "Statuses", id: "statusesTable" },
			],
			height: 50
		};

		const countriesTable = {
			rows: [
				{
					view: "datatable",
					id: "countTable",
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
							header: "Country Name",
							sort: "string",
							editor:"text"
						}
					]
				},
				{
					view: "toolbar",
					elements: [
						{
							view: "button",
							id: "btnAddCountry",
							value: "Add Country",
							css: "webix_primary",
							click:() => this.doAddClick(webix.$$("countTable"), { "Name": "New Country" })
						},
						{
							view: "button",
							id: "btnDeleteCountry",
							value: "Delete Country",
							css: "webix_primary",
							click:() => this.doDeleteClick(webix.$$("countTable"))
						}
					]
				}
			]
		};

		const statusesTable = {
			rows: [
				{
					view: "datatable",
					id: "statTable",
					select: true,
					css:"webix_header_border webix_data_border",
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
							header: "Status",
							sort: "string",
							editor:"text"
						},
						{
							id: "Icon",
							width: 200,
							header: "Icon",
							editor:"text"
						}
					]
				},
				{
					view: "toolbar",
					elements: [
						{
							view: "button",
							id: "btnAddStatus",
							value: "Add Status",
							css: "webix_primary",
							click:() => this.doAddClick(webix.$$("statTable"), { "Name": "New Status", "Icon": "New Icon" })
						},
						{
							view: "button",
							id: "btnDeleteStatus",
							value: "Delete Status",
							css: "webix_primary",
							click:() => this.doDeleteClick(webix.$$("statTable"))
						}
					]
				}
			]
		};

		const ui = {
			rows: [
				{
					view: "template",
					template: "Data",
					type: "header",
					css:"webix_dark",
					height: 40
				},
				tabbar,
				{
					cells: [
						{id: "countriesTable", rows: [countriesTable]},
						{id: "statusesTable", rows: [statusesTable]}
					]
				}
			]
		};

		return ui;
	}
	init(){
		webix.$$("countTable").parse(countries);
		webix.$$("statTable").parse(statuses);
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
