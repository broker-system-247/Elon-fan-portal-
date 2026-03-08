import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, MessageCircle, Phone, Mail, ChevronRight, Star, 
  Rocket, Zap, Brain, Car, Globe, Shield, Users, Gift, 
  CreditCard, Bitcoin, AlertTriangle, Send, Volume2, VolumeX,
  ExternalLink, Wallet, CheckCircle,
  Battery, Sun, Home, Factory, Cpu,
  Heart, ArrowRight, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import './App.css'

// Types
interface Review {
  id: number
  name: string
  age: number
  location: string
  image: string
  rating: number
  text: string
  date: string
}

interface CarModel {
  id: string
  name: string
  price: string
  range: string
  acceleration: string
  topSpeed: string
  images: string[]
  description: string
}

interface NewsItem {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  image: string
}

// Page Loader Component
function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setShowLogo(false)
            setTimeout(onComplete, 500)
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {showLogo && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          {/* Tesla Logo SVG */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 100 100" 
              className="animate-pulse-glow"
            >
              {/* Outer ring with electric effect */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#e82127" 
                strokeWidth="2"
                className="animate-electric-arc"
                strokeDasharray="10 5"
              />
              {/* Inner Tesla T logo */}
              <path
                d="M50 15 L50 85 M20 35 L80 35 M35 35 L50 15 L65 35"
                fill="none"
                stroke="#fff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Glow effect */}
              <circle 
                cx="50" 
                cy="50" 
                r="35" 
                fill="none" 
                stroke="#e82127" 
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
            {/* Electric arcs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-red-500/30 animate-ping" />
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-white/80 text-lg font-light tracking-widest"
          >
            INITIALIZING...
          </motion.p>
          
          {/* Progress bar */}
          <div className="mt-6 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 to-red-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <p className="mt-2 text-white/40 text-sm">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// 3D Starfield Background
function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stars: Array<{ x: number; y: number; z: number; size: number }> = []
    const numStars = 800
    const speed = 0.5

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initStars = () => {
      stars = []
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: (Math.random() - 0.5) * canvas.width * 2,
          y: (Math.random() - 0.5) * canvas.height * 2,
          z: Math.random() * canvas.width,
          size: Math.random() * 2 + 0.5
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2

      stars.forEach(star => {
        star.z -= speed * 10
        if (star.z <= 0) {
          star.z = canvas.width
          star.x = (Math.random() - 0.5) * canvas.width * 2
          star.y = (Math.random() - 0.5) * canvas.height * 2
        }

        const x = cx + (star.x / star.z) * cx
        const y = cy + (star.y / star.z) * cy
        const size = star.size * (1 - star.z / canvas.width) * 3
        const opacity = 1 - star.z / canvas.width

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          ctx.beginPath()
          ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initStars()
    animate()

    window.addEventListener('resize', () => {
      resize()
      initStars()
    })

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)' }}
    />
  )
}

// Floating AI Chat Assistant
function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Hello! I am Elon\'s AI assistant. I can help you navigate this platform and answer questions about Elon Musk, his companies, Mars, and the future of humanity. How can I assist you today?' }
  ])
  const [input, setInput] = useState('')
  const [isMuted, setIsMuted] = useState(false)

  const speak = (text: string) => {
    if (isMuted || !window.speechSynthesis) return
    
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 0.9
    window.speechSynthesis.speak(utterance)
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Elon Musk built this platform personally to connect with supporters and accelerate humanity's multiplanetary future.",
        "SpaceX is making life multiplanetary. Starship will be the vehicle that takes humans to Mars.",
        "Tesla's mission is to accelerate the world's transition to sustainable energy.",
        "Neuralink aims to create brain-computer interfaces to help people with neurological conditions and eventually enhance human capabilities.",
        "xAI is working to understand the true nature of the universe through artificial intelligence.",
        "Mars is the next frontier for humanity. Elon believes we should become a multiplanetary species to ensure our long-term survival.",
        "This platform is monitored for safety. Please use the official WhatsApp number +19494638830 only for messaging, not calls.",
        "Your support through donations helps fund these world-changing missions. Thank you for believing in the future!"
      ]
      const response = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      speak(response)
    }, 1000)
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-lg shadow-red-600/30 flex items-center justify-center"
          style={{ transform: 'translate(0px, 0px)' }}
        >
          <Sparkles className="w-8 h-8 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] rounded-2xl glass overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-red-900/50 to-black/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Elon AI Assistant</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-white/60" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-red-600 text-white rounded-br-none'
                          : 'bg-white/10 text-white rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => speak(msg.content)}
                          className="mt-2 text-xs text-white/60 hover:text-white flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          Listen
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
                <Button
                  onClick={handleSend}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-center text-white/40">
                Built personally by Elon Musk
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Navigation Sidebar
function Navigation({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Elon', icon: Users },
    { id: 'spacex', label: 'SpaceX', icon: Rocket },
    { id: 'tesla', label: 'Tesla Vehicles', icon: Car },
    { id: 'energy', label: 'Tesla Energy', icon: Sun },
    { id: 'xai', label: 'xAI / Grok', icon: Brain },
    { id: 'neuralink', label: 'Neuralink', icon: Cpu },
    { id: 'boring', label: 'The Boring Company', icon: Factory },
    { id: 'hyperloop', label: 'Hyperloop', icon: Zap },
    { id: 'news', label: 'News & Updates', icon: Globe },
    { id: 'shop', label: 'Tesla Shop', icon: ShoppingBag },
    { id: 'donate', label: 'Donate & Support', icon: Heart },
    { id: 'giveaway', label: 'Giveaways', icon: Gift },
    { id: 'reviews', label: 'Fan Reviews', icon: Star },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ]

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-40 p-3 rounded-full glass hover:bg-white/10 transition-colors"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-80 bg-black/95 border-white/10 p-0">
          <SheetHeader className="p-6 border-b border-white/10">
            <SheetTitle className="text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <p className="text-lg font-bold">Elon Musk</p>
                <p className="text-xs text-white/60">Official Platform</p>
              </div>
            </SheetTitle>
          </SheetHeader>
          
          <ScrollArea className="h-[calc(100vh-120px)]">
            <nav className="p-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {currentPage === item.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </nav>
            
            <div className="p-4 border-t border-white/10">
              <p className="text-xs text-white/40 text-center">
                © 2025 Elon Musk Platform
                <br />
                <span className="text-red-500/60">Built by Elon personally</span>
              </p>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}

// Shopping Bag Icon component
function ShoppingBag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

// Home Page
function HomePage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-red-600/20 text-red-400 border-red-600/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Welcome to the Future
            </Badge>
            <h1 className="text-responsive-hero font-bold mb-6 leading-tight">
              THE FUTURE IS <span className="gradient-text">NOW</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto">
              Join Elon Musk in shaping humanity's multiplanetary future. 
              This platform connects you directly with the vision that's changing the world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => setCurrentPage('about')}
              className="bg-red-600 hover:bg-red-700 text-white px-8"
            >
              Explore
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentPage('contact')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Connect on WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentPage('donate')}
              className="border-red-600/50 text-red-400 hover:bg-red-600/10"
            >
              <Heart className="w-5 h-5 mr-2" />
              Support the Mission
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Company Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">The Companies Changing the World</h2>
            <p className="text-white/60 text-lg">Explore Elon's vision across multiple industries</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'spacex', name: 'SpaceX', desc: 'Making life multiplanetary', icon: Rocket, color: 'from-blue-600/20 to-blue-900/20' },
              { id: 'tesla', name: 'Tesla', desc: 'Accelerating sustainable energy', icon: Car, color: 'from-red-600/20 to-red-900/20' },
              { id: 'xai', name: 'xAI', desc: 'Understanding the universe', icon: Brain, color: 'from-purple-600/20 to-purple-900/20' },
              { id: 'neuralink', name: 'Neuralink', desc: 'Brain-computer interfaces', icon: Cpu, color: 'from-green-600/20 to-green-900/20' },
              { id: 'boring', name: 'The Boring Company', desc: 'Ending traffic', icon: Factory, color: 'from-orange-600/20 to-orange-900/20' },
              { id: 'hyperloop', name: 'Hyperloop', desc: 'The future of transportation', icon: Zap, color: 'from-cyan-600/20 to-cyan-900/20' },
            ].map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setCurrentPage(company.id)}
                className={`p-6 rounded-2xl bg-gradient-to-br ${company.color} border border-white/10 cursor-pointer card-3d`}
              >
                <div className="card-3d-inner">
                  <company.icon className="w-12 h-12 mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">{company.name}</h3>
                  <p className="text-white/60">{company.desc}</p>
                  <div className="mt-4 flex items-center text-red-400 text-sm">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-red-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <QuoteIcon className="w-16 h-16 mx-auto mb-6 text-red-500/50" />
            <blockquote className="text-2xl md:text-4xl font-light italic text-white/90 mb-8">
              "When something is important enough, you do it even if the odds are not in your favor."
            </blockquote>
            <p className="text-red-400 font-semibold">— Elon Musk</p>
          </motion.div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Connect with Elon</h2>
              <p className="text-white/60">Your direct line to the future</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="https://wa.me/19494638830"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-xl bg-green-600/20 border border-green-600/30 hover:bg-green-600/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">WhatsApp</h3>
                  <p className="text-white/60 text-sm">+1 (949) 463-8830</p>
                  <p className="text-green-400 text-xs mt-1">Official Private Line</p>
                </div>
              </a>

              <a
                href="mailto:CEOelonmusk@outlook.com"
                className="flex items-center gap-4 p-6 rounded-xl bg-blue-600/20 border border-blue-600/30 hover:bg-blue-600/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-white/60 text-sm">CEOelonmusk@outlook.com</p>
                  <p className="text-blue-400 text-xs mt-1">Personal Email</p>
                </div>
              </a>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/70">
                  <p className="font-semibold text-yellow-500 mb-1">Important Notice</p>
                  <p>The WhatsApp number is for messages ONLY. No calls or SMS. Violators will be banned and tracked by authorities.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Quote Icon Component
function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  )
}

// About Page
function AboutPage({  }: { setCurrentPage: (page: string) => void }) {
  const timeline = [
    { year: '1971', event: 'Born in Pretoria, South Africa', description: 'Elon Reeve Musk was born on June 28, 1971.' },
    { year: '1995', event: 'Started Zip2', description: 'Co-founded web software company Zip2 with his brother Kimbal.' },
    { year: '1999', event: 'Sold Zip2', description: 'Compaq acquired Zip2 for $307 million.' },
    { year: '1999', event: 'Founded X.com', description: 'Started online financial services company X.com.' },
    { year: '2000', event: 'PayPal Merger', description: 'X.com merged with Confinity to form PayPal.' },
    { year: '2002', event: 'Founded SpaceX', description: 'Started Space Exploration Technologies Corp. with the goal of reducing space transportation costs.' },
    { year: '2004', event: 'Joined Tesla', description: 'Became chairman of Tesla Motors, later becoming CEO and product architect.' },
    { year: '2008', event: 'First SpaceX Success', description: 'Falcon 1 became the first privately-funded liquid-fueled rocket to reach orbit.' },
    { year: '2012', event: 'SpaceX ISS Mission', description: 'Dragon became the first commercial spacecraft to dock with the International Space Station.' },
    { year: '2015', event: 'Founded OpenAI', description: 'Co-founded OpenAI to develop safe artificial general intelligence.' },
    { year: '2016', event: 'Founded Neuralink', description: 'Started Neuralink to develop brain-computer interfaces.' },
    { year: '2016', event: 'Founded The Boring Company', description: 'Started infrastructure and tunnel construction company.' },
    { year: '2022', event: 'Acquired Twitter', description: 'Acquired Twitter for $44 billion, later rebranded to X.' },
    { year: '2023', event: 'Founded xAI', description: 'Started xAI to understand the true nature of the universe.' },
  ]

  return (
    <div className="min-h-screen pt-20 px-4">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="mb-4 bg-red-600/20 text-red-400">The Visionary</Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">ELON MUSK</h1>
              <p className="text-xl text-white/70 mb-6">
                Technoking of Tesla | CEO of SpaceX | Chief Engineer | 
                Founder of xAI, Neuralink & The Boring Company
              </p>
              <p className="text-white/60 leading-relaxed">
                Elon Musk is an entrepreneur and business magnate working to revolutionize 
                transportation on Earth and in space, advance sustainable energy, develop 
                artificial intelligence, and create brain-computer interfaces.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="/images/elon/elon-portrait-1.jpg"
                  alt="Elon Musk"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-6 glass rounded-xl">
                <p className="text-3xl font-bold text-red-500">200M+</p>
                <p className="text-white/60">Followers on X</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Journey to the Future</h2>
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-red-500 font-bold">{item.year}</span>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className="w-4 h-4 rounded-full bg-red-600" />
                  {i < timeline.length - 1 && (
                    <div className="absolute top-4 left-1.5 w-0.5 h-full bg-white/20" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold text-lg">{item.event}</h3>
                  <p className="text-white/60">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-gradient-to-b from-transparent to-red-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Vision for Humanity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Mars Colonization', desc: 'Establish a self-sustaining city on Mars', icon: Rocket },
              { title: 'Sustainable Energy', desc: 'Accelerate the transition to renewable energy', icon: Sun },
              { title: 'AI Safety', desc: 'Develop safe artificial general intelligence', icon: Brain },
              { title: 'Neural Interface', desc: 'Merge human consciousness with AI', icon: Cpu },
            ].map((vision, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 glass rounded-xl text-center"
              >
                <vision.icon className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h3 className="font-semibold mb-2">{vision.title}</h3>
                <p className="text-white/60 text-sm">{vision.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// SpaceX Page
function SpaceXPage({  }: { setCurrentPage: (page: string) => void }) {
  const vehicles = [
    { name: 'Starship', role: 'Fully reusable transportation system', specs: { height: '120m', payload: '100-150t', status: 'In Development' }, image: '/images/elon/elon-spacex.jpg' },
    { name: 'Falcon 9', role: 'Orbital rocket', specs: { height: '70m', payload: '22.8t', status: 'Operational' }, image: '/images/tesla/model-s-front.jpg' },
    { name: 'Falcon Heavy', role: 'Heavy lift vehicle', specs: { height: '70m', payload: '63.8t', status: 'Operational' }, image: '/images/tesla/model-x-front.jpg' },
    { name: 'Dragon', role: 'Spacecraft', specs: { capacity: '7 astronauts', status: 'Operational' }, image: '/images/tesla/cybertruck-front.jpg' },
  ]

  return (
    <div className="min-h-screen pt-20 px-4">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">MAKING LIFE</h1>
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-8">MULTIPLANETARY</h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              SpaceX was founded under the belief that a future where humanity is out 
              exploring the stars is fundamentally more exciting than one where we are not.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vehicles */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vehicles.map((vehicle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="aspect-video">
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{vehicle.name}</h3>
                  <p className="text-white/60 mb-4">{vehicle.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(vehicle.specs).map(([key, value]) => (
                      <Badge key={key} variant="secondary" className="bg-white/10">
                        {key}: {value}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mars Mission */}
      <section className="py-20 bg-gradient-to-b from-transparent to-red-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">The Mars Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Unmanned Missions', desc: 'Cargo missions to establish infrastructure' },
              { step: '2', title: 'First Crew', desc: 'Initial human landing and base establishment' },
              { step: '3', title: 'Self-Sustaining City', desc: 'A million people living on Mars' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 glass rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Tesla Page
function TeslaPage() {
  const cars: CarModel[] = [
    {
      id: 'model-s',
      name: 'Model S Plaid',
      price: '$89,990',
      range: '396 mi',
      acceleration: '1.99s',
      topSpeed: '200 mph',
      images: ['/images/tesla/model-s-front.jpg', '/images/tesla/model-s-side.jpg', '/images/tesla/model-s-interior.jpg'],
      description: 'The highest performing sedan ever built.'
    },
    {
      id: 'model-3',
      name: 'Model 3',
      price: '$38,990',
      range: '272 mi',
      acceleration: '5.8s',
      topSpeed: '140 mph',
      images: ['/images/tesla/model-3-front.jpg', '/images/tesla/model-s-side.jpg', '/images/tesla/model-s-interior.jpg'],
      description: 'The perfect combination of range, performance, and price.'
    },
    {
      id: 'model-x',
      name: 'Model X Plaid',
      price: '$99,990',
      range: '333 mi',
      acceleration: '2.5s',
      topSpeed: '163 mph',
      images: ['/images/tesla/model-x-front.jpg', '/images/tesla/model-s-side.jpg', '/images/tesla/model-s-interior.jpg'],
      description: 'The ultimate SUV with falcon wing doors.'
    },
    {
      id: 'model-y',
      name: 'Model Y',
      price: '$44,990',
      range: '260 mi',
      acceleration: '5.0s',
      topSpeed: '135 mph',
      images: ['/images/tesla/model-y-front.jpg', '/images/tesla/model-s-side.jpg', '/images/tesla/model-s-interior.jpg'],
      description: 'The compact SUV designed for versatility.'
    },
    {
      id: 'cybertruck',
      name: 'Cybertruck',
      price: '$60,990',
      range: '340 mi',
      acceleration: '2.6s',
      topSpeed: '130 mph',
      images: ['/images/tesla/cybertruck-front.jpg', '/images/tesla/cybertruck-side.jpg', '/images/tesla/cybertruck-interior.jpg'],
      description: 'The most capable truck ever built.'
    },
    {
      id: 'roadster',
      name: 'Roadster',
      price: '$200,000',
      range: '620 mi',
      acceleration: '1.9s',
      topSpeed: '250+ mph',
      images: ['/images/tesla/roadster-front.jpg', '/images/tesla/model-s-side.jpg', '/images/tesla/model-s-interior.jpg'],
      description: 'The quickest car in the world. Coming soon.'
    },
  ]

  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null)

  return (
    <div className="min-h-screen pt-20 px-4">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">TESLA</h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Accelerating the world's transition to sustainable energy with electric vehicles, 
              solar, and integrated renewable energy solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Car Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Vehicle Lineup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedCar(car)}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={car.images[0]} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{car.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-red-400 font-semibold">{car.price}</span>
                    <span className="text-white/40 text-sm">{car.range} range</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Detail Dialog */}
      <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
        <DialogContent className="max-w-4xl bg-black/95 border-white/10 text-white max-h-[90vh] overflow-y-auto">
          {selectedCar && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl">{selectedCar.name}</DialogTitle>
                <DialogDescription className="text-white/60">
                  {selectedCar.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {selectedCar.images.map((img, i) => (
                  <div key={i} className="aspect-video rounded-lg overflow-hidden">
                    <img src={img} alt={`${selectedCar.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="p-4 glass rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-400">{selectedCar.acceleration}</p>
                  <p className="text-sm text-white/60">0-60 mph</p>
                </div>
                <div className="p-4 glass rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-400">{selectedCar.topSpeed}</p>
                  <p className="text-sm text-white/60">Top Speed</p>
                </div>
                <div className="p-4 glass rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-400">{selectedCar.range}</p>
                  <p className="text-sm text-white/60">Range</p>
                </div>
                <div className="p-4 glass rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-400">{selectedCar.price}</p>
                  <p className="text-sm text-white/60">Starting</p>
                </div>
              </div>

              <a
                href={`https://wa.me/19494638830?text=Hi%20Elon,%20I'm%20interested%20in%20ordering%20the%20${encodeURIComponent(selectedCar.name)}.%20Please%20provide%20more%20information.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-6"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order via WhatsApp
                </Button>
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Energy Page
function EnergyPage({  }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">TESLA ENERGY</h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Power your home and business with sustainable energy solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Solar Panels', 
                desc: 'Convert sunlight into clean energy for your home.',
                icon: Sun,
                price: 'From $34,000'
              },
              { 
                name: 'Solar Roof', 
                desc: 'Beautiful solar tiles that power your home.',
                icon: Home,
                price: 'Custom Quote'
              },
              { 
                name: 'Powerwall', 
                desc: 'Store energy for when you need it most.',
                icon: Battery,
                price: '$11,500'
              },
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <product.icon className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
                <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
                <p className="text-white/60 mb-6">{product.desc}</p>
                <p className="text-red-400 font-semibold mb-6">{product.price}</p>
                <a
                  href={`https://wa.me/19494638830?text=Hi%20Elon,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}.%20Please%20provide%20more%20information.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// xAI Page
function XAIPage({  }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">GROK</h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              AI for all humanity. Grok is your cosmic guide to understanding the universe.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => window.open('https://grok.com', '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Try Grok
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Grok Can Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Real-time Knowledge', desc: 'Access up-to-date information from X and the web', icon: Globe },
              { title: 'Conversational AI', desc: 'Natural, engaging conversations on any topic', icon: MessageCircle },
              { title: 'Image Understanding', desc: 'Analyze and describe images with precision', icon: Cpu },
              { title: 'Coding Assistant', desc: 'Help with programming in any language', icon: Zap },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 glass rounded-xl text-center"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Colossus Supercomputer</h2>
          <p className="text-white/60 mb-8">
            The world's largest AI supercluster, powering the next generation of artificial intelligence.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '100,000+', label: 'GPUs' },
              { value: '200MW', label: 'Power' },
              { value: '2B+', label: 'Parameters' },
              { value: '10x', label: 'Faster Training' },
            ].map((stat, i) => (
              <div key={i} className="p-4 glass rounded-lg">
                <p className="text-3xl font-bold text-purple-400">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Neuralink Page
function NeuralinkPage({  }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="mb-4 bg-green-600/20 text-green-400">Clinical Trials Active</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Building Brain</h1>
              <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">Interfaces</h1>
              <p className="text-xl text-white/70 mb-6">
                Our brain-computer interface translates neural signals into actions. 
                In our clinical trials, people are using Neuralink devices to control 
                computers and robotic arms with their thoughts.
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.open('https://neuralink.com/patient-registry', '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Join Patient Registry
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-3xl p-8"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-900/50 to-black flex items-center justify-center">
                <Brain className="w-32 h-32 text-green-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'N1 Implant', 
                desc: 'A fully implantable, invisible device that records neural activity.',
                icon: Cpu
              },
              { 
                name: 'R1 Robot', 
                desc: 'Surgical robot that precisely places the neural threads.',
                icon: Factory
              },
              { 
                name: 'N1 App', 
                desc: 'Software that translates neural signals into digital commands.',
                icon: Zap
              },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 glass rounded-xl"
              >
                <tech.icon className="w-12 h-12 mb-4 text-green-400" />
                <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                <p className="text-white/60">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-transparent to-green-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Restore Autonomy', desc: 'Help people with paralysis control devices' },
              { title: 'Treat Neurological Conditions', desc: 'Address Parkinson\'s, epilepsy, and more' },
              { title: 'Enhance Human Capabilities', desc: 'Memory enhancement and cognitive boost' },
              { title: 'Merge with AI', desc: 'Create a symbiotic relationship with artificial intelligence' },
            ].map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 glass rounded-xl text-left"
              >
                <CheckCircle className="w-6 h-6 text-green-400 mb-3" />
                <h3 className="font-semibold mb-1">{app.title}</h3>
                <p className="text-white/60 text-sm">{app.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Boring Company Page
function BoringPage({  }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">THE BORING</h1>
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-8">COMPANY</h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Ending traffic. Creating safe, fast-to-dig, and cost-effective transportation tunnels.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">The Loop System</h2>
              <p className="text-white/70 mb-6">
                Loop is an all-electric, zero-emissions, high-speed underground public 
                transportation system in which passengers are transported directly to 
                their final destination with no stops along the way.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Speed', value: 'Up to 150 mph' },
                  { label: 'Cost', value: '$1-5 per ride' },
                  { label: 'Wait Time', value: 'Less than 2 minutes' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between p-4 glass rounded-lg">
                    <span className="text-white/60">{item.label}</span>
                    <span className="font-semibold text-orange-400">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8"
            >
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-orange-900/50 to-black flex items-center justify-center">
                <Factory className="w-24 h-24 text-orange-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-transparent to-orange-900/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
          <div className="space-y-6">
            {[
              { name: 'Las Vegas Convention Center', status: 'Operational', desc: '1.7-mile loop with 3 stations' },
              { name: 'Vegas Loop', status: 'Expanding', desc: '65+ miles throughout Las Vegas' },
              { name: 'Prufrock', status: 'In Development', desc: 'Next-gen tunnel boring machine' },
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 glass rounded-xl flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-white/60">{project.desc}</p>
                </div>
                <Badge className={project.status === 'Operational' ? 'bg-green-600/20 text-green-400' : 'bg-orange-600/20 text-orange-400'}>
                  {project.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Hyperloop Page
function HyperloopPage({  }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">HYPERLOOP</h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              The future of transportation. Travel at 700+ mph in a low-pressure tube.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: '700+', unit: 'mph', desc: 'Top Speed' },
              { value: '30', unit: 'min', desc: 'LA to San Francisco' },
              { value: '0', unit: 'emissions', desc: 'Fully Electric' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 glass rounded-2xl text-center"
              >
                <p className="text-5xl font-bold text-cyan-400">{stat.value}</p>
                <p className="text-xl text-white/60">{stat.unit}</p>
                <p className="text-white/40 mt-2">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-transparent to-cyan-900/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            {[
              { step: '1', title: 'Low Pressure Tube', desc: 'Pods travel in a near-vacuum tube, eliminating air resistance' },
              { step: '2', title: 'Magnetic Levitation', desc: 'Pods float above the track using magnetic levitation' },
              { step: '3', title: 'Electric Propulsion', desc: 'Linear electric motors accelerate and decelerate the pods' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// News Page
function NewsPage({  }: { setCurrentPage: (page: string) => void }) {
  const news: NewsItem[] = [
    {
      id: 1,
      title: 'SpaceX Starship Successfully Completes Test Flight',
      excerpt: 'The latest Starship prototype achieved all mission objectives during its recent test flight.',
      date: '2025-03-01',
      category: 'SpaceX',
      image: '/images/elon/elon-spacex.jpg'
    },
    {
      id: 2,
      title: 'Tesla Announces New Model Y Updates',
      excerpt: 'The world\'s best-selling EV gets even better with enhanced range and features.',
      date: '2025-02-28',
      category: 'Tesla',
      image: '/images/tesla/model-y-front.jpg'
    },
    {
      id: 3,
      title: 'xAI Grok 3 Now Available to All Users',
      excerpt: 'The latest version of Grok brings unprecedented capabilities to AI assistants.',
      date: '2025-02-25',
      category: 'xAI',
      image: '/images/elon/elon-speaking.jpg'
    },
    {
      id: 4,
      title: 'Neuralink Second Patient Shows Remarkable Progress',
      excerpt: 'The second human trial participant demonstrates significant improvement in device control.',
      date: '2025-02-20',
      category: 'Neuralink',
      image: '/images/elon/elon-portrait-1.jpg'
    },
    {
      id: 5,
      title: 'The Boring Company Expands Vegas Loop',
      excerpt: 'New stations added to the underground transportation network in Las Vegas.',
      date: '2025-02-15',
      category: 'Boring Company',
      image: '/images/tesla/cybertruck-front.jpg'
    },
    {
      id: 6,
      title: 'Elon Musk Discusses Mars Timeline at SpaceX Event',
      excerpt: 'Updated projections for the first human mission to Mars revealed.',
      date: '2025-02-10',
      category: 'SpaceX',
      image: '/images/elon/elon-speaking.jpg'
    },
  ]

  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', 'SpaceX', 'Tesla', 'xAI', 'Neuralink', 'Boring Company']

  const filteredNews = selectedCategory === 'All' 
    ? news 
    : news.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6">Latest Updates</h1>
            <p className="text-white/60">Stay informed about Elon's world-changing missions</p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-red-600/20 text-red-400">{item.category}</Badge>
                    <span className="text-white/40 text-sm">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm">{item.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Shop Page
function ShopPage({  }: { setCurrentPage: (page: string) => void }) {
  const products = [
    { name: 'Model S', category: 'Vehicle', price: 'From $89,990', image: '/images/tesla/model-s-front.jpg' },
    { name: 'Model 3', category: 'Vehicle', price: 'From $38,990', image: '/images/tesla/model-3-front.jpg' },
    { name: 'Model X', category: 'Vehicle', price: 'From $99,990', image: '/images/tesla/model-x-front.jpg' },
    { name: 'Model Y', category: 'Vehicle', price: 'From $44,990', image: '/images/tesla/model-y-front.jpg' },
    { name: 'Cybertruck', category: 'Vehicle', price: 'From $60,990', image: '/images/tesla/cybertruck-front.jpg' },
    { name: 'Roadster', category: 'Vehicle', price: 'From $200,000', image: '/images/tesla/roadster-front.jpg' },
  ]

  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6">Tesla Shop</h1>
            <p className="text-white/60">Order your Tesla directly through WhatsApp</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <Badge className="mb-2 bg-white/10">{product.category}</Badge>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-red-400 font-semibold mb-4">{product.price}</p>
                  <a
                    href={`https://wa.me/19494638830?text=Hi%20Elon,%20I'm%20interested%20in%20ordering%20the%20${encodeURIComponent(product.name)}.%20Please%20provide%20more%20information.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Order via WhatsApp
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Donation Page
function DonationPage({  }: { setCurrentPage: (page: string) => void }) {
  const [donationType, setDonationType] = useState<'giftcard' | 'crypto'>('giftcard')
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [selectedGiftCard, setSelectedGiftCard] = useState('')
  const [selectedCrypto, setSelectedCrypto] = useState('')

  const giftCards = [
    { name: 'Apple Gift Card', icon: '🍎' },
    { name: 'Razer Gold', icon: '🎮' },
    { name: 'Visa Gift Card', icon: '💳' },
    { name: 'Walmart Visa Gift Card', icon: '🛒' },
    { name: 'Nordstrom Gift Card', icon: '👔' },
    { name: 'Amex Gift Card', icon: '💳' },
    { name: 'Amazon Gift Card', icon: '📦' },
  ]

  const cryptos = [
    { name: 'Bitcoin', symbol: 'BTC', icon: '₿' },
    { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ' },
    { name: 'Solana', symbol: 'SOL', icon: '◎' },
    { name: 'Dogecoin', symbol: 'DOGE', icon: 'Ð' },
    { name: 'XRP', symbol: 'XRP', icon: '✕' },
    { name: 'USDT', symbol: 'USDT', icon: '₮' },
  ]

  const handleDonate = () => {
    let message = ''
    if (donationType === 'giftcard') {
      message = `Hi Elon, I'd like to donate $${amount} via ${selectedGiftCard}. Reason: ${reason}`
    } else {
      message = `Hi Elon, I'd like to donate $${amount} worth of ${selectedCrypto}. Reason: ${reason}. Please provide your wallet address.`
    }
    window.open(`https://wa.me/19494638830?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6">Support the Mission</h1>
            <p className="text-white/60">Your contribution accelerates humanity's future</p>
          </motion.div>

          {/* Warning */}
          <div className="warning-box mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-400 mb-2">Official Channels Only</p>
                <p className="text-white/70 text-sm">
                  WhatsApp: <span className="text-green-400">+1 (949) 463-8830</span> | 
                  Email: <span className="text-blue-400">CEOelonmusk@outlook.com</span>
                </p>
                <p className="text-white/50 text-sm mt-2">
                  Any other contact is fraudulent. This platform is monitored by authorities.
                </p>
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="glass rounded-2xl p-8">
            <Tabs value={donationType} onValueChange={(v) => setDonationType(v as 'giftcard' | 'crypto')}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="giftcard" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Gift Card
                </TabsTrigger>
                <TabsTrigger value="crypto" className="flex items-center gap-2">
                  <Bitcoin className="w-4 h-4" />
                  Cryptocurrency
                </TabsTrigger>
              </TabsList>

              <TabsContent value="giftcard" className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Select Gift Card Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {giftCards.map((card) => (
                      <button
                        key={card.name}
                        onClick={() => setSelectedGiftCard(card.name)}
                        className={`p-4 rounded-lg border transition-all ${
                          selectedGiftCard === card.name
                            ? 'border-red-500 bg-red-500/20'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <span className="text-2xl mb-2 block">{card.icon}</span>
                        <span className="text-xs">{card.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="crypto" className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Select Cryptocurrency</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {cryptos.map((crypto) => (
                      <button
                        key={crypto.symbol}
                        onClick={() => setSelectedCrypto(crypto.name)}
                        className={`p-4 rounded-lg border transition-all ${
                          selectedCrypto === crypto.name
                            ? 'border-orange-500 bg-orange-500/20'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <span className="text-2xl mb-2 block">{crypto.icon}</span>
                        <span className="text-sm font-semibold">{crypto.symbol}</span>
                        <span className="text-xs text-white/60 block">{crypto.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2">Amount ($)</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Reason for Donation</label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Why are you supporting this mission?"
                  className="bg-white/5 border-white/10"
                />
              </div>

              <Button
                onClick={handleDonate}
                disabled={!amount || (donationType === 'giftcard' ? !selectedGiftCard : !selectedCrypto)}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 py-6"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Continue on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Giveaway Page
function GiveawayPage({  }: { setCurrentPage: (page: string) => void }) {
  const [walletConnected, setWalletConnected] = useState(false)

  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-purple-600/20 text-purple-400">Limited Time</Badge>
            <h1 className="text-5xl font-bold mb-6">Win a Tesla</h1>
            <p className="text-white/60">Connect your wallet and complete verification to enter</p>
          </motion.div>

          {/* Prizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { name: 'Cybertruck', value: '$100,000', qty: '50 Units', image: '/images/tesla/cybertruck-front.jpg' },
              { name: 'Model S Plaid', value: '$90,000', qty: '100 Units', image: '/images/tesla/model-s-front.jpg' },
              { name: 'Model X Plaid', value: '$100,000', qty: '50 Units', image: '/images/tesla/model-x-front.jpg' },
            ].map((prize, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="aspect-video">
                  <img src={prize.image} alt={prize.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{prize.name}</h3>
                  <p className="text-red-400 font-semibold">{prize.value}</p>
                  <p className="text-white/60 text-sm">{prize.qty}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Wallet Connection */}
          <div className="glass rounded-2xl p-8 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Enter Giveaway</h2>
            
            {!walletConnected ? (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-10 h-10 text-purple-400" />
                </div>
                <p className="text-white/60 mb-6">
                  Connect your wallet to verify you're human and enter the giveaway
                </p>
                <Button 
                  onClick={() => setWalletConnected(true)}
                  className="bg-purple-600 hover:bg-purple-700 w-full py-6"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <p className="text-green-400 font-semibold mb-2">Wallet Connected!</p>
                <p className="text-white/60 mb-6">
                  Complete your entry on WhatsApp to finalize your participation
                </p>
                <a
                  href="https://wa.me/19494638830?text=Hi%20Elon,%20I've%20connected%20my%20wallet%20and%20want%20to%20enter%20the%20Tesla%20giveaway!"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green-600 hover:bg-green-700 w-full py-6">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Complete Entry on WhatsApp
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

// Reviews Page
function ReviewsPage({  }: { setCurrentPage: (page: string) => void }) {
  const reviews: Review[] = [
    { id: 1, name: 'Michael Thompson', age: 45, location: 'Austin, TX', image: '/images/fans/male-1.jpg', rating: 5, text: "Elon's vision for the future is exactly what humanity needs. This platform gives us a direct way to support his missions.", date: '2025-02-28' },
    { id: 2, name: 'Sarah Mitchell', age: 52, location: 'Palo Alto, CA', image: '/images/fans/female-2.jpg', rating: 5, text: "I've been following Elon since the early PayPal days. His commitment to sustainable energy and space exploration is inspiring.", date: '2025-02-25' },
    { id: 3, name: 'David Chen', age: 38, location: 'Seattle, WA', image: '/images/fans/male-3.jpg', rating: 5, text: "The AI assistant on this platform is incredibly helpful. It really feels like Elon built this himself.", date: '2025-02-20' },
    { id: 4, name: 'Jennifer Adams', age: 47, location: 'Miami, FL', image: '/images/fans/female-1.jpg', rating: 5, text: "Being able to connect directly with Elon through WhatsApp is amazing. This platform is a game-changer.", date: '2025-02-18' },
    { id: 5, name: 'Robert Wilson', age: 55, location: 'Denver, CO', image: '/images/fans/male-2.jpg', rating: 5, text: "I've invested in Tesla since 2012. Seeing this platform grow shows Elon's dedication to his supporters.", date: '2025-02-15' },
    { id: 6, name: 'Emily Rodriguez', age: 41, location: 'New York, NY', image: '/images/fans/female-3.jpg', rating: 5, text: "The Tesla shop integration is seamless. Ordering through WhatsApp feels personal and direct.", date: '2025-02-12' },
    { id: 7, name: 'James Anderson', age: 33, location: 'Chicago, IL', image: '/images/fans/male-6.jpg', rating: 5, text: "SpaceX's progress is incredible. I'm proud to support the mission to make life multiplanetary.", date: '2025-02-10' },
    { id: 8, name: 'Lisa Parker', age: 49, location: 'Los Angeles, CA', image: '/images/fans/female-4.jpg', rating: 5, text: "Neuralink's potential to help people with disabilities is truly remarkable. Thank you, Elon!", date: '2025-02-08' },
    { id: 9, name: 'William Turner', age: 58, location: 'Houston, TX', image: '/images/fans/male-4.jpg', rating: 5, text: "The Mars mission is the most important project in human history. Let's make it happen!", date: '2025-02-05' },
    { id: 10, name: 'Amanda Foster', age: 36, location: 'Boston, MA', image: '/images/fans/female-5.jpg', rating: 5, text: "Grok AI is incredible. xAI is going to change everything we know about artificial intelligence.", date: '2025-02-03' },
    { id: 11, name: 'Christopher Lee', age: 44, location: 'San Diego, CA', image: '/images/fans/male-5.jpg', rating: 5, text: "The Boring Company's tunnels are the solution to traffic. Elon thinks of everything!", date: '2025-02-01' },
    { id: 12, name: 'Michelle Clark', age: 51, location: 'Phoenix, AZ', image: '/images/fans/female-6.jpg', rating: 5, text: "Tesla Energy products have transformed my home. Solar + Powerwall is the perfect combination.", date: '2025-01-28' },
    { id: 13, name: 'Daniel Martinez', age: 31, location: 'Portland, OR', image: '/images/fans/male-7.jpg', rating: 5, text: "Cybertruck is the most innovative vehicle ever created. Can't wait to get mine!", date: '2025-01-25' },
    { id: 14, name: 'Stephanie White', age: 43, location: 'Atlanta, GA', image: '/images/fans/female-7.jpg', rating: 5, text: "This platform shows Elon truly cares about his supporters. The direct connection is priceless.", date: '2025-01-22' },
    { id: 15, name: 'Kevin Brown', age: 59, location: 'Dallas, TX', image: '/images/fans/male-8.jpg', rating: 5, text: "I've been waiting for a platform like this. Supporting Elon's missions has never been easier.", date: '2025-01-20' },
    { id: 16, name: 'Rachel Green', age: 39, location: 'San Francisco, CA', image: '/images/fans/female-8.jpg', rating: 5, text: "The future Elon is building is the one I want to live in. Proud to be part of this community!", date: '2025-01-18' },
    { id: 17, name: 'Thomas Hall', age: 46, location: 'Las Vegas, NV', image: '/images/fans/male-9.jpg', rating: 5, text: "The Vegas Loop is just the beginning. The Boring Company will transform transportation.", date: '2025-01-15' },
    { id: 18, name: 'Nicole Young', age: 54, location: 'Philadelphia, PA', image: '/images/fans/female-9.jpg', rating: 5, text: "Neuralink gives hope to so many people. Elon's compassion shows in everything he does.", date: '2025-01-12' },
    { id: 19, name: 'Jason King', age: 37, location: 'Austin, TX', image: '/images/fans/male-1.jpg', rating: 5, text: "Starlink has connected the unconnected. Elon's impact on the world is immeasurable.", date: '2025-01-10' },
    { id: 20, name: 'Laura Scott', age: 48, location: 'San Jose, CA', image: '/images/fans/female-10.jpg', rating: 5, text: "From electric cars to Mars rockets, Elon proves that anything is possible. Keep pushing boundaries!", date: '2025-01-08' },
  ]

  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6">Community Voices</h1>
            <p className="text-white/60">What supporters are saying about Elon's mission</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: '50,000+', label: 'Total Reviews' },
              { value: '4.9', label: 'Average Rating' },
              { value: '98%', label: 'Recommend' },
              { value: '180+', label: 'Countries' },
            ].map((stat, i) => (
              <div key={i} className="p-6 glass rounded-xl text-center">
                <p className="text-3xl font-bold text-red-400">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-white/50 text-sm">{review.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm mb-3">{review.text}</p>
                <p className="text-white/40 text-xs">{review.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Contact Page
function ContactPage({  }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6">Connect with Elon</h1>
            <p className="text-white/60">Your direct line to the future</p>
          </motion.div>

          {/* Warning */}
          <div className="warning-box mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-400 mb-2">CRITICAL WARNING</p>
                <p className="text-white/70 text-sm">
                  The WhatsApp number is for <span className="text-red-400 font-semibold">MESSAGES ONLY</span>. 
                  No calls or direct SMS. Violators will be permanently banned and tracked by FBI authorities.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <a
              href="https://wa.me/19494638830"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-2xl bg-green-600/20 border border-green-600/30 hover:bg-green-600/30 transition-colors text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-green-400 text-lg mb-2">+1 (949) 463-8830</p>
              <p className="text-white/60 text-sm">Elon's Private Line</p>
              <p className="text-white/40 text-xs mt-2">Messages only - No calls</p>
            </a>

            <div className="space-y-4">
              <a
                href="mailto:CEOelonmusk@outlook.com"
                className="block p-6 rounded-xl bg-blue-600/20 border border-blue-600/30 hover:bg-blue-600/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Personal Email</h3>
                    <p className="text-blue-400">CEOelonmusk@outlook.com</p>
                  </div>
                </div>
              </a>

              <a
                href="mailto:musktesteam@hotmail.com"
                className="block p-6 rounded-xl bg-purple-600/20 border border-purple-600/30 hover:bg-purple-600/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Team Email</h3>
                    <p className="text-purple-400">musktesteam@hotmail.com</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Platform Notice */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-white/60">
                <p className="font-semibold text-white mb-1">Platform Security</p>
                <p>This platform is actively monitored. Any harassment, spam, or violation of terms will result in immediate ban and potential legal action. Your IP and device information may be shared with authorities if violations occur.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')

  // Page components mapping
  const pages: Record<string, React.ComponentType<{ setCurrentPage: (page: string) => void }>> = {
    home: HomePage,
    about: AboutPage,
    spacex: SpaceXPage,
    tesla: TeslaPage,
    energy: EnergyPage,
    xai: XAIPage,
    neuralink: NeuralinkPage,
    boring: BoringPage,
    hyperloop: HyperloopPage,
    news: NewsPage,
    shop: ShopPage,
    donate: DonationPage,
    giveaway: GiveawayPage,
    reviews: ReviewsPage,
    contact: ContactPage,
  }

  const CurrentPageComponent = pages[currentPage] || HomePage

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* 3D Background */}
      <StarfieldBackground />
      
      {/* Page Loader */}
      {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      
      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Navigation */}
          <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
          
          {/* Page Content */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <CurrentPageComponent setCurrentPage={setCurrentPage} />
          </motion.main>
          
          {/* Floating AI Chat */}
          <AIChatAssistant />
          
          {/* Footer */}
          <footer className="relative z-10 py-12 px-4 border-t border-white/10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">Elon Musk Platform</h4>
                  <p className="text-white/60 text-sm">
                    Built personally by Elon Musk to connect with supporters and accelerate humanity's future.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Companies</h4>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li><button onClick={() => setCurrentPage('spacex')} className="hover:text-white">SpaceX</button></li>
                    <li><button onClick={() => setCurrentPage('tesla')} className="hover:text-white">Tesla</button></li>
                    <li><button onClick={() => setCurrentPage('xai')} className="hover:text-white">xAI</button></li>
                    <li><button onClick={() => setCurrentPage('neuralink')} className="hover:text-white">Neuralink</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Connect</h4>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li><a href="https://wa.me/19494638830" target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a></li>
                    <li><a href="mailto:CEOelonmusk@outlook.com" className="hover:text-white">Email</a></li>
                    <li><a href="https://x.com/elonmusk" target="_blank" rel="noopener noreferrer" className="hover:text-white">X (Twitter)</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Privacy Policy</button></li>
                    <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Terms of Service</button></li>
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-white/10 text-center">
                <p className="text-white/40 text-sm">
                  © 2025 Elon Musk Platform. Built by Elon personally.
                </p>
                <p className="text-red-500/60 text-xs mt-2">
                  This platform is monitored by authorities. Violations will be prosecuted.
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}

export default App
