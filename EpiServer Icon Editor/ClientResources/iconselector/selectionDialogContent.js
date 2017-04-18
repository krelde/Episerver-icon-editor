define(["require", "exports", "dojo/query", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "xstyle/css!/ClientResources/iconselector/templates/dialogContent.css"], function (require, exports, query, _declare, _WidgetBase, _TemplatedMixin, styles) {
    styles;
    var SelectionDialogContent = (function () {
        function SelectionDialogContent() {
        }
        SelectionDialogContent.prototype.buildRendering = function () {
            this.templateString = "<div><section id='search'><label for='search-input'><i class='fa fa-search'></i></label><input id='search-input' class='input-lg' placeholder='Search icons' data-dojo-attach-event='input:_search, paste:_search'></section><div id='iconContainer' data-dojo-attach-point='iconContainer'>" + this._getIconData(this.iconCssLink) + "</div></div>";
            this.inherited(arguments);
        };
        ;
        SelectionDialogContent.prototype.startup = function () {
            this._setCurrentIcon(this.dataObject);
        };
        ;
        SelectionDialogContent.prototype._selectIcon = function (event) {
            this.dataObject = event.currentTarget.dataset.icon;
            query(".activeIcon").removeClass("activeIcon");
            event.currentTarget.className += " activeIcon";
            this._setCurrentIcon(this.dataObject);
        };
        ;
        SelectionDialogContent.prototype._setCurrentIcon = function (value) {
            query(".icon-wrapper[data-icon ='" + value + "']").addClass("activeIcon");
        };
        ;
        SelectionDialogContent.prototype._getIconData = function (iconCssLink) {
            var iconString = "";
            var cssLink = "";
            if (iconCssLink.some(function (v) {
                cssLink = v;
                return v.indexOf("font-awesome") > -1;
            })) {
                iconString += this._getFontAwsomeDataIcons(cssLink);
            }
            if (iconCssLink.some(function (v) {
                cssLink = v;
                return v.indexOf("bootstrap-glyphicons") > -1;
            })) {
                iconString += this._getBootstrapDataIcons(cssLink);
            }
            return iconString;
        };
        ;
        SelectionDialogContent.prototype._search = function (event) {
            var inputValue = event.currentTarget.value;
            if (inputValue.length < 2) {
                for (var i = 0; i < this.iconContainer.children.length; i++) {
                    this.iconContainer.children[i].style.display = 'block';
                }
                return;
            }
            for (var i = 0; i < this.iconContainer.children.length; i++) {
                var currentIcon = this.iconContainer.children[i];
                if (currentIcon.dataset.icon.indexOf(inputValue) > -1) {
                    currentIcon.style.display = 'block';
                }
                else {
                    currentIcon.style.display = 'none';
                }
            }
        };
        ;
        SelectionDialogContent.prototype._getFontAwsomeDataIcons = function (iconCssLink) {
            //Fetch the css document
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', iconCssLink, false);
            xmlhttp.send();
            var result = "";
            var matchResult = xmlhttp.responseText.match(/\.fa-[A-Za-z0-9\-\_]+:before/g);
            var iconWrapper = "<div class='icon-wrapper' data-icon='fa {fa-class}' data-dojo-attach-event='onclick:_selectIcon'><a class='icon-link'><i class='fa {fa-class}'></i>{display-name}</a></div>";
            for (var i = 0; i < matchResult.length; i++) {
                matchResult[i] = matchResult[i].replace(".", "").replace(":before", "");
                result += iconWrapper.replace("{fa-class}", matchResult[i]).replace("{fa-class}", matchResult[i]).replace("{display-name}", matchResult[i].replace("fa-", ""));
            }
            return result;
        };
        SelectionDialogContent.prototype._getBootstrapDataIcons = function (iconCssLink) {
            //Fetch the css document
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', iconCssLink, false);
            xmlhttp.send();
            var result = "";
            var matchResult = xmlhttp.responseText.match(/\.glyphicon-[A-Za-z0-9\-\_]+:before/g);
            var iconWrapper = "<div class='icon-wrapper' data-icon='glyphicon {glyphicon-class}' data-dojo-attach-event='onclick:_selectIcon'><a class='icon-link'><i class='glyphicon {glyphicon-class}'></i>{display-name}</a></div>";
            for (var i = 0; i < matchResult.length; i++) {
                matchResult[i] = matchResult[i].replace(".", "").replace(":before", "");
                result += iconWrapper.replace("{glyphicon-class}", matchResult[i]).replace("{glyphicon-class}", matchResult[i]).replace("{display-name}", matchResult[i].replace("glyphicon-", ""));
            }
            return result;
        };
        return SelectionDialogContent;
    }());
    var exp = _declare("iconselector/selectionDialogContent", [_WidgetBase, _TemplatedMixin], new SelectionDialogContent());
    return exp;
});
//# sourceMappingURL=selectionDialogContent.js.map