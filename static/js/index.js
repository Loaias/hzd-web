$(function () {
    // 加载json,渲染页面
    render_page();

    // 加载百度地图
    load_map()

    //发送邮件
    $('#contact_form').submit(function (event) {

        event.preventDefault();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: $('#contact_form').serialize(),
            'url': "/contact/",
            cache: false
        }).done(function (data, textStatus, jqXHR) {
            console.log(data);

            if (data.result === 200) {

                // console.log(data.status);
                alert(data.message);

            } else {

                let message = data.message + "\n";
                $.each(data.status, function (i, error) {
                    message += error;
                });

                // console.log(message);
                alert(data.message);
            }

            $("#contact_form textarea").val('');
            $("#contact_form input:eq(1)").val('');
            $("#contact_form input:eq(2)").val('');
        });
    });
});

function load_map() {
    //百度地图重置
    $(".map button").on('click', function () {
        $('#baidu_map').attr('src', $('#baidu_map').attr('src'));
    });
}

function render_page() {

    const url = "http://www.jxhzd.tk/";

    const v_icon_1 = new Vue({
        el: "link[rel='icon']",
        data: {
            setting: {}
        }
    });
    const v_icon_2 = new Vue({
        el: "link[rel='shortcut icon']",
        data: {
            setting: {}
        }
    });

    const v_top_nav = new Vue({
        el: "#top-nav",
        data: {
            setting: {},
            navigation: []
        }
    });

    const v_slider = new Vue({
        el: "#slider",
        data: {
            sliders: []
        }
    });

    const v_about = new Vue({
        el: '#about',
        data: {
            about: {},
            setting: {}
        }
    });

    const v_service = new Vue({
        el: '#service',
        data: {
            service: {}
        }
    });

    const v_gallery = new Vue({
        el: '#gallery',
        data: {
            gallery: {items:[{}]},
            current: 0
        },
        methods: {
            show_portfolio(i) {
                this.current = i;
            }
        }
    });

    const v_team = new Vue({
        el: '#team',
        data: {
            team: {}
        }
    });

    const v_event = new Vue({
        el: '#event',
        data: {
            url: url,
            event: {items:[{}]},
            current: 0
        },
        methods: {
            show_portfolio(i) {
                this.current = i;
            }
        }
    });

    const v_footer = new Vue({
        el: '#footer',
        data: {
            setting: {},
            about: {},
            navigation: []
        }
    });

    fetch(url + "api/setting.json")
    .then(response => response.json())
    .then(json => {
        v_icon_1.setting = json;
        v_icon_2.setting = json;
        v_top_nav.setting = json;
        v_about.setting = json;
        v_footer.setting = json;
    });

    fetch(url + "api/navigation.json")
    .then(response => response.json())
    .then(json => {
        v_top_nav.navigation = json;
        v_footer.navigation = json;
    })
    .then(_ => {
        scroll_action();
    });

    fetch(url + "api/sliders.json")
    .then(response => response.json())
    .then(json => {
        v_slider.sliders = json;
    })
    .then(_ => {
        responsive_slides();
    });

    fetch(url + "api/about.json")
    .then(response => response.json())
    .then(json => {
        v_about.about = json;
        v_footer.about = json;
    });

    fetch(url + "api/gallery.json")
    .then(response => response.json())
    .then(json => {
        v_gallery.gallery = json;
    });

    fetch(url + "api/service.json")
    .then(response => response.json())
    .then(json => {
        v_service.service = json;
    });

    fetch(url + "api/team.json")
    .then(response => response.json())
    .then(json => {
        v_team.team = json;
    });

    fetch(url + "api/event.json")
    .then(response => response.json())
    .then(json => {
        v_event.event = json;
    })
    .then(_ => {
        $(".social-share").share();
    });
}
