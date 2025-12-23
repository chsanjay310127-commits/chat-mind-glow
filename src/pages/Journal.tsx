import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { BookOpen, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const prompts = ["What are you grateful for today?", "How did you handle a challenge recently?", "What's something that made you smile?", "What are you looking forward to?"];

const Journal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    const { data } = await supabase.from("journal_entries").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
    if (data) setEntries(data);
  };

  const saveEntry = async () => {
    if (!title || !content || !user) return;
    setLoading(true);
    const { error } = await supabase.from("journal_entries").insert({ user_id: user.id, title, content });
    if (error) toast({ title: "Error", description: "Failed to save entry", variant: "destructive" });
    else {
      toast({ title: "Entry saved!" });
      setTitle("");
      setContent("");
      setShowForm(false);
      fetchEntries();
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" /> Journal
            </h1>
            <p className="text-muted-foreground">Your private space for reflection</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>{showForm ? <X className="w-4 h-4" /> : <><Plus className="w-4 h-4 mr-1" /> New Entry</>}</Button>
        </div>

        {showForm && (
          <Card className="animate-fade-in">
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {prompts.map((p) => (
                  <button key={p} onClick={() => setTitle(p)} className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground hover:bg-accent/80">{p}</button>
                ))}
              </div>
              <Input placeholder="Title or prompt..." value={title} onChange={(e) => setTitle(e.target.value)} />
              <Textarea placeholder="Write your thoughts..." value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
              <Button onClick={saveEntry} disabled={!title || !content || loading}>Save Entry</Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {entries.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No journal entries yet. Start writing!</CardContent></Card>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-soft transition-shadow">
                <CardContent className="pt-6">
                  <p className="text-xs text-muted-foreground mb-1">{new Date(entry.created_at).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</p>
                  <h3 className="font-semibold mb-2">{entry.title}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{entry.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Journal;
