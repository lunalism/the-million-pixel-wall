// app/admin/about/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { EditAboutModal } from "@/components/admin/EditAboutModal";

interface AboutSection {
  id: string;
  emoji: string;
  title: string;
  content: string;
  order: number;
}

export default function AdminAboutPage() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AboutSection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSections = async () => {
    const { data, error } = await supabase
      .from("about")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) setSections(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📄 About Content</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border p-4 rounded-md bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{section.emoji} {section.title}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelected(section);
                    setIsModalOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </Button>
              </div>
              <p className="text-muted-foreground mt-2 whitespace-pre-wrap">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ✏️ 수정 모달 */}
      <EditAboutModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selected}
        onSave={fetchSections}
      />
    </div>
  );
}
