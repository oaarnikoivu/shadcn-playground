import { Label } from "@/components/ui/label.tsx";
import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="space-y-1">
      <Label className="font-semibold">{title}</Label>
      {children}
    </div>
  );
}
