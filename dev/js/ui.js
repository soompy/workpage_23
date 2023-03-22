//레이어 팝업 호출 body scroll toggle event
function bodyScrollHide() {
    enableScrollLock();
}

function bodyScrollShow() {
    disableScrollLock();
}

  // 스크롤 잠금
  const enableScrollLock = () => {
    const { body } = document;

    if (!body.getAttribute('scrollY')) {
      const pageY = window.pageYOffset;

      body.setAttribute('scrollY', pageY.toString());

      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.left = '0px';
      body.style.right = '0px';
      body.style.bottom = '0px';
      body.style.top = `-${pageY}px`;
    }
  };


  // 스크롤 잠금 해제
  const disableScrollLock = () => {
    const { body } = document;

    if (body.getAttribute('scrollY')) {
      body.style.removeProperty('overflow');
      body.style.removeProperty('position');
      body.style.removeProperty('top');
      body.style.removeProperty('left');
      body.style.removeProperty('right');
      body.style.removeProperty('bottom');

      window.scrollTo(0, Number(body.getAttribute('scrollY')));

      body.removeAttribute('scrollY');
    }
  };  



$(function() {

    $(document).on("click", ".tab_type_top ul li", _jsTabTypeEvent);

    function _jsTabTypeEvent() {
        const idx = $(this).index();
        const $tabTypeList = $(this).closest(".contents").find(".tab_type_list");
        
        $(this).closest(".tab_type_top").find("ul li").removeClass("on");
        $(this).addClass("on");
        $tabTypeList.addClass("hide");
        $tabTypeList.eq(idx).removeClass("hide");
        
    }

    const $footerNav = $("footer");

    if($footerNav.length > 0) {
        $("#container").addClass("nav_bg");
    }

    function headerFixedFun() {
        const header = $(".header_fixed");
        const tabTop = $("#container .tab_type_top");
        const fillterTop = $(".contents > .fillter_area");

        let height = 0;
        
        if(header.length) {
            height = header.height();
        }
        if(tabTop.length) {
            height = height + tabTop.height();
        }
        if(fillterTop.length) {
            height = height + fillterTop.height();
        }
        
        $("#container .contents").css({
            "paddingTop":height,
        });
        

    }
    headerFixedFun();    

    function footerBtnFixed() {
        const footerBtn = $(".contents > .btn_area");

        if(footerBtn.length) {
            $("#container .contents").css({
                "paddingBottom": '50px'
            });
        }    
    }
    footerBtnFixed();    
    
});

(function($){
    
    $(document).ready(function(){
        $.fn.moreMenu = function(){
            return this.each(function(){
                const root = $(this);
                const menuWidth = $(window).width()-60;
                root.find('.moreMenu').css('width', menuWidth);
                root.find('.moreMenu').css('right', -menuWidth);
                $(window).resize(function(){
                    const menuWidth = $(window).width()-60;
                    if( parseInt(root.find('.moreMenu').css('right'), 10) >= 0){
                        root.find('.moreMenu').css('width', menuWidth);
                        root.find('.moreMenu').css('right', 0);
                    }else{
                        root.find('.moreMenu').css('width', menuWidth);
                        root.find('.moreMenu').css('right', -menuWidth);
                    }
                });
                function moreDimIn(){
                    root.find('.moreDim').show(0);
                    root.find('.moreDim').stop().animate({
                        opacity: 0.7
                    }, 700);
                };
                function moreDimOut(){
                    const menuWidth = $(window).width()-60;
                    if(parseInt(root.find('.moreMenu').css('right'), 10) != -menuWidth){
                        root.find('.moreDim').stop().animate({
                            opacity: 0.0
                        }, 700, function(){
                            $(this).hide(0);
                        });
                    }else{
                        root.find('.moreDim').hide(0);
                    };
                };
                function moreMenuIn(){
                    root.find('.moreMenu').stop().animate({
                        right: 0
                    });
                };
                function moreMenuOut(){
                    const menuWidth = $(window).width()-60;
                    root.find('.moreMenu').stop().animate({
                        right: -menuWidth+'px'
                    });
                };
                $('footer nav ul .nav_05 a').on('click', function(){
                    moreDimIn();
                    moreMenuIn();
                });
                root.find('.moreDim').on('click', function(){
                    moreDimOut();
                    moreMenuOut();
                });

                // Drag
                root.find('.moreMenu').on('touchstart', function(e){
                    touchStart = e.changedTouches[0].clientX;
                    menuPosition = parseInt($(this).css('right'), 10);
                    root.find('.moreDim').show(0);
                });
                root.find('.moreMenu').on('touchmove', function(e){
                    touchMove = e.changedTouches[0].clientX;
                    const menuWidth = $(window).width()-60;
                    $(this).css('right', menuPosition+(touchStart-touchMove)+'px');
                    root.find('.moreDim').css( 'opacity', 0.7 + (0.7/menuWidth*(menuPosition+touchStart-touchMove)) );
                    if(parseInt($(this).css('right'), 10) > 0){
                        $(this).css('right', 0);
                        root.find('.moreDim').css( 'opacity', 0.7 );
                    };
                });
                root.find('.moreMenu').on('touchend', function(e){
                    touchMove = e.changedTouches[0].clientX;
                    touchEnd = e.changedTouches[0].clientX;
                    const menuWidth = $(window).width()-60;
                    if(parseInt($(this).css('right'), 10) > -menuWidth/2){
                        $(this).animate({
                            right : 0
                        }, -700/menuWidth*parseInt($(this).css('right'), 10) );
                        root.find('.moreDim').animate({
                            opacity : 0.7
                        }, -700/menuWidth*parseInt($(this).css('right'), 10) );
                    }else{
                        $(this).animate({
                            right : -menuWidth + 'px'
                        }, 700+(700/menuWidth*parseInt($(this).css('right'), 10)) );
                        root.find('.moreDim').animate({
                            opacity : 0
                        }, 700+(700/menuWidth*parseInt($(this).css('right'), 10)) );
                        moreDimOut();
                    };
                });
            });
        };
        $('.moreWrap').moreMenu();

    });
})(jQuery);