const updateOptions = (req = {}) => {
    const fields = {}

    if (req.body.number) {
        fields['number'] = req.body.number
    }
    if (req.body.type) {
        fields['type'] = req.body.type
    }   
    if (req.body.date) {
        fields['date'] = req.body.date
    }
    if (req.body.noPart) {
        fields['noPart'] = req.body.noPart
    }
    if (req.body.description) {
        fields['description'] = req.body.description
    }
    if (req.body.status) {
        fields['status'] = req.body.status
    }
    if (req.body.fixed) {
        fields['fixed'] = req.body.fixed
    }
    if (req.body.dateFixed) {
        fields['dateFixed'] = req.body.dateFixed
    }

    return fields
}

module.exports = updateOptions