$(function () { //获取处理友链数据
    $.getJSON("../json_data/friend.json", function (data) {
        let $links = $('.links-content');
        $links.html("");
        // 随机排序过滤失效的
        let notValid = data.filter((item) => item.valid === 0);
        data = data.filter((item) => item.valid !== 0).sort(function (a, b) {
            return Math.random() > .5 ? -1 : 1;
        });
        $links.append("<div class='friend-title-item'><br>大佬们<br><br><hr></div>");
        $.each(data, function (i, e) {
            let html = "<div class='friend-card-item'>";
            if (e.src === undefined) {
                html += "    <img class='ava' src='https://cdn.jsdelivr.net/gh/sunchaser-lilu/sunchaser-cdn@master/lilu.org.cn/avatar.png' alt='友链头像' title='图片链接不可用，使用的默认图片'>";
            } else {
                html += "    <img class='ava' src='" + e.src + "'>";
            }
            html +=
                "<div class='text-desc' title='" + e.desc + "'>    网址：<a href='" + e.url + "' target='_blank'>" + e.name + "</a>" +
                "    <br>时间：" + e.date +
                "<br>简介：" + e.desc + "</div>" +
                "    </div>";

            $links.append(html);
        });
        // 过期的
        if (notValid.length > 0) {
            $links.append("<div class='friend-title-item'><br>异常的大佬们<br><br><hr></div></div>");
            $.each(notValid, function (i, e) {
                let html = "<div class='friend-card-item'>";
                html += "    <img class='ava' src='/img/links/nopic.jpg' alt='友链头像' title='图片链接不可用，使用的默认图片'>";
                html +=
                    "<div class='text-desc' title='"+e.desc+"'>    网址：<a href='" + e.url + "' target='_blank'>" + e.name + "</a>" +
                    "    <br>访问时间：" + e.stopTime +
                    "<br>简介：" + e.desc + "</div>" +
                    "    </div>";

                $links.append(html);
            })
        }
        $links.append("</div>");
    })
});
