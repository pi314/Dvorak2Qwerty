$(function () {
    var dvorak_string =
        '`1234567890[]~!@#$%^&*(){}' +
        '\',.pyfgcrl/="<>PYFGCRL?+' +
        'aoeuidhtns-AOEUIDHTNS_' +
        ';qjkxbmwvz:QJKXBMWVZ'

    var qwerty_string = 
        '`1234567890-=~!@#$%^&*()_+' +
        'qwertyuiop[]QWERTYUIOP{}' +
        'asdfghjkl;\'ASDFGHJKL:"' +
        'zxcvbnm,./ZXCVBNM<>?'
    
    var dvorak2qwerty_mapping = {};
    var qwerty2dvorak_mapping = {};

    for (var a = 0; a < dvorak_string.length; a++) {
        dvorak2qwerty_mapping[ dvorak_string[a] ] = qwerty_string[a];
        qwerty2dvorak_mapping[ qwerty_string[a] ] = dvorak_string[a];
    }
    dvorak2qwerty_mapping['BACKSLASH'] = 'BACKSLASH';
    qwerty2dvorak_mapping['BACKSLASH'] = 'BACKSLASH';

    dvorak2qwerty_mapping['ENTER'] = '\n';
    qwerty2dvorak_mapping['ENTER'] = '\n';

    dvorak2qwerty_mapping['BACKSPACE'] = 'BACKSPACE';
    qwerty2dvorak_mapping['BACKSPACE'] = 'BACKSPACE';

    var state = 'INPUT'; // 'INPUT', 'SELECT'
    var data = '';
    var direction = 'd2q';

    var input = function (i) {
        if (i == 'BACKSPACE') {
            if (state == 'INPUT') {
                data = data.substring(0, data.length - 1);
            } else {
                data = '';
            }
        } else {
            data = data + i;
        }
        state = 'INPUT';
        $('#result').val(data);
    };

    var select_all = function () {
        $('#result').select();
        state = 'SELECT';
    };

    KeyManager.keydown('CTRL', function () {
        select_all();
    }).keydown([qwerty_string, 'BACKSLASH', 'ENTER', 'BACKSPACE'], function (i) {
        if (direction == 'd2q') {
            input(dvorak2qwerty_mapping[i]);
        } else {
            input(qwerty2dvorak_mapping[i]);
        }
    });

    $('.d2q').click(function () {
        direction = 'd2q';
        $('#direction_message').text('Dvorak 2 Qwerty');
        $('#result').focus();
    });

    $('.q2d').click(function () {
        direction = 'q2d';
        $('#direction_message').text('Qwerty 2 Dvorak');
        $('#result').focus();
    });

    $('#result').blur(function () {
        $('#result').focus();
    });

    $('#result').focus();
});
