let events = [
  // {
  //   "eventDescription": "asdfghj",
  //   "eventImg":"https://cdn.pixabay.com/photo/2019/06/26/09/52/shit-image-4300034_1280.jpg",
  //   "eventPrice": 33,
  //   "eventSeats": 12,
  //   "title": "poofjej",
  //   "variants": [
  //     {
  //       id: 1
  //       name: ""
  //       qty: ""
  //       type: "fixed"
  //       value: ""
  //     },
  //     {

  //     }
  //   ]
  // },
  // {

  // }



];
let varientt = [];

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

  form.addEventListener("submit", (e) =>{
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

    if (!regexText.test(title)) {
      alert("Titre incorrect")
      return;
    }
    if (!regexURL.test(eventImg)) {
      alert("URL de l'image incorrecte")
      return;
    }
    if (!regexText.test(eventDescription)) {
      alert("Description incorrecte")
      return;
    }
    if (!regexNumbers.test(eventSeats)) {
      alert("Nombre de places incorrect")
      return;

    }
    if (!regexPrice.test(eventPrice)) {
      alert("Prix incorrect")
      return;
    }
    if (!regexText.test(inputVariantRowName)) {
      alert("Nom du variant incorrect")
      return;
    }
    if (!regexNumbers.test(inputVariantRowQty)) {
      alert("Quantité du variant incorrecte")
      return;
    }

    if (!regexPrice.test(inputVariantRowValue)) {
      alert("Valeur du variant incorrecte")
      return;
    }
    if (!regexVariantType.test(selectVariantRowType)) {
      alert("Type du variant incorrect")
      return;
    }
      
    events.push({
      title,
      eventImg,
      eventDescription,
      eventSeats: Number(eventSeats),
      eventPrice: Number(eventPrice)

    })
    let conteur = 0;
    events.forEach((event)=>{
      event.id = conteur++;
    });

    // events[0].id+=conteur;
    //     conteur++;

    console.log(conteur);
    let nmbrevent = document.getElementById("stat-total-events");
    nmbrevent.innerHTML = events.length;
    const totalPrice = events.reduce((sum, e) => sum + e.eventPrice * e.eventSeats, 0);
    let nmbplace = document.getElementById("stat-total-price").textContent = "$" + totalPrice.toFixed(2);
    nmbplace.innerHTML = `${totalPrice}`;

    let totalSeats = events.reduce((sum, e) => sum + e.eventSeats, 0);
    const totallSeats = document.getElementById("stat-total-seats").textContent = totalSeats;
    totallSeats.innerHTML = `${totalSeats}`;
    // addVariantRow(varrryon);
    affichage();
    form.reset();
  });
}
handleFormSubmit();
let count = 1;
function addVariantRow(varrryon) {
  let inputvariantrowname = document.querySelector(".variant-row__name").value.trim();
  console.log(inputvariantrowname);
  const inputvariantrowqty = document.querySelector(".variant-row__qty").value.trim();
  console.log(inputvariantrowqty);
  const inputvariantrowvalue = document.querySelector(".variant-row__value").value.trim();
  console.log(inputvariantrowvalue);
  const selectvariantrowtype = document.querySelector(".variant-row__type").value.trim();
  console.log(selectvariantrowtype);
  let valuevarian = {
    id: count,
    name: inputvariantrowname,
    qty: inputvariantrowqty,
    value: inputvariantrowvalue,
    type: selectvariantrowtype,
  }
  count++;
  varientt.push(valuevarian);
  
  // varrryon.varientt.push(valuevarian);
  // event.variant = [...event.variant,{ }]
  // TODO: event.variants.push(valuevarian);

  // events.push(varientt);
  // console.log(events);
  const btn2 = document.getElementById("btn-add-variant");
  //btn plus
  const variantslist = document.getElementById("variants-list");
  //div fax radi nzido varient
  const variantrow = document.getElementById("variant-row");
  //element li brina ndiro lih nodeclone
  btn2.addEventListener("click", () => {
    const varian = variantrow.cloneNode(true);
    variantslist.appendChild(varian);
    varian.removeAttribute("id");
    // varian.reset();id="input variant-row"
    const idinput = document.querySelectorAll(".variant-row");
    const btnremouve = varian.querySelector(".variant-row__remove");
    //daba xi div tzad f varion kanmxi kan9lab 3la btn li kayna fih (hadak li zad)  htito f btnremouve au galt liha add EventListener ila click => varian.remove() itmsah div kaml
    idinput.forEach(input => {
      input.value = "";

    })
    btnremouve.addEventListener("click", () => {
      varian.remove();
    })

  })
  // variants-list=> hadi hiyasrira  || variants=>hadi hiya alkbira
}

function ajouteEvenment() {
  let title = document.getElementById("event-title").value.trim();
  const divPrincipal = document.createElement("div");
  divPrincipal.innerHTML = `${title},${eventDescription},${eventSeats},${eventPrice}`
  const distence = document.getElementById("events-pagination");
  distence.appendChild(divPrincipal);
}
function affichage() {
  const tbody = document.querySelector(".table__body");
  tbody.innerHTML ="";
  events.forEach(ev => {
    tbody.innerHTML += `
                                   <tr class="table__row" data-event-id="">
                                    <td>${ev.id}</td>
                                    <td>${ev.title}</td>
                                    <td>${ev.eventSeats}</td>
                                    <td>$${ev.eventPrice}</td>
                                    <td><span class="badge">3</span></td>
                                    <td>
                                        <button class="btn btn--small" data-action="details" id="Details">Details</button>
                                        <button class="btn btn--small" data-action="edit" id="Edit">Edit</button>
                                        <button class="btn btn--danger btn--small" data-action="archive" id="Delete">Delete</button>
                                    </td>
                                </tr>`

  })
}
function Deletee(){
  const tbody = document.querySelector(".table__body");
  const butn = document.getElementById("Delete");
  butn.addEventListener("click",()=>{
    

    

  })
}





























// addVariantRow();
// Save/load from localStorage
// function loadData() {

// TODO: Load events and archive from localStorage
// JSON.parse(localStorage.getItem('events'))
// }



    // for(element of events ){
    //   if(element = btnclick.id){
    //     const btnclick = butn.currentTarget.id;
    //     btnclick.remove();
    //     archive.push(btnclick);
    //     tbody.innerHTML+=btnclick.outerHTML;
        
    //   }

    // }