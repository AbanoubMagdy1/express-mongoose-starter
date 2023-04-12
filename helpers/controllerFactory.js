import asyncHandler from "express-async-handler";
import HttpErrors from "http-errors";

export function deleteOne(Model){
	asyncHandler(async function (req, res) {
		const { id } = req.params;
		const document = await Model.findByIdAndDelete(id);

		if (!document) {
			throw new HttpErrors.NotFound(`No document for this id ${id}`);
		}

		// Trigger "remove" event when update document
		document.remove();
		res.status(204).send({message: "Document deleted successfully"});
	});
}

export function updateOne (Model) {
	asyncHandler(async function(req, res) {
		const { id } = req.params;
		const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		if (!document) {
			throw new HttpErrors.NotFound(`No document for this id ${id}`);
		}
		res.status(200).json({ data: document });
	});
}

export function createOne(Model){
	asyncHandler(async function (req, res)  {
		const newDoc = await Model.create(req.body);
		res.status(201).json({ data: newDoc });
	});
}

export function getOne (Model, populationOpt) {
	asyncHandler(async (req, res) => {
		const { id } = req.params;

		// 1) Build query
		let query = Model.findById(id);
		if (populationOpt) {
			query = query.populate(populationOpt);
		}

		// 2) Execute query
		const document = await query;

		if (!document) {
			throw new HttpErrors.NotFound(`No document for this id ${id}`);
		}
		res.status(200).json({ data: document });
	});
}

export function getAll (Model){
	asyncHandler(async (req, res) => {
		let filter = {};
		if (req.filterObj) {
			filter = req.filterObj;
		}
		const {page = 1, documentPerPage = 10, sort = "createdAt"} = req.query;
		// Build query

		const [count , documents] = await Promise.all([
			Model.countDocuments(filter),
			Model.find(filter)
				.sort(sort)
				.skip((page - 1) * documentPerPage)
				.limit(documentPerPage)
		]);

		const pages = Math.ceil(count / documentPerPage);
		res
			.status(200)
			.json({
				data: documents,
				pagesCount: pages
			});
	});
}
