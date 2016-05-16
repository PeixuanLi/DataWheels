var Green_trips_num = [];
var Yellow_trips_num =[];
var Uber_trips_num = [];

var xResult = [];
var yResult = [];
var nameResult = [];
var finalResult = [];
var mpgs = [];
var parseDate = d3.time.format("%Y-%m-%d").parse;

$().ready(function(){   
    var dsv = d3.dsv("\t","text/plain");
    
    var headers = ["date", "value\r\n"].join("\t");
    // d3.text("week_percent.txt", function(error, data) {
    // var data = d3.tsv.parse(headers + dsvdata)
    //load Green_trips_num
    var queens_green = "./Result_trip_num/borough_queens/green_Queens";
    var queens_yellow = "./Result_trip_num/borough_queens/Yellow_Queens";
    var queens_uber = "./Result_trip_num/borough_queens/Uber_Queens";

    var manhattan_green = "./Result_trip_num/borough_manhattan/green_Manhattan";
    var manhattan_yellow = "./Result_trip_num/borough_manhattan/Yellow_Manhattan";
    var manhattan_uber = "./Result_trip_num/borough_manhattan/Uber_Manhattan";

    var brooklyn_green = "./Result_trip_num/borough_brooklyn/green_Brooklyn";
    var brooklyn_yellow = "./Result_trip_num/borough_brooklyn/Yellow_Brooklyn";
    var brooklyn_uber = "./Result_trip_num/borough_brooklyn/Uber_Brooklyn";

    var bronx_green = "./Result_trip_num/borough_brooklyn/green_Bronx";
    var bronx_yellow = "./Result_trip_num/borough_brooklyn/Yellow_Bronx";
    var bronx_uber = "./Result_trip_num/borough_brooklyn/Uber_Bronx";

    var addr_green =manhattan_green;
    var addr_yellow =manhattan_yellow;
    var addr_uber =manhattan_uber;


    d3.text(addr_green,function(error,dsvdata){ 
        Green_trips_num = d3.tsv.parse(headers + dsvdata);      
    });
    //load Yellow_trips_num
    d3.text(addr_yellow,function(error,dsvdata){ 
        Yellow_trips_num = d3.tsv.parse(headers + dsvdata);      
    });
    //load Uber_trips_num
    d3.text(addr_uber,function(error,dsvdata){ 
        Uber_trips_num = d3.tsv.parse(headers + dsvdata);      
    });

});

function get_green_trips_num(){
    return get_trips_num(Green_trips_num);  
}
function get_yellow_trips_num(){
    return get_trips_num(Yellow_trips_num);  
}
function get_uber_trips_num(){
    return get_trips_num(Uber_trips_num);  
}



function get_trips_num(rips_num){
    for ( i = 0; i < rips_num.length; i++){
        rips_num[i].date = parseDate(rips_num[i].date);
        rips_num[i].value = rips_num[i].value;
    }
    //console.log(rips_num);
    return rips_num;

}