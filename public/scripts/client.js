/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  ///Function to render the tweets
  const renderTweets = function (tweets) {
    const $tweetsContainer = $("#tweets-container");
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      // $tweetsContainer.empty();
      $tweetsContainer.prepend($tweet);
    }
  };

  ////Function to fetch tweets
  const loadTweets = function () {
    $.get("http://localhost:8080/tweets").then((response) => {
      // console.log(response)
      renderTweets(response);
    });
  };

  ///Function to create one tweet
  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet">
   <header class="tweet-header">
     <div class="username">
       <span><img src = ${tweet.user["avatars"]}></span>
       <span class="person">${tweet.user["name"]}</span>
     </div>
     <p class="user-id">${tweet.user["handle"]}</p>
   </header>
   <div class="tweet-text">
    ${escape(tweet.content["text"])} 
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
  //// Function for cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //// To initially populate the page with old tweets
  loadTweets();

  /////Event Listener for Submit form and Ajax request for post
  const $form = $(".new-tweetform");
  $form.submit(function (event) {
    event.preventDefault();
    const data = $form.serialize();

    //Checking the form Validations::
    const $tweetInput = $("#tweet-text").val();
    const $longError = $(".long-error");
    const $shortError = $(".short-error");
    if ($tweetInput.length > 140) {
      $longError.css("display", "block").fadeOut(4000);
    } else if (!$tweetInput || $tweetInput.trim().length === 0) {
      $shortError.css("display", "block").fadeOut(4000);
    } else if ($tweetInput.length <= 140)
      $.post("/tweets", data).then(() => {
        $form.trigger("reset");
        loadTweets();
      });
  });

  ////jQuery to form toggle events(stretch)
  $(".new-button").click(function () {
    $(".fa-angles-down").replaceWith(
      $("<i class = 'fa-solid fa-angles-up '><i/>")
    );
    $(".scroll-button").fadeOut(1000);
    $(".new-tweet").slideDown("slow").css("display", "block");
  });
  ////Scroll events

  $(window).scroll(function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      $(".right-header").css("visibility", "hidden");
      $(".scroll-button").css("display", "block");
    } else {
      $(".right-header").css("visibility", "visible");
      $(".scroll-button").css("display", "none");
    }
  });

  ///When the user clicks on the button, scroll to the top

  $(".scroll-button").click(function () {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // $(".right-header").css("visibility", "visible");
    $(".fa-angles-down").replaceWith(
      $("<i class = 'fa-solid fa-angles-up '><i/>")
    );
    $(".new-tweet").slideDown("slow").css("display", "block");
    $(".scroll-button").fadeOut(1000);
  });
});
