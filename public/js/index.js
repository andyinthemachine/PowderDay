
var $resortList = $(".table-body");

var API = {
  saveResort: function (resort) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/resorts",
      data: JSON.stringify(resort)
    });
  },
  getResorts: function () {
    return $.ajax({
      url: "api/resorts",
      type: "GET"
    });
  },
  deleteResort: function (id) {
    return $.ajax({
      url: "api/resorts/" + id,
      type: "DELETE"
    });
  }
};

var refreshResorts = function () {
  API.getResorts().then(function (data) {
    var $resorts = data.map(function (resort) {

      var newRow = $("<tr>").addClass("resort-table");
      newRow.append(
        $("<td>").html(`<a style=color:red href=/resort/${resort.id}><strong>${resort.name}</strong>`),
        $("<td>").html(`<strong>${resort.current_conditions}</strong>`),
        $("<td>").html(`<strong>${resort.precip_prev_day}</strong>`),
        $("<td>").html(`<strong>${resort.precip_forecast}</strong>`),
        $("<td>").attr({ "data-id": resort.id }).html(`<button class="btn btn-warning delete">ｘ</button></td>`)
      );
      return newRow;
    });
    $resortList.empty();
    $resortList.append($resorts);
  });
};

var handleDeleteBtnClick = function () {
  var idToDelete = $(this).parent().attr("data-id");
  API.deleteResort(idToDelete).then(function() {refreshResorts()});
};

$resortList.on("click", ".delete", handleDeleteBtnClick);
