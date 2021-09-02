let backgroundPage;
(function () {
    var otherWindows = chrome.extension.getBackgroundPage();
    backgroundPage = otherWindows;
})();
window.onload = function() {
refreshNote();
//document.getElementById('thing').onclick = createJSON;
document.getElementById('delete').onclick = deleteAllNotes;
document.getElementById('test').onclick = test;
}

function refreshNote(){
  var notes = backgroundPage.getAllItems();
  for (var i = 0; i < notes.length; i++) {
    //createNewNote(notes[i]);
  newTestFunction(notes[i])}
}
function replaceTextArea (id, text){
  var textArea = $('<textarea>',{
    class: "title title-text",
    text: text}
  ).keypress({value:[text, id]},function(e){
    var oldText = e.data.value[0];
    var newText = $(this).val();
    var id = e.data.value[1];
    if (e.which == 13){
      if (newText == oldText){
        replaceDivTitle (id, oldText)
      }else{
        var idLocal = id.split('-')[1];
        backgroundPage.editItem(idLocal, newText);
        replaceDivTitle (id, newText)
      }
    }
  });
  $('#'+id).find(".title").replaceWith(textArea);
}
function replaceDivTitle (id, text){
  var div = $('<div>',{
    class:'title',
    text: text  })
  .dblclick({value: [text, id]},function (e){
    var id, titleText;
    titleText = e.data.value[0];
    id = e.data.value[1];
    replaceTextArea(id, titleText); });
    $('#'+id).find(".title").replaceWith(div);
  }

function newTestFunction(item){
  var newContent = $("<div>", {
    id: 'id-'+item.id,
    "class": "Note"
  });
  newContent.append(
    $("<div>", {"class": "title", text: takeTitle(item)})
      .dblclick({value: [takeTitle(item), 'id-'+item.id]},function (e){
        var id, titleText;
        titleText = e.data.value[0];
        id = e.data.value[1];
        replaceTextArea(id, titleText);

        //$(this).replaceWith($("<textarea>",{class: "title text-title", text: e.data.value[0]}))
      })
    )
  .append($("<div>",{"class": "text", text: item.text}))
  .append($("<div>",{"class": "link"})
    .append($("<a>",{
          "href": item.url,
          text: "Link"}
    )))
  .append($("<div>",{"class":"delet_button"})
    .append($("<button>",{"class":"del", text: "Delete"})
        .click({value: item.id},function (e){deletElement(e.data.value)})));
  newContent.appendTo('#default_content');
}

function deletElement(id){
  $("#id-"+id).remove();
  backgroundPage.deleteItem(id);
}



function takeTitle(note){
  if (note.title == undefined){
    return "Заголовок";
  } else {
    return note.title;
  }
}


function deleteAllNotes(){
  $(".Note").remove();
  backgroundPage.deleteLocalStorage();
}

function replaseOnTextArea(){

}


function test(){
  alert("Крик!");
  var notes = backgroundPage.getAllItems();
  alert("Крик!");
  for (var i = 0; i < notes.length; i++){
    alert(notes[i].text)
  };
}
function testMessage(){ alert("Test Message");}
function tM(e){ alert(e);}
