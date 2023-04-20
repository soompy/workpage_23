window.ScrollDetector = window.ScrollDetector ||  window.scrollDetector || function () {
    this.items = [];
    this.add = function (_el, action, options) {
        var el;
        if(window.jQuery && _el instanceof window.jQuery) {
            el = _el[0]
        } else {
            el = _el
        }
        this.items.push( new Item(el, action, options) );
        detectScroll();
    };

    function getOffset(element){
        if (!element.getClientRects().length){
            return { top: 0, left: 0 };
        }
        var rect = element.getBoundingClientRect();
        var win = element.ownerDocument.defaultView;

        return ({
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        });   
    }

    function getWindowHeight () {
        return window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight
    }

    var Item = function (el, action, options) {
        this.id = new Date().getTime();
        this.el = el;
        this.currentActiveStatus = false
        this.action = action.bind(this);
        options = options || {}
        this.options = {
            offset: options.offset || 0, 
            scrollTop: options.scrollTop || 0,
            rollback: options.rollback || null,
            actionType: options.actionType || 'onece'
        };
    };

    var windowHeight = getWindowHeight(),
            that = this;

    function detectScroll(e) {

        if(e && e.type == 'resize') {
            windowHeight = getWindowHeight();
        }

        var scrollTop =  window.scrollY || document.documentElement.scrollTop;

        for(var i=that.items.length-1; i>-1; i--) {

            var el = that.items[i].el
            var offsetTop = getOffset(el).top + that.items[i].options.offset;
            var itemHeight = el.getBoundingClientRect().height;

            if(that.items[i].options.actionType == 'custom') {

                that.items[i].action.call(this, scrollTop);
                
            } else if (that.items[i].options.actionType == 'inout') {

                if(
                    (offsetTop > scrollTop && offsetTop < scrollTop + windowHeight) ||
                    (offsetTop + itemHeight> scrollTop && offsetTop + itemHeight < scrollTop + windowHeight) ||
                    (offsetTop < scrollTop && offsetTop + itemHeight > scrollTop + windowHeight)
                ){
                    if(that.items[i].currentActiveStatus !== true) {
                        that.items[i].action(el);
                        that.items[i].currentActiveStatus = true
                    }
                } else {
                    if(that.items[i].currentActiveStatus == true) {
                        that.items[i].action(el);
                        that.items[i].currentActiveStatus = false
                    }
                }

            } else {

                if(that.items[i].options.scrollTop) {
                    if(scrollTop > that.items[i].options.scrollTop) {
                        that.items[i].action(el);
                        that.items[i].currentActiveStatus = true

                        if(!that.items[i].options.rollback) {
                            that.items.splice(i, 1)	
                        }
                    } else {
                        if(that.items[i].options.rollback) {
                            that.items[i].options.rollback(el);
                        }
                    }
                } else {
                    if(that.items[i].options.rollback) { 
                        if(scrollTop > offsetTop - windowHeight) {
                            that.items[i].action(el);
                            that.items[i].currentActiveStatus = true
                        } else {
                            if(that.items[i].options.rollback) {
                                that.items[i].currentActiveStatus = false
                                that.items[i].options.rollback(el);
                            }
                        }

                    } else {
                        if(
                            (offsetTop > scrollTop && offsetTop < scrollTop + windowHeight) ||
                            (offsetTop + itemHeight> scrollTop && offsetTop + itemHeight < scrollTop + windowHeight) ||
                            (offsetTop < scrollTop && offsetTop + itemHeight > scrollTop + windowHeight)
                        ){
                            that.items[i].action(el);
                            that.items[i].currentActiveStatus = true
                            that.items.splice(i, 1)
                        }
                    }
                }
            }
        }
    }
    window.addEventListener('scroll', detectScroll);
    window.addEventListener('resize', detectScroll);
};
