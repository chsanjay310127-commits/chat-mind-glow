import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { SmilePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { level: 1, emoji: "😢", label: "Rough", color: "bg-mood-bad" },
  { level: 2, emoji: "😔", label: "Low", color: "bg-mood-low" },
  { level: 3, emoji: "😐", label: "Okay", color: "bg-mood-okay" },
  { level: 4, emoji: "🙂", label: "Good", color: "bg-mood-good" },
  { level: 5, emoji: "😊", label: "Great", color: "bg-mood-great" },
];

const MoodTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [recentMoods, setRecentMoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchMoods();
  }, [user]);

  const fetchMoods = async () => {
    const { data } = await supabase.from("moods").select("*").eq("user_id", user!.id).order("created_at", { ascending: false }).limit(7);
    if (data) setRecentMoods(data);
  };

  const saveMood = async () => {
    if (!selectedMood || !user) return;
    setLoading(true);
    const mood = moods.find((m) => m.level === selectedMood)!;
    const { error } = await supabase.from("moods").insert({ user_id: user.id, mood_level: selectedMood, mood_emoji: mood.emoji, notes: notes || null });
    if (error) toast({ title: "Error", description: "Failed to save mood", variant: "destructive" });
    else {
      toast({ title: "Mood logged!", description: "Keep tracking how you feel" });
      setSelectedMood(null);
      setNotes("");
      fetchMoods();
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <SmilePlus className="w-6 h-6 text-primary" /> Mood Tracker
          </h1>
          <p className="text-muted-foreground">How are you feeling right now?</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center gap-3 mb-6">
              {moods.map((mood) => (
                <button key={mood.level} onClick={() => setSelectedMood(mood.level)} className={`flex flex-col items-center p-3 rounded-xl transition-all ${selectedMood === mood.level ? "bg-primary/10 ring-2 ring-primary scale-110" : "hover:bg-muted"}`}>
                  <span className="text-3xl mb-1">{mood.emoji}</span>
                  <span className="text-xs text-muted-foreground">{mood.label}</span>
                </button>
              ))}
            </div>
            <Textarea placeholder="Add a note about how you're feeling (optional)..." value={notes} onChange={(e) => setNotes(e.target.value)} className="mb-4" />
            <Button onClick={saveMood} disabled={!selectedMood || loading} className="w-full">Log Mood</Button>
          </CardContent>
        </Card>

        {recentMoods.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Recent Moods</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {recentMoods.map((m) => (
                  <div key={m.id} className="flex flex-col items-center min-w-[60px] p-2 rounded-lg bg-muted">
                    <span className="text-2xl">{m.mood_emoji}</span>
                    <span className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleDateString("en-US", { weekday: "short" })}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MoodTracker;
