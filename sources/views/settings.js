import {JetView} from "webix-jet";

export default class SettingsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();

		return {
			rows:[
				{
					template: "Settings",
					type: "header",
					css:"webix_dark",
					height: 40
				},
				{
					view: "segmented",
					label:_("Language"),
					inputWidth:300,
					options:[
						{id:"en", value:"English"},
						{id:"ru", value:"Russian"},
					],
					click:() => this.toggleLanguage(), value:lang },
				{}
			]
		};
	}
	toggleLanguage(){
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({ view:"segmented" }).getValue();
		langs.setLang(value);
	}
}
