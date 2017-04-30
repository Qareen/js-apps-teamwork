export let validator = {
    email: (email) => {
        let regexPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regexPattern.test(email);
    },
    password: (password) => {
        // Password should contain atleast one number and one special character and capital letter and be between 6 and 16 symbols long
        let regexPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/;
        return regexPattern.test(password);
    }
}