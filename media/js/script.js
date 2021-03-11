function CreateElementForExecCommand(textToClipboard) {
    var forExecElement = document.createElement("div");
    forExecElement.style.position = "absolute";
    forExecElement.style.left = "-10000px";
    forExecElement.style.top = "-10000px";
    forExecElement.textContent = textToClipboard;
    document.body.appendChild(forExecElement);
    forExecElement.contentEditable = true;
    return forExecElement;
}

function SelectContent(element) {
    var rangeToSelect = document.createRange();
    rangeToSelect.selectNodeContents(element);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(rangeToSelect);
}

var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');      
App = {
    mouseEvent: function() {
        $('body').on('click', function() {
            $('#personal-menu').fadeOut(250);
        });
        $(document).on('click', '#menu-bar.Card-menu', function() {
            $('#menu-bar').animate({ left: -42 }, 200, function() {
                $(this).removeClass('Card-menu').addClass('Card-close');
                $(this).animate({ left: 0 }, 200);
            });
            $('#mobile-menu').fadeIn(200).css('top', 0);
        });
        $(document).on('click', '#menu-bar.Card-close', function() {
            $('#menu-bar').animate({ left: -42 }, 200, function() {
                $(this).removeClass('Card-close').addClass('Card-menu');
                $(this).animate({ left: 0 }, 200);
            });
            $('#mobile-menu').fadeOut(200).css('top', -400);
        });
    },
    clearLog: function() {
        console.clear();
    },
    outputlog: function() {
        var newDate = new Date();
        //var timestamp = document.getElementById('UpdateTime').innerHTML;
        var timestamp = document.getElementsByTagName('meta')['UpdateTime'].content;
        newDate.setTime(timestamp);
        console.log(" %c Blog Update Time: " + newDate.toLocaleDateString() + " ", "color: #ffffff; background: #0092ee; padding:5px 0;border-radius:5px;");
        console.log("\n %c \u26a1Theme:Card Author's Blog:https://blog.itjoker.cn  Write By ITJoker  \n\n", "color: #ffffff; background: rgba(49, 49, 49, 0.85); padding:5px 0;border-radius:5px;");
    },
    hitokoto: function() { //一言
        function getHitokoto() {
            var xhr = new XMLHttpRequest();
            xhr.open('get', 'https://v1.hitokoto.cn');
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var typed = new Typed("#hitokoto", {
                        strings: [JSON.parse(xhr.responseText).hitokoto],
                        startDelay: 100,
                        typeSpeed: 200,
                        loop: true,
                        backSpeed: 100,
                        showCursor: true
                    });
                }
            }
            xhr.send();
        }
        getHitokoto();
    },
    createMessage: function(message, time = 1000) { //消息推送
        if ($(".message").length > 0) {
            $(".message").remove();
        }
        $("body").append('<div class="message"><p class="message-info">' + message + '</p></div>');
        setTimeout("$('.message').remove()", time);
    },
    isDateBetween: function(start, end) {
        var startDate = new Date(start)
        var endDate = new Date(end)
        var current = new Date()
        return current >= startDate && current < endDate
    },
    recallMemory: function() {
        var bg = $('#bg')
        var myDate = new Date;
        var mon = myDate.getMonth() + 1;
        var date = myDate.getDate();
        var days = ['4.4', '5.12', '7.7', '9.18', '12.13'];
        for (var day of days) {
            var d = day.split('.');
            if (mon == d[0] && date == d[1]) {
                bg.addClass('gray');
                App.createMessage("逝世的同胞、英雄一路走好!🙏", 3000);
            } else {
                bg.removeClass('gray');
                App.createMessage("欢迎来到我的Blog( •̀ .̫ •́ )✧🎉", 3000);
            }
        }
    },
    weather: function() {
        (function(a, h, g, f, e, d, c, b) {
            b = function() {
                d = h.createElement(g);
                c = h.getElementsByTagName(g)[0];
                d.src = e;
                d.charset = "utf-8";
                d.async = 1;
                c.parentNode.insertBefore(d, c)
            };
            a["SeniverseWeatherWidgetObject"] = f;
            a[f] || (a[f] = function() {
                (a[f].q = a[f].q || []).push(arguments)
            });
            a[f].l = +new Date();
            if (a.attachEvent) { a.attachEvent("onload", b) } else { a.addEventListener("load", b, false) }
        }(window, document, "script", "SeniverseWeatherWidget", "//cdn.sencdn.com/widget2/static/js/bundle.js?t=" + parseInt((new Date().getTime() / 100000000).toString(), 10)));
        window.SeniverseWeatherWidget('show', {
            flavor: "slim",
            location: "WWEFQFPJZ7T8",
            geolocation: true,
            language: "auto",
            unit: "c",
            theme: "auto",
            token: "61bcc333-3305-4728-9465-6785274bb0a3",
            hover: "enabled",
            container: "tp-weather-widget"
        })
    },
    changeTheme: function() {
        var themeIcon = document.getElementById("themeIcon");
        const currentTheme = window.localStorage.getItem('theme');
        if (currentTheme == 'light') {
            document.getElementsByTagName('html')[0].classList.add('theme-dark');
            themeIcon.classList.remove('Card-moon');
            themeIcon.classList.add('Card-sun');
            window.localStorage.setItem('theme', 'dark');
        } else {
            document.getElementsByTagName('html')[0].classList.remove('theme-dark');
            themeIcon.classList.remove('Card-sun');
            themeIcon.classList.add('Card-moon');
            window.localStorage.setItem('theme', 'light');
        }
        location.reload();
    }
}
App.mouseEvent();