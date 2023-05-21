import { insertNode } from "../../../Repositories/NodesRepository.js";
import Node from "../../../Models/Node.js";

async function handle(insertReq) {
	const id = await insertNode(insertReq);
	return new Node(id, insertReq.name, insertReq.ip, insertReq.dateStatusChanged, insertReq.status, insertReq.type);
}

export default handle;
