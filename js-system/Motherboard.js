let listPubNote = [];
let listURL = [];
let listName;

function PublickNote (noteRAW){
  if (noteRAW.title == undefined){
    this.title = "Заголовок";
  }else {
    this.title = noteRAW.title;
  }
  this.url = noteRAW.url;
  this.date = noteRAW.time;
  this.text = noteRAW.text;
  this.list = listPubNote;
}

function ParentNote(notePub, noteRAW){
  this.id = notePub.id,
  this.isParent = true,
  this.url = notePub.url,
  this.title = notePub.title,
  this.child = [new ChildNote(notePub, notePub.id, 0), new ChildNote(noteRAW, notePub.id, 1)]
};
function ChildNote(note, id, number){
  this.text = note.text,
  this.parentId = id,
  this.id = number
};

function refreshListNote(){
  for (var i = 0; i <listPubNote.length; i++){
    let note = listPubNote[i];
    if (note.isParent){
      for (let i = 0; i <note.child.length; i++){
        let child = note.child[i];
        child.list = note.child;
        child.parent = note;
      }
    }
    note.list = listPubNote;
  }
}

if (checkCONF()){
  listName = getListName();
  listPubNote = getListNote(listName);
  refreshListNote();
} else {
  listName = "NewListNote";
  createCONFIG(listName);
};
let timer = setInterval(() => saveListPubNote(listName, listPubNote), 3000)
window.unload = function(){saveListPubNote(listName, listPubNote);}
function checkURL(url) {
  for (let i = 0; i <listPubNote.length; i++) {
    let takeURL = listPubNote[i].url;
    if (url == takeURL){
      return i;
    }}
    return -1;
}
function spliceList(){
  for (let i = 0; i < listPubNote.length; i++){
    if(listPubNote[i] == undefined){
      listPubNote.splice(i, 1);
    }
    listPubNote[i].id = i;
  }
}
function refreshURLList(){
  listURL = [];
  for (let i = 0; i <listPubNote.length; i++){
    listURL[i] = listPubNote[i].url;
  }
}

function takeNote(note){
  refreshURLList();
  let i = listURL.indexOf(note.url);
  if (i > -1) {
    if (listPubNote[i].isParent){
      let child = new ChildNote (note, i, listPubNote[i].child.length);
      listPubNote[i].child.push(child);
      return;
    } else {
      let pubNote = listPubNote[i];
      let newParentNote = new ParentNote(pubNote, note);
      listPubNote[i] = newParentNote;
      return;
    }
  };
  let publicNote = new PublickNote(note);


  if (listPubNote == null){
    publicNote.id = 0;
    listPubNote = [publicNote];
  } else {
    publicNote.id = listPubNote.length;

    listPubNote.push(publicNote);
  }
};

function editNote (id, title){
  listPubNote[id].title = title;
}
function editInNote(note, title){
  note.title = title;
}
function testPubNote(){
  return JSON.stringify(listPubNote);
}

function clearList(){
  listPubNote = [];
delete localStorage[listName]}


function deleteNoteOnList(id){
  delete listPubNote[id]}
function ereaseNote(note){
  let list = note.list;
  list.splice(list.indexOf(note), 1);
  delete note;
}

function getListPubNote () {
  spliceList();
  return listPubNote;
}
