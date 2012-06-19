;(function($, window, document, undefined) {
  var dataKey = 'cpfl_select';

  $.widget('CPFL.select', {
    options: {

    },

    _create: function() {
      var self = this,
      input,
      add_item;

      this.container = $('<div class="select"></div>')
        .insertAfter(this.element);

      this.option_selected = $('<input type="hidden" name="option_selected" value="" id="option_selected"/>')
        .appendTo(this.container.parent());

      this.input = $('<div class="select_input"></div>')
        .attr('tabindex', 0)
        .css({position: "relative"})
        .appendTo(this.container)
        .on('blur', function(event) {
          self.close();
        })
        .on('click', function(event) {
          self.open();
        });

      this.arrow = $('<div class="select_icon"><span class="icon" /></div>')
        .appendTo(this.input);

      this.display = $('<div class="select_display">&nbsp;</div>')
        .appendTo(this.input);

      this.dropdown = $('<ul class="select_dropdown"></ul>')
        .appendTo(this.container)
        .css('position', 'absolute');

      this.element.children().each(function(index, element) {
        if (index > 0) {
          var value     = $(element).val();
          var text      = $(element).text();
          var item      = $('<li><a>' + text + '</a></li>');
          item.data(dataKey, { text: text, value: value });
        }

        self.dropdown.append(item);
      });

      this.dropdown
      .menu({
        position: {
          collision: 'flip fit',
          offset: '0 -10'
        },
        select: function(event, ui) {
          var key = ui.item.data(dataKey);

          self.close();
          self.element.val(key.value)
          self.updateDisplay();
          self.submit(key.text);
        }
      });

      this.updateDisplay();
      this.close();

      this.element
        .hide()
        .addClass(dataKey)
        .on('change', function(event) {
          self.updateDisplay();
      });
    },

    open: function() {
      this.dropdown.show()
    },

    updateDisplay: function() {
      this.display.text(this.element.val());
    },

    submit: function(value) {
      this.option_selected.val(value);
      this.container.parent().submit();
    },

    close: function() {
      this.dropdown.hide();
    },

    _setOption: function(key, value) {
    },

    destroy: function() {
      $.Widget.prototype.destroy.call(this);
    }
  });
})(jQuery, window, document);
