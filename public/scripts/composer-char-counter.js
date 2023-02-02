$(document).ready(function () {
  const $character = $("textarea").on("input", function () {
    const parents = $character.parents();
    const counter = parents[1][2];
    counter.value = 140 - this.value.length;
    if (counter.value < 0) {
      $(counter).css("color", "red");
    }
    else {
      $(counter).css("color", "#084982");
    }
  });
 });
