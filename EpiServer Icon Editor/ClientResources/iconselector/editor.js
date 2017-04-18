define(["require", "exports", "dojo/_base/declare", "dojo/cache", "dijit/_WidgetBase", "dijit/_FocusMixin", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "iconselector/selectionDialog"], function (require, exports, _declare, cache, _WidgetBase, _FocusMixin, _TemplatedMixin, _WidgetsInTemplateMixin, selectionDialog) {
    var IconSelectorWidget = (function () {
        function IconSelectorWidget() {
            this.templateString = cache("iconselector", "templates/default.html");
          
            this.iconCssLinks = ["http://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
                "http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css"];
            this.isShowingChildDialog = false;
        }
     
        IconSelectorWidget.prototype.postMixInProperties = function () {
            var head = document.getElementsByTagName('head')[0];
            for (var i = 0; i < this.iconCssLinks.length; i++) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = this.iconCssLinks[i];
                link.media = 'all';
                head.appendChild(link);
            }
          
            this.inherited(arguments);
        };
        ;

        IconSelectorWidget.prototype.buildRendering = function () {
            this.inherited(arguments);
        };
        ;

        IconSelectorWidget.prototype.postCreate = function () {
            this.inherited(arguments);
        };
        ;
     
        IconSelectorWidget.prototype.startup = function () {
            this.inherited(arguments);
        };
        ;
        IconSelectorWidget.prototype.openDialog = function (event) {
            this.dialog = new selectionDialog({ dataObject: this.data, iconCssLink: this.iconCssLinks });
            this.connect(this.dialog, "onCallback", this._onDialogCallback);
            this.connect(this.dialog, 'onHide', this._onDialogHide);
            this.isShowingChildDialog = true;
            this.dialog.show();
        };
        ;
        IconSelectorWidget.prototype.resetIcon = function () {
            this.set("value", "");
        };
        IconSelectorWidget.prototype._setValueAttr = function (value) {
            this._onChange(value);
            if (!value) {
                this.remove.style.display = 'none';
                if (this.value) {
                    this.fontIcon.style.display = 'none';
                    this.fontIcon.className = "";
                    this.data = value;
                    this._set('value', value);
                }
                return;
            }
            this._set('value', value);
            this.remove.style.display = 'inline';
            this.data = value;
            this.fontIcon.style.display = 'inline';
            this.fontIcon.className = value;
        };
        ;
        IconSelectorWidget.prototype._onChange = function (value) {
            this.onBlur();
            this.inherited(arguments);
        };
        ;
        IconSelectorWidget.prototype._destroyDialog = function () {
            if (this.dialog) {
                this.dialog.destroyRecursive();
                delete this.dialog;
            }
            this.inherited(arguments);
        };
        ;
        IconSelectorWidget.prototype._onDialogCallback = function (value) {
            if (!value) {
                return this._onDialogHide();
            }
            this.set("value", value.data);
        };
        ;
        IconSelectorWidget.prototype._onDialogHide = function () {
            this.isShowingChildDialog = false;
            this._destroyDialog();
        };
        ;
        return IconSelectorWidget;
    }());
    var exp = _declare("iconselector/editor", [_WidgetBase, _FocusMixin, _TemplatedMixin, _WidgetsInTemplateMixin], new IconSelectorWidget());
    return exp;
});
//# sourceMappingURL=editor.js.map