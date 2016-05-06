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
    //load Green_trips_num
    dsv("./Result_trip_num/Green_trips_num",function(error,dsvdata){ 
        Green_trips_num = dsvdata;      
    });
    //load Yellow_trips_num
    dsv("./Result_trip_num/Yellow_trips_num",function(error,dsvdata){ 
        Yellow_trips_num = dsvdata;      
    });
    //load Uber_trips_num
    dsv("./Result_trip_num/Uber_trips_num",function(error,dsvdata){ 
        Uber_trips_num = dsvdata;      
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
    return rips_num;
}