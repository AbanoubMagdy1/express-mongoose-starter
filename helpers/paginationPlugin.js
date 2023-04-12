
function paginationPlugin (schema) {
	schema.query.paginate = function ({ documentsPerPage = null, page = null}) {
		const numbersArePositive = documentsPerPage > 0 && page > 0;
		if (numbersArePositive === false) {
			return this;
		}

		const skipDocumentsCount = documentsPerPage * (page - 1);
		return this.skip(skipDocumentsCount).limit(documentsPerPage);
	};
}

export default paginationPlugin;