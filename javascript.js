let events = [];
let archive = [];

let form = document.getElementById("event-form");

function btn1(event) {
  changeView(event);
}

function changeView(event) {
  const sectionName = event.currentTarget.dataset.screen;
  const allsection = document.getElementsByTagName("section");
  for (let element of allsection) {
    element.classList.remove("is-visible");
  }
  document.querySelector(`section[data-screen=${sectionName}]`).classList.add("is-visible");
}

function handleFormSubmit() {
  let regexText = /^[A-Za-zÀ-ÿ\s]+$/;
  let regexNumbers = /^\d+$/;
  let regexPrice = /^\d+(\.\d{1,2})?$/;
  let regexVariantType = /^[A-Za-z0-9\s]+$/;
  let regexURL = /^https?:\/\/.+\..+/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementById("event-title").value.trim();
    let eventImg = document.getElementById("event-image").value.trim();
    let eventDescription = document.getElementById("event-description").value.trim();
    let eventSeats = document.getElementById("event-seats").value.trim();
    let eventPrice = document.getElementById("event-price").value.trim();

    let inputVariantRowName = document.querySelector(".input.variant-row__name").value.trim();
    let inputVariantRowQty = document.querySelector(".input.variant-row__qty").value.trim();
    let inputVariantRowValue = document.querySelector(".input.variant-row__value").value.trim();
    let selectVariantRowType = document.querySelector(".select.variant-row__type").value.trim();

    if (!regexText.test(title)){
         alert("Titre incorrect")
         return;
    }
    if (!regexURL.test(eventImg)){
         alert("URL de l'image incorrecte")
         return;
    }
    if (!regexText.test(eventDescription)){
          alert("Description incorrecte")
            return;
    }
    if (!regexNumbers.test(eventSeats)){
        alert("Nombre de places incorrect")
      return;

    }
    if (!regexPrice.test(eventPrice)){
        alert("Prix incorrect")
        return;
    }
    if (!regexText.test(inputVariantRowName)) {
        alert("Nom du variant incorrect")
       return;
    }
    if (!regexNumbers.test(inputVariantRowQty)){
        alert("Quantité du variant incorrecte")
        return;
    }
         
    if (!regexPrice.test(inputVariantRowValue)){
        alert("Valeur du variant incorrecte")
        return;
    }
    if (!regexVariantType.test(selectVariantRowType)){
        alert("Type du variant incorrect")
       return;
    }
    events.push({
        title,
        eventImg,
        eventDescription,
        eventSeats: Number(eventSeats),
        eventPrice : Number(eventPrice)
    })
    let nmbrevent = document.getElementById("stat-total-events");
    nmbrevent.innerHTML=events.length;
    
    const totalPrice = events.reduce((sum, e) => sum + e.eventPrice * e.eventSeats, 0);
    let nmbplace = document.getElementById("stat-total-price").textContent="$"+ totalPrice.toFixed(2);
    nmbplace.innerHTML=`${totalPrice}`;

    let totalSeats = events.reduce((sum, e) => sum + e.eventSeats, 0);
    const totallSeats = document.getElementById("stat-total-seats").textContent = totalSeats;
    totallSeats.innerHTML=`${totalSeats}`;
    form.reset();
  });
}
handleFormSubmit();
function addVariantRow(){
    
    const btn2 = document.getElementById("btn-add-variant");
    //btn plus
    const variantslist = document.getElementById("variants-list");
    //div fax radi nzido varient
        const variantrow = document.getElementById("variant-row");
        //element li brina ndiro lih nodeclone
    btn2.addEventListener("click",()=>{
        
        const varian = variantrow.cloneNode(true);
        variantslist.appendChild(varian);
        varian.removeAttribute("id");
        // varian.reset();id="input variant-row"
        const idinput = document.querySelectorAll(".variant-row");
        const btnremouve = varian.querySelector(".variant-row__remove");
            //daba xi div tzad f varion kanmxi kan9lab 3la btn li kayna fih (hadak li zad)  htito f btnremouve au galt liha add EventListener ila click => varian.remove() itmsah div kaml
            idinput.forEach(input=>{
                input.value = "";
            })
                btnremouve.addEventListener("click",()=> {
                    varian.remove();
             }) 

    })
    // variants-list=> hadi hiyasrira  || variants=>hadi hiya alkbira
}
 addVariantRow();
 // Save/load from localStorage
function loadData() {

    // TODO: Load events and archive from localStorage
    // JSON.parse(localStorage.getItem('events'))
}