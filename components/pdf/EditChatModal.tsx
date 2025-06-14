// components/EditChatDialog.tsx
import { FC, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";

interface EditChatDialogProps {
  chat: any;
  onClose: () => void;
  onUpdate: (chat: any) => void;
  onDelete: (chatId: string) => void;
}

const EditChatDialog: FC<EditChatDialogProps> = ({
  chat,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [title, setTitle] = useState(chat.title);
  const supabase = createClient();

  const handleSave = async () => {
    const { data, error } = await supabase
      .from("conversations")
      .update({ title })
      .eq("id", chat.id)
      .select();

    if (!error && data) {
      onUpdate(data[0]);
      onClose();
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("conversations")
      .delete()
      .eq("id", chat.id);

    if (!error) {
      onDelete(chat.id);
      onClose();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chat Title</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-left">
            Chat title
          </Label>
          <Input
            type="text"
            required
            placeholder="Give a title to your chat"
            className="col-span-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="text-white">
            Save
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-transparent text-red-500 hover:bg-transparent hover:text-red-700"
          >
            <Trash2Icon className="w-6" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditChatDialog;
