'use strict';
jQuery(document).ready(function () {
	if (jQuery('#message-purchased').length > 0) {
		var data = jQuery('#message-purchased').data();
		var notify = woo_notification;
		notify.ajax_url = data.url;
		notify.products = data.products;
		notify.messages = data.messages;
		notify.image = data.image;

		if (data.product) {
			notify.id = data.product;
		}
		notify.init();
	}

	jQuery('#notify-close').on('click', function () {
		woo_notification.message_hide();
	});
});


var woo_notification = {
	loop        : 0,
	init_delay  : 5,
	total       : 30,
	display_time: 5,
	next_time   : 30,
	count       : 0,
	intel       : 0,
	id          : 0,
	messages    : '',
	products    : '',
	ajax_url    : '',
	init        : function () {
		setTimeout(function () {
			woo_notification.get_product();
		}, this.init_delay * 1000);

	},
	message_show: function () {
		var count = this.count++;
		if (this.total <= count) {
			return;
		}
		window.clearInterval(this.intel);
		var message_id = jQuery('#message-purchased'),
			msg_display_effect = jQuery('#message-purchased').data('display_effect'),
			msg_hidden_effect = jQuery('#message-purchased').data('hidden_effect');
		if (message_id.hasClass(msg_hidden_effect)) {
			jQuery(message_id).removeClass(msg_hidden_effect);
		}
		jQuery(message_id).addClass(msg_display_effect).css('display', 'flex');
		setTimeout(function () {
			woo_notification.message_hide();
		}, this.display_time * 1000);
	},

	message_hide: function () {
		var message_id = jQuery('#message-purchased'),
			msg_display_effect = jQuery('#message-purchased').data('display_effect'),
			msg_hidden_effect = jQuery('#message-purchased').data('hidden_effect');

		if (message_id.hasClass(msg_display_effect)) {
			jQuery(message_id).removeClass(msg_display_effect);
		}
		jQuery('#message-purchased').addClass(msg_hidden_effect);
		jQuery('#message-purchased').fadeOut(1000);
		if (this.loop) {
			this.intel = setInterval(function () {
				woo_notification.get_product();
			}, this.next_time * 1000);
		}
	},
	get_product : function () {

		if (this.ajax_url) {
			var str_data;
			if (this.id) {
				str_data = '&id=' + this.id;
			} else {
				str_data = '';
			}
			jQuery.ajax({
				type   : 'POST',
				data   : 'action=woonotification_get_product' + str_data,
				url    : this.ajax_url,
				success: function (html) {
					var content = jQuery(html).children();
					jQuery("#message-purchased").html(content);
					woo_notification.message_show();
					jQuery('#notify-close').on('click', function () {
						woo_notification.message_hide();
					});
				},
				error  : function (html) {
				}
			})
		} else {
			var products = atob(this.products);
			var messages = atob(this.messages);
			var image_redirect = this.image;
			products = jQuery.parseJSON(products);
			messages = jQuery.parseJSON(messages);
			if (products.length > 0 && messages.length > 0) {
				/*Get message*/
				var index = woo_notification.random(0, messages.length - 1);
				var string = messages[index];

				/*Get data*/
				var index = woo_notification.random(0, products.length - 1);
				var product = products[index];
				var data_first_name = product.first_name;
				var data_city = product.city;
				var data_state = product.state;
				var data_country = product.country;
				var data_product = product.title;
				var data_product_link = '<a target="_blank" href="' + product.product_link + '">' + product.title + '</a>';
				var data_time = '<small>About ' + product.time + ' ago </small>';
				var data_custom = product.custom;
				var image_html = '';
				if (product.image_link) {
					if (image_redirect) {
						image_html = '<a target="_blank" href="' + product.product_link + '"><img src="' + product.image_link + '"></a>'
					} else {
						image_html = '<img src="' + product.image_link + '">';
					}
				}
				/*Replace message*/

				var replaceArray = ['{first_name}', '{city}', '{state}', '{country}', '{product}', '{product_with_link}', '{time_ago}', '{custom}'];
				var replaceArrayValue = [data_first_name, data_city, data_state, data_country, data_product, data_product_link, data_time, data_custom];
				var finalAns = string;
				for (var i = replaceArray.length - 1; i >= 0; i--) {
					finalAns = finalAns.replace(replaceArray[i], replaceArrayValue[i]);
				}
				var html = image_html + '<p>' + finalAns + '</p>';
				jQuery('.wn-nonajax').html(html);
				woo_notification.message_show();
			}
		}
	},
	close_notify: function () {
		jQuery('#notify-close').on('click', function () {
			woo_notification.message_hide();
		});
	},
	random      : function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
