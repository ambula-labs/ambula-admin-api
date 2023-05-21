class UpdateNodeRequest {
	constructor(id, name, ip, status, type) {
		this.id = id;
		this.name = name;
		this.ip = ip;
		this.dateStatusChanged = new Date();
		this.status = status;
		this.type = type;
	}
}

export default UpdateNodeRequest;
