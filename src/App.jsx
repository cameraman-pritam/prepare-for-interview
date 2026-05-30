import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 1. Initialize Supabase client
//Replace these with your actual values from the Supabase Dashboard
const supabaseUrl = "https://supabase.co";
const supabaseAnonKey = "your-anon-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [input, setInput] = useState("Explain Deno in one sentence.");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const testFunction = async () => {
    setLoading(true);
    try {
      // 2. Invoke your Edge Function
      // Replace 'your-function-name' with the name you used in 'supabase functions deploy'
      const { data, error } = await supabase.functions.invoke(
        "your-function-name",
        {
          body: { content: input }, // Passing the user content in the body
        },
      );

      if (error) throw error;
      setResponse(data.content); // Access the message content from OpenAI's response
    } catch (err) {
      setResponse(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Interview Bot Tester</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="4"
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <br />
      <button onClick={testFunction} disabled={loading}>
        {loading ? "Thinking..." : "Send to Bot"}
      </button>

      <div
        style={{ marginTop: "20px", padding: "10px", background: "#f4f4f4" }}
      >
        <strong>Bot Response:</strong>
        <p>{response || "No response yet."}</p>
      </div>
    </div>
  );
}
