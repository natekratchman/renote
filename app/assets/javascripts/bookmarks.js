$(function(){
  var player = new Player({
    videoId: 'the_video'
  });

  $('#bookmarks').on('click', '.edit-bookmark-button',function(event){
    var the_bookmark = $(this).parents('div .bookmark');
    var the_container = the_bookmark.parents('.news-item');
    var content = the_bookmark.find('a.bookmark').text();
    the_bookmark.empty();

    var $input = $('<input class="edit-news-content">');
    var $button = $('<button id="update" class="btn btn-qubico btn-block">Update</button>');
    $input.val(content);
    the_bookmark.append($input);
    the_bookmark.append($button);
    $button.on('click', function(e){

      var data = {
        bookmark: {
          title: $input.val()
        } 
      };
      $.ajax('/videos/' + the_container.data('video') + '/bookmarks/' + the_container.data('id'), {
        method: 'patch',
        data: data,
        dataType: 'script'
      }).done(function() {
          player.render();
        });
    })
  });
  //END click event


  $('#bookmarks').on('click', '.delete-bookmark-button',function(event){
    var the_bookmark = $(this).parents('div .bookmark');
    var the_container = the_bookmark.parents('.news-item');

      $.ajax('/videos/' + the_container.data('video') + '/bookmarks/' + the_container.data('id'), {
        method: 'delete',
        dataType: 'script'
      }).done(function() {
          player.render();  
        });
      // END ajax done
  })
  // END click event
})