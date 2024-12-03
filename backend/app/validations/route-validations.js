const routeValidationSchema = {
    source: {
        in:['body'],
        exists: {
            errorMessage: 'Source is required'
        },
        notEmpty: {
            errorMessage: 'Source cannot be empty'
        },
        trim: true,
        escape: true,
    },

    //Custom validation to check if source != destination
    custom: {
        options: async function(value, {req}) {
            const destination = req.body.destination
            if(value === destination){
                throw new Error('Source cannot be the same as destination') 
            } else {
                return true
            }
        }
    },
    destination: {
        in: ['body'],
        exists: {
            errorMessage: 'Destination is required'
        },
        notEmpty: {
            errorMessage: 'Destination cannot not be empty'
        },
        trim: true,
        escape: true
    },

    //Custom validation to check if source != destination
    custom: {
        options: async function(value, {req}) {
            const source = req.body.source
            if(value === source){
                throw new Error('Destination cannot be the same as Source') 
            } else {
                return true
            }
        }
    },
    distance: {
        in: ['body'],
        exists: {
            errorMessage: 'Distance is required'
        }, 
        notEmpty: {
            errorMessage: 'Distance cannot be empty'
        },
        isNumeric: {
            errorMessage: 'Distance should be a number'
        },

        //Custom Validations to check if distance is greater than 0
        custom: {
            options: function(value) {
                if(value <= 0) {
                    throw new Error('Distance must be greater than 0')
                } else {
                    return true
                }
            }
        },
        trim: true,
        escape: true
    },
    duration: {
        in: ['body'],
        exists: {
            errorMessage: 'Duration is required'
        }, 
        notEmpty: {
            errorMessage: 'Duration cannot be empty'
        },
        isNumeric: {
            errorMessage: 'Duration should be a number'
        },

        //Custom Validations to check if duration is greater than 0
        custom: {
            options: function(value) {
                if(value <= 0) {
                    throw new Error('Distance must be greater than 0')
                } else {
                    return true
                }
            }
        },
        trim: true,
        escape: true
    }
}

module.exports = routeValidationSchema