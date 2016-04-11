$(function () {
    var i = 0;
    $("#submit").click(function () {
        var $val = $("#textInput").val();
        //AJAX begin
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("post", "write_in.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("message=" + $val);
        /*if (xmlhttp.readyState==4 && xmlhttp.status==200)
         {
         alert("ready");
         }*/
        //AJAX finish
        if ($val == "") {
            $("#status").html("<i>“丑的人什么都不写，帅的人一般都写很多”</i>")
        }
        else {
            var date = new Date();
            var print = "<span class='time'>" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "</span><br/><span class='message'>" + $val + "</span><br/><br/>";
            $("#displayArea").append(print);
            scrollBottom.apply($("#displayArea")[0]);
            $("#status").html("恭喜您已成功留言，达瑞哥哥可以从后台看到留言，请您不要轻易表白");
            i++;
            $("#textInput")
                .val("")
                .focus();
            if (i >= 5) {
                $("#status").html("再留服务器流量就要超了！(╯‵□′)╯︵┻━┻");
            }
            if (i >= 7) {
                $("#status").html("卧槽够了！请您支付宝资助达瑞续费服务器<(￣ˇ￣)/");
            }
        }
    });
    scrollBottom.apply($("#displayArea")[0]);
});

/**
 * 使滚动条滚至底端函数
 */
function scrollBottom() {
    this.scrollTop = this.scrollHeight - this.clientHeight;
}