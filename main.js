document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  // document.getElementById("issueInputForm").reset();
  document.getElementById("issueInputForm");
  fetchIssues();
  e.preventDefault();
}

const closeIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  let currentIssue = issues.find((issue) => issue.id == id);
  console.log(currentIssue);
  currentIssue.status = "Closed";
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  console.log(issues);
  let remainingIssue = issues.filter((issue) => issue.id != id);
  localStorage.setItem("issues", JSON.stringify(remainingIssue));
  fetchIssues();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));

  // additonal
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = ``;
  if (!issues) {
    issuesList.innerHTML = ``;
  } else {
    issues.forEach((issue) => {
      const { id, description, severity, assignedTo, status } = issue;

      const well = document.createElement("well");
      if (status === "Closed") {
        well.style = "text-decoration:line-through;";
      }
      console.log(well);
      well.innerHTML = `
      <h6>Issue ID: ${id} </h6>
      <p><span class="label label-info"> ${status} </span></p>
      <h3 id="desc"> ${description} </h3>
      <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
      <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
      <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
      <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
      `;
      issuesList.appendChild(well);
      //   issuesList.innerHTML += `<div class="well">
      // <h6>Issue ID: ${id} </h6>
      // <p><span class="label label-info"> ${status} </span></p>
      // <h3 id="desc"> ${description} </h3>
      // <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
      // <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
      // <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
      // <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
      // </div>`;
    });
  }

  // additional end
  // issuesList.innerHTML = "";
  // for (let i = 0; i < issues.length; i++) {
  //   const { id, description, severity, assignedTo, status } = issues[i];

  //   issuesList.innerHTML += `<div class="well">
  //                             <h6>Issue ID: ${id} </h6>
  //                             <p><span class="label label-info"> ${status} </span></p>
  //                             <h3> ${description} </h3>
  //                             <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
  //                             <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
  //                             <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
  //                             <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
  //                             </div>`;
  // }
};
