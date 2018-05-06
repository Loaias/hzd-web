jQuery(document).ready(function ($) {
    //百度地图重置
    $(".map h4 span").on('click', function () {
        $('#baidu_map').attr('src', $('#baidu_map').attr('src'));
    });

    // //生成关于我们界面
    // $.ajax({
    //     type: 'GET',
    //     dataType: 'html',
    //     'url': "/about/",
    // }).done(function (data, textStatus, jqXHR) {
    //     $("#about").html(data);
    // });
    // //生成公益服务界面
    // $.ajax({
    //     type: 'GET',
    //     dataType: 'html',
    //     'url': "/services/",
    // }).done(function (data, textStatus, jqXHR) {
    //     $("#services").html(data);
    // });
    // //生成照片展示界面
    // $.ajax({
    //     type: 'GET',
    //     dataType: 'html',
    //     'url': "/galleries/",
    // }).done(function (data, textStatus, jqXHR) {
    //     const placeholder = $("#galleries_placeholder");
    //     $(data).insertAfter(placeholder);
    //     placeholder.remove();
    // });
    // //生成机构组成界面
    // $.ajax({
    //     type: 'GET',
    //     dataType: 'html',
    //     'url': "/institutions/",
    // }).done(function (data, textStatus, jqXHR) {
    //     $("#team").html(data);
    // });
    // //生成精彩活动界面
    // $.ajax({
    //     type: 'GET',
    //     dataType: 'html',
    //     'url': "/events/",
    // }).done(function (data, textStatus, jqXHR) {
    //     const placeholder = $("#events_placeholder");
    //     $(data).insertAfter(placeholder);
    //     placeholder.remove();
    // });
    // //生成页脚
    // $.ajax({
    //     type: 'GET',
    //     dataType: 'html',
    //     'url': "/footer/",
    // }).done(function (data, textStatus, jqXHR) {
    //     $("#footer").html(data);
    // });

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

    //进入登录界面
    let key_inputs = [];
    $("body").on("keyup", function (event) {
        const input = $("input#command");

        if (event.keyCode === 27) {
            input.val("");
        } else if (event.keyCode === 13) {
            input.parent().submit();
            console.log(input.parent());
            console.log(input.val());
        } else {
            input.val(input.val() + event.keyCode);
        }
    });
});
