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
        // Create a new instance of a row, using the coffee order info
        var rowElement = new Row(TopicSubmission, this.db);

        // Add the new row instance's $element property to the checklist
        this.$element.append(rowElement.$element);
    };

    TopicsList.prototype.removeRow = function(email) {
        this.$element.find('[value="' + email + '"]').closest('[data-coffee-order="checkbox"]').remove();
    };

    function Row(TopicSubmission, db) {
        var $div = $('<div></div>', {
            'post-topic': 'topiclist',
            'class': 'list-group-item'
        });

        //Create labels
        //var $descriptionLi = $('<li></li>');
        var $descriptionLabel = $('<label></label>');
        var $likeLabel = $('<label for="likeLabel"></label>');
        var $dislikeLabel = $('<label for="dislikeLabel"></label>');

        //initializes like/dislike labels
        $likeLabel.text(TopicSubmission.likes);
        $dislikeLabel.text(TopicSubmission.dislikes);

        var description = TopicSubmission.course + ':&emsp;' + TopicSubmission.topic;

        //Create like/dislike buttons

        //<button type='button' class='btn btn-primary btn-xs'>Button1</button>
        //$('<input type="button" class="likeBtn" value="Like" name="likeBtn" id="defaultLikeBtnID"/>');
        var $likeBtn = $('<button type="button" class="btn btn-success">Like</button>');

        var $space = $('<span> &emsp;&emsp;&emsp;</span>');

        var $dislikeBtn = $('<button type="button" class="btn btn-danger">Dislike</button>');

        //Create new id for the like/dislike buttons
        var newLikeButtonID = TopicSubmission.topic.replace(/[^a-z0-9\s]/gi, '');
        newLikeButtonID = newLikeButtonID.replace(/\s/g, '') + '_like';
        var newDislikeButtonID = TopicSubmission.topic.replace(/[^a-z0-9\s]/gi, '');
        newDislikeButtonID = newDislikeButtonID.replace(/\s/g, '') + '_dislike';

        //console.log('like id: ' + newLikeButtonID);

        //Give the new id for the like/dislike buttons
        $($likeBtn).attr('id', newLikeButtonID);
        $($dislikeBtn).attr('id', newDislikeButtonID);

        //When a like button is clicked
        $(document).on('click', '#' + $($likeBtn).attr('id'), function() {
            TopicSubmission.likes = (parseInt(TopicSubmission.likes) + 1).toString();
            db.update(TopicSubmission);
            $likeLabel.text(TopicSubmission.likes);
        });

        //When a dislike button is clicked
        $(document).on('click', '#' + $($dislikeBtn).attr('id'), function() {
            TopicSubmission.dislikes = (parseInt(TopicSubmission.dislikes) + 1).toString();
            db.update(TopicSubmission);
            $dislikeLabel.text(TopicSubmission.dislikes);
        });

        $descriptionLabel.append(description);

        $div.append($descriptionLabel);
        //$div.append($descriptionLi);

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
