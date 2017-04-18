/// <reference path="../../scripts/typings/dojo/dojo.d.ts" />
import query = require("dojo/query");
import _declare = require("dojo/_base/declare");
import _WidgetBase = require("dijit/_WidgetBase");
import _TemplatedMixin = require("dijit/_TemplatedMixin");
import styles = require("xstyle/css!/ClientResources/iconselector/templates/dialogContent.css");
styles;

class SelectionDialogContent {
    inherited: (args: Object) => void;
    _set: (object: string, value: any) => void;
    set: (object: string, value: any) => void;

    templateString: any;
    iconContainer: any;

    dataObject: any;
    iconCssLink: string[];

    buildRendering() {
        this.templateString = "<div><section id='search'><label for='search-input'><i class='fa fa-search'></i></label><input id='search-input' class='input-lg' placeholder='Search icons' data-dojo-attach-event='input:_search, paste:_search'></section><div id='iconContainer' data-dojo-attach-point='iconContainer'>" + this._getIconData(this.iconCssLink) + "</div></div>";
        this.inherited(arguments);
    };


    startup() {
        this._setCurrentIcon(this.dataObject);
    };

    _selectIcon(event) {
        this.dataObject = event.currentTarget.dataset.icon;
        query(".activeIcon").removeClass("activeIcon");
        event.currentTarget.className += " activeIcon";
        this._setCurrentIcon(this.dataObject);
    };

    _setCurrentIcon(value) {
        query(".icon-wrapper[data-icon ='" + value + "']").addClass("activeIcon");
    };

    _getIconData(iconCssLink: string[]) {
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

    _search(event) {

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
            } else {
                currentIcon.style.display = 'none';
            }
        }
    };

    _getFontAwsomeDataIcons(iconCssLink) {
        //Fetch the css document
        var xmlhttp: XMLHttpRequest = new XMLHttpRequest();
        xmlhttp.open('GET', iconCssLink, false);
        xmlhttp.send();

        var result: string = "";
        var matchResult: string[] = xmlhttp.responseText.match(/\.fa-[A-Za-z0-9\-\_]+:before/g);
        var iconWrapper = "<div class='icon-wrapper' data-icon='fa {fa-class}' data-dojo-attach-event='onclick:_selectIcon'><a class='icon-link'><i class='fa {fa-class}'></i>{display-name}</a></div>";

        for (var i: number = 0; i < matchResult.length; i++) {
            matchResult[i] = matchResult[i].replace(".", "").replace(":before", "");
            result += iconWrapper.replace("{fa-class}", matchResult[i]).replace("{fa-class}", matchResult[i]).replace("{display-name}", matchResult[i].replace("fa-", ""));
        }
        return result;
    }

    _getBootstrapDataIcons(iconCssLink) {
        //Fetch the css document
        var xmlhttp: XMLHttpRequest = new XMLHttpRequest();
        xmlhttp.open('GET', iconCssLink, false);
        xmlhttp.send();

        var result: string = "";
        var matchResult: string[] = xmlhttp.responseText.match(/\.glyphicon-[A-Za-z0-9\-\_]+:before/g);
        var iconWrapper = "<div class='icon-wrapper' data-icon='glyphicon {glyphicon-class}' data-dojo-attach-event='onclick:_selectIcon'><a class='icon-link'><i class='glyphicon {glyphicon-class}'></i>{display-name}</a></div>";

        for (var i: number = 0; i < matchResult.length; i++) {
            matchResult[i] = matchResult[i].replace(".", "").replace(":before", "");
            result += iconWrapper.replace("{glyphicon-class}", matchResult[i]).replace("{glyphicon-class}", matchResult[i]).replace("{display-name}", matchResult[i].replace("glyphicon-", ""));
        }
        return result;
    }
}

var exp = _declare("iconselector/selectionDialogContent", [_WidgetBase, _TemplatedMixin], new SelectionDialogContent());
export = exp;