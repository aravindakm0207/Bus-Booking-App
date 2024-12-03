const operatorValidationSchema = {
    username: {
        in:['body'],
        exists: {
            errorMessage: 'Username is required'
        },
        notEmpty: {
            errorMessage: 'Username cannot be empty'
        },
        trim: true,
        escape: true,
    },
    contactNumber: {
        in: ['body'],
        exists: {
            errorMessage: 'Contact Number is required'
        }, 
        notEmpty: {
            errorMessage: 'Contact Number cannot be empty'
        },
        isNumeric: {
            errorMessage: 'Contact Number should be a number'
        },
        trim: true,
        escape: true
    }
}

module.exports = operatorValidationSchema