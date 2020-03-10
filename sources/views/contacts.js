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
									}
								},
								{
									view:"button",
									value:"Add",
									click: () => this.doAddClick()
								}
							]
						},
						{ $subview: true }
					]
				}
			]
		};
	}
	doAddClick(){
		contacts.add({Name: "", Email: "", Status: "", Country: ""}, 0);
	}
	init() {
		this.listOfUsers = this.$$("listOfUsers");
		this.listOfUsers.sync(contacts);
		this.on(this.listOfUsers, "onAfterSelect", (id)=>{
			this.show(`./form?id=${id}`);
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
