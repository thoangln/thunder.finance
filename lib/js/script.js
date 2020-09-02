function onClose() {
    $("#undo").fadeIn();
}

$(document).ready(function() {
    var original = $("#window").clone(true);

    $(".box input").change(function() {
        var clone = original.clone(true);

        $("#undo").hide();
        $("#window").data("kendoWindow").destroy();

        setTimeout(function() {
            $("#indexWindow").append(clone);
            initWindow();
        }, 200);
    });

    var getEffects = function() {
        return "expand:vertical fadeIn";
    };

    function initWindow() {
        var isDraggable = true;
        var isResizable = true;

        var windowOptions = {
            actions: ["Minimize", "Maximize", "Close"],
            draggable: {
                containment: "#container"
            },
            resizable: isResizable,
            width: "80%",
            title: "⚡",
            visible: false,
            close: onClose
        };

        windowOptions.animation = { open: { effects: getEffects() }, close: { effects: getEffects(), reverse: true } };

        $("#window").kendoWindow(windowOptions);
        $(".k-window-titlebar").append("<span class='k-window-title title-center' style='flex: auto;'>Thunder</span>");
        $("#undo")
            .bind("click", function() {
                $("#window").data("kendoWindow").open();
                $("#undo").fadeOut(300);
            });

        $("#window").data("kendoWindow").open();
    }

    initWindow();

    $("#window").data("kendoWindow").wrapper
        .find(".k-i-custom").parent().click(function(e) {
            alert("Custom action button clicked");
            e.preventDefault();
        });
});