import { templates } from '../utils/templates.js';
import * as feed from './feed.js';

export function categoriesController(category) {
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
                                if (el.category === category) {
                                    el.id = key;
                                    data.push(el);
                                }
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
                                feed.attachToLikeBtn(post);
                                feed.attachToUnlikeBtn(post);
                                feed.attachToAddCommentSecton(post);
                                feed.listenForNewComments(post);
                            });
                        }

                        $("#add-post").on('click', () => {
                            feed.loadAddPostTemplate();
                        });

                    });
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

