function senddata() {
    const student = {
        sid: document.getElementById("id").value,
        name: document.getElementById("sname").value,
        dept: document.getElementById("dept").value
    };

    fetch("http://localhost:3000/addStudent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}

function searchStudent() {
    const sid = document.getElementById("searchId").value;

    fetch("http://localhost:3000/searchStudent/" + sid)
        .then(res => res.json())
        .then(data => {
            const result = document.getElementById("result");

            if (data.message) {
                result.innerText = data.message;
            } else {
                result.innerHTML = `
                    ID: ${data.sid}<br>
                    Name: ${data.name}<br>
                    Dept: ${data.dept}
                `;
            }
        });
}

function allStudent() {
    fetch("http://localhost:3000/allStudent")
        .then(res => res.json())
        .then(data => {
            const all = document.getElementById("all");
            all.innerHTML = ""; // clear previous data

            data.forEach(student => {
                all.innerHTML += `
                    <hr>
                    ID: ${student.sid}<br>
                    Name: ${student.name}<br>
                    Dept: ${student.dept}<br>
                `;
            });
        });
}
function delStudent() {
    const sid = document.getElementById("delId").value;

    fetch("http://localhost:3000/delStudent/" + sid, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("del").innerText = data.message;
    });
}

function updateStudent() {
    const sid = document.getElementById("upId").value;

    const student = {
        name: document.getElementById("upName").value,
        dept: document.getElementById("upDept").value
    };

    fetch("http://localhost:3000/updateStudent/" + sid, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}