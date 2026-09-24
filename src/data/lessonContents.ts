export interface SyntaxItem {
  term: string;
  desc: string;
}

export interface NoteItem {
  id: number;
  title: string;
  desc?: string;
  code?: string;
  footer?: string;
  correct?: string;
  wrong?: string;
  note?: string;
}

export interface CodeExampleBlock {
  intro?: string;
  filename?: string;
  code: string;
  footer?: string;
}

export interface OutputBlock {
  label?: string;
  lines: string[];
  note?: string;
}

export interface LessonContentData {
  // 1. সহজ বাংলায় Concept Explanation
  conceptExplanation: {
    title: string;
    paragraphs: string[];
  };
  // 2. Key Points
  keyPoints: {
    title: string;
    points: string[];
  };
  // 3. Kotlin Syntax
  syntax: {
    title: string;
    intro: string;
    code: string;
    items: SyntaxItem[];
    note?: string;
  };
  // 4. Code Example
  codeExample: {
    title: string;
    filename?: string;
    code?: string;
    explanations?: string[];
    blocks?: CodeExampleBlock[];
  };
  // 5. Expected Output
  expectedOutput: {
    title: string;
    lines?: string[];
    note?: string;
    blocks?: OutputBlock[];
  };
  // 6. Important Notes / Common Mistakes
  importantNotes: {
    title: string;
    items: NoteItem[];
  };
  // 7. ছোট Practice Task
  practiceTask: {
    title: string;
    instruction: string;
    outputLines: string[];
    condition: string;
  };
}

export const lessonContents: Record<string, LessonContentData> = {
  // Key format: `${moduleSlug}/${lessonSlug}`
  "fundamentals/kotlin-introduction": {
    conceptExplanation: {
      title: "1. সহজ বাংলায় Concept Explanation",
      paragraphs: [
        "Kotlin হলো একটি modern programming language, যা JetBrains তৈরি করেছে। Android app development-এর জন্য Kotlin বর্তমানে বহুল ব্যবহৃত একটি language।",
        "Kotlin দিয়ে আমরা Android App, backend application, desktop application এবং আরও বিভিন্ন ধরনের software তৈরি করতে পারি।",
        "Kotlin-এর একটি গুরুত্বপূর্ণ বৈশিষ্ট্য হলো এটি Java-এর সঙ্গে interoperable। অর্থাৎ প্রয়োজন অনুযায়ী Kotlin project-এ Java code এবং Java libraries ব্যবহার করা যায়।",
        "এই lesson-এ আমরা Kotlin-এর একদম basic ধারণা শিখব এবং একটি simple Kotlin program লিখব।",
        "আমাদের প্রথম program-এর কাজ হবে শুধু একটি message console-এ দেখানো।",
      ],
    },
    keyPoints: {
      title: "2. Key Points",
      points: [
        "Kotlin একটি programming language।",
        "Kotlin-এর syntax তুলনামূলকভাবে সহজ ও readable।",
        "Android development-এর জন্য Kotlin ব্যাপকভাবে ব্যবহৃত হয়।",
        "Kotlin Java-এর সঙ্গে interoperable।",
        "Kotlin program-এর execution সাধারণত main() function থেকে শুরু হয়।",
        "println() ব্যবহার করে output দেখানো যায়।",
        "Kotlin code লিখতে সাধারণত .kt file ব্যবহার করা হয়।",
      ],
    },
    syntax: {
      title: "3. Kotlin Syntax",
      intro: "একটি basic Kotlin program:",
      code: `fun main() {
    println("Hello, Kotlin!")
}`,
      items: [
        { term: "fun", desc: "function তৈরি করার keyword।" },
        { term: "main()", desc: "program-এর entry point।" },
        { term: "{ }", desc: "function-এর body।" },
        { term: "println()", desc: "console-এ text output দেখায়।" },
        { term: '"Hello, Kotlin!"', desc: "একটি String value।" },
      ],
      note: "Kotlin-এ statement-এর শেষে সাধারণত semicolon ; দেওয়ার প্রয়োজন হয় না।",
    },
    codeExample: {
      title: "4. Code Example",
      filename: "Main.kt",
      code: `fun main() {
    println("Hello, Kotlin!")
    println("I am learning Kotlin.")
}`,
      explanations: [
        "এই program-এ দুটি println() ব্যবহার করা হয়েছে।",
        "প্রথমটি Hello, Kotlin! এবং দ্বিতীয়টি I am learning Kotlin. output করবে।",
      ],
    },
    expectedOutput: {
      title: "5. Expected Output",
      lines: ["Hello, Kotlin!", "I am learning Kotlin."],
      note: "প্রতিটি println() নতুন line-এ output দেখায়।",
    },
    importantNotes: {
      title: "6. Important Notes / Common Mistakes",
      items: [
        {
          id: 1,
          title: "1. main() ভুলে যাওয়া",
          desc: "সাধারণ Kotlin program শুরু করার জন্য:",
          code: `fun main() {
}`,
          footer: "ব্যবহার করতে হবে।",
        },
        {
          id: 2,
          title: "2. println()-এর spelling ভুল করা",
          correct: 'println("Hello")',
          wrong: 'printIn("Hello")',
          note: "এখানে ln হলো ছোট হাতের l এবং n।",
        },
        {
          id: 3,
          title: "3. String-এর জন্য quotation mark ব্যবহার করা",
          correct: 'println("Hello")',
          wrong: "println(Hello)",
        },
        {
          id: 4,
          title: "4. { } বাদ দেওয়া",
          desc: "Function-এর code { }-এর ভিতরে লিখতে হয়:",
          code: `fun main() {
    println("Hello")
}`,
        },
      ],
    },
    practiceTask: {
      title: "7. ছোট Practice Task",
      instruction: "নিজে একটি Kotlin program লিখো যেটি নিচের তিনটি line output করবে:",
      outputLines: [
        "My name is Shihab.",
        "I am learning Kotlin.",
        "Kotlin is interesting.",
      ],
      condition: "শর্ত: প্রতিটি line-এর জন্য আলাদা println() ব্যবহার করতে হবে।",
    },
  },

  "fundamentals/kotlin-setup-first-program": {
    conceptExplanation: {
      title: "1. সহজ বাংলায় Concept Explanation",
      paragraphs: [
        "Kotlin code লেখার আগে আমাদের একটি Kotlin development environment দরকার।",
        "Kotlin শেখার জন্য শুরুতে এমন একটি environment ব্যবহার করা যায় যেখানে সরাসরি Kotlin code লেখা এবং run করা যায়।",
        "Kotlin project-এ সাধারণত .kt extension-এর file-এ Kotlin code লেখা হয়।",
        "আমাদের প্রথম program হবে একটি simple Hello World program। এটি run করলে console-এ একটি message দেখা যাবে।",
        "Kotlin program-এর execution সাধারণত main() function থেকে শুরু হয়।",
      ],
    },
    keyPoints: {
      title: "2. Key Points",
      points: [
        "Kotlin code সাধারণত .kt file-এ লেখা হয়।",
        "Kotlin program-এর starting point হলো main() function।",
        "println() দিয়ে console-এ output দেখানো যায়।",
        "Code লেখার পর Run করলে program execute হবে।",
        "প্রথমে simple program দিয়ে setup ঠিক আছে কিনা পরীক্ষা করা ভালো।",
      ],
    },
    syntax: {
      title: "3. Kotlin Syntax",
      intro: "Basic Kotlin file:",
      code: `fun main() {
    println("Hello, Kotlin!")
}`,
      items: [
        { term: "fun", desc: "একটি function তৈরি করার keyword।" },
        { term: "main()", desc: "program-এর entry point।" },
        { term: "{ }", desc: "function-এর body।" },
        { term: "println()", desc: "output দেখানোর function।" },
        { term: '"Hello, Kotlin!"', desc: "String।" },
      ],
    },
    codeExample: {
      title: "4. Code Example",
      blocks: [
        {
          intro: "একটি নতুন Kotlin file তৈরি করে নিচের code লিখো:",
          filename: "Main.kt",
          code: `fun main() {
    println("Hello, Kotlin!")
}`,
          footer: "এরপর Run করলে programটি execute হবে।",
        },
        {
          intro: "আরেকটি example:",
          filename: "Main.kt",
          code: `fun main() {
    println("My first Kotlin program")
    println("I am ready to learn Kotlin.")
}`,
        },
      ],
    },
    expectedOutput: {
      title: "5. Expected Output",
      blocks: [
        {
          label: "প্রথম program-এর output:",
          lines: ["Hello, Kotlin!"],
        },
        {
          label: "দ্বিতীয় program-এর output:",
          lines: [
            "My first Kotlin program",
            "I am ready to learn Kotlin.",
          ],
        },
      ],
    },
    importantNotes: {
      title: "6. Important Notes / Common Mistakes",
      items: [
        {
          id: 1,
          title: "1. File extension ভুল করা",
          desc: "Kotlin source file সাধারণত:",
          code: "Main.kt",
          footer: "এর মতো হয়।\n\n.kt হলো Kotlin source file-এর extension।",
        },
        {
          id: 2,
          title: "2. main() function ভুলে যাওয়া",
          desc: "Basic executable Kotlin program-এর জন্য:",
          code: `fun main() {
    // code
}`,
          footer: "ব্যবহার করতে হবে।",
        },
        {
          id: 3,
          title: "3. println()-এর spelling ভুল করা",
          correct: 'println("Hello")',
          note: "println-এ l হলো ছোট হাতের ইংরেজি L।",
        },
        {
          id: 4,
          title: "4. Code পরিবর্তনের পর Run না করা",
          desc: "Code লেখার পর Run করতে হবে। তখন নতুন output দেখা যাবে।",
        },
        {
          id: 5,
          title: "5. Error হলে ভয় পাওয়ার দরকার নেই",
          desc: "Kotlin-এ code লেখার সময় error হওয়া স্বাভাবিক। Error message দেখে কোন line-এ সমস্যা হয়েছে তা খুঁজে বের করার অভ্যাস করতে হবে।",
        },
      ],
    },
    practiceTask: {
      title: "7. ছোট Practice Task",
      instruction: "একটি নতুন Kotlin program তৈরি করো।\n\nProgramটি নিচের output দেখাবে:",
      outputLines: [
        "Welcome to Kotlin!",
        "My name is Shihab.",
        "This is my first Kotlin program.",
      ],
      condition: "শর্ত: প্রতিটি line-এর জন্য আলাদা println() ব্যবহার করতে হবে।",
    },
  },

  "fundamentals/basic-syntax": {
    conceptExplanation: {
      title: "1. সহজ বাংলায় Concept Explanation",
      paragraphs: [
        "Kotlin-এ কোড লেখার কিছু সাধারণ নিয়ম এবং গঠন রয়েছে, যেগুলোকে Syntax (সিনট্যাক্স) বলা হয়।",
        "একটি Kotlin program সাধারণত একাধিক statement নিয়ে গঠিত হয়। প্রতিটি statement উপর থেকে নিচে ক্রমানুসারে (sequentially) একটার পর একটা execute হয়।",
        "আগের পাঠগুলোতে আমরা দেখেছি যে প্রোগ্রাম শুরু করার জন্য main() function ব্যবহার করতে হয় এবং function-এর ভেতরে { } কার্লি ব্র্যাকেটের মধ্যে কোড লিখতে হয়।",
        "এই lesson-এ আমরা Kotlin-এর syntax-এর মূল বিষয়গুলো বিস্তারিত শিখব, বিশেষ করে print() এবং println()-এর মধ্যে পার্থক্য, কোডের ক্রম এবং সেমিকোলনের ব্যবহার।",
      ],
    },
    keyPoints: {
      title: "2. Key Points",
      points: [
        "Syntax হলো প্রোগ্রামিং ভাষার ব্যাকরণ বা কোড লেখার নির্দিষ্ট নিয়ম।",
        "Kotlin কোড উপর থেকে নিচে ধারাবাহিকভাবে (top-to-bottom) execute হয়।",
        "println() আউটপুট দেখানোর পর নতুন লাইনে যায় (new line যোগ করে)।",
        "print() আউটপুট দেখানোর পর একই লাইনে থাকে (new line যোগ করে না)।",
        "Kotlin-এ প্রতিটি statement-এর শেষে semicolon (;) দেওয়ার প্রয়োজন নেই।",
        "কোড পরিষ্কার ও পড়ার উপযোগী রাখার জন্য indentation (ট্যাব বা স্পেস দিয়ে সাজানো) জরুরি।",
      ],
    },
    syntax: {
      title: "3. Kotlin Syntax",
      intro: "Basic program structure:",
      code: `fun main() {
    print("একই লাইনে থাকবে: ")
    println("নতুন লাইনে যাবে")
}`,
      items: [
        { term: "fun", desc: "function তৈরির keyword।" },
        { term: "main()", desc: "প্রোগ্রামের শুরুর entry point।" },
        { term: "{ }", desc: "function-এর কোড ব্লক নির্দেশ করে।" },
        { term: "print()", desc: "আউটপুট একই লাইনে ধরে রাখে।" },
        { term: "println()", desc: "আউটপুট দিয়ে নতুন লাইনে চলে যায়।" },
      ],
      note: "Kotlin-এ semicolon (;) দেওয়া ঐচ্ছিক, তবে সাধারণত এটি না লেখাই Kotlin-এর স্ট্যান্ডার্ড নিয়ম।",
    },
    codeExample: {
      title: "4. Code Example",
      filename: "Main.kt",
      code: `fun main() {
    print("Kotlin ")
    print("is ")
    println("awesome!")

    println("Learning basic syntax.")
}`,
      explanations: [
        "প্রথম তিনটি লাইনে print() ব্যবহার করায় \"Kotlin \", \"is \" এবং \"awesome!\" একই লাইনে পাশাপাশি বসে \"Kotlin is awesome!\" প্রিন্ট হবে।",
        "এরপর println() থাকায় পরবর্তী লেখা \"Learning basic syntax.\" নতুন একটি লাইনে প্রদর্শিত হবে।",
      ],
    },
    expectedOutput: {
      title: "5. Expected Output",
      lines: ["Kotlin is awesome!", "Learning basic syntax."],
      note: "print() একই লাইনে আউটপুট জোড়া লাগায় এবং println() আউটপুটের পর নতুন লাইন তৈরি করে।",
    },
    importantNotes: {
      title: "6. Important Notes / Common Mistakes",
      items: [
        {
          id: 1,
          title: "1. print() এবং println() গুলিয়ে ফেলা",
          desc: "print(\"A\") এবং print(\"B\") লিখলে পাশাপাশি AB আউটপুট আসবে। কিন্তু println(\"A\") এবং println(\"B\") লিখলে আলাদা দুটি লাইনে আসবে।",
        },
        {
          id: 2,
          title: "2. অপ্রয়োজনীয় সেমিকোলন (;) দেওয়া",
          correct: 'println("Hello")',
          wrong: 'println("Hello");',
          note: "Kotlin-এ সেমিকোলন ছাড়া কোড লেখাই সেরা অভ্যাস (Best Practice)।",
        },
        {
          id: 3,
          title: "3. Indentation বা সাজানো ঠিক না রাখা",
          desc: "{ }-এর ভেতরের কোড সাধারণত ৪টি স্পেস বা ১টি ট্যাব ভেতরে সরিয়ে লেখা হয়। এতে কোড সহজে পড়া যায়।",
        },
        {
          id: 4,
          title: "4. কার্লি ব্র্যাকেট { } এর জোড়া না মেলানো",
          desc: "প্রতিটি ওপেনিং ব্র্যাকেট {-এর জন্য অবশ্যই একটি ক্লোজিং ব্র্যাকেট } থাকতে হবে। কোনো একটি বাদ পড়লে Syntax Error হবে।",
        },
      ],
    },
    practiceTask: {
      title: "7. ছোট Practice Task",
      instruction: "নিজে একটি Kotlin program লিখো যেটি নিচের মতো আউটপুট দেবে:",
      outputLines: [
        "Welcome to Kotlin syntax practice.",
        "Name: Shihab | Role: Student",
      ],
      condition: "শর্ত: \"Name: Shihab | \" এবং \"Role: Student\" অংশ দুটিকে দুটি আলাদা print() অথবা println() স্টেটমেন্ট দিয়ে একই লাইনে আউটপুট আনতে হবে।",
    },
  },

  "fundamentals/variables-val-var": {
    conceptExplanation: {
      title: "১. সহজ বাংলায় Concept Explanation",
      paragraphs: [
        "প্রোগ্রামিংয়ে কোনো তথ্য বা ডেটা ধরে রাখার জন্য পাত্রের প্রয়োজন হয়। সেই পাত্রকেই বলা হয় Variable (ভেরিয়েবল)।",
        "উদাহরণস্বরূপ, আপনি যদি কারো বয়স, নাম বা কোনো হিসাব মেমরিতে সংরক্ষণ করতে চান, তবে ভেরিয়েবল ব্যবহার করবেন।",
        "Kotlin-এ ভেরিয়েবল তৈরি করার জন্য দুটি প্রধান keyword রয়েছে: val এবং var।",
        "val (Value বা Read-only): val দিয়ে তৈরি করা ভেরিয়েবলে একবার মান দিলে তা আর পরিবর্তন (reassign) করা যায় না। এটি অপরিবর্তনীয় (immutable)।",
        "var (Variable বা Mutable): var দিয়ে তৈরি করা ভেরিয়েবলের মান প্রয়োজনে পরবর্তীতে যতবার ইচ্ছা পরিবর্তন করা যায়।",
        "Kotlin-এর সেরা নিয়ম: সবসময় প্রথমে val ব্যবহার করার চেষ্টা করুন। কেবল যখন মান সত্যিই পরিবর্তনের দরকার হবে, তখনই var ব্যবহার করুন। এতে কোডে অপ্রত্যাশিত বাগ তৈরি হয় না।",
      ],
    },
    keyPoints: {
      title: "২. Key Points",
      points: [
        "val মানে হলো read-only বা immutable (মান পরিবর্তন করা যায় না)।",
        "var মানে হলো mutable (মান প্রয়োজন অনুযায়ী পরিবর্তনযোগ্য)।",
        "Kotlin-এ ভেরিয়েবলের নাম অর্থপূর্ণ হওয়া উচিত এবং camelCase নিয়মে লেখা ভালো (যেমন: userAge, studentScore)।",
        "ভেরিয়েবলে একবার নির্দিষ্ট টাইপের মান রাখলে পরবর্তীতে অন্য টাইপের ডেটা রাখা যায় না।",
        "নিরাপদ কোড লেখার জন্য অপ্রয়োজনে var ব্যবহার পরিহার করে val ব্যবহার করাই Kotlin-এর প্রধান সুপারিশ।",
      ],
    },
    syntax: {
      title: "৩. Kotlin Syntax",
      intro: "Kotlin-এ val এবং var দিয়ে ভেরিয়েবল ডিক্লেয়ার করার মৌলিক গঠন:",
      code: `val name = "Shihab"
var score = 10`,
      items: [
        { term: "val", desc: "অপরিবর্তনশীল (read-only) ভেরিয়েবল ঘোষণার keyword।" },
        { term: "name", desc: "ভেরিয়েবলের নাম (Identifier)।" },
        { term: "=", desc: "Assignment operator (ডানপাশের মান বামের পাত্রে জমা করে)।" },
        { term: '"Shihab"', desc: "ভেরিয়েবলে সংরক্ষিত স্ট্রিং ভ্যালু।" },
        { term: "var", desc: "পরিবর্তনশীল (mutable) ভেরিয়েবল ঘোষণার keyword।" },
        { term: "score", desc: "ভেরিয়েবলের নাম যার মান পরে পরিবর্তন করা যাবে।" },
      ],
      note: "মনে রাখবেন, val এবং var উভয় ক্ষেত্রেই ডেটার টাইপ উল্লেখ করা বাধ্যতামূলক নয়; Kotlin স্বয়ংক্রিয়ভাবে টাইপ চিনে নেয়।",
    },
    codeExample: {
      title: "৪. Code Example",
      code: `fun main() {
    // val দিয়ে অপরিবর্তনশীল ভেরিয়েবল
    val birthYear = 2002
    println(birthYear)

    // var দিয়ে পরিবর্তনশীল ভেরিয়েবল
    var currentAge = 22
    println(currentAge)

    // age-এর মান পরিবর্তন করছি
    currentAge = 23
    println(currentAge)
}`,
      explanations: [
        "birthYear হলো একটি val ভেরিয়েবল। এটি একবার 2002 নির্ধারণ করার পর আর বদলানো যাবে না।",
        "currentAge হলো একটি var ভেরিয়েবল। শুরুতে এর মান 22 ছিল।",
        "পরের লাইনে currentAge = 23 লিখে এর মান পরিবর্তন করা হয়েছে এবং নতুন মান কনসোলে প্রিন্ট হয়েছে।",
      ],
    },
    expectedOutput: {
      title: "৫. Expected Output",
      lines: [
        "2002",
        "22",
        "23",
      ],
      note: "আউটপুটে দেখা যাচ্ছে প্রথমে birthYear ও currentAge প্রিন্ট হয়েছে, এবং পরে পরিবর্তিত currentAge-এর মান 23 প্রদর্শিত হয়েছে।",
    },
    importantNotes: {
      title: "৬. Important Notes / Common Mistakes",
      items: [
        {
          id: 1,
          title: "১. val-এর মান পরিবর্তনের চেষ্টা করা",
          desc: "val দিয়ে তৈরি ভেরিয়েবলের মান পুনরায় পরিবর্তন করতে গেলে Kotlin Compiler সরাসরি এরর দেবে:",
          wrong: "val country = \"BD\"\ncountry = \"UK\" // Error: Val cannot be reassigned",
          correct: "var country = \"BD\"\ncountry = \"UK\" // Correct if changing is needed",
        },
        {
          id: 2,
          title: "২. ডেটার টাইপ বদলে ফেলার চেষ্টা করা",
          desc: "var পরিবর্তনযোগ্য হলেও তার ডেটা টাইপ পরিবর্তন করা যায় না। Int ভেরিয়েবলে String বসানো সম্ভব নয়:",
          wrong: "var score = 100\nscore = \"Passed\" // Type mismatch error!",
          correct: "var score = 100\nscore = 150 // Only Int values allowed",
        },
        {
          id: 3,
          title: "৩. সব জায়গায় নির্বিচারে var ব্যবহার করা",
          desc: "অন্যান্য কিছু ভাষার অভ্যাসের কারণে সব জায়গায় var লিখলে কোড অনিরাপদ হয়ে পড়ে। নিশ্চিত না হলে সবসময় val লিখুন।",
        },
      ],
    },
    practiceTask: {
      title: "৭. ছোট Practice Task",
      instruction: "একটি Kotlin program লিখো যেখানে:\n১. তোমার দেশের নাম একটি val ভেরিয়েবলে রাখবে।\n২. তোমার জমানো কয়েন সংখ্যা (যেমন: 50) একটি var ভেরিয়েবলে রাখবে।\n৩. প্রথমে দেশের নাম ও কয়েন প্রিন্ট করবে।\n৪. এরপর কয়েনের সংখ্যা বাড়িয়ে 100 করবে এবং পুনরায় কয়েন সংখ্যা প্রিন্ট করবে।",
      outputLines: [
        "Bangladesh",
        "50",
        "100",
      ],
      condition: "শর্ত: দেশের নামের জন্য অবশ্যই val এবং কয়েন পরিবর্তনের জন্য var ব্যবহার করতে হবে।",
    },
  },

  "fundamentals/data-types": {
    conceptExplanation: {
      title: "১. সহজ বাংলায় Concept Explanation",
      paragraphs: [
        "ডেটা টাইপ বলতে বোঝায় কোনো ভেরিয়েবলে কী ধরণের তথ্য সংরক্ষিত আছে—এটি কি পূর্ণসংখ্যা, নাকি দশমিক সংখ্যা, নাকি কোনো লেখা?",
        "Kotlin একটি Statically Typed Language। অর্থাৎ প্রতিটি ভেরিয়েবলের একটি সুনির্দিষ্ট ডেটা টাইপ থাকে যা কম্পাইল সময়েই নির্ধারিত হয়।",
        "Kotlin-এর সবচেয়ে চমৎকার দিক হলো: এখানে Java-এর মতো কোনো আদিম টাইপ (primitive types) নেই; সবকিছুই Object হিসেবে কাজ করে।",
        "প্রধান বেসিক ডেটা টাইপগুলো হলো:",
        "১. Numbers (সংখ্যা): Int (সাধারণ পূর্ণসংখ্যা), Long (বড় পূর্ণসংখ্যা), Float (কম মেমরির দশমিক সংখ্যা), Double (সাধারণ ও নির্ভুল দশমিক সংখ্যা)।",
        "২. Boolean (সত্য/মিথ্যা): কেবল true অথবা false মান ধারণ করে।",
        "৩. Char (একক অক্ষর): একটি মাত্র বর্ণ যা সিঙ্গেল কোটেশনের (' ') মধ্যে থাকে।",
        "৪. String (লেখা বা টেক্সট): এক বা একাধিক অক্ষরের সমষ্টি যা ডাবল কোটেশনের (\" \") মধ্যে থাকে।",
      ],
    },
    keyPoints: {
      title: "২. Key Points",
      points: [
        "সাধারণ পূর্ণসংখ্যার জন্য Int ব্যবহার করা হয় (যেমন: 25, 1000)।",
        "খুব বড় পূর্ণসংখ্যার ক্ষেত্রে Long ব্যবহার করা হয় এবং সংখ্যার শেষে L লেখা হয় (যেমন: 10000000000L)।",
        "দশমিক সংখ্যার ক্ষেত্রে ডিফল্ট হিসেবে Double ব্যবহার করা হয় (যেমন: 3.1416, 99.5)।",
        "Float ব্যবহারের সময় সংখ্যার শেষে অবশ্যই F বা f লিখতে হয় (যেমন: 5.75F)।",
        "Char-এর জন্য সিঙ্গেল কোটেশন ('A') এবং String-এর জন্য ডাবল কোটেশন (\"Hello\") ব্যবহৃত হয়।",
        "Boolean শুধুমাত্র দুটি মান গ্রহণ করে: true এবং false।",
      ],
    },
    syntax: {
      title: "৩. Kotlin Syntax",
      intro: "Explicitly (সরাসরি) ডেটা টাইপ উল্লেখ করে ভেরিয়েবল ডিক্লেয়ার করার নিয়ম:",
      code: `val age: Int = 22
val pi: Double = 3.1416
val grade: Char = 'A'
val isStudent: Boolean = true
val name: String = "Shihab"`,
      items: [
        { term: "Int", desc: "পূর্ণসংখ্যা ডেটা টাইপ।" },
        { term: "Double", desc: "দশমিক ভগ্নাংশের নির্ভুল ডেটা টাইপ।" },
        { term: "Char", desc: "একক অক্ষর (Single Quote দিয়ে লেখা হয়)।" },
        { term: "Boolean", desc: "লজিক্যাল সত্য বা মিথ্যা (true / false)।" },
        { term: "String", desc: "টেক্সট বা বর্ণমালার সমষ্টি (Double Quote দিয়ে লেখা হয়)।" },
      ],
      note: "ভেরিয়েবলের নামের পর কোলন (:) দিয়ে টাইপের নাম লিখতে হয়।",
    },
    codeExample: {
      title: "৪. Code Example",
      code: `fun main() {
    val studentId: Int = 101
    val cgpa: Double = 3.85
    val section: Char = 'A'
    val isEnrolled: Boolean = true
    val courseName: String = "Kotlin Essentials"

    println(studentId)
    println(cgpa)
    println(section)
    println(isEnrolled)
    println(courseName)
}`,
      explanations: [
        "এখানে ৫টি ভিন্ন ভিন্ন মৌলিক ডেটা টাইপের ভেরিয়েবল তৈরি করা হয়েছে।",
        "studentId হলো Int, cgpa হলো Double, section হলো Char, isEnrolled হলো Boolean এবং courseName হলো String।",
        "println() দিয়ে প্রতিটি ভেরিয়েবলের মান আলাদা লাইনে সুন্দরভাবে কনসোলে প্রিন্ট করা হয়েছে।",
      ],
    },
    expectedOutput: {
      title: "৫. Expected Output",
      lines: [
        "101",
        "3.85",
        "A",
        "true",
        "Kotlin Essentials",
      ],
      note: "আউটপুটে প্রতিটি ডেটা টাইপের নিজস্ব মান নির্ভুলভাবে দেখা যাচ্ছে।",
    },
    importantNotes: {
      title: "৬. Important Notes / Common Mistakes",
      items: [
        {
          id: 1,
          title: "১. Char-এ ডাবল কোটেশন ব্যবহার করা",
          desc: "Char-এর জন্য অবশ্যই সিঙ্গেল কোটেশন (' ') ব্যবহার করতে হবে। ডাবল কোটেশন দিলে তা String হয়ে যাবে এবং টাইপ মিসম্যাচ এরর আসবে।",
          wrong: "val letter: Char = \"A\" // Compilation error!",
          correct: "val letter: Char = 'A'   // Correct",
        },
        {
          id: 2,
          title: "২. Float-এ 'F' প্রত্যয় না দেওয়া",
          desc: "দশমিক সংখ্যা লিখলে Kotlin তাকে ডিফল্টভাবে Double মনে করে। Float বানাতে হলে শেষে 'F' যোগ করতে হয়।",
          wrong: "val rate: Float = 4.5   // Error: Double cannot be assigned to Float",
          correct: "val rate: Float = 4.5F  // Correct",
        },
        {
          id: 3,
          title: "৩. Boolean-কে কোটেশনের মধ্যে লেখা",
          desc: "true বা false-কে কোটেশন দিয়ে \"true\" লিখলে সেটি টেক্সট বা String হয়ে যায়, Boolean থাকে না।",
          wrong: "val isReady: Boolean = \"true\" // Error",
          correct: "val isReady: Boolean = true   // Correct",
        },
      ],
    },
    practiceTask: {
      title: "৭. ছোট Practice Task",
      instruction: "নিজের সম্পর্কে ৫টি তথ্য ৫টি ভিন্ন ডেটা টাইপ দিয়ে তৈরি করো এবং প্রিন্ট করো:\n১. তোমার বয়স (Int)\n২. তোমার উচ্চতা (Double)\n৩. রক্তের গ্রুপের প্রথম অক্ষর যেমন 'B' বা 'O' (Char)\n৪. তুমি কি কোডিং ভালোবাসো? (Boolean)\n৫. তোমার প্রিয় প্রোগ্রামিং ভাষার নাম (String)",
      outputLines: [
        "22",
        "5.9",
        "B",
        "true",
        "Kotlin",
      ],
      condition: "শর্ত: প্রতিটি ভেরিয়েবলে কোলন (:) দিয়ে টাইপের নাম স্পষ্টভাবে উল্লেখ করতে হবে (Explicit type)।",
    },
  },

  "fundamentals/type-inference": {
    conceptExplanation: {
      title: "১. সহজ বাংলায় Concept Explanation",
      paragraphs: [
        "Type Inference মানে হলো টাইপ অনুমান বা চিহ্নিত করার ক্ষমতা।",
        "কোটলিন কম্পাইলার অত্যন্ত বুদ্ধিমান। কোনো ভেরিয়েবল তৈরি করার সময় যদি আপনি তার ডেটা টাইপ নাও বলে দেন, তবুও ভ্যালু বা মান দেখে কোটলিন স্বয়ংক্রিয়ভাবে বুঝে নেয় তার টাইপ কী।",
        "যেমন: আপনি যদি লেখেন val score = 100, কোটলিন সাথে সাথে বুঝে যায় যে score-এর ডেটা টাইপ হলো Int।",
        "এর ফলে কোড অনেক সংক্ষিপ্ত, পরিষ্কার ও সহজে পড়ার উপযোগী হয়। বারবার : Int বা : String লেখার বাড়তি ঝামেলা পোহাতে হয় না।",
        "তবে মনে রাখবেন, কোটলিন টাইপ অনুমান করে নিলেও এটি Statically Typed। অর্থাৎ একবার টাইপ নির্ধারিত হয়ে গেলে সেই ভেরিয়েবলে অন্য টাইপের ডেটা রাখা যায় না।",
      ],
    },
    keyPoints: {
      title: "২. Key Points",
      points: [
        "Type Inference-এর জন্য ভেরিয়েবলের সাথে টাইপ স্পষ্টভাবে না লিখলেও কোটলিন নিজে টাইপ বুঝে নেয়।",
        "মান বসানোর সাথে সাথেই কম্পাইলার ভেরিয়েবলের টাইপ ফিক্স করে ফেলে।",
        "টাইপ ইনফারেন্স হলেও এটি ডায়নামিক ভাষা নয়; পরবর্তীতে অন্য টাইপের মান বসানো সম্ভব নয়।",
        "পেশাদার Kotlin কোডে অনাবশ্যক টাইপ উল্লেখ না করে Type Inference ব্যবহারের পরামর্শ দেওয়া হয়।",
        "শুধুমাত্র যখন ইনিশিয়াল ভ্যালু ছাড়া ভেরিয়েবল ঘোষণা করা হয়, তখনই টাইপ উল্লেখ করা বাধ্যতামূলক।",
      ],
    },
    syntax: {
      title: "৩. Kotlin Syntax",
      intro: "টাইপ ছাড়া সরাসরি মান বসিয়ে Type Inference-এর ব্যবহার:",
      code: `val language = "Kotlin" // Compiler বুঝে নেয় String
val year = 2011          // Compiler বুঝে নেয় Int
val rating = 4.9         // Compiler বুঝে নেয় Double
val isModern = true      // Compiler বুঝে নেয় Boolean`,
      items: [
        { term: "language", desc: '"Kotlin" দেখে টাইপ স্বয়ংক্রিয়ভাবে String হয়েছে।' },
        { term: "year", desc: '2011 দেখে টাইপ স্বয়ংক্রিয়ভাবে Int হয়েছে।' },
        { term: "rating", desc: '4.9 দেখে টাইপ স্বয়ংক্রিয়ভাবে Double হয়েছে।' },
        { term: "isModern", desc: 'true দেখে টাইপ স্বয়ংক্রিয়ভাবে Boolean হয়েছে।' },
      ],
      note: "কোটলিন কোডকে স্লিম ও এলিগ্যান্ট রাখতে Type Inference অন্যতম প্রধান বৈশিষ্ট্য।",
    },
    codeExample: {
      title: "৪. Code Example",
      code: `fun main() {
    // কোনো টাইপ উল্লেখ করা ছাড়াই ভেরিয়েবল তৈরি
    val title = "Kotlin Android App"
    val downloads = 50000
    val rating = 4.8
    val isOpenSource = true

    println(title)
    println(downloads)
    println(rating)
    println(isOpenSource)
}`,
      explanations: [
        "এখানে কোনো ভেরিয়েবলেই : String বা : Int লেখা হয়নি।",
        "মান দেখে কোটলিন নিজ দায়িত্বে সঠিক টাইপ নির্ধারণ করেছে এবং কোনো সমস্যা ছাড়াই কোড সফলভাবে রান হয়েছে।",
      ],
    },
    expectedOutput: {
      title: "৫. Expected Output",
      lines: [
        "Kotlin Android App",
        "50000",
        "4.8",
        "true",
      ],
      note: "আউটপুটে স্বাভাবিকভাবেই সব মান প্রদর্শিত হয়েছে।",
    },
    importantNotes: {
      title: "৬. Important Notes / Common Mistakes",
      items: [
        {
          id: 1,
          title: "১. মান ছাড়া ভেরিয়েবল ঘোষণা করলে টাইপ না দেওয়া",
          desc: "যদি আপনি কোনো ভ্যালু সাথে সাথে এসাইন না করেন, তখন কম্পাইলার টাইপ অনুমান করতে পারে না। সেক্ষেত্রে টাইপ দেওয়া আবশ্যক:",
          wrong: "val score // Error: This variable must either have a type annotation or be initialized",
          correct: "val score: Int // Correct: টাইপ উল্লেখ করে পরে মান দেওয়া যাবে",
        },
        {
          id: 2,
          title: "২. ইনফার হওয়া টাইপের বিপরীতে অন্য ডেটা রাখা",
          desc: "টাইপ ইনফারেন্সে একবার Int নির্ধারিত হয়ে গেলে তাতে String রাখা যাবে না:",
          wrong: "var count = 10\ncount = \"Ten\" // Error: Type mismatch",
          correct: "var count = 10\ncount = 20    // Correct",
        },
      ],
    },
    practiceTask: {
      title: "৭. ছোট Practice Task",
      instruction: "কোনো ধরনের ডেটা টাইপ উল্লেখ না করে (Type Inference ব্যবহার করে) নিচের তিনটি ভেরিয়েবল তৈরি করো:\n১. প্রিয় অ্যাপের নাম\n২. অ্যাপের বর্তমান ভার্সন নাম্বার (যেমন: 3)\n৩. অ্যাপের ইউজার রেটিং (যেমন: 4.7)\nসবশেষে println() দিয়ে তিনটি মান প্রদর্শন করো।",
      outputLines: [
        "Telegram",
        "3",
        "4.7",
      ],
      condition: "শর্ত: ভেরিয়েবল লেখার সময় কোনো কোলন (:) বা টাইপ নাম ব্যবহার করা যাবে না।",
    },
  },

  "fundamentals/type-conversion": {
    conceptExplanation: {
      title: "১. সহজ বাংলায় Concept Explanation",
      paragraphs: [
        "Type Conversion (বা Type Casting) হলো একটি ডেটা টাইপের মানকে অন্য একটি ডেটা টাইপে রূপান্তর করার প্রক্রিয়া।",
        "অনেক প্রোগ্রামিং ভাষায় (যেমন Java বা C++) ছোট সংখ্যা স্বয়ংক্রিয়ভাবে বড় সংখ্যায় রূপান্তর হয়ে যায় (Implicit Conversion)। কিন্তু Kotlin-এ কোনো হিডেন বা অটোমেটিক রূপান্তর হয় না!",
        "Kotlin-এ টাইপ কনভার্সন সবসময় স্পষ্ট (Explicit) হতে হয়। অর্থাৎ আপনাকে সুনির্দিষ্ট ফাংশন ডেকে রূপান্তর করতে হবে।",
        "যেমন: একটি Int সংখ্যাকে Double বানাতে চাইলে আপনাকে স্পষ্ট করে toDouble() ফাংশনটি কল করতে হবে।",
        "এই নিয়মের কারণে কোটলিনে অপ্রত্যাশিত ডেটা লস বা অদৃশ্য ভুলের কোনো সুযোগ থাকে না, কোড অত্যন্ত সুরক্ষিত ও নির্ভরযোগ্য থাকে।",
      ],
    },
    keyPoints: {
      title: "২. Key Points",
      points: [
        "Kotlin-এ ছোট সংখ্যাও স্বয়ংক্রিয়ভাবে বড় সংখ্যায় রূপান্তরিত হয় না (No implicit widening conversion)।",
        "প্রতিটি সংখ্যা টাইপের সাথে রূপান্তরের জন্য বিল্ট-ইন ফাংশন রয়েছে (যেমন: toInt(), toDouble(), toLong(), toFloat(), toString())।",
        "Double বা Float থেকে Int-এ কনভার্ট করলে দশমিকের পরের অংশ সম্পূর্ণরূপে বাদ পড়ে যায় (Truncation)।",
        "সংখ্যার স্ট্রিং যেমন \"120\"-কে toInt() ফাংশন দিয়ে সহজেই সংখ্যায় রূপান্তর করা যায়।",
        "সরাসরি টেক্সটকে সংখ্যায় রূপান্তর করার সময় টেক্সটটি বৈধ সংখ্যা না হলে NumberFormatException হতে পারে।",
      ],
    },
    syntax: {
      title: "৩. Kotlin Syntax",
      intro: "Kotlin-এর বিল্ট-ইন কনভার্সন ফাংশনসমূহ ব্যবহারের সাধারণ নিয়ম:",
      code: `val a: Int = 10
val b: Double = a.toDouble() // Int থেকে Double

val str: String = "250"
val num: Int = str.toInt()    // String থেকে Int`,
      items: [
        { term: "toDouble()", desc: "সংখ্যাকে দশমিকযুক্ত Double-এ রূপান্তর করে।" },
        { term: "toInt()", desc: "মানকে পূর্ণসংখ্যা Int-এ রূপান্তর করে।" },
        { term: "toLong()", desc: "মানকে বড় পূর্ণসংখ্যা Long-এ রূপান্তর করে।" },
        { term: "toString()", desc: "যেকোনো ডেটাকে টেক্সট বা String-এ রূপান্তর করে।" },
      ],
      note: "ভেরিয়েবলের পর ডট (.) দিয়ে কনভার্সন ফাংশনটির নাম কল করতে হয়।",
    },
    codeExample: {
      title: "৪. Code Example",
      code: `fun main() {
    val itemsCount: Int = 5
    val averageItems: Double = itemsCount.toDouble()

    val regularPrice: Double = 99.85
    val discountPrice: Int = regularPrice.toInt()

    val amountString: String = "500"
    val totalAmount: Int = amountString.toInt() + 100

    println(averageItems)
    println(discountPrice)
    println(totalAmount)
}`,
      explanations: [
        "itemsCount.toDouble() কল করায় পূর্ণসংখ্যা 5 রূপান্তরিত হয়ে 5.0 হয়েছে।",
        "regularPrice.toInt() করায় 99.85-এর দশমিক অংশ বাদ গিয়ে 99 হয়েছে।",
        "amountString.toInt() কল করায় স্ট্রিং \"500\" সংখ্যা 500 হয়ে গেছে এবং এর সাথে 100 যোগ হয়ে 600 হয়েছে।",
      ],
    },
    expectedOutput: {
      title: "৫. Expected Output",
      lines: [
        "5.0",
        "99",
        "600",
      ],
      note: "আউটপুটে দেখা যাচ্ছে দশমিক যোগ হওয়া, দশমিক বাদ পড়া এবং স্ট্রিং থেকে সংখ্যায় যোগফল সফলভাবে হয়েছে।",
    },
    importantNotes: {
      title: "৬. Important Notes / Common Mistakes",
      items: [
        {
          id: 1,
          title: "১. অটোমেটিক কনভার্সনের আশা করা",
          desc: "জাভার মতো Kotlin-এ Int সরাসরি Double ভেরিয়েবলে জমা হয় না। সরাসরি বসালে এরর হবে:",
          wrong: "val x: Int = 10\nval y: Double = x // Error: Type mismatch!",
          correct: "val x: Int = 10\nval y: Double = x.toDouble() // Correct",
        },
        {
          id: 2,
          title: "২. অ-সংখ্যা টেক্সটকে toInt() করা",
          desc: "যদি স্ট্রিং-এর ভেতর বর্ণ বা অন্য চিহ্ন থাকে, তখন toInt() দিলে অ্যাপ ক্র্যাশ করবে:",
          wrong: "val text = \"abc\"\nval num = text.toInt() // NumberFormatException!",
          correct: "val text = \"123\"\nval num = text.toInt() // Safe",
        },
        {
          id: 3,
          title: "৩. দশমিক সংখ্যা রূপান্তরের সময় ডেটা ট্রাংকেশন ভুলে যাওয়া",
          desc: "Double-কে Int বানালে এটি রাউন্ড (Round) করে না, বরং দশমিকের পর যা-ই থাকুক তা ফেলে দেয়। যেমন: 9.99 কনভার্ট করলে 9 হবে, 10 নয়।",
        },
      ],
    },
    practiceTask: {
      title: "৭. ছোট Practice Task",
      instruction: "নিচের কাজ দুটি সম্পন্ন করার জন্য একটি কোড লিখো:\n১. একটি Double ভেরিয়েবলে 45.75 নাও এবং সেটিকে toInt() দিয়ে পূর্ণসংখ্যায় রূপান্তর করে প্রিন্ট করো।\n২. একটি String ভেরিয়েবলে \"250\" নাও এবং সেটিকে toInt() করে তার সাথে 50 যোগ করে যোগফল প্রিন্ট করো।",
      outputLines: [
        "45",
        "300",
      ],
      condition: "শর্ত: স্ট্রিং-এর সাথে 50 যোগ করার আগে অবশ্যই toInt() ব্যবহার করতে হবে।",
    },
  },

  "fundamentals/operators": {
    conceptExplanation: {
      title: "১. সহজ বাংলায় Concept Explanation",
      paragraphs: [
        "প্রোগ্রামিংয়ে কোনো ভ্যালু বা ভেরিয়েবলের মধ্যে হিসাব-নিকাশ, তুলনা বা কোনো সিদ্ধান্ত নেওয়ার জন্য যে বিশেষ চিহ্নগুলো ব্যবহার করা হয়, তাদের Operator (অপারেটর) বলা হয়।",
        "উদাহরণস্বরূপ, 10 + 5-এ + হলো একটি অপারেটর এবং 10 ও 5 হলো অপারেন্ড (operands)।",
        "Kotlin-এ প্রধানত কয়েক ধরণের অপারেটর বহুল ব্যবহৃত হয়:",
        "১. Arithmetic Operators (পাটিগণিতীয়): যোগ (+), বিয়োগ (-), গুণ (*), ভাগ (/), এবং ভাগশেষ বা মডুলাস (%)।",
        "২. Comparison Operators (তুলনামূলক): সমান (==), অসমান (!=), বড় (>), ছোট (<), বড় বা সমান (>=), ছোট বা সমান (<=)। এরা সবসময় Boolean (true অথবা false) রিটার্ন করে।",
        "৩. Assignment Operators (মান নির্ধারণকারী): =, +=, -=, *=, /= ইত্যাদি।",
        "৪. Logical Operators (যৌক্তিক): এবং (&&), অথবা (||), এবং বিপরীত (!)।",
        "৫. Increment / Decrement: মান ১ বাড়ানোর জন্য ++ এবং ১ কমানোর জন্য --।",
      ],
    },
    keyPoints: {
      title: "২. Key Points",
      points: [
        "দুটি পূর্ণসংখ্যা (Int) ভাগ করলে ফলাফল সবসময় পূর্ণসংখ্যা হয় (যেমন: 5 / 2 এর মান 2, 2.5 নয়)।",
        "দশমিক ভাগফল পেতে চাইলে যেকোনো একটি অপারেন্ডকে Double বা Float হতে হয় (যেমন: 5.0 / 2 = 2.5)।",
        "ভাগশেষ পাওয়ার জন্য মডুলাস (%) অপারেটর ব্যবহৃত হয় (যেমন: 7 % 3 = 1)।",
        "সমতা যাচাই করার জন্য একক সমান (=) নয়, বরং ডাবল সমান (==) ব্যবহার করতে হয়।",
        "লজিক্যাল && (AND) অপারেশনে উভয় শর্ত সত্য হলেই সত্য হয়, আর || (OR) অপারেশনে যেকোনো একটি শর্ত সত্য হলেই সত্য হয়।",
      ],
    },
    syntax: {
      title: "৩. Kotlin Syntax",
      intro: "Kotlin-এ বিভিন্ন অপারেটর লেখার সাধারণ নিয়মাবলী:",
      code: `val sum = 10 + 5        // যোগ (15)
val remainder = 10 % 3  // ভাগশেষ (1)
val isEqual = (10 == 5) // তুলনা (false)
var count = 0
count++                 // ইনক্রিমেন্ট (1)`,
      items: [
        { term: "+, -, *, /", desc: "যোগ, বিয়োগ, গুণ ও ভাগের গাণিতিক অপারেটর।" },
        { term: "%", desc: "মডুলাস বা ভাগশেষ বের করার অপারেটর।" },
        { term: "==", desc: "উভয় পাশের মান সমান কিনা যাচাই করে (true / false)।" },
        { term: "!=", desc: "উভয় পাশের মান অসমান কিনা যাচাই করে।" },
        { term: "&&", desc: "লজিক্যাল AND — দুই পাশের শর্ত সত্য হলে সত্য।" },
        { term: "||", desc: "লজিক্যাল OR — যেকোনো একটি শর্ত সত্য হলেই সত্য।" },
      ],
      note: "Kotlin-এ গাণিতিক অপারেটরগুলো মেথড হিসেবেও কাজ করে (যেমন: a + b আসলে a.plus(b) হিসেবে কার্যকর হয়)।",
    },
    codeExample: {
      title: "৪. Code Example",
      code: `fun main() {
    val a = 20
    val b = 6

    // পাটিগণিতীয় অপারেশন
    val sum = a + b
    val difference = a - b
    val product = a * b
    val division = a / b
    val remainder = a % b

    println(sum)
    println(difference)
    println(product)
    println(division)
    println(remainder)

    // লজিক্যাল ও তুলনা
    val isGreater = a > b
    val bothPositive = (a > 0) && (b > 0)

    println(isGreater)
    println(bothPositive)
}`,
      explanations: [
        "a + b দ্বারা 20 ও 6 যোগ করে 26 হয়েছে।",
        "a / b দুটিই Int হওয়ায় 20 / 6 এর ফলাফল শুধু পূর্ণসংখ্যা 3 এসেছে (দশমিক বাদ)।",
        "a % b দ্বারা 20 কে 6 দিয়ে ভাগ করার পর অবশিষ্ট বা ভাগশেষ 2 পাওয়া গেছে।",
        "a > b সত্য হওয়ায় true এবং બંને সংখ্যা ধনাত্মক হওয়ায় (a > 0) && (b > 0) সত্য হয়েছে।",
      ],
    },
    expectedOutput: {
      title: "৫. Expected Output",
      lines: [
        "26",
        "14",
        "120",
        "3",
        "2",
        "true",
        "true",
      ],
      note: "আউটপুটে লক্ষ্য করুন পূর্ণসংখ্যার ভাগফল (20 / 6) সবসময় 3 আসছে।",
    },
    importantNotes: {
      title: "৬. Important Notes / Common Mistakes",
      items: [
        {
          id: 1,
          title: "১. পূর্ণসংখ্যার ভাগের ফাঁদ (Integer Division Trap)",
          desc: "Int-কে Int দিয়ে ভাগ করলে কোটলিন দশমিক মান কেটে ফেলে। 5 / 2 লিখলে 2.5 নয়, 2 আসবে:",
          wrong: "val result = 5 / 2 // result এর মান 2",
          correct: "val result = 5.0 / 2 // result এর মান 2.5",
        },
        {
          id: 2,
          title: "২. = এবং == গুলিয়ে ফেলা",
          desc: "= দিয়ে মান সংরক্ষণ (Assignment) করা হয়, আর == দিয়ে দুটি মান সমান কিনা তুলনা (Comparison) করা হয়:",
          wrong: "if (x = 10) // ভুল: সিনট্যাক্স এরর",
          correct: "if (x == 10) // সঠিক: তুলনা করা হচ্ছে",
        },
        {
          id: 3,
          title: "৩. শূন্য দিয়ে ভাগ (Division by zero)",
          desc: "পূর্ণসংখ্যাকে 0 দিয়ে ভাগ করলে রানটাইমে ArithmeticException ক্র্যাশ ঘটবে (যেমন: 10 / 0)।",
        },
      ],
    },
    practiceTask: {
      title: "৭. ছোট Practice Task",
      instruction: "একটি ছোট ক্যালকুলেটর প্রোগ্রাম লিখো যেখানে:\n১. দুটি ভেরিয়েবল num1 = 15 এবং num2 = 4 নেবে।\n২. এদের গুণফল প্রিন্ট করবে।\n৩. এদের ভাগশেষ (%) প্রিন্ট করবে।\n৪. num1 কি num2 এর চেয়ে বড় কিনা (num1 > num2) তা সত্য/মিথ্যা হিসেবে প্রিন্ট করবে।",
      outputLines: [
        "60",
        "3",
        "true",
      ],
      condition: "শর্ত: সব হিসাব সরাসরি println()-এর ভেতর বা ভেরিয়েবলে অপারেটর দিয়ে সম্পন্ন করতে হবে।",
    },
  },

  "fundamentals/strings-string-templates": {
    conceptExplanation: {
      title: "১. সহজ বাংলায় Concept Explanation",
      paragraphs: [
        "প্রোগ্রামিংয়ে যেকোনো বর্ণমালা, শব্দ বা বাক্যকে String (স্ট্রিং) বলা হয়। কোটলিনে স্ট্রিং ডাবল কোটেশনের (\" \") মধ্যে লেখা হয়।",
        "অন্যান্য ভাষায় স্ট্রিংয়ের সাথে ভেরিয়েবল জুড়তে প্লাস (+) চিহ্ন দিয়ে জোড়াতালি (Concatenation) দিতে হয়, যা দেখতে জটিল ও ভুলপ্রবণ।",
        "কিন্তু Kotlin-এ রয়েছে আধুনিক ও ম্যাজিক্যাল বৈশিষ্ট্য: String Templates!",
        "স্ট্রিংয়ের ভেতরে সরাসরি ডলার চিহ্ন ($) বসিয়ে যেকোনো ভেরিয়েবলের মান প্রিন্ট করা যায়।",
        "আর যদি কোনো সমীকরণ বা এক্সপ্রেশন (যেমন: যোগফল বা মেথড কল) বসাতে চান, তবে ${expression} কার্লি ব্র্যাকেট ব্যবহার করতে হয়।",
        "এছাড়া একাধিক লাইনের দীর্ঘ টেক্সট লেখার জন্য ট্রিপল কোটেশন (\"\"\" ... \"\"\") দিয়ে Raw String তৈরি করা যায়।",
      ],
    },
    keyPoints: {
      title: "২. Key Points",
      points: [
        "একটি ভেরিয়েবলের মান স্ট্রিংয়ে দেখাতে $variableName ব্যবহার করা হয়।",
        "কোনো গাণিতিক হিসাব বা প্রপার্টি কল করতে ${expression} ব্যবহার করা হয় (যেমন: ${a + b})।",
        "String Templates ব্যবহারের ফলে কোনো প্লাস (+) চিহ্ন দিয়ে টেক্সট জোড়া লাগানোর দরকার পড়ে না।",
        "ডলার ($) চিহ্ন সরাসরি প্রিন্ট করতে চাইলে \\$ এস্কেপ ক্যারেক্টার ব্যবহার করতে হয়।",
        "ট্রিপল কোট (\"\"\" ... \"\"\") দিয়ে লেখা স্ট্রিংয়ে এস্কেপ ক্যারেক্টার লাগে না এবং হুবহু নতুন লাইন বজায় থাকে।",
      ],
    },
    syntax: {
      title: "৩. Kotlin Syntax",
      intro: "String Templates লেখার সঠিক নিয়মাবলী:",
      code: `val name = "Shihab"
val age = 22

// সাধারণ ভেরিয়েবল টেমপ্লেট
println("My name is $name")

// এক্সপ্রেশন বা হিসাবের জন্য কার্লি ব্র্যাকেট টেমপ্লেট
println("Next year I will be \${age + 1}")`,
      items: [
        { term: "$variable", desc: "স্ট্রিংয়ের ভেতরে সরাসরি ভেরিয়েবলের মান দেখানোর টেমপ্লেট।" },
        { term: "${expression}", desc: "হিসাব-নিকাশ বা জটিল এক্সপ্রেশনের ফলাফল স্ট্রিংয়ে বসানোর টেমপ্লেট।" },
        { term: '""" ... """', desc: "মাল্টিলাইন টেক্সটের জন্য Raw String।" },
        { term: "trimIndent()", desc: "মাল্টিলাইন স্ট্রিংয়ের বাড়তি ফাঁকা জায়গা সরিয়ে ক্লিন রাখার ফাংশন।" },
      ],
      note: "ভেরিয়েবলের সাথে যদি কোনো মেথড বা যোগ-বিয়োগ থাকে, তবে শুধু $ দিলে চলবে না, অবশ্যই ${ } দিতে হবে।",
    },
    codeExample: {
      title: "৪. Code Example",
      code: `fun main() {
    val language = "Kotlin"
    val version = 2.0
    val rating = 5

    // String Template দিয়ে সুন্দর আউটপুট
    println("Language: $language")
    println("Version: $version")
    println("Target Score: \${rating * 20}%")

    // মাল্টিলাইন টেক্সট উদাহরণ
    val info = """
        Welcome to $language!
        Enjoy modern programming.
    """.trimIndent()

    println(info)
}`,
      explanations: [
        "$language লেখার কারণে স্ট্রিংয়ের ভেতরে 'Kotlin' টেক্সটটি বসে গেছে।",
        "${rating * 20} লেখার কারণে 5 * 20 হিসাব হয়ে সরাসরি 100% প্রদর্শিত হয়েছে।",
        "trimIndent() ব্যবহারের ফলে মাল্টিলাইন টেক্সটের মার্জিন একদম বাম থেকে শুরু হয়েছে।",
      ],
    },
    expectedOutput: {
      title: "৫. Expected Output",
      lines: [
        "Language: Kotlin",
        "Version: 2.0",
        "Target Score: 100%",
        "Welcome to Kotlin!",
        "Enjoy modern programming.",
      ],
      note: "আউটপুটে দেখা যাচ্ছে স্ট্রিং টেমপ্লেট দিয়ে প্লাস চিহ্ন ছাড়া ক্লিন টেক্সট প্রিন্ট হয়েছে।",
    },
    importantNotes: {
      title: "৬. Important Notes / Common Mistakes",
      items: [
        {
          id: 1,
          title: "১. এক্সপ্রেশনে কার্লি ব্র্যাকেট { } না দেওয়া",
          desc: "যদি আপনি $age + 1 লেখেন, তবে কোটলিন শুধু $age-কে মান ধরে নিয়ে পাশে '+ 1' টেক্সট হিসেবে বসিয়ে দেবে:",
          wrong: "println(\"Age: $age + 1\") // আউটপুট: Age: 22 + 1",
          correct: "println(\"Age: ${age + 1}\") // আউটপুট: Age: 23",
        },
        {
          id: 2,
          title: "২. অবজেক্ট প্রপার্টিতে ব্র্যাকেট ভুলে যাওয়া",
          desc: "স্ট্রিংয়ের দৈর্ঘ্য দেখতে $name.length লিখলে কেবল $name প্রিন্ট হবে এবং .length টেক্সট হয়ে থাকবে:",
          wrong: "println(\"Length: $name.length\") // ভুল",
          correct: "println(\"Length: ${name.length}\") // সঠিক",
        },
        {
          id: 3,
          title: "৩. অপ্রয়োজনে প্লাস (+) দিয়ে স্ট্রিং জোড়া লাগানো",
          desc: "Java স্টাইলে 'Hello ' + name না লিখে কোটলিনের নিজস্ব কনভেনশন \"Hello $name\" ব্যবহার করাই উত্তম।",
        },
      ],
    },
    practiceTask: {
      title: "৭. ছোট Practice Task",
      instruction: "একটি Kotlin program লিখো যেখানে:\n১. item = \"Book\", price = 120, quantity = 3 ভেরিয়েবল নেবে।\n২. String Template ব্যবহার করে মোট দাম সহ একটি বিল লাইন প্রিন্ট করবে।",
      outputLines: [
        "Item: Book",
        "Unit Price: 120 BDT",
        "Total Bill: 360 BDT",
      ],
      condition: "শর্ত: মোট দাম বের করার জন্য কোনো বাড়তি ভেরিয়েবল না নিয়ে ${price * quantity} স্ট্রিং টেমপ্লেটের ভেতরেই সমাধান করতে হবে।",
    },
  },

  "fundamentals/comments-code-style": {
    conceptExplanation: {
      title: "১. সহজ বাংলায় Concept Explanation",
      paragraphs: [
        "কমেন্ট (Comment) হলো প্রোগ্রামের ভেতরে লেখা এমন কিছু নির্দেশিকা বা নোট, যা কম্পাইলার সম্পূর্ণ উপেক্ষা করে এবং কখনো রান করে না।",
        "কমেন্ট লেখার মূল উদ্দেশ্য হলো কোডের উদ্দেশ্য অন্য ডেভেলপারদের (কিংবা ভবিষ্যৎ নিজের) সহজে বুঝিয়ে দেওয়া।",
        "Kotlin-এ প্রধানত তিন ধরণের কমেন্ট রয়েছে:",
        "১. Single-line Comment: ডাবল স্ল্যাশ (//) দিয়ে শুরু হয়। ওই লাইনের বাকি সব লেখা কমেন্ট হিসেবে গণ্য হয়।",
        "২. Multi-line Comment: /* দিয়ে শুরু হয়ে */ দিয়ে শেষ হয়। এটি একাধিক লাইন জুড়ে লেখা যায়।",
        "৩. KDoc (Documentation Comment): /** দিয়ে শুরু হয়। ফাংশন বা ক্লাসের অফিসিয়াল ডকুমেন্টেশন লেখার জন্য ব্যবহৃত হয়।",
        "পাশাপাশি একটি ভালো প্রোগ্রাম হতে হলে কোডিং স্টাইল (Code Style) মেনে চলা আবশ্যক। কোটলিনের অফিসিয়াল কনভেনশন হলো camelCase ব্যবহার করা এবং কোড পরিচ্ছন্ন রাখা।",
      ],
    },
    keyPoints: {
      title: "২. Key Points",
      points: [
        "// দিয়ে যেকোনো লাইনে দ্রুত এক লাইনের নোট লেখা যায়।",
        "/* ... */ দিয়ে বড় কোনো ব্যাখ্যা বা সাময়িকভাবে কোড ডিসেবল (Comment out) করা যায়।",
        "কোটলিনের মাল্টি-লাইন কমেন্ট একটির ভেতরে আরেকটি নেস্ট (Nest) করা যায়, যা জাভায় সম্ভব নয়।",
        "ভেরিয়েবল ও ফাংশনের নাম camelCase-এ লিখতে হয় (যেমন: studentScore, calculateTotal)।",
        "ক্লাসের নাম সবসময় PascalCase-এ লিখতে হয় (যেমন: UserProfile, MainActivity)।",
        "অপ্রয়োজনীয় বা অপ্রাসঙ্গিক কমেন্ট কোডের সৌন্দর্য নষ্ট করে; কোড নিজেই যেন আত্মবর্ণনাকারী (self-explanatory) হয়।",
      ],
    },
    syntax: {
      title: "৩. Kotlin Syntax",
      intro: "Kotlin-এ কমেন্ট লেখার ৩টি রূপ ও স্ট্যান্ডার্ড কোডিং স্টাইল:",
      code: `// এটি একটি Single-line কমেন্ট

/*
  এটি একটি Multi-line কমেন্ট।
  এখানে একাধিক লাইনে নোট লেখা যায়।
*/

/**
 * এটি KDoc ডকুমেন্টেশন কমেন্ট
 * @param name ব্যবহারকারীর নাম
 */
val userName = "Shihab" // camelCase স্টাইল`,
      items: [
        { term: "//", desc: "এক লাইনের সাধারণ কমেন্ট।" },
        { term: "/* ... */", desc: "একাধিক লাইনের ব্লক কমেন্ট।" },
        { term: "/** ... */", desc: "KDoc — ফাংশন, ক্লাস বা মেথডের ডকুমেন্টেশন।" },
        { term: "camelCase", desc: "প্রথম শব্দ ছোট হাতের, পরবর্তী শব্দের প্রথম অক্ষর বড় হাতের (যেমন: totalAmount)।" },
      ],
      note: "কোডে কী করা হয়েছে তার চেয়ে 'কেন করা হয়েছে' তা বোঝাতে কমেন্ট ব্যবহার করা সবচেয়ে বেশি অর্থপূর্ণ।",
    },
    codeExample: {
      title: "৪. Code Example",
      code: `/**
 * এই প্রোগ্রামটি কমেন্ট ও ক্লিন কোডিং স্টাইল প্রদর্শন করে
 */
fun main() {
    // ব্যবহারকারীর বেসিক তথ্য সংরক্ষণ
    val studentName = "Shihab"
    val mathScore = 95
    val scienceScore = 88

    /*
       এখানে দুটি বিষয়ের মোট নম্বর
       এবং গড় নম্বর হিসাব করা হচ্ছে
    */
    val totalScore = mathScore + scienceScore
    val averageScore = totalScore / 2.0

    // কনসোলে ফলাফল আউটপুট
    println("Student: $studentName")
    println("Total: $totalScore")
    println("Average: $averageScore")
}`,
      explanations: [
        "ফাংশনের উপরে /** ... */ দিয়ে প্রোগ্রামের উদ্দেশ্য সংক্ষেপে বর্ণনা করা হয়েছে।",
        "ভেরিয়েবলের নামগুলো স্পষ্ট ও camelCase নিয়মে লেখা হয়েছে (mathScore, scienceScore, totalScore)।",
        "কমেন্টগুলো কম্পাইলারে কোনো প্রভাব ফেলেনি; কেবল কোড বুঝতে সহায়তা করেছে।",
      ],
    },
    expectedOutput: {
      title: "৫. Expected Output",
      lines: [
        "Student: Shihab",
        "Total: 183",
        "Average: 91.5",
      ],
      note: "আউটপুটে কমেন্টের কোনো লেখা আসে না; কেবল println() দ্বারা প্রিন্ট করা ডেটা প্রদর্শিত হয়েছে।",
    },
    importantNotes: {
      title: "৬. Important Notes / Common Mistakes",
      items: [
        {
          id: 1,
          title: "১. অতিস্পষ্ট বা হাস্যকর কমেন্ট লেখা",
          desc: "যে কোড নিজেই নিজের কথা বলে, সেখানে অতিরিক্ত কমেন্ট লেখা বাজে অভ্যাস:",
          wrong: "val a = 5 // এখানে a ভেরিয়েবলে ৫ রাখা হলো (অপ্রয়োজনীয়)",
          correct: "val retryAttempts = 5 // অর্থপূর্ণ ভেরিয়েবলের নামে অতিরিক্ত কমেন্ট লাগে না",
        },
        {
          id: 2,
          title: "২. কোড স্টাইল লঙ্ঘন করে নাম রাখা",
          desc: "কোটলিনে snake_case বা এলোমেলো বড়/ছোট হাতের অক্ষর দিয়ে নাম রাখা নিরুৎসাহিত করা হয়:",
          wrong: "val student_name = \"A\" // val StudentName = \"A\"",
          correct: "val studentName = \"A\"   // Correct Kotlin camelCase convention",
        },
        {
          id: 3,
          title: "৩. মৃত কোড (Dead Code) রেখে দেওয়া",
          desc: "পুরনো অব্যবহৃত কোড অনির্দিষ্টকালের জন্য কমেন্ট করে ফাইল নোংরা না করে গিট ভার্সন কন্ট্রোলের ওপর ভরসা রেখে ক্লিন রাখুন।",
        },
      ],
    },
    practiceTask: {
      title: "৭. ছোট Practice Task",
      instruction: "একটি সুসজ্জিত Kotlin program তৈরি করো যেখানে:\n১. প্রোগ্রামের শুরুতে একটি multi-line কমেন্টে প্রোগ্রামের বর্ণনা থাকবে।\n২. দুটি ভেরিয়েবল productPrice ও discountPercent camelCase নিয়মে ডিক্লেয়ার করবে।\n৩. একটি single-line কমেন্ট লিখে ছাড়ের পর চূড়ান্ত মূল্য ক্যালকুলেট করে প্রিন্ট করবে।",
      outputLines: [
        "Original Price: 500",
        "Discounted Price: 450.0",
      ],
      condition: "শর্ত: সব ভেরিয়েবল ও কমেন্টে কোটলিনের অফিসিয়াল camelCase কোডিং স্টাইল বজায় রাখতে হবে।",
    },
  },
};

export const getLessonContent = (
  moduleSlug?: string,
  lessonSlug?: string
): LessonContentData | null => {
  if (!moduleSlug || !lessonSlug) return null;
  return lessonContents[`${moduleSlug}/${lessonSlug}`] || null;
};
