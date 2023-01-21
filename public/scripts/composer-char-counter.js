$(document).ready(function() {
  const $character = $('textarea').on('input', function(){
      console.log(140-this.value.length) 
  })
});