import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{
	config(){

		const menu = {
			view: "menu", localId: "top:menu",
			css: "app_menu",
			width: 180, layout: "y", select: true,
			template: "<span class='webix_icon #icon#'></span> #value#",
			data:[
				{ value: "Contacts", id: "contacts", icon: "wxi-user" },
				{ value: "Data", id: "data", icon: "wxi-columns" },
				{ value: "Settings", id: "settings", icon: "wxi-columns" }
			]
		};

		const ui = {
			type: "clean", paddingX: 5, css: "app_layout", cols :[
				{ paddingX: 5, paddingY: 10, css: "webix_shadow_medium", rows: [menu]},
				{ type: "wide", paddingY: 10, paddingX: 5, rows: [
					{ $subview: true }
				]}
			]
		};

		return ui;
	}
	init(){
		this.use(plugins.Menu, "top:menu");
	}
}
