module.exports = function (ctx, done) {

    var Twit = require('twit@1.1.20');

    var twitter = new Twit({
        consumer_key: 'epu6kemVAk9sS3FrEfYtnoITA',
        consumer_secret: '41J2HDe89c3GWZrMtMJ1ByrCIbwUSsA6KwuLWkcCoFprUQxxR1',
        access_token: '389994112-9N7xnIIgjZGKqkJjIIloheqybtElTmgScwpMxKwP',
        access_token_secret: 'adCfJTA3BKQwM7dHIrydVWu60hpp5WYva8dCrSUd1bQi6'
    });

    var received_data = ctx.data;

    //"assigned", "unassigned", "labeled", "unlabeled", "opened", "closed", or "reopened"

    var message = null;
    switch(received_data.action ) {
        case "opened":
            message = "We have new opened issue. Help us! "+received_data.issue.html_url;
            break;
        case "closed":
            message = "Congratulate "+received_data.issue.user.login+" for fixing our issue #"+received_data.issue.number+" !";
            break;
        case "reopened":
            message = "Oh crap :( Issue #"+received_data.issue.number+" is opened again. Help!";
            break;
        case "assigned":
            message = "Congratulate "+received_data.issue.user.login+" for taking one of our issues!";
            break;
        default:
            message = null;
            break;
    }

    if(message != null) {
        twitter.post('statuses/update', { status: message }, function(err, data, response) {
            done(null, data);
        });
    }



};
