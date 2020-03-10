import { JetView } from "webix-jet";
import { countries } from "models/countriesCollection";
import { statuses } from "models/statusesCollection";
import { contacts } from "models/contactsCollection";

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
							collection: countries,
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
							collection: statuses,
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
								contacts.waitData.then(() => {
									const values = this.getRoot().getValues();
									if(values.id && (values.Name != "" || values.Email != "")) {
										contacts.updateItem(values.id, values);
									} else {
										webix.message("Select other contact to start editing");
									}
								});
							}
						}
					]
				},
				{}
			]
		};
	}
	urlChange(view, url){
		contacts.waitData.then(() => {
			const id = url[0].params.id;
			if(id)
				view.setValues(contacts.getItem(id));
		});
	}
}
