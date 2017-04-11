(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function TopicsList(selector, db) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.db = db;

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    TopicsList.prototype.addRow = function(TopicSubmission) {
        var rowElement = new Row(TopicSubmission, this.db);

        this.$element.append(rowElement.$element);
    };

    TopicsList.prototype.removeRow = function(email) {
        this.$element.find('[value="' + email + '"]').closest('[post-topic="topiclist"]').remove();
    };

    function Row(TopicSubmission, db) {
        var $div = $('<div></div>', {
            'post-topic': 'topiclist',
            'class': 'list-group-item'
        });

        //Create labels
        var $descriptionLabel = $('<label></label>');
        var $likeLabel = $('<label for="likeLabel"></label>');
        var $dislikeLabel = $('<label for="dislikeLabel"></label>');

        //initializes like/dislike labels
        $likeLabel.text(TopicSubmission.likes);
        $dislikeLabel.text(TopicSubmission.dislikes);

        var description = TopicSubmission.course + ':&emsp;' + TopicSubmission.topic;

        //Create like/dislike buttons
        var $likeBtn = $('<button type="button" class="btn btn-success">Like</button>');
        var $space = $('<span> &emsp;&emsp;&emsp;</span>');
        var $dislikeBtn = $('<button type="button" class="btn btn-danger">Dislike</button>');

        //Create new id for the like/dislike buttons
        var newLikeButtonID = TopicSubmission.topic.replace(/[^a-z0-9\s]/gi, '');
        newLikeButtonID = newLikeButtonID.replace(/\s/g, '') + '_like';
        var newDislikeButtonID = TopicSubmission.topic.replace(/[^a-z0-9\s]/gi, '');
        newDislikeButtonID = newDislikeButtonID.replace(/\s/g, '') + '_dislike';

        //Give the new id for the like/dislike buttons
        $($likeBtn).attr('id', newLikeButtonID);
        $($dislikeBtn).attr('id', newDislikeButtonID);

        //When a like button is clicked
        $(document).on('click', '#' + $($likeBtn).attr('id'), function() {
            var likesList = TopicSubmission.likesEmail.split(' ');
            var dislikesList = TopicSubmission.dislikesEmail.split(' ');

            var likeIndex = likesList.indexOf(window.username);
            var dislikeIndex = dislikesList.indexOf(window.username);

            if (window.isLoggedIn || window.isRegistered) {

                //If user has not liked or disliked this, and they tried to click like
                if (likeIndex == -1 && dislikeIndex == -1) {
                    //Append to likesEmail list.
                    if (TopicSubmission.likesEmail == '') {
                        TopicSubmission.likesEmail = window.username;
                    } else {
                        TopicSubmission.likesEmail = TopicSubmission.likesEmail + ' ' + window.username;
                    }

                    //Update like counts
                    TopicSubmission.likes = (parseInt(TopicSubmission.likes) + 1).toString();

                    //Update object in server
                    db.update(TopicSubmission);

                    //Display new likes count
                    $likeLabel.text(TopicSubmission.likes);
                } else if (likeIndex != -1) //They already liked it, but tried clicking like again.
                {
                    $('#alreadyLikedModal').modal('show');
                } else if (dislikeIndex != -1) //They already disliked it, but tried clicking like as to change their mind.
                {
                    //Append to likesEmail list.
                    if (TopicSubmission.likesEmail == '') {
                        TopicSubmission.likesEmail = window.username;
                    } else {
                        TopicSubmission.likesEmail = TopicSubmission.likesEmail + ' ' + window.username;
                    }

                    //remove them from dislikesEmail in database
                    TopicSubmission.dislikesEmail = TopicSubmission.dislikesEmail.replace(window.username, '');

                    //Update like counts
                    TopicSubmission.likes = (parseInt(TopicSubmission.likes) + 1).toString();

                    //Update dislike counts
                    TopicSubmission.dislikes = (parseInt(TopicSubmission.dislikes) - 1).toString();

                    //Update object in server
                    db.update(TopicSubmission);

                    //Display new likes count
                    $likeLabel.text(TopicSubmission.likes);

                    //Display new dislikes count
                    $dislikeLabel.text(TopicSubmission.dislikes);
                }
            } else {
                $('#signInModal').modal('show');
            }
        });

        //When a dislike button is clicked
        $(document).on('click', '#' + $($dislikeBtn).attr('id'), function() {
            var likesList = TopicSubmission.likesEmail.split(' ');
            var dislikesList = TopicSubmission.dislikesEmail.split(' ');

            var likeIndex = likesList.indexOf(window.username);
            var dislikeIndex = dislikesList.indexOf(window.username);


            if (window.isLoggedIn || window.isRegistered) {
                //If user has not liked or disliked this, and they tried to click dislike
                if (likeIndex == -1 && dislikeIndex == -1) {
                    //Append to dislikesEmail list.
                    if (TopicSubmission.dislikesEmail == '') {
                        TopicSubmission.dislikesEmail = window.username;
                    } else {
                        TopicSubmission.dislikesEmail = TopicSubmission.dislikesEmail + ' ' + window.username;
                    }

                    //Update dislike counts
                    TopicSubmission.dislikes = (parseInt(TopicSubmission.dislikes) + 1).toString();

                    //Update object in server
                    db.update(TopicSubmission);

                    //Display new dislikes count
                    $dislikeLabel.text(TopicSubmission.dislikes);

                } else if (dislikeIndex != -1) //They already disliked it, but tried clicking dislike again.
                {
                    //Display an alert, or validation message, instead of console.log
                    $('#alreadyDislikedModal').modal('show');
                } else if (likeIndex != -1) //They already liked it, but tried clicking dislike as to change their mind.
                {
                    //Append to dislikesEmail list.
                    if (TopicSubmission.dislikesEmail == '') {
                        TopicSubmission.dislikesEmail = window.username;
                    } else {
                        TopicSubmission.dislikesEmail = TopicSubmission.dislikesEmail + ' ' + window.username;
                    }

                    //remove them from likesEmail in database
                    TopicSubmission.likesEmail = TopicSubmission.likesEmail.replace(window.username, '');

                    //Update like counts
                    TopicSubmission.likes = (parseInt(TopicSubmission.likes) - 1).toString();

                    //Update dislike counts
                    TopicSubmission.dislikes = (parseInt(TopicSubmission.dislikes) + 1).toString();

                    //Update object in server
                    db.update(TopicSubmission);

                    //Display new likes count
                    $likeLabel.text(TopicSubmission.likes);

                    //Display new dislikes count
                    $dislikeLabel.text(TopicSubmission.dislikes);
                }
            } else {
                $('#signInModal').modal('show');
            }
        });

        $descriptionLabel.append(description);

        $div.append($descriptionLabel);

        $div.append($likeBtn);
        $div.append($likeLabel);
        $div.append($space);
        $div.append($dislikeBtn);
        $div.append($dislikeLabel);

        this.$element = $div;
    }


    App.TopicsList = TopicsList;
    window.App = App;
})(window);
