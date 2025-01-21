/* === default functions ====*/

    /* =Collapse Function = */

    document.querySelectorAll(".toggleButton").forEach((toggleButton) =>{
        toggleButton.addEventListener('click',() => {
            //selecionando o elemento pai "collapse"
            const collapse = toggleButton.closest(".collapse");
            //encontrando o elemento colapsável
            const collapseContent = collapse.querySelector(".collapseContent");
            //adicionando a classe de expansão 
            if(collapseContent){
                const isExpanded = collapseContent.classList.toggle("expanded");
                toggleButton.textContent = isExpanded? "-" : "+";
            }

        })
     
    });

    //Adiciona a classe "expanded" e altera ícone do botão
   


/* == Clock Function ===*/
function updateClock(){
    const now = new Date();
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');

    document.getElementById('clock').textContent = `${hours}:${minutes}`
}
    // Atualizar o relógio a cada segundo
    setInterval(updateClock, 1000);

    // Chamar a função imediatamente para evitar atraso inicial
     updateClock();





