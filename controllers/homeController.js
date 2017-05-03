import { templates } from '../utils/templates.js';

export function homeController() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref('/posts').once('value').then((snapshot) => {
                templates.get('feed')
                    .then((res) => {
                        let data = snapshot.val().reverse();
                        let currentUser = firebase.auth().currentUser;
                        
                        if (data) {
                            data.forEach((post) => {
                                if (post.likedBy[currentUser.displayName]) {
                                    post.isLiked = true;
                                    attachToUnlikeBtn(post);
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
                            });
                        }
                    })
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
    post.likedBy[username] = 0;

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