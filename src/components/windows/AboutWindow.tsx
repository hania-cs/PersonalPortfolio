import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, MapPin, Link2, Grid3X3, Bookmark, UserCircle, X, GraduationCap, Code, Coffee } from "lucide-react";
import { useState } from "react";

const highlights = [
  { id: 1, label: "Education", emoji: "🎓" },
  { id: 2, label: "Projects", emoji: "💻" },
  { id: 3, label: "Hobbies", emoji: "🎨" },
  { id: 4, label: "Travel", emoji: "✈️" },
];

const posts = [
  {
    id: 1,
    type: "about",
    title: "About Me",
    icon: Coffee,
    gradient: "from-pink-500 to-amber-500",
    content: "Hey! I'm Hania, a web developer passionate about building modern, user-centered applications with clean, efficient code. I recently graduated with a CS degree and had the incredible opportunity to finish my last university year in Spain as an Erasmus student, which broadened my perspective on technology and collaboration. I love exploring new frameworks, experimenting with cutting-edge tools, and creating projects that solve real problems.",
    likes: 234,
    comments: 12,
  },
  {
    id: 2,
    type: "education",
    title: "Education",
    icon: GraduationCap,
    gradient: "from-blue-500 to-green-500",
    content: "Modern University for Business and Science\nUniversitat de Lleida\nB.S. Computer Science\nClass of 2025 • GPA: 3.64/4.0",
    likes: 189,
    comments: 8,
  },
  {
    id: 3,
    type: "skills",
    title: "Tech Stack",
    icon: Code,
    gradient: "from-purple-800 to-pink-500",
    content: "React • TypeScript TailwindCSS • Node.js\nSupabase • MongoDB • MySQL • PostgreSQL\nGit • Docker\n\nAlways learning something new!",
    likes: 312,
    comments: 24,
  },
];

export const AboutWindow = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "tagged">("posts");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  const toggleLike = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="h-full overflow-y-auto relative">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-border/30"
      >
        <div className="flex items-start gap-6">
          {/* Profile Picture */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-pink-500 p-[3px]">
              <img 
                src="/1.jpg" 
                alt="Hania Seifeldeen" 
                className="w-full h-full rounded-full object-cover bg-background"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
          </div>

          {/* Stats */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <h1 className="text-lg font-semibold text-foreground truncate">hania.seifeldeen</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isFollowing 
                    ? "bg-secondary text-foreground border border-border" 
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 rounded-lg bg-secondary text-foreground"
              >
                <Send className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            <div className="flex gap-4 text-xs">
              <div>
                <span className="font-bold text-foreground">3</span>
                <span className="text-muted-foreground ml-1">posts</span>
              </div>
              <div>
                <span className="font-bold text-foreground">1.2K</span>
                <span className="text-muted-foreground ml-1">followers</span>
              </div>
              <div>
                <span className="font-bold text-foreground">384</span>
                <span className="text-muted-foreground ml-1">following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4 space-y-1">
          <h2 className="font-semibold text-foreground text-sm">Hania Seifeldeen</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            🎓 Web Developer<br />
            💻 Founder of Vertexa Digital Studios<br />
            🚀 Building cool stuff one commit at a time
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Beirut, Lebanon
            </span>
            <a href="https://github.com/hania-cs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
              <Link2 className="w-3 h-3" />
              github.com/hania-cs
            </a>
          </div>
        </div>
      </motion.div>

      {/* Story Highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="p-4 border-b border-border/30"
      >
        <div className="flex gap-3 overflow-x-auto pb-2">
          {highlights.map((highlight, index) => (
            <motion.button
              key={highlight.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-1 min-w-fit"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-border flex items-center justify-center text-xl hover:border-primary/50 transition-colors">
                {highlight.emoji}
              </div>
              <span className="text-[10px] text-muted-foreground">{highlight.label}</span>
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-1 min-w-fit"
          >
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-border flex items-center justify-center text-xl text-muted-foreground hover:border-primary/50 transition-colors">
              +
            </div>
            <span className="text-[10px] text-muted-foreground">New</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex border-b border-border/30">
        {[
          { id: "posts", icon: Grid3X3, label: "Posts" },
          { id: "saved", icon: Bookmark, label: "Saved" },
          { id: "tagged", icon: UserCircle, label: "Tagged" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors relative ${
              activeTab === tab.id ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
              />
            )}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-0.5 p-0.5"
      >
        {posts.map((post, index) => {
          const IconComponent = post.icon;
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="relative aspect-square group cursor-pointer overflow-hidden"
              onClick={() => setSelectedPost(post)}
            >
              {/* Gradient Background with Icon */}
              <div className={`w-full h-full bg-gradient-to-br ${post.gradient} flex flex-col items-center justify-center p-2`}>
                <IconComponent className="w-6 h-6 text-white mb-1" />
                <span className="text-white text-[10px] font-semibold text-center">{post.title}</span>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <div className="flex items-center gap-1 text-white text-xs font-semibold">
                  <Heart className={`w-3.5 h-3.5 ${likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""}`} />
                  {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                </div>
                <div className="flex items-center gap-1 text-white text-xs font-semibold">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {post.comments}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex-1 p-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Post Header */}
              <div className={`w-full h-24 rounded-xl bg-gradient-to-br ${selectedPost.gradient} flex items-center justify-center mb-4`}>
                <selectedPost.icon className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-xl font-bold text-foreground mb-3">{selectedPost.title}</h2>
              
              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {selectedPost.content}
              </p>

              {/* Interactions */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/30">
                <button
                  onClick={(e) => toggleLike(selectedPost.id, e)}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Heart className={`w-5 h-5 ${likedPosts.includes(selectedPost.id) ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="text-sm">{selectedPost.likes + (likedPosts.includes(selectedPost.id) ? 1 : 0)}</span> 
                </button>
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{selectedPost.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors ml-auto">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
