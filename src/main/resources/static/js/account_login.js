let phone = document.getElementById("phone")

function chk_tel(str,id) {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';

    if (str.length < 4) {
        $("#"+id).val(str);
    } else if (str.length < 8) {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        $("#"+id).val(tmp);
    } else {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        $("#"+id).val(tmp);
    }
}

function keybtn(index){

    switch(index){
        case 0: case 1: case 2: case 3: case 4: 
        case 5: case 6: case 7: case 8: case 9:
            if(String(phone.value + index.toString()).length < 14){
                chk_tel(phone.value + index.toString(),'phone');
            }
            break;
        case 'CLR':
            phone.value = "";
            break;
        default:
            if(phone.value[phone.value.length-2] == "-"){
                phone.value = phone.value.substring(0,phone.value.length - 2);
            } else {
                phone.value = phone.value.substring(0,phone.value.length - 1);
            }
            break;
    }
}