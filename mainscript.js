$('.fa-bars').click(function(){
    console.log("clicked");
    $('.navBar').css('margin-left','0');
    setTimeout(function(){
        $(document).click(function(e){
            console.log(e.target);
        });
    },100);
});

$('#dashboard').click(function(){
    $('.pageTitle').html('Dashboard');
});

$('#testScores').click(function(){
    $('.pageTitle').html('Test Scores');
    $('#circle').circleProgress({
	value: calcPercentageSAT(1500),
	size: 100,
    startAngle: (Math.PI)*3/2,
	fill: {
		gradient: ["red", "orange"]
	}
});
});

$('#calendar').click(function(){
    $('.pageTitle').html('Calendar');
});

$('#analytics').click(function(){
    $('.pageTitle').html('Analytics');
});





/*
$('#circle').circleProgress({
    size: 100,
    startAngle: (Math.PI)*3/2,
    value: calcPercentageSAT(1500)
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(100 * progress) + '<i>%</i>');
  });
*/

function calcPercentageSAT(score){
    return score/1600;
}