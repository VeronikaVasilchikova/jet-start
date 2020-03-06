import { JetView } from "webix-jet";
import { contacts } from "models/contacts";

export default class ContactsView extends JetView {
	config() {

		const listOfUsers = {
			view: "list",
			localId: "listOfUsers",
			template: `
				<strong>name:</strong> #Name#
				<strong>email:</strong> #Email#
				<span class="webix_icon wxi-close remove_icon" style="float: right"></span>
			`,
			scroll: false,
			select: true
		};

		const userForm = {
			view: "form",
			elements: [
				{
					view: "text",
					label: "User Name",
					name: "name",
				},
				{
					view: "text",
					label: "Email",
					name: "email",
				},
				{}
			]
		};

		const ui = {
			rows: [
				{
					view: "template",
					template: "Contacts",
					type: "header",
					css:"webix_dark",
					height: 40
				},
				{
					cols: [
						listOfUsers,
						{width: 10},
						userForm
					]
				}
			]
		};

		return ui;
	}
	init() {
		this.$$("listOfUsers").parse(contacts);
	}
}
