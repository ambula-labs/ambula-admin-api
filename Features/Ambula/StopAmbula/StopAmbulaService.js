import { deleteLinode } from "../../../Facades/AnsibleFacade.js";

async function handle(linodeLabel) {
	return await deleteLinode(linodeLabel);
}

export default handle;
