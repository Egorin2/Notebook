var COUNT_NOTE = 0;
const KEY_BASE = "Note-";


function deleteLocalStorage (){
	localStorage.clear();
  COUNT_NOTE = 0;
}

function setLocalStorage (string){
  COUNT_NOTE++;
  localStorage.COUNT_NOTE = COUNT_NOTE;
  localStorage.setItem(KEY_BASE + COUNT_NOTE, string);
}
function getAllItems(){
  var notes = [];
  for (var i = 0; i<localStorage.length; i++){
		let keyItem = localStorage.key(i);
		//notes[i] = localStorage.key(i);
    notes[i] = JSON.parse(localStorage.getItem(keyItem))
  }
  return notes;
}
function pizdec (){
  return 'РАБОТАЕТ НАХУЙ!'
}

function getItem (note){
  var id = 1;
  while (!checkClearId(id)) id++;
  note.id = id;
  var json = JSON.stringify(note);
  localStorage.setItem(KEY_BASE+id, json);
}

function checkClearId (id){
  if (localStorage.getItem(KEY_BASE+id)==null){
    return true
  }
  else {
    return false
  }
}
function editItem (id, string){
  var item = JSON.parse(localStorage.getItem(KEY_BASE+id));
  item.title = string;
  localStorage.setItem(KEY_BASE+id, JSON.stringify(item));
}
function deleteItem (id){
	localStorage.removeItem(KEY_BASE+id);
}
