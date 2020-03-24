compHead = document.getElementById('compHead'),
container = document.getElementsByClassName('container')[0],
compName = document.getElementById('compName'),
infoBtn = document.getElementById('infoBtn'),
info = document.getElementById('info'),
objName = document.getElementById('objName'),
objDesc = document.getElementById('details'),
closInfo = document.getElementById('closeInfo');
let compBtns;
document.getElementById('comp-load').style.display = "none";
fetch('./data/components.json')
.then(res => res.json())
.then((data)=>{
  data.components.forEach((comp)=>{
    container.innerHTML +=
    `
      <div class="card">
        <img src="./images/${comp.image}" class="card-img-top" width="200" height="200" alt="">
        <div class="card-body">
          <h3 class="card-title">${comp.name}</h3>
          <p class="card-text">${comp.smallDescription}</p>
          <a href="#" class="compBtn" data-name=${comp.id}>شاهد المكون 3D</a>
        </div>
      </div>
    `
  });
})
.then(()=>{
  compBtns = document.querySelectorAll('.compBtn');
  compBtns.forEach((compBtn)=>{
    let name = compBtn.dataset.name;
    compBtn.onclick = ()=> {
      console.log(compBtn.dataset.name);
      fetchComp(name)
    }
  });
});

infoBtn.addEventListener('click', openInfoCon);
closeInfo.addEventListener('click', closeInfoCon);

function fetchComp (name){
  fetch('./data/components.json')
  .then(res => res.json())
  .then((data)=>{
    let comp = data.components.filter((comp)=>{
      return comp.id == name
    });
    if(comp && comp.length){
      //console.log(comp[0].id, name);
      loadobject(comp[0].mtlFile, comp[0].objFile);
      details(comp[0].name, comp[0].description);
    } else {
      //console.log('مفيش الكلام ده حضرتك وبطل تلعب في اللينك');
      container.innerHTML =
        `<div class="col-md-4 component">
          مفيش الكلام ده حضرتك وبطل تلعب في اللينك
        </div>
        `
    }
  })
}


function details(name, desc){
  compHead.style.display = "none";
  compName.style.display = "block";
  infoBtn.style.display = "block";
  compName.textContent = name.toUpperCase();
  objName.textContent = name;
  objDesc.innerHTML = desc;
}

function openInfoCon() {
  info.style.display = "flex";
}
function closeInfoCon(){
  info.style.display = "none";
}

let controlsBtn = document.getElementById('toggleControls'),
    guiContainer = document.getElementById('my-gui-container');
    console.log(guiContainer);
controlsBtn.addEventListener('click', toggleControls);
function toggleControls(){
  if(controlsBtn.dataset.toggle == "hidden"){
    guiContainer.classList.add('show-controls');
    controlsBtn.dataset.toggle = "show";
  }else{
    guiContainer.classList.remove('show-controls');
    controlsBtn.dataset.toggle = "hidden";
  }
}
