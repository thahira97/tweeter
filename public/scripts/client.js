/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function (){
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }
  const createTweetElement = function (tweetData) {
   const $tweet =`<article class="tweet">
   <header class="tweet-header">
     <div class="username">
       <span><img src = ${tweetData.user["avatars"]}</span>
       <span>${tweetData.user["name"]}</span>
     </div>
     <p class="user-id">${tweetData.user["handle"]}</p>
   </header>
   <div class="tweet-text">
   ${tweetData.content["text"]}
   </div>
   <footer class="tweet-footer">
     <aside>${tweetData.created_at}</aside>
     <div class="tweet-actions">
       <i class="fa-solid fa-flag"></i>
       <i class="fa-solid fa-retweet"></i>
       <i class="fa-solid fa-heart"></i>
     </div>
   </footer>
 </article>`
   ;return $tweet
  };
  const $tweet = createTweetElement(tweetData);
  console.log($tweet)
  $('#tweets-container').prepend($tweet);
})