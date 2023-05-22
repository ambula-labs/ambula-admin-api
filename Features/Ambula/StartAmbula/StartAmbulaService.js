import createLinode from "../../../Facades/AnsibleFacade.js";

async function handle(linodeLabel) {
	return await createLinode(linodeLabel);
}

export default handle;
