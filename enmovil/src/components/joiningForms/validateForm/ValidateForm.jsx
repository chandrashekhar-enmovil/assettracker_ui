// src/utils/validateForm.js
const validateForm = (formData, errors, setSnackbar) => {
    let valid = true;
    for (let key in errors) {
        if (formData[key] === '') {
            valid = false;
            setSnackbar({
                open: true,
                message: `Please fill out the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`,
                severity: 'error'
            });
            break;
        }
    }
    if (formData.yearsOfExperience != '0') {
        let variant = formData.experience[0];
        for (let key in variant) {
            if (variant[key] === '') {
                valid = false;
                setSnackbar({
                    open: true,
                    message: `Please fill out the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`,
                    severity: 'error'
                });
                return valid;
            }
        }
    }
    return valid;
};

export default validateForm;
