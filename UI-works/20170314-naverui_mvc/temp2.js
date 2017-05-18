/* 2017. 03. 

*/
document.addEventListener("DOMContentLoaded", function() {
    util.runAjax("data/newslist.json", "load", main);
});

/* execute */
function main(){
    json = JSON.parse(this.responseText);
    model.init();
    controller.init();
}


/* ======= Utility ======= */
let util = {
    runAjax : function(url, listener, reqFunc){
        let oReq = new XMLHttpRequest();
        oReq.addEventListener(listener, reqFunc);
        oReq.open("GET", url);
        oReq.send();
    },
    $: function(selector) {
        return document.querySelector(selector);
    },
    $$: function(selector){
        return document.querySelectorAll(selector);
    },
    getChildOrder: function(elChild) {
        const elParent = elChild.parentNode;
        let nIndex = Array.prototype.indexOf.call(elParent.children, elChild);
        return nIndex;
    },
    getObjValList: function(key, obj){
        return obj.map(function (el) { return el[key]; });
    },
}


/* ======= Model ======= */
var model = {
    init: function(){
        if (!this.allNews) {
            this.allNews = json;
        }
        this.createNewKeyValPair("isSubscribe", true);
        this.subscribedNews = this.getCurrentSubscribedNews();
    },
    currentNews: null,
    createNewKeyValPair: function(key, val){
        for (let i=0; i<this.allNews.length; i++){
            this.allNews[i][key] = val;
        }
    },
    getCurrentSubscribedNews: function(newslist){
        this.newslist = this.allNews.filter(function(news){
            return news["isSubscribe"] === true;
        });
        return this.newslist? this.newslist : null;
    }
};



/* ======= controller ======= */

var controller = {
    init: function(){
        // set current page to the first one in the list
        model.currentNews = model.subscribedNews[0];
        // tell views to initialize
        headerMenuView.init();
        newsListView.init();
        newsPageView.init();
    },

    getCurrentNewsIndex: function(){
        return model.subscribedNews.map(function(elem) { return elem.title; }).indexOf(model.currentNews.title);
    },

    getCurrentNews: function(){
        return model.currentNews;
    },

    getSubscribedNews: function(){
        return model.subscribedNews;
    },

    getAllNews: function(){
        return model.allNews;
    },

    // set the currently-selected news to the object passed in
    setCurrentNews: function(idx) {
        model.currentNews = model.subscribedNews[idx]
    },

    unscribedCurrentNews: function(){
        return model.currentNews.isSubscribe = false;
    }

    // addNewSubscribedNews: function(){

    // },

    // removeSubscribedNews: function(){
    //     false
    // }

}

var headerMenuView = {
    init: function(){
      this.pageInfo = util.$(".info_page");
      this.render();
    },
    
    render: function(){
        this.pagination();
        //change page number
        util.$(".pagination").addEventListener("click", function(evt){
            target = evt.target;  
            this.currentOrder = controller.getCurrentNewsIndex();
            this.total = controller.getSubscribedNews().length;            
            if (target.tagName.toLowerCase() !== "button"){ target = target.parentNode; }
            
            if (util.$(".right")){
                nextOrder = this.currentOrder+1;
                if (nextOrder === this.total){ nextOrder = 0; }
             };
            if (util.$(".left")){
                nextOrder = this.currentOrder-1;
                if (nextOrder < 0){ nextOrder = this.total-1; }
            }
            return (function() {
                controller.setCurrentNews(nextOrder);
                newsPageView.init();
                this.pagination();
            }).call(headerMenuView);
        });
        
    },

    pagination: function(){
        this.currentOrder = controller.getCurrentNewsIndex();
        this.total = controller.getSubscribedNews().length;
        let currentPageRe = /(<strong\b[^>]*>)[^<>]*(<\/strong>)/i;
        let totalPageRe = /(<span\b[^>]*>)[^<>]*(<\/span>)/i;
        sPage = this.pageInfo.innerHTML.replace(currentPageRe, "$1"+(this.currentOrder+1)+"$2")
                     .replace(totalPageRe, "$1"+this.total+"$2");
        this.pageInfo.innerHTML = sPage;
    }
};


var newsListView = {
    init: function(){
        this.newsListElem = util.$(".mainArea > nav");
        this.template = util.$("#companyListTemplate").innerHTML;
        this.render();
    },

    render: function(){
        let companyObj = controller.getSubscribedNews();
        let companyName = util.getObjValList('title', companyObj);
        titleList = companyName.map(elem => `<li>${elem}`).join('</li>')+('</li>');
        this.template = this.template.replace("{companyList}", titleList);
        this.newsListElem.innerHTML = this.template;

        // on click, setCurrentNews and render the newsPageView
        this.newsListElem.addEventListener("click", function(evt) {
            // get the current news index number
            let currentOrder = util.getChildOrder(evt.target);
            return (function() {
                controller.setCurrentNews(currentOrder);
                newsPageView.init();
                headerMenuView.init();
            })();
        });
    }
}

var newsPageView = {
    init: function() {
        this.newsContent = util.$(".content");
        this.template = util.$("#newsContentTemplate").innerHTML;
        
        this.render();
        
     },
     render : function(){
        let currentNews = controller.getCurrentNews();
        articles = currentNews.newslist.map(el => `<li>${el}`).join('</li>')+('</li>');
        this.template = this.template.replace("{title}", currentNews.title)
                           .replace("{imgurl}", currentNews.imgurl)
                           .replace("{newsList}", articles);
        this.newsContent.innerHTML = this.template;
        this.buttons = util.$$("#newsContentTemplate > .buttonWrap");
        this.requestSubscription();
     },
     
     requestSubscription: function(){
        util.$(".unsubscribe").addEventListener("click", function(evt){
            target = evt.target;
            this.currentOrder = controller.getCurrentNewsIndex();
            
            if (target.tagName.toLowerCase() !== "button"){ target = target.parentNode; }
            // console.log(controller.getCurrentNews());

            return function(){
                //console.log(controller.getCurrentNews());
                controller.unscribedCurrentNews();
                controller.setCurrentNews(currentOrder-1);
                headerMenuView.init();
                newsListView.init();
                // console.log(controller.unscribedCurrentNews());
            }
        });
     }

}


    

