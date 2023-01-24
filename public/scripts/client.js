/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // const data = [
  //   {
  //     user: {
  //       name: "Newton",
  //       avatars: "https://i.imgur.com/73hZDYK.png",
  //       handle: "@SirIsaac",
  //     },
  //     content: {
  //       text: "If I have seen further it is by standing on the shoulders of giants",
  //     },
  //     created_at: 1461116232227,
  //   },
  //   {
  //     user: {
  //       name: "Descartes",
  //       avatars: "https://i.imgur.com/nlhLi3I.png",
  //       handle: "@rd",
  //     },
  //     content: {
  //       text: "Je pense , donc je suis",
  //     },
  //     created_at: 1461113959088,
  //   },
  // ];
  ///Function to render the tweets
  const renderTweets = function (tweets) {
    const $tweetsContainer = $("#tweets-container");
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };

  ///Function to create one tweet
  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet">
   <header class="tweet-header">
     <div class="username">
       <span><img src = ${tweet.user["avatars"]}</span>
       <span>${tweet.user["name"]}</span>
     </div>
     <p class="user-id">${tweet.user["handle"]}</p>
   </header>
   <div class="tweet-text">
   ${tweet.content["text"]}
   </div>
   <footer class="tweet-footer">
     <aside>${timeago.format(tweet.created_at)}</aside>
     <div class="tweet-actions">
       <i class="fa-solid fa-flag"></i>
       <i class="fa-solid fa-retweet"></i>
       <i class="fa-solid fa-heart"></i>
     </div>
   </footer>
 </article>`;
    return $tweet;
  };
  /////Event Listener for Submit form and Ajax request for post
  const $form = $(".new-tweetform");
  $form.submit(function (event) {
    event.preventDefault();
    const queryString = $form.serialize();
    // console.log(queryString);
    $.post("/tweets", queryString, (response) => {
      console.log(queryString);
    });
  });
  ////Function to fetch tweets
  const loadTweets = function () {
    ///Triggering the button
    const $tweetButton = $(".tweet-button");
    $tweetButton.on("click", function () {
      //to get using ajax

      $.get("http://localhost:8080/tweets")
        .then((response) => {
          // console.log(response)
         renderTweets(response)
        });
    });
  };
  loadTweets();
  // renderTweets(data);
});
