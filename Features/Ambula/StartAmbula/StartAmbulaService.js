import createLinode from "../../../Facades/AnsibleFacade.js";

async function handle(linodeLabel) {
	const code = await createLinode(linodeLabel);
	return code;
}

export default handle;
