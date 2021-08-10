
"artifact editor"

var current = new Date(); // timestamp, milliseconds since 1970 (?) vs. milliseconds (UTC)
 var yyyy = current.getFullYear(), MM = current.getMonth(), dd = current.getDate(), hh = current.getHours(), mm = current.getMinutes(), ss = current.getSeconds();
 var datestamp = yyyy + "." + MM + "." + dd;
 var timestamp = hh + ":" + mm + ":" + ss;
 //$.post("../search/ip", "", function (data) { $('#stat-date').html(datestamp); $('#stat-time').html(timestamp); $('#stat-ip').html(data);});