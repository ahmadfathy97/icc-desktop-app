let compHead = document.getElementById('compHead'),
container = document.getElementsByClassName('container')[0],
compName = document.getElementById('compName'),
infoBtn = document.getElementById('infoBtn'),
info = document.getElementById('info'),
objName = document.getElementById('objName'),
objDesc = document.getElementById('details'),
closInfo = document.getElementById('closeInfo'),
readMoreLoader = document.getElementById('readMore-loader');
let compBtns;
document.getElementById('comp-load').style.display = "none";
fetch('./data/components.json')
.then(res => res.json())
.then((data)=>{
  data.components.forEach((comp)=>{
    container.innerHTML +=
    `
      <div class="card">
        <img src="../components/images/${comp.image}" class="card-img-top" width="200" height="200" alt="">
        <div class="card-body">
          <h3 class="card-title">${comp.name}</h3>
          <p class="card-text">${comp.smallDescription}</p>
          <span href="#" role="button" class="readMore" onclick="readMore('${comp.id}')">قراءة المزيد...</span>
          <a href="#" class="compBtn btn btn-primary" data-name=${comp.id}>شاهد المكون 3D</a>
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

function fetchComp (name){
  fetch('./data/components.json')
  .then(res => res.json())
  .then((data)=>{
    let comp = data.components.find((comp)=>{
      return comp.id == name
    });
    if(comp){
      //console.log(comp[0].id, name);
      loadobject(comp.mtlFile, comp.objFile);
      details(comp.name, comp.description);
    } else {
      //console.log('مفيش الكلام ده حضرتك وبطل تلعب في اللينك');
      container.innerHTML =
        `<div class="col-md-4 component">
          مفيش الكلام ده حضرتك وبطل تلعب في اللينك
        </div>
        `
    }
  })
};

function readMore(id){
  readMoreLoader.style.display = 'flex';
  fetch('./data/components.json')
  .then(res => res.json())
  .then((data)=>{
    let comp = data.components.find((comp)=>{
      return comp.id === id
    });
    readMoreLoader.style.display = 'none';
    info.style.display = "flex";
    objName.textContent = comp.name || "خطأ";
    objDesc.innerHTML = comp.description || "حدث خطأ اثناء التحميل من فضلك تأكد أن الانترنت يعمل وأعد المحاولة مرة اخري";
  }).catch((err)=>{
    console.log(err);
    readMoreLoader.style.display = 'none';
    info.style.display = "flex";
    objName.textContent = "خطأ";
    objDesc.innerHTML = "حدث خطأ اثناء التحميل من فضلك تأكد أن الانترنت يعمل وأعد المحاولة مرة اخري";
  })
};
infoBtn.addEventListener('click', openInfoCon);
closeInfo.addEventListener('click', closeInfoCon);



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
};
