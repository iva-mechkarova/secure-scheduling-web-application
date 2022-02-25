function addPost() {

    var content = document.getElementById("content").value;

    var xhr = new XMLHttpRequest();
    xhr.onload=insertPost;
    xhr.open("POST", "/forum/add");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(content);
}

function insertPost() {
    var record = JSON.parse(this.responseText);

    var table = document.getElementById("posts");
    var rows = table.querySelectorAll("tr");
    var row = table.insertRow(rows.length-1);
    row.id="row_"+record.id;
    var username_cell = row.insertCell(0);
    var content_cell = row.insertCell(1);

    username_cell.innerHTML=record.user.userName
    content_cell.innerHTML=record.content

    document.getElementById("content").value="";
}

function updateAppointment(id) {
    var xhr = new XMLHttpRequest();
    var vaccineReceived = document.getElementById("vaccineReceived_" + id).value;
    xhr.open("POST", "/admin/update?id="+id+"&vaccineReceived="+vaccineReceived);
    xhr.send();
    if (vaccineReceived === "")
        document.getElementById("received_" + id).innerHTML="false";
    else
        document.getElementById("received_" + id).innerHTML="true";
}