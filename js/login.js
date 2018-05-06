$(function(){
	const username = $("input[name='username']");
	const password = $("input[name='password']");
	const submit = $("button[type='submit']");
	const output = $("#output");

	$('button[type="submit"]').on("click", function(e) {

	    if (username.val() === "") {
			output.removeClass(' alert alert-success');
			output.addClass("alert alert-danger animated fadeInUp").html("sorry enter a username.");
        } else if (password.val() === "") {
			output.removeClass(' alert alert-success');
			output.addClass("alert alert-danger animated fadeInUp").html("sorry enter a password.");
        } else {
	        output.html("");

	        $.ajax({
                type: 'POST',
                dataType: 'json',
                data: $('form').serialize(),
                'url': "/login/",
	        }).done(function (data, textStatus, jqXHR) {
	            console.log(data);

	            if (data['errors']) {
                    output.removeClass(' alert alert-success');
                    output.addClass("alert alert-danger animated fadeInUp");

                    $.each(data['errors'], function (i, error) {
                        $("<p>", {
                            text: error
                        }).appendTo(output);
                    });
                } else {
	                $("<span>", {
	                    style: 'text-transform:uppercase',
                        text: username.val(),
                    }).appendTo($("<p>", {
                        text: "Welcome back "
                    }).appendTo(output));

                    output.addClass("alert alert-success animated fadeInUp");
                    output.removeClass(' alert-danger');

                    $("input").css({
                        "height":"0",
                        "padding":"0",
                        "margin":"0",
                        "opacity":"0"
                    });

                    //change button text
                    $('button[type="submit"]').html("continue")
                        .removeClass("btn-info")
                        .addClass("btn-default").on("click", function (e) {
                            window.location.replace("admin/");
                    });

                    //show avatar
                    $(".avatar").css({
                        "background-image": "url('" + data.avatar + "')"
                    });
                }
            });
		}

		e.preventDefault();
	});
});
