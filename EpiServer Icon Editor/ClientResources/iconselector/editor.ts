import _declare = require("dojo/_base/declare");
import cache = require("dojo/cache");
import _WidgetBase = require("dijit/_WidgetBase");
import _FocusMixin = require("dijit/_FocusMixin");
import _TemplatedMixin = require("dijit/_TemplatedMixin");
import _WidgetsInTemplateMixin = require("dijit/_WidgetsInTemplateMixin");
import selectionDialog = require("iconselector/selectionDialog");

class IconSelectorWidget {
    inherited: (args: Object) => void;
    _set: (object: string, value: any) => void;
    set: (object: string, value: any) => void;
    connect: (object: any, eventName: string, action: any) => void;
    value: any;

    onBlur: () => void;

    templateString: any = cache("iconselector", "templates/default.html");
    //It is possible to add multiple links here.
    iconCssLinks: string[] = 
        ["http://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
        "http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css"];
    remove: any;
    data: any;
    fontIcon: any;
    startPageLink: any;

    dialog: any;
    isShowingChildDialog: any = false;

    public postMixInProperties() {
        var head = document.getElementsByTagName('head')[0];
        for (var i: number = 0; i < this.iconCssLinks.length; i++) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = this.iconCssLinks[i];
            link.media = 'all';
            head.appendChild(link);
        } 
        this.inherited(arguments);
    };

    public buildRendering() {
        this.inherited(arguments);
    };

    public postCreate() {
        this.inherited(arguments);
    };

    public startup() {
        this.inherited(arguments);
    };

    public openDialog(event) {
        this.dialog = new selectionDialog({ dataObject: this.data, iconCssLink: this.iconCssLinks });
        this.connect(this.dialog, "onCallback", this._onDialogCallback);
        this.connect(this.dialog, 'onHide', this._onDialogHide);
        this.isShowingChildDialog = true;
        this.dialog.show();
    };

    public resetIcon() {
        this.set("value", "");
    }

    private _setValueAttr(value: string[]): void {
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

    private _onChange(value) {
        this.onBlur();
        this.inherited(arguments);

    };

    private _destroyDialog() {
        if (this.dialog) {
            this.dialog.destroyRecursive();
            delete this.dialog;
        }
        this.inherited(arguments);
    };

    private _onDialogCallback(value) {
        if (!value) {
            return this._onDialogHide();
        }
        this.set("value", value.data);
    };

    private _onDialogHide() {
        this.isShowingChildDialog = false;
        this._destroyDialog();
    };
}

var exp = _declare("iconselector/editor", [_WidgetBase, _FocusMixin, _TemplatedMixin, _WidgetsInTemplateMixin], new IconSelectorWidget());
export = exp;