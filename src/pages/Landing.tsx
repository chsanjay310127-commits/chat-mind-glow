import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Brain, BookOpen, Wind, Sparkles, MessageCircle } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "AI Wellness Chat",
    description: "Talk to a supportive AI companion anytime you need emotional support or guidance.",
    color: "bg-sage-light text-sage",
  },
  {
    icon: Heart,
    title: "Mood Tracking",
    description: "Log your daily moods and discover patterns to understand yourself better.",
    color: "bg-peach-light text-peach",
  },
  {
    icon: BookOpen,
    title: "Journaling",
    description: "Express your thoughts in a private, safe space with helpful prompts.",
    color: "bg-lavender-light text-lavender",
  },
  {
    icon: Wind,
    title: "Breathing Exercises",
    description: "Calm your mind with guided breathing techniques for any moment.",
    color: "bg-sage-light text-sage",
  },
  {
    icon: Brain,
    title: "Guided Meditation",
    description: "Find peace with meditation sessions designed for your wellbeing.",
    color: "bg-peach-light text-peach",
  },
  {
    icon: Sparkles,
    title: "Personal Insights",
    description: "Track your progress and celebrate your mental wellness journey.",
    color: "bg-lavender-light text-lavender",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen gradient-warm">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">MindfulMe</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" className="font-medium">Sign In</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button className="font-medium shadow-soft">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-accent-foreground mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Your mental wellness companion</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Nurture Your Mind,{" "}
            <span className="text-primary">One Day at a Time</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A gentle space to chat, reflect, and grow. Track your moods, write your thoughts, 
            and find moments of peace with guided exercises.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="font-semibold px-8 shadow-soft-lg">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="font-semibold px-8">
                I Already Have an Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="relative mt-16 flex justify-center">
          <div className="absolute -top-8 left-1/4 w-16 h-16 rounded-full bg-sage-light animate-float opacity-60" />
          <div className="absolute top-4 right-1/4 w-12 h-12 rounded-full bg-peach-light animate-float opacity-60" style={{ animationDelay: "1s" }} />
          <div className="absolute -bottom-4 left-1/3 w-10 h-10 rounded-full bg-lavender-light animate-float opacity-60" style={{ animationDelay: "2s" }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Mental Wellness
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A complete toolkit designed with care to support your emotional health journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-card shadow-soft hover:shadow-soft-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center p-8 md:p-12 rounded-3xl gradient-sage">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Start Feeling Better?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of people taking small steps toward better mental health every day.
          </p>
          <Link to="/auth?mode=signup">
            <Button size="lg" className="font-semibold px-8 shadow-soft">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">MindfulMe</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MindfulMe. Made with care for your wellbeing.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
