//script.js
console.log($.fn.jquery);
setInterval(function(){
    $('li:not(:contains('+$("#search").val()+'))').hide();
    $('li:contains('+$("#search").val()+')').show();
    $("#searchnum").text("ヒット数:"+$("li:visible").length);
},500);
