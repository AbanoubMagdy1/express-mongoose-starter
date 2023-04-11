export function createRecord(Model){
	return async function create(req, res){
		const created = await Model.create(req.body);
		res.status(201)
			.json({data: created});
	};
}

export function updateRecord(Model){
	return async function update(req, res){
		const updated = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json({data: updated});
	};
}

export function deleteRecord(Model){
	return async function remove(req, res){
		await Model.findByIdAndDelete(req.params.id);

		res.json({message: "Record deleted successfully."});
	};
}
