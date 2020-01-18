function loadDoc(index) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {  
        loadDataInModal(JSON.parse(this.responseText));
      }
    };
    xhttp.open("GET", `https://my-json-server.typicode.com/Martichka9/test-data/master/db/courses?id=${index}`, true);
    xhttp.send();
  }

window.addEventListener('load', (event) => {
    document.querySelector('body').classList.add('loaded');
    
    let courses = Array.from(document.querySelectorAll('article'));
    courses.forEach((elem,index) => {
        if (elem.id.includes('course')) {
            document.getElementById(elem.id).onclick = function (){
                loadDoc(index);
            };   
        }
    });
    document.getElementById('close').addEventListener('click', (e)=> {
        document.querySelector('#modal').style.display = "none";
    });
});

function loadDataInModal(obj) {
    document.querySelector('#modal img').src = obj[0]['img'];
    document.querySelector('#modal img').alt = obj[0]['img-title'];
    document.querySelector('#modal h2').innerHTML = obj[0].title;
    document.querySelector('#modal figcaption').innerHTML = obj[0]['img-title'];
    document.querySelector('#modal h3').innerHTML = obj[0].type;
    document.querySelector('#modal p').innerHTML = obj[0].info;
    document.querySelector('#modal').style.display = "block";
}

