using EPiServer.Shell.ObjectEditing.EditorDescriptors;

namespace EpiServerIconEditor.Business.EditorDescriptors
{
    [EditorDescriptorRegistration(TargetType = typeof(string), UIHint = "iconselector")]
    public class IconEditorDescriptor : EditorDescriptor
    {
        public IconEditorDescriptor()
        {

            ClientEditingClass = "iconselector/Editor";
        }
    }
}