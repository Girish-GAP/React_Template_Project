// This will be the prop model for Add form

import { Validators } from "../../../utils/validators";

const AddForm = () => {
    return [
        {
            label: 'First Name *',
            value: '',
            size: 'medium',
            autoFocus: true,
            type: 'text',
            typeValue: 'text',
            variant: 'outlined',
            placeholder: '',
            field: 'firstName',      // this will be field name by which we are going to access the data
            validators: [
                { check: Validators.required, message: 'This field is mandatory' },
            ],
            responsive: { xs: 12 },
            required: true,
        },
        {
            label: 'Last Name *',
            value: '',
            size: 'medium',
            autoFocus: true,
            type: 'text',
            typeValue: 'text',
            variant: 'outlined',
            placeholder: '',
            field: 'lastName',
            validators: [
                { check: Validators.required, message: 'This field is mandatory' },
            ],
            responsive: { xs: 12 },
            required: true,
        },

    ]
}

export default AddForm;

