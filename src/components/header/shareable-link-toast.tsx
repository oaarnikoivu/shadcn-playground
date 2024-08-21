import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";
import { createShareableLink } from "@/utils/createShareableLink.ts";
import useCopyToClipboard from "@/hooks/useCopyToClipboard.ts";
import { Share2 } from "lucide-react";

export default function ShareableLinkToast() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copy] = useCopyToClipboard();

  const handleClick = () => {
    const link = createShareableLink();
    copy(link).then(() => {
      toast.success("Copied to clipboard", {
        description: "You can now share the link with others.",
      });
    });
  };

  return (
    <Button onClick={handleClick}>
      <Share2 className="size-3 mr-2" />
      Share
    </Button>
  );
}
