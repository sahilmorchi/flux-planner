$( document ).ready(function() {
    $('ul.tabs').tabs();
     mediaCheck({
        media: '(max-width: 900px)',
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
    
    //DATE CELL
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    month = months[month];
    var dayText = today.getDay();
    dayText = days[dayText];
    $('.daytext').text(dayText);
    var totalDate = month + ' ' + day + 'th, ' + year;
    $('.dashDate').text(totalDate);
    
    
    //CALCUATING DAYS TILL NEXT TEST
    var month2 = today.getMonth();
    if (month2 < 10) {
        month2 = '0' + month2;
        month2 = month2 * 1;
    }
    var oneDay = 24*60*60*1000;
    var firstDate = new Date(2017,month2,day);
    //SAT DATE TILL CLOSET TEST
    var satDATE = new Date(2017,00,21);
    //ACT DATE TILL CLOSEST TEST
    var actDATE = new Date(2017,09,28);
    //CALCUALTION
    var diffDaysSAT = Math.round(Math.abs((firstDate.getTime() - satDATE.getTime())/(oneDay))) + ' days';
    var diffDaysACT = Math.round(Math.abs((firstDate.getTime() - actDATE.getTime())/(oneDay))) + ' days';
    
    $('.actDays').text(diffDaysACT);
    $('.satDays').text(diffDaysSAT);
    
    //MAKE THE CIRCLES DO STUFF ON DASHBOARD
    createCircle('#circle2',.9,1600, '', '#36D1DC', "#5B86E5");
    createCircle('#circle3',.8,36, '', '#36D1DC', "#5B86E5");
    createCircle('#circle4',.8,100, '%', '#2196F3', "#009688");
    createCircle('#circle5',.8,100, '', '#2196F3', "#009688");
   
    
scheduler.init('scheduler_here', new Date(),"month");
    
    
    
});
function createCircle(element, value, outOf, special, c1, c2) {
    $(element).circleProgress({
        value: value,
        size: 150,
        startAngle: (Math.PI)*3/2,
        fill: {
            gradient: [c1, c2]
        }
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('.percDisplay').html(Math.round(outOf * value * progress) + special);
    });
}