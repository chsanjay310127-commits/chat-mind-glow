import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, SmilePlus, BookOpen, Wind, Sun, Sparkles } from "lucide-react";

const moodEmojis = ["😢", "😔", "😐", "🙂", "😊"];

const Dashboard = () => {
  const { user } = useAuth();
  const [recentMood, setRecentMood] = useState<any>(null);
  const [journalCount, setJournalCount] = useState(0);

  useEffect(() => {
    if (user) {
      supabase.from("moods").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).then(({ data }) => {
        if (data?.[0]) setRecentMood(data[0]);
      });
      supabase.from("journal_entries").select("id", { count: "exact" }).eq("user_id", user.id).then(({ count }) => {
        setJournalCount(count || 0);
      });
    }
  }, [user]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-peach-light flex items-center justify-center">
            <Sun className="w-6 h-6 text-peach" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {greeting()}, {user?.user_metadata?.full_name?.split(" ")[0] || "Friend"}!
            </h1>
            <p className="text-muted-foreground">How are you feeling today?</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/chat">
            <Card className="h-full hover:shadow-soft-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 text-sage" />
                </div>
                <h3 className="font-semibold">AI Chat</h3>
                <p className="text-sm text-muted-foreground">Talk to your wellness companion</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/mood">
            <Card className="h-full hover:shadow-soft-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-xl bg-peach-light flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <SmilePlus className="w-5 h-5 text-peach" />
                </div>
                <h3 className="font-semibold">Log Mood</h3>
                <p className="text-sm text-muted-foreground">{recentMood ? `Last: ${recentMood.mood_emoji}` : "Track how you feel"}</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/journal">
            <Card className="h-full hover:shadow-soft-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-xl bg-lavender-light flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5 text-lavender" />
                </div>
                <h3 className="font-semibold">Journal</h3>
                <p className="text-sm text-muted-foreground">{journalCount} entries written</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/meditation">
            <Card className="h-full hover:shadow-soft-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Wind className="w-5 h-5 text-sage" />
                </div>
                <h3 className="font-semibold">Meditate</h3>
                <p className="text-sm text-muted-foreground">Breathing & meditation</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card className="gradient-lavender border-0">
          <CardContent className="py-6 flex items-center gap-4">
            <Sparkles className="w-8 h-8 text-accent-foreground" />
            <div>
              <h3 className="font-semibold text-foreground">Daily Tip</h3>
              <p className="text-sm text-muted-foreground">Take a few deep breaths. You're doing great just by being here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
