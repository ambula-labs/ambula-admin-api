import { updateNode } from "../../../Repositories/NodesRepository.js";
import Node from "../../../Models/Node.js";

async function handle(updateReq) {
	await updateNode(updateReq);
	return new Node(updateReq.id, updateReq.name, updateReq.ip, updateReq.dateStatusChanged, updateReq.status, updateReq.type);
}

export default handle;
