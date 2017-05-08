export let validator = {
    email: email => {
        let regexPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regexPattern.test(email);
    },
    userName: userName => {
        if (userName >= 4 && userName <= 20) {
            let usernameRegex = /^[a-zA-Z0-9]+$/;
            return usernameRegex.test(userName);
        }

        return false;
    },
    password: password => {
        let regexPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/;
        return regexPattern.test(password);
    },
    carBrand: carBrand => {
        if (carBrand.length >= 2 && carBrand.length <= 100) {
            let brandRegex = /^[a-zA-Z0-9\s]+$/;
            return brandRegex.test(carBrand);
        }

        return false;
    },
    desription: desription => {
        if (desription.length >= 3 && desription.length <= 1000) {
            let descriptionRegex = /^[a-zA-Z0-9\s]+$/;
            return descriptionRegex.test(desription);
        }

        return false;
    },
    image: image => {
        let imageRegex = /^.*\.(jpg|jpeg|gif|JPG|png|PNG|svg|SVG)$/;
        return imageRegex.test(image);
    },
    comment: comment => {
        if (comment.length >= 1 && comment.length <= 500) {
            let commentRegex = /^[a-zA-Z0-9\s]+$/;
            return commentRegex.test(comment);
        }

        return false;
    }
}