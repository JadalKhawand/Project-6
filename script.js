let notesContainer = document.querySelector(".notes-container");
let notes = [
  {
    id: "1",
    content: "Lorem ipsum dolor sit amet consectetur adipisi.",
    priority: 1,
    category: "home",
    profile: "profile.jpeg",
  },

];

updateUINotesContainer(notes);
function updateUINotesContainer(noteItem) {
  notesContainer.innerHTML = ""
  noteItem.forEach(function (noteItems) {
    let noteHTML = generateNoteHTML(noteItems);
    notesContainer.innerHTML += noteHTML;
  });
}
function generateNoteHTML(noteItem) {
  return `
  <div class="flex gap-5 items-center relative">
    <div class="image h-10 w-10 overflow-hidden text-white">
      <img src="${noteItem.profile}" />
    </div>
    <p>${noteItem.content}</p>
    <span onclick="removeFromList('${noteItem.id}')" class="absolute top-0 right-2 rounded-full p-3 bg-white text-black cursor-pointer">X</span>
  </div>
  `;
}
// updateUINotesContainer(generateNoteHTML(noteItem));

function handleUserInput() {
  let allInputsValid = true;
  if (!validateContent()) {
    allInputsValid = false;
  }
  if(!validatePriority()){
    allInputsValid = false
  }
  if(!validateCategory()){
    allInputsValid = false
  }
  if (allInputsValid) {
    submitToBackend();
  }
}
function submitToBackend() {
  let content = document.querySelector("#content").value;
  let selectedPriority = validatePriority();
  let selectedCategory = document.querySelector('#category').value;
  let currentId = notes.length
  
  let newNote = {
    id: String(++currentId), 
    content: content,
    priority: parseInt(selectedPriority),
    category: selectedCategory,
    profile: "profile.jpeg", 
  };

  
  notes.push(newNote);
  notes = sortPriorityeDesc(notes)
  updateUINotesContainer(notes)
}
function validateContent() {
  let content = document.querySelector("#content");
  if (!content.value) {
    document.querySelector("#content-error").classList.remove("hidden");
    return false;
  }
  document.querySelector("#content-error").classList.add("hidden");
  return true;
}
function validatePriority() {
  let priorityInputs = document.getElementsByName('PriorityInput')
  let selectedPriority = null
  for(let i=0;i<priorityInputs.length;i++)
  {
    if(priorityInputs[i].checked){
      selectedPriority = priorityInputs[i].id;
      break
    }
  }
  if (!selectedPriority) {
    document.querySelector("#priority-error").classList.remove("hidden");
    return null;
  }
  document.querySelector("#priority-error").classList.add("hidden");
  return selectedPriority;
}

function validateCategory(){

let categoryInput = document.querySelector('#category')
if(!categoryInput.value){
  document.querySelector('#category-error').classList.remove('hidden');
  return false;
}
document.querySelector('#category-error').classList.add('hidden');
return true;
}
function removeFromList(noteId) {
  const noteIndex = notes.findIndex(note => note.id === noteId);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);

    
    updateUINotesContainer(notes);

  }
  else 
    console.log("failed")
}
function sortPriorityeAsc(notesItems) {
  let sortedArr = notesItems.sort(function (prod1, prod2) {
    return prod1.priority - prod2.priority;
  });

  return sortedArr;
}

function sortPriorityeDesc(notesItems) {
  let sortedArr = notesItems.sort(function (prod1, prod2) {
    return prod2.priority - prod1.priority;
  });

  return sortedArr;
}