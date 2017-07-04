$( document ).ready(function() {
     mediaCheck({
        media: '(max-width: 800px)',
        entry: function() {
            $('.navBar').css('margin-left','-240');
            $('.navOpen').css('width','80');
            $('.middleLayout').css('width','100%');
        },
        exit: function() {
            $('.navBar').css('margin-left','');
            $('.navOpen').css('width','');
            $('.middleLayout').css('width','');
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
    $('#circle2').circleProgress({
        value: .9,
        size: 120,
        startAngle: (Math.PI)*3/2,
        fill: {
            gradient: ["red", "orange"]
        }
    });
    $('#circle3').circleProgress({
        value: .75,
        size: 120,
        startAngle: (Math.PI)*3/2,
        fill: {
            gradient: ["red", "orange"]
        }
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('.percDisplay').html(Math.round(36 * .75 * progress));
    });
    
    
    
    
    
});