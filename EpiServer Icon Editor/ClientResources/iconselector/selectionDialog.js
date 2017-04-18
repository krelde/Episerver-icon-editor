define(["require", "exports", "dojo/_base/declare", "epi/shell/widget/dialog/Dialog", "dojo/_base/lang", "iconselector/selectionDialogContent"], function (require, exports, _declare, Dialog, Lang, selectionDialogContent) {
    var SelectionDialog = (function () {
        function SelectionDialog() {
        }
        SelectionDialog.prototype.postMixInProperties = function () {
            this.content = new selectionDialogContent({ iconCssLink: this.iconCssLink, dataObject: this.dataObject });
            this.style = "min-width: 800px; min-height: 500px;";
            this.inherited(arguments);
        };
        ;
        SelectionDialog.prototype.postCreate = function () {
            this.containerNode.className += " min500";
            this.set("title", 'Icon selector');
            this.inherited(arguments);
        };
        ;
        SelectionDialog.prototype.getActions = function () {
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
        ;
        SelectionDialog.prototype._onSubmit = function () {
            var self = this;
            this._closing = true;
            setTimeout(function () {
                var result = self.getChildren()[0].dataObject;
                self.onHide();
                self.onCallback({
                    data: result
                });
            }, 100);
        };
        ;
        SelectionDialog.prototype._onCancel = function () {
            this.hide();
        };
        ;
        return SelectionDialog;
    }());
    var exp = _declare("iconselector/selectionDialog", [Dialog], new SelectionDialog());
    return exp;
});
//# sourceMappingURL=selectionDialog.js.map