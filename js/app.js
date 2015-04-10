function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
$(function() {
    $("#browsePhoto").click(function() {
        $("#imageFile").click();
    });

    $('#imageFile').change( function(event) {
        var fullPath = $('#imageFile').val();
        if(fullPath.substring(fullPath.length-4,fullPath.length)==".png"){
            var fileName = fullPath.split("\\");
            fileName = fileName[fileName.length-1];
            fileName = fileName.substring(0,fileName.length-4);
            var imagePath = URL.createObjectURL(event.target.files[0]);
            var canvas = document.getElementById('mycanvas');
                var context = canvas.getContext('2d');
                var image = new Image();
                image.src = imagePath;
                image.onload = function() {
                    context.drawImage(image, 0, 0,100,100);
                    var i = 0;
                    var j = 0;
                    var output = [];
                    for(i=0;i<100;i++){
                        for(j=0;j<100;j++){
                            var o = context.getImageData(i, j, 1, 1).data; 
                            if(o[3]!=0){
                                var box = [];
                                box.push(i);
                                box.push(0);
                                box.push(j);
                                box.push(("C"+("000000" + rgbToHex(o[0], o[1], o[2])).slice(-6)).toUpperCase());
                                output.push(box);
                            }
                        }
                    }
                    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(output));
                    $("#btnDisplay").append('<a class="btn btn-lg btn-default" id="downloadJson" href="data:' + data + '" download="'+fileName+'.lubas">Download</a>');
                    $("#browsePhoto").hide();
                    $("#downloadJson").click(function() {
                        $("#browsePhoto").show();
                        $("#downloadJson").remove();
                        $("#canvas").html('<canvas style="display:none" id="mycanvas" width="100px" height="100px"></canvas>');
                    });
                };
        }else{
            alert("Only png file support with transparent");
        }
    });
});
