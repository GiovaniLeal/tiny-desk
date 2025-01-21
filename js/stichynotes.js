
/* == + Criar nova nota + ==  */
const newStickyNote = document.getElementById("createNewNote");
const note = document.querySelector(".addSticky");

//evento de clique
newStickyNote.addEventListener("click",()=>{
   const textValue = prompt("Adicionar nota:");//adicionar modal 
    if(textValue){
        addNewNote(textValue);
        saveNotes();
    }

});

//funcão para adicionar e excluir nova nota
function addNewNote (noteValue, color){
     
    const div = document.createElement("div");
    
    //adicionando a classe  newNote a div criada 
    div.classList.add("newNote");
    div.innerHTML = `
    <span class="material-icons">clear</span>`;

    //adicionando o texto a div 
    const noteText = document.createElement("p");
    noteText.textContent = noteValue;

    //torna paragrafo editável
    noteText.contentEditable = true;

    //adiciona paragrafo a div 
    div.appendChild(noteText);

    // Adiciona a nova nota como irmão do botão de adicionar
    newStickyNote.parentNode.insertBefore(div, newStickyNote.nextSibling);

    //edição da nota
    div.addEventListener("click",()=>{
        noteText.focus();
    })
    noteText.addEventListener("blur", () => {
        saveNotes();
    });
    

    //Salva edição da nota no localStorage 
    div.querySelector("p").addEventListener('blur',()=>{
        saveNotes();
    })



    //Excluir nota 
    const removeNote = div.querySelector(".material-icons");
    removeNote.addEventListener("click",() =>{
        div.remove();
        saveNotes();
    });

    //Adicionando cores de fundo as notas 
    if(color){
        div.style.background = color
    } else {
        stickyColor(div);
    }
}







//Salvar notas no localStorage
function saveNotes (){

    const stickyNotes = []
    note.querySelectorAll(".newNote").forEach(div =>{
        const noteText = div.querySelector("p").textContent
        stickyNotes.push({Note: noteText, Color: div.style.background});
    });

    localStorage.setItem("stickyNotes", JSON.stringify(stickyNotes));
}

//Recuperar notas do localStorage 
function loadNotes (){
    const loadNotes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
    loadNotes.forEach(notes => addNewNote(notes.Note, notes.Color));
    
}
document.addEventListener("DOMContentLoaded", loadNotes);

//Adicionando cores aleatórias as notas
function stickyColor(backgroundElement){
    const pastelColors = ["#FFD966", "#D9F2D9", "#F9D9EB", "#D9EAF9", "#FAD9B6", "#EAD9FA"];
    const randomColors = pastelColors[Math.floor(Math.random()*pastelColors.length)];
    backgroundElement.style.background = randomColors;
}

