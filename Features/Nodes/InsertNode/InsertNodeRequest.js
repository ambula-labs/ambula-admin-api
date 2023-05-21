class InsertNodeRequest {
	constructor(name, ip, status, type) {
		this.name = name;
		this.ip = ip;
		this.dateStatusChanged = new Date();
		this.status = status;
		this.type = type;
	}
}

export default InsertNodeRequest;
