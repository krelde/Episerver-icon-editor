import _declare = require("dojo/_base/declare");
import Dialog = require("epi/shell/widget/dialog/Dialog");
import Lang = require("dojo/_base/lang");
import selectionDialogContent = require("iconselector/selectionDialogContent");

class SelectionDialog  {
    inherited: (args: Object) => void;
    _set: (object: string, value: any) => void;
    set: (object: string, value: any) => void;  
    connect: (object: any, eventName: string, action: any) => void;

    _cancelButtonName: any;
    _closing: any;
    _okButtonName: any;

    cancelActionText: string;
    readOnly: boolean;
    confirmActionText:any;
    content: any;
    hide:any;
    containerNode: any;
    style: any;

    iconCssLink: string[];
    dataObject: any;

    public postMixInProperties() {
    
        this.content = new selectionDialogContent({ iconCssLink: this.iconCssLink, dataObject: this.dataObject });
        this.style = "min-width: 800px; min-height: 500px;";
        this.inherited(arguments);
    };

    public postCreate() {
        
        this.containerNode.className += " min500";
        this.set("title", 'Icon selector');
        this.inherited(arguments);
    };

    public getActions() {
        var buttons = [];
        
        if (!this.readOnly) {
            buttons.push({
                name: this._okButtonName,
                label: this.confirmActionText,
                title: null,
                settings: { "class": "Salt" },
                action: Lang.hitch(this, this._onSubmit)
            });
        }

        buttons.push({
            name: this._cancelButtonName,
            label: this.cancelActionText,
            title: null,
            action: Lang.hitch(this, this._onCancel)
        });
        return buttons;
    };

   private _onSubmit() {
        var self: any = this;
        this._closing = true;
        setTimeout(function () {
            var result = self.getChildren()[0].dataObject;
            self.onHide();
            self.onCallback({
                data: result
            });
        }, 100);
    };

    private _onCancel() {
        this.hide();
    };
}


var exp = _declare("iconselector/selectionDialog", [Dialog], new SelectionDialog());
export = exp;