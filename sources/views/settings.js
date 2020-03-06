import {JetView} from "webix-jet";

export default class SettingsView extends JetView{
	config(){

		const segmentedBtn = {
			view: "segmented",
			value: "ru",
			inputWidth: 250,
			options: [
				{ id:"ru", value:"RU" },
				{ id:"en", value:"EN"}
			]
		};

		const ui = {
			type:"clean",
			rows: [
				{
					view: "template",
					template: "Settings",
					type: "header",
					css:"webix_dark",
					height: 40
				},
				segmentedBtn,
				{}
			]
		};

		return ui;
	}
}
