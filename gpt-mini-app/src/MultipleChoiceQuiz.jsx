import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const questions = [
  {
    question: "Apa itu pemrograman?",
    options: [
      "Proses mengedit gambar di komputer",
      "Proses membuat sistem operasi",
      "Proses memberi instruksi ke komputer",
      "Proses merakit komputer"
    ],
    answer: 2
  },
  {
    question: "Simbol apa yang digunakan untuk percabangan dalam flowchart?",
    options: [
      "Persegi panjang",
      "Belah ketupat (diamond)",
      "Lingkaran",
      "Segitiga"
    ],
    answer: 1
  },
  {
    question: "Apa hasil dari 1 XOR 1 dalam logika digital?",
    options: ["1", "0", "True", "False"],
    answer: 1
  },
  {
    question: "Apa itu pseudocode?",
    options: [
      "Kode acak",
      "Kode error",
      "Logika program dengan bahasa sehari-hari",
      "Kode untuk hacking"
    ],
    answer: 2
  },
  {
    question: "Manakah yang termasuk tipe data primitif?",
    options: ["array", "string", "object", "function"],
    answer: 1
  },
  {
    question: "Berikut ini merupakan contoh logika AND yang benar adalah:",
    options: ["1 AND 0 = 1", "1 AND 1 = 1", "0 AND 1 = 1", "0 AND 0 = 1"],
    answer: 1
  },
  {
    question: "Simbol flowchart untuk input/output adalah:",
    options: ["Persegi panjang", "Jajaran genjang", "Belah ketupat", "Lingkaran"],
    answer: 1
  },
  {
    question: "Langkah pertama dalam Computational Thinking adalah:",
    options: ["Algoritma", "Decomposition", "Abstraksi", "Pattern Recognition"],
    answer: 1
  },
  {
    question: "Bagian dari sintaksis yang menunjukkan percabangan adalah:",
    options: ["for", "while", "if", "return"],
    answer: 2
  },
  {
    question: "Notasi simbol logika OR adalah:",
    options: ["&&", "||", "!", "=="],
    answer: 1
  },
  {
    question: "Struktur data apa yang digunakan untuk menyimpan sekumpulan data sejenis?",
    options: ["Array", "Integer", "Boolean", "Function"],
    answer: 0
  },
  {
    question: "Apa simbol logika untuk NOT?",
    options: ["&&", "||", "!", "=="],
    answer: 2
  },
  {
    question: "Dalam flowchart, simbol lingkaran digunakan untuk apa?",
    options: ["Input/Output", "Keputusan", "Proses", "Penghubung (Connector)"],
    answer: 3
  },
  {
    question: "Apa yang dimaksud dengan algoritma?",
    options: ["Bahasa pemrograman", "Kode error", "Langkah-langkah sistematis menyelesaikan masalah", "Aplikasi komputer"],
    answer: 2
  },
  {
    question: "Apa hasil dari ekspresi logika: NOT(True AND False)?",
    options: ["True", "False", "Error", "Undefined"],
    answer: 0
  },
  ...Array.from({ length: 45 }, (_, i) => ({
    question: `Soal tambahan ke-${i + 16}`,
    options: ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    answer: Math.floor(Math.random() * 4)
  }))
];

export default function MultipleChoiceQuiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewed, setReviewed] = useState(new Set());

  const current = reviewMode ? incorrectQuestions[reviewIndex] : questions[index];

  const checkAnswer = (i) => {
    setSelected(i);
    setShowAnswer(true);
    if (i === current.answer) {
      setTimeout(() => {
        setSelected(null);
        setShowAnswer(false);

        if (reviewMode) {
          setReviewed((prev) => new Set(prev).add(reviewIndex));
          if (reviewIndex + 1 < incorrectQuestions.length) {
            setReviewIndex((prev) => prev + 1);
          } else {
            const remaining = incorrectQuestions.filter((_, idx) => !reviewed.has(idx));
            if (remaining.length === 0) {
              setReviewMode(false);
              setIndex(0);
              setIncorrectQuestions([]);
              setReviewIndex(0);
              setReviewed(new Set());
            } else {
              setReviewIndex(0);
            }
          }
        } else {
          if (index + 1 < questions.length) {
            setIndex((prev) => prev + 1);
          } else if (incorrectQuestions.length > 0) {
            setReviewMode(true);
            setReviewIndex(0);
          }
        }
      }, 1000);
    } else {
      if (!reviewMode && !incorrectQuestions.includes(questions[index])) {
        setIncorrectQuestions([...incorrectQuestions, questions[index]]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-xl p-6 text-center shadow-lg">
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">{current.question}</h2>
          <div className="space-y-2">
            {current.options.map((opt, i) => (
              <Button
                key={i}
                onClick={() => checkAnswer(i)}
                variant={
                  showAnswer
                    ? i === selected
                      ? i === current.answer
                        ? "default"
                        : "destructive"
                      : "outline"
                    : "outline"
                }
                className="w-full"
              >
                {opt}
              </Button>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="ghost"
              onClick={() => {
                if (reviewMode) {
                  setReviewIndex((prev) => Math.max(0, prev - 1));
                } else {
                  setIndex((prev) => Math.max(0, prev - 1));
                }
              }}
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Sebelumnya
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                if (reviewMode) {
                  setReviewIndex((prev) => Math.min(incorrectQuestions.length - 1, prev + 1));
                } else {
                  setIndex((prev) => Math.min(questions.length - 1, prev + 1));
                }
              }}
            >
              Selanjutnya <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
