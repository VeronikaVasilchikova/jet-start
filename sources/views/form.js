import { JetView } from "webix-jet";
import { countries } from "models/countries";
import {statuses } from "models/statuses";
import { contacts } from "models/contacts";

export default class ContactsView extends JetView {
	config() {
		return {
			view: "form",
			localId: "form",
			elements: [
				{
					view: "text",
					label: "User Name",
					name: "Name",
				},
				{
					view: "text",
					label: "Email",
					name: "Email",
				},
				{
					view: "combo",
					label: "Country",
					name: "Country",
					placeholder:"Options",
					options: {
						body: {
							data: countries,
							template: "#Name#"
						}
					}
				},
				{
					view: "combo",
					label: "Status",
					name:"Status",
					placeholder:"Options",
					options: {
						body: {
							data: statuses,
							template: "#Name#"
						}
					}
				},
				{
					cols: [
						{},
						{
							view:"button",
							label:"Save",
							type:"form",
							click:() => {
								const values = this.getRoot().getValues();
								this.app.callEvent("onDataEditStop", [values]);
							}
						}
					]
				},
				{}
			]
		};
	}
	urlChange(view){
		const id = this.getParam("id", true);

		if(id)
			view.setValues(contacts.getItem(id));
	}
}
