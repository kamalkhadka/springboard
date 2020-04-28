// $("img").click(function () {
//   alert("Hello");
// });

$("img").on("mouseenter", function () {
  $(this).css("border", "5px solid red");
});

$("img").on("click", function () {
  // $(this).fadeOut(3000, function(){
  //   $(this).remove();
  // });
  $(this).animate( {
    opacity: 0.3,
    width: "50px",
  }, 3000, function(){
    $(this).remove();
  });
});

$("#add-input").on("click", function () {
  $("form").append('<input type="text">');
});

$("form").on("focus", "input", function () {
  $(this).val("BAMBOOZLED");
});
