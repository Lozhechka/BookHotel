$(document).ready(function() {
    $(".content").click(function() {
        $("#navbarSupportedContent").collapse('hide');
    });
    $(this).scroll(function() {
        if ($(document).scrollTop() + $(window).height() > $("#cook2").offset().top + $("#cook2").height() * 0.75 && $(document).scrollTop() - $("#cook2").offset().top < $("#cook2").height()) {
            $("#cook2").css("visibility", "visible");
            $("#cook3").css("visibility", "visible");
            $("#cook2").animate({ left: 0 }, 1500);
            $("#cook3").animate({ right: 0 }, 1500);
            $(".agitation__header").fadeIn(2000);
            $(".agitation__list").fadeIn(2800);
        }
    });
});