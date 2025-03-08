var json = {
  "test": {
    "id": 1,
    "name": "test",
    "price": 500,
    "bikou": "nasi"
  },
  "hoge": {
    "id": 2,
    "name": "abcd",
    "price": 57,
    "bikou": "lol"
  },
  "huga": {
    "id": 3,
    "name": "zyanken",
    "price": 1,
    "bikou": "yasuiyo~"
  }
}

function tablesort(x,y,z){
  var bigtf = true;
  while(bigtf){
    var tf = false;
    for(var i=0;i<x.length-1;i++){
      if(z=="str"){
        if($($($(x[i]).find("td"))[y]).text() > $($($(x[i+1]).find("td"))[y]).text()){
          x.splice(i,2,x[i+1],x[i]);
          tf = true;
        }
      }
      else{
        if(Number($($($(x[i]).find("td"))[y]).text()) > Number($($($(x[i+1]).find("td"))[y]).text())){
          x.splice(i,2,x[i+1],x[i]);
          tf = true;
        }
      }
    }
    bigtf = tf;
  }
  var tbody = "";
  for(var i=0;i<x.length;i++){
    tbody = tbody + "<tr>";
    for(var j=0;j<$($(x[i]).find("td")).length;j++){
      tbody = tbody + "<td>" + $($($(x[i]).find("td"))[j]).text() + "</td>";
    }
    tbody = tbody + "</tr>";
  }
  $("tbody").html(tbody);
}

window.onload=function(){
  var th = [];
  var thmap = new Map();
  for(var i=0;i<Object.keys(json).length;i++){
    var tr = "<tr>";
    for(var j=0;j<Object.keys(json[Object.keys(json)[i]]).length;j++){
      if(th.indexOf(Object.keys(json[Object.keys(json)[i]])[j]) == -1){
        thmap[Object.keys(json[Object.keys(json)[i]])[j]] = th.length;
        th.push(Object.keys(json[Object.keys(json)[i]])[j]);
      }
      tr = tr + "<td>" + json[Object.keys(json)[i]][Object.keys(json[Object.keys(json)[i]])[j]] + "</td>";
    }
    $("tbody").append(tr + "</tr>");
  }
  var tr = "<tr>";
  for(var i=0;i<th.length;i++){
    tr = tr + "<th>" + th[i] + "</th>";
  }
  $("thead").append(tr + "</tr>");
  $($("thead").find("tr").find("th")).on('click',function(){
    console.log($(this).text());
    if(Number.isFinite(json["test"][$(this).text()])){
      tablesort($("tbody").find("tr"),thmap[$(this).text()],"num");
    }
    else{
      tablesort($("tbody").find("tr"),thmap[$(this).text()],"str");
    }
  });
};
