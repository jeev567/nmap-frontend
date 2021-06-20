
const endPoint = 'http://localhost:2222/open-port/';
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
    const parent1 = document.getElementById("open_port");
    latest.forEach(e => {
        const tile = document.createElement("div");
        tile.className = "tiles"
        tile.innerHTML=`port:`+e.portNumber+`<br>protocol:`+e.portProtocol
        parent1.appendChild(tile);
        });
    console.log("History Ports:");
    const parent2 = document.getElementById("history_port");
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
    newOnes.forEach(e => {
        const tile = document.createElement("div");
            tile.className = "tiles"
            tile.innerHTML=`port:`+e.portNumber+`<br>protocol:`+e.portProtocol
            parent3.appendChild(tile);
    });
    console.log("Deleted Ports:");
    const parent4 = document.getElementById("deleted_port");
    deleted.forEach(e => {
        const tile = document.createElement("div");
            tile.className = "tiles"
            tile.innerHTML=`port:`+e.portNumber+`<br>protocol:`+e.portProtocol
            parent4.appendChild(tile);
    });




} 

document.addEventListener('click',()=>{
        let hostname = document.getElementById("hostname");
        let text = hostname.value;
        if(text){
            getOpenOpenDetail(text);
          }
})