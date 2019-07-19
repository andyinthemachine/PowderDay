
var $resortList = $(".table-body");

var API = {
  saveResort: function(resort) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/resorts",
      data: JSON.stringify(resort)
    });
  },
  getResorts: function() {
    return $.ajax({
      url: "api/resorts",
      type: "GET"
    });
  },
  deleteResort: function(id) {
    return $.ajax({
      url: "api/resorts/" + id,
      type: "DELETE"
    });
  },
  getKey: function(id) {  // works but not
    return $.ajax({
      url: "api/resorts/key",
      type: "GET"
    });
  }  
};


// API.getKey().then(function(data){
  // console.log(data);
  // $("#google-init").attr("src", "'https://maps.googleapis.com/maps/api/js?key=' + data + '&callback=initMap&libraries=places'");
// });


var refreshResorts = function() {
  API.getResorts().then(function(data) {
    var $resorts = data.map(function(resort) {

      var newRow = $("<tr>").addClass("resort-table");

      // var newRow = $("<tr>").append(
        newRow.append(
        $("<td>").html(`<a style=color:red href=/resort/${resort.id}><strong>${resort.name}</strong>`),
        $("<td>").html(`<strong>${resort.weather}</strong>`),
        $("<td>").html(`<strong>${resort.snowfall}</strong>`),
        $("<td>").html(`<strong>${resort.snowfall_pred}</strong>`),
        $("<td>").attr({"data-id": resort.id}).html(`<button class="btn btn-warning delete">ｘ</button></td>`)
      );
      return newRow;
    });
    $resortList.empty();
    $resortList.append($resorts);
  });
};

var handleDeleteBtnClick = function() {
  console.log("click");
  var idToDelete = $(this).parent().attr("data-id");
  console.log(idToDelete);
  API.deleteResort(idToDelete).then(function() {refreshResorts();});
};

$resortList.on("click", ".delete", handleDeleteBtnClick);
