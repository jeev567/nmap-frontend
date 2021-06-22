
const endPoint = 'http://localhost:1212/open-port/';
async function getOpenOpenDetail(hostname){
    let finalUrl = endPoint+hostname;
    let response = await fetch(finalUrl);
    let data = await response.json();
   createTile(data);
   // console.log(data);
}

function createTile(data){

    let hostName = data.hostName;
    let latest = data.latestScannedPorts;
    let history = data.historyScannedPort;
    let newOnes = data.newlyAddedPort;
    let deleted = data.deleteddPort;

    console.log("Hostname:"+ hostName);
    console.log("Latest Ports:");
    let parent1 = document.getElementById("open_port");
    while (parent1.firstChild) {
        parent1.removeChild(parent1.firstChild);
    }
    latest.forEach(e => {

        const tile = document.createElement("div");
        tile.className = "tiles"
        tile.innerHTML=`port:`+e.portNumber+`<br>protocol:`+e.portProtocol
        parent1.appendChild(tile);
        });
    console.log("History Ports:");
    const parent2 = document.getElementById("history_port");
    while (parent2.firstChild) {
        parent2.removeChild(parent2.firstChild);
    }
    history.forEach(e => {
        e.forEach(element => {
            const tile = document.createElement("div");
            tile.className = "tiles"
            tile.innerHTML=`port:`+element.portNumber+`<br>protocol:`+element.portProtocol
            parent2.appendChild(tile);
        });
      
    });
    console.log("NewOnes Ports:");
    const parent3 = document.getElementById("new_port");
    while (parent3.firstChild) {
        parent3.removeChild(parent3.firstChild);
    }
    newOnes.forEach(e => {
        const tile = document.createElement("div");
            tile.className = "tiles"
            tile.innerHTML=`port:`+e.portNumber+`<br>protocol:`+e.portProtocol
            parent3.appendChild(tile);
    });
    console.log("Deleted Ports:");
    const parent4 = document.getElementById("deleted_port");
    while (parent4.firstChild) {
        parent4.removeChild(parent4.firstChild);
    }
    deleted.forEach(e => {
        const tile = document.createElement("div");
            tile.className = "tiles"
            tile.innerHTML=`port:`+e.portNumber+`<br>protocol:`+e.portProtocol
            parent4.appendChild(tile);
    });




} 

async function clickSubmit(){
    let hostname = document.getElementById("hostname");
    let text = hostname.value;
    const IPCHECK_REGEX = /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/;
    if (!IPCHECK_REGEX.test(text)) {
        alert("Enter Valid Domain Name");
        hostname.focus();
        return false;
    }
    if(text){
        addOrRemoveloaderAndBlockPointerEvent();
        await getOpenOpenDetail(text);
        addOrRemoveloaderAndBlockPointerEvent();
    }
}  

function addOrRemoveloaderAndBlockPointerEvent() {
    let body_block = document.getElementById('body');
    let loader = document.getElementById('loader_container');
    body_block.classList.toggle("block-action");
        loader.classList.toggle("loader");
    
    
}