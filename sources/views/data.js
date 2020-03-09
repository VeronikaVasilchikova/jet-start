import {JetView} from "webix-jet";
import GridView from "views/gridview";
import {countries} from "models/countries";
import {statuses} from "models/statuses";
export default class DataView extends JetView{
	config(){
		const tabbar = {
			view: "tabbar",
			value: "Countries",
			localId: "tabbar",
			options: [
				{ value: "Countries", id: "countries" },
				{ value: "Statuses", id: "statuses" },
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
					cells: [
						{localId: "countries", rows: [new GridView(this.app, "", countries)]},
						{localId: "statuses", rows: [new GridView(this.app, "", statuses) ]}
					]
				}
			]
		};
	}
	init() {
		this.$$("tabbar").attachEvent("onChange", id => this.$$(id).show());
	}
}
