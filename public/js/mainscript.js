var isClosed = 0;
$('.fa-bars').click(function(){

        event.stopPropagation();
        $('.navBar').css('margin-left','');
        isClosed = 0;
        $('html').click(function() {
            isClosed = 1;
            $('.navBar').css('margin-left','-240');
            $('html').unbind('click');
        });

        $('.navBar').click(function(event){
            event.stopPropagation();
        });

});
$(window).resize(function(){
    mediaCheck({
        media: '(max-width: 1000px)',
        entry: function() {
            $('.navBar').css('margin-left','-240');
            $('.navOpen').css('width','80');
            $('.mainContainer').css('margin-left','0');
            $('.mainContainer').css('width','100%');
        },
        exit: function() {
            $('.navBar').css('margin-left','');
            $('.navOpen').css('width','');
            $('.mainContainer').css('margin-left','');
            $('.mainContainer').css('width','');
        },
        both: function() {
        }
    });
});

$( document ).ready(function() {
    $('#dashboardMid').css('display','block');
    $('#dashboardMid').addClass('activePage');
});


$('#dashboard').click(function(){
    switchpage('#dashboardMid');
    $('.pageTitle').text('Dashboard');
});

$('#testScores').click(function(){
    switchpage('#testsMid');
    $('.pageTitle').html('Test Scores');
    setTimeout(function(){
        $('#circle').circleProgress({
        value: calcPercentageSAT(1500),
        size: 100,
        startAngle: (Math.PI)*3/2,
        fill: {
            gradient: ["red", "orange"]
        }
    },100)
});
});

$('#calendar').click(function(){
    switchpage('#calendarMid');
    $('.pageTitle').text('Calendar');
});

$('#analytics').click(function(){
    switchpage('#analyticssdMid');
    $('.pageTitle').text('Analytics');
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
function switchpage(targetPage) {
    var currentPage = $('.activePage');
    currentPage.css('display','none');
    currentPage.removeClass('activePage');
    $(targetPage).css('display','block');
    $(targetPage).addClass('activePage');
}