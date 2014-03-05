$(document).ready(function(){

    $.fn.showHideServices = function() {
        $('.serviceDiv').each(function(){
            var serviceName = $(this).attr('id');
            var selectedService = $('#editAService :selected').val();

            if (selectedService == serviceName)
                $(this).show();
            else
                $(this).hide();

        });
    } 

    $.fn.addService = function (id, name, url, key, isDefault, showService) {

        if (url.match('/$') == null)
            url = url + '/'

        var newData = [isDefault, [name, url, key]];

        if ($('#service_order_list > #'+id).length == 0 && showService != false) {
            var toAdd = '<li class="ui-state-default" id="'+id+'"> <input type="checkbox" id="enable_'+id+'" class="service_enabler" CHECKED> <a href="'+url+'" class="imgLink" target="_new"><img src="'+sbRoot+'/images/services/newznab.gif" alt="'+name+'" width="16" height="16"></a> '+name+'</li>'

            $('#service_order_list').append(toAdd);
            $('#service_order_list').sortable("refresh");
        }

    }

    $.fn.deleteService = function (id) {
        $('#service_order_list > #'+id).remove();
    }

    $.fn.refreshServiceList = function() {
            var idArr = $("#service_order_list").sortable('toArray');
            var finalArr = new Array();
            $.each(idArr, function(key, val) {
                    var checked = + $('#enable_'+val).prop('checked') ? '1' : '0';
                    finalArr.push(val + ':' + checked);
            });

            $("#service_order").val(finalArr.join(' '));
    }

	$.fn.checkSingleLanguage = function() {
		var num_languages = $('.token-input-list > .token-input-token').length
		
		if ($(this).prop('checked') && num_languages > 1) {
        	$(this).qtip('option', {
            	'content.text': 'Unrar Executable not found.',
                'style.classes': 'qtip-rounded qtip-shadow qtip-red'
			});
			$(this).qtip('show');
            $(this).css('background-color', '#FFFFDD');	
		}
    }

	//var subServices = new Array();
	
    $.fn.makeAuthServiceString = function() {
		var subStrings;
		
		$('.serviceDiv').each(function() {
        	var service = $(this).attr('id')
        	var uname = $('#' + service + '_username').val();
        	var passw = $('#' + service + '_password').val();

            subStrings = service+'|'+uname+'|'+passw+'!!!';
		});
		
		$('#subtitles_services_auth').val(subStrings);
    }
    
    $('#editAService').change(function(){
        $(this).showHideServices();
    });

    $('.service_enabler').live('click', function(){
        $(this).refreshServiceList();
    }); 
    
    $('.sub_passw, .sub_uname').change(function(){
    	$(this).makeAuthServiceString();
    });

    $('#subtitles_single').change(function(){
        $(this).checkSingleLanguage();
    });

    $('#subtitles_single').qtip( {
        position: {
            viewport: $(window),
            at: 'top center',
            my: 'bottom center',
        },
        style: {
            tip: {
                corner: true,
                method: 'polygon'
            },
            classes: 'qtip-rounded qtip-shadow qtip-red'
        }
    });

    // initialization stuff

    $(this).showHideServices();

    $("#service_order_list").sortable({
        placeholder: 'ui-state-highlight',
        update: function (event, ui) {
            $(this).refreshServiceList();
        }
    });

    $("#service_order_list").disableSelection();
    
});