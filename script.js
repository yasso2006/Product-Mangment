var mood = "create";
var x;

function total() {
  if ($("#price").val() != "") {
    var result =
      +$("#price").val() +
      +$("#taxes").val() +
      +$("#ads").val() -
      +$("#discount").val();
    $(".total").text(result);
    $(".total").css("background", "#040");
  } else {
    $(".total").css("background", " rgba(198, 15, 15, 0.823)");
    $(".total").text("Total: ");
  }
}
var data;
if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  var data = [];
}
$("#create").click(function () {
  var newData = {
    title: $("#title").val().toLowerCase(),
    price: $("#price").val(),
    taxes: $("#taxes").val(),
    ads: $("#ads").val(),
    discount: $("#discount").val(),
    total: $(".total").text(),
    count: $("#count").val(),
    category: $("#category").val().toLowerCase(),
  };
  if (
    $("#title").val() != "" &&
    $("#price").val() != "" &&
    $("#category").val() != "" &&
    +$("#count").val() <= 100
  ) {
    clear();
    if (mood === "create") {
      for (i = 0; i < newData.count; i++) {
        data.push(newData);
      }
    } else {
      data[x] = newData;
      mood = "create";
      $("#create").text("create");
      $("#count").css("display", "block");
    }
  }

  localStorage.setItem("product", JSON.stringify(data));

  show();
});
show();
function clear() {
  $("#title").val("");
  $("#price").val("");
  $("#taxes").val("");
  $("#ads").val("");
  $("#discount").val("");
  $(".total").text("");
  $(".total").css("background", "rgba(198, 15, 15, 0.823)");
  $("#count").val("");
  $("#category").val("");
}
function show() {
  var table = "";
  for (var i = 0; i < data.length; i++) {
    table += `
    <tr>
              <td>${i + 1}</td>
              <td>${data[i].title}</td>
              <td>${data[i].price}</td>
              <td>${data[i].taxes}</td>
              <td>${data[i].ads}</td>
              <td>${data[i].discount}</td>
              <td>${data[i].total}</td>
              <td>${data[i].category}</td>
              <td><button onclick="update(${i})" id="update">Update</button></td>
              <td><button onclick="delt(${i})" id="delete">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  if (data.length > 0) {
    $("#deleteAll").html('<button onclick="deleteAll()">Delete All</buuton>');
  } else {
    $("#deleteAll").html("");
  }
}
function delt(i) {
  data.splice(i, 1);
  localStorage.product = JSON.stringify(data);
  show();
}
function deleteAll() {
  localStorage.clear();
  data.splice(0);
  show();
}
function update(i) {
  $("#title").val(data[i].title);
  $("#price").val(data[i].price);
  $("#taxes").val(data[i].taxes);
  $("#ads").val(data[i].ads);
  $("#discount").val(data[i].discount);
  $("#category").val(data[i].category);
  $("#count").css("display", "none");
  total();
  $("#create").text("Update");
  mood = "update";
  x = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
var moodSearch = "title";
function searchMood(id) {
  if (id === "searchtitle") {
    moodSearch = "title";
    $("#search").attr("placeholder", "search by title");
  } else {
    moodSearch = "category";
    $("#search").attr("placeholder", "search by category");
  }
  $("#search").focus();
  $("#search").val("");
  show();
}
function search(value) {
  var table = "";
  for (var i = 0; i < data.length; i++) {
    if (moodSearch === "title") {
      if (data[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
              <td>${i + 1}</td>
              <td>${data[i].title}</td>
              <td>${data[i].price}</td>
              <td>${data[i].taxes}</td>
              <td>${data[i].ads}</td>
              <td>${data[i].discount}</td>
              <td>${data[i].total}</td>
              <td>${data[i].category}</td>
              <td><button onclick="update(${i})" id="update">Update</button></td>
              <td><button onclick="delt(${i})" id="delete">Delete</button></td>
    </tr>
    `;
      }
    } else {
      if (data[i].category.includes(value.toLowerCase())) {
        table += `
    <tr>
              <td>${i + 1}</td>
              <td>${data[i].title}</td>
              <td>${data[i].price}</td>
              <td>${data[i].taxes}</td>
              <td>${data[i].ads}</td>
              <td>${data[i].discount}</td>
              <td>${data[i].total}</td>
              <td>${data[i].category}</td>
              <td><button onclick="update(${i})" id="update">Update</button></td>
              <td><button onclick="delt(${i})" id="delete">Delete</button></td>
    </tr>
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
