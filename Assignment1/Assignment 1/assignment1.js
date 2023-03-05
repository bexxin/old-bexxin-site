
let maxInitialRows = 10, maxInitialCols = 10;

//Draw table;windows onload event
window.addEventListener("load", (event)=>{
    console.log("page is loaded");
    drawTable(maxInitialRows,maxInitialCols);
})

const drawTableWithUserInput = () =>{
    //console.log("draw with user input call");
    if(maxRows.value && maxCols.value){
        
        drawTable(maxRows.value, maxCols.value);
    }
}

//Draw initial table
const drawTable = (initialRowsParam, initialColsParam) =>{
    //console.log("function call");
    const miMesa = document.getElementById("myTable");
    if(miMesa){
        miMesa.remove();
    }


    const container = document.getElementById("myTableContainer");
    const myTbl = document.createElement("table");
    myTbl.setAttribute('id','myTable');
    const tblBody = document.createElement("tbody");
    
    container.appendChild(myTbl);
    myTbl.appendChild(tblBody);

    for(let rows = 1; rows<=initialRowsParam; rows++){
       // console.log("loop working", rows);
        const row = document.createElement("tr");
        tblBody.appendChild(row);

        //make cells and cell contents
        for(let columns = 1;columns<=initialColsParam; columns++ ){
           //console.log("innerloop", columns)
           const cell = document.createElement("td");
           const result = columns*rows;
           const cellItem = document.createTextNode(`${rows} X ${columns} = ${result}`);
           cell.appendChild(cellItem);
           row.appendChild(cell);
           
        }
        
    }
   
}