let motherboard;
(function () {
    let otherWindows = chrome.extension.getBackgroundPage();
    motherboard = otherWindows;
})();
window.onunload = function(){motherboard.spliceList()}
window.onload = function() {
refreshNote();
//document.getElementById('thing').onclick = testLSconf;
document.getElementById('delete').onclick = deleteAllNotes;
//document.getElementById('test').onclick = test2;
}

function refreshNote(){                      //обновление списка
  let listNote = motherboard.getListPubNote();
  for (let i = 0; i < listNote.length; i++) {
    if (listNote[i].isParent){
      let parent = createParent(listNote[i]);
      parent.appendTo('#default_content');
      continue;
    }
  let newContent = newTestFunction(listNote[i]);
  newContent.appendTo('#default_content')
}
}

function createParent(parent){
  let parentNote = $("<div>",{class: "ParentNote"})
  .append(replaceDivTitle(parent))
  .append($("<div>",{"class": "link"})
    .append($("<a>",{
          href: parent.url, text: "Link"})))
  .append($("<div>",{class: "delet_button"})
  .append($("<button>",{"class":"del", text: "Delete"})
      .click({value: parent},function (e){
        deletElement(e.data.value);
        $(this).parent().parent().remove();
      })));
  let childDiv = $("<div>",{class: "ChildrenDiv"});
  for (let i = 0; i < parent.child.length; i++){
    let child = createChild(parent.child[i]);
    child.appendTo(childDiv);
  }
  childDiv.appendTo(parentNote);
   return parentNote;
}

function createChild(child){

  let childNote = $("<div>",{class:"ChildNote"})
  .append($("<div>",{class: "text", text:child.text}))
  .append($("<div>",{class: "delet_button"})
  .append($("<button>",{"class":"del", text: "Delete"})
      .click({value: child},function (e){
        deletElement(e.data.value);
        $(this).parent().parent().remove();
      })));
  return childNote;
}

function replaceTextArea (note){
  let textArea = $('<textarea>',{
    class: "title title-text",
    text: note.title}
  ).keypress({value: note},function(e){
    let note = e.data.value;
    let newText = $(this).val();
    if (e.which == 13){
        motherboard.editInNote(note, newText);
        let div = replaceDivTitle (note);
        $(this).replaceWith(div);

    }
  });
  return textArea;
}
function replaceDivTitle (note){
  let div = $('<div>',{
    class:'title',
    text: note.title  })
  .dblclick({value: note},function (e){
    let textarea = replaceTextArea(e.data.value);
    $(this).replaceWith(textarea); });
    return div;
  }

function newTestFunction(item){
  let newContent = $("<div>", {
    "class": "Note"
  });
  newContent.append(replaceDivTitle(item))
  .append($("<div>",{"class": "text", text: item.text}))
  .append($("<div>",{"class": "link"})
    .append($("<a>",{
          "href": item.url,
          text: "Link"}
    )))
  .append($("<div>",{"class":"delet_button"})
    .append($("<button>",{"class":"del", text: "Delete"})
        .click({value: item},function (e){
          deletElement(e.data.value);
          $(this).parent().parent().remove();
        })));
  return newContent;
}

function deletElement(note){
  motherboard.ereaseNote(note);
}


function deleteAllNotes(){
  $(".Note").remove();
  motherboard.clearList();
}




function testMessage(){ alert("Test Message");}
function tM(e){ alert(e);}
