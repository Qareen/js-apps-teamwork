import { templates } from '../utils/templates.js';
import { validator } from '../utils/validator.js';
import { guid } from '../utils/guid.js';

export function homeController() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref('/posts').once('value').then((snapshot) => {
                templates.get('feed')
                    .then((res) => {
                        let obj = snapshot.val();
                        let data = [];
                        let currentUser = firebase.auth().currentUser.displayName;

                        if (obj) {
                            for (let key in obj) {
                                let el = obj[key];
                                el.id = key;
                                data.push(el);
                            }

                            data.reverse();

                            data.forEach((post) => {
                                if (post.likedBy[currentUser]) {
                                    post.isLiked = true;
                                }
                            });
                        }

                        let hbTemplate = Handlebars.compile(res);
                        let template = hbTemplate(data);

                        $('#content').html(template);

                        if (data) {
                            data.forEach((post) => {
                                attachToLikeBtn(post);
                                attachToUnlikeBtn(post);
                                attachToAddCommentSecton(post);
                                listenForNewComments(post);
                            });
                        }

                        $("#add-post").on('click', () => {
                            loadAddPostTemplate();
                        });

                    });

                let profilePic = document.getElementById('profilePicIcon');
                console.log(profilePic);
                profilePic.setAttribute('src', user.photoURL);
            });
        } else {
            templates.get('home')
                .then((res) => {
                    let hbTemplate = Handlebars.compile(res);
                    let template = hbTemplate();

                    $('#content').html(template);
                });
        }
    });

}

function like(post) {
    let username = firebase.auth().currentUser.displayName;
    post.likedBy[username] = 1;

    let countOfLikes = 0;
    for (var key in post.likedBy) {
        if (post.likedBy[key]) {
            countOfLikes++;
        }
    }

    firebase.database().ref(`/posts/${post.id}`).set({
        author: post.author,
        carBrand: post.carBrand,
        category: post.category,
        description: post.description,
        imageURL: post.imageURL,
        id: post.id,
        likes: countOfLikes,
        likedBy: post.likedBy
    });

    $(`#${post.id}-num-of-likes`).text(countOfLikes);
}

function unlike(post) {
    let username = firebase.auth().currentUser.displayName;
    delete post.likedBy[username];

    let countOfLikes = 0;
    for (var key in post.likedBy) {
        if (post.likedBy[key]) {
            countOfLikes++;
        }
    }

    firebase.database().ref(`/posts/${post.id}`).set({
        author: post.author,
        carBrand: post.carBrand,
        category: post.category,
        description: post.description,
        imageURL: post.imageURL,
        id: post.id,
        likes: countOfLikes,
        likedBy: post.likedBy
    });

    $(`#${post.id}-num-of-likes`).text(countOfLikes);
}

function attachToUnlikeBtn(post) {
    $(`#${post.id}-unlike`).on('click', (event) => {
        unlike(post);
        event.target.classList.remove("liked");
        event.target.classList.add("not-liked");
        event.target.id = `${post.id}-like`;
        attachToLikeBtn(post);
    });
}

function attachToLikeBtn(post) {
    $(`#${post.id}-like`).on('click', (event) => {
        like(post);
        event.target.classList.remove("not-liked");
        event.target.classList.add("liked");
        event.target.id = `${post.id}-unlike`;
        attachToUnlikeBtn(post);
    });
}

function attachToAddCommentSecton(post) {
    $(`#${post.id}-add-comment`).keypress((e) => {
        if (e.keyCode === 13) {
            addComment(post);
        }
    })
}

function loadAddPostTemplate() {
    templates.get("add-post")
        .then((res) => {
            let hbTemplate = Handlebars.compile(res);
            let template = hbTemplate();

            $("#content").html(template);

            $("#submit-post").on('click', () => {
                exportData();
            });

            $("#image-file").on("change", (e) => {
                $('#upload-file-info').html($(e.currentTarget).val());
                let file = e.target.files[0];
                let fileType = file["type"];
                let ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
                if ($.inArray(fileType, ValidImageTypes) < 0) {
                    toastr.error("Please select an image file");
                    file = null;
                    return;
                }
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    window.localStorage.setItem("tempImage", reader.result);
                }
            });

            $("#go-back").on("click", () => {
                homeController();
            });
        });
}

function exportData() {
    let post = {
        author: firebase.auth().currentUser.displayName,
        carBrand: "",
        category: "",
        description: "",
        imageURL: "",
        likedBy: {
            "admin": 0
        },
        likes: 0
    }

    if (validator.carBrand($("#car-brand").val())) {
        post.carBrand = $("#car-brand").val();
    } else {
        toastr.error("Invalid car brand. It should be between 2 and 100 symbols long.");
        return;
    }

    if (validator.desription($("#description").val())) {
        post.description = $("#description").val();
    } else {
        toastr.error("Invalid description. It should be between 3 and 1000 symbols long.");
        return;
    }

    post.category = $("#category").val();

    if (validator.image($("#image-file").val())) {
        uploadImage(post);
    } else {
        toastr.error("Please add image.");
    }
}

function addPost(post) {
    let postsRef = firebase.database().ref('/posts');
    let newPostRef = postsRef.push(post);
    if (newPostRef) {
        toastr.success("Post added successfully.");
        homeController();
    }
}

function uploadImage(post) {
    let uniqueImageName = guid();
    let storageRef = firebase.storage().ref();
    let imagesRef = storageRef.child('/images/' + uniqueImageName);
    let imgStr = window.localStorage.getItem("tempImage");

    imagesRef.putString(imgStr, 'data_url')
        .then((snapshot) => {
            post.imageURL = snapshot.downloadURL;
            addPost(post);
        })
        .catch((err) => {
            toastr.error("Unable to upload your image. Please try again later.");
            return;
        });

    localStorage.removeItem("tempImage");
}

function addComment(post) {
    let currentUser = firebase.auth().currentUser.displayName;

    if (validator.comment($(`#${post.id}-add-comment`).val())) {
        firebase.database().ref(`/posts/${post.id}/comments`).push({
            author: currentUser,
            content: $(`#${post.id}-add-comment`).val()
        });

        toastr.success("Comment added successfully.");
        $(`#${post.id}-add-comment`).val("");
    } else {
        toastr.error("Comment should be between 1 and 500 symbols long.");
        return;
    }
}

function listenForNewComments(post) {
    let commentsRef = firebase.database().ref(`/posts/${post.id}/comments`);
    commentsRef.on('value', (snapshot) => {
        templates.get('comments')
            .then((res) => {
                let data = $.map(snapshot.val(), (value, index) => {
                    return [value];
                });
                let hbTemplate = Handlebars.compile(res);
                let template = hbTemplate(data);

                $(`#${post.id}-comments`).html(template);
            });
    });
}