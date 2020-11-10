const archiveOptions = (query = {}) => {
    const fields = {}

    fields['fixed'] = true

    if (query.number) {
        fields['number'] = query.number
    }
    if (query.type) {
        fields['type'] = query.type
    }   
    if (query.date) {
        fields['date'] = {
            $gte: query.from,
            $lt: query.to
        }
    }

    return fields
}

module.exports = archiveOptions