import type { Project, BlogPost, Profile, PhilosophyCard, FooterLink, Stat, TechSkill, Milestone } from '../models/types';

export const mockProfile: Profile = {
  name: "DevStack Portfolio",
  title: "Cross-Platform Mobile Engineer",
  bio: "I am a cross-platform mobile specialist dedicated to building high-performance, pixel-perfect applications. My journey is defined by an obsession with clean architecture and a love for intuitive design.",
  skills: ["React Native", "Flutter", "TypeScript", "Swift", "Kotlin", "Kotlin Multiplatform"],
  avatarUrl: "/assets/images/screen.png",
  email: "hello@devstack.io",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com"
};

export const mockStats: Stat[] = [
  { value: "12+", label: "Apps Launched" },
  { value: "3k+", label: "Git Commits" },
  { value: "99%", label: "Crash-Free Rate" },
  { value: "100%", label: "Client Satisfaction" }
];

export const mockTechSkills: TechSkill[] = [
  {
    name: "Flutter",
    description: "Building expressive, high-performance native apps for iOS, Android, and Web from a single codebase.",
    level: "primary"
  },
  {
    name: "React Native",
    description: "Leveraging the power of React to build truly native mobile experiences with seamless bridge performance.",
    level: "expert"
  }
];

export const mockTools: string[] = [
  "JS / TS",
  "Dart",
  "Figma",
  "Adobe XD",
  "Firebase",
  "Supabase",
  "Node.js",
  "GraphQL"
];

export const mockMilestones: Milestone[] = [
  {
    id: "1",
    period: "2023 - PRESENT",
    role: "Senior Mobile Engineer",
    company: "@ TechFlow",
    description: "Leading the transition of the core flagship product to a Flutter-based architecture, reducing development time by 40%.",
    badge: "Architected scalable design systems"
  },
  {
    id: "2",
    period: "2022 - 2023",
    role: "Full Stack Developer",
    company: "@ CreativeLabs",
    description: "Developed end-to-end mobile solutions using React Native and Node.js. Optimized app startup times by 25%.",
    badge: "Built 5+ cross-platform MVP apps"
  },
  {
    id: "3",
    period: "2021 - 2022",
    role: "Junior Developer",
    company: "@ StartUp Sphere",
    description: "Began professional journey focusing on UI/UX implementation and frontend responsiveness.",
    badge: "Mastered Dart & React primitives"
  }
];

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "NovaVault Pro",
    description: "A frictionless mobile banking experience featuring seamless tap-to-connect transfers with an intuitive interface.",
    technologies: ["Swift", "UIKit", "CoreData"],
    imageUrl: "/assets/images/app-ui.png",
    link: "#",
    tag: "Swift",
    category: "ios",
    socialLinks: [
      { icon: "github", url: "#" },
      { icon: "linkedin", url: "#" }
    ],
    subtitle: "Next-Generation Mobile Banking",
    client: "NovaVault Financial",
    duration: "6 months",
    role: "Lead iOS Developer",
    year: "2024",
    challenge: "Traditional banking apps often suffer from clunky interfaces and slow transaction processing. NovaVault needed a solution that could deliver instant transfers while maintaining bank-grade security and a premium user experience.",
    solution: "I designed and implemented a native iOS application using Swift and CoreData for offline-first architecture. The app features biometric authentication, real-time transaction syncing, and a custom UI framework that delivers 60fps animations throughout the experience.",
    results: [
      "40% faster transaction processing compared to competitors",
      "4.8 star rating on the App Store with 10K+ reviews",
      "99.9% crash-free user rate across all devices",
      "Featured in App Store's 'Apps We Love' section"
    ],
    features: [
      { title: "Tap-to-Transfer", description: "NFC-based instant money transfers between devices with haptic feedback" },
      { title: "Biometric Security", description: "Face ID and Touch ID integration with secure enclave key storage" },
      { title: "Offline Mode", description: "Full functionality even without internet using CoreData sync" },
      { title: "Smart Insights", description: "AI-powered spending analysis and budget recommendations" }
    ],
    gallery: [
      "/assets/images/app-ui.png",
      "/assets/images/projects.png",
      "/assets/images/app-ui.png"
    ],
    techStack: [
      { name: "Swift", category: "Language" },
      { name: "UIKit", category: "UI Framework" },
      { name: "CoreData", category: "Database" },
      { name: "Keychain", category: "Security" },
      { name: "Combine", category: "Reactive" },
      { name: "XCTest", category: "Testing" }
    ]
  },
  {
    id: "2",
    title: "PulseAPI",
    description: "An AI-driven personal wellness app that correlates biometric data to deliver real-time and personalized workout insights.",
    technologies: ["Kotlin", "Jetpack Compose", "Health Connect"],
    imageUrl: "/assets/images/projects.png",
    link: "#",
    tag: "Kotlin",
    category: "android",
    socialLinks: [
      { icon: "twitter", url: "#" },
      { icon: "linkedin", url: "#" }
    ],
    subtitle: "AI-Powered Wellness Platform",
    client: "PulseAPI Health",
    duration: "8 months",
    role: "Android Lead Developer",
    year: "2024",
    challenge: "Health data is often siloed across different devices and apps. PulseAPI needed to aggregate data from multiple sources and provide actionable insights in real-time during workouts.",
    solution: "Built a Kotlin-first Android application using Jetpack Compose for the UI layer and Health Connect API for data aggregation. Implemented ML models using TensorFlow Lite for on-device inference, enabling real-time workout recommendations without cloud dependency.",
    results: [
      "500K+ active users within first 3 months",
      "30% improvement in user workout consistency",
      "Featured on Google Play's 'Best New Apps'",
      "98% user satisfaction rating"
    ],
    features: [
      { title: "Real-time Biometrics", description: "Live heart rate, SpO2, and calorie tracking during workouts" },
      { title: "AI Coach", description: "Personalized workout recommendations based on your data" },
      { title: "Social Challenges", description: "Compete with friends in real-time fitness challenges" },
      { title: "Health Reports", description: "Weekly wellness reports with actionable insights" }
    ],
    gallery: [
      "/assets/images/projects.png",
      "/assets/images/app-ui.png",
      "/assets/images/projects.png"
    ],
    techStack: [
      { name: "Kotlin", category: "Language" },
      { name: "Jetpack Compose", category: "UI Framework" },
      { name: "Health Connect", category: "Data" },
      { name: "TensorFlow Lite", category: "ML" },
      { name: "Room", category: "Database" },
      { name: "Coroutines", category: "Async" }
    ]
  },
  {
    id: "3",
    title: "LensCameraAI",
    description: "High-fidelity camera application with real-time object recognition, AR overlays, and custom capture pipelines optimized for performance.",
    technologies: ["Swift", "ARKit", "Vision"],
    imageUrl: "/assets/images/app-ui.png",
    link: "#",
    tag: "Swift",
    category: "ios",
    socialLinks: [
      { icon: "github", url: "#" },
      { icon: "linkedin", url: "#" }
    ],
    subtitle: "Intelligent Camera Experience",
    client: "LensTech Studios",
    duration: "5 months",
    role: "Senior iOS Developer",
    year: "2023",
    challenge: "Professional photographers need intelligent camera tools that can identify subjects, suggest compositions, and apply real-time enhancements without lag or battery drain.",
    solution: "Developed a high-performance camera app leveraging ARKit for spatial awareness and Vision framework for real-time object detection. Custom Core Image pipelines ensure zero-latency photo processing even at 4K resolution.",
    results: [
      "1M+ downloads in first week",
      "Featured in Apple's WWDC showcase",
      "4.9 star rating with 25K+ reviews",
      "Won 'Best Camera App' at iOS Dev Awards"
    ],
    features: [
      { title: "Object Recognition", description: "Real-time identification of 1000+ objects with bounding boxes" },
      { title: "AR Overlays", description: "Interactive AR elements that respond to scene understanding" },
      { title: "Smart Composition", description: "AI-powered composition suggestions using rule of thirds" },
      { title: "RAW Processing", description: "Professional-grade RAW image processing and editing" }
    ],
    gallery: [
      "/assets/images/app-ui.png",
      "/assets/images/projects.png",
      "/assets/images/app-ui.png"
    ],
    techStack: [
      { name: "Swift", category: "Language" },
      { name: "ARKit", category: "AR Framework" },
      { name: "Vision", category: "ML Framework" },
      { name: "Core Image", category: "Image Processing" },
      { name: "AVFoundation", category: "Camera" },
      { name: "Metal", category: "GPU" }
    ]
  },
  {
    id: "4",
    title: "ZenFlow Tasks",
    description: "A distraction-free productivity app featuring complex native gestures and deep OS integration for natural task management.",
    technologies: ["Kotlin", "Room", "Material Design"],
    imageUrl: "/assets/images/projects.png",
    link: "#",
    tag: "Kotlin",
    category: "android",
    socialLinks: [
      { icon: "github", url: "#" },
      { icon: "linkedin", url: "#" }
    ],
    subtitle: "Mindful Productivity",
    client: "ZenFlow Labs",
    duration: "4 months",
    role: "Android Developer",
    year: "2023",
    challenge: "Task management apps often become cluttered and overwhelming. ZenFlow needed a minimalist approach that feels natural and doesn't add cognitive load.",
    solution: "Created a gesture-first Android application with custom touch handling and fluid animations. The app integrates deeply with Android's notification system and provides unique swipe-based interactions that feel intuitive.",
    results: [
      "200K+ active users with 85% daily retention",
      "4.7 star rating on Google Play",
      "Featured in Android's 'Editor's Choice'",
      "Zero crashes reported in first 6 months"
    ],
    features: [
      { title: "Gesture Navigation", description: "Intuitive swipe and long-press gestures for all actions" },
      { title: "Focus Mode", description: "Distraction-free mode with smart notification filtering" },
      { title: "Widgets", description: "Beautiful home screen widgets with live updates" },
      { title: "Calendar Sync", description: "Bi-directional sync with Google Calendar" }
    ],
    gallery: [
      "/assets/images/projects.png",
      "/assets/images/app-ui.png",
      "/assets/images/projects.png"
    ],
    techStack: [
      { name: "Kotlin", category: "Language" },
      { name: "Material Design 3", category: "UI" },
      { name: "Room", category: "Database" },
      { name: "Jetpack Navigation", category: "Navigation" },
      { name: "WorkManager", category: "Background" },
      { name: "Hilt", category: "DI" }
    ]
  },
  {
    id: "5",
    title: "Culinary Connect",
    description: "Real-time social platform for chefs featuring 4K video streaming with low-latency architecture.",
    technologies: ["React Native", "TypeScript", "WebRTC"],
    imageUrl: "/assets/images/app-ui.png",
    link: "#",
    tag: "React Native",
    category: "cross-platform",
    socialLinks: [
      { icon: "twitter", url: "#" },
      { icon: "linkedin", url: "#" }
    ],
    subtitle: "Chef Community Platform",
    client: "Culinary Connect Inc.",
    duration: "7 months",
    role: "Full Stack Mobile Developer",
    year: "2024",
    challenge: "Professional chefs need to collaborate, share techniques, and host live cooking sessions with ultra-low latency for real-time audience interaction.",
    solution: "Built a cross-platform React Native application with WebRTC for sub-second video streaming. Implemented custom video processing pipelines and real-time chat with WebSocket connections.",
    results: [
      "50K+ professional chefs on the platform",
      "99.9% uptime during live streaming events",
      "3x engagement compared to competitor apps",
      "Featured in TechCrunch's 'Best New Apps'"
    ],
    features: [
      { title: "Live Streaming", description: "4K video streaming with <100ms latency" },
      { title: "Recipe Sharing", description: "Interactive recipes with step-by-step video guides" },
      { title: "Chef Network", description: "Professional networking for culinary professionals" },
      { title: "Marketplace", description: "Buy and sell kitchen equipment and ingredients" }
    ],
    gallery: [
      "/assets/images/app-ui.png",
      "/assets/images/projects.png",
      "/assets/images/app-ui.png"
    ],
    techStack: [
      { name: "React Native", category: "Framework" },
      { name: "TypeScript", category: "Language" },
      { name: "WebRTC", category: "Video" },
      { name: "Socket.io", category: "Real-time" },
      { name: "Redux Toolkit", category: "State" },
      { name: "React Navigation", category: "Navigation" }
    ]
  },
  {
    id: "6",
    title: "Voyager AR",
    description: "Location-based travel companion featuring 3D environment mapping, interactive AR navigation, and offline map rendering.",
    technologies: ["Flutter", "Dart", "ARCore"],
    imageUrl: "/assets/images/projects.png",
    link: "#",
    tag: "Flutter",
    category: "cross-platform",
    socialLinks: [
      { icon: "github", url: "#" },
      { icon: "linkedin", url: "#" }
    ],
    subtitle: "AR Travel Companion",
    client: "Voyager Technologies",
    duration: "9 months",
    role: "Lead Flutter Developer",
    year: "2024",
    challenge: "Travelers often struggle with navigation in unfamiliar cities, especially when dealing with language barriers and offline scenarios.",
    solution: "Developed a Flutter application with ARCore integration for immersive AR navigation. The app provides offline map rendering and real-time translation of street signs and menus using on-device ML.",
    results: [
      "1M+ downloads across iOS and Android",
      "Available in 15 languages",
      "4.8 star average rating",
      "Partnership with 3 major travel agencies"
    ],
    features: [
      { title: "AR Navigation", description: "Street-level AR directions with landmark recognition" },
      { title: "Offline Maps", description: "Full map functionality without internet connection" },
      { title: "Live Translation", description: "Real-time translation of signs, menus, and text" },
      { title: "Travel Guides", description: "AI-powered personalized travel recommendations" }
    ],
    gallery: [
      "/assets/images/projects.png",
      "/assets/images/app-ui.png",
      "/assets/images/projects.png"
    ],
    techStack: [
      { name: "Flutter", category: "Framework" },
      { name: "Dart", category: "Language" },
      { name: "ARCore", category: "AR" },
      { name: "Google Maps", category: "Maps" },
      { name: "TensorFlow Lite", category: "ML" },
      { name: "Hive", category: "Offline Storage" }
    ]
  }
];

export const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Optimizing Flutter Rendering for High-Frequency Data",
    excerpt: "An in-depth analysis of RepaintBoundary and provider-based state management to keep 60fps battery smooth UI to performance.",
    date: "Oct 24, 2024",
    readTime: "8 Min Read",
    imageUrl: "/assets/images/blog.png",
    category: "flutter",
    author: "DevStack Lead",
    authorRole: "Cross-Platform Architect",
    tags: ["Flutter", "Performance", "State Management", "UI"],
    content: [
      {
        type: "paragraph",
        content: "When building high-performance Flutter applications that handle real-time data streams, maintaining a smooth 60fps UI is crucial for user experience. In this deep dive, we'll explore advanced techniques for optimizing Flutter's rendering pipeline when dealing with high-frequency data updates."
      },
      {
        type: "heading",
        content: "Understanding Flutter's Rendering Pipeline"
      },
      {
        type: "paragraph",
        content: "Flutter uses a single-threaded rendering model where the framework builds widgets, creates render objects, and composites layers all on the main thread. When dealing with high-frequency data, this can become a bottleneck if not managed properly."
      },
      {
        type: "code",
        content: "// Example of efficient RepaintBoundary usage\nclass OptimizedChart extends StatelessWidget {\n  final List<DataPoint> dataPoints;\n  \n  const OptimizedChart({required this.dataPoints});\n  \n  @override\n  Widget build(BuildContext context) {\n    return RepaintBoundary(\n      child: CustomPaint(\n        painter: ChartPainter(dataPoints),\n        size: Size.infinite,\n      ),\n    );\n  }\n}",
        language: "dart"
      },
      {
        type: "heading",
        content: "Strategic Use of RepaintBoundary"
      },
      {
        type: "paragraph",
        content: "RepaintBoundary creates a new compositing layer that can be repainted independently from other parts of the widget tree. This is particularly useful for charts, animations, and other frequently updating UI elements."
      },
      {
        type: "list",
        content: "Benefits of RepaintBoundary:",
        items: [
          "Isolates repaints to specific regions of the screen",
          "Prevents unnecessary rebuilds of parent widgets",
          "Reduces overall GPU workload",
          "Enables efficient partial screen updates"
        ]
      },
      {
        type: "quote",
        content: "The key to 60fps performance is not about making everything fast—it's about ensuring nothing blocks the frame rendering pipeline."
      },
      {
        type: "heading",
        content: "Provider-Based State Management"
      },
      {
        type: "paragraph",
        content: "When combined with efficient state management using Provider, we can further optimize our rendering by ensuring only affected widgets rebuild when data changes. This granular approach to state management is essential for high-frequency data scenarios."
      },
      {
        type: "code",
        content: "// Efficient state management with selective rebuilds\nclass DataProvider extends ChangeNotifier {\n  List<DataPoint> _dataPoints = [];\n  \n  List<DataPoint> get dataPoints => _dataPoints;\n  \n  void updateData(List<DataPoint> newData) {\n    _dataPoints = newData;\n    notifyListeners(); // Only rebuilds listeners\n  }\n}\n\n// In your widget tree:\n// Consumer<DataProvider>(\n//   builder: (context, provider, child) {\n//     return OptimizedChart(dataPoints: provider.dataPoints);\n//   },\n// )",
        language: "dart"
      },
      {
        type: "paragraph",
        content: "By combining RepaintBoundary with strategic Provider usage, we can achieve smooth 60fps rendering even with high-frequency data updates. The key is to minimize the scope of rebuilds and leverage Flutter's compositor for efficient partial updates."
      }
    ]
  },
  {
    id: "2",
    title: "Micro-Frontends in React Native: Myth or Reality?",
    excerpt: "Exploring CodePush-based dynamic bundle loading strategies for large-scale enterprise mobile applications.",
    date: "Oct 15, 2024",
    readTime: "12 Min Read",
    imageUrl: "/assets/images/blog.png",
    category: "react-native",
    author: "DevStack Lead",
    authorRole: "Cross-Platform Architect",
    tags: ["React Native", "Architecture", "Micro-Frontends", "Enterprise"],
    content: [
      {
        type: "paragraph",
        content: "Micro-frontends have revolutionized web development, enabling large teams to work independently on different parts of an application. But can this architectural pattern work in the mobile world? Let's explore how React Native makes micro-frontends a reality."
      },
      {
        type: "heading",
        content: "What Are Micro-Frontends?"
      },
      {
        type: "paragraph",
        content: "Micro-frontends extend the concept of microservices to the frontend world. Instead of building a monolithic application, you break it into smaller, independently deployable pieces that can be developed, tested, and deployed by separate teams."
      },
      {
        type: "heading",
        content: "React Native and Dynamic Bundles"
      },
      {
        type: "paragraph",
        content: "React Native's architecture makes it uniquely suited for micro-frontends through dynamic bundle loading. With tools like CodePush, you can push updates to specific features without requiring a full app store release."
      },
      {
        type: "code",
        content: "// Dynamic module loading in React Native\nimport { ScriptManager, Script } from '@callstack/repack';\n\n// Register a remote module\nScriptManager.shared.addScript(\n  Script.fromRemote({\n    id: 'feature-module',\n    url: 'https://cdn.example.com/feature.bundle',\n    query: { platform: 'ios' },\n  })\n);\n\n// Load the module on demand\nconst FeatureModule = React.lazy(() =>\n  import('feature-module/FeatureScreen')\n);",
        language: "typescript"
      },
      {
        type: "list",
        content: "Benefits of Mobile Micro-Frontends:",
        items: [
          "Independent team ownership and deployment",
          "Smaller bundle sizes through code splitting",
          "Feature-level updates without full app releases",
          "Technology stack flexibility per feature",
          "Improved development velocity"
        ]
      },
      {
        type: "quote",
        content: "The future of enterprise mobile development lies in treating features as independently deployable products, not monolithic applications."
      },
      {
        type: "paragraph",
        content: "While implementing micro-frontends in React Native requires careful planning around shared dependencies and navigation, the benefits for large-scale applications are substantial. Teams can work independently, deploy frequently, and maintain clear boundaries between features."
      }
    ]
  },
  {
    id: "3",
    title: "Mastering Custom Painters for Complex Animations",
    excerpt: "Beyond the basic widgets. Learn how to leverage the Canvas API for truly unique, performant UI interactions.",
    date: "Oct 08, 2024",
    readTime: "5 Min Read",
    imageUrl: "/assets/images/blog.png",
    category: "flutter",
    author: "DevStack Lead",
    authorRole: "Cross-Platform Architect",
    tags: ["Flutter", "Custom Painter", "Animations", "Canvas"],
    content: [
      {
        type: "paragraph",
        content: "Flutter's CustomPainter class opens up a world of possibilities for creating unique, performant animations and visual effects. While widgets are great for standard UI, sometimes you need something truly custom—and CustomPainter delivers."
      },
      {
        type: "heading",
        content: "When to Use CustomPainter"
      },
      {
        type: "paragraph",
        content: "CustomPainter is ideal when you need: complex visual effects that standard widgets can't achieve, high-performance animations with direct canvas control, or custom data visualizations that require precise rendering."
      },
      {
        type: "code",
        content: "class WavePainter extends CustomPainter {\n  final double animationValue;\n  final Color color;\n  \n  WavePainter({required this.animationValue, required this.color});\n  \n  @override\n  void paint(Canvas canvas, Size size) {\n    final paint = Paint()\n      ..color = color\n      ..strokeWidth = 3\n      ..style = PaintingStyle.stroke;\n    \n    final path = Path();\n    path.moveTo(0, size.height / 2);\n    \n    for (double x = 0; x < size.width; x++) {\n      double y = size.height / 2 +\n          sin((x / size.width * 2 * pi) + (animationValue * 2 * pi)) * 20;\n      path.lineTo(x, y);\n    }\n    \n    canvas.drawPath(path, paint);\n  }\n  \n  @override\n  bool shouldRepaint(covariant WavePainter oldDelegate) {\n    return oldDelegate.animationValue != animationValue;\n  }\n}",
        language: "dart"
      },
      {
        type: "heading",
        content: "Performance Optimization"
      },
      {
        type: "paragraph",
        content: "The key to performant CustomPainter animations is minimizing unnecessary repaints. The shouldRepaint method is crucial—it determines when the painter needs to redraw. Always compare the old and new values to avoid redundant work."
      },
      {
        type: "list",
        content: "Best Practices:",
        items: [
          "Cache expensive calculations outside the paint method",
          "Use shouldRepaint efficiently to avoid unnecessary redraws",
          "Keep the paint method as simple as possible",
          "Consider using RepaintBoundary for isolated updates"
        ]
      },
      {
        type: "paragraph",
        content: "CustomPainter gives you complete control over the rendering pipeline, making it the ultimate tool for creating unique, performant animations in Flutter."
      }
    ]
  },
  {
    id: "4",
    title: "The Future of Mobile DevOps: CI/CD at Scale",
    excerpt: "A comprehensive guide to automating builds with Codemagic, GitHub Actions, and Fastlane for multi-environment releases.",
    date: "Sep 26, 2024",
    readTime: "15 Min Read",
    imageUrl: "/assets/images/blog.png",
    category: "architecture",
    featured: true,
    author: "DevStack Lead",
    authorRole: "Cross-Platform Architect",
    tags: ["DevOps", "CI/CD", "Automation", "Architecture"],
    content: [
      {
        type: "paragraph",
        content: "In today's fast-paced mobile development landscape, having a robust CI/CD pipeline isn't just nice to have—it's essential. This comprehensive guide explores how to build scalable, efficient mobile DevOps pipelines using modern tools and best practices."
      },
      {
        type: "heading",
        content: "The Mobile DevOps Challenge"
      },
      {
        type: "paragraph",
        content: "Mobile development presents unique DevOps challenges: platform-specific builds, certificate management, app store submissions, and the need to support multiple environments. Let's tackle these systematically."
      },
      {
        type: "heading",
        content: "Tool Selection"
      },
      {
        type: "list",
        content: "Our CI/CD Stack:",
        items: [
          "Codemagic: Purpose-built for Flutter and mobile apps",
          "GitHub Actions: Flexible workflow automation",
          "Fastlane: iOS and Android deployment automation",
          "Firebase App Distribution: Beta testing at scale"
        ]
      },
      {
        type: "code",
        content: "# Example Codemagic workflow for multi-environment builds\nenvironments:\n  android:\n    flutter: stable\n    java: 17\n  ios:\n    flutter: stable\n    xcode: 15.0\n    cocoapods: 1.14\n\nworkflows:\n  production:\n    name: Production Build\n    max_build_duration: 60\n    environment:\n      flutter: stable\n    scripts:\n      - name: Install dependencies\n        script: flutter pub get\n      - name: Run tests\n        script: flutter test\n      - name: Build APK\n        script: flutter build apk --release\n    artifacts:\n      - build/**/outputs/**/*.apk",
        language: "yaml"
      },
      {
        type: "heading",
        content: "Multi-Environment Strategy"
      },
      {
        type: "paragraph",
        content: "A well-structured environment strategy is crucial for scaling mobile DevOps. Separate your development, staging, and production environments with distinct configurations and deployment pipelines."
      },
      {
        type: "quote",
        content: "The goal of mobile DevOps isn't just automation—it's building confidence that every release is reliable, tested, and ready for users."
      },
      {
        type: "paragraph",
        content: "By implementing these strategies and tools, you can create a CI/CD pipeline that scales with your team and application complexity, ensuring consistent, high-quality releases."
      }
    ]
  },
  {
    id: "5",
    title: "JSI: The Engine Powering The New React Native",
    excerpt: "Breaking down the Javascript Interface and why it is a game changer for synchronous native-to-JS communications.",
    date: "Sep 18, 2024",
    readTime: "10 Min Read",
    imageUrl: "/assets/images/blog.png",
    category: "react-native",
    author: "DevStack Lead",
    authorRole: "Cross-Platform Architect",
    tags: ["React Native", "JSI", "Performance", "Architecture"],
    content: [
      {
        type: "paragraph",
        content: "React Native's JavaScript Interface (JSI) represents a fundamental shift in how JavaScript communicates with native code. Understanding JSI is crucial for anyone building high-performance React Native applications."
      },
      {
        type: "heading",
        content: "The Bridge Problem"
      },
      {
        type: "paragraph",
        content: "Before JSI, React Native relied on an asynchronous bridge for JavaScript-to-native communication. While this worked, it introduced latency and serialization overhead that limited performance in scenarios requiring synchronous access."
      },
      {
        type: "heading",
        content: "Enter JSI"
      },
      {
        type: "paragraph",
        content: "JSI provides a synchronous, low-overhead way for JavaScript to call native functions directly. It eliminates the need for JSON serialization and enables true synchronous communication between the JS and native threads."
      },
      {
        type: "code",
        content: "// Example: Creating a native module with JSI\n// In your C++ native module:\n#include <jsi/jsi.h>\n\nusing namespace facebook::jsi;\n\nvoid install(Runtime& runtime) {\n  auto hostObject = std::make_shared<MyNativeModule>();\n  runtime.global().setProperty(\n    runtime,\n    PropNameID::forAscii(runtime, \"myNativeModule\"),\n    Object::createFromHostObject(runtime, hostObject)\n  );\n}\n\n// In JavaScript:\nconst result = global.myNativeModule.syncOperation(data);",
        language: "cpp"
      },
      {
        type: "list",
        content: "JSI Benefits:",
        items: [
          "Synchronous native function calls",
          "No JSON serialization overhead",
          "Shared memory access",
          "Better performance for frequent updates",
          "Foundation for Fabric and TurboModules"
        ]
      },
      {
        type: "quote",
        content: "JSI isn't just an optimization—it's the foundation that enables React Native's new architecture to deliver truly native performance."
      },
      {
        type: "paragraph",
        content: "Understanding JSI is essential for modern React Native development. As the ecosystem evolves, JSI will continue to enable new capabilities and performance improvements that were previously impossible."
      }
    ]
  }
];

export const mockPhilosophy: PhilosophyCard[] = [
  {
    id: "1",
    icon: "triangle",
    title: "Scalable Architecture",
    description: "I leverage IoC, Provider, and Redux patterns to ensure that applications remain maintainable as they grow. My code is structured for testability and clarity.",
    large: true
  },
  {
    id: "2",
    icon: "zap",
    title: "Performance First",
    description: "60 FPS animations and optimized bundle sizes are my baseline."
  },
  {
    id: "3",
    stat: "99.9%",
    statLabel: "CRASH-FREE USERS",
    title: "",
    description: ""
  },
  {
    id: "4",
    stat: "40+",
    statLabel: "STORE RELEASES",
    title: "",
    description: ""
  }
];

export const mockFooterLinks: FooterLink[] = [
  { label: "GitHub", url: "https://github.com" },
  { label: "LinkedIn", url: "https://linkedin.com" },
  { label: "Twitter", url: "https://twitter.com" },
  { label: "Email", url: "mailto:hello@devstack.io" }
];

export const getProfile = async (): Promise<Profile> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockProfile), 500));
};

export const getProjects = async (): Promise<Project[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockProjects), 500));
};

export const getBlogs = async (): Promise<BlogPost[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockBlogs), 500));
};

export const getPhilosophy = async (): Promise<PhilosophyCard[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockPhilosophy), 500));
};

export const getFooterLinks = async (): Promise<FooterLink[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockFooterLinks), 500));
};

export const getStats = async (): Promise<Stat[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockStats), 500));
};

export const getTechSkills = async (): Promise<TechSkill[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockTechSkills), 500));
};

export const getTools = async (): Promise<string[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockTools), 500));
};

export const getMilestones = async (): Promise<Milestone[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockMilestones), 500));
};
