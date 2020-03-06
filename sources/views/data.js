import {JetView} from "webix-jet";
import GridView from "views/gridview";
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

		return {
			rows: [
				{
					template: "Data",
					type: "header",
					css:"webix_dark",
					height: 40
				},
				tabbar,
				{
					cells:[
						{id: "countriesTable", rows: [new GridView(this.app, "", countries)]},
						{id: "statusesTable", rows: [new GridView(this.app, "", statuses) ]}
					]
				}
			]
		};
	}
}
