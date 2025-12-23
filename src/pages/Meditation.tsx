import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, Brain, Play, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const breathingExercises = [
  { name: "4-7-8 Relaxing", inhale: 4, hold: 7, exhale: 8, description: "Calming breath for sleep & anxiety" },
  { name: "Box Breathing", inhale: 4, hold: 4, exhale: 4, holdAfter: 4, description: "Focus & stress relief" },
  { name: "Energizing", inhale: 4, hold: 0, exhale: 2, description: "Quick energy boost" },
];

const Meditation = () => {
  const [activeExercise, setActiveExercise] = useState<typeof breathingExercises[0] | null>(null);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "holdAfter">("inhale");
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isRunning || !activeExercise) return;

    intervalRef.current = setInterval(() => {
      setCounter((prev) => {
        const currentMax = phase === "inhale" ? activeExercise.inhale : phase === "hold" ? activeExercise.hold : phase === "exhale" ? activeExercise.exhale : (activeExercise.holdAfter || 0);
        if (prev >= currentMax) {
          if (phase === "inhale") setPhase(activeExercise.hold > 0 ? "hold" : "exhale");
          else if (phase === "hold") setPhase("exhale");
          else if (phase === "exhale") setPhase(activeExercise.holdAfter ? "holdAfter" : "inhale");
          else setPhase("inhale");
          return 1;
        }
        return prev + 1;
      });
    }, 1000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, phase, activeExercise]);

  const startExercise = (ex: typeof breathingExercises[0]) => {
    setActiveExercise(ex);
    setPhase("inhale");
    setCounter(1);
    setIsRunning(true);
  };

  const stopExercise = () => {
    setIsRunning(false);
    setActiveExercise(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Wind className="w-6 h-6 text-primary" /> Meditation & Breathing
          </h1>
          <p className="text-muted-foreground">Find your calm with guided exercises</p>
        </div>

        {activeExercise ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6 transition-transform duration-1000 ${phase === "inhale" ? "scale-125 bg-sage-light" : phase === "exhale" ? "scale-100 bg-peach-light" : "scale-110 bg-lavender-light"}`}>
                <span className="text-2xl font-display font-bold capitalize">{phase === "holdAfter" ? "Hold" : phase}</span>
              </div>
              <p className="text-4xl font-bold text-foreground mb-2">{counter}</p>
              <p className="text-muted-foreground mb-6">{activeExercise.name}</p>
              <Button variant="outline" onClick={stopExercise}><Pause className="w-4 h-4 mr-2" /> Stop</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {breathingExercises.map((ex) => (
              <Card key={ex.name} className="hover:shadow-soft-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center mb-3">
                    <Wind className="w-5 h-5 text-sage" />
                  </div>
                  <h3 className="font-semibold mb-1">{ex.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{ex.description}</p>
                  <Button onClick={() => startExercise(ex)} size="sm"><Play className="w-4 h-4 mr-1" /> Start</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Meditation;
