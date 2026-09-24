import {
  BookOpen,
  GitFork,
  Braces,
  ShieldCheck,
  Layers,
  Boxes,
  Sigma,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export interface LessonMeta {
  id: number;
  slug: string;
  title: string;
  desc: string;
}

export interface ModuleMeta {
  id: number;
  slug: string;
  title: string;
  /** short description used on the roadmap card */
  cardDesc: string;
  /** description used on the module page header */
  moduleDesc: string;
  icon: LucideIcon;
  accent: string;
  lessons: LessonMeta[];
}

export const modules: ModuleMeta[] = [
  {
    id: 1,
    slug: "fundamentals",
    title: "Fundamentals",
    cardDesc: "Kotlin Syntax, Variables ও Data Types দিয়ে শুরু করুন basic concepts।",
    moduleDesc: "Kotlin-এর মৌলিক ভিত্তি — ভেরিয়েবল, ডেটা টাইপ, অপারেটর ও সিনট্যাক্স।",
    icon: BookOpen,
    accent: "#8f6bff",
    lessons: [
      { id: 1, slug: "kotlin-introduction", title: "Kotlin Introduction", desc: "Kotlin-এর পরিচিতি ও বৈশিষ্ট্য" },
      { id: 2, slug: "kotlin-setup-first-program", title: "Kotlin Setup & First Program", desc: "এনভায়রনমেন্ট সেটআপ ও প্রথম কোড রান" },
      { id: 3, slug: "basic-syntax", title: "Basic Syntax", desc: "Kotlin program-এর মূল syntax structure" },
      { id: 4, slug: "variables-val-var", title: "Variables — val & var", desc: "val ও var দিয়ে ভেরিয়েবল তৈরি" },
      { id: 5, slug: "data-types", title: "Data Types", desc: "Int, Long, Float, Double, Boolean, Char ও String ডেটা টাইপ" },
      { id: 6, slug: "type-inference", title: "Type Inference", desc: "টাইপ না লিখেও Kotlin-এর টাইপ চেনার পদ্ধতি" },
      { id: 7, slug: "type-conversion", title: "Type Conversion", desc: "এক ডেটা টাইপ থেকে অন্য ডেটা টাইপে রূপান্তর" },
      { id: 8, slug: "operators", title: "Operators", desc: "অঙ্ক ও লজিক্যাল ক্যালকুলেশনের অপারেটর" },
      { id: 9, slug: "strings-string-templates", title: "Strings & String Templates", desc: "স্ট্রিং এবং স্ট্রিং টেমপ্লেটের ব্যবহার" },
      { id: 10, slug: "comments-code-style", title: "Comments & Code Style", desc: "কোডে কমেন্ট লেখা ও কোডিং স্টাইল" },
    ],
  },
  {
    id: 2,
    slug: "control-flow",
    title: "Control Flow",
    cardDesc: "Conditions ও Loops দিয়ে নিয়ন্ত্রণ করুন program-এর flow ও decision-making।",
    moduleDesc: "Conditions ও Loops দিয়ে প্রোগ্রাম নিয়ন্ত্রণ করার উপায়।",
    icon: GitFork,
    accent: "#a45cff",
    lessons: [
      { id: 1, slug: "if-expression", title: "if Expression", desc: "Kotlin-এ if এক্সপ্রেশন হিসেবে ব্যবহার" },
      { id: 2, slug: "if-else", title: "if / else", desc: "শর্তের ওপর ভিত্তি করে কোড রান করা" },
      { id: 3, slug: "else-if", title: "else if", desc: "একাধিক শর্ত এক সাথে যাচাই করা" },
      { id: 4, slug: "when-expression", title: "when Expression", desc: "switch-এর আধুনিক বিকল্প when" },
      { id: 5, slug: "for-loop", title: "for Loop", desc: "লুপ দিয়ে ডেটা বা রেঞ্জের ওপর ঘোরা" },
      { id: 6, slug: "while-loop", title: "while Loop", desc: "শর্ত অনুযায়ী বারবার কোড রান করা" },
      { id: 7, slug: "do-while-loop", title: "do-while Loop", desc: "কমপক্ষে একবার কোড এক্সিকিউট করা" },
      { id: 8, slug: "ranges", title: "Ranges", desc: "রেঞ্জ তৈরি ও ব্যবহার" },
      { id: 9, slug: "break", title: "break", desc: "লুপ থেকে তাৎক্ষণিক বের হওয়া" },
      { id: 10, slug: "continue", title: "continue", desc: "বর্তমান আইটারেশন স্কিপ করা" },
    ],
  },
  {
    id: 3,
    slug: "functions",
    title: "Functions",
    cardDesc: "Functions, Parameters ও Return Value দিয়ে তৈরি করুন clean, reusable code।",
    moduleDesc: "Reusable code লেখার জন্য Functions ও তাদের বিভিন্ন রূপ।",
    icon: Braces,
    accent: "#b84afe",
    lessons: [
      { id: 1, slug: "function-basics", title: "Function Basics", desc: "fun কি-ওয়ার্ড দিয়ে ফাংশন তৈরি" },
      { id: 2, slug: "function-syntax", title: "Function Syntax", desc: "ফাংশন লেখার সঠিক সিনট্যাক্স" },
      { id: 3, slug: "parameters-arguments", title: "Parameters & Arguments", desc: "ফাংশনে ডেটা পাঠানো" },
      { id: 4, slug: "return-values", title: "Return Values", desc: "ফাংশন থেকে ফলাফল পাওয়া" },
      { id: 5, slug: "return-type", title: "Return Type", desc: "ফাংশনের রিটার্ন টাইপ নির্ধারণ" },
      { id: 6, slug: "default-arguments", title: "Default Arguments", desc: "প্যারামিটারে ডিফল্ট মান রাখা" },
      { id: 7, slug: "named-arguments", title: "Named Arguments", desc: "নাম উল্লেখ করে আর্গুমেন্ট পাঠানো" },
      { id: 8, slug: "single-expression-functions", title: "Single-expression Functions", desc: "এক লাইনে ফাংশন লেখার শর্টকাট" },
      { id: 9, slug: "local-functions", title: "Local Functions", desc: "ফাংশনের ভেতরে ফাংশন" },
      { id: 10, slug: "function-scope", title: "Function Scope", desc: "ফাংশনের স্কোপ ও পরিধি" },
    ],
  },
  {
    id: 4,
    slug: "null-safety",
    title: "Null Safety",
    cardDesc: "Kotlin-এর সবচেয়ে জনপ্রিয় Null Safety system, Nullable Types, Safe Call ও Elvis Operator।",
    moduleDesc: "Null crash রোধ করার জন্য Kotlin-এর সবচেয়ে শক্তিশালী feature।",
    icon: ShieldCheck,
    accent: "#ca3ff2",
    lessons: [
      { id: 1, slug: "understanding-null", title: "Understanding null", desc: "Null reference ও এর ঝুঁকি" },
      { id: 2, slug: "nullable-types", title: "Nullable Types", desc: "টাইপে ? দিয়ে নাল অনুমতি দেওয়া" },
      { id: 3, slug: "nullable-variables", title: "Nullable Variables", desc: "নাল সংরক্ষণকারী ভেরিয়েবল" },
      { id: 4, slug: "safe-call-operator", title: "Safe Call Operator ?.", desc: "নিরাপদে নাল প্রপার্টি অ্যাক্সেস" },
      { id: 5, slug: "elvis-operator", title: "Elvis Operator ?:", desc: "নাল হলে ডিফল্ট ভ্যালু দেওয়া" },
      { id: 6, slug: "not-null-assertion", title: "Not-null Assertion !!", desc: "জোর করে ভ্যালু নন-নাল ঘোষণা" },
      { id: 7, slug: "safe-cast", title: "Safe Cast as?", desc: "সেফ টাইপ কাস্টিং" },
      { id: 8, slug: "let-with-nullable-values", title: "let with Nullable Values", desc: "শুধুমাত্র নন-নাল হলে কোড চালানো" },
      { id: 9, slug: "null-safety-with-functions", title: "Null Safety with Functions", desc: "ফাংশনে নাল সেফটি বজায় রাখা" },
      { id: 10, slug: "common-null-safety-mistakes", title: "Common Null Safety Mistakes", desc: "নাল সেফটির প্রচলিত ভুলসমূহ" },
    ],
  },
  {
    id: 5,
    slug: "collections",
    title: "Collections",
    cardDesc: "List, Set, Map ও collection operations দিয়ে সাজিয়ে নিন আপনার ডেটা।",
    moduleDesc: "একাধিক data একসাথে রাখা ও process করার উপায়।",
    icon: Layers,
    accent: "#d945c4",
    lessons: [
      { id: 1, slug: "collection-basics", title: "Collection Basics", desc: "কালেকশনের প্রাথমিক ধারণা" },
      { id: 2, slug: "list", title: "List", desc: "ধারাবাহিক তালিকার ডেটা সংরক্ষণ" },
      { id: 3, slug: "mutable-list", title: "MutableList", desc: "পরিবর্তনযোগ্য তালিকা" },
      { id: 4, slug: "set", title: "Set", desc: "ডুপ্লিকেটহীন ইউনিক ডেটার সেট" },
      { id: 5, slug: "mutable-set", title: "MutableSet", desc: "পরিবর্তনযোগ্য ইউনিক সেট" },
      { id: 6, slug: "map", title: "Map", desc: "Key-value জোড়ায় ডেটা রাখা" },
      { id: 7, slug: "mutable-map", title: "MutableMap", desc: "পরিবর্তনযোগ্য কি-ভ্যালু ম্যাপ" },
      { id: 8, slug: "iterating-collections", title: "Iterating Collections", desc: "কালেকশনের উপাদান ব্রাউজ করা" },
      { id: 9, slug: "collection-operations", title: "Collection Operations", desc: "কালেকশন অপারেশনের মূল ফাংশন" },
      { id: 10, slug: "sorting-searching", title: "Sorting & Searching", desc: "সাজানো ও উপাদান খোঁজার উপায়" },
    ],
  },
  {
    id: 6,
    slug: "object-oriented-kotlin",
    title: "Object-Oriented Kotlin",
    cardDesc: "Class, Object, Inheritance ও Interface-এর মাধ্যমে Object-Oriented Programming-এ দক্ষতা।",
    moduleDesc: "OOP-র মূল স্তম্ভগুলো দিয়ে real-world program ডিজাইন।",
    icon: Boxes,
    accent: "#e24462",
    lessons: [
      { id: 1, slug: "classes-objects", title: "Classes & Objects", desc: "ব্লুপ্রিন্ট ও অবজেক্ট তৈরি" },
      { id: 2, slug: "properties", title: "Properties", desc: "ক্লাসের প্রপার্টি ও গেটার-সেটার" },
      { id: 3, slug: "member-functions", title: "Member Functions", desc: "ক্লাসের মেম্বার মেথড" },
      { id: 4, slug: "primary-constructor", title: "Primary Constructor", desc: "প্রাথমিক কনস্ট্রাক্টর গঠন" },
      { id: 5, slug: "secondary-constructor", title: "Secondary Constructor", desc: "বিকল্প কনস্ট্রাক্টর তৈরি" },
      { id: 6, slug: "init-block", title: "init Block", desc: "ইনিশিয়ালাইজেশন কোড ব্লক" },
      { id: 7, slug: "visibility-modifiers", title: "Visibility Modifiers", desc: "অ্যাক্সেস কন্ট্রোল বা ভিজিবিলিটি" },
      { id: 8, slug: "inheritance", title: "Inheritance", desc: "ক্লাসের উত্তরাধিকার নিশ্চিত করা" },
      { id: 9, slug: "method-overriding", title: "Method Overriding", desc: "প্যারেন্ট মেথড ওভাররাইড করা" },
      { id: 10, slug: "interfaces", title: "Interfaces", desc: "ক্লাসের জন্য ইন্টারফেস চুক্তি" },
      { id: 11, slug: "abstract-classes", title: "Abstract Classes", desc: "অসম্পূর্ণ অ্যাবস্ট্রাক্ট ক্লাস" },
      { id: 12, slug: "data-classes", title: "Data Classes", desc: "ডেটা সংরক্ষণের বিশেষ ক্লাস" },
      { id: 13, slug: "enum-classes", title: "Enum Classes", desc: "ধ্রুবক মানের এনাম ক্লাস" },
    ],
  },
  {
    id: 7,
    slug: "functional-kotlin",
    title: "Functional Kotlin",
    cardDesc: "Lambda ও Higher-Order Functions দিয়ে Functional Programming-এর আনন্দ।",
    moduleDesc: "Functional Programming-এর শক্তি দিয়ে আধুনিক code লিখুন।",
    icon: Sigma,
    accent: "#f06855",
    lessons: [
      { id: 1, slug: "functional-programming-basics", title: "Functional Programming Basics", desc: "ফাংশনাল প্রোগ্রামিংয়ের মূলনীতি" },
      { id: 2, slug: "lambda-expressions", title: "Lambda Expressions", desc: "নামহীন ল্যাম্বডা ফাংশন" },
      { id: 3, slug: "lambda-parameters", title: "Lambda Parameters", desc: "প্যারামিটার ও it কি-ওয়ার্ড" },
      { id: 4, slug: "function-types", title: "Function Types", desc: "ফাংশনকে টাইপ হিসেবে ব্যবহার" },
      { id: 5, slug: "higher-order-functions", title: "Higher-Order Functions", desc: "ফাংশন গ্রহণ বা রিটার্ন করা" },
      { id: 6, slug: "anonymous-functions", title: "Anonymous Functions", desc: "বেনামী সাধারণ ফাংশন" },
      { id: 7, slug: "map-filter-foreach", title: "map, filter & forEach", desc: "কালেকশন ফিল্টারিং ও ট্রান্সফর্ম" },
      { id: 8, slug: "scope-functions", title: "Scope Functions", desc: "স্কোপ ফাংশন পরিচিতি" },
      { id: 9, slug: "scope-functions-deep-dive", title: "let, run, with, apply & also", desc: "৫টি স্কোপ ফাংশনের ব্যবহার" },
      { id: 10, slug: "sequences", title: "Sequences", desc: "লেজি ইভালুয়েশন ও সিকোয়েন্স" },
      { id: 11, slug: "function-references", title: "Function References", desc: "ফাংশন রেফারেন্স পাস করা" },
      { id: 12, slug: "combining-functional-operations", title: "Combining Functional Operations", desc: "একাধিক অপারেশন একসাথে জোড়া" },
    ],
  },
  {
    id: 8,
    slug: "advanced-kotlin",
    title: "Advanced Kotlin",
    cardDesc: "Generics, Extension Functions ও Coroutines দিয়ে Advanced Kotlin concepts।",
    moduleDesc: "Advanced concepts যা একজন Kotlin developer-কে এক ধাপ এগিয়ে রাখে।",
    icon: Rocket,
    accent: "#fe8a3c",
    lessons: [
      { id: 1, slug: "generics", title: "Generics", desc: "টাইপ-সেফ কোড তৈরির উপায়" },
      { id: 2, slug: "generic-functions", title: "Generic Functions", desc: "জেনেরিক ফাংশন ডিফাইন করা" },
      { id: 3, slug: "generic-constraints", title: "Generic Constraints", desc: "জেনেরিক টাইপের সীমা নির্ধারণ" },
      { id: 4, slug: "extension-functions", title: "Extension Functions", desc: "বিদ্যমান ক্লাসে নতুন ফাংশন যোগ" },
      { id: 5, slug: "extension-properties", title: "Extension Properties", desc: "বিদ্যমান ক্লাসে নতুন প্রপার্টি" },
      { id: 6, slug: "object-declarations", title: "Object Declarations", desc: "সিঙ্গেলটন অবজেক্ট ডিক্লেয়ারেশন" },
      { id: 7, slug: "companion-objects", title: "Companion Objects", desc: "ক্লাস-লেভেল মেম্বার ডিফাইন" },
      { id: 8, slug: "delegation", title: "Delegation", desc: "প্রপার্টি ও ক্লাস ডেলিগেশন" },
      { id: 9, slug: "sealed-classes", title: "Sealed Classes", desc: "সীমাবদ্ধ ক্লাস হায়ারার্কি" },
      { id: 10, slug: "exception-handling", title: "Exception Handling", desc: "এরর ও এক্সেপশন নিয়ন্ত্রণ" },
      { id: 11, slug: "coroutines-introduction", title: "Coroutines Introduction", desc: "অ্যাসিনক্রোনাস প্রোগ্রামিং ও কো-রুটিন" },
      { id: 12, slug: "suspend-functions", title: "suspend Functions", desc: "পজ ও রিজিউম করতে পারা ফাংশন" },
      { id: 13, slug: "coroutine-builders", title: "Coroutine Builders", desc: "launch ও async দিয়ে কো-রুটিন" },
      { id: 14, slug: "coroutine-context-dispatchers", title: "Coroutine Context & Dispatchers", desc: "থ্রেড ডিসপ্যাচার ও কনটেক্সট" },
      { id: 15, slug: "structured-concurrency", title: "Structured Concurrency", desc: "স্ট্রাকচার্ড কনকারেন্সি আর্কিটেকচার" },
    ],
  },
];

/* retained for the roadmap deck (cards render from this array) */
export const milestones = modules;

export const findModule = (slug?: string) =>
  modules.find((m) => m.slug === slug);

export const findLesson = (moduleSlug?: string, lessonSlug?: string) => {
  const module = findModule(moduleSlug);
  const lesson = module?.lessons.find((l) => l.slug === lessonSlug);
  return module && lesson ? { module, lesson } : null;
};
