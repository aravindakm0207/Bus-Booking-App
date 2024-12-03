/*const busValidationSchema = {
    busName: {
        in: ['body'],
        exists: {
            errorMessage: 'Bus Name is required'
        },
        notEmpty: {
            errorMessage: 'Bus Name cannot be empty'
        },
        trim: true,
        escape: true
    },
    busNumber: {
        in: ['body'],
        exists: {
            errorMessage: 'Bus Number is required'
        },
        notEmpty: {
            errorMessage: 'Bus Number cannot be empty'
        },
        trim: true,
        escape: true
    },
    busCapacity: {
        in: ['body'],
        exists: {
            errorMessage: 'Bus Capacity is required'
        },
        notEmpty: {
            errorMessage: 'Bus Capacity cannot be empty'
        }
       
    },
    source: {
        in: ['body'],
        exists: {
            errorMessage: 'Source is required'
        },
        notEmpty: {
            errorMessage: 'Source cannot be empty'
        },
        trim: true,
        escape: true
    },
    destination: {
        in: ['body'],
        exists: {
            errorMessage: 'Destination is required'
        },
        notEmpty: {
            errorMessage: 'Destination cannot be empty'
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
        trim: true,
        escape: true
    },
    distance: {
        in: ['body'],
        exists: {
            errorMessage: 'Distance is required'
        },
        notEmpty: {
            errorMessage: 'Distance cannot be empty'
        }
        
    },
    amenities: {
        in: ['body'],
        exists: {
            errorMessage: 'amenities is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'amenities cannot be empty'
        },
        custom: {
            options: function(value) {
                if(!Array.isArray(value)) {
                    return new Error('amenities should be in array')
                }
                return true 
            }
        }
      
    },
    operator: {
        in: ['body'],
        exists: {
            errorMessage: 'Operator ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid Operator ID'
        }
    }
};

module.exports = busValidationSchema;
*/

const busValidationSchema = {
    busName: {
        in: ['body'],
        exists: {
            errorMessage: 'Bus Name is required'
        },
        notEmpty: {
            errorMessage: 'Bus Name cannot be empty'
        },
        trim: true,
        escape: true
    },
    busNumber: {
        in: ['body'],
        exists: {
            errorMessage: 'Bus Number is required'
        },
        notEmpty: {
            errorMessage: 'Bus Number cannot be empty'
        },
        trim: true,
        escape: true
    },
    busCapacity: {
        in: ['body'],
        exists: {
            errorMessage: 'Bus Capacity is required'
        },
        notEmpty: {
            errorMessage: 'Bus Capacity cannot be empty'
        },
        isInt: {
            errorMessage: 'Bus Capacity must be an integer'
        }
    },
    from: {
        in: ['body'],
        exists: {
            errorMessage: 'Source is required'
        },
        notEmpty: {
            errorMessage: 'Source cannot be empty'
        },
        trim: true,
        escape: true
    },
    to: {
        in: ['body'],
        exists: {
            errorMessage: 'Destination is required'
        },
        notEmpty: {
            errorMessage: 'Destination cannot be empty'
        },
        trim: true,
        escape: true
    },
    price: {
        in: ['body'],
        exists: {
            errorMessage: 'Price is required'
        },
        notEmpty: {
            errorMessage: 'Price cannot be empty'
        },
        isFloat: {
            errorMessage: 'Price must be a number'
        }
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'Email is required'
        },
        notEmpty: {
            errorMessage: 'Email cannot be empty'
        },
        isEmail: {
            errorMessage: 'Invalid email format'
        },
        trim: true,
        escape: true
    },
    phone: {
        in: ['body'],
        exists: {
            errorMessage: 'Phone number is required'
        },
        notEmpty: {
            errorMessage: 'Phone number cannot be empty'
        },
        isInt: {
            errorMessage: 'Phone number must be an integer'
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Phone number must be 10 digits long'
        }
    },
    duration: {
        in: ['body'],
        exists: {
            errorMessage: 'Duration is required'
        },
        notEmpty: {
            errorMessage: 'Duration cannot be empty'
        },
        trim: true,
        escape: true
    },
    distance: {
        in: ['body'],
        exists: {
            errorMessage: 'Distance is required'
        },
        notEmpty: {
            errorMessage: 'Distance cannot be empty'
        },
        isFloat: {
            errorMessage: 'Distance must be a number'
        }
    },
    amenities: {
        in: ['body'],
        exists: {
            errorMessage: 'Amenities are required'
        },
        notEmpty: {
            errorMessage: 'Amenities cannot be empty'
        },
        isArray: {
            errorMessage: 'Amenities must be an array'
        },
        custom: {
            options: (value) => {
                if (value.some(amenity => typeof amenity !== 'string')) {
                    throw new Error('All amenities must be strings');
                }
                return true;
            }
        }
    },
    rating: {
        in: ['body'],
        optional: true,
        isFloat: {
            options: { min: 0, max: 5 },
            errorMessage: 'Rating must be a number between 0 and 5'
        }
    },
    arrival: {
        in: ['body'],
        exists: {
            errorMessage: 'Arrival time is required'
        },
        notEmpty: {
            errorMessage: 'Arrival time cannot be empty'
        },
        trim: true,
        escape: true
    },
    departure: {
        in: ['body'],
        exists: {
            errorMessage: 'Departure time is required'
        },
        notEmpty: {
            errorMessage: 'Departure time cannot be empty'
        },
        trim: true,
        escape: true
    },
    seats: {
        in: ['body'],
        exists: {
            errorMessage: 'Seats are required'
        },
        isArray: {
            errorMessage: 'Seats must be an array'
        },
        notEmpty: {
            errorMessage: 'Seats cannot be empty'
        }
    },
    operator: {
        in: ['body'],
        exists: {
            errorMessage: 'Operator ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid Operator ID'
        }
    }
};

module.exports = busValidationSchema;
