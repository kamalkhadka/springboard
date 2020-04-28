$(function () {
  $("form").on("submit", function (evt) {
    evt.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();
    let $item = $("<li></li>");
    $item.text("Title: " + title + " Rating: " + rating);
    let $removeButton = $("<button></button>");
    $removeButton.text("Remove");
    $item.append($removeButton);
    $("ul").append($item);
    $("form").each(function(){
        this.reset();
    });
  });
  $('ul').on('click', 'button', function(){
      $(this).parent().remove();
  })
});
