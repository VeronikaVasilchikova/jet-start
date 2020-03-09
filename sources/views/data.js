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
				{ value: "Countries" },
				{ value: "Statuses" },
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
						{localId: "Countries", rows: [new GridView(this.app, "", countries)]},
						{localId: "Statuses", rows: [new GridView(this.app, "", statuses) ]}
					]
				}
			]
		};
	}
	init() {
		this.$$("tabbar").attachEvent("onChange", value => this.$$(value).show());
	}
}
