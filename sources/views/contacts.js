import { JetView } from "webix-jet";
import { contacts } from "models/contacts";

export default class ContactsView extends JetView {
	config() {
		return {
			rows: [
				{
					template: "Contacts",
					type: "header",
					css:"webix_dark",
					height: 40
				},
				{
					cols: [
						{
							rows: [
								{
									view: "list",
									localId: "listOfUsers",
									template: `
										<strong>name:</strong> #Name#
										<strong>email:</strong> #Email#
										<span class="webix_icon wxi-close remove_icon" style="float: right"></span>
									`,
									scroll: "y",
									select: true,
									onClick: {
										"wxi-close": function(e, id) {
											contacts.remove(id);
											return false;
										}
									},
									on:{
										onAfterSelect: (id) => {
											this.show(`./contacts/form?id=${id}`);
										},
									}
								},
								{
									view:"button",
									value:"Add",
									click: () => this.doAddClick()
								}
							]
						},
						{ $subview: "form" }
					]
				}
			]
		};
	}
	doAddClick(){
		contacts.add({Name: "", Email: ""}, 0);
	}
	init() {
		this.listOfUsers = this.$$("listOfUsers");
		this.listOfUsers.sync(contacts);

		this.on(this.app, "onDataEditStop", (data) => {
			if(data){
				if(data.id)
					contacts.updateItem(data.id, data);
				else
					contacts.add(data);
			}
		});
	}
	urlChange(view, url){
		let id = contacts.getFirstId();

		if(url[1] && url[1].params.id)
			id = url[1].params.id;

		if(id && this.listOfUsers.exists(id)){
			this.listOfUsers.select(id);
		}
	}
}
