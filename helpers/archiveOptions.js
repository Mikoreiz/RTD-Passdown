const archiveOptions = (req = {}) => {
    const fields = {}

    fields['fixed'] = true

    if (req.body.number) {
        fields['number'] = req.body.number
    }
    if (req.body.type) {
        fields['type'] = req.body.type
    }   
    if (req.body.date) {
        fields['date'] = req.body.date
    }

    return fields
}

module.exports = archiveOptions