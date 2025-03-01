"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Sparkles, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

export default function LogTranslator() {
  const [logInput, setLogInput] = useState("")
  const [translatedLog, setTranslatedLog] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)

  const translateLog = () => {
    if (!logInput.trim()) return

    setIsTranslating(true)

    // Simulate translation process
    setTimeout(() => {
      // This is a mock translation - in a real app, you would call an API
      const translated = `${logInput
        .replace(/error/gi, "ERROR DETECTED")
        .replace(/failed/gi, "FAILURE OCCURRED")
        .replace(/exception/gi, "EXCEPTION THROWN")}`

      setTranslatedLog(translated)
      setIsTranslating(false)
    }, 1000)
  }

  const clearAll = () => {
    setLogInput("")
    setTranslatedLog("")
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - Dark gradient background (40% width on desktop) */}
      <div className="w-full md:w-[40%] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 p-6 md:p-12 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[90%] md:max-w-md"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Log Translator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed">
            Transform complex error logs into clear, understandable explanations with our intelligent log translator.
            Save time debugging and get back to building what matters.
          </p>

          <div className="mt-8 md:mt-12">
            <motion.div
              className="flex space-x-2 items-center text-emerald-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Sparkles className="h-5 w-5" />
              <span className="text-sm md:text-base">Powered by advanced AI translation</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Log input and translation output */}
      <div className="w-full md:w-[60%] bg-slate-950 text-white p-6 md:p-12 flex flex-col dark">
        <div className="flex-1 flex flex-col h-full max-w-3xl mx-auto w-full">
          {translatedLog ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="min-h-[120px]">
                <p className="whitespace-pre-wrap text-white text-left">{translatedLog}</p>
              </div>
            </motion.div>
          ) : (
            <div className="p-4 rounded-lg mb-8 min-h-[120px] flex items-center justify-center text-slate-400">
              <p className="text-xl sm:text-2xl font-semibold">Tell me what log you would like to understand?</p>
            </div>
          )}

          <div className="mt-auto">
            <div className="relative">
              <Textarea
                value={logInput}
                onChange={(e) => setLogInput(e.target.value)}
                placeholder="Paste your error log here..."
                className="min-h-[144px] resize-none bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 rounded-lg"
              />

              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={clearAll}
                  disabled={isTranslating || (!logInput && !translatedLog)}
                  className="border-slate-700 text-white hover:bg-slate-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <Button
                  onClick={translateLog}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 min-w-[120px]"
                  disabled={isTranslating || !logInput.trim()}
                >
                  {isTranslating ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Translating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Translate <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

