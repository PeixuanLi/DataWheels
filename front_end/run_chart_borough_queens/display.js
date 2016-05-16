function display(){

	var margin = {top: 20, right: 60, bottom: 30, left: 100},
		width = document.body.clientWidth - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;
		
		var customTimeFormat = d3.time.format.multi([
			[".%L", function(d) { return d.getMilliseconds(); }],
			[":%S", function(d) { return d.getSeconds(); }],
			["%I:%M", function(d) { return d.getMinutes(); }],
			["%I %p", function(d) { return d.getHours(); }],
			["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
			["%b %d", function(d) { return d.getDate() != 1; }],
			["%B", function(d) { return d.getMonth(); }],
			["%Y", function() { return true; }]
		]);
	//Format
	var parseDate = d3.time.format("%Y-%m-%d").parse;

	var container = d3.select('.plot')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	var svg = container.append('g')
		.attr('class', 'content')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var data = get_yellow_trips_num();
	var data1 = get_green_trips_num();
	var data2 = get_uber_trips_num();

	var dataSet = [];
	var lines = [];

	dataSet.push(data);
	dataSet.push(data1);
	dataSet.push(data2);

	// console.log(data);

	var x = d3.time.scale()
		.domain(d3.extent(data, function(d) { return d.date; }))
		.range([0, width]);

	var y = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return d.value; })])
		.range([height, 0]);

		var xAxis = d3.svg.axis()
		.scale(x)
		.orient('bottom')
		.tickFormat(customTimeFormat);

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient('left')
		.ticks(10);

	// 横坐标
	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.attr('stroke','black')
		.call(xAxis)
	// 增加坐标值说明
		.append('text')
		.text('Date')
		.attr('transform', 'translate(' + width + ', 0)');

	// 纵坐标
	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis)
		.attr('stroke','black')
		.append('text')
		.text('Times/Day');
	var line = d3.svg.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.value); })
		.interpolate('monotone');




	//----dot----------------

	// for(i=0; i<dataSet.length; i++)
 //    {
 //        var newLine=new CreateLineObject();
 //        newLine.init(i);
 //        lines.push(newLine);		
 //    }

	drawLine(data,'yellow');
	drawLine(data1,'green');
	drawLine(data2,'black');
	drawDot(data,'brown');
	drawDot(data1,'green');
	drawDot(data2,'black');

	// dotAndContent(data,'yellow');
	// dotAndContent(data1,'green');
	// dotAndContent(data2,'black');

	function drawLine(data,color){
		var path = svg.append('path')
			.attr('class', 'line')
			.attr('d', line(data))
			.attr('stroke',color)
			.attr('stroke-width',2)
			.attr("fill", "none");

	}
	function drawDot(data,color){
	    var g = svg.append('g').selectAll('circle')
	          .data(data)
	          .enter()
	          .append('circle')
	          .attr('class', 'linecircle')
	          .attr('fill',color)
	          .attr('cx', line.x())
	          .attr('cy', line.y())
	          .attr('r', 3.5)

                //-------
                .on('mouseover', function(d) {
                d3.select(this).transition().duration(500).attr('r', 5);
                d3.select('.tips').style('display', 'block');
                var tx = parseFloat(d3.select(this).attr("cx"));
                var ty = parseFloat(d3.select(this).attr("cy"));  
                var tipRectx = tx+60+180>width?tx+10-180:tx,
                    tipRecty= ty+20+60>height?ty+10-60:ty;
                var theDate = d3.time.format('%Y-%m-%d')(d.date);
                var theValue= d.value;
                var tips = svg.append("g")
                .attr("id","tips");
                var tipRect = tips.append("rect")
                .attr("x",tipRectx)
                .attr("y",tipRecty)
                .attr("width",180)
                .attr("height",60)
                .attr("fill","#FFF")
                .attr("stroke","#CCC")
                var tipText = tips.append("text")
                .attr("class","tiptools")
                .text("date:"+theDate)
                .attr("x",tipRectx+20)
                .attr("y",tipRecty+20);
                var tipText = tips.append("text")
                .attr("class","tiptools")
                .text("value: "+theValue)
                .attr("x",tipRectx+20)
                .attr("y",tipRecty+50);

            })
                .on('mouseout', function() {
                d3.select(this).transition().duration(500).attr('r', 3.5);
                d3.select('.tips').style('display', 'none');
                d3.select("#tips").remove();
            })
                //---------
	          // .on('mouseover', function() {
	          //   d3.select(this).transition().duration(500).attr('r', 5);
	          // })
	          // .on('mouseout', function() {
	          //   d3.select(this).transition().duration(500).attr('r', 3.5);
	          // });
	}
	function dotAndContent(data,color){
	   
    //----tips----------------
	    var tips = svg.append('g').attr('class', 'tips');
	    tips.append('rect')
	      .attr('class', 'tips-border')
	      .attr('width', 200)
	      .attr('height', 50)
	      .attr('rx', 10)
	      .attr('ry', 10);
	     
	    var wording1 = tips.append('text')
	      .attr('class', 'tips-text')
	      .attr('x', 10)
	      .attr('y', 20)
	      .text('');
	     
	    var wording2 = tips.append('text')
	      .attr('class', 'tips-text')
	      .attr('x', 10)
	      .attr('y', 40)
	      .text('');

	    //----content----------------
	    container
	  .on('mousemove', function() {
	    var m = d3.mouse(this),
	      cx = m[0] - margin.left;
	 
	    var x0 = x.invert(cx);
	    var i = (d3.bisector(function(d) {
	      return d.date;
	    }).left)(data, x0, 1);
	 
	    var d0 = data[i - 1],
	      d1 = data[i] || {},
	      d = x0 - d0.date > d1.date - x0 ? d1 : d0;
	 
	    function formatWording(d) {
	        var format = d3.time.format("%Y-%m-%d");
	        return 'date：' + format(d.date);
	    }
	    wording1.text(formatWording(d));
	    wording2.text('value：' + d.value);
	 
	    var x1 = x(d.date),
	      y1 = y(d.value);
	 
	    // 处理超出边界的情况
	    var dx = x1 > width ? x1 - width + 200 : x1 + 200 > width ? 200 : 0;
	    var dy = y1 > height ? y1 - height + 50 : y1 + 50 > height ? 50 : 0;
	 
	    x1 -= dx;
	    y1 -= dy;
	 
	    d3.select('.tips')
	      .attr('transform', 'translate(' + x1 + ',' + y1 + ')');
	 
	    d3.select('.tips').style('display', 'block');
	  })
	  .on('mouseout', function() {
	    d3.select('.tips').style('display', 'none');
	  });
	}


//add
  			
	// var path = svg.append('path')
	// 	.attr('class', 'line')
	// 	.attr('d', line(data2))


/*--------------added---------------------*/
		// var update = circles.data(jsonCircles);
		// var enter = update.enter();
		// var exit = update.exit();
		
		// //1.update部分的处理方法
		// update.text( function(d){ return d; } );
		
		// //2.enter部分的处理方法
		// enter.append("circle")
		// 	.text( function(d){ return d; } );
		
		// //3.exit部分的处理方法
		// exit.remove();

		// var circles =svgContainer.selectAll("circle");
		// svgContainer.selectAll("text").remove();
		// svgContainer.selectAll("g").remove();

}